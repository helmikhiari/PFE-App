import React from 'react'
import{View,Text,StyleSheet} from 'react-native'
interface Props
{
    color?:string
}

const Line=({color}:Props)=>
{
    return(
            <View style={[styles.line,{width:"100%"},color? {backgroundColor:color}:null]}>
                
            </View>
            
            
)}

const styles=StyleSheet.create({
    line:
    {height:1,
        borderColor:'#E5E7EB',
        borderWidth:0.8,    
        marginTop:0,
        alignSelf:"center",
        alignContent:"center"
    },
    or:
    {
        color:"#6B7280",
        fontSize:20,
        fontWeight:"500",
        textAlign:"center"
        
    }
})

export default Line