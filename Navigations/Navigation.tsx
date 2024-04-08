import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StyleSheet, Text} from 'react-native';
import Slides from '../Screens/Slides/Slides';
import SignUp from '../Screens/Authentication/SignUp';
import Login from '../Screens/Authentication/Login';
import ForgetPassword from '../Screens/Authentication/Forget _Password';
import VerifyCode from '../Screens/Authentication/Verify_Code';
import ResetPassword from '../Screens/Authentication/Reset_Password';
import Get from '../Requests/Get';
import {API_URL} from '../env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Home from '../Screens/Home/Home';
import AllDoctors from '../Screens/Home/AllDoctors';
import DoctorDetails from '../Screens/Bookings/DoctorDetails';
import Appointment from '../Screens/Bookings/Appointment';
import Profile from '../Screens/Settings/Settings';
import Test from '../Screens/Settings/test';
import TopNav from './TopNav';
import BottomNav from './Bottomnav';
export default function Navigation() {
  const Stack = createNativeStackNavigator();
  const [screen, setScreen] = useState('');
  /* useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        console.log(token);

        const response = await Get(API_URL + '/patient/loadme', token);

        if (response != undefined) {
          setScreen('BottomNav');
        } else {
          setScreen('slides');
        }
      } catch (error) {
        console.log(error);
      }
    };
    checkToken();
  }, []);*/

  return true ? (
    <Stack.Navigator
      initialRouteName={'BottomNav'}
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
      <Stack.Screen
        name="profile"
        component={Profile}
        options={{
          ...header,
          title: 'Profile',
          headerTitleStyle: { fontSize: 25, fontWeight: '600'},
        }}
      />
      <Stack.Screen
        name="BottomNav"
        component={BottomNav}
        options={{
          ...header,
          title: 'Profile',
          headerTitleStyle: {fontSize: 25, fontWeight: '600'},
          headerShown: false,
        }}
      />
      <Stack.Screen name="test" component={Test} />
      <Stack.Screen
        name="topNav"
        component={TopNav}
        options={{...header, title: 'My Bookings',headerTitleStyle: {fontSize: 25, fontWeight: '600'}}}
      />
    </Stack.Navigator>
  ) : (
    <Text>Hello</Text>
  );
}

export const header: any = {
  headerShown: true,
  headerTitleAlign: 'center',
  headerTitleStyle: {color: '#374151'},
  headerShadowVisible: false,
  headerLargeTitle: false,
};
