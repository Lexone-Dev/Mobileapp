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
  BackHandler,
} from 'react-native';
import {apicaller} from '../Components/ApiCaller/Api';
import SmallBtn from '../Components/Button/SmallBtn';
import Header from '../Components/Header/Header';
import {Colors} from '../Theme/Color';

const Confirmpsw = ({navigation, route}) => {
  console.log('route', route.params.email);
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();
  const [confirmpassword, setConfirmPassword] = React.useState();
  const [Otp, setOtp] = React.useState();
  //Error message
  const [error, setError] = React.useState('');
  const emailRegex =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;
  var data = JSON.stringify({
    token: Otp,
    email: route.params.email,
    password: password,
  });
  function usersignin() {
    if (Otp) {
      if (password) {
        if (confirmpassword) {
          if (password == confirmpassword) {
            apicaller(`user/reset-password`, data, 'put', null)
              .then(function (response) {
                console.log(JSON.stringify(response));

                navigation.navigate('Login');
              })
              .catch(function (error) {
                console.log(error);
              });
          } else {
            setError('passswordcheck');
          }
        } else {
          setError('confirmpasssword');
        }
      } else {
        setError('password');
      }
    } else {
      setError('email');
    }
  }
  console.log('err = ', error);

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
      <SafeAreaView style={styles.container}>
        <Header Headertitle="Reset Password" />
        <View style={styles.inputview}>
          <Text style={styles.title}>OTP</Text>
          <View style={styles.Subinputview}>
            <Image
              source={require('../Assets/Image/Password.png')}
              height={20}
              width={20}
            />
            <TextInput
              style={styles.placeholder}
              placeholder="Enter OTP"
              placeholderTextColor={Colors.Grey}
              onChangeText={setOtp}
              value={Otp}
              keyboardType={'number-pad'}
            />
          </View>
          {error == 'email' && (
            <Text style={{color: Colors.Red, alignSelf: 'flex-end'}}>
              ** Must enter OTP
            </Text>
          )}
          {error == 'emailcheck' && (
            <Text style={{color: Colors.Red, alignSelf: 'flex-end'}}>
              ** Invalid Email ID
            </Text>
          )}
        </View>

        <View style={styles.inputview}>
          <Text style={styles.title}>Password</Text>
          <View style={styles.Subinputview}>
            <Image
              source={require('../Assets/Image/Password.png')}
              height={20}
              width={20}
            />
            <TextInput
              style={styles.placeholder}
              placeholder="Enter Password"
              placeholderTextColor={Colors.Grey}
              onChangeText={setPassword}
              value={password}
              secureTextEntry={true}
            />
          </View>
          {error == 'password' && (
            <Text style={{color: Colors.Red, alignSelf: 'flex-end'}}>
              ** Must enter password
            </Text>
          )}
        </View>
        <View style={styles.inputview}>
          <Text style={styles.title}>Confirm Password</Text>
          <View style={styles.Subinputview}>
            <Image
              source={require('../Assets/Image/Password.png')}
              height={20}
              width={20}
            />
            <TextInput
              style={styles.placeholder}
              placeholder="Enter Confirm Password"
              placeholderTextColor={Colors.Grey}
              onChangeText={setConfirmPassword}
              value={confirmpassword}
              secureTextEntry={true}
            />
          </View>
          {error == 'confirmpasssword' && (
            <Text style={{color: Colors.Red, alignSelf: 'flex-end'}}>
              ** Must enter Confirm Password
            </Text>
          )}
          {error == 'passswordcheck' && (
            <Text style={{color: Colors.Red, alignSelf: 'flex-end'}}>
              ** Password and Confirm password doesn't match
            </Text>
          )}
        </View>
        <View style={styles.btnview}>
          <TouchableOpacity onPress={() => usersignin()}>
            <SmallBtn title="Save" />
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

export default Confirmpsw;
