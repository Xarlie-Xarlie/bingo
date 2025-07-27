import React from 'react';
import { View, Button, StyleSheet, Alert } from 'react-native';
import storage from '../assets/storage';

type SettingsTabProps = {
  chosenNumbers: Set<number>,
  setChosenNumbers: (restored: Set<number>) => void,
  resetAll: () => void;
};

const SettingsTab: React.FC<SettingsTabProps> = ({
  resetAll,
  chosenNumbers,
  setChosenNumbers,
}) => (
  <View style={styles.container}>
    <Button title="Resetar Tudo" color="#f44336" onPress={resetAll} />
    <Button
      title="Salvar Estado Atual"
      onPress={async () => {
        await storage.saveState(Array.from(chosenNumbers));
        Alert.alert('Estado salvo!');
      }}
    />
    <Button
      title="Restaurar Estado Salvo"
      onPress={async () => {
        const restored = await storage.restoreState();
        if (restored) {
          setChosenNumbers(new Set(restored));
          Alert.alert('Estado restaurado!');
        } else {
          Alert.alert('Nenhum estado salvo encontrado.');
        }
      }}
    />
    <Button
      title="Limpar Armazenamento"
      color="#888"
      onPress={async () => {
        await storage.clear();
        Alert.alert('Armazenamento limpo!');
        resetAll();
      }}
    />
  </View>
);

const styles = StyleSheet.create({
  container: { padding: 24 },
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 24 },
  label: { fontSize: 16, flex: 1 },
});

export default SettingsTab;
