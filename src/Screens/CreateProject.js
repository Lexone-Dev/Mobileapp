import React, {useCallback, useContext, useState} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ImageBackground,
  TextInput,
  ScrollView,
  Modal,
  Dimensions,
  Image,
  Alert,
  Button,
  BackHandler,
} from 'react-native';
import Backbtn from '../Components/Button/Backbtn';
import SmallBtn from '../Components/Button/SmallBtn';
import {Colors} from '../Theme/Color';
import {request, PERMISSIONS} from 'react-native-permissions';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {getToken, getUser} from '../Redux/slices/userSlice';
import {useSelector} from 'react-redux';
import axios from 'axios';
import {apicaller} from '../Components/ApiCaller/Api';
import DocumentPicker from 'react-native-document-picker';
import NativeUploady, {
  UploadyContext,
  useItemFinishListener,
  useItemStartListener,
  useItemErrorListener,
} from '@rpldy/native-uploady';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {color} from 'react-native-reanimated';
import Loader from '../Components/Header/Loader';
const CreateProject = ({navigation}) => {
  const [modalshow, setModalshow] = useState(false);
  const [proimg, setProimg] = useState();
  const Token = useSelector(getToken);
  const user = useSelector(getUser);
  const [Name, setName] = React.useState();
  const [BidStartDate, setBidStartDate] = React.useState();
  const [BidEndDate, setBidEndDate] = React.useState();
  const [MinimumBidPrice, setMinimumBidPrice] = React.useState();
  const [Auctiondescription, setAuctiondescription] = React.useState();
  const [err, setErr] = React.useState();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isDatePickerVisible1, setDatePickerVisibility1] = useState(false);
  const [loader, setLoader] = React.useState(false);
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleConfirm = date => {
    setBidStartDate(JSON.stringify(date).slice(1, 11));
    console.log('A date has been picked: ', date);
    hideDatePicker();
  };
  const showDatePicker1 = () => {
    setDatePickerVisibility1(true);
  };
  const hideDatePicker1 = () => {
    setDatePickerVisibility1(false);
  };
  const handleConfirm1 = date => {
    setBidEndDate(JSON.stringify(date).slice(1, 11));
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
            var data = new FormData();
            data.append('img', {
              uri: response.assets[0].uri,
              type: response.assets[0].type,
              name: response.assets[0].fileName,
            });
            console.log(data);
            var config = {
              method: 'post',
              url: 'https://lexone-backend.onrender.com/api/v1/upload/image',
              headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: ` Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjYzYTE2MWQzNGY2MjgwOGJlMDYyNTA5NSIsInJvbGUiOiJVU0VSIiwiZW1haWwiOiJzb21uYXRoc2Fob284NjlAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkazVmWEUvU3VmTmtNUU9BSjFKMWp0ZXFpdzdWZ1drWWhBeEk4ZnNXSUl1MkdVNXRGbDdwMS4iLCJmaXJzdE5hbWUiOiJPbW5hdGgiLCJsYXN0TmFtZSI6IlNhaG9vIiwibW9iaWxlTnVtYmVyIjoiOTk0ODAwMTM1IiwiZG9iIjoiMTk5OS0xMi0xMFQwMDowMDowMC4wMDBaIiwicGFuQ2FyZCI6IlFXRVJUWTEyMzQiLCJkZXNpZ25hdGlvbiI6IkYuREVWIiwiY3JlYXRlZEF0IjoiMjAyMi0xMi0yMFQwNzoxODo0My4yNTZaIiwidXBkYXRlZEF0IjoiMjAyMy0wMS0wOVQwNzo0NjoxMC42MDlaIiwiX192IjowLCJjb21wYW55TmFtZSI6IkNTIn0sImlhdCI6MTY3MzQ2NDQzMCwiZXhwIjoxNjc2MDU2NDMwfQ.0IvdhmbytYZpRbjQEU5Mu82ggVYmKOqaxvlqgR5npq8`,
              },
              data: data,
            };

            axios(config)
              .then(function (response) {
                console.log(JSON.stringify(response.data));
              })
              .catch(function (error) {
                console.log(error);
              });
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
        var data = new FormData();
        data.append('img', {
          uri: response.assets[0].uri,
          type: response.assets[0].type,
          name: response.assets[0].fileName,
        });
        console.log(data);
        var config = {
          method: 'post',
          url: 'https://lexone-backend.onrender.com/api/v1/upload/image',
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: ` Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjYzYTE2MWQzNGY2MjgwOGJlMDYyNTA5NSIsInJvbGUiOiJVU0VSIiwiZW1haWwiOiJzb21uYXRoc2Fob284NjlAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkazVmWEUvU3VmTmtNUU9BSjFKMWp0ZXFpdzdWZ1drWWhBeEk4ZnNXSUl1MkdVNXRGbDdwMS4iLCJmaXJzdE5hbWUiOiJPbW5hdGgiLCJsYXN0TmFtZSI6IlNhaG9vIiwibW9iaWxlTnVtYmVyIjoiOTk0ODAwMTM1IiwiZG9iIjoiMTk5OS0xMi0xMFQwMDowMDowMC4wMDBaIiwicGFuQ2FyZCI6IlFXRVJUWTEyMzQiLCJkZXNpZ25hdGlvbiI6IkYuREVWIiwiY3JlYXRlZEF0IjoiMjAyMi0xMi0yMFQwNzoxODo0My4yNTZaIiwidXBkYXRlZEF0IjoiMjAyMy0wMS0wOVQwNzo0NjoxMC42MDlaIiwiX192IjowLCJjb21wYW55TmFtZSI6IkNTIn0sImlhdCI6MTY3MzQ2NDQzMCwiZXhwIjoxNjc2MDU2NDMwfQ.0IvdhmbytYZpRbjQEU5Mu82ggVYmKOqaxvlqgR5npq8`,
            'Content-Type': 'multipart/form-data',
          },
          data: data,
        };

        axios(config)
          .then(function (response) {
            console.log(JSON.stringify(response.data));
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    });
  };
  const submitData = async e => {
    // e.preventDefault();
    setLoader(true);
    const data = {
      name: Name,
      startDate: BidStartDate,
      endDate: BidEndDate,
      category: '',
      image: proimg,
      price: MinimumBidPrice,
      sheet: '',
      descriptions: Auctiondescription,
      createdBy: user._id,
    };

    await apicaller('/project/create', data, 'POST', Token, 'application/json')
      .then(res => {
        if (res.status === 201 || res.status === 200) {
          navigation.navigate('Home');
          console.log('open auction datas ', JSON.stringify(res.data));
          setName('');
          setCategory('');
          setBiddingCover('');
          setMinimumBidPrice('');
          setBidStartDate('');
          setBidEndDate('');
          setBidSheetFile('');
          setAuctiondescription('');
          setLoader(false);
        }
      })
      .catch(err => {
        console.log('error while open auction is ', err);
        setLoader(false);
      });
  };
  function validation() {
    if (Name) {
      if (proimg) {
        if (BidStartDate) {
          if (BidEndDate) {
            if (MinimumBidPrice) {
              if (Auctiondescription) {
                submitData();
              } else setErr('Auctiondescription');
            } else setErr('MinimumBidPrice');
          } else setErr('BidEndDate');
        } else setErr('BidStartDate');
      } else setErr('proimg');
    } else setErr('Name');
  }
  function pop(fname) {
    console.log(fname);
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
        <View style={styles.backbutton}>
          <Backbtn />
        </View>
        <ScrollView>
          <View style={styles.inputview}>
            <Text style={styles.title}>Project Name</Text>
            <View style={styles.Subinputview}>
              <TextInput
                style={styles.placeholder}
                placeholderTextColor={Colors.Grey}
                onChangeText={setName}
                value={Name}
              />
            </View>
            {err == 'Name' && (
              <Text style={{color: 'red', alignSelf: 'flex-end'}}>
                ** Required
              </Text>
            )}
          </View>

          <TouchableOpacity
            style={styles.inputview}
            onPress={() => setModalshow(!modalshow)}>
            <Text style={styles.title}>Upload Image</Text>
            <View
              style={[
                styles.Subinputview,
                {height: 150, justifyContent: 'center', alignItems: 'center'},
              ]}>
              <Image
                source={{uri: proimg}}
                style={{
                  height: Dimensions.get('window').height / 7,
                  width: Dimensions.get('window').width / 1.3,
                  borderRadius: 10,
                }}
              />
            </View>
            {err == 'proimg' && (
              <Text style={{color: 'red', alignSelf: 'flex-end'}}>
                ** Required
              </Text>
            )}
          </TouchableOpacity>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 30,
            }}>
            <TouchableOpacity
              style={[{width: Dimensions.get('window').width / 2.5}]}>
              <Text style={styles.title}>Auction Start Date</Text>
              <TouchableOpacity
                onPress={showDatePicker}
                style={[
                  {width: Dimensions.get('window').width / 2.5},
                  styles.Subinputview,
                ]}>
                <DateTimePickerModal
                  isVisible={isDatePickerVisible}
                  mode="date"
                  onConfirm={handleConfirm}
                  onCancel={hideDatePicker}
                />
                <TextInput
                  style={styles.placeholder}
                  placeholderTextColor={Colors.Grey}
                  onChangeText={setBidStartDate}
                  value={BidStartDate}
                />
              </TouchableOpacity>
              {err == 'BidStartDate' && (
                <Text style={{color: 'red', alignSelf: 'flex-end'}}>
                  ** Required
                </Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={[{width: Dimensions.get('window').width / 2.5}]}>
              <Text style={styles.title}>Auction End Date</Text>
              <TouchableOpacity
                onPress={showDatePicker1}
                style={[
                  {width: Dimensions.get('window').width / 2.5},
                  styles.Subinputview,
                ]}>
                <DateTimePickerModal
                  isVisible={isDatePickerVisible1}
                  mode="date"
                  onConfirm={handleConfirm1}
                  onCancel={hideDatePicker1}
                />
                <TextInput
                  style={styles.placeholder}
                  placeholderTextColor={Colors.Grey}
                  onChangeText={setBidEndDate}
                  value={BidEndDate}
                />
              </TouchableOpacity>
              {err == 'BidEndDate' && (
                <Text style={{color: 'red', alignSelf: 'flex-end'}}>
                  ** Required
                </Text>
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.inputview}>
            <Text style={styles.title}>Max. Project Price</Text>
            <View style={styles.Subinputview}>
              <TextInput
                style={styles.placeholder}
                placeholderTextColor={Colors.Grey}
                onChangeText={setMinimumBidPrice}
                value={MinimumBidPrice}
              />
            </View>
            {err == 'MinimumBidPrice' && (
              <Text style={{color: 'red', alignSelf: 'flex-end'}}>
                ** Required
              </Text>
            )}
          </View>
          <View style={styles.inputview}>
            <Text style={styles.title}>Description</Text>
            <View style={[styles.Subinputview, {height: 200}]}>
              <TextInput
                style={styles.placeholder}
                placeholderTextColor={Colors.Grey}
                setAuctiondescription
                onChangeText={setAuctiondescription}
                value={Auctiondescription}
                multiline={true}
              />
            </View>
            {err == 'Auctiondescription' && (
              <Text style={{color: 'red', alignSelf: 'flex-end'}}>
                ** Required
              </Text>
            )}
          </View>

          <View style={styles.inputview}>
            <Text style={styles.title}>Upload Brounchers</Text>
            <NativeUploady
              destination={{url: 'https://my-server.test.com/upload'}}>
              <Upload pop />
            </NativeUploady>
            {/* <View style={[styles.Subinputview, {marginTop: 20, height: 200}]}>
              <TextInput
                style={styles.placeholder}
                placeholderTextColor={Colors.Grey}
              />
            </View> */}
          </View>

          <View style={styles.btnview}>
            <TouchableOpacity onPress={() => validation()}>
              <SmallBtn title="Create Project" />
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
  Image: {
    justifyContent: 'center',
    flex: 1,
  },
  backbutton: {
    marginTop: 40,
    marginBottom: 60,
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
    marginVertical: 50,
  },
  forgotpswView: {
    alignItems: 'flex-end',
    marginTop: -10,
  },
  ForgotpswTxt: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    color: Colors.Blue,
  },
});

export default CreateProject;
const Upload = ({pop} = props => {
  console.log(props);
  const [uploadUrl, setUploadUrl] = useState(false);
  const uploadyContext = useContext(UploadyContext);
  const userToken = useSelector(getToken);
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
      uploadBiddingSheetFile(res[0]);
      console.log('uploadUrl', res[0]);

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
  console.log('uploadUrl1', uploadUrl);
  // upload bidding sheet file
  const uploadBiddingSheetFile = async bidSheetFile => {
    console.log('selected bid sheet', bidSheetFile);

    if (bidSheetFile.length === 0) {
      return false;
    } else {
      var data = new FormData();
      data.append('document', bidSheetFile);

      if (userToken) {
        await apicaller(
          'upload/document',
          data,
          'POST',
          userToken,
          'multipart/form-data',
        )
          .then(res => {
            if (res.status === 201 || res.status === 200) {
              const file_path = res?.data?.url;

              setBidSheetImgPath(file_path);
            }
          })
          .catch(err => {
            console.log('error while bidsheet upload is ', err);
          });
      }
      return true;
    }
  };
  return (
    <View>
      <Button title="Choose File" onPress={pickFile} />
      {uploadUrl && (
        // <Image source={{uri: uploadUrl}} style={styles.uploadedImage} />
        <Text style={{color: 'red'}}>{uploadUrl}</Text>
      )}
    </View>
  );
});
