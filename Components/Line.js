import React from 'react'
import{View,Text,StyleSheet} from 'react-native'


const Line=()=>
{
    return(<View style={{flexDirection:"row",justifyContent:"space-between",marginHorizontal:15,marginTop:"3%"}}>
            <View style={[styles.line,{width:"40%"}]}>
                
            </View>
            <Text style={styles.or}>or</Text>
            <View style={[styles.line,{width:"40%"}]}>
                
            </View>
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