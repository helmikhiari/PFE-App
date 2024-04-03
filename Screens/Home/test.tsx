import axios from 'axios';
import {useEffect, useState} from 'react';
import {API_URL} from '../../env';
import {Image, View} from 'react-native';

export default function Test() {
  const [imageUri, setImageUri] = useState(null);
  useEffect(() => {
    const fetchImage = async () => {
      try {
        console.log('ff');
        const response = await axios.get(API_URL + '/doctor/allDoctors');
        console.log('respone' + response);
        const imageUrl = `data:image/jpeg;base64,${response.data.imageData}`;
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    };
    fetchImage();
  }, []);

  return <></>;
}
