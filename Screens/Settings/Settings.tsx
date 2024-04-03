import React, {useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import {MediaType, PresentationStyle} from 'react-native-image-picker';
import ImagePicker from '../../Components/ImagePicker';
import ListButton from '../../Components/ListButton';
import Line from '../../Components/Line';

import {BottomSheet, Button} from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Settings({navigation}: any) {
  const [avatarSource, setAvatarSource] = useState(null);
  console.log(ImagePicker);
  const p: MediaType = 'video';
  const z: PresentationStyle = 'popover';
  const options = {
    title: 'Select Avatar',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
    mediaType: p,
    presentationStyle: z,
  };

  async function handleLogout() {
    try {
      setIsVisible(false);
      await AsyncStorage.removeItem('token');
      navigation.replace('Login');
    } catch (error) {
      console.error('Error removing data:', error);
    }
  }
  const [isVisible, setIsVisible] = useState(false);
  const Logout = () => {
    const x = useWindowDimensions();

    return (
      <View
        style={{
          justifyContent: 'space-around',
          backgroundColor: 'white',
          height: x.height / 5,
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
        }}>
        <View style={{alignItems: 'center'}}>
          <Text
            style={{
              fontSize: 25,
              color: '#1C2A3A',
              fontWeight: '600',
              paddingBottom: '3%',
            }}>
            Logout
          </Text>
          <Line />
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>
            Are you sure you want to log out?
          </Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <Button
            color={'#E5E7EB'}
            title={'Cancel'}
            titleStyle={{color: '#1C2A3A', fontWeight: 'bold', fontSize: 18}}
            containerStyle={{borderRadius: 20, width: '40%'}}
            onPress={() => {
              setIsVisible(false);
            }}
          />
          <Button
            color={'#1C2A3A'}
            title={'Yes, Log out'}
            titleStyle={{color: '#E5E7EB', fontWeight: 'bold', fontSize: 18}}
            containerStyle={{borderRadius: 20, width: '40%'}}
            onPress={() => {
              handleLogout();
            }}
          />
        </View>
      </View>
    );
  };

  return (
    <>
      <View style={styles.container}>
        <ImagePicker source={undefined} />
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
