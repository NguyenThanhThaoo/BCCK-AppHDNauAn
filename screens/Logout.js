import React, { useEffect, useState, useContext } from 'react';
import { View, StyleSheet, Text, Alert, Button } from 'react-native';
import { BackHandler } from 'react-native';
import auth from '@react-native-firebase/auth';
import { MyContextControllerProvider, useMyContextController, MyContext, logout } from '../context';

const Logout = ({ navigation }) => {
    const [controller, dispatch] = useMyContextController();
    const { logout } = controller;
    const handleLogout = async () => {
        try {
           await auth().signOut(); 
            navigation.navigate('Login');
        } catch (error) {
            console.error('Lỗi khi đăng xuất:', error);
        }
    };
    return (
        <View style={styles.container}>
            <Button title="Đăng Xuất" color='#FF6699' onPress={handleLogout} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    text: {
        color: 'white',
        fontWeight: 'bold',
    }
})

export default Logout;
