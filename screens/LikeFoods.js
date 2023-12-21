import 'react-native-gesture-handler';
import React, { useEffect, useState, useContext } from 'react';
import { View, Text, FlatList, Pressable, StyleSheet, Alert, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconMT from 'react-native-vector-icons/MaterialCommunityIcons';
import { getFirestore, collection, query, onSnapshot } from '@react-native-firebase/firestore';
import { createStackNavigator } from '@react-navigation/stack';
import AddServices from '../AddService';
import { Searchbar } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ScrollView } from 'react-native-virtualized-view';
import { MyContextControllerProvider, useMyContextController, MyContext } from '../context';
import auth from '@react-native-firebase/auth';
const likeFoods = ({navigation}) => {
    const 

}