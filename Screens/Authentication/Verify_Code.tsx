import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, StatusBar, Pressable} from 'react-native';
import Logo from '../../Components/Logo';
import Post from '../../Requests/Post';
import {OtpInput} from 'react-native-otp-entry';
import CostumB from '../../Components/CostumB';
import toast from '../../Components/Toast';
import {API_URL} from '../../env';

async function Resend(email: string) {
  const data = {
    email: email,
  };
  const token = await Post(API_URL + '/auth/forgetPassword', data);
  return token;
}

async function Verify(code: string, token: string, navigation: any) {
  const data = {
    code: code,
  };

  const response = await Post(API_URL + '/auth/verifyCode', data, token);
  if (!response) {
    toast('Invalid Verification Code');
    return;
  }
  navigation.navigate('resetPassword', {token: token, code: code});
}

export default function VerifyCode({route, navigation}: any) {
  const [code, setCode] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [token, setToken] = useState(route.params.token);
  const [counter, setCounter] = useState(60);
  const [firstResend, setFirstResend] = useState(true);
  const email = route.params.email;
  const [animating, setAnimating] = useState(false);
  return (
    <>
      <View style={styles.container}>
        <StatusBar translucent backgroundColor={'transparent'} />
        <Logo />
        <Text style={styles.text}>Verify Code</Text>
        <Text style={styles.innertext}>
          Enter the code we just sent you on {email}
        </Text>
        <View style={styles.innerContainer}>
          <OtpInput
            numberOfDigits={5}
            focusColor="#102334"
            focusStickBlinkingDuration={800}
            onFilled={() => setDisabled(false)}
            onTextChange={code => {
              code.length < 5 ? setDisabled(true) : setCode(code);
            }}
            theme={{
              containerStyle: {
                alignSelf: 'center',
                paddingHorizontal: '10%',
                marginBottom: '5%',
              },
              pinCodeTextStyle: {color: 'black'},
            }}
          />
        </View>
        <CostumB
          title="Verify"
          animating={animating}
          onPress={async () => {
            setAnimating(true);
            await Verify(code, token, navigation);
            setAnimating(false);
          }}
          disabled={disabled}
        />
        <View style={styles.footer}>
          <Text style={[styles.innertext, {marginHorizontal: 5}]}>
            Didn't get the Code?
          </Text>
          <Pressable
            onPress={async () => {
              if (!firstResend && counter > 0) {
                toast('Wait ' + counter + ' Seconds to send a new Code');
                return;
              }
              setToken(await Resend(email));
              setFirstResend(false);
              const timerId = setInterval(() => {
                if (counter > 0) {
                  setCounter(counter => counter - 1);
                } else {
                  clearInterval(timerId);
                  setCounter(60); // Stop the timer when it reaches 0
                }
              }, 1000); // 1000 milliseconds = 1 second

              return () => clearInterval(timerId);
            }}
            style={styles.linkContainer}>
            <Text style={styles.link}>Resend</Text>
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
  link: {
    color: '#1C64F2',
    fontSize: 16,
    fontWeight: '600',
    paddingLeft: 0,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  linkContainer: {
    marginBottom: '10%',
    marginTop: '5%',
  },
});
