import React, {useEffect} from 'react';
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
  Alert,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {apicaller} from '../Components/ApiCaller/Api';
import SmallBtn from '../Components/Button/SmallBtn';
import Header from '../Components/Header/Header';
import {getToken, setToken, setUser} from '../Redux/slices/userSlice';
import {Colors} from '../Theme/Color';
import jwt_decode from 'jwt-decode';
import {useIsFocused} from '@react-navigation/native';
import Loader from '../Components/Header/Loader';
const Login = ({navigation}) => {
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();
  const [error, setError] = React.useState('');
  const [loader, setLoader] = React.useState(false);
  const emailRegex =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;
  const dispatch = useDispatch();
  var data = JSON.stringify({
    email: email,
    password: password,
  });
  const token = useSelector(getToken);

  useEffect(() => {
    if (token) {
      navigation.navigate('Home');
    }
  }, [useIsFocused, token]);
  function userlogin() {
    setLoader(true);
    apicaller(`/user/login`, data, 'post', null)
      .then(function (response) {
        console.log(JSON.stringify(response));
        dispatch(setToken(response.data.result.token));
        var decoded = jwt_decode(response.data.result.token);
        dispatch(setUser(decoded.data));
        console.log('my token is ', decoded.data);
        setLoader(false);
        navigation.navigate('Home');
      })
      .catch(function (error) {
        setLoader(false);
        console.log(error.response.data.response.message);
        Alert.alert(error.response.data.response.message);
      });
  }
  return (
    <ImageBackground
      style={styles.Image}
      source={require('../Assets/Image/BackgroundImage.png')}
      resizeMode="cover">
      {loader && <Loader />}
      <SafeAreaView style={styles.container}>
        <Header Headertitle="Login" Smalltitle="Please Sign in to Continue." />

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
              value={email}
            />
          </View>
          {error == 'email' && (
            <Text style={{color: Colors.Red, alignSelf: 'flex-end'}}>
              ** Must enter Email ID
            </Text>
          )}
          {error == 'invemail' && (
            <Text style={{color: Colors.Red, alignSelf: 'flex-end'}}>
              ** Invalid Email ID
            </Text>
          )}
        </View>
        <View style={[styles.inputview, {marginBottom: 10}]}>
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
        </View>
        {error == 'pass' && (
          <Text style={{color: Colors.Red, alignSelf: 'flex-end'}}>
            ** Must enter password
          </Text>
        )}
        <View style={styles.forgotpswView}>
          <TouchableOpacity onPress={() => navigation.navigate('Forgot')}>
            <Text style={styles.ForgotpswTxt}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.btnview}>
          <TouchableOpacity
            onPress={() => {
              if (email) {
                if (emailRegex.test(email)) {
                  if (password) {
                    userlogin();
                  } else setError('pass');
                } else setError('invemail');
              } else setError('email');
            }}>
            <SmallBtn title="Login" />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontFamily: 'Poppins-Regular',
              fontSize: 13,
              color: Colors.White,
            }}>
            Don't have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.Signuptxt}>Signup</Text>
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
    marginTop: 50,
    marginBottom: 20,
  },
  forgotpswView: {
    alignItems: 'flex-end',
  },
  ForgotpswTxt: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    color: Colors.Blue,
  },
  Signuptxt: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: Colors.Blue,
    marginHorizontal: 10,
  },
});

export default Login;
