import React, {useState} from 'react';
import {Input} from 'react-native-elements';
import {
  StyleSheet,
  Image,
  KeyboardType,
  ImageSourcePropType,
  Pressable,
} from 'react-native';

interface props {
  placeHolder: string;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardType;
  source: ImageSourcePropType;
  changeText: (txt: string) => void;
}
interface icon {
  onPress: () => void;
  isOn: boolean | undefined;
  textlength: number;
}
function RightIcon({onPress, isOn, textlength}: icon) {
  return (
    textlength > 0 && (
      <Pressable onPress={onPress}>
        {!isOn ? (
          <Image
            source={require('../Icons/eye.png')}
            style={{width: 20, height: 20}}
          />
        ) : (
          <Image
            source={require('../Icons/eye-off.png')}
            style={{width: 20, height: 20}}
          />
        )}
      </Pressable>
    )
  );
}

export default function Inputtext({
  placeHolder,
  secureTextEntry,
  keyboardType,
  source,
  changeText,
}: props) {
  const [passText, setPassText] = useState(secureTextEntry);
  const [text, setText] = useState('');
  return (
    <Input
      style={{margin: 0, fontSize: 15}}
      placeholder={placeHolder}
      placeholderTextColor={'#9CA3AF'}
      secureTextEntry={passText}
      keyboardType={keyboardType}
      leftIcon={<Image source={source} />}
      inputContainerStyle={styles.containerinput}
      onChangeText={txt => {
        setText(txt);
        changeText(txt);
      }}
      rightIcon={
        (placeHolder == 'Password' || placeHolder == 'Confirm Password') && (
          <RightIcon
            onPress={() => setPassText(!passText)}
            isOn={passText}
            textlength={text.length}
          />
        )
      }
    />
  );
}

const styles = StyleSheet.create({
  containerinput: {
    borderWidth: 1,
    backgroundColor: '#F9FAFB',
    borderColor: '#D1D5DB',
    paddingHorizontal: 18,
    borderRadius: 12,
    height: 'auto',
    width: '95%',
    alignSelf: 'center',
  },
  text: {
    color: 'red',
  },
});
