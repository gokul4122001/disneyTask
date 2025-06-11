import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import Footer from '../components/Footer';
import { AppContext } from '../context/AppContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Animatable from 'react-native-animatable';

const { width } = Dimensions.get('window');

const ReportsScreen = ({ navigation }) => {
  const { searchHistory } = useContext(AppContext);

  const processSearchData = () => {
    const characterCounts = {};
    const userCounts = {};

    searchHistory.forEach((search) => {
      characterCounts[search.characterName] =
        (characterCounts[search.characterName] || 0) + 1;

      userCounts[search.userName] =
        (userCounts[search.userName] || 0) + 1;
    });

    return { characterCounts, userCounts };
  };

  const { characterCounts, userCounts } = processSearchData();

  const characterChartData = {
    labels: Object.keys(characterCounts).slice(0, 5),
    datasets: [
      {
        data: Object.values(characterCounts).slice(0, 5),
      },
    ],
  };

  const userChartData = {
    labels: Object.keys(userCounts).slice(0, 5),
    datasets: [
      {
        data: Object.values(userCounts).slice(0, 5),
      },
    ],
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📊 Search Analytics</Text>

      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <Animatable.View animation="fadeInUp" delay={100} style={styles.card}>
          <Text style={styles.chartTitle}>Top Characters Searched</Text>
          <BarChart
            data={characterChartData}
            width={width - 40}
            height={220}
            yAxisLabel=""
            chartConfig={chartConfig}
            style={styles.chart}
          />
        </Animatable.View>

        <Animatable.View animation="fadeInUp" delay={200} style={styles.card}>
          <Text style={styles.chartTitle}>Searches by Users</Text>
          <BarChart
            data={userChartData}
            width={width - 40}
            height={220}
            yAxisLabel=""
            chartConfig={chartConfig}
            style={styles.chart}
          />
        </Animatable.View>

        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('CharacterSearchCount')}
          >
            <Icon name="account-search" size={20} color="#fff" />
            <Text style={styles.buttonText}>Character Stats</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('ResultByName')}
          >
            <Icon name="account-multiple" size={20} color="#fff" />
            <Text style={styles.buttonText}>User Results</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.footerContainer}>
        <Footer navigation={navigation} />
      </View>
    </View>
  );
};

const chartConfig = {
  backgroundColor: '#1a1a2e',
  backgroundGradientFrom: '#1a1a2e',
  backgroundGradientTo: '#1a1a2e',
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(75,192,255,${opacity})`,
  labelColor: (opacity = 1) => `rgba(255,255,255,${opacity})`,
  propsForBackgroundLines: {
    stroke: '#333',
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 16,
    padding: 15,
    marginBottom: 25,
    borderColor: '#444',
    borderWidth: 1,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
    color: '#fff',
  },
  chart: {
    borderRadius: 12,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#00adb5',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 30,
  },
  buttonText: {
    color: '#fff',
    marginLeft: 8,
    fontWeight: '600',
    fontSize: 14,
  },
  footerContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
});

export default ReportsScreen;
