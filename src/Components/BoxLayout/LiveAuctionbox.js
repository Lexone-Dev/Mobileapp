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

const Liveauction = props => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.Box1}
      onPress={() => navigation.navigate('Projectdetails')}>
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
          <Image
            source={require('../../Assets/Image/Image.png')}
            style={styles.img1}
          />
          <View
            style={{
              position: 'absolute',
              right: 20,
              top: 20,
              backgroundColor: 'rgba(0,0,0,0.1)',
              padding: 5,
              borderRadius: 10,
              borderColor: Colors.White,
              borderWidth: 1,
            }}>
            <Text
              style={{
                color: Colors.White,
                fontFamily: 'Poppins-SemiBold',
                fontSize: 10,
              }}>
              15h Left
            </Text>
          </View>
        </View>
        <View style={styles.Box2}>
          <View style={styles.Smallbox}>
            <View>
              <Text
                style={{
                  color: Colors.White,
                  fontSize: 18,
                  fontFamily: 'Poppins-SemiBold',
                }}>
                Netfilx
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={require('../../Assets/Image/Profile.png')}
                  style={styles.img2}
                />
                <Text
                  style={{
                    color: Colors.White,
                    marginLeft: 5,
                    fontSize: 12,
                    width: 80,
                    fontFamily: 'Poppins-Medium',
                  }}>
                  Sagarika
                </Text>
              </View>
            </View>

            <View
              style={{
                backgroundColor: '#1E1E2D',
                borderRadius: 15,
                justifyContent: 'center',
                alignItems: 'center',
                padding: 10,
              }}>
              <Text
                style={{
                  fontFamily: 'Poppins-SemiBold',
                  fontSize: 10,
                  color: Colors.Blue,
                }}>
                Auction Ends
              </Text>
              <View style={{flexDirection: 'row'}}>
                <View style={styles.timebox}>
                  <Text style={styles.time}>19</Text>
                </View>
                <Text style={{color: Colors.White, alignSelf: 'center'}}>
                  :
                </Text>
                <View style={styles.timebox}>
                  <Text style={styles.time}>19</Text>
                </View>
                <Text style={{color: Colors.White, alignSelf: 'center'}}>
                  :
                </Text>
                <View style={styles.timebox}>
                  <Text style={styles.time}>19</Text>
                </View>
              </View>
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
    height: 370,
    marginRight: 12,
  },
  Box3: {
    padding: 10,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.07)',
  },
  Box2: {
    position: 'absolute',
    height: 215,
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
  img2: {
    borderRadius: 28,
    height: 30,
    width: 30,
  },
  Smallbox: {
    height: 90,
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.09)',
    marginHorizontal: 10,
    marginTop: 110,
    borderRadius: 15,
    borderColor: 'rgba(255, 255, 255, 1)',
    borderWidth: 0.2,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  timebox: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingVertical: 2,
    backgroundColor: '#292938',
    borderRadius: 5,
    margin: 5,
  },
  time: {
    fontFamily: 'Poppins-Regular',
    fontSize: 10,
    color: Colors.White,
  },
});

export default Liveauction;
