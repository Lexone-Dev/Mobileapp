import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
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
  const [countdownDate, setCountdownDate] = useState(
    new Date(`${props.bidLastDate}`).getTime(),
  );
  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    setInterval(() => setNewTime(), 1000);
  }, []);
  const setNewTime = () => {
    if (countdownDate) {
      const currentTime = new Date().getTime();

      const distanceToDate = countdownDate - currentTime;

      let days = Math.floor(distanceToDate / (1000 * 60 * 60 * 24));
      let hours = Math.floor(
        (distanceToDate % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      let minutes = Math.floor(
        (distanceToDate % (1000 * 60 * 60)) / (1000 * 60),
      );
      let seconds = Math.floor((distanceToDate % (1000 * 60)) / 1000);

      const numbersToAddZeroTo = [1, 2, 3, 4, 5, 6, 7, 8, 9];

      days = `${days}`;
      if (numbersToAddZeroTo.includes(hours)) {
        hours = `0${hours}`;
      } else if (numbersToAddZeroTo.includes(minutes)) {
        minutes = `0${minutes}`;
      } else if (numbersToAddZeroTo.includes(seconds)) {
        seconds = `0${seconds}`;
      }

      setTime({days: days, hours: hours, minutes, seconds});
    }
  };
  return (
    <TouchableOpacity
      style={styles.Box1}
      onPress={() => navigation.navigate('Projectdetails', {props})}>
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

          <View
            style={{
              backgroundColor: '#1E1E2D',
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
              padding: 10,
              position: 'absolute',
              top: 10,
              left: 10,
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
                <Text style={styles.time}>{time.days || '0'}</Text>
              </View>
              <Text style={{color: Colors.White, alignSelf: 'center'}}>:</Text>
              <View style={styles.timebox}>
                <Text style={styles.time}>{time.hours || '00'}</Text>
              </View>
              <Text style={{color: Colors.White, alignSelf: 'center'}}>:</Text>
              <View style={styles.timebox}>
                <Text style={styles.time}>{time.minutes || '00'}</Text>
              </View>
              <Text style={{color: Colors.White, alignSelf: 'center'}}>:</Text>
              <View style={styles.timebox}>
                <Text style={styles.time}>{time.seconds || '00'}</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.Box2}>
          <View style={styles.Smallbox}>
            <View>
              <Text
                style={{
                  color: Colors.White,
                  fontSize: 16,
                  fontFamily: 'Poppins-SemiBold',
                }}>
                {props.projectname}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 10,
                }}>
                <View
                  style={[
                    styles.img2,
                    {
                      borderWidth: 1,
                      borderColor: Colors.Blue,
                      borderRadius: 20,
                      justifyContent: 'center',
                      alignItems: 'center',
                    },
                  ]}>
                  <Text
                    style={{
                      color: Colors.White,

                      fontSize: 14,
                      fontFamily: 'Poppins-Medium',
                    }}>
                    {props?.user?.slice(0, 1)}
                  </Text>
                </View>
                <Text
                  style={{
                    color: Colors.White,
                    marginLeft: 15,
                    fontSize: 14,
                    width: 80,
                    fontFamily: 'Poppins-Medium',
                  }}>
                  {props.user}
                </Text>
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
    marginLeft: 20,
    marginRight: -8,
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
    marginHorizontal: 15,
    marginTop: 100,
    borderRadius: 15,
    borderWidth: 0.2,
    flexDirection: 'row',
  },
  timebox: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
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
