import axios, { AxiosResponse } from "axios";
import { Alert } from "react-native";


export default async function Patch(path:string,data:object,head?:object)
{   
    try{
     const response = await axios.patch(
        path,
        data,
        head
      );
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message;
        if (errorMessage) {
          if (typeof errorMessage == 'string') {
            Alert.alert('Error', errorMessage);
          } else Alert.alert('Error', errorMessage[0]);
        } else {
          Alert.alert('Error without message:'+ error);
        }
      } else {
        Alert.alert('Non-Axios error:'+ error);
      }
    }
    
}
