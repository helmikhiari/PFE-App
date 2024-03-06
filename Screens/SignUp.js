import React from 'react'
import {View,Text,StyleSheet,StatusBar,useWindowDimensions,Pressable} from 'react-native'
import Logo from '../Components/Logo'
import Inputtext from '../Components/Inputtext'
import CostumB from '../Components/CostumB'
import Line from '../Components/Line'
import SocialButton from '../Components/SocialButton'
export default function SignUp()
{   const w=useWindowDimensions()
    return(<View style={styles.container}>
        <StatusBar translucent backgroundColor={"transparent"}/>
            <Logo/>
            <Text style={styles.text}>
                Create Account
            </Text>
            <Text style={styles.innertext}>
                We are here to help you!
            </Text>
            <View style={{width:"96%",marginTop:"7%",justifyContent:"flex-start",flex:0.7,backgroundColor:"white"}}>
            <Inputtext source={require('../Icons/user.png')} placeholder="Your Name"/>
            <Inputtext source={require('../Icons/sms.png')} placeholder="Your Email" keyboardType="email-address" />
            <Inputtext source={require('../Icons/lock.png')} placeholder="Password" secureTextEntry  />
            <CostumB title={"Create Account"}/>
            <Line/>
            <SocialButton source={require('../Icons/Google.png')} title="Continue with Google"/>
            <SocialButton source={require('../Icons/Facebook.png')} title="Continue with Facebook" />
            <View style={styles.footer} >
                <Text style={styles.innertext}>
                Do you have an account ? 
                </Text>
                <Pressable style={{justifyContent:"flex-end"}} >
                    <Text style={styles.link}>
                        Sign In
                    </Text>
                </Pressable>
            </View>
            </View>
        </View>
)}

const styles=StyleSheet.create({
    container:
    {
        backgroundColor:'white',
        flex:1,
        alignItems:'center',
        paddingTop:"10%",
        
    },
    text:
    {   paddingTop:"7%",
        color:'#111928',
        fontSize:22,
        fontWeight:'600',
        letterSpacing:0.5,
    },
    innertext:
    {   marginTop:"3%",
        color:'#6B7280',
        fontSize:16,
        letterSpacing:0.2,
        textAlign:"center"
    },
    footer:
    {
        marginTop:15,
        flexDirection:"row",
        justifyContent:"center",
        
    },
    link:
    {
        color:"#1C64F2",
        fontSize:16,
        fontWeight:"600",
        paddingLeft:5
    }
})