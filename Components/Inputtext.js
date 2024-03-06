import React from 'react'
import { Input } from 'react-native-elements';
import { StyleSheet,Image } from 'react-native';

export default function Inputtext(prop)
{
    return(
        <Input style={{margin:0,fontSize:15}}
  placeholder={prop.placeholder}
  placeholderTextColor={"#9CA3AF"}
  secureTextEntry={prop.secureTextEntry}
  keyboardType={prop.keyboardType}
  se
  leftIcon={
    <Image source={prop.source} />
  }
  inputContainerStyle={styles.containerinput}
/>
    )
}


const styles=StyleSheet.create({
    containerinput:
    {
        borderWidth:1,
        backgroundColor:"#F9FAFB",
        borderColor:'#D1D5DB',
        paddingHorizontal:18,
        borderRadius:12,
        height:"30",

     }
})