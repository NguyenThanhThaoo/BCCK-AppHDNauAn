import React from "react";
//import 'react-native-gesture-handler';
import { View, Text, StyleSheet } from "react-native";
import { useMyContextController } from "../context";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "./HomeScreen";
import firestore from '@react-native-firebase/firestore';
import AddFoods from "../AddService";
import EditFoods from "../screens/EditServices";
import Tabs from "./HomeScreen";
import Logout from "../screens/Logout";
import SignUp from "./SignUp";
import Foods from "./Services";
import FoodsDetail from "../screens/ServiceDetail";


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
            <Stack.Screen name="Foods" component={Foods}options={{ headerShown: false }}  />
            <Stack.Screen name="AddFoods" component={AddFoods} />
            <Stack.Screen name="FoodsDetail" component={FoodsDetail} />
            <Stack.Screen name="EditFoods" component={EditFoods} />
            <Stack.Screen name="Logout" component={Logout} options={{ headerShown: false }} />
            <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
        </Stack.Navigator>

    );
};
export default Router;

