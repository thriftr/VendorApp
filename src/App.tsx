import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Splash } from '../src/components/screens/SplashScreen';
import { RegisterScreen } from '../src/components/screens/RegistrationScreen';
import { DashboardScreen } from '../src/components/screens/DashboardScreen';
import { RootParamList } from './navigation/types';
import 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';
enableScreens();

const Stack = createStackNavigator<RootParamList>();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean | null>(null);

  useEffect(() => {
    // Check if vendor is logged in
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem('authToken');
      setIsLoggedIn(!!token);
    };
    checkAuth();
  }, []);

  if (isLoggedIn === null) {
    return <Splash />; // Show splash while checking auth
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          <Stack.Screen name="Home" component={DashboardScreen} />
        ) : (
          <Stack.Screen name="Register" component={RegisterScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
