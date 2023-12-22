import React, { useState } from 'react';
import { View, Text, Image, Pressable, Alert } from 'react-native';
import { TextInput } from 'react-native-paper';
import { getFirestore, collection, addDoc } from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { launchImageLibrary } from 'react-native-image-picker';
import { ScrollView } from 'react-native-virtualized-view';

const AddFoods = ({ navigation }) => {
  const [foods, setFoods] = useState('');
  const [ingredient, setIngredient] = useState('');
  const [instruct, setInstruct] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [category, setCategory] = useState(''); 
  const db = getFirestore();

  const pickImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        setImageUri(response.assets[0].uri);
      }
    });
  };

  const handleAddFoods = async () => {
    if (!foods || !ingredient || !instruct || !category || !imageUri) {
      Alert.alert("Thông báo!", "Vui lòng nhập đầy đủ!");
      console.log('Please fill in all fields.');
      return;
    }
    if (category !== 'foods' && category !== 'drinks') {
      Alert.alert("Thông báo!", "Vui lòng nhập foods hoặc drinks !");
      return;
    }

    

    const foodsRef = collection(db, category); 

    let imageUrl = null;
    if (imageUri) {
      const response = await fetch(imageUri);
      const blob = await response.blob();

      const storageRef = storage().ref(`Images/${foods}-${Date.now()}`);
      await storageRef.put(blob);
      imageUrl = await storageRef.getDownloadURL();
    }

    try {
      await addDoc(foodsRef, {
        name: foods,
        ingredient: ingredient,
        instruct: instruct,
        imageUrl,
        status: 'unlike',
        category,
      });

      navigation.navigate('Home');
      setFoods('');
      setImageUri(null);
      setIngredient('');
      setInstruct('');
      setCategory(''); 
    } catch (error) {
      console.error('Error adding food: ', error);
    }
  };

  return (
    <View style={{ backgroundColor: '#fff' }}>
      <ScrollView>
        <TextInput
          style={{ margin: 10, borderRadius: 10 }}
          placeholder="Nhập tên món ăn"
          value={foods}
          underlineColor='transparent'
          onChangeText={foods => setFoods(foods)}
        />
        <TextInput
          style={{ margin: 10, borderRadius: 10 }}
          placeholder="Nhập nguyên liệu"
          value={ingredient}
          underlineColor='transparent'
          onChangeText={ingredient => setIngredient(ingredient)}
          multiline={true}
          numberOfLines={8}
        />
        <TextInput
          style={{ margin: 10, borderRadius: 10 }}
          placeholder="Nhập hướng dẫn thực hện"
          value={instruct}
          underlineColor='transparent'
          onChangeText={instruct => setInstruct(instruct)}
          multiline={true}
          numberOfLines={10}
        />
        <TextInput
          style={{ margin: 10, borderRadius: 10 }}
          placeholder="Nhập phân loại (foods/drinks)"
          value={category}
          underlineColor='transparent'
          onChangeText={(category) => setCategory(category.toLowerCase())}
        />

        <Pressable onPress={pickImage} style={{ margin: 10 }}>
          <Text style={{ color: 'blue' }}>Select Image</Text>
        </Pressable>

        {imageUri && (
          <Image
            source={{ uri: imageUri }}
            style={{ width: "400", height: 200, borderRadius: 10, margin: 10 }}
          />
        )}
        <View style={{ justifyContent: 'center', padding: 10 }}>
          <Pressable
            onPress={handleAddFoods}
            style={{
              backgroundColor: "#FFB90F",
              alignItems: 'center',
              padding: 15,
              borderRadius: 10,
            }}
          >
            <Text style={{ color: '#fff', fontSize: 15, fontWeight: 'bold' }}>Add</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

export default AddFoods;



