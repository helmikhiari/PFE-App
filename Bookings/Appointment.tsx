import {StatusBar} from 'native-base';
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Calendar} from '@ui-kitten/components';

export default function Appointment() {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const calendar = () => {
      console.log('date', date);
    };
    calendar();
  }, [date]);

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor={'transparent'} />
      <Text style={styles.text}>Select Date</Text>
      <Calendar date={date} onSelect={nextDate => setDate(nextDate)} />
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: '#1C2A3A',
    fontSize: 22,
    fontWeight: '600',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: '5%',
  },
  buttonContainer: {
    marginTop: 20,
  },
});

const styles1 = StyleSheet.create({
  calendar: {
    marginBottom: 10,
  },
  switchContainer: {
    flexDirection: 'row',
    margin: 10,
    alignItems: 'center',
  },
  switchText: {
    margin: 10,
    fontSize: 16,
  },
  text: {
    textAlign: 'center',
    padding: 10,
    backgroundColor: 'lightgrey',
    fontSize: 16,
  },
  disabledText: {
    color: 'grey',
  },
  defaultText: {
    color: 'purple',
  },
  customCalendar: {
    height: 250,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
  },
  customDay: {
    textAlign: 'center',
  },
  customHeader: {
    backgroundColor: '#FCC',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: -4,
    padding: 8,
  },
  customTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  customTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00BBF2',
  },
});
