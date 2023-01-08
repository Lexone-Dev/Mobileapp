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
} from 'react-native';
import SmallBtn from '../Components/Button/SmallBtn';
import Header from '../Components/Header/Header';
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
const Information = ({navigation, route}) => {
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
  const dispatch = useDispatch();
  const selectCamera = async () => {
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
    apicaller(`/user/create`, data, 'post', null)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        dispatch(setUser(response.data.result));
        navigation.navigate('Home');
      })
      .catch(function (error) {
        console.log(error.response.data);
      });
  }

  return (
    <ImageBackground
      style={styles.Image}
      source={require('../Assets/Image/BackgroundImage.png')}
      resizeMode="cover">
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Header
            Headertitle="Personal Information"
            Smalltitle="Please Sign up to Continue."
          />
        </View>
        {/* <NativeUploady destination={{url: 'https://my-server.test.com/upload'}}>
          <Upload />
        </NativeUploady> */}
        <ScrollView>
          <View style={styles.name_view}>
            <View
              style={{
                borderRadius: 100,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {proimg ? (
                <Image
                  source={{
                    uri: proimg,
                  }}
                  style={{height: 80, width: 80, borderRadius: 100}}
                />
              ) : (
                <Image
                  style={{height: 80, width: 80}}
                  source={require('../Assets/Image/img.png')}
                />
              )}
              <TouchableOpacity
                style={{
                  position: 'relative',
                  bottom: 20,
                  right: -30,
                  backgroundColor: 'white',
                  padding: 3,
                  borderRadius: 50,
                }}
                onPress={() => {
                  setModalshow(!modalshow);
                }}>
                <Image
                  style={{height: 20, width: 20}}
                  source={require('../Assets/Image/camera.png')}
                />
              </TouchableOpacity>
            </View>
          </View>
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
          </View>
          <View style={styles.inputview}>
            <Text style={styles.title}>Mobile Number</Text>
            <View style={styles.Subinputview}>
              <TextInput
                style={styles.placeholder}
                placeholder="Enter Mobile Number"
                placeholderTextColor={Colors.Grey}
                onChangeText={setMobilenumber}
                value={mobileNumber}
              />
            </View>
          </View>
          <View style={styles.inputview}>
            <Text style={styles.title}>DOB</Text>
            <View style={styles.Subinputview}>
              <TextInput
                style={styles.placeholder}
                placeholder="Enter DOB"
                placeholderTextColor={Colors.Grey}
                onChangeText={setDob}
                value={dob}
              />
            </View>
          </View>
          <View style={styles.inputview}>
            <Text style={styles.title}>Gender</Text>
            <View style={styles.Subinputview}>
              <TextInput
                style={styles.placeholder}
                placeholder="Enter Gender"
                placeholderTextColor={Colors.Grey}
                onChangeText={setGender}
                value={gender}
              />
            </View>
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
          </View>
          <View style={styles.inputview}>
            <Text style={styles.title}>Pan Card Number</Text>
            <View style={styles.Subinputview}>
              <TextInput
                style={styles.placeholder}
                placeholder="Enter Pan Card Number"
                placeholderTextColor={Colors.Grey}
                onChangeText={setPancard}
                value={panCard}
              />
            </View>
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
          </View>

          <View style={styles.btnview}>
            <TouchableOpacity onPress={() => signup()}>
              <SmallBtn title="Sign up" />
            </TouchableOpacity>
          </View>
        </ScrollView>
        <View
          style={{
            backgroundColor: 'white',
            position: 'absolute',
            bottom: 0,
          }}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalshow}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
            }}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                height: Dimensions.get('window').height * 1,
                backgroundColor: 'rgba(0, 0, 0, 0.70)',
              }}>
              <View
                style={{
                  backgroundColor: 'white',
                  borderRadius: 20,
                  padding: 30,
                  width: Dimensions.get('window').width * 0.8,
                }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontFamily: 'Lato-Black',
                    color: 'gray',
                    marginBottom: 20,
                  }}>
                  Upload Image
                </Text>
                <View
                  style={{
                    width: '100%',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    style={{
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexDirection: 'row',
                      width: '100%',
                      borderBottomColor: 'gray',
                    }}
                    onPress={() => {
                      setModalshow(!modalshow);
                      selectCamera();
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontFamily: 'Lato-Bold',
                        color: 'gray',
                      }}>
                      Camera
                    </Text>
                    <Image
                      style={{height: 20, width: 20}}
                      source={require('../Assets/Image/camera.png')}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexDirection: 'row',
                      width: '100%',
                      height: 40,
                    }}
                    onPress={() => {
                      setModalshow(!modalshow);
                      selectGallery();
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontFamily: 'Lato-Bold',
                        color: 'gray',
                      }}>
                      Gellary
                    </Text>
                    <Image
                      style={{height: 20, width: 20}}
                      source={require('../Assets/Image/gall.png')}
                    />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    setModalshow(!modalshow);
                  }}
                  style={{marginTop: 20, alignSelf: 'center'}}>
                  <Text>close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
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
    width: '90%',
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
