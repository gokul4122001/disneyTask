import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  ScrollView,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';

import { getRandomCharacters, searchCharacter } from '../services/api';
import NameTag from '../components/NameTag';
import Footer from '../components/Footer';
import { debounce } from '../utils/helpers';
import * as Animatable from 'react-native-animatable';

const { width } = Dimensions.get('window');

const SearchScreen = ({ navigation }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [randomCharacters, setRandomCharacters] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchRandomCharacters();
  }, []);

  const fetchRandomCharacters = async () => {
    setLoading(true);
    const characters = await getRandomCharacters(5);
    setRandomCharacters(characters);
    setLoading(false);
  };

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    const searchResults = await searchCharacter(query);
    setResults(searchResults);
    setLoading(false);
  };

  const debouncedSearch = debounce(handleSearch, 500);

  const handleNameTagPress = (character) => {
    navigation.navigate('Result', { character });
  };

  const renderCard = ({ item, index }) => (
    <Animatable.View animation="fadeInUp" delay={index * 100} style={styles.card}>
      <TouchableOpacity onPress={() => handleNameTagPress(item)}>
        <Image source={{ uri: item.imageUrl }} style={styles.image} />
        <Text style={styles.cardName}>{item.name}</Text>
        <Text style={styles.filmText}>
          {item.films?.[0] ? `🎬 ${item.films[0]}` : '🎬 Unknown Film'}
        </Text>
      </TouchableOpacity>
    </Animatable.View>
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={styles.header}>🔎 Search Disney Characters</Text>

          <TextInput
            style={styles.input}
            placeholder="Type a character name..."
            value={query}
            onChangeText={(text) => {
              setQuery(text);
              debouncedSearch();
            }}
            placeholderTextColor="#999"
          />

          {loading ? (
            <ActivityIndicator size="large" color="#ff69b4" />
          ) : results.length > 0 ? (
            <FlatList
              data={results}
              keyExtractor={(item) => item._id.toString()}
              renderItem={renderCard}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            />
          ) : (
            <>
              <Text style={styles.sectionTitle}>✨ Popular Characters</Text>
              <ScrollView
                contentContainerStyle={styles.nameTagsContainer}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
              >
                {randomCharacters.map((character, idx) => (
                  <Animatable.View key={character._id} animation="zoomIn" delay={idx * 150}>
                    <NameTag
                      name={character.name}
                      onPress={() => handleNameTagPress(character)}
                    />
                  </Animatable.View>
                ))}
              </ScrollView>
            </>
          )}

          <Footer navigation={navigation} />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    padding: 20,
  },
  header: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#444',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 20,
    backgroundColor: '#fff',
    color: '#000',
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 18,
    color: '#ffd700',
    fontWeight: '600',
    marginBottom: 10,
    textAlign: 'center',
  },
  nameTagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingBottom: 30,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
    alignItems: 'center',
    width: width * 0.85,
    alignSelf: 'center',
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 12,
    backgroundColor: '#ccc',
  },
  cardName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
    marginBottom: 6,
  },
  filmText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});

export default SearchScreen;
