import React, {useEffect, useRef} from 'react';
import {View, Text, Animated, Image, StyleSheet} from 'react-native';

interface Props {
  height: any;
  width: any;
  source: any;
  title: string;
  subtitle: string;
}

const ImageText = ({height, width, source, title, subtitle}: Props) => {
  

  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);
  return (
    <>
      <Animated.View style={{opacity: fadeAnim}}>
        <Image
          source={source}
          style={[
            {
              width: width,
              height: height,
            },
            styles.img,
          ]}
        />
        <View style={styles.container}>
          <Text
            style={styles.title}>
            {title}
          </Text>
          <Text
            style={styles.subtitle}>
            {subtitle}
          </Text>
        </View>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  img: {
    resizeMode: 'cover',
    borderRadius: 20,
  },
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop: '8%',
    marginLeft: '5%',
  },
  title:
  {
    color: 'white',
    fontSize: 19,
    width: '55%',
    fontWeight: 'bold',
    lineHeight: 30,
  },
  subtitle:
  {
    color: 'white',
    fontSize: 14,
    width: '55%',
    lineHeight: 20,
    paddingTop: '4%',
  }

});

export default ImageText;
