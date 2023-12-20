import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import { TextInput } from 'react-native-paper';
import { getFirestore, doc, getDoc, updateDoc, collection } from '@react-native-firebase/firestore';
import { launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';

const EditFoods = ({ route, navigation }) => {
  const { itemId } = route.params;
  const [foods, setFoods] = useState({});
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [imageUri, setImageUri] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(getFirestore(), 'foods', itemId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setFoods(docSnap.data());
        setName(docSnap.data().name);
        setPrice(docSnap.data().price.toString());
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
    try {
      const priceValue = parseFloat(price);
    if (isNaN(priceValue)) {
      Alert.alert('', 'Invalid number');
      return;
    }
    let imageUrl = null;
      if (imageUri) {
        const response = await fetch(imageUri);
        const blob = await response.blob();
  
        const storageRef = storage().ref(`Images/${foods}-${Date.now()}`);
        await storageRef.put(blob);
        imageUrl = await storageRef.getDownloadURL();
      }

      await updateDoc(doc(getFirestore(), 'foods', itemId), {
        name:name,
        price: priceValue,
        imageUrl,
      });
      console.log('Dịch vụ đã được cập nhật thành công!');
      navigation.goBack();
    } catch (error) {
      console.error('Lỗi khi cập nhật dịch vụ:', error);
    }
  };
  


  return (
    <View style={{ backgroundColor: '#fff' }}>
     
      <TextInput
        style={{ margin: 10, borderRadius: 10 }}
        placeholder="Service Name"
        value={name}
        onChangeText={(text) => setName(text)}
        underlineColor='transparent'
      />
      <TextInput
        style={{ margin: 10, borderRadius: 10 }}
        placeholder="Price"
        value={price}
        onChangeText={(text) => setPrice(text)}
        underlineColor='transparent'
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

    </View>
  );
};

export default EditFoods;
