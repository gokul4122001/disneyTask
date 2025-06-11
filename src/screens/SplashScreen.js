import React, {useEffect, useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';
import {AppContext} from '../context/AppContext';

const SplashScreen = ({navigation}) => {
  const {firstLaunch} = useContext(AppContext);
  useEffect(() => {
    const timeout = setTimeout(() => {
        navigation.replace(firstLaunch ? 'NameInput' : 'Welcome');
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <View style={styles.container}>
      <LottieView
        source={require('../assets/disney_logo.json')}
        autoPlay
        loop={false}
        style={{width: 500, height: 600}} // 👈 Add size!
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Optional: dark background
    justifyContent: 'center',
    alignItems: 'center',
  },
});
