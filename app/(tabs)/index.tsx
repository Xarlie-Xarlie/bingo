import React, { useState } from 'react';
import { SafeAreaView, Dimensions, Alert } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import ChosenNumbersTab from '../../components/ChosenNumbersTab';
import BoardTab from '../../components/BoardTab';
import SettingsTab from '../../components/SettingsTab';

const initialBoards = [
  {
    id: '006794',
    numbers: new Set([
      10, 11, 12, 13, 14, 19, 22, 25, 27, 28, 35, 37, 42, 43, 45, 49, 54, 55, 59, 60, 66, 70, 71, 72, 75
    ]),
    marked: 0,
  },
  {
    id: '023399',
    numbers: new Set([
      2, 3, 6, 8, 12, 16, 18, 27, 28, 29, 34, 36, 38, 40, 41, 46, 54, 55, 56, 58, 67, 68, 70, 71, 74
    ]),
    marked: 0,
  },
  {
    id: '019487',
    numbers: new Set([
      1, 2, 8, 14, 15, 17, 22, 27, 28, 29, 32, 35, 41, 42, 45, 50, 55, 57, 59, 60, 62, 63, 64, 69, 73
    ]),
    marked: 0,
  },
  {
    id: '004939',
    numbers: new Set([
      4, 6, 9, 11, 13, 17, 18, 22, 25, 30, 32, 35, 40, 42, 45, 48, 49, 53, 56, 57, 62, 65, 66, 71, 75
    ]),
    marked: 0,
  },
  {
    id: '013048',
    numbers: new Set([
      1, 6, 10, 12, 13, 19, 25, 26, 27, 28, 32, 35, 37, 42, 45, 48, 51, 56, 59, 60, 63, 64, 67, 70, 71
    ]),
    marked: 0,
  },
  {
    id: '009640',
    numbers: new Set([
      2, 6, 8, 11, 14, 16, 17, 25, 26, 28, 31, 36, 37, 42, 45, 50, 51, 53, 55, 57, 61, 65, 66, 71, 74
    ]),
    marked: 0,
  },
  {
    id: '001391',
    numbers: new Set([
      3, 5, 6, 7, 8, 22, 26, 27, 28, 29, 38, 41, 43, 44, 45, 53, 56, 57, 58, 60, 63, 69, 71, 72, 73,
    ]),
    marked: 0,
  },
  {
    id: '003893',
    numbers: new Set([
      4, 7, 12, 13, 15, 18, 22, 24, 27, 29, 34, 36, 37, 42, 44, 46, 52, 55, 56, 57, 62, 66, 67, 72, 73,
    ]),
    marked: 0,
  },
  {
    id: '023308',
    numbers: new Set([
      1, 4, 11, 12, 13, 19, 20, 22, 23, 26, 33, 34, 35, 39, 45, 50, 51, 56, 57, 58, 63, 66, 67, 71, 73,
    ]),
    marked: 0,
  },
  {
    id: '020260',
    numbers: new Set([
      2, 4, 5, 10, 14, 20, 26, 27, 28, 30, 37, 38, 39, 43, 44, 46, 50, 54, 57, 59, 61, 66, 67, 72, 74,
    ]),
    marked: 0,
  },
  {
    id: '021720',
    numbers: new Set([
      1, 2, 5, 10, 11, 21, 22, 23, 26, 28, 31, 33, 35, 36, 41, 46, 52, 55, 59, 60, 63, 64, 67, 68, 71,
    ]),
    marked: 0,
  },
  {
    id: '026702',
    numbers: new Set([
      1, 5, 11, 12, 13, 21, 22, 25, 27, 28, 31, 39, 42, 43, 45, 46, 52, 53, 58, 59, 66, 67, 70, 71, 75
    ]),
    marked: 0,
  },
  {
    id: '026764',
    numbers: new Set([
      1, 6, 8, 11, 13, 19, 25, 26, 27, 29, 31, 39, 40, 43, 44, 46, 49, 50, 54, 60, 63, 64, 68, 72, 74
    ]),
    marked: 0,
  },
];

export default function App() {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'chosen', title: 'Números' },
    { key: 'boards', title: 'Cartelas' },
    { key: 'settings', title: 'Resetar' },
  ]);
  const [chosenNumbers, setChosenNumbers] = useState<Set<number>>(new Set());
  const [boards, setBoards] = useState(
    initialBoards.map(board => ({ ...board, marked: new Set<number>() }))
  );

  const addNumber = (num: number) => {
    if (isNaN(num) || num < 1 || num > 75) {
      Alert.alert('Número inválido', 'Insira um número entre 1 e 75');
      return;
    }
    if (chosenNumbers.has(num)) {
      Alert.alert('Duplicado', 'Número já saiu.');
      return;
    }
    const updated = new Set(chosenNumbers);
    updated.add(num);
    setChosenNumbers(updated);

    // Update marked set for each board
    setBoards(prevBoards =>
      prevBoards.map(board => {
        if (board.numbers.has(num)) {
          const newMarked = new Set(board.marked);
          newMarked.add(num);
          return { ...board, marked: newMarked };
        }
        return board;
      })
    );
  };

  const removeNumber = (num: number) => {
    const updated = new Set(chosenNumbers);
    updated.delete(num);
    setChosenNumbers(updated);
    setBoards(prevBoards =>
      prevBoards.map(board => {
        if (board.marked.has(num)) {
          const newMarked = new Set(board.marked);
          newMarked.delete(num);
          return { ...board, marked: newMarked };
        }
        return board;
      })
    );
  };

  const resetAll = () => {
    setChosenNumbers(new Set());
    setBoards(initialBoards.map(board => ({ ...board, marked: new Set() })));
  };

  // Sort boards by how many numbers are present in chosenNumbers
  const sortedBoards = [...boards].sort((a, b) => b.marked.size - a.marked.size);

  const renderScene = SceneMap({
    chosen: () => (
      <ChosenNumbersTab
        chosenNumbers={chosenNumbers}
        addNumber={addNumber}
        removeNumber={removeNumber}
      />
    ),
    boards: () => (
      <BoardTab boards={sortedBoards} chosenNumbers={chosenNumbers} />
    ),
    settings: () => (
      <SettingsTab
        chosenNumbers={chosenNumbers}
        setChosenNumbers={setChosenNumbers}
        resetAll={resetAll}
      />
    ),
  });

  return (
    <SafeAreaView style={{ flex: 1, marginTop: 35 }}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: Dimensions.get('window').width }}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: '#2196f3' }}
            style={{ backgroundColor: '#fff' }}
            activeColor="#2196f3"
            inactiveColor="#888"
          />
        )}
        swipeEnabled={true}
      />
    </SafeAreaView>
  );
}
