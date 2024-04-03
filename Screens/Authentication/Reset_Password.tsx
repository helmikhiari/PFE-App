import React, {useState} from 'react';
import {View, Text, StyleSheet, StatusBar, Pressable} from 'react-native';
import Logo from '../../Components/Logo';
import Inputtext from '../../Components/Inputtext';
import toast from '../../Components/Toast';
import Post from '../../Requests/Post';
import CostumB from '../../Components/CostumB';
import {passwordsMatch} from '../../Verifications/passwordsMatch';
import Patch from '../../Requests/Patch';
import {API_URL} from '../../env';

async function handleRequest(
  token: string,
  code: string,
  password: string,
  confirmPassword: string,
) {
  if (!passwordsMatch(password, confirmPassword)) {
    toast('Passwords should match');
    return;
  }
  const data = {
    code: parseInt(code),
    newPassword: password,
  };
  const head = {
    headers: {Authorization: `Bearer ${token}`},
  };
  const response = await Patch(API_URL + '/auth/resetPassword', data, head);
  console.log(response);
}

export default function ForgetPassword({route, navigation}: any) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const {token, code} = route.params;
  const [animating, setAnimating] = useState(false);

  return (
    <>
      <View style={styles.container}>
        <StatusBar translucent backgroundColor={'transparent'} />
        <Logo />
        <Text style={styles.text}>Create new password</Text>
        <Text style={styles.innertext}>
          Your new password must be different from previously used password
        </Text>
        <View style={styles.innerContainer}>
          <Inputtext
            source={require('../../Icons/sms.png')}
            placeHolder="Password"
            changeText={password => setPassword(password)}
          />
          <Inputtext
            source={require('../../Icons/sms.png')}
            placeHolder="Confirm Password"
            changeText={confirmPassword => setConfirmPassword(confirmPassword)}
          />
        </View>
        <CostumB
          title="Reset Password"
          animating={animating}
          onPress={async () => {
            setAnimating(true);
            await handleRequest(token, code, password, confirmPassword);
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
