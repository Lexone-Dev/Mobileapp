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
import {ScrollView} from 'react-native-gesture-handler';
import SmallBtn from '../Components/Button/SmallBtn';
import Header from '../Components/Header/Header';
import {Colors} from '../Theme/Color';

const Signup = ({navigation}) => {
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();
  const [confirmpassword, setConfirmPassword] = React.useState();
  const [eye, setEye] = React.useState(true);
  const [eye1, setEye1] = React.useState(true);
  //Error message
  const [error, setError] = React.useState('');
  const emailRegex =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;
  function usersignin() {
    if (email) {
      if (emailRegex.test(email)) {
        if (password) {
          if (confirmpassword) {
            if (password == confirmpassword) {
              navigation.navigate('Information', {email, password});
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
        setError('emailcheck');
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
        <ScrollView>
          <Header
            Headertitle="Sign up"
            Smalltitle="Please Sign up to Continue. "
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
                value={email}
              />
            </View>
            {error == 'email' && (
              <Text style={{color: Colors.Red, alignSelf: 'flex-end'}}>
                ** Must enter Email ID
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
                secureTextEntry={eye1}
              />
              <TouchableOpacity onPress={() => setEye1(!eye1)}>
                <Image
                  source={require('../Assets/Image/Eye.png')}
                  height={20}
                  width={20}
                  style={{marginLeft: -20}}
                />
              </TouchableOpacity>
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
                secureTextEntry={eye}
              />
              <TouchableOpacity onPress={() => setEye(!eye)}>
                <Image
                  source={require('../Assets/Image/Eye.png')}
                  height={20}
                  width={20}
                  style={{marginLeft: -20}}
                />
              </TouchableOpacity>
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
              <SmallBtn title="Continue" />
            </TouchableOpacity>
          </View>
        </ScrollView>
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

export default Signup;
