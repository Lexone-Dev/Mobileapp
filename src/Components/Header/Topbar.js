import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import {Colors} from '../../Theme/Color';

const Topbar = props => {
  const navigation = useNavigation();
  return (
    <View style={styles.headerview}>
      <TouchableOpacity
        style={styles.Button}
        onPress={() => {
          navigation.openDrawer();
        }}>
        <Image source={require('../../Assets/Image/Humburger.png')} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Profile');
        }}
        style={styles.Button}>
        <Image source={require('../../Assets/Image/Profile.png')} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: Dimensions.get('window').width,
    paddingHorizontal: 20,
    marginVertical: 30,
  },

  Button: {
    width: 55,
    height: 55,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Topbar;
