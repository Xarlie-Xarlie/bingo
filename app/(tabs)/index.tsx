import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, ScrollView, StyleSheet, SafeAreaView, Dimensions, Switch, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import * as Haptics from 'expo-haptics';

// Helper to generate bingo boards
const generateBoards = (count = 2) => {
  // Each board is a 5x5 grid, numbers 1-75 distributed by column
  const boards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
  for (let i = 0; i < count; i++) {
    let board = [];
    for (let col = 0; col < 5; col++) {
      let start = col * 15 + 1;
      let colNumbers = [];
      for (let row = 0; row < 5; row++) {
        colNumbers.push(start + row);
      }
      board.push(colNumbers);
    }
    // Transpose to get rows
    let grid = [];
    for (let row = 0; row < 5; row++) {
      grid.push(board.map(col => col[row]));
    }
    boards.push({
      id: i + 1,
      grid,
      marked: [],
    });
  }
  return boards;
};

export default function App() {
  // State
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'chosen', title: 'Chosen' },
    { key: 'boards', title: 'Boards' },
    { key: 'settings', title: 'Settings' },
  ]);
  // const [chosenNumbers, setChosenNumbers] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29]);
  const [chosenNumbers, setChosenNumbers] = useState([]);
  const [input, setInput] = useState('');
  const [boards, setBoards] = useState(generateBoards(1));
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Add number to chosenNumbers
  const addNumber = () => {
    const num = parseInt(input);
    if (isNaN(num) || num < 1 || num > 75) {
      Alert.alert('Invalid number', 'Please enter a number between 1 and 75.');
      return;
    }
    if (chosenNumbers.includes(num)) {
      Alert.alert('Duplicate', 'Number already chosen.');
      return;
    }
    const updated = [...chosenNumbers, num].sort((a, b) => a - b);
    setChosenNumbers(updated);
    setInput('');
    if (soundEnabled) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  // Remove number from chosenNumbers
  const removeNumber = (num) => {
    setChosenNumbers(chosenNumbers.filter(n => n !== num));
    if (soundEnabled) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  // Mark numbers on boards when chosenNumbers changes
  useEffect(() => {
    setBoards(prevBoards => {
      let newBoards = prevBoards.map(board => {
        // Flatten grid to 1D array
        const allNumbers = board.grid.flat();
        const marked = allNumbers.filter(n => chosenNumbers.includes(n));
        return { ...board, marked };
      });
      // Sort boards by marked count descending
      newBoards.sort((a, b) => b.marked.length - a.marked.length);
      return newBoards;
    });
  }, [chosenNumbers]);

  // Reset all
  const resetAll = () => {
    setChosenNumbers([]);
    setBoards(generateBoards(1));
  };

  // Tab scenes
  const renderScene = SceneMap({
    chosen: () => (
      <ChosenTab
        chosenNumbers={chosenNumbers}
        input={input}
        setInput={setInput}
        addNumber={addNumber}
        removeNumber={removeNumber}
      />
    ),
    boards: () => (
      <BoardsTab
        boards={boards}
        chosenNumbers={chosenNumbers}
      />
    ),
    settings: () => (
      <SettingsTab
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        resetAll={resetAll}
      />
    ),
  });

  return (
    <SafeAreaView style={{ flex: 1, marginTop: 25 }}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: Dimensions.get('window').width }}
        renderTabBar={props =>
          <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: '#2196f3' }}
            style={{ backgroundColor: '#fff' }}
            labelStyle={{ color: '#222' }}
            activeColor="#2196f3"
            inactiveColor="#888"
          />
        }
        swipeEnabled
      />
    </SafeAreaView>
  );
}

// ChosenTab: Input + grid of chosen numbers
function ChosenTab({ chosenNumbers, input, setInput, addNumber, removeNumber }) {
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Enter number (1-75)"
          keyboardType="numeric"
          maxLength={2}
        />
        <TouchableOpacity style={styles.addBtn} onPress={addNumber}>
          <Ionicons name="add-circle" size={32} color="#2196f3" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={chosenNumbers}
        keyExtractor={item => item.toString()}
        numColumns={5}
        contentContainerStyle={{ alignItems: 'flex-start' }}
        renderItem={({ item }) => (
          <View style={styles.bingoBallCell}>
            <TouchableOpacity onPress={() => removeNumber(item)}>
              <View style={styles.bingoBall}>
                <Text style={styles.bingoBallText}>{item}</Text>
                <Ionicons
                  name="close-circle"
                  size={20}
                  color="#f44336"
                  style={styles.bingoBallRemove}
                />
              </View>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

// BoardsTab: Scrollable list of boards
function BoardsTab({ boards, chosenNumbers }) {
  return (
    <ScrollView style={{ flex: 1, padding: 8 }}>
      {boards.map(board => {
        // Board background color logic
        let bgColor = '#fff';
        const total = 25;
        const marked = board.marked.length;
        if (marked === total) bgColor = '#a5d6a7';
        else if (total - marked < 4) bgColor = '#fff59d';

        return (
          <View key={board.id} style={[styles.boardContainer, { backgroundColor: bgColor }]}>
            <Text style={styles.boardId}>Board #{board.id}</Text>
            <View style={styles.boardGrid}>
              {board.grid.map((row, rowIdx) => (
                <View key={rowIdx} style={{ flexDirection: 'row' }}>
                  {row.map((num, colIdx) => {
                    const isMarked = chosenNumbers.includes(num);
                    return (
                      <View key={colIdx} style={styles.bingoBallCell}>
                        <View style={[
                          styles.bingoBall,
                          isMarked && { backgroundColor: '#66bb6a' }
                        ]}>
                          <Text style={styles.bingoBallText}>{num}</Text>
                        </View>
                      </View>
                    );
                  })}
                </View>
              ))}
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
}

// SettingsTab: Sound toggle and reset button
function SettingsTab({ soundEnabled, setSoundEnabled, resetAll }) {
  return (
    <View style={{ flex: 1, padding: 24 }}>
      <View style={styles.settingRow}>
        <Text style={styles.settingLabel}>Sound Effects</Text>
        <Switch
          value={soundEnabled}
          onValueChange={setSoundEnabled}
        />
      </View>
      <TouchableOpacity style={styles.resetBtn} onPress={() => {
        Alert.alert('Reset', 'Reset all boards and chosen numbers?', [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Reset', style: 'destructive', onPress: resetAll }
        ]);
      }}>
        <Text style={styles.resetBtnText}>Reset All</Text>
      </TouchableOpacity>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 8,
    padding: 8,
    fontSize: 18,
    backgroundColor: '#fff',
  },
  addBtn: {
    marginLeft: 8,
  },
  bingoBallCell: {
    margin: 6,
  },
  bingoBall: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#e3f2fd',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    borderWidth: 2,
    borderColor: '#2196f3',
  },
  bingoBallText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
  },
  bingoBallRemove: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  boardContainer: {
    marginBottom: 20,
    borderRadius: 12,
    padding: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  boardId: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  boardGrid: {
    alignItems: 'center',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
    justifyContent: 'space-between',
  },
  settingLabel: {
    fontSize: 18,
    color: '#333',
  },
  resetBtn: {
    backgroundColor: '#f44336',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  resetBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
