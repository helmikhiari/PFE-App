import {View, Image, Text, StatusBar, StyleSheet, ImageProps, ImageSourcePropType} from 'react-native';
import Card from '../../Components/Card';
import CostumB from '../../Components/CostumB';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../../env';
import Get from '../../Requests/Get';

interface img {
  source: ImageSourcePropType;
  title: number;
  subtitle: string;
}

interface DoctorDetails{
  bio:string;
  numberOfPatients:number;
  experience:number;
  workingTime?:string
}
const Img = ({source, title, subtitle}: img) => {
  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <Image source={source} />
      <Text style={{color: '#4B5563', fontSize: 15, fontWeight: '600'}}>
        {title}
      </Text>
      <Text style={{color: '#6B7280', fontSize: 14}}>{subtitle}</Text>
    </View>
  );
};



export default function DoctorDetails({route, navigation}: any) {
  const {_id,picture, firstName,lastName, speciality, address,rating,numberOfRatings} = route.params;
  const [details,setDetails]=useState<DoctorDetails>()
  useEffect(()=>{
    const fetchDoctorDetails=async()=>
      {
        try
        {
          const token=await AsyncStorage.getItem('token');
          const response=await Get(API_URL+'/patient/doctorDetails/'+_id,token);
          setDetails(response);
        }
        catch(error)
        {
          throw error;
        }
       
      }
      fetchDoctorDetails()
  },[])



  return details?(
    <View style={styles.container}>
      <StatusBar backgroundColor={'white'} />
      <View style={{flex: 0.4}}>
        <Card
          name={firstName+" "+lastName}
          speciality={speciality}
          location={address}
          source={{uri:picture}}
          disabled={true}
        />
      </View>
      <View style={styles.images}>
        <Img
          source={require('../../Icons/profile.png')}
          title={details.numberOfPatients}
          subtitle="patients"
        />
        <Img
          source={require('../../Icons/medal.png')}
          title={details.experience}
          subtitle="experience"
        />
        <Img
          source={require('../../Icons/littleStar.png')}
          title={rating}
          subtitle="rating"
        />
        <Img
          source={require('../../Icons/messages.png')}
          title={numberOfRatings}
          subtitle="reviews"
        />
       
      </View>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>ABOUT ME</Text>
        <Text style={styles.description}>
          {details.bio}
        </Text>
      </View>
      <View>
        <Text style={styles.title}>Working Time</Text>
        <Text style={styles.description}>Monday-Friday, 8.00 - 18.00</Text>
      </View>
      <CostumB
        title="Book Appointment"
        onPress={() => {
          navigation.navigate('bookAppointment',{_id});
        }}
      />
    </View>
  ):
  null
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: '6%',
    paddingTop: 10,
    justifyContent: 'space-evenly',
  },
  images: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: '3%',
  },
  title: {
    color: '#1F2A37',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  innerContainer: {},
  description: {
    color: '#6B7280',
    fontSize: 15,
    lineHeight: 23,
  },
});
