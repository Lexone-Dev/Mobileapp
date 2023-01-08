import {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Dimensions,
} from 'react-native';
import Backbtn from '../Components/Button/Backbtn';
import {Colors} from '../Theme/Color';

const Tnc = () => {
  return (
    <ImageBackground
      style={styles.Image}
      source={require('../Assets/Image/BackgroundImage.png')}
      resizeMode="cover">
      <Backbtn />
      <View style={styles.container}>
        <View style={styles.box1}>
          <Text
            style={{
              fontSize: 28,
              color: Colors.White,
              fontFamily: 'Poppins-Bold',
              textAlign: 'center',
            }}>
            Term & Conditions
          </Text>
        </View>
        <View style={styles.btn1}>
          <ScrollView>
            <Text style={styles.infotxt}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an Lorem Ipsum has been Lorem Ipsum is
              simply dummy text of the printing and typesetting industry. Lorem
              Ipsum has been the industry's standard dummy text ever since the
              1500s, when an Lorem Ipsum has been Lorem Ipsum is simply dummy
              text of the printing and typesetting industry. Lorem Ipsum has
              been the industry's standard dummy text ever since the 1500s, when
              an Lorem Ipsum has been Lorem Ipsum is simply dummy text of the
              printing and typesetting industry. Lorem Ipsum has been the
              industry's standard dummy text ever since the 1500s, when an Lorem
              Ipsum has been Lorem Ipsum is simply dummy text of the printing
              and typesetting industry. Lorem Ipsum has been the industry's
              standard dummy text ever since the 1500s, when an Lorem Ipsum has
              been Lorem Ipsum is simply dummy text of the printing and
              typesetting industry. Lorem Ipsum has been the industry's standard
              dummy text ever since the 1500s, when an Lorem Ipsum has been
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an Lorem Ipsum has been Lorem Ipsum is
              simply dummy text of the printing and typesetting industry. Lorem
              Ipsum has been the industry's standard dummy text ever since the
              1500s, when an Lorem Ipsum has been
            </Text>
          </ScrollView>
        </View>
      </View>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  Image: {
    justifyContent: 'center',
    flex: 1,
    padding: 20,
  },
  container: {
    flex: 1,
  },
  box1: {
    width: '100%',
    marginTop: 50,
    marginBottom: 10,
  },
  btn1: {
    borderRadius: 15,
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.07)',
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('window').height / 1.4,
  },

  infotxt: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    lineHeight: 30,
    color: Colors.White,
    marginHorizontal: 10,
    textAlign: 'justify',
  },
});

export default Tnc;
