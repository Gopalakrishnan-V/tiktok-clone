import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import IonIcon from 'react-native-vector-icons/Ionicons';
import Home from '../screens/Home';
import {withTheme} from 'react-native-paper';
import Colors from '../styles/Colors';
import {StyleSheet} from 'react-native';

const Tab = createMaterialBottomTabNavigator();

const MainTabNavigator = (props) => {
  //   const {colors} = props.theme;

  return (
    <Tab.Navigator
      initialRouteName="Home"
      labeled={false}
      activeColor={Colors.WHITE}
      inactiveColor={Colors.GRAY}
      barStyle={styles.bar}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({focused, color}) => (
            <EntypoIcon name="home" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Home}
        options={{
          tabBarIcon: ({focused, color}) => (
            <IonIcon name="search" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Create"
        component={Home}
        options={{
          tabBarIcon: ({focused, color}) => (
            <IonIcon name="add-circle" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={Home}
        options={{
          tabBarIcon: ({focused, color}) => (
            <IonIcon name="notifications" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Home}
        options={{
          tabBarIcon: ({focused, color}) => (
            <IonIcon name="person" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default withTheme(MainTabNavigator);

const styles = StyleSheet.create({
  bar: {
    backgroundColor: Colors.BLACK,
  },
  empty: {
    flex: 1,
  },
});
