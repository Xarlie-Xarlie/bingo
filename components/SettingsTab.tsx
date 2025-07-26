import React from 'react';
import { View, Button, Text, Switch, StyleSheet } from 'react-native';

type SettingsTabProps = {
  soundEnabled: boolean;
  setSoundEnabled: (val: boolean) => void;
  resetAll: () => void;
};

const SettingsTab: React.FC<SettingsTabProps> = ({
  soundEnabled,
  setSoundEnabled,
  resetAll,
}) => (
  <View style={styles.container}>
    <Button title="Resetar Tudo" color="#f44336" onPress={resetAll} />
  </View>
);

const styles = StyleSheet.create({
  container: { padding: 24 },
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 24 },
  label: { fontSize: 16, flex: 1 },
});

export default SettingsTab;
