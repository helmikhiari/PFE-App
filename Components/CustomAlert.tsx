import { Card,Modal } from "@ui-kitten/components";
import { Children } from "react";
import { StyleSheet } from "react-native";

interface Props
{
    visible:boolean;
    onBackdropPress:()=>void;
    children:React.ReactNode;
    style?:object
}

const CustomAlert=({visible,onBackdropPress,children,style}:Props)=>
    {return(
        <Modal
        style={style}
        animationType="slide"
        visible={visible}
        backdropStyle={styles.backdrop}
        onBackdropPress={onBackdropPress}>
        <Card
          disabled={false}
          style={{borderRadius: 20, marginHorizontal: '3%'}}>
          {children}
        </Card>
      </Modal>)
    }

const styles=StyleSheet.create(   
  {
    text: {
      color: '#1C2A3A',
      fontSize: 22,
      fontWeight: '600',
      marginBottom: '8%',
      marginTop: '5%',
    },
    backdrop: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
  }
)


export default CustomAlert;