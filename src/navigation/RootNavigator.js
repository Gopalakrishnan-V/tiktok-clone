import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/Home';
import MainTabNavigator from './MainTabNavigator';

const Stack = createStackNavigator();

const AppStack = ({isLoggedIn}) => (
  <Stack.Navigator>
    {!isLoggedIn ? (
      <></>
    ) : (
      <>
        <Stack.Screen
          name="Main"
          component={MainTabNavigator}
          options={{header: () => null}}
        />
      </>
    )}
  </Stack.Navigator>
);

export default AppStack;
