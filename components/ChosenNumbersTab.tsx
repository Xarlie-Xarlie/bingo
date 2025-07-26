import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, ScrollView } from 'react-native';
import BoardNumber from './BoardNumber';

type ChosenNumbersTabProps = {
  chosenNumbers: number[];
  addNumber: (num: number) => void;
  removeNumber: (num: number) => void;
};

const ChosenNumbersTab: React.FC<ChosenNumbersTabProps> = ({
  chosenNumbers,
  addNumber,
  removeNumber,
}) => {
  const [input, setInput] = useState('');

  const handleAdd = () => {
    const num = parseInt(input, 10);
    if (!isNaN(num)) {
      addNumber(num);
      setInput('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Insira um número (1-75):</Text>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          keyboardType="numeric"
          onSubmitEditing={handleAdd}
        />
        <Button title="Adicionar" onPress={handleAdd} />
      </View>
      {/* BINGO header row */}
      <View style={styles.row}>
        {['B', 'I', 'N', 'G', 'O'].map(letter => (
          <View key={letter} style={styles.cell}>
            <Text style={styles.letter}>{letter}</Text>
          </View>
        ))}
      </View>
      {/* Numbers grid */}
      <ScrollView contentContainerStyle={styles.grid}>
        {(() => {
          // Group chosen numbers into columns
          const columns: number[][] = Array.from({ length: 5 }, (_, col) =>
            chosenNumbers
              .filter(n => n >= col * 15 + 1 && n <= (col + 1) * 15)
              .sort((a, b) => a - b)
          );
          // Find the max column length
          const maxRows = Math.max(...columns.map(col => col.length), 1);
          // Build grid rows
          return Array.from({ length: maxRows }, (_, rowIdx) => (
            <View key={rowIdx} style={styles.row}>
              {columns.map((col, colIdx) => (
                <View key={colIdx} style={styles.cell}>
                  {col[rowIdx] !== undefined && (
                    <BoardNumber
                      number={col[rowIdx]}
                      isChosen={true}
                      onRemove={removeNumber}
                      showRemove={true}
                    />
                  )}
                </View>
              ))}
            </View>
          ));
        })()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16, flex: 1 },
  label: { fontSize: 16, marginBottom: 8 },
  inputRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  input: {
    flexGrow: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 8,
    marginRight: 8,
    fontSize: 16,
  },
  numbersGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8
  },
  grid: {
    marginTop: 4,
    paddingBottom: 32,
  },
  cell: {
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 14,
  },
  letter: {
    fontSize: 22,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginBottom: 2,
  },
});

export default ChosenNumbersTab;
