import React from 'react'
import{ TouchableHighlight,StyleSheet,Image,Text,View} from 'react-native'

const SocialButton=(prop)=>
{
    return(
        <TouchableHighlight >
            <View style={[styles.container,{width:"90%"}]}>
            <Image source={prop.source}/>
            <Text style={styles.text}>
                {prop.title}
            </Text>
            </View>
        </TouchableHighlight>
    )
}

const styles=StyleSheet.create({
    container:
    {
        backgroundColor:'white',
        borderColor:"#E5E7EB",
        borderRadius:10,
        height:48,
        borderWidth:1,
        flexDirection:'row',
        justifyContent:"center",
        alignItems:"center",
        marginTop:10,
        alignSelf:"center"

    },
    text:
    {
        fontSize:17,
        color:'black',
        textAlign:"center",
        paddingHorizontal:10,
        fontWeight:"500",

    }
})

export default SocialButton