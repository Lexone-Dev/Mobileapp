import React, {useCallback, useContext, useState, useEffect} from 'react';
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
  BackHandler,
} from 'react-native';
import SmallBtn from '../Components/Button/SmallBtn';
import {Colors} from '../Theme/Color';
import {request, PERMISSIONS} from 'react-native-permissions';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';
import {apicaller} from '../Components/ApiCaller/Api';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import NativeUploady, {
  UploadyContext,
  useItemFinishListener,
  useItemStartListener,
  useItemErrorListener,
} from '@rpldy/native-uploady';
import {useDispatch, useSelector} from 'react-redux';
import {getToken, getUser, setUser} from '../Redux/slices/userSlice';
import Backbtn from '../Components/Button/Backbtn';
import Loader from '../Components/Header/Loader';
const Profile_edit = ({navigation}) => {
  const user = useSelector(getUser);
  const [proimg, setProimg] = useState();
  const [modalshow, setModalshow] = useState(false);
  const [firstName, setFirstname] = React.useState(user?.firstName);
  const [lastName, setLastname] = React.useState(user?.lastName);
  const [dob, setDob] = React.useState(user?.dob?.slice(0, 10));
  const [designation, setDesiganation] = React.useState(user?.designation);
  const [panCard, setPancard] = React.useState(user?.panCard);
  const [companyName, setCompanyname] = React.useState(user?.companyName);
  const [loader, setLoader] = React.useState(false);
  const Token = useSelector(getToken);
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
    isDatePickerVisible1;
  };

  const updateUser = async () => {
    setLoader(true);
    const data = {
      firstName: firstName,
      lastName: lastName,
      companyName: companyName,
      dob: dob,
      panCard: panCard,
      designation: designation,
    };

    await apicaller(
      `user/update/${user._id}`,
      data,
      'put',
      Token,
      'application/json',
    )
      .then(res => {
        if (res.status === 201 || res.status === 200) {
          console.log('updated datas of user is ', res.data);
          getAllProfileDatasOfAuser();
        }
      })
      .catch(error => {
        console.log('error while profile updation is ', error);
        setLoader(false);
      });
  };

  const dispatch = useDispatch();

  const getAllProfileDatasOfAuser = async () => {
    setLoader(true);
    await apicaller(`user/get/${user._id}`, null, 'GET', Token, null)
      .then(res => {
        console.log(res?.data?.result);
        dispatch(setUser(res?.data?.result));
        navigation.navigate('Profile');
        setLoader(false);
      })
      .catch(err => {
        setLoader(false);
        console.log('err in Get user profile is ', err);
      });
  };
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
          <Backbtn />
        </View>
        {/* <NativeUploady destination={{url: 'https://my-server.test.com/upload'}}>
          <Upload />
        </NativeUploady> */}
        <ScrollView
          style={{paddingVertical: 50}}
          showsVerticalScrollIndicator={false}>
          {/* <View style={styles.name_view}>
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
          </View> */}

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
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
          <View style={styles.inputview}>
            <Text style={styles.title}>DOB</Text>
            <TouchableOpacity
              onPress={showDatePicker}
              style={styles.Subinputview}>
              <TextInput
                style={styles.placeholder}
                placeholder="Enter DOB"
                placeholderTextColor={Colors.Grey}
                onChangeText={setDob}
                value={dob}
                editable={false}
              />
            </TouchableOpacity>
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
            <TouchableOpacity onPress={() => updateUser()}>
              <SmallBtn title="Save" />
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
    marginTop: 30,
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
    marginBottom: 100,
  },
});

export default Profile_edit;
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
