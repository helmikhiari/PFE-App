import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  StatusBar,
  ScrollView,
} from 'react-native';
import {Button, Calendar, Card} from '@ui-kitten/components';
import CostumB from '../../Components/CostumB';
import {Modal} from '@ui-kitten/components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Get from '../../Requests/Get';
import {API_URL} from '../../env';
import Post from '../../Requests/Post';

export default function Appointment({route}: any) {
  const [date, setDate] = useState(new Date());
  const [selected, setSelected] = useState(-1);
  const [visible, setVisible] = useState(false);
  const [times, setTimes] = useState([]);
  const doctorId = route.params._id;
  const [Confirmation, setConfirmation] = useState();

  const handleConfirmation = async () => {
    const token = await AsyncStorage.getItem('token');
    const Hours = times[selected][0] + times[selected][1];
    const Min = times[selected][3] + times[selected][4];
    const a: number = date.getDate();
    date.setUTCHours(Hours, Min);
    date.setDate(a);

    console.log(date);
    const data = {date: date};
    const response = await Post(
      API_URL + '/patient/bookApp?doctorId=' + doctorId,
      data,
      token,
    );
    setConfirmation(response);

    setVisible(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const dateToSend =
          date.getFullYear() +
          '-' +
          (date.getMonth() + 1) +
          '-' +
          date.getDate();
        const response = await Get(
          API_URL + '/doctor/Availibility/' + doctorId + '/' + dateToSend,
          token,
        );
        setTimes(response);
      } catch (error) {
        throw error;
      }
    };
    fetchData();
  }, [date, visible]);

  const filterDays = (d: Date) => {
    const day = d.getDay();
    const dayOfMonth = d.getDate();
    const today = new Date().getDate();
    return !(day == 0 || day == 6 || dayOfMonth < today);
  };

  const renderTime = (item: any, index: number) => {
    const chosen: boolean = index == selected;
    return (
      <TouchableHighlight
        style={[styles.button, chosen ? {backgroundColor: '#1C2A3A'} : null]}
        onPress={() => {
          setSelected(index);
        }}>
        <Text style={[styles.buttonText, chosen ? {color: 'white'} : null]}>
          {item}
        </Text>
      </TouchableHighlight>
    );
  };
  return (
    <View style={{flex: 1, justifyContent: 'space-evenly'}}>
      <View style={styles.container}>
        <StatusBar backgroundColor={'white'} />
        <Text style={styles.text}>Select Date</Text>
        <Calendar
          date={date}
          onSelect={nextDate => setDate(nextDate)}
          style={{borderRadius: 18, alignSelf: 'center'}}
          filter={filterDays}
        />
        <Text style={styles.text}>Select Hour</Text>
        <ScrollView
          contentContainerStyle={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            flexWrap: 'wrap',
          }}
          style={{marginBottom: '8%'}}>
          {times.map((item, index) => renderTime(item, index))}
        </ScrollView>
      </View>
      <CostumB title="Confirm" onPress={handleConfirmation} />

      <Modal
        animationType="slide"
        visible={visible}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setVisible(false)}>
        <Card
          disabled={false}
          style={{borderRadius: 20, marginHorizontal: '3%'}}>
          <Text style={[styles.text, {fontSize: 16}]}>{Confirmation}</Text>
          <Button onPress={() => setVisible(false)}>DISMISS</Button>
        </Card>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: '#1C2A3A',
    fontSize: 22,
    fontWeight: '600',
    marginBottom: '8%',
    marginTop: '5%',
  },
  container: {
    flex: 0.99,
    backgroundColor: 'white',
    paddingHorizontal: '5%',
  },
  button: {
    backgroundColor: '#F9FAFB',
    borderWidth: 0,
    borderRadius: 10,
    width: '28%',
    height: 40,
    alignItems: 'center',
    marginVertical: '1%',
    marginHorizontal: '2%',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#6B7280',
    fontSize: 18,
    letterSpacing: 0.5,
    fontWeight: '600',
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});
