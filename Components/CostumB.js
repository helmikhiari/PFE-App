import React,{useRef} from "react";

import {StyleSheet, Text, TouchableHighlight,} from "react-native";
function CostumB({onPress,title})
{
    return (
        <TouchableHighlight style={styles.button} onPress={onPress}>
            <Text style={styles.text1}>{title}</Text>
        </TouchableHighlight>
    )
}

const styles=StyleSheet.create({
    button:
    {
        backgroundColor:'#102334',
        width:"93%",
        height:45,    
        
        borderRadius:100,
        alignSelf:"center",
        justifyContent:"center",
        alignItems:"center",
        
        
    },
    text1:
    {
        fontSize:20,
        textAlign:"center",
        textAlignVertical:"center",
        color:"#FFFFFF"
    }
})

export default CostumB