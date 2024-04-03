import axios from "axios";
import { Alert } from "react-native";


export default async function Get(path:string,token:string|null)
{   
    try{
        const head = {
            headers: {Authorization: `Bearer ${token}`},
          };
     const response = await axios.get(
        path,
        head
      );
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message;
        if (errorMessage) {
          if (typeof errorMessage == 'string') {
            console.log('Error', errorMessage);
          } else Alert.alert('Error', errorMessage[0]);
        } else {
          console.log('Error without message:'+ error);
        }
      } else {
        console.log('Non-Axios error:'+ error);
      }
    }
    
}
