import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react"
import { View,Text,StyleSheet, Alert } from "react-native"
import { io } from "socket.io-client";
import { useUserContext } from "../../Context/userContext";
export default function Notifications()
{
    const socket = io("ws://192.168.1.63:80",{reconnection:false});
    useEffect(()=>
    {  try
       { socket?.on('connect',async ()=>{
            const token = await AsyncStorage.getItem('token');
            socket.emit('Auth',token)
            socket.on('getNotification',(notification:any)=>
            {
                console.log(notification)
            })
                
        })
       
            
            socket.on('Auth error',(errorMessage:string)=>
            {
                Alert.alert(errorMessage)
            })
        }
        catch(error)
        {
            console.log(error);
        }
    },[socket])

    return (
        <View style={{flex:1,backgroundColor:'#FFFFFF'}}>
                   
        </View>
    )
}

