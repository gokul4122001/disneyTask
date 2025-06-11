import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';
import LottieView from 'lottie-react-native';
import {getRandomCharacters} from '../services/api';
import Footer from '../components/Footer';
import {AppContext} from '../context/AppContext';
import * as Animatable from 'react-native-animatable';

const WelcomeScreen = ({navigation}) => {
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const {userName} = useContext(AppContext);

  useEffect(() => {
    const fetchRandomCharacter = async () => {
      const characters = await getRandomCharacters(1);
      setCharacter(characters[0]);
      setLoading(false);
    };

    fetchRandomCharacter();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ff69b4" />
      </View>
    );
  }

  return (
    <View style={[styles.background, {backgroundColor: '#1a1a2e'}]}>
      {/* <View style={styles.overlay} /> */}

      <View style={styles.container}>
        <Animatable.View animation="fadeInDown" delay={100}>
          <LottieView
            source={require('../assets/disney_logo.json')}
            autoPlay
            loop={false}
            style={styles.lottieStyle}
          />
        </Animatable.View>
        <Animatable.Text animation="fadeInDown" style={styles.welcomeText}>
          ✨ Hello, {userName}! ✨
        </Animatable.Text>

        <Animatable.Text animation="fadeIn" delay={500} style={styles.title}>
          Meet Your Disney Friend!
        </Animatable.Text>

        <Animatable.View
          animation="zoomIn"
          delay={1000}
          style={styles.characterCard}>
          <Image
            source={{uri: character?.imageUrl}}
            style={styles.characterImage}
            resizeMode="cover"
          />
          <Text style={styles.characterName}>{character?.name}</Text>
        </Animatable.View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Search')}>
          <Text style={styles.buttonText}>✨ Start Exploring ✨</Text>
        </TouchableOpacity>
      </View>

      <View style={{position: 'static'}}>
        <Footer navigation={navigation} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'space-between',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  container: {
    flex: 1,
    padding: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:-200
  },
  welcomeText: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    color: '#ffd700',
    textAlign: 'center',
    marginBottom: 20,
  },
  characterCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
    width: 250,
  },
  characterImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 15,
  },
  characterName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
  },
  button: {
    backgroundColor: '#ff69b4',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginTop: 30,
    shadowColor: '#fff',
    shadowOpacity: 0.6,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  lottieStyle: {
  width: 150,
  height: 150,
  marginBottom: 10,
},
});

export default WelcomeScreen;
