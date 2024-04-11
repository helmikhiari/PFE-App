import React, {useEffect, useState} from 'react';
import {RefreshControl, ScrollView, Text, View} from 'react-native';
import BookingCard from '../../Components/BookingCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_URL} from '../../env';
import Get from '../../Requests/Get';
import {Appointment} from '../../Types/Appointment';
import {MONTH} from '../../Enums/Months';
import {ActivityIndicator, Button} from 'react-native-paper';
import CustomAlert from '../../Components/CustomAlert';
import { styless } from './PendingBookings';
import Delete from '../../Requests/Delete';
import { useNavigation } from '@react-navigation/native';

export default function CompletedBookings() {
  const navigation=useNavigation();
  const [data, setData] = useState<Appointment[]>([]);
  const [render, setRender] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [id, setId] = useState('');
  const [request, setRequest] = useState(false);


  const fetchData = async () => {
    const token = await AsyncStorage.getItem('token');
    const response = await Get(API_URL + '/patient/completedApps', token);
    setData(response);
    setRequest(true);
  };
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (data?.length > 0) {
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



  return request ? (
    <ScrollView
      style={{ paddingHorizontal: '3%', flex: 1, paddingTop: '5%' }}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
      {data.length > 0 ? (
        data.map((booking, index) => (
          <BookingCard
            key={index}
            date={booking.date}
            location={booking.address}
            name={booking.name}
            speciality={booking.speciality}
            source={{ uri: booking.picture }}
            leftButtonOnPress={() => {setId(booking.id);navigation.navigate('BookApp',{_id:id})}}
            rightButtonOnPress={() => { } }
            leftButtonTitle="Re-Book"
            rightButtonTitle="Add Review" />
        ))
      ) : (
        <Text>No Bookings Available</Text>
      )}
    </ScrollView>
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
