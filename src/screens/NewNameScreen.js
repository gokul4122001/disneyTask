import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { AppContext } from '../context/AppContext';
import Footer from '../components/Footer';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';

const NewNameScreen = ({ navigation }) => {
  const [newName, setNewName] = useState('');
  const { saveUserName } = useContext(AppContext);

  const handleSave = () => {
    if (newName.trim()) {
      saveUserName(newName);
      navigation.navigate('Welcome');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.wrapper}
    >
      <View style={styles.container}>
        <Animatable.View animation="fadeInDown" delay={100}>
          <Text style={styles.title}>👤 New User Setup</Text>
        </Animatable.View>

        <Animatable.View animation="zoomIn" delay={200} style={styles.inputCard}>
          <Icon name="person" size={24} color="#aaa" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            placeholderTextColor="#aaa"
            value={newName}
            onChangeText={setNewName}
            autoFocus
          />
        </Animatable.View>

        <Animatable.View animation="fadeInUp" delay={300}>
          <TouchableOpacity
            onPress={handleSave}
            disabled={!newName.trim()}
            style={{ opacity: !newName.trim() ? 0.5 : 1 }}
          >
            <LinearGradient
              colors={['#00c6ff', '#0072ff']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.button}
            >
              <Text style={styles.buttonText}>💾 Save</Text>
            </LinearGradient>
          </TouchableOpacity>
        </Animatable.View>
      </View>

      <Footer navigation={navigation} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 30,
  },
  inputCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#333',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#fff',
  },
  button: {
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default NewNameScreen;
