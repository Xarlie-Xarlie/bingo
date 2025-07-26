import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import BoardNumber from './BoardNumber';

type BoardProps = {
  id: number;
  numbers: number[];
  chosenNumbers: number[];
};

const Board: React.FC<BoardProps> = ({ id, numbers, chosenNumbers }) => {
  // Build 5x5 grid column-wise
  numbers.sort((a, b) => a - b); // Ensure numbers are sorted
  const columns: number[][] = Array.from({ length: 5 }, (_, col) =>
    numbers.filter(n => n >= col * 15 + 1 && n <= (col + 1) * 15)
  );
  const grid: number[][] = Array.from({ length: 5 }, (_, row) =>
    Array.from({ length: 5 }, (_, col) => columns[col][row])
  );
  const remaining = numbers.filter(n => !chosenNumbers.includes(n)).length;

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
            <Text style={styles.text} >{letter}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {
        grid.map((row, i) => (
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
        ))
      }
      < Text style={styles.remaining} >
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
