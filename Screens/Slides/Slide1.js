import React from "react";
import CostumB from "../../Components/CostumB.js"
import{View,Text,StyleSheet, Image,StatusBar, useWindowDimensions} from "react-native"
import tistyles from "./styles.js"
export default function Slide1(props)
{const w=useWindowDimensions()
    
    
    return(
        <View style={styles.container}>
        <View>
            <StatusBar translucent backgroundColor="transparent" />

            <Image source={require('../../Images/doc1.png')} style={{height:0.7*w.height,width:w.width*1.15}}/>
        
            </View>
            <View style={styles.innercontainer}>
            <Text style={tistyles.title}>Meet Doctors Online</Text>
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

    innercontainer:
    {
        flex:0.7,
        justifyContent:"space-evenly",
        paddingHorizontal:20
    },
  
})

