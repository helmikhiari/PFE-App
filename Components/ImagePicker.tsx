import {useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Text, useWindowDimensions} from 'react-native';
import {Image} from 'react-native-elements';
import * as ImagePickerr from 'react-native-image-picker';
import { MediaType } from 'react-native-image-picker';
interface Props {
  source: any;
}
export default function ImagePicker({source}: Props) {
  const [avatarSource, setAvatarSource] = useState(source);
    const a:MediaType='photo'
  const options = {
    title: 'Select Avatar',
    mediaType: a,
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

  const handleGalleryClick = () => {
    ImagePickerr.launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets) {
        const source: any = {uri: response.assets[0].uri};
        setAvatarSource(source);
      }
    });
  };
  const w=useWindowDimensions()
  return (
    <View style={styles.container}>
      <Image source={avatarSource} style={[styles.image,{width:w.width/2,height:w.width/2}]} />
      <TouchableOpacity style={styles.button} onPress={handleGalleryClick}>
        <Image  source={require('../Icons/edit-picture.png')} style={{width:45,height:45}}/>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    borderRadius: 175,
    resizeMode: 'cover',
  },
  button: {
    position: 'absolute',
    right: '20%',
    top:'60%',
    borderRadius: 20,
    padding: 10,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
  },
});
