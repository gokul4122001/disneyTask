import React, { useState, useContext } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { AppContext } from '../context/AppContext';

const NameInputScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const { saveUserName } = useContext(AppContext);

  const handleSave = () => {
    if (name.trim()) {
      saveUserName(name);
      navigation.replace('Welcome');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Disney Explorer</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
        autoFocus
      />
      <Button title="Continue" onPress={handleSave} disabled={!name.trim()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
});

export default NameInputScreen;