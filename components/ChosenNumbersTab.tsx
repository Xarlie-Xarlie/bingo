import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
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
        />
        <Button title="Adicionar" onPress={handleAdd} />
      </View>
      <View style={styles.numbersGrid}>
        {chosenNumbers
          .sort((a, b) => a - b)
          .map((num) => (
            <BoardNumber
              key={num}
              number={num}
              isChosen={true}
              onRemove={removeNumber}
              showRemove={true}
            />
          ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
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
});

export default ChosenNumbersTab;
