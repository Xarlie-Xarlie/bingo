import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import BoardNumber from './BoardNumber';

type BoardProps = {
  id: string;
  numbers: Set<number>;
  chosenNumbers: Set<number>;
  marked?: Set<number>;
};

const Board: React.FC<BoardProps> = ({ id, numbers, chosenNumbers }) => {
  const gridSize = 5;

  const sortedNumbers = React.useMemo(
    () => Array.from(numbers).sort((a, b) => a - b),
    [numbers]
  );

  const columnMajor = React.useMemo(
    () =>
      Array.from({ length: gridSize * gridSize }, (_, idx) => {
        const col = idx % gridSize;
        const row = Math.floor(idx / gridSize);
        return sortedNumbers[row * gridSize + col];
      }),
    [sortedNumbers]
  );

  const remaining = React.useMemo(
    () => Array.from(numbers).filter(n => !chosenNumbers.has(n)).length,
    [numbers, chosenNumbers]
  );

  let boardBg = '#fff';
  if (remaining === 0) boardBg = '#a5d6a7'; // green
  else if (remaining <= 4) boardBg = '#fff59d'; // yellow

  return (
    <View style={[styles.board, { backgroundColor: boardBg }]}>
      <Text style={styles.title}>Board #{id}</Text>
      <View style={styles.row}>
        {['B', 'I', 'N', 'G', 'O'].map((letter, i) => (
          <TouchableOpacity
            key={i}
            style={styles.bindoLetter}
            activeOpacity={0.7}
            disabled={true}
          >
            <Text style={styles.text}>{letter}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={{ alignItems: 'center' }}>
        <FlatList
          data={columnMajor}
          numColumns={5}
          removeClippedSubviews={true}
          renderItem={({ item }) => (
            <BoardNumber
              number={item}
              isChosen={chosenNumbers.has(item)}
              showRemove={false}
            />
          )}
          keyExtractor={item => item.toString()}
          contentContainerStyle={{
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
            marginLeft: 16,
          }}
        />
      </View>
      <Text style={styles.remaining}>
        {remaining === 0 ? 'Bingo!' : `${remaining} left`}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  board: {
    margin: 12,
    padding: 12,
    borderRadius: 10,
    elevation: 2,
  },
  title: { fontWeight: 'bold', marginBottom: 8, fontSize: 16 },
  row: { flexDirection: 'row', justifyContent: 'center', marginBottom: 4 },
  remaining: { marginTop: 8, textAlign: 'center', fontWeight: 'bold' },
  lettersRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 8,
  },
  letter: {
    fontSize: 22,
    fontWeight: 'bold',
    marginHorizontal: 8,
    letterSpacing: 4,
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  bindoLetter: {
    width: 36,
    height: 36,
    margin: 4,
    borderRadius: 18,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
});

export default Board;
