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
    <View style={styles.row}>
      <Text style={styles.label}>Sound</Text>
      <Switch value={soundEnabled} onValueChange={setSoundEnabled} />
    </View>
    <Button title="Reset All" color="#f44336" onPress={resetAll} />
  </View>
);

const styles = StyleSheet.create({
  container: { padding: 24 },
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 24 },
  label: { fontSize: 16, flex: 1 },
});

export default SettingsTab;
