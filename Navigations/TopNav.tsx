import React from 'react';
import { StyleSheet } from 'react-native';
import { Layout, Tab, TabView, Text } from '@ui-kitten/components';
import UpComingBookings from '../Screens/Bookings/UpcomingBookings';
import CompletedBookings from '../Screens/Bookings/CompletedBookings';
import PendingBookings from '../Screens/Bookings/PendingBookings';



  const TopNav = (): React.ReactElement => {

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  return (
    <TabView
      selectedIndex={selectedIndex}
      onSelect={index => setSelectedIndex(index)}
      style={{flex:1,backgroundColor:"white"}}
      indicatorStyle={{width:"70%",height:3}}
      tabBarStyle={{height:40}}
    >
      <Tab title={(styles:any)=><Text style={[styles.style,{fontSize:16}]}>Upcoming</Text>}>
        <Layout style={styles.tabContainer}>
          <UpComingBookings/>
        </Layout>
      </Tab>
      <Tab title={(styles:any)=><Text style={[styles.style,{fontSize:16}]}>Completed</Text>}>
        <Layout style={styles.tabContainer}>
          <CompletedBookings/>
        </Layout>
      </Tab>
      <Tab title={(styles:any)=><Text style={[styles.style,{fontSize:16}]}>Pending</Text>}>
        <Layout style={styles.tabContainer}>
          <PendingBookings/>
        </Layout>
      </Tab>
    </TabView>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex:1,
  },
  tabTitle: {
    fontSize: 18,  
    fontWeight:"bold"
  },
})

export default TopNav;