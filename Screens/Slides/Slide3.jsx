import React from "react";
import CostumB from "../../Components/CostumB"
import{View,Text,StyleSheet, Image,StatusBar, useWindowDimensions} from "react-native"
import tistyles from "./styles.js"
import { useNavigation } from '@react-navigation/native';
export default function Slide1()
{
    const w=useWindowDimensions()
    const navigation=useNavigation()
    return(
        <View style={styles.container}>
        <View style={styles.container0}>
            <StatusBar translucent backgroundColor="transparent" />

            <Image source={require('../../Images/doc3.png')} style={{height:0.7*w.height,width:w.width}}/>
        
            </View>
            <View style={styles.innercontainer}>
            <Text style={tistyles.title}>Thousands of Online Specialists</Text>
            <Text style={tistyles.description}> Explore a Vast Array of Online Medical Specialists, Offering an Extensive Range of Expertise Tailored to Your Healthcare Needs.</Text>
            <CostumB onPress={()=>{navigation.navigate('SignUp')}} title={"Next"}/>
            
            </View>
            </View>
        
    )
}


const styles=StyleSheet.create({
    container:
    {
        flex:1,
        backgroundColor:"white",
        justifyContent:"flex-start",
       
        
    },
    container0:
    {
        backgroundColor:"white",
        
        
    },
    innercontainer:
    {
        flex:0.7,
        justifyContent:"space-around",
        paddingHorizontal:20
    },
   

})

