import React, {useState} from 'react';
import {View, Text, StyleSheet, StatusBar, Pressable} from 'react-native';
import Logo from '../../Components/Logo';
import Inputtext from '../../Components/Inputtext';

import {isStrongPassword} from '../../Verifications/passwordsMatch';
import {isValidEmail} from '../../Verifications/email';

import toast from '../../Components/Toast';
import Post from '../../Requests/Post';
import CostumB from '../../Components/CostumB';
import {API_URL} from '../../env';
import AsyncStorage from '@react-native-async-storage/async-storage';

function verifCredentials(email: string, password: string): boolean {
  if (!isValidEmail(email)) {
    toast('Invalid Email');
    return false;
  } else if (!isStrongPassword(password)) {
    toast('Check Your Password');
    return false;
  }
  return true;
}

async function handlePress(email: string, password: string, navigation: any) {
  if (verifCredentials(email, password)) {
    const data = {
      email: email,
      password: password,
    };
    const token = await Post(API_URL + '/auth/login', data);
    //console.log(token);
    AsyncStorage.setItem('token', token);
    if (token) {
      navigation.replace('BottomNav');
    }
  }
}

export default function Login({navigation}: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [animating, setAnimating] = useState(false);

  return (
    <>
      <View style={styles.container}>
        <StatusBar translucent backgroundColor={'transparent'} />
        <Logo />
        <Text style={styles.text}>Hi, Welcome Back!</Text>
        <Text style={styles.innertext}>Hope you're doing fine.</Text>
        <View>
          <Inputtext
            source={require('../../Icons/sms.png')}
            placeHolder="Your Email"
            keyboardType="email-address"
            changeText={email => setEmail(email)}
          />
          <Inputtext
            source={require('../../Icons/lock.png')}
            placeHolder="Password"
            secureTextEntry
            changeText={password => setPassword(password)}
          />
        </View>
        <CostumB
          title={'Sign In'}
          animating={animating}
          onPress={async () => {
            setAnimating(true);
            await handlePress(email, password, navigation);
            setAnimating(false);
          }}
        />
        <Pressable onPress={() => navigation.navigate('forgetPassword')}>
          <Text style={styles.link}>Forget Password?</Text>
        </Pressable>
        <View style={styles.footer}>
          <Text style={styles.innertext}>Don't you have an account yet?</Text>
          <Pressable onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.link}>Sign Up</Text>
          </Pressable>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
    paddingTop: '10%',
    justifyContent: 'space-evenly',
  },
  text: {
    paddingTop: '7%',
    color: '#111928',
    fontSize: 22,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  innertext: {
    marginTop: '3%',
    color: '#6B7280',
    fontSize: 16,
    letterSpacing: 0.2,
    textAlign: 'center',
    marginBottom: '5%',
    paddingTop: '2%',
  },
  footer: {
    flexDirection: 'row',

    alignItems: 'center',
  },
  link: {
    color: '#1C64F2',
    fontSize: 16,
    fontWeight: '600',
    paddingLeft: 5,
  },
});
