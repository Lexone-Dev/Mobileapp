import React, {useState} from 'react';
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
  BackHandler,
} from 'react-native';
import {apicaller} from '../Components/ApiCaller/Api';
import SmallBtn from '../Components/Button/SmallBtn';
import Header from '../Components/Header/Header';
import {Colors} from '../Theme/Color';
import axios from 'axios';
import Loader from '../Components/Header/Loader';
const Forgot = ({navigation}) => {
  const [email, setEmail] = useState('');
  var data = JSON.stringify({
    email: email,
  });
  const [loader, setLoader] = React.useState(false);
  function reset() {
    setLoader(true);
    apicaller('/user/forgot', data, 'post', null)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        navigation.navigate('Confirmpsw', {email});
        setLoader(false);
        alert('OTP send to your email id');
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, []);
  const backAction = () => {
    navigation.goBack();
    return true;
  };

  return (
    <ImageBackground
      style={styles.Image}
      source={require('../Assets/Image/BackgroundImage.png')}
      resizeMode="cover">
      {loader && <Loader />}
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
              onChangeText={setEmail}
            />
          </View>
        </View>

        <View style={styles.btnview}>
          <TouchableOpacity
            disabled={email ? false : true}
            onPress={() => reset()}>
            <SmallBtn disable={email ? false : true} title="Send OTP" />
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
