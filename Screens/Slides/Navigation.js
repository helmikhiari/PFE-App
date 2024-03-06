import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Slides from './Slides'
import SignUp from '../SignUp'
export default function Navigation()
{   const Stack=createNativeStackNavigator()
    return(
    <Stack.Navigator initialRouteName='slides' screenOptions={{headerShown:false}}>
        <Stack.Screen name="SignUp"component={SignUp} />
        <Stack.Screen name="slides"component={Slides} />
     </Stack.Navigator>
        )
    }