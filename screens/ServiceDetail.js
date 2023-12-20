import React from 'react';
import { View, Text, Image } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const FoodsDetail = ({ route }) => {
    const { name, price, imageUrl } = route.params;

    return (
        <View>
            <View style={{ padding: 10 }}>
                <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'black' }}>Name: {name}</Text>
                <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'black' }}>Price: {price}</Text>
            </View>
            <Image
                source={{ uri: imageUrl }}
                style={{ width: "400", height: 200, borderRadius: 10, margin: 10 }}
            />
        </View>
    );
};

export default FoodsDetail;
