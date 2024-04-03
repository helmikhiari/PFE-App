import {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  Pressable,
  TouchableHighlight,
  Image,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import Search from '../../Components/SearchBar';
import ImageText from '../../Components/ImageText';
import Navigation from '../../Navigations/Navigation';

export default function Home({navigation}: any) {
  const [showList, setShowList] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const w = useWindowDimensions();

  const Card = ({text, source}: any) => {
    return (
      <View style={styles.cardContainer}>
        <TouchableHighlight
          underlayColor={'white'}
          onPress={() => navigation.navigate('allDoctors', {text})}>
          <Image source={source} height={45} width={45} resizeMode="cover" />
        </TouchableHighlight>
        <Text style={styles.cardText}>{text}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        showList ? {justifyContent: 'flex-start'} : {},
      ]}>
      <StatusBar backgroundColor="white" />
      <Search
        handleChange={txt => setSearchValue(txt)}
        showList={showList}
        onBlur={() => setShowList(false)}
        onFocus={() => setShowList(true)}
      />
      {!showList && (
        <>
          <ImageText
            height={w.height * 0.26}
            width={'100%'}
            source={require('../../Images/Banner.png')}
            title={'Looking for Specialists Doctors?'}
            subtitle={'Schedule an appointment with our top doctors.'}
          />
          <View style={styles.innerContainer}>
            <Text style={styles.categorie}>Categories</Text>
            <Pressable
              onPress={() => {
                navigation.navigate('allDoctors');
              }}>
              <Text style={styles.seeAll}>See All</Text>
            </Pressable>
          </View>
          <View style={styles.innerContainer2}>
            <Card
              source={require('../../Images/dentist.png')}
              text="Dentistry"
            />
            <Card
              source={require('../../Images/cardiolo.png')}
              text="Cardiolo.."
            />
            <Card
              source={require('../../Images/pulmono.png')}
              text="Pulmono.."
            />
            <Card source={require('../../Images/general.png')} text="General" />
          </View>
          <View style={styles.innerContainer2}>
            <Card
              source={require('../../Images/neurology.png')}
              text="Neurology"
            />
            <Card
              source={require('../../Images/gastroen.png')}
              text="Gastroen.."
            />
            <Card
              source={require('../../Images/laborato.png')}
              text="Laborato.."
            />
            <Card
              source={require('../../Images/vaccinat.png')}
              text="Vaccinat.."
            />
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: '3%',
    justifyContent: 'space-around',
    paddingTop: 20,
  },
  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  categorie: {
    color: '#1C2A3A',
    fontWeight: '700',
    fontSize: 16,
    letterSpacing: 1,
  },
  seeAll: {
    color: '#6B7280',
    fontSize: 14,
  },
  cardContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardText: {
    color: '#4B5563',
    fontWeight: 'bold',
    marginTop: 4,
  },
  innerContainer2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
