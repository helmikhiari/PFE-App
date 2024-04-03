import React, {useState} from 'react';
import {View, Text, StyleSheet, StatusBar, Pressable} from 'react-native';
import Logo from '../../Components/Logo';
import Inputtext from '../../Components/Inputtext';
import verifCin from '../../Verifications/cin';
import {
  isStrongPassword,
  passwordsMatch,
} from '../../Verifications/passwordsMatch';
import {isValidEmail} from '../../Verifications/email';
import toast from '../../Components/Toast';
import Post from '../../Requests/Post';
import {Patient} from '../../Types/Patient';
import CostumB from '../../Components/CostumB';
import {API_URL} from '../../env';
function verifCredentials({
  cin,
  email,
  password,
  confirmPassword,
}: Patient): boolean {
  if (!verifCin(cin)) {
    toast('Invalid Cin');
    return false;
  } else if (!isValidEmail(email)) {
    toast('Invalid Email');
    return false;
  } else if (!isStrongPassword(password)) {
    toast('Weak Password');
    return false;
  } else if (!passwordsMatch(password, confirmPassword)) {
    toast('Passwords Should Match');
    return false;
  }
  return true;
}

async function handlePress(patient: Patient) {
  if (verifCredentials(patient)) {
    const data = {
      email: patient.email,
      password: patient.password,
      cin: patient.cin,
    };

    const token = await Post(API_URL + '/patient/signup', data);
    console.log(token);
  }
}
export default function SignUp({navigation}: any) {
  const [cin, setCin] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const patient: Patient = {cin, email, password, confirmPassword};
  const [animating, setAnimating] = useState(false);
  return (
    <>
      <View style={styles.container}>
        <StatusBar translucent backgroundColor={'transparent'} />
        <Logo />
        <Text style={styles.text}>Create Account</Text>
        <Text style={styles.innertext}>We are here to help you!</Text>
        <View>
          <Inputtext
            source={require('../../Icons/cin.png')}
            placeHolder="CIN"
            keyboardType="decimal-pad"
            changeText={txt => {
              setCin(txt);
            }}
          />
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
          <Inputtext
            source={require('../../Icons/lock.png')}
            placeHolder="Confirm Password"
            secureTextEntry
            changeText={confirmPassword => setConfirmPassword(confirmPassword)}
          />
        </View>
        <CostumB
          title={'Create Account'}
          animating={animating}
          onPress={async () => {
            setAnimating(true);
            await handlePress(patient);
            setAnimating(false);
          }}
        />

        <View style={styles.footer}>
          <Text style={styles.innertext}>Do you have an account ?</Text>
          <Pressable onPress={() => navigation.navigate('Login')}>
            <Text style={styles.link}>Sign In</Text>
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
