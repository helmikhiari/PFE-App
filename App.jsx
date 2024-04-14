import React, { useEffect } from "react";
import { NavigationContainer } from '@react-navigation/native';
import Navigation from "./Navigations/Navigation";
import Login from "./Screens/Authentication/Login";
import { UserContextProvider } from "./Context/userContext";

export default function App()

{ return(
  <UserContextProvider>
    <NavigationContainer>
    <Navigation/>
</NavigationContainer>
</UserContextProvider>
      

  )
} 


