import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const CharacterCard = ({ character, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image 
        source={{ uri: character.imageUrl }} 
        style={styles.image} 
        resizeMode="cover"
      />
      <View style={styles.details}>
        <Text style={styles.name}>{character.name}</Text>
        {character.films && character.films.length > 0 && (
          <Text style={styles.films}>{character.films.length} films</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 150,
  },
  details: {
    padding: 15,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  films: {
    fontSize: 14,
    color: '#666',
  },
});

export default CharacterCard;