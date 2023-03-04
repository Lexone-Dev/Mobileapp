import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Colors} from '../../Theme/Color';

const Bidlist = props => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.Box4}
      onPress={() => {
        navigation.navigate('CreatedProject');
      }}>
      <Image
        source={require('../../Assets/Image/Profile.png')}
        style={styles.profileImg}
      />
      <View style={{marginHorizontal: 10}}>
        <Text style={[styles.Head, {color: Colors.White}]}>
          Bid placed by Sagarika Mohanty
        </Text>
        <Text style={styles.Titel}>Dec 05, 2021 at 18:33 pm</Text>
      </View>
      <View style={{flexDirection: 'row', marginLeft: 20}}>
        <Image
          source={require('../../Assets/Image/etc.png')}
          style={styles.etcImg}
        />
        <Text
          style={{
            color: Colors.Blue,
            fontSize: 16,
            fontFamily: 'Poppins-Regular',
          }}>
          $ 3.5
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  Head: {
    color: '#44C1F2',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 12,
  },
  Titel: {
    color: Colors.Grey,
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
  },

  Box4: {
    backgroundColor: '#1E1E2D',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  profileImg: {
    height: 35,
    width: 39,
    borderWidth: 3,
    borderColor: Colors.White,
    borderRadius: 100,
  },
  etcImg: {
    height: 24,
    width: 26,
  },
});

export default Bidlist;
