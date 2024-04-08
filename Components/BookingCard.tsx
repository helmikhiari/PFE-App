import {View, Text, Image, StyleSheet, useWindowDimensions} from 'react-native';
import Line from './Line';
import {Button} from 'react-native-paper';

interface Props {
  source: any;
  date: string;
  name: string;
  speciality: string;
  location: string;
  rightButtonTitle:string;
  leftButtonTitle?:string;
  leftButtonOnPress?:()=>void;
  rightButtonOnPress:()=>void;
}

const BookingCard = ({source, date, name, speciality, location,leftButtonOnPress,leftButtonTitle,rightButtonOnPress,rightButtonTitle}: Props) => {
  const w = useWindowDimensions();
  let a: number;
  if (w.height < 600) a = w.height / 2;
  else a = w.height / 3;
  return (
    <View style={[styles.card, {height: a}]}>
      <View >
        <Text style={{...styles.title}}>{date}</Text>
      </View>
      <View style={{paddingTop:10,paddingBottom:10}}>
        <Line/>
      </View>
      <View style={{flexDirection: 'row', flex: 0.75, borderWidth: 0}}>
        <View style={{justifyContent: 'center', width: '40%', height: '100%'}}>
          <Image source={source} style={styles.img} />
        </View>
        <View style={{justifyContent: 'center', width: '70%'}}>
          <View style={{justifyContent: 'space-evenly', flex: 1}}>
            <Text style={styles.title}>{name}</Text>
            
            <Text style={styles.speciality}>{speciality}</Text>
            <View style={styles.location}>
              <Image source={require('../Icons/location.png')} />
              <Text style={styles.regular}>{location}</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={{paddingTop:10,paddingBottom:10}}>
        <Line/>
      </View>
      <View style={[{flexDirection: 'row'},leftButtonTitle? {justifyContent:"space-between"}:{justifyContent:"center"}]}>
        {leftButtonTitle&&(<Button
          style={{backgroundColor:"#E5E7EB",width:"48%"}}
          textColor='#1C2A3A'
          mode="contained"
          onPress={rightButtonOnPress}
        >
        <Text style={{fontWeight:"bold",fontSize:15 }}>{leftButtonTitle}</Text>
       </Button>)}
        <Button
         
          mode="contained"
          style={[{backgroundColor:"#1C2A3A"},leftButtonTitle?{width:"48%"}:{width:"95%"}]}
          onPress={leftButtonOnPress}>
        <Text style={{fontWeight:"bold",fontSize:15 }}>{rightButtonTitle}</Text>
        </Button>
      </View>
    </View>
  );
};

export default BookingCard;

const styles = StyleSheet.create({
  card: {
    width: '95%',
    backgroundColor: 'white',

    shadowColor: 'black',
    elevation: 5,
    shadowOpacity: 0.25,
    shadowRadius: 5,
    borderRadius: 15,
    paddingLeft: '5%',
    marginBottom: '2%',
    paddingHorizontal: 28,
    alignSelf: 'center',
    justifyContent: 'center',
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
    fontSize: 17,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  speciality: {
    color: '#4B5563',
    fontSize: 15,
    fontWeight: '600',
  },
  regular: {
    color: '#4B5563',
    fontSize: 13,
  },
  review: {
    color: '#6B7280',
  },
});
