import {View, Image, Text, StatusBar, StyleSheet} from 'react-native';
import Card from '../../Components/Card';
import CostumB from '../../Components/CostumB';
interface Props {
  source: any;
  name: string;
  speciality: string;
  location: string;
}
interface img {
  source: any;
  title: string;
  subtitle: string;
}
const Img = ({source, title, subtitle}: img) => {
  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <Image source={source} />
      <Text style={{color: '#4B5563', fontSize: 15, fontWeight: '600'}}>
        {title}
      </Text>
      <Text style={{color: '#6B7280', fontSize: 14}}>{subtitle}</Text>
    </View>
  );
};

export default function DoctorDetails({route, navigation}: any) {
  const {source, name, speciality, location} = route.params;
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'white'} />
      <View style={{flex: 0.4}}>
        <Card
          name={name}
          speciality={speciality}
          location={location}
          source={source}
          disabled={true}
        />
      </View>
      <View style={styles.images}>
        <Img
          source={require('../../Icons/profile.png')}
          title="2,000+"
          subtitle="patients"
        />
        <Img
          source={require('../../Icons/medal.png')}
          title="10+"
          subtitle="experience"
        />
        <Img
          source={require('../../Icons/littleStar.png')}
          title="5"
          subtitle="rating"
        />
        <Img
          source={require('../../Icons/messages.png')}
          title="1,872"
          subtitle="reviews"
        />
      </View>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>ABOUT ME</Text>
        <Text style={styles.description}>
          Dr. David Patel, a dedicated cardiologist, brings a wealth of
          experience to Golden Gate Cardiology Center in Golden Gate, CA.
        </Text>
      </View>
      <View>
        <Text style={styles.title}>Working Time</Text>
        <Text style={styles.description}>Monday-Friday, 8.00 - 18.00</Text>
      </View>
      <CostumB
        title="Book Appointment"
        onPress={() => {
          navigation.navigate('bookAppointment');
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: '10%',
    paddingTop: 10,
    justifyContent: 'space-evenly',
  },
  images: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: '3%',
  },
  title: {
    color: '#1F2A37',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  innerContainer: {},
  description: {
    color: '#6B7280',
    fontSize: 15,
    lineHeight: 23,
  },
});
