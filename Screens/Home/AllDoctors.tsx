import React, {useEffect, useState} from 'react';
import {
  StatusBar,
  View,
  StyleSheet,
  FlatList,
  Text,
  useWindowDimensions,
} from 'react-native';
import {Button} from 'react-native-paper';
import Search from '../../Components/SearchBar';
import Card from '../../Components/Card';

export default function AllDoctors({navigation, route}: any) {
  const medicalSpecialties = [
    'All',
    'General',
    'Allergist/Immunologist',
    'Anesthesiologist',
    'Cardiologist',
    'Dermatologist',
    'Endocrinologist',
    'Family Physician',
    'Gastroenterologist',
    'Geneticist',
    'Hematologist',
    'Hospice and Palliative Medicine Specialist',
    'Infectious Disease Physician',
    'Internal Medicine',
    'Nephrologist',
    'Neurologist',
    'Obstetrician/Gynecologist (OBGYNs)',
    'Oncologist',
    'Ophthalmologist',
    'Orthopedist',
    'Otolaryngologist',
    'Osteopath',
    'Pathologist',
    'Pediatrician',
    'Physician Executive',
    'Plastic Surgeon',
    'Podiatrist',
    'Psychiatrist',
    'Pulmonologist',
    'Radiologist',
    'Rheumatologist',
    'Sleep Medicine Specialist',
    'Surgeon',
    'Urologist',
  ];
  const [searchValue, setSearchValue] = useState('');
  const [selected, setSelected] = useState(0);
  const renderCard = ({item, index, w}: any) => {
    let cuttedName: string;
    if (item.name.length > 20) {
      cuttedName = item.name.substring(0, 15) + '...';
    } else {
      cuttedName = item.name;
    }
    if (
      (item.speciality == medicalSpecialties[selected] || selected == 0) &&
      item.name.toLowerCase().includes(searchValue.toLowerCase())
    ) {
      return (
        <Card
          source={item.source}
          name={cuttedName}
          speciality={item.speciality}
          numberOfReviews={item.numberOfReviews}
          location={item.location}
          review={item.review}
          onPress={() => {
            navigation.navigate('doctorDetails', item);
          }}
        />
      );
    } else return null;
  };

  const renderSpecialtyButton = ({item, index}: any) => (
    <Button
      key={index}
      onPress={() => {
        setSelected(index);
      }}
      mode={selected === index ? 'contained' : 'outlined'}
      style={[
        styles.buttonStyle,
        selected === index ? styles.selectedButton : {},
      ]}
      labelStyle={[
        styles.labelStyle,
        selected === index ? styles.selectedLabel : {},
      ]}>
      {item}
    </Button>
  );
  const doctors = [
    {
      name: 'Dr.David Patel',
      speciality: 'General',
      numberOfReviews: 1872,
      location: 'Cardiology Center, USA',
      source: require('../../Images/doc1.png'),
      review: '5',
    },
    {
      name: 'Dr.David Patel Ghand',
      speciality: 'Cardiologist',
      numberOfReviews: 1872,
      location: 'Cardiology Center, USA',
      source: require('../../Images/doc2.png'),
    },
    {
      name: 'Dr.Yahya Khiari',
      speciality: 'Cardiologist',
      numberOfReviews: 1872,
      location: 'Cardiology Center, USA',
      source: require('../../Images/doc3.png'),
    },
    {
      name: 'Dr.Ayda Nsir',
      speciality: 'Cardiologist',
      numberOfReviews: 1872,
      location: 'Cardiology Center, USA',
      source: require('../../Images/doc2.png'),
    },
    {
      name: 'Dr.Farah Albouchi',
      speciality: 'Cardiologist',
      numberOfReviews: 1872,
      location: 'Cardiology Center, USA',
      source: require('../../Images/doc2.png'),
    },
    {
      name: 'Dr.Helmi Khiari',
      speciality: 'Cardiologist',
      numberOfReviews: 1872,
      location: 'Cardiology Center, USA',
      source: require('../../Images/doc2.png'),
    },
  ];

  return (
    <>
      <StatusBar backgroundColor={'white'} />
      <View style={styles.container}>
        <View style={styles.searchBar}>
          <Search showList={false} handleChange={txt => setSearchValue(txt)} />
        </View>
        <View style={styles.FlatList}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            data={medicalSpecialties}
            renderItem={renderSpecialtyButton}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>

        <FlatList
          style={{paddingTop: 3}}
          data={doctors}
          renderItem={renderCard}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: '3%',
    borderWidth: 0,
  },
  buttonStyle: {
    height: 45,
    borderColor: '#1C2A3A',
    justifyContent: 'center',
    marginHorizontal: 5,
    borderWidth: 1.2,
  },
  selectedButton: {
    backgroundColor: '#1C2A3A',
  },
  labelStyle: {
    color: '#1C2A3A',
    fontSize: 15,
    fontWeight: 'normal',
  },
  selectedLabel: {
    color: 'white',
  },
  searchBar: {
    marginTop: 10,
  },
  FlatList: {
    marginTop: 10,
    marginBottom: 20,
  },
});
