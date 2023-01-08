import React from 'react';
import {
  SafeAreaView,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  ImageBackground,
  TextInput,
  Dimensions,
  ScrollView,
} from 'react-native';
import SmallBtn from '../Components/Button/SmallBtn';
import Header from '../Components/Header/Header';
import Topbar from '../Components/Header/Topbar';
import Topbar_edit from '../Components/Header/Topbar_edit';
import {Colors} from '../Theme/Color';

const Profile = ({navigation}) => {
  return (
    <ImageBackground
      style={styles.Image}
      source={require('../Assets/Image/BackgroundImage.png')}
      resizeMode="cover">
      <Topbar_edit />
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 100,
        }}>
        <View style={styles.Box1}>
          <Image
            source={require('../Assets/Image/Profile.png')}
            style={styles.img1}
          />
          <Text
            style={{
              color: Colors.Blue,
              fontWeight: 'bold',
              fontSize: 20,
              marginTop: 30,
            }}>
            Deepali Samal
          </Text>
          <Text style={styles.txt}>Software Enginner at Codekart Solution</Text>
        </View>

        <View style={[styles.Box2]}>
          <Text style={styles.txt}>Email ID : sagarika@gmail.com</Text>

          <Text style={styles.txt}>Phone Number : 91 7008170556</Text>

          <Text style={styles.txt}>DOB : 07.10.1999</Text>

          <Text style={styles.txt}>Identity Number : 1234 4567 345</Text>
          <Text style={styles.txt}>Identity Name : Government ID</Text>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  Image: {
    flex: 1,
  },
  Box1: {
    position: 'relative',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    height: 153,
    width: Dimensions.get('window').width - 40,
  },
  Box2: {
    position: 'relative',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginTop: 20,
    justifyContent: 'center',
    padding: 20,
    borderRadius: 30,
    width: Dimensions.get('window').width - 40,
  },
  img1: {
    position: 'absolute',
    bottom: 100,
    height: 100,
    width: 100,
  },
  txt: {
    color: Colors.White,
    fontSize: 14,
    marginTop: 10,
  },
});

export default Profile;
