import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import Board from './Board';

type BoardTabProps = {
  boards: { id: number; numbers: number[][] }[];
  chosenNumbers: number[];
};

const BoardTab: React.FC<BoardTabProps> = ({ boards, chosenNumbers }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {boards.map(board => (
        <Board
          key={board.id}
          id={board.id}
          numbers={board.numbers}
          chosenNumbers={chosenNumbers}
        />
      ))}
      {boards.length === 0 && (
        <Text style={styles.empty}>No boards available.</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 8 },
  empty: { textAlign: 'center', marginTop: 40, color: '#888' },
});

export default BoardTab;
