
import React from 'react';
import {StyleSheet, TouchableHighlight, View} from 'react-native';
import {ActivityIndicator, Text} from 'react-native-paper';

interface props {
  onPress: () => void;
  title: string;
  disabled?: boolean;
  animating?: boolean;
}
function CostumB({onPress, title, disabled, animating = false}: props) {
  return (
    <TouchableHighlight
      style={[styles.button, disabled ? {backgroundColor: 'grey'} : {}]}
      onPress={onPress}
      disabled={disabled}>
      {animating ? (
        <ActivityIndicator
          size="small"
          color="white"
          animating={animating}
          style={{alignSelf: 'center'}}
        />
      ) : (
        <Text style={styles.text1}>{title}</Text>
      )}
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#102334',
    width: '93%',
    height: 45,

    borderRadius: 100,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text1: {
    fontSize: 18,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#FFFFFF',
  },
});

export default CostumB;
