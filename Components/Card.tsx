import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  Animated,
} from 'react-native';
import Line from './Line';
import VerticalLine from './VerticalLine';
import {useEffect, useRef} from 'react';

interface Props {
  source: any;
  name: string;
  speciality: string;
  numberOfReviews?: number;
  location: string;
  review?: number;
  onPress?:()=>void;
  disabled?:boolean;
}

export default function Card({
  source,
  name,
  speciality,
  numberOfReviews,
  location,
  review,
  disabled,
  onPress
}: Props) {
  const w = useWindowDimensions();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 700,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);
  return (
   // <Animated.View style={{opacity: fadeAnim}}>
    
      <TouchableOpacity style={[styles.card,{height:w.height/6}]} onPress={onPress} disabled={disabled}>
        
        
        <View style={{flexDirection:"row",flex:0.8,borderWidth:0}}>
          <View style={{justifyContent: 'center', width: '40%',height:"100%"}}>
            <Image source={source} style={styles.img} />
          </View>
          <View style={{justifyContent: 'center',width:"70%"}}>
            <View style={{justifyContent: 'space-evenly',flex:1}}>
              <Text style={styles.title}>{name}</Text>
              <Line />
              <Text style={styles.speciality}>{speciality}</Text>
              <View style={styles.location}>
                <Image source={require('../Icons/location.png')} />
                <Text style={styles.regular}>{location}</Text>
              </View>
             {review && <View style={styles.star}>
                <Image source={require('../Icons/star.png')} />
                <Text style={styles.review}>{review}</Text>
                <VerticalLine />
                <Text style={styles.review}> {numberOfReviews} Reviews</Text>
              </View>}
            </View>
          </View>
          </View>
        
      </TouchableOpacity>
     
  //  </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    
    width: '95%',
   
    backgroundColor: 'white',
    flex: 1,
    shadowColor: 'black',
    elevation: 5,
    shadowOpacity: 0.25,
    shadowRadius: 5,
    borderRadius: 15,
    paddingLeft: '5%',
    marginBottom: '2%',
    paddingHorizontal: 28,
    alignSelf: 'center',
    justifyContent:"center",
  },
  img: {
    width: '90%',
    height: '100%',
    borderRadius: 12,
    resizeMode: 'cover',
  },
  location: {
    flexDirection: 'row',
  },
  text: {
    color: 'black',
  },
  star: {
    flexDirection: 'row',
  },
  container: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 18,
    },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 54,
    flex: 0.2,
  },
  title: {
    color: '#1F2A37',
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: 1,
  },
  speciality: {
    color: '#4B5563',
    fontSize: 15,
    fontWeight:'600',
  },
  regular: {
    color: '#4B5563',
    fontSize: 13,
  },
  review: {
    color: '#6B7280',
  },
});
