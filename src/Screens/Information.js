import React, {useCallback, useContext, useState} from 'react';
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
  Modal,
  Alert,
  Button,
  ToastAndroid,
  BackHandler,
} from 'react-native';
import SmallBtn from '../Components/Button/SmallBtn';
import Header from '../Components/Header/Header';
import {CountryPicker} from 'react-native-country-codes-picker';
import {CountryCode, Country} from './src/types';
import {Colors} from '../Theme/Color';
import {request, PERMISSIONS} from 'react-native-permissions';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';
import {apicaller} from '../Components/ApiCaller/Api';
import NativeUploady, {
  UploadyContext,
  useItemFinishListener,
  useItemStartListener,
  useItemErrorListener,
} from '@rpldy/native-uploady';
import {useDispatch} from 'react-redux';
import {setUser} from '../Redux/slices/userSlice';
import Loader from '../Components/Header/Loader';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
const Information = ({navigation, route}) => {
  const [countryCode, setCountryCode] = React.useState('+1');
  const [countryflag, setCountryflag] = React.useState('🇨🇦');
  const [show, setShow] = React.useState(false);
  console.log(route.params);
  const [proimg, setProimg] = useState();
  const [modalshow, setModalshow] = useState(false);
  const [firstName, setFirstname] = React.useState();
  const [lastName, setLastname] = React.useState();
  const [mobileNumber, setMobilenumber] = React.useState();
  const [dob, setDob] = React.useState();
  const [gender, setGender] = React.useState();
  const [designation, setDesiganation] = React.useState();
  const [panCard, setPancard] = React.useState();
  const [companyName, setCompanyname] = React.useState();
  const [loader, setLoader] = React.useState(false);
  const [err, setErr] = React.useState();
  const dispatch = useDispatch();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  var regName = /^[a-zA-Z]+$/;
  var regex = /([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}$/;
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleConfirm = date => {
    setDob(JSON.stringify(date).slice(1, 11));
    console.log('A date has been picked: ', date);
    hideDatePicker();
  };
  const selectCamera = async () => {
    function showToast() {
      ToastAndroid.show('Request sent successfully!', ToastAndroid.SHORT);
    }
    let options = {
      mediaType: 'photo',
      includeBase64: false,
      multiple: true,
      maxHeight: 500,
      maxWidth: 500,
      quality: 1,
    };
    request(
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.CAMERA
        : PERMISSIONS.ANDROID.CAMERA,
    ).then(result => {
      if (result == 'granted') {
        launchCamera(options, response => {
          if (response.didCancel) {
            Alert.alert('You did not select any image');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
          } else {
            setProimg(response.assets[0].uri);
            console.log(response.assets[0].uri);
          }
        });
      } else {
        Alert.alert('Go to settings > Lexone > Allow camera permission');
      }
    });
  };
  const selectGallery = () => {
    let options = {
      mediaType: 'photo',
      includeBase64: false,
      multiple: true,
      maxHeight: 500,
      maxWidth: 500,
      quality: 1,
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled photo picker');
        Alert.alert('You did not select any image');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
      } else {
        console.log(response.assets[0]);
        setProimg(response.assets[0].uri);
      }
    });
  };

  var data = JSON.stringify({
    firstName: firstName,
    lastName: lastName,
    email: route.params.email,
    password: route.params.password,
    mobileNumber: mobileNumber,
    gender: gender,
    dob: dob,
    designation: designation,
    panCard: panCard,
    companyName: companyName,
  });
  function signup() {
    setLoader(true);
    apicaller(`/user/create`, data, 'post', null)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        dispatch(setUser(response.data.result));
        navigation.navigate('Home');
        setLoader(false);
      })
      .catch(function (error) {
        console.log(error.response.data);
        Alert.alert(error.response.data.message);
        setLoader(false);
      });
  }
  function validation() {
    if (regName.test(firstName)) {
      if (regName.test(lastName)) {
        if (mobileNumber && mobileNumber.length == 10) {
          if (dob) {
            if (panCard) {
              if (companyName) {
                if (designation) {
                  signup();
                } else setErr('designation');
              } else setErr('companyName');
            } else setErr('panCard');
          } else setErr('dob');
        } else setErr('mobileNumber');
      } else setErr('lastName');
    } else setErr('firstName');
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
        <View style={styles.header}>
          <Header
            Headertitle="Personal Information"
            Smalltitle="Please Sign up to Continue."
          />
        </View>

        <ScrollView>
          <View style={styles.inputview}>
            <Text style={styles.title}>First Name</Text>
            <View style={styles.Subinputview}>
              <TextInput
                style={styles.placeholder}
                placeholder="Enter First Name"
                placeholderTextColor={Colors.Grey}
                onChangeText={setFirstname}
                value={firstName}
              />
            </View>
            {err == 'firstName' && (
              <Text style={{color: 'red', alignSelf: 'flex-end'}}>
                ** Invalid
              </Text>
            )}
          </View>
          <View style={styles.inputview}>
            <Text style={styles.title}>Last Name</Text>
            <View style={styles.Subinputview}>
              <TextInput
                style={styles.placeholder}
                placeholder="Enter Last Name"
                placeholderTextColor={Colors.Grey}
                onChangeText={setLastname}
                value={lastName}
              />
            </View>
            {err == 'lastName' && (
              <Text style={{color: 'red', alignSelf: 'flex-end'}}>
                ** Invalid
              </Text>
            )}
          </View>

          <View style={styles.inputview}>
            <Text style={styles.title}>Mobile Number</Text>
            <View style={styles.Subinputview}>
              <TouchableOpacity
                onPress={() => setShow(true)}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  height: 55,
                  width: '35%',
                }}>
                <CountryPicker
                  show={show}
                  initialState={'+1'}
                  // when picker button press you will get the country object with dial code
                  pickerButtonOnPress={item => {
                    console.log(item);
                    setCountryCode(item.dial_code);
                    setCountryflag(item.flag);
                    setShow(false);
                  }}
                />
                <Text
                  style={{
                    color: Colors.Blue,
                    fontFamily: 'Poppins-Bold',
                    fontSize: 18,
                  }}>
                  <Text style={{letterSpacing: 30}}>{countryflag}</Text>
                  <Text>{countryCode}</Text>
                </Text>
              </TouchableOpacity>
              <Text style={{color: Colors.Grey, fontSize: 20, marginTop: -8}}>
                |
              </Text>
              <TextInput
                style={styles.placeholder}
                placeholder=" Enter Mobile Number"
                placeholderTextColor={Colors.Grey}
                onChangeText={setMobilenumber}
                value={mobileNumber}
                maxLength={10}
              />
            </View>
            {err == 'mobileNumber' && (
              <Text style={{color: 'red', alignSelf: 'flex-end'}}>
                ** Invalid mobile number
              </Text>
            )}
          </View>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
          <TouchableOpacity onPress={showDatePicker} style={styles.inputview}>
            <Text style={styles.title}>DOB</Text>
            <View style={styles.Subinputview}>
              <TextInput
                style={[styles.placeholder, {width: '28%'}]}
                placeholder="Enter DOB"
                placeholderTextColor={Colors.Grey}
                onChangeText={setDob}
                editable={false}
                value={dob}
              />
            </View>
            {err == 'dob' && (
              <Text style={{color: 'red', alignSelf: 'flex-end'}}>
                ** Required
              </Text>
            )}
          </TouchableOpacity>
          <View style={styles.inputview}>
            <Text style={styles.title}>Company Registration Number</Text>
            <View style={styles.Subinputview}>
              <TextInput
                style={styles.placeholder}
                placeholder="Enter Company Registration Number"
                placeholderTextColor={Colors.Grey}
                onChangeText={setPancard}
                value={panCard}
              />
            </View>
            {err == 'panCard' && (
              <Text style={{color: 'red', alignSelf: 'flex-end'}}>
                ** Required
              </Text>
            )}
          </View>

          <View style={styles.inputview}>
            <Text style={styles.title}>Company Name</Text>
            <View style={styles.Subinputview}>
              <TextInput
                style={styles.placeholder}
                placeholder="Enter Company Name"
                placeholderTextColor={Colors.Grey}
                onChangeText={setCompanyname}
                value={companyName}
              />
            </View>
            {err == 'companyName' && (
              <Text style={{color: 'red', alignSelf: 'flex-end'}}>
                ** Required
              </Text>
            )}
          </View>

          <View style={styles.inputview}>
            <Text style={styles.title}>Desiganation</Text>
            <View style={styles.Subinputview}>
              <TextInput
                style={styles.placeholder}
                placeholder="Enter Desiganation"
                placeholderTextColor={Colors.Grey}
                onChangeText={setDesiganation}
                value={designation}
              />
            </View>
            {err == 'designation' && (
              <Text style={{color: 'red', alignSelf: 'flex-end'}}>
                ** Required
              </Text>
            )}
          </View>

          <View style={styles.btnview}>
            <TouchableOpacity onPress={() => validation()}>
              <SmallBtn title="Sign up" />
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
  header: {
    marginTop: -60,
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
    width: '100%',
  },
  btnview: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 40,
  },
});

export default Information;
const Upload = () => {
  const [uploadUrl, setUploadUrl] = useState(false);
  const uploadyContext = useContext(UploadyContext);

  useItemFinishListener(item => {
    const response = JSON.parse(item.uploadResponse.data);
    console.log(`item ${item.id} finished uploading, response was: `, response);
    setUploadUrl(response.url);
  });

  useItemErrorListener(item => {
    console.log(`item ${item.id} upload error !!!! `, item);
  });

  useItemStartListener(item => {
    console.log(`item ${item.id} starting to upload,name = ${item.file.name}`);
  });

  const pickFile = useCallback(async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
      });
      console.log('uploadUrl', res);
      uploadyContext.upload(res);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log(
          'User cancelled the picker, exit any dialogs or menus and move on',
        );
      } else {
        throw err;
      }
    }
  }, [uploadyContext]);
  console.log('uploadUrl', uploadUrl);
  return (
    <View>
      <Button title="Choose File" onPress={pickFile} />
      {uploadUrl && (
        // <Image source={{uri: uploadUrl}} style={styles.uploadedImage} />
        <Text>{uploadUrl}</Text>
      )}
    </View>
  );
};
