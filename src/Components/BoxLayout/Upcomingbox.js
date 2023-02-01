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

const Upcomingbox = props => {
  const navigation = useNavigation();
  console.log('Upcomingbox', props);
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Projectdetails', {props})}
      style={styles.Box1}>
      <View style={styles.Box3}>
        <View
          style={{
            width: Dimensions.get('window').width / 1.6,
            borderRadius: 28,
            height: 200,
            borderColor: Colors.White,
            shadowColor: '#fff',
            shadowOffset: {
              width: 0,
              height: 12,
            },
            shadowOpacity: 0.58,
            shadowRadius: 16.0,
            backgroundColor: Colors.White,
            elevation: 24,
          }}>
          <Image source={{uri: props.image}} style={styles.img1} />
        </View>
        <View style={styles.Box2} />
        <Text
          style={{
            color: Colors.White,
            fontSize: 18,
            fontFamily: 'Poppins-Bold',
            marginVertical: 10,
            alignSelf: 'center',
          }}>
          {props?.projectname}
        </Text>
        <View
          style={{
            backgroundColor: '#1E1E2D',
            borderRadius: 15,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 10,
            height: 50,
          }}>
          <Text
            style={{
              fontFamily: 'Poppins-SemiBold',
              fontSize: 10,
              color: Colors.Blue,
            }}>
            Auction Starts
          </Text>
          <View style={{flexDirection: 'row'}}>
            <View style={styles.timebox}>
              <Text style={styles.time}>{props?.bidDate?.slice(0, 4)}</Text>
            </View>
            <Text style={{color: Colors.White, alignSelf: 'center'}}>:</Text>
            <View style={styles.timebox}>
              <Text style={styles.time}>{props?.bidDate?.slice(5, 7)}</Text>
            </View>
            <Text style={{color: Colors.White, alignSelf: 'center'}}>:</Text>
            <View style={styles.timebox}>
              <Text style={styles.time}>{props?.bidDate?.slice(8)}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  Box1: {
    padding: 20,
    borderRadius: 29,
    backgroundColor: 'rgba(255, 255, 255, 0.07)',
    width: Dimensions.get('window').width / 1.3,
    height: 350,
    marginRight: 12,
  },
  Box3: {
    padding: 10,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.07)',
  },
  Box2: {
    position: 'absolute',
    height: 180,
    width: Dimensions.get('window').width / 1.48,
    borderRadius: 28,
    backgroundColor: Colors.DarkBlue,
    marginTop: 115,
    zIndex: -1,
  },
  img1: {
    width: Dimensions.get('window').width / 1.6,
    borderRadius: 28,
    height: 200,
    borderColor: Colors.White,
    borderWidth: 1,
  },
  // Smallbox: {
  //   position: 'absolute',
  //   zIndex: 75,
  //   top: 50,
  //   width: Dimensions.get('window').width / 1.8,
  //   height: 70,
  //   backgroundColor: 'rgba(255, 255, 255, 0.2)',
  //   marginHorizontal: 10,
  //   marginTop: 125,
  //   borderRadius: 25,
  //   borderColor: 'rgba(255, 255, 255, 0.2)',
  //   borderWidth: 1,
  //   paddingVertical: 20,
  //   justifyContent: 'space-around',
  //   alignItems: 'center',
  //   alignSelf: 'center',
  // },
  timebox: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#292938',
    borderRadius: 5,
    margin: 5,
    height: 13,
  },
  time: {
    fontFamily: 'Poppins-Regular',
    fontSize: 10,
    paddingHorizontal: 5,
    color: Colors.White,
  },
});

export default Upcomingbox;
