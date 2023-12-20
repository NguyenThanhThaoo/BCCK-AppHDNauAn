import 'react-native-gesture-handler';
import React, { useEffect, useState, useContext } from 'react';
import { View, Text, FlatList, Pressable, StyleSheet, Alert, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getFirestore, collection, query, onSnapshot } from '@react-native-firebase/firestore';
import { createStackNavigator } from '@react-navigation/stack';
import AddServices from '../AddService';
import { Searchbar } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ScrollView } from 'react-native-virtualized-view';
import { MyContextControllerProvider, useMyContextController, MyContext } from '../context';
import auth from '@react-native-firebase/auth';

const Foods = ({ navigation }) => {
    const currentUser = auth().currentUser;
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState(null);
    const [foods, setFoods] = useState([]);
    const [foodsList, setfilterFoods] = useState([]);
    const {login} = useMyContextController();
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
    const db = getFirestore();
    useEffect(() => {
        Icon.loadFont();
    
        const foodsRef = collection(db, 'foods');

        const unsubscribe = onSnapshot(query(foodsRef), (querySnapshot) => {
            // const servicesList = [];
            // querySnapshot.forEach((doc) => {
            //     servicesList.push({ ...doc.data(), id: doc.id });
            // });
            // setServices(servicesList);
            const foodsList = [];
            // querySnapshot.forEach((doc) => {
            //     const serviceData = { ...doc.data(), id: doc.id };
            //     servicesList.push(serviceData);
            // });
            // setServices(servicesList);
            if (querySnapshot) {
                querySnapshot.forEach((doc) => {
                    if (doc && doc.data()) {
                        const foodsData = { ...doc.data(), id: doc.id };
                        foodsList.push(foodsData);
                    }
                });
            }

            setFoods(foodsList);
            setfilterFoods(foodsList);
        });
        return () => unsubscribe();
    }, [db]);


    const handleSearch = (query) => {
        const filterData = foods.filter((food) =>
            food.name.toLowerCase().includes(query.toLowerCase())
        );
        setfilterFoods(filterData);
    };
    const handleDetails = (foods) => {
        navigation.navigate('ServiceDetail', {
            name: foods.name,
            price: foods.price,
            imageUrl: foods.imageUrl
        });
    };

    const handleDelete = (itemId) => {
        Alert.alert(
            'Xác nhận xoá',
            'Bạn có chắc chắn muốn xoá không?',
            [
                {
                    text: 'Hủy',
                    style: 'cancel',

                },
                {
                    text: 'Xoá',
                    onPress: async () => {
                        try {
                            await db.collection('foods').doc(itemId).delete();
                            console.log('Món đã được xóa thành công!');
                        } catch (error) {
                            console.error('Lỗi khi xóa món:', error);
                        }
                    },
                },
            ],
            { cancelable: false }
        );
    };
    const handleEdit = (itemId) => {
        navigation.navigate('EditServices', { itemId });
    };


    return (
        <View style={{ backgroundColor: '#fff' }}>
            <View style={{ width: "95%", alignItems: 'center', alignSelf: 'center', margin: 10 }}>
                <Searchbar
                    style={{
                        ...styles.item,
                        padding: 2,
                        backgroundColor: 'transparent',
                        margin: 0,
                        height: 60,
                        justifyContent: 'center',
                    }}
                    placeholder="Tìm kiếm..."
                    onChangeText={handleSearch}
                />
            </View>
            <View style={styles.container}>
                <View>
                    <Text style={{ fontWeight: '900', color: '#FF6666' }}>Món Ngon Mỗi Ngày</Text>
                    </View>
              {user && user.email === 'ntthao6722@gmail.com'?(  <TouchableOpacity onPress={() => navigation.navigate('AddServices')}>
                    <Text>
                        <Icon name="playlist-add" size={35} color="#FF6699" />
                    </Text>
                </TouchableOpacity>):null}
          
            </View>
            <ScrollView>
                <FlatList
                    style={{ marginBottom: 150 }}
                    data={foodsList}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={{ flexDirection: 'row', margin: 5 }}>
                            <View style={styles.item}>
                                <Pressable onPress={() => handleDetails(item)}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>

                                            {item.imageUrl !== "" ? (<Image source={{ uri: item.imageUrl }}
                                                style={{
                                                    width: 135,
                                                    height: 135,
                                                    objectFit: 'cover',
                                                    borderRadius: 20
                                                }} />) : null}
                                            <View style={{ flexDirection: 'column', marginLeft: 20 }}>
                                                <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#FF6666' }}>{item.name}</Text>
                                                <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'black' }}>{item.price + " " + "vnđ"}</Text>
                                            </View>
                                        </View>

                                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                            <TouchableOpacity onPress={() => handleEdit(item.id)}>
                                                <Icon name="edit" size={24} color="#6699FF" />
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => handleDelete(item.id)}>
                                                <Icon name="delete" size={24} color="#FF6666" />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </Pressable>
                            </View>
                        </View>
                    )}
                />







            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
    },
    item: {
        width: '100%',
        borderWidth: 2,
        padding: 5,
        height: 155,
        borderColor: '#FF6666',
        borderRadius: 20,
        justifyContent: 'center'
    }
});
export default Foods;


