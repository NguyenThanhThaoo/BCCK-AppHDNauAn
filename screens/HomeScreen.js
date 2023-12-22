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
import Drinks from './Drinks';
import LikeFoods from './LikeFoods';

const Tab = createBottomTabNavigator();
const getTabBarIcon = icon => ({ tintColor }) => (
  <Icon name={icon} size={26} style={{ color: "#FF8C00" }} />
);

const Tabs = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);
  const currentUser = auth().currentUser
  useEffect(() => {
    if (currentUser) {
        console.log(currentUser.email);
    }
}, [currentUser]);
const onAuthStateChanged = user => {
    setUser(user);
    if (initializing) setInitializing(false);
};
useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
}, []);
  return (
    <Tab.Navigator
      initialRouteName='Services'
      barStyle={{ backgroundColor: "#FF8C00" }}
      labeled={false}
      activeTintColor={{ color: "#FF8C00" }}
      inactiveColor={{ color: "#FF8C00" }}
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
        component={Drinks}
        options={{
          tabBarIcon: getTabBarIcon('local-cafe'),
        }}
      />
      {user && user.email !== 'ntthao6722@gmail.com' ? (
      <Tab.Screen
        name="Yêu thích"
        component={LikeFoods}
        options={{
          tabBarIcon: getTabBarIcon('favorite'),
        }}
      /> ) :null}
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


