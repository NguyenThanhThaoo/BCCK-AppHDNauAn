import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import { TextInput } from 'react-native-paper';
import { getFirestore, doc, getDoc, updateDoc, collection } from '@react-native-firebase/firestore';
import { launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import { ScrollView } from 'react-native-virtualized-view';

const EditFoods = ({ route, navigation }) => {
  const { itemId } = route.params;
  const [foods, setFoods] = useState({});
  const [name, setName] = useState('');
  // const [price, setPrice] = useState('');
  const [ingredient, setIngredient] = useState('');
  const [instruct, setInstruct] = useState('');
  const [imageUri, setImageUri] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(getFirestore(), 'foods', itemId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setFoods(docSnap.data());
        setName(docSnap.data().name);
        setName(docSnap.data().ingredient);
        setName(docSnap.data().instruct);
        // setPrice(docSnap.data().price.toString());
        setImageUri(docSnap.data().imageUrl);
      }
    };
    fetchData();
  }, [itemId]);

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

  const handleUpdate = async () => {
    // try {
    //   const priceValue = parseFloat(price);
    // if (isNaN(priceValue)) {
    //   Alert.alert('', 'Invalid number');
    //   return;
    // }
    // let imageUrl = null;
    //   if (imageUri) {
    //     const response = await fetch(imageUri);
    //     const blob = await response.blob();
  
    //     const storageRef = storage().ref(`Images/${foods}-${Date.now()}`);
    //     await storageRef.put(blob);
    //     imageUrl = await storageRef.getDownloadURL();
    //   }

    //   await updateDoc(doc(getFirestore(), 'foods', itemId), {
    //     name: name,
    //     ingredient: ingredient,
    //     instruct: instruct,
    //     // price: priceValue,
    //     imageUrl,
    //   });
    //   console.log('Dịch vụ đã được cập nhật thành công!');
    //   navigation.goBack();
    // } catch (error) {
    //   console.error('Error adding food:', error);
    // }

    if (!foods || !ingredient || !instruct) {
      console.log('Please fill in all fields.');
      return;
    }
    // const foodsRef = collection(db, 'foods');
    let imageUrl = null;
    if (imageUri) {
      const response = await fetch(imageUri);
      const blob = await response.blob();

      const storageRef = storage().ref(`Images/${foods}-${Date.now()}`);
      await storageRef.put(blob);
      imageUrl = await storageRef.getDownloadURL();
    }

    try {
      await updateDoc(doc(getFirestore(), 'foods', itemId), {
        name: name,
        ingredient: ingredient,
        instruct: instruct,
        imageUrl,
      });

       console.log('Dịch vụ đã được cập nhật thành công!');
      navigation.goBack();
    } catch (error) {
      console.error('Error adding food:', error);
    }


  };
  


  return (
    <View style={{ backgroundColor: '#fff' }}>
     <ScrollView>
     <TextInput
        style={{ margin: 10, borderRadius: 10 }}
        placeholder="Nhập tên món ăn"
        value={name}
        onChangeText={(text) => setName(text)}
        underlineColor='transparent'
      />
      {/* <TextInput
        style={{ margin: 10, borderRadius: 10 }}
        placeholder="Price"
        value={price}
        onChangeText={(text) => setPrice(text)}
        underlineColor='transparent'
      /> */}
      <TextInput
        style={{ margin: 10, borderRadius: 10 }}
        placeholder="Nhập nguyên liệu"
        value={ingredient}
        onChangeText={(text) => setIngredient(text)}
        underlineColor='transparent'
        multiline={true}
        numberOfLines={10}
      />
      <TextInput
        style={{ margin: 10, borderRadius: 10 }}
        placeholder="Nhập hướng dẫn thực hện"
        value={instruct}
        onChangeText={(text) => setInstruct(text)}
        underlineColor='transparent'
        multiline={true}
        numberOfLines={10}
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
          onPress={handleUpdate}
          style={{
            backgroundColor: "#FF6666",
            alignItems: 'center',
            padding: 15,
            borderRadius: 10,
          }}
        >
          <Text style={{ color: '#fff', fontSize: 15, fontWeight: 'bold' }}>Update</Text>
        </Pressable>
      </View>
     </ScrollView>
      

    </View>
  );
};

export default EditFoods;
