// import React, { useState, useEffect } from 'react';
// import { View, Text, Pressable, Image, Alert } from 'react-native';
// import { TextInput } from 'react-native-paper';
// import { getFirestore, doc, getDoc, updateDoc, collection } from '@react-native-firebase/firestore';
// import { launchImageLibrary } from 'react-native-image-picker';
// import storage from '@react-native-firebase/storage';
// import { ScrollView } from 'react-native-virtualized-view';

// const EditFoods = ({ route, navigation }) => {
//   const { itemId } = route.params;
//   const [foods, setFoods] = useState({});
//   const [name, setName] = useState('');
//   const [ingredient, setIngredient] = useState('');
//   const [instruct, setInstruct] = useState('');
//   const [imageUri, setImageUri] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       const docRef = doc(getFirestore(), 'foods', itemId);
//       const docSnap = await getDoc(docRef);
//       if (docSnap.exists()) {
//         setFoods(docSnap.data());
//         setName(docSnap.data().name);
//         setIngredient(docSnap.data().ingredient);
//         setInstruct(docSnap.data().instruct);
//         setImageUri(docSnap.data().imageUrl);
//       }
//     };
//     fetchData();
//   }, [itemId]);

//   const pickImage = () => {
//     launchImageLibrary({ mediaType: 'photo' }, (response) => {
//       if (response.didCancel) {
//         console.log('User cancelled image picker');
//       } else if (response.error) {
//         console.log('ImagePicker Error: ', response.error);
//       } else {
//         setImageUri(response.assets[0].uri);
        
//       }
//     });
//   };

//   const handleUpdate = async () => {
//     if (!foods || !ingredient || !instruct || !imageUri) {
//       Alert.alert("Thông báo!", "Vui lòng nhập đầy đủ!")
//       console.log('Please fill in all fields.');
//       return;
//     }
//     let imageUrl = null;
//     if (imageUri) {
//       const response = await fetch(imageUri);
//       const blob = await response.blob();
//       const storageRef = storage().ref(`Images/${foods}-${Date.now()}`);
//       await storageRef.put(blob);
//       imageUrl = await storageRef.getDownloadURL();
//     }

//     try {
//        await updateDoc(doc(getFirestore(), 'foods', itemId), {
//         name: name,
//         ingredient: ingredient,
//         instruct: instruct,
//         imageUrl,
//       });
//       Alert.alert("Thông báo!", "Đã cập nhật thành công!")
//       console.log('Dịch vụ đã được cập nhật thành công!');
//       navigation.goBack();
//     } catch (error) {
//       Alert.alert("Thông báo", "Cập nhật không thành công!")
//       console.error('Error updaing food:', error);
//     }


//   };
  


//   return (
//     <View style={{ backgroundColor: '#fff' }}>
//      <ScrollView>
//      <TextInput
//         style={{ margin: 10, borderRadius: 10 }}
//         placeholder="Nhập tên món ăn"
//         value={name}
//         onChangeText={(text) => setName(text)}
//         underlineColor='transparent'
//       />
//       <TextInput
//         style={{ margin: 10, borderRadius: 10 }}
//         placeholder="Nhập nguyên liệu"
//         value={ingredient}
//         onChangeText={(text) => setIngredient(text)}
//         underlineColor='transparent'
//         multiline={true}
//         numberOfLines={10}
//       />
//       <TextInput
//         style={{ margin: 10, borderRadius: 10 }}
//         placeholder="Nhập hướng dẫn thực hện"
//         value={instruct}
//         onChangeText={(text) => setInstruct(text)}
//         underlineColor='transparent'
//         multiline={true}
//         numberOfLines={10}
//       />
//        <Pressable onPress={pickImage} style={{ margin: 10 }}>
//         <Text style={{ color: 'blue' }}>Select Image</Text>
//       </Pressable>

//       {imageUri && (
//         <Image
//           source={{ uri: imageUri }}
//           style={{ width: "400", height: 200, borderRadius: 10, margin: 10 }}
//         />
//       )}
//       <View style={{ justifyContent: 'center', padding: 10 }}>
//         <Pressable
//           onPress={handleUpdate}
//           style={{
//             backgroundColor: "#FF6666",
//             alignItems: 'center',
//             padding: 15,
//             borderRadius: 10,
//           }}
//         >
//           <Text style={{ color: '#fff', fontSize: 15, fontWeight: 'bold' }}>Update</Text>
//         </Pressable>
//       </View>
//      </ScrollView>
      

//     </View>
//   );
// };

// export default EditFoods;
import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, Image, Alert } from 'react-native';
import { TextInput } from 'react-native-paper';
import { getFirestore, doc, getDoc, updateDoc } from '@react-native-firebase/firestore';
import { launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import { ScrollView } from 'react-native-virtualized-view';

const EditFoods = ({ route, navigation }) => {
  const { itemId, category: initialCategory } = route.params;
  const [foods, setFoods] = useState({});
  const [name, setName] = useState('');
  const [ingredient, setIngredient] = useState('');
  const [instruct, setInstruct] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [category, setCategory] = useState(initialCategory);

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(getFirestore(), category, itemId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setFoods(docSnap.data());
        setName(docSnap.data().name);
        setIngredient(docSnap.data().ingredient);
        setInstruct(docSnap.data().instruct);
        setImageUri(docSnap.data().imageUrl);
      }
    };
    fetchData();
  }, [itemId, category]);

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
    if (!foods || !ingredient || !instruct || !category || !imageUri) {
      Alert.alert("Thông báo!", "Vui lòng nhập đầy đủ!");
      console.log('Please fill in all fields.');
      return;
    }
    if (category !== 'foods' && category !== 'drinks') {
      Alert.alert("Thông báo!", "Vui lòng nhập foods hoặc drinks!");
      return;
    }
    let imageUrl = null;
    if (imageUri) {
      const response = await fetch(imageUri);
      const blob = await response.blob();

      const storageRef = storage().ref(`Images/${name}-${Date.now()}`);
      await storageRef.put(blob);
      imageUrl = await storageRef.getDownloadURL();
    }

    try {
      await updateDoc(doc(getFirestore(), category, itemId), {
        name: name,
        ingredient: ingredient,
        instruct: instruct,
        imageUrl,
      });
      Alert.alert("Thông báo!", "Cập nhật thành công")
      console.log('Đã cập nhật thành công!');
      navigation.goBack();
    } catch (error) {
      Alert.alert("Thông báo!", "Cập nhật không thành công")
      console.error('Error updating food:', error);
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
          placeholder="Nhập hướng dẫn thực hiện"
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

        <TextInput
          style={{ margin: 10, borderRadius: 10 }}
          placeholder="Nhập phân loại (foods/drinks)"
          value={category}
          underlineColor='transparent'
          onChangeText={(text) => setCategory(text.toLowerCase())}
        />

        <View style={{ justifyContent: 'center', padding: 10 }}>
          <Pressable
            onPress={handleUpdate}
            style={{
              backgroundColor: "#FFB90F",
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
