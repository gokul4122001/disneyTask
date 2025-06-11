import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [userName, setUserName] = useState('');
  const [searchHistory, setSearchHistory] = useState([]);
  const [firstLaunch, setFirstLaunch] = useState(null);

  useEffect(() => {
    const checkFirstLaunch = async () => {
      const name = await AsyncStorage.getItem('userName');
      setFirstLaunch(!name);
      if (name) setUserName(name);
      
      const history = await AsyncStorage.getItem('searchHistory');
      if (history) setSearchHistory(JSON.parse(history));
    };
    
    checkFirstLaunch();
  }, []);

  const saveUserName = async (name) => {
    await AsyncStorage.setItem('userName', name);
    setUserName(name);
    setFirstLaunch(false);
  };

  const addSearchHistory = async (search) => {
    const newHistory = [...searchHistory, search];
    setSearchHistory(newHistory);
    await AsyncStorage.setItem('searchHistory', JSON.stringify(newHistory));
  };

  return (
    <AppContext.Provider value={{
      userName,
      saveUserName,
      firstLaunch,
      searchHistory,
      addSearchHistory
    }}>
      {children}
    </AppContext.Provider>
  );
};