import React, {useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Image,
  StyleSheet,
  Text,
  ImageBackground,
  Dimensions,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getToken, getUser, setUser} from '../Redux/slices/userSlice';
import {apicaller} from '../Components/ApiCaller/Api';
import Topbar_edit from '../Components/Header/Topbar_edit';
import {Colors} from '../Theme/Color';
import {useIsFocused} from '@react-navigation/native';

const Profile = ({navigation}) => {
  const Token = useSelector(getToken);
  const user = useSelector(getUser);
  const dispatch = useDispatch();
  console.log('user', user);
  useEffect(() => {
    getAllProfileDatasOfAuser();
  }, [useIsFocused]);

  const getAllProfileDatasOfAuser = async () => {
    await apicaller(`user/get/${user._id}`, null, 'GET', Token, null)
      .then(res => {
        console.log(res?.data?.result);
        dispatch(setUser(res?.data?.result));
      })
      .catch(err => {
        console.log('err in Get user profile is ', err);
      });
  };
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
          <View style={styles.img1}>
            <Text
              style={{
                color: Colors.White,
                fontFamily: 'Poppins-Bold',
                fontSize: 50,
                marginTop: 13,
              }}>
              {user.firstName[0]}
              {user.lastName[0]}
            </Text>
          </View>

          <Text
            style={{
              color: Colors.Blue,
              fontFamily: 'Poppins-Bold',
              fontSize: 20,
              marginTop: 30,
            }}>
            {user.firstName} {user.lastName}
          </Text>
          <Text style={styles.txt}>
            {user?.designation} at {user.companyName}
          </Text>
        </View>

        <View style={[styles.Box2]}>
          <Text style={styles.txt}>Email ID : {user.email}</Text>

          <Text style={styles.txt}>Phone Number : {user.mobileNumber}</Text>

          <Text style={styles.txt}>DOB : {user.dob.slice(0, 10)}</Text>

          <Text style={styles.txt}>
            Company Registration Number : {user.panCard}
          </Text>
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
    bottom: 110,
    height: 100,
    width: 100,
    backgroundColor: Colors.Blue,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txt: {
    color: Colors.White,
    fontSize: 14,
    marginTop: 10,
    fontFamily: 'Poppins-Medium',
  },
});

export default Profile;
