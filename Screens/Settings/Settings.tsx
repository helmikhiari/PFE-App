import React, {useRef, useState} from 'react';
import {StyleSheet, Text, View, useWindowDimensions} from 'react-native';
import {MediaType, PresentationStyle} from 'react-native-image-picker';
import ImagePicker from '../../Components/ImagePicker';
import ListButton from '../../Components/ListButton';
import Line from '../../Components/Line';
import {BottomSheet, Button} from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Post from '../../Requests/Post';
import { API_URL } from '../../env';
import Patch from '../../Requests/Patch';

export default function Settings({navigation}: any) {
  const [avatarSource, setAvatarSource] = useState(null);
  const [isVisible, setIsVisible] = useState(false);


  async function handleLogout() {
    try {
      setIsVisible(false);
      await AsyncStorage.removeItem('token');
      navigation.replace('Login');
    } catch (error) {
      console.error('Error removing data:', error);
    }
  }

  const Logout = () => {
    const x = useWindowDimensions();

    return (
      <View style={{...logoutStyles.container, height: x.height / 5}}>
        <View style={{alignItems: 'center'}}>
          <Text style={logoutStyles.title}>Logout</Text>
          <Line />
          <Text style={logoutStyles.subtitle}>
            Are you sure you want to log out?
          </Text>
        </View>
        <View style={logoutStyles.innerContainer}>
          <Button
            color={'#E5E7EB'}
            title={'Cancel'}
            titleStyle={{color: '#1C2A3A', ...logoutStyles.buttonText}}
            containerStyle={logoutStyles.buttonContainer}
            onPress={() => {
              setIsVisible(false);
            }}
          />
          <Button
            color={'#1C2A3A'}
            title={'Yes, Log out'}
            titleStyle={{color: '#E5E7EB', ...logoutStyles.buttonText}}
            containerStyle={logoutStyles.buttonContainer}
            onPress={() => {
              handleLogout();
            }}
          />
        </View>
      </View>
    );
  };

  const changeImage = async (imageData: any) => {
    const formData = new FormData();
    formData.append('image', {
      uri: imageData.uri,
      type: imageData.type,
      name: imageData.fileName,
    });
    formData.append('data', JSON.stringify({
      key1: 'value1',
      key2: 'value2',
    }));

    try {
      const token = await AsyncStorage.getItem('token');
      const response = await Patch(API_URL + '/patient/changeProfileImage', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        },
      });
      console.log('Upload successful:', response.imageUrl);
      setAvatarSource(response.imageUrl);
    } catch (error) {
      console.error('Upload error:', error);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <ImagePicker source={undefined} changeImage={changeImage} />
        <View style={styles.innerContainer}>
          <Text style={styles.name}>Daniel Martinez</Text>
          <Text style={styles.number}>+123 45678912345</Text>
        </View>
        <View style={{justifyContent: 'space-between', flex: 0.7}}>
          <ListButton
            source={require('../../Icons/user-edit.png')}
            text="Edit Profile"
            onPress={function (): void {
              throw new Error('Function not implemented.');
            }}
          />
          <Line color="#E5E7EB" />
          <ListButton
            source={require('../../Icons/heart.png')}
            text="Favorite"
            onPress={function (): void {
              throw new Error('Function not implemented.');
            }}
          />
          <Line color="#E5E7EB" />
          <ListButton
            source={require('../../Icons/notification.png')}
            text="Notifications"
            onPress={function (): void {
              throw new Error('Function not implemented.');
            }}
          />
          <Line color="#E5E7EB" />
          <ListButton
            source={require('../../Icons/settings.png')}
            text="Settings"
            onPress={function (): void {
              throw new Error('Function not implemented.');
            }}
          />
          <Line color="#E5E7EB" />
          <ListButton
            source={require('../../Icons/message-question.png')}
            text="Help and Support"
            onPress={function (): void {
              throw new Error('Function not implemented.');
            }}
          />
          <Line color="#E5E7EB" />
          <ListButton
            source={require('../../Icons/security-safe.png')}
            text="Terms and Conditions"
            onPress={function (): void {
              throw new Error('Function not implemented.');
            }}
          />
          <Line color="#E5E7EB" />
          <ListButton
            source={require('../../Icons/logout.png')}
            text="Log Out"
            onPress={() => {
              setIsVisible(true);
            }}
          />
        </View>
      </View>
      {isVisible && (
        <View>
          <BottomSheet isVisible={isVisible}>
            <Logout />
          </BottomSheet>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: '8%',
  },
  name: {
    fontSize: 18,
    color: '#374151',
    fontWeight: 'bold',
  },
  number: {
    color: '#6B7280',
    fontSize: 15,
  },
  innerContainer: {
    alignItems: 'center',
    paddingTop: '2%',
    paddingBottom: '5%',
  },
});

const logoutStyles = StyleSheet.create({
  container: {
    justifyContent: 'space-around',
    backgroundColor: 'white',

    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  title: {
    fontSize: 25,
    color: '#1C2A3A',
    fontWeight: '600',
    paddingBottom: '3%',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  buttonContainer: {
    borderRadius: 20,
    width: '40%',
  },
});
