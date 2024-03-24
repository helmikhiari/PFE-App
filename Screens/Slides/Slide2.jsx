import React from "react";
import CostumB from "../../Components/CostumB"
import{View,Text,StyleSheet, Image,StatusBar, useWindowDimensions} from "react-native"
import tistyles from "./styles.js"
export default function Slide1(props)
{
    
    const w=useWindowDimensions()
    return(
        <View style={styles.container}>
        <View style={styles.container0}>
            <StatusBar translucent backgroundColor="transparent" />

            <Image source={require('../../Images/doc2.png')} style={{height:0.7*w.height,width:w.width}}/>
        
            </View>
            <View style={styles.innercontainer}>
            <Text style={tistyles.title}>Connect with Specialists</Text>
            <Text style={tistyles.description}>Connect with Specialized Doctors Online for Convenient and Comprehensive Medical Consultations.</Text>
            <CostumB onPress={props.handleNext} title={"Next"} />
            
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

