import { Circle } from "native-base";
import Toast from "react-native-root-toast";
export default function toast(msg:string)
{
    Toast.show(msg, {
        duration: Toast.durations.SHORT,
        backgroundColor: '#F9FAFB',
        position: Toast.positions.BOTTOM,
        textColor:"red",
        shadowColor:"grey",
        textStyle:{fontWeight:"600"}
      });
}