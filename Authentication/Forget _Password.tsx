import React, {useState} from 'react';
import {View, Text, StyleSheet, StatusBar} from 'react-native';
import Logo from '../Components/Logo';
import Inputtext from '../Components/Inputtext';
import {isValidEmail} from '../Verifications/email';
import toast from '../Components/Toast';
import Post from '../Requests/Post';
import CostumB from '../Components/CostumB';
import {API_URL} from '../env';

function verifCredentials(email: string) {
  if (!isValidEmail(email)) {
    toast('Invalid Email');
    return false;
  }
  return true;
}

const handleSendCode = async (email: string, navigation: any) => {
  if (verifCredentials(email)) {
    const token = await handlePress(email);
    if (token !== undefined) {
      navigation.navigate('verifyCode', {token: token, email: email});
    }
  }
};
async function handlePress(email: string) {
  try {
    const data = {
      email: email,
    };
    const token = await Post(API_URL + '/auth/forgetPassword', data);
    return token;
  } catch (error) {
    console.error('Error occurred while handling press:', error);

    throw error;
  }
}
export default function ForgetPassword({navigation}: any) {
  const [email, setEmail] = useState('');
  const [animating, setAnimating] = useState(false);

  return (
    <>
      <View style={styles.container}>
        <StatusBar translucent backgroundColor={'transparent'} />
        <Logo />
        <Text style={styles.text}>Forget Password?</Text>
        <Text style={styles.innertext}>
          Enter your Email,we will send you a verification code.
        </Text>
        <View style={styles.innerContainer}>
          <Inputtext
            source={require('../Icons/sms.png')}
            placeHolder="Your Email"
            keyboardType="email-address"
            changeText={email => setEmail(email)}
          />
        </View>
        <CostumB
          title="Send Code"
          animating={animating}
          onPress={async () => {
            setAnimating(true);
            await handleSendCode(email, navigation);
            setAnimating(false);
          }}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
    paddingTop: '25%',
  },
  text: {
    paddingTop: '7%',
    color: '#111928',
    fontSize: 22,
    fontWeight: '600',
    letterSpacing: 0.5,
    marginTop: '4%',
  },
  innertext: {
    marginTop: '5%',
    color: '#6B7280',
    fontSize: 16,
    letterSpacing: 0.2,
    textAlign: 'center',
    marginBottom: '10%',
    marginHorizontal: '5%',
  },
  innerContainer: {
    marginBottom: '2%',
  },
});
