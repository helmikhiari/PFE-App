import React from "react";
import { TouchableHighlight, StyleSheet, Text,View } from "react-native";
import { useNavigation } from '@react-navigation/native';
const Skip = () => {
  const navigation=useNavigation()
  return (
    <View style={styles.container}>
    <TouchableHighlight style={styles.button} onPress={()=>{navigation.navigate('SignUp')}} underlayColor={'transparent'} >
      <Text style={styles.text}>Skip</Text>
    </TouchableHighlight>
    </View>
  );
};  

const styles = StyleSheet.create({
    container:
    {
        backgroundColor:'white',
       
    },
  button: {
    width:50,
    
    borderRadius: 5,
    alignSelf:"center",
    marginBottom:25
    
  },
  text: {
    color: "#6B7280",
    textAlign: "center",
  },
});

export default Skip;
