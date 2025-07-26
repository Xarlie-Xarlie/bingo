import React, { useState } from 'react';
import { SafeAreaView, Dimensions, Alert } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import * as Haptics from 'expo-haptics';
import ChosenNumbersTab from '../../components/ChosenNumbersTab';
import BoardTab from '../../components/BoardTab';
import SettingsTab from '../../components/SettingsTab';

const initialBoards = [
  {
    id: 1,
    numbers: [
      [1, 2, 31, 46, 61],
      [16, 17, 32, 47, 62],
      [3, 18, 33, 48, 63],
      [4, 19, 34, 49, 64],
      [5, 20, 35, 50, 65],
    ],
  },
];

export default function App() {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'chosen', title: 'Chosen' },
    { key: 'boards', title: 'Boards' },
    { key: 'settings', title: 'Settings' },
  ]);
  const [chosenNumbers, setChosenNumbers] = useState<number[]>([

    1, 2, 31, 46, 61,
    16, 17, 32, 47, 62,
    3, 18, 33, 48, 63,
    4, 19, 34, 49, 64,
    5, 20, 35, 50, 65,

  ]);
  const [boards, setBoards] = useState(initialBoards);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const addNumber = (num: number) => {
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
    if (soundEnabled) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const removeNumber = (num: number) => {
    setChosenNumbers(chosenNumbers.filter(n => n !== num));
    if (soundEnabled) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  const resetAll = () => {
    setChosenNumbers([]);
    setBoards(initialBoards);
  };

  // Sort boards by how many numbers are present in chosenNumbers
  const sortedBoards = [...boards].sort((a, b) => {
    const aMarked = a.numbers.flat().filter(n => chosenNumbers.includes(n)).length;
    const bMarked = b.numbers.flat().filter(n => chosenNumbers.includes(n)).length;
    return bMarked - aMarked;
  });

  const renderScene = SceneMap({
    chosen: () => (
      <ChosenNumbersTab
        chosenNumbers={chosenNumbers}
        addNumber={addNumber}
        removeNumber={removeNumber}
      />
    ),
    boards: () => (
      <BoardTab
        boards={sortedBoards}
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
