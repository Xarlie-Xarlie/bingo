import React from 'react';
import { FlatList, Text, StyleSheet } from 'react-native';
import Board from './Board';

type BoardTabProps = {
  boards: { id: string; numbers: Set<number>; marked?: Set<number> }[];
  chosenNumbers: Set<number>;
};

const BoardTab: React.FC<BoardTabProps> = ({ boards, chosenNumbers }) => {

  return (
    <FlatList
      data={boards}
      removeClippedSubviews={true}
      keyExtractor={board => board.id}
      renderItem={({ item: board }) => (
        <Board
          id={board.id}
          numbers={board.numbers}
          chosenNumbers={chosenNumbers}
        />
      )}
      contentContainerStyle={styles.container}
      ListEmptyComponent={
        <Text style={styles.empty}>No boards available.</Text>
      }
    />
  );
};

const styles = StyleSheet.create({
  container: { padding: 8 },
  empty: { textAlign: 'center', marginTop: 40, color: '#888' },
});

export default BoardTab;
