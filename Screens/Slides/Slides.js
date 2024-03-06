// SwiperComponent.js
import React, { useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';
import Slide1 from './Slide1';
import Slide2 from './Slide2';
import Slide3 from './Slide3';
import Skip from '../../Components/Skip';
import { useNavigation } from '@react-navigation/native';

const SwiperComponent = () => {
  const swiperRef = useRef(null);

  const handleNext = () => {
    const currentIndex = swiperRef.current.state.index;
    swiperRef.current.scrollBy(1);
  };

  return (
    <View style={styles.wrapper}>
      <Swiper
        ref={swiperRef}
        showsButtons={false}
        loop={false}
        index={0}
        dotStyle={{ backgroundColor: '#9B9B9B' }}
        activeDotStyle={{ backgroundColor: '#26232F', width: 35, borderRadius: 80 }}
      >
        <Slide1 handleNext={handleNext}/>
        <Slide2 handleNext={handleNext}/>
        <Slide3 handleNext={handleNext}/>
      </Swiper>
      <Skip/>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});

export default SwiperComponent;
