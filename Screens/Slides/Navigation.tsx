import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StyleSheet} from 'react-native';
import Slides from './Slides';
import SignUp from '../../Authentication/SignUp';
import Login from '../../Authentication/Login';
import ForgetPassword from '../../Authentication/Forget _Password';
import VerifyCode from '../../Authentication/Verify_Code';
import ResetPassword from '../../Authentication/Reset_Password';
import Get from '../../Requests/Get';
import {API_URL} from '../../env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Home from '../../Home/Home';
import AllDoctors from '../../Home/AllDoctors';
import DoctorDetails from '../../Bookings/DoctorDetails';
import Appointment from '../../Bookings/Appointment';
import Test from '../../Home/test';

export default function Navigation() {
  const Stack = createNativeStackNavigator();
  const [screen, setScreen] = useState('');
  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem('token');

        if (token) {
          
          const response = await Get(API_URL + '/patient/loadme', token);
          
          if (response != undefined) {
            setScreen('Home');
          } else {
            setScreen('slides');
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    checkToken();
  }, []);

  return screen ? (
    <Stack.Navigator
      initialRouteName={"bookAppointment"}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="slides" component={Slides} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="forgetPassword" component={ForgetPassword} />
      <Stack.Screen name="verifyCode" component={VerifyCode} />
      <Stack.Screen name="resetPassword" component={ResetPassword} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen
        name="allDoctors"
        component={AllDoctors}
        options={{...header, title: 'All Doctors'}}
      />
      <Stack.Screen
        name="doctorDetails"
        component={DoctorDetails}
        options={{...header, title: 'Doctor Details'}}
      />
    
    <Stack.Screen
    name="bookAppointment"
    component={Appointment}
    options={{...header, title: 'Book Appointment'}}
  />
  <Stack.Screen name='test' component={Test}/>
</Stack.Navigator>
  ) : null;
}

const header: any = {
  headerShown: true,
  headerTitleAlign: 'center',
  headerTitleStyle: {color: '#374151'},
  headerShadowVisible: false,
  headerLargeTitle: false,
};
