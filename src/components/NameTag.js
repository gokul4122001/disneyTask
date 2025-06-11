import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const NameTag = ({ name, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.name} numberOfLines={1}>{name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#4a8cff',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    margin: 5,
    minWidth: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default NameTag;