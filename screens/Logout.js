import React, { useEffect, useState, useContext } from 'react';
import { View, StyleSheet, Text, Alert, Pressable } from 'react-native';
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
            <Pressable
                    style={styles.textButton}
                    onPress={handleLogout}>
                    <Text style={{alignSelf: 'center', color: '#fff', fontSize: 18, fontWeight: 'bold' }}>Đăng Xuất</Text>
                </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'white',
    },
    textButton:{
        margin: 1,
        padding: 15,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        backgroundColor: '#FFB90F',
    },

    text: {
        color: 'white',
        fontWeight: 'bold',
    }
})

export default Logout;
