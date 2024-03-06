import React from "react";
import { StatusBar, View } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import Navigation from "./Screens/Slides/Navigation";

export default function App()
{ return(
    <NavigationContainer>
    <Navigation/>
    </NavigationContainer>
  )
} 