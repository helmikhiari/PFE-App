import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Line = () => {
  return <View style={[styles.line, {height: '100%'}]}></View>;
};

const styles = StyleSheet.create({
  line: {
    height: 1,
    borderColor: '#E5E7EB',
    borderWidth: 0.8,
    marginTop: 0,
    alignSelf: 'center',
    alignContent: 'center',
  },
  or: {
    color: '#6B7280',
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default Line;
