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

const Drinks = ({ navigation }) => {
    const currentUser = auth().currentUser
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState(null);
    const [drinks, setDrinks] = useState([]);
    const [drinksList, setfilterDrinks] = useState([]);
    const { login } = useMyContextController();
    const [showLike, setShowLike] = useState(false);
    const toggleShowLike = () => {
        setShowLike(!showLike);
    };
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

        const drinksRef = collection(db, 'drinks');

        const unsubscribe = onSnapshot(query(drinksRef), (querySnapshot) => {
            // const servicesList = [];
            // querySnapshot.forEach((doc) => {
            //     servicesList.push({ ...doc.data(), id: doc.id });
            // });
            // setServices(servicesList);
            const drinksList = [];
            // querySnapshot.forEach((doc) => {
            //     const serviceData = { ...doc.data(), id: doc.id };
            //     servicesList.push(serviceData);
            // });
            // setServices(servicesList);
            if (querySnapshot) {
                querySnapshot.forEach((doc) => {
                    if (doc && doc.data()) {
                        const drinksData = { ...doc.data(), id: doc.id };
                        drinksList.push(drinksData);
                    }
                });
            }

            setDrinks(drinksList);
            setfilterDrinks(drinksList);
        });
        return () => unsubscribe();
    }, [db]);


    const handleSearch = (query) => {
        const filterData = drinks.filter((drink) =>
            drink.name.toLowerCase().includes(query.toLowerCase())
        );
        setfilterDrinks(filterData);
    };
    const handleDetails = (drinks) => {
        navigation.navigate('FoodsDetail', {
            name: drinks.name,
            ingredient: drinks.ingredient,
            instruct: drinks.instruct,
            imageUrl: drinks.imageUrl
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
                            await db.collection('drinks').doc(itemId).delete();
                            Alert.alert("Thông báo !", "Món đã được xóa thành công!")

                        } catch (error) {
                            console.error('Lỗi khi xóa món:', error);
                        }
                    },
                },
            ],
            { cancelable: false }
        );
    };
    const handleEdit = (itemId, category) => {
        navigation.navigate('EditFoods', { itemId, category });
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
                    <Text style={{ fontWeight: 'bold', color: '#FF6666', fontSize: 22 }}>Hôm Nay Bạn Uống Gì?</Text>
                </View>
                {user && user.email === 'ntthao6722@gmail.com' ? (<TouchableOpacity onPress={() => navigation.navigate('AddFoods')}>
                    <Text>
                        <Icon name="playlist-add" size={35} color="#20B2AA" />
                    </Text>
                </TouchableOpacity>) : null}

            </View>
            <ScrollView>
                <FlatList
                    style={{ marginBottom: 150 }}
                    data={drinksList}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={{ flexDirection: 'row', margin: 5 }}>
                            <View style={styles.item}>
                                <TouchableOpacity onPress={() => handleDetails(item)}>

                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>

                                            {item.imageUrl !== "" ? (<Image source={{ uri: item.imageUrl }}
                                                style={{
                                                    width: 120,
                                                    height: 135,
                                                    objectFit: 'cover',
                                                    borderRadius: 20
                                                }} />) : null}
                                            <View style={{ flexDirection: 'column', marginLeft: 10 }}>
                                                <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#FF6666', flexWrap: 'wrap', width: 150 }}>{item.name}</Text>
                                            </View>

                                        </View>
                                        {user && user.email === 'ntthao6722@gmail.com' ? (

                                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginRight: 10 }}>
                                                <TouchableOpacity
                                                    style={{ padding: 5, backgroundColor: 'green', borderRadius: 100, margin: 5 }}
                                                    onPress={() => handleEdit(item.id)}>
                                                    <Icon name="edit" size={24} color="#fff" />
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    style={{ padding: 5, backgroundColor: 'red', borderRadius: 100, margin: 5 }}
                                                    onPress={() => handleDelete(item.id)}>
                                                    <Icon name="delete" size={24} color="#fff" />
                                                </TouchableOpacity>
                                            </View>
                                        ) : null}
                                    </View>
                                </TouchableOpacity>
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
        borderWidth: 1,
        padding: 5,
        height: 155,
        borderColor: '#FFB90F',
        borderRadius: 20,
        justifyContent: 'center'
    }
});
export default Drinks;


