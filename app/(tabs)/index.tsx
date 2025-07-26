import React, { useState } from 'react';
import { SafeAreaView, Dimensions, Alert } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import ChosenNumbersTab from '../../components/ChosenNumbersTab';
import BoardTab from '../../components/BoardTab';
import SettingsTab from '../../components/SettingsTab';

const initialBoards = [
  {
    id: '006794',
    numbers: [
      10, 11, 12, 13, 14, 19, 22, 25, 27, 28, 35, 37, 42, 43, 45, 49, 54, 55, 59, 60, 66, 70, 70, 71, 72, 75
    ],
  },
  {
    id: '023399',
    numbers: [
      2, 3, 6, 8, 12, 16, 18, 27, 28, 29, 34, 36, 38, 40, 41, 46, 54, 55, 56, 58, 67, 68, 70, 71, 74
    ],
  },
  {
    id: '019487',
    numbers: [
      1, 2, 8, 14, 15, 17, 22, 27, 28, 29, 32, 35, 41, 42, 45, 50, 55, 57, 59, 60, 62, 63, 64, 69, 73
    ],
  },
  {
    id: '004939',
    numbers: [
      4, 6, 9, 11, 13, 17, 18, 22, 25, 30, 32, 35, 40, 42, 45, 48, 49, 53, 56, 57, 62, 65, 66, 71, 75
    ],
  },
  {
    id: '013048',
    numbers: [
      1, 6, 10, 12, 13, 19, 25, 26, 27, 28, 32, 35, 37, 42, 45, 48, 51, 56, 59, 60, 63, 64, 67, 70, 71
    ],
  },
  {
    id: '009640',
    numbers: [
      2, 6, 8, 11, 14, 16, 17, 25, 26, 28, 31, 36, 37, 42, 45, 50, 51, 53, 55, 57, 61, 65, 66, 71, 74
    ],
  },
  {
    id: '001391',
    numbers: [
      3, 5, 6, 7, 8, 22, 26, 27, 28, 29, 38, 41, 43, 44, 45, 53, 56, 57, 58, 60, 63, 69, 71, 72, 73,
    ],
  },
  {
    id: '003893',
    numbers: [
      4, 7, 12, 13, 15, 18, 22, 24, 27, 29, 34, 36, 37, 42, 44, 46, 52, 55, 56, 57, 62, 66, 67, 72, 73,
    ],
  },
  {
    id: '023308',
    numbers: [
      1, 4, 11, 12, 13, 19, 20, 22, 23, 26, 33, 34, 35, 39, 45, 50, 51, 56, 57, 58, 63, 66, 67, 71, 73,
    ],
  },
  {
    id: '020260',
    numbers: [
      2, 4, 5, 10, 14, 20, 26, 27, 28, 30, 37, 38, 39, 43, 44, 46, 50, 54, 57, 59, 61, 66, 67, 72, 74,
    ],
  },
  {
    id: '021720',
    numbers: [
      1, 2, 5, 10, 11, 21, 22, 23, 26, 28, 31, 33, 35, 36, 41, 46, 52, 55, 59, 60, 63, 64, 67, 68, 71,
    ],
  },
];

export default function App() {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'chosen', title: 'Números' },
    { key: 'boards', title: 'Cartelas' },
    { key: 'settings', title: 'Resetar' },
  ]);
  const [chosenNumbers, setChosenNumbers] = useState<number[]>([
    1, 2, 31, 46, 61, 16, 17, 32, 47, 62, 3, 18, 33, 48, 63, 4, 19, 34, 49, 64,
    5, 20, 35, 50, 65, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68,
  ]);
  const [boards, setBoards] = useState(initialBoards);

  const addNumber = (num: number) => {
    if (isNaN(num) || num < 1 || num > 75) {
      Alert.alert('Número inválido', 'Insira um número entre 1 e 75');
      return;
    }
    if (chosenNumbers.includes(num)) {
      Alert.alert('Duplicado', 'Número já saiu.');
      return;
    }
    const updated = [...chosenNumbers, num].sort((a, b) => a - b);
    setChosenNumbers(updated);
  };

  const removeNumber = (num: number) => {
    setChosenNumbers(chosenNumbers.filter((n) => n !== num));
  };

  const resetAll = () => {
    setChosenNumbers([]);
    setBoards(initialBoards);
  };

  // Sort boards by how many numbers are present in chosenNumbers
  const sortedBoards = [...boards].sort((a, b) => {
    const aMarked = a.numbers
      .flat()
      .filter((n) => chosenNumbers.includes(n)).length;
    const bMarked = b.numbers
      .flat()
      .filter((n) => chosenNumbers.includes(n)).length;
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
        swipeEnabled={false}
      />
    </SafeAreaView>
  );
}
