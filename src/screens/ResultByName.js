import React, { useContext } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { AppContext } from '../context/AppContext';
import moment from 'moment';
import Footer from '../components/Footer';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';

const ResultByName = ({ navigation }) => {
  const { searchHistory } = useContext(AppContext);

  const getUserSearchCount = () => {
    const countMap = {};
    searchHistory.forEach((search) => {
      if (!countMap[search.userName]) {
        countMap[search.userName] = {
          name: search.userName,
          count: 0,
          timestamps: [],
        };
      }
      countMap[search.userName].count++;
      countMap[search.userName].timestamps.push(search.timestamp);
    });

    return Object.values(countMap).sort((a, b) => b.count - a.count);
  };

  const userData = getUserSearchCount();

  const renderItem = ({ item, index }) => (
    <Animatable.View
      animation="fadeInUp"
      delay={index * 100}
      useNativeDriver
    >
      <TouchableOpacity
        style={styles.cardWrapper}
        onPress={() =>
          navigation.navigate('SearchHistoryDetail', {
            title: item.name,
            timestamps: item.timestamps,
          })
        }
      >
        <LinearGradient
          colors={['#0f3460', '#16213e']}
          style={styles.card}
        >
          <Text style={styles.userName}>{item.name}</Text>
          <Text style={styles.count}>🔍 Searched {item.count} times</Text>
          <Text style={styles.lastSeen}>
            ⏱ Last: {moment(item.timestamps[item.timestamps.length - 1]).fromNow()}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </Animatable.View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a2e" />
      <Text style={styles.title}>👤 Search Count by User</Text>

      <FlatList
        data={userData}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={styles.empty}>No user searches yet.</Text>
        }
      />

      <Footer navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    padding: 16,
    paddingBottom: 90,
  },
  title: {
    fontSize: 24,
    color: '#e94560',
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
  },
  list: {
    paddingBottom: 16,
  },
  cardWrapper: {
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 5,
  },
  card: {
    padding: 20,
    borderRadius: 16,
    shadowColor: '#00adb5',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  userName: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 6,
  },
  count: {
    fontSize: 14,
    color: '#ccc',
    marginBottom: 4,
  },
  lastSeen: {
    fontSize: 12,
    color: '#888',
  },
  empty: {
    color: '#aaa',
    textAlign: 'center',
    marginTop: 60,
    fontSize: 16,
  },
});

export default ResultByName;
