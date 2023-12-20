import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';
import LoginScreen from './LoginScreen';
import { HomeScreen } from '../screens/HomeScreen'
import Services from './Services';
import AddServices from '../AddService';
import Logout from './Logout';
import Icon from 'react-native-vector-icons/MaterialIcons';



const Tab = createBottomTabNavigator();


const getTabBarIcon = icon => ({ tintColor }) => (
  <Icon name={icon} size={26} style={{ color: "#FF6699" }} />
);

const Tabs = () => {
  
  return (
    <Tab.Navigator
      initialRouteName='Services'
      barStyle={{ backgroundColor: "#FF6699" }}
      labeled={false}
      activeTintColor={{ color: "#FF6699" }}
      inactiveColor={{ color: "#FF6699" }}
    >
      <Tab.Screen
        name="Món ăn"
        component={Services}
        options={{
          tabBarIcon: getTabBarIcon('restaurant-menu'),
        }}
      />
      <Tab.Screen
        name="Đồ uống"
        component={Logout}
        options={{
          tabBarIcon: getTabBarIcon('local-cafe'),
        }}
      />
      <Tab.Screen
        name="Yêu thích"
        component={Logout}
        options={{
          tabBarIcon: getTabBarIcon('favorite'),
        }}
      />
      <Tab.Screen
        name="Đăng xuất"
        component={Logout}
        options={{
          tabBarIcon: getTabBarIcon('logout'),
        }}
      />
    </Tab.Navigator>
  );
}

export default Tabs;


