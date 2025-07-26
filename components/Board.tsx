import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BoardNumber from './BoardNumber';

type BoardProps = {
  id: number;
  numbers: number[][];
  chosenNumbers: number[];
};

const Board: React.FC<BoardProps> = ({ id, numbers, chosenNumbers }) => {
  const flatNumbers = numbers.flat();
  const remaining = flatNumbers.filter(n => !chosenNumbers.includes(n)).length;

  let boardBg = '#fff';
  if (remaining === 0) boardBg = '#a5d6a7'; // green
  else if (remaining <= 4) boardBg = '#fff59d'; // yellow

  return (
    <View style={[styles.board, { backgroundColor: boardBg }]}>
      <Text style={styles.title}>Board #{id}</Text>
      {numbers.map((row, i) => (
        <View key={i} style={styles.row}>
          {row.map(num => (
            <BoardNumber
              key={num}
              number={num}
              isChosen={chosenNumbers.includes(num)}
              showRemove={false}
            />
          ))}
        </View>
      ))}
      <Text style={styles.remaining}>
        {remaining === 0
          ? 'Bingo!'
          : `${remaining} left`}
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
});

export default Board;
