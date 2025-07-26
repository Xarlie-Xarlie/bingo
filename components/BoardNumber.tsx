import React, { useState } from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

type BoardNumberProps = {
  number: number;
  isChosen: boolean;
  onRemove?: (num: number) => void;
  showRemove?: boolean;
};

const BoardNumber: React.FC<BoardNumberProps> = ({
  number,
  isChosen,
  onRemove,
  showRemove = false,
}) => {
  const [pressed, setPressed] = useState(false);

  const handlePress = () => {
    if (showRemove) setPressed(!pressed);
  };

  return (
    <TouchableOpacity
      style={[
        styles.number,
        isChosen && styles.chosen,
      ]}
      onPress={handlePress}
      activeOpacity={0.7}
      disabled={!showRemove}
    >
      <Text style={styles.text}>{number}</Text>
      {showRemove && pressed && (
        <TouchableOpacity
          style={styles.removeIcon}
          onPress={() => onRemove && onRemove(number)}
        >
          <MaterialIcons name="close" size={18} color="#f00" />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  number: {
    width: 36,
    height: 36,
    margin: 4,
    borderRadius: 18,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  chosen: {
    backgroundColor: '#2196f3',
  },
  text: {
    color: '#222',
    fontWeight: 'bold',
    fontSize: 16,
  },
  removeIcon: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 2,
    elevation: 2,
  },
});

export default BoardNumber;
