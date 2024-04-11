import React, {useEffect, useState} from 'react';
import {RefreshControl, ScrollView, StyleSheet, Text, View} from 'react-native';
import BookingCard from '../../Components/BookingCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_URL} from '../../env';
import Get from '../../Requests/Get';
import {Appointment} from '../../Types/Appointment';
import {MONTH} from '../../Enums/Months';
import {ActivityIndicator} from 'react-native-paper';
import CustomAlert from '../../Components/CustomAlert';
import {Button} from '@ui-kitten/components';
import Delete from '../../Requests/Delete';

export default function PendingBookings({navigation}:any) {
  const [data, setData] = useState<Appointment[]>([]);
  const [render, setRender] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [visible, setVisible] = useState(false);
  const [id, setId] = useState('');
  const [request, setRequest] = useState(false);

  const fetchData = async () => {
    const token = await AsyncStorage.getItem('token');
    const response = await Get(API_URL + '/patient/pendingApps', token);
    setData(response);
    setRequest(true);
  };
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      const z = [...data];
      z.forEach((app: Appointment, index: number) => {
        let a: Date = new Date(app.date);
        let m = a.getMonth() + 1;
        let s: string = '';
        s += MONTH[m];
        s +=
          ' ' +
          a.getDate() +
          ', ' +
          a.getFullYear() +
          ' - ' +
          a.getUTCHours() +
          ':' +
          a.getUTCMinutes();
        a.getUTCMinutes() == 0 ? (s += '0') : null;
        z[index].date = s;
      });

      setRender(!render);
    }
  }, [data]);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

   const cancelApp = async () => {
    const token = await AsyncStorage.getItem('token');

    const response = await Delete(
      API_URL + '/patient/cancelApp?appId=' + id,
      token,
    );
    console.log(response);
    setVisible(false);
    await fetchData();
  };

  return request ? (
    <>
      <ScrollView
        style={{paddingHorizontal: '3%', flex: 1, paddingTop: '5%'}}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {data.length > 0 ? (
          data.map((booking, index) => (
            <BookingCard
              key={booking.id}
              date={booking.date}
              location={booking.address}
              name={booking.name}
              speciality={booking.speciality}
              source={{uri: booking.picture}}
              rightButtonOnPress={() => {
                setVisible(true);
                setId(booking.id);
              }}
              rightButtonTitle="Cancel"
            />
          ))
        ) : (
          <Text>No Bookings Available</Text>
        )}
      </ScrollView>

      <CustomAlert
        visible={visible}
        onBackdropPress={() => setVisible(false)}
        style={{width: '66%'}}>
        <Text style={[styless.text, {fontSize: 16}]}>Are you sure?</Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Button onPress={() => setVisible(false)}>No</Button>
          <Button onPress={cancelApp}>Yes</Button>
        </View>
      </CustomAlert>
    </>
  ) : (
    <>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <ActivityIndicator />
      </ScrollView>
    </>
  );
}

export const styless = StyleSheet.create({
  text: {
    color: '#1C2A3A',
    fontSize: 22,
    fontWeight: '600',
    marginBottom: '8%',
    marginTop: '5%',
  },
});

