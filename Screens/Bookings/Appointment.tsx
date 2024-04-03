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
export default function Appointment() {
  const [date, setDate] = useState(new Date());
  const [selected, setSelected] = useState(-1);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const calendar = () => {
      console.log('date', date);
    };
    calendar();
  }, [date]);
  const renderTime = (item: any, index: number) => {
    const chosen: boolean = index == selected;
    return (
      <TouchableHighlight
        style={[styles.button, chosen ? {backgroundColor: '#1C2A3A'} : null]}
        onPress={() => {
          setSelected(index);
        }}>
        <Text style={[styles.buttonText, chosen ? {color: 'white'} : null]}>
          {item.time}
        </Text>
      </TouchableHighlight>
    );
  };
  const times = [
    {
      time: '11:00',
    },
    {
      time: '11:30',
    },
    {
      time: '12:00',
    },
    {
      time: '14:00',
    },
    {
      time: '14:00',
    },
    {
      time: '14:00',
    },
    {
      time: '14:00',
    },
    {
      time: '14:00',
    },
    {
      time: '14:00',
    },
  ];
  return (
    <View style={{flex: 1, justifyContent: 'space-evenly'}}>
      <View style={styles.container}>
        <StatusBar backgroundColor={'white'} />
        <Text style={styles.text}>Select Date</Text>
        <Calendar
          date={date}
          onSelect={nextDate => setDate(nextDate)}
          style={{borderRadius: 18, alignSelf: 'center'}}
          filter={d => {
            const day = d.getDay();
            return !(day == 0 || day == 6);
          }}
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
      <CostumB
        title="Confirm"
        onPress={() => {
          setVisible(true);
        }}
      />

      <Modal
        animationType="slide"
        visible={visible}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setVisible(false)}>
        <Card
          disabled={false}
          style={{borderRadius: 20, marginHorizontal: '3%'}}>
          <Text style={[styles.text, {fontSize: 16}]}>
            Appointment Booked,Waiting For Confirmation from Doctor
          </Text>
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
