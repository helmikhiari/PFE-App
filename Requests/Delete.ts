import axios from "axios";
import { Alert } from "react-native";

interface Props {
  path: string;
  token?: string | null;
}

export default async function Delete(path: string, token?: string | null) {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const response = await axios.delete(path, config);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.message;
      if (errorMessage) {
        if (typeof errorMessage == 'string') {
          Alert.alert('Error', errorMessage);
        } else {
          Alert.alert('Error', errorMessage[0]);
        }
      } else {
        Alert.alert('Error without message:', JSON.stringify(error));
      }
    } else {
      Alert.alert('Non-Axios error:', JSON.stringify(error));
    }
  }
}
