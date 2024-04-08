import React, {useEffect, useState} from 'react';
import {View, Button, Image, Text} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import {API_URL} from '../../env';
import Post from '../../Requests/Post';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Test = () => {
  const [imageData, setImageData] = useState();

  const pickImage = () => {
    const a: ImagePicker.MediaType = 'photo';
    const options = {
      title: 'Select Avatar',
      mediaType: a,
    };

    ImagePicker.launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets) {
        uploadImage(response);
      }
    });
  };
  useEffect(() => {}, [imageData]);
  const uploadImage = async (imageData: any) => {
    const formData = new FormData();
    formData.append('image', {
      uri: imageData.assets[0].uri,
      type: imageData.assets[0].type,
      name: imageData.assets[0].fileName,
    });

    formData.append('data', JSON.stringify({
      key1: 'value1',
      key2: 'value2',
    }));
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await Post(API_URL + '/doctor/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Upload successful:', response.imageUrl);
      setImageData(response.imageUrl);
    } catch (error) {
      console.error('Upload error:', error);
    }
  };
  const [imageLoad, setImageLoad] = useState(false);
  console.log(imageData);
  return (
    <View>
      <Button title="Pick an image" onPress={pickImage} />

      <Image
        source={{uri: imageData}}
        style={{width: 200, height: 200, resizeMode: 'cover'}}
        onError={error => console.log('Image loading error:', error)}
        onL
      />
    </View>
  );
};

export default Test;
