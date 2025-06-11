import axios from 'axios';

const API_BASE_URL = 'https://api.disneyapi.dev';

export const getRandomCharacters = async (count = 5) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/character`);
    const allCharacters = response.data.data;
    const shuffled = allCharacters.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  } catch (error) {
    console.error('Error fetching random characters:', error);
    return [];
  }
};

export const searchCharacter = async (query) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/character`);
    const allCharacters = response.data.data;
    return allCharacters.filter(character => 
      character.name.toLowerCase().includes(query.toLowerCase())
    );
  } catch (error) {
    console.error('Error searching characters:', error);
    return [];
  }
};

export const getCharacterById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/character/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching character by ID:', error);
    return null;
  }
};