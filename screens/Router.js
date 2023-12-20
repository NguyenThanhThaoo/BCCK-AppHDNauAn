import React from "react";
//import 'react-native-gesture-handler';
import { View, Text, StyleSheet } from "react-native";
import { useMyContextController } from "../context";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "./HomeScreen";
import ServiceDetail from "../screens/ServiceDetail";
import Services from "./Services";
import firestore from '@react-native-firebase/firestore';
import AddServices from "../AddService";
import EditServices from "../screens/EditServices";
import Tabs from "./HomeScreen";
import Logout from "../screens/Logout";
import SignUp from "./SignUp";


const Stack = createStackNavigator();
const Router = () => {
    // const [controller, dispatch] = useMyContextController();
    // const { userLogin } = controller;
    // console.log(userLogin)
    return (
        // <Stack.Navigator independent={true}>
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}  />
            <Stack.Screen name="Home" component={HomeScreen}options={{ headerShown: false }}  />
            <Stack.Screen name="Services" component={Services}options={{ headerShown: false }}  />
            <Stack.Screen name="AddServices" component={AddServices} />
            <Stack.Screen name="ServiceDetail" component={ServiceDetail} />
            <Stack.Screen name="EditServices" component={EditServices} />
            <Stack.Screen name="Logout" component={Logout} options={{ headerShown: false }} />
            <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
        </Stack.Navigator>

    );
};
export default Router;

