import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppProvider } from './src/context/AppContext';
import SplashScreen from './src/screens/SplashScreen';
import NameInputScreen from './src/screens/NameInputScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';
import SearchScreen from './src/screens/SearchScreen';
import ResultScreen from './src/screens/ResultScreen';
import ReportsScreen from './src/screens/ReportsScreen';
import CharacterSearchCount from './src/screens/CharacterSearchCount';
import ResultByName from './src/screens/ResultByName';
import NewNameScreen from './src/screens/NewNameScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <AppProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="NameInput" component={NameInputScreen} />
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Search" component={SearchScreen} />
          <Stack.Screen name="Result" component={ResultScreen} />
          <Stack.Screen name="Reports" component={ReportsScreen} />
          <Stack.Screen name="CharacterSearchCount" component={CharacterSearchCount} />
          <Stack.Screen name="ResultByName" component={ResultByName} />
          <Stack.Screen name="NewName" component={NewNameScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
};

export default App;