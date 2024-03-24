import {useState} from 'react';
import {Platform, TouchableOpacity, StyleSheet, View} from 'react-native';
import {SearchBar} from '@rneui/themed';
import {ListItem, Avatar} from 'react-native-elements';
interface props {
  onFocus?: () => void;
  onBlur?: () => void;
  showList: boolean;
  handleChange: (txt: string) => void;
}
export default function Search({
  showList,
  onFocus,
  onBlur,
  handleChange,
}: props) {
  const [search, setSearch] = useState('');

  let platform: any;
  Platform.OS == 'android' || Platform.OS == 'ios'
    ? (platform = Platform.OS)
    : (platform = 'default');

  const list = [
    {
      name: 'Amy Farha',
      avatar_url:
        'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
      subtitle: 'Vice President',
    },
    {
      name: 'Chris Jackson',
      avatar_url:
        'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
      subtitle: 'Vice Chairman',
    },
  ];
  return (
    <>
      <SearchBar
        placeholder="Search doctor..."
        onChangeText={handleChange}
        platform={platform}
        containerStyle={styles.containerStyle}
        inputMode="search"
        onFocus={onFocus}
        onBlur={onBlur}
      />
      {list.map(
        (l, i) =>
          showList && (
            <ListItem key={i} bottomDivider>
              <Avatar source={{uri: l.avatar_url}} />
              <ListItem.Content>
                <TouchableOpacity>
                  <ListItem.Title>{l.name}</ListItem.Title>
                  <ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle>
                </TouchableOpacity>
              </ListItem.Content>
            </ListItem>
          ),
      )}
    </>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    borderRadius: 10,
    backgroundColor: '#F3F4F6',
    height: 45,
    justifyContent: 'center',
  },
});
