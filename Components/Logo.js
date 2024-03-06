import React from 'react'
import {View,Text,StyleSheet,StatusBar, Image,useWindowDimensions} from 'react-native'

export default function Logo()
{   const w=useWindowDimensions()
    return(
        <>
            
            <Image source={require('../Images/Vector.png')}/>
            <Text style={styles.text}>
                Assur
                <Text style={styles.innertext}>
                    Connect
                </Text>
            </Text>
            
        </>
)}

const styles=StyleSheet.create({
    container:
    {
        backgroundColor:'white',
        flex:1,
        alignItems:'center',
        paddingTop:"18",
        
    },
    text:
    {   paddingTop:"5%",
        color:'#6B7280',
        fontSize:23,
        fontWeight:'400',
        letterSpacing:0.5,
    },
    innertext:
    {   
        color:'#111928'
    }
})