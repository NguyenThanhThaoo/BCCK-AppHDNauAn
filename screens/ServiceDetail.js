import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Image, Alert } from 'react-native';
import { getFirestore, doc, getDoc, updateDoc, collection, onSnapshot, query } from '@react-native-firebase/firestore';
import firestore from '@react-native-firebase/firestore';
import { ScrollView } from 'react-native-virtualized-view';
import { TouchableOpacity } from 'react-native-gesture-handler';
import IconMT from 'react-native-vector-icons/MaterialCommunityIcons';
import auth from '@react-native-firebase/auth';
const FoodsDetail = ({ route }) => {
    const [initializing, setInitializing] = useState(true);
    const { name, ingredient, instruct, imageUrl, foods } = route.params;
    const [status, setStatus] = useState();
    const HandleLike = async () => {
        try {
            const user = auth().currentUser;
            if (user) {
              const userEmail = user.email;
              const favoritesRef = firestore().collection('favorites');
              await favoritesRef.add({
                userEmail: userEmail,
                name: name,
                imageUrl:imageUrl,
                ingredient:ingredient,
                instruct:instruct
              });
              Alert.alert("Thông báo!","Đã thêm vào yêu thích!")
            } else {
            }
          } catch (error) {
          }
    }
    const [user, setUser] = useState(null);
    const onAuthStateChanged = user => {
        setUser(user);
        if (initializing) setInitializing(false);
    };
    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber;
    }, []);
    return (
        <View style={{ backgroundColor: '#fff',height:'100%' }}>
            <ScrollView style={{ height: "89%" }}>
                <Image
                    source={{ uri: imageUrl }}
                    style={{ width: "400", height: 200, borderRadius: 10, margin: 10 }}
                />
                <View style={{ padding: 10 }}>
                    <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'black' }}>{name}</Text>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>Nguyên liệu:</Text>
                    <Text style={{ fontSize: 16, color: 'black' }}>{ingredient}</Text>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>Hướng dẫn thực hiện:</Text>
                    <Text style={{ fontSize: 16, color: 'black' }}> {instruct}</Text>
                </View>

            </ScrollView>
            <View style={{
            }}>
                {user && user.email !== 'ntthao6722@gmail.com' ? (
                <TouchableOpacity style={{
                    padding: 15,
                    backgroundColor: '#FFB90F',
                    borderRadius: 15,
                    margin: 10
                }}
                onPress={HandleLike}>
                    <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                        <IconMT name="heart" size={25} color="#fff" />
                    <Text style={{
                        marginLeft:5,
                        alignItems: 'center',
                        fontWeight: 'bold',
                        fontSize: 15,
                        color: '#fff',
                        alignSelf: 'center'

                    }}>Thêm vào yêu thích</Text>
                    
                    </View>
                    
                </TouchableOpacity>
                ):null}
            </View>

        </View>
    );
};

export default FoodsDetail;
