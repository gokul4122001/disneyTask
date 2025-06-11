import React, {useEffect, useContext} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  Linking 
} from 'react-native';
import moment from 'moment';
import {AppContext} from '../context/AppContext';
import Footer from '../components/Footer';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/MaterialIcons';

const {height} = Dimensions.get('window');

const ResultScreen = ({route, navigation}) => {
  const {character} = route.params;
  const {userName, addSearchHistory} = useContext(AppContext);

  useEffect(() => {
    const searchRecord = {
      userName,
      characterId: character._id,
      characterName: character.name,
      timestamp: new Date().toISOString(),
    };

    addSearchHistory(searchRecord);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Animatable.View
          animation="fadeInDown"
          delay={100}
          style={styles.header}>
          <Image
            source={{uri: character.imageUrl}}
            style={styles.characterImage}
            resizeMode="cover"
          />
          <Text style={styles.characterName}>{character.name}</Text>
          <Text style={styles.timestamp}>
            Searched by <Text style={styles.highlight}>{userName}</Text> on{' '}
            {moment().format('MMMM Do, YYYY')}
          </Text>
        </Animatable.View>

        <Animatable.View
          animation="fadeInUp"
          delay={300}
          style={styles.detailsSection}>
          <Text style={styles.sectionTitle}>
            <Icon name="info" size={20} color="#ccc" /> Character Details
          </Text>
          <View style={styles.infoCard}>
            <Text style={styles.idText}>🆔 ID: {character._id}</Text>

            {character.videoGames?.length > 0 && (
              <>
                <Text style={styles.subSectionTitle}>🎮 Video Games:</Text>
                {character.videoGames.map((game, i) => (
                  <Text key={i} style={styles.detailText}>
                    • {game}
                  </Text>
                ))}
              </>
            )}

            {character.shortFilms?.length > 0 && (
              <>
                <Text style={styles.subSectionTitle}>🎞 Short Films:</Text>
                {character.shortFilms.map((film, i) => (
                  <Text key={i} style={styles.detailText}>
                    • {film}
                  </Text>
                ))}
              </>
            )}

            {character.parkAttractions?.length > 0 && (
              <>
                <Text style={styles.subSectionTitle}>🎢 Park Attractions:</Text>
                {character.parkAttractions.map((attraction, i) => (
                  <Text key={i} style={styles.detailText}>
                    • {attraction}
                  </Text>
                ))}
              </>
            )}

            {character.allies?.length > 0 && (
              <>
                <Text style={styles.subSectionTitle}>🧑‍🤝‍🧑 Allies:</Text>
                {character.allies.map((ally, i) => (
                  <Text key={i} style={styles.detailText}>
                    • {ally}
                  </Text>
                ))}
              </>
            )}

            {character.enemies?.length > 0 && (
              <>
                <Text style={styles.subSectionTitle}>👿 Enemies:</Text>
                {character.enemies.map((enemy, i) => (
                  <Text key={i} style={styles.detailText}>
                    • {enemy}
                  </Text>
                ))}
              </>
            )}

            {character.sourceUrl && (
              <>
                <Text style={styles.subSectionTitle}>🔗 Source:</Text>
                <Text
                  style={[
                    styles.detailText,
                    {color: '#00adb5', textDecorationLine: 'underline'},
                  ]}
                  onPress={() => {
                    // Only works if you use Linking API
                    import('react-native').then(({Linking}) =>
                      Linking.openURL(character.sourceUrl),
                    );
                  }}>
                  {character.sourceUrl}
                </Text>
              </>
            )}
          </View>
        </Animatable.View>
      </ScrollView>

      {/* Sticky Footer at Bottom */}
      <View style={styles.footerContainer}>
        <Footer navigation={navigation} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  scrollContent: {
    paddingBottom: 100, // Space for the footer
  },
  header: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#0f3460',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    elevation: 6,
  },
  characterImage: {
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 4,
    borderColor: '#e94560',
    backgroundColor: '#eee',
  },
  characterName: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 12,
    color: '#fff',
  },
  timestamp: {
    fontSize: 14,
    color: '#aaa',
    marginTop: 4,
  },
  highlight: {
    fontWeight: 'bold',
    color: '#00adb5',
  },
  detailsSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#f5f5f5',
  },
  infoCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: 20,
    borderRadius: 20,
    borderColor: '#fff',
    borderWidth: 0.5,
  },
  idText: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 12,
  },
  subSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 6,
    color: '#e0e0e0',
  },
  detailText: {
    fontSize: 14,
    color: '#ccc',
    paddingLeft: 10,
  },
  footerContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
});

export default ResultScreen;
