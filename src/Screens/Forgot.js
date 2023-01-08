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
} from 'react-native';
import SmallBtn from '../Components/Button/SmallBtn';
import Header from '../Components/Header/Header';
import {Colors} from '../Theme/Color';

const Forgot = ({navigation}) => {
  return (
    <ImageBackground
      style={styles.Image}
      source={require('../Assets/Image/BackgroundImage.png')}
      resizeMode="cover">
      <SafeAreaView style={styles.container}>
        <Header
          Headertitle="Forgot Password"
          Smalltitle="Please Forgot password to Continue. "
        />
        <View style={styles.inputview}>
          <Text style={styles.title}>Email Id</Text>
          <View style={styles.Subinputview}>
            <Image
              source={require('../Assets/Image/Email.png')}
              height={20}
              width={20}
            />
            <TextInput
              style={styles.placeholder}
              placeholder="Enter Email Id"
              placeholderTextColor={Colors.Grey}
            />
          </View>
        </View>

        <View style={styles.btnview}>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <SmallBtn title="Confirm" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 30,
  },
  Image: {
    justifyContent: 'center',
    flex: 1,
  },
  inputview: {
    marginBottom: 30,
  },
  title: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: Colors.White,
    marginBottom: 5,
  },
  Subinputview: {
    height: 55,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  placeholder: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    color: Colors.Grey,
    width: '90%',
    marginLeft: 10,
    marginTop: 5,
  },
  btnview: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
});

export default Forgot;
