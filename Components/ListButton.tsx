import { TouchableOpacity } from 'react-native';
import { View, Text, StyleSheet, Touchable} from 'react-native';
import {Image} from 'react-native-elements';
interface Props
{
    source:any;
    text:string;
    onPress:()=>void;
}

export default function ListButton({text,source,onPress}:Props) {
  return (
    <TouchableOpacity style={{flexDirection: 'row', paddingHorizontal: '6%',paddingVertical:"2.4%"}} onPress={onPress}>
      <View style={styles.container}>
        <Image source={source} style={styles.img} />
        <Text style={styles.text}>{text}</Text>
      </View>
      <View style={styles.arrowContainer}>
        <Image
          source={require('../Icons/arrow-right.png')}
          style={styles.img}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
    alignItems:"center",
  },
  img: {
    width: 25,
    height: 25,
  },
  arrowContainer: {
    alignItems:"center",
  },
  text: {
    fontSize: 18,
    paddingLeft:"7%",
  },
});
