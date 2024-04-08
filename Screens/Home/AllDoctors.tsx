import React, {useEffect, useState} from 'react';
import {
  StatusBar,
  View,
  StyleSheet,
  FlatList,
  Text,
  useWindowDimensions,
} from 'react-native';
import {ActivityIndicator, Button} from 'react-native-paper';
import Search from '../../Components/SearchBar';
import Card from '../../Components/Card';
import { API_URL } from '../../env';
import Get from '../../Requests/Get';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default  function AllDoctors({navigation, route}: any) {
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
    let name=item.firstName+" "+item.lastName
    if (name.length > 20) {
      cuttedName = name.substring(0, 15) + '...';
    } else {
      cuttedName = name;
    }
    if (
      (item.speciality == medicalSpecialties[selected] || selected == 0) &&
      name.toLowerCase().includes(searchValue.toLowerCase())
    ) {
      return (
        <Card
          source={{uri:item.picture}}
          name={cuttedName}
          speciality={item.speciality}
          numberOfReviews={item.numberOfReviews}
          location={item.address}
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
  
  const [loading,setLoading]=useState(true)
  const [data,setData]=useState()
useEffect(()=>{
  const fetchDoctors=async ()=>{
  try
  { const token= await AsyncStorage.getItem('token');
    const response =  await Get(API_URL + '/patient/allDoctors',token);
    console.log(response)
    setData(response)
  }
  catch(error)
  {
    throw error;
  }
  finally
  { 
    setLoading(true)
  }
}
fetchDoctors()
},[])
  

return loading?(
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
          data={data}
          renderItem={renderCard}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </>
  ):
  (<ActivityIndicator/>);
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
