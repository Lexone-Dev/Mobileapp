import React, {useEffect, useState} from 'react';
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
  PermissionsAndroid,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Bidlist from '../Components/BoxLayout/BidList';
import Backbtn from '../Components/Button/Backbtn';
import CancelBtn from '../Components/Button/CancelBtn';
import MainBtn from '../Components/Button/MainBtn';
import SmallBtn from '../Components/Button/SmallBtn';
import Header from '../Components/Header/Header';
import {Colors} from '../Theme/Color';
import RNFetchBlob from 'rn-fetch-blob';
const Projectdetails = ({navigation, route}) => {
  const data = route.params.props;
  const [more, setMore] = useState(2);
  const [modalshow, setModalshow] = useState(false);
  console.log(data);
  const [countdownDate, setCountdownDate] = useState(
    new Date(`${data.bidLastDate}`).getTime(),
  );
  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    setInterval(() => setNewTime(), 1000);
  }, []);
  const setNewTime = () => {
    if (countdownDate) {
      const currentTime = new Date().getTime();

      const distanceToDate = countdownDate - currentTime;

      let days = Math.floor(distanceToDate / (1000 * 60 * 60 * 24));
      let hours = Math.floor(
        (distanceToDate % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      let minutes = Math.floor(
        (distanceToDate % (1000 * 60 * 60)) / (1000 * 60),
      );
      let seconds = Math.floor((distanceToDate % (1000 * 60)) / 1000);

      const numbersToAddZeroTo = [1, 2, 3, 4, 5, 6, 7, 8, 9];

      days = `${days}`;
      if (numbersToAddZeroTo.includes(hours)) {
        hours = `0${hours}`;
      } else if (numbersToAddZeroTo.includes(minutes)) {
        minutes = `0${minutes}`;
      } else if (numbersToAddZeroTo.includes(seconds)) {
        seconds = `0${seconds}`;
      }

      setTime({days: days, hours: hours, minutes, seconds});
    }
  };
  const downloadFile = async sheet => {
    // Get today's date to add the time suffix in filename\
    console.log('fileUrl', data.sheets);
    let date = new Date();
    // File URL which we want to download
    let FILE_URL = data.sheets;
    // Function to get extention of the file url
    let file_ext = 'pdf';

    file_ext = '.' + file_ext[0];

    // config: To get response by passing the downloading related options
    // fs: Root directory path to download
    const {config, fs} = RNFetchBlob;
    let RootDir = fs.dirs.PictureDir;
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        path:
          RootDir +
          '/file_' +
          Math.floor(date.getTime() + date.getSeconds() / 2) +
          file_ext,
        description: 'downloading file...',
        notification: true,
        // useDownloadManager works with Android only
        useDownloadManager: true,
      },
    };
    config(options)
      .fetch('GET', FILE_URL)
      .then(res => {
        // Alert after successful downloading
        console.log('res -> ', JSON.stringify(res));
        alert('File Downloaded Successfully.');
      });
  };
  const checkPermission = async sheet => {
    console.log(sheet);
    if (Platform.OS === 'ios') {
      downloadFile(sheet);
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message:
              'Application needs access to your storage to download File',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // Start downloading
          downloadFile();
          console.log('Storage Permission Granted.');
        } else {
          // If permission denied then show alert
          Alert.alert('Error', 'Storage Permission Not Granted');
        }
      } catch (err) {
        // To handle permission related exception
        console.log('++++' + err);
      }
    }
  };
  return (
    <ImageBackground
      style={styles.Image}
      source={require('../Assets/Image/BackgroundImage.png')}
      resizeMode="cover">
      <Backbtn />
      <ScrollView>
        <View style={styles.Box1}>
          <Image source={{uri: data.image}} style={styles.img1} />

          <View style={styles.Smallbox}>
            <View
              style={{
                backgroundColor: '#1E1E2D',
                borderRadius: 15,
                justifyContent: 'center',
                alignItems: 'center',
                padding: 10,
                marginTop: 10,
              }}>
              <Text
                style={{
                  fontFamily: 'Poppins-SemiBold',
                  fontSize: 10,
                  color: Colors.Blue,
                }}>
                Auction Ends
              </Text>
              <View style={{flexDirection: 'row'}}>
                <View style={styles.timebox}>
                  <Text style={styles.time}>{time.days || '0'}</Text>
                </View>
                <Text style={{color: Colors.White, alignSelf: 'center'}}>
                  :
                </Text>
                <View style={styles.timebox}>
                  <Text style={styles.time}>{time.hours || '00'}</Text>
                </View>
                <Text style={{color: Colors.White, alignSelf: 'center'}}>
                  :
                </Text>
                <View style={styles.timebox}>
                  <Text style={styles.time}>{time.minutes || '00'}</Text>
                </View>
                <Text style={{color: Colors.White, alignSelf: 'center'}}>
                  :
                </Text>
                <View style={styles.timebox}>
                  <Text style={styles.time}>{time.seconds || '00'}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={{marginHorizontal: 10}}>
          <Text
            style={{
              color: Colors.White,
              fontSize: 18,
              fontFamily: 'Poppins-SemiBold',
            }}>
            {data.projectname}
          </Text>

          {/* <View style={{marginTop: 10}}>
            <Text style={styles.heading}>Description</Text>

            <Text numberOfLines={more} style={styles.description}>
              {data.descriptions}
            </Text>
          </View> */}
          <View style={{marginTop: 10}}>
            <Text style={styles.heading}>Description</Text>

            <Text numberOfLines={more} style={styles.description}>
              {data.descriptions}
            </Text>
            <TouchableOpacity
              onPress={() => {
                if (more == 2) {
                  setMore(null);
                } else {
                  setMore(2);
                }
              }}>
              {more == 2 ? (
                <Text style={{color: '#3C90E9'}}>... Read More</Text>
              ) : (
                <Text style={{color: '#3C90E9'}}>... Read Less</Text>
              )}
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginVertical: 10,
              alignItems: 'center',
            }}>
            <View
              style={[
                styles.img2,
                {
                  borderWidth: 1,
                  borderColor: Colors.Blue,
                  borderRadius: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                },
              ]}>
              <Text
                style={{
                  color: Colors.White,

                  fontSize: 14,
                  fontFamily: 'Poppins-Medium',
                }}>
                {data?.user?.slice(0, 1)}
              </Text>
            </View>
            <Text
              style={{
                color: Colors.White,
                marginLeft: 10,
                fontSize: 12,
                width: 80,
                fontFamily: 'Poppins-Medium',
              }}>
              {data.user}
            </Text>
          </View>
          <View style={styles.Box3}>
            <View style={styles.Box2}>
              <Text style={styles.Head}>Min. Price</Text>
              <Text style={styles.Titel}>$ {data.price}</Text>
            </View>

            <View style={styles.Box2}>
              <Text style={styles.Head}>Current Price</Text>
              <Text style={styles.Titel}>$ 26</Text>
            </View>

            <TouchableOpacity
              style={styles.Box2}
              onPress={() => checkPermission(data.sheets)}>
              <Text style={styles.Head}>Project Pdf</Text>
              <Image
                source={require('../Assets/Image/Download.png')}
                style={{height: 14, width: 14}}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      {/* <TouchableOpacity
        onPress={() => {
          setModalshow(!modalshow);
        }}>
        <MainBtn title={'Bid Now'} />
      </TouchableOpacity> */}
      {/* <View
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
                  fontFamily: 'Poppins-SemiBold',
                  color: Colors.Black,
                  marginBottom: 20,
                  textAlign: 'center',
                }}>
                Please Confirm Bid
              </Text>
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    justifyContent: 'space-between',
                    width: '100%',
                    marginBottom: 30,
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: 'Poppins-Medium',
                      color: Colors.Black,
                    }}>
                    Bid Amount
                  </Text>
                  <TextInput
                    style={styles.placeholder}
                    placeholder="Enter Bid Amount"
                    placeholderTextColor={Colors.Grey}
                  />
                </View>

                <View
                  style={{
                    justifyContent: 'space-between',
                    width: '100%',
                    marginBottom: 30,
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: 'Poppins-Medium',
                      color: Colors.Black,
                    }}>
                    Upload Document
                  </Text>
                  <TextInput
                    style={styles.placeholder}
                    placeholder="Choose File"
                    placeholderTextColor={Colors.Grey}
                  />
                </View>
              </View>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  onPress={() => {
                    setModalshow(!modalshow);
                    navigation.navigate('ProjectdetailsCancel');
                  }}>
                  <LinearGradient
                    style={styles.btn}
                    colors={['#3F84E3', '#062A3D']}>
                    <Text style={styles.text}>Submit</Text>
                  </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setModalshow(!modalshow);
                  }}>
                  <LinearGradient
                    style={styles.btn}
                    colors={['#952121', '#460505']}>
                    <Text style={styles.text}>Cancel</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View> */}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  Image: {
    justifyContent: 'center',
    flex: 1,
    padding: 20,
  },
  Box1: {
    padding: 10,
    borderRadius: 29,
    backgroundColor: 'rgba(255, 255, 255, 0.07)',
    width: Dimensions.get('window').width - 40,

    marginRight: 12,
    marginVertical: 20,
  },
  img1: {
    width: Dimensions.get('window').width - 60,
    borderRadius: 28,
    height: 350,
    borderColor: Colors.White,
    borderWidth: 1,
  },
  Box2: {
    backgroundColor: '#1E1E2D',
    borderRadius: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingVertical: 15,
    width: Dimensions.get('window').width / 3.7,
    height: Dimensions.get('window').height / 12,
  },
  Head: {
    color: '#44C1F2',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 12,
  },
  Titel: {
    color: Colors.White,
    fontSize: 10,
    fontFamily: 'Poppins-SemiBold',
  },
  Box3: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
  },
  Box4: {
    width: Dimensions.get('window').width - 40,
    height: 64,
    backgroundColor: '#1E1E2D',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  profileImg: {
    height: 35,
    width: 39,
    borderWidth: 3,
    borderColor: Colors.White,
    borderRadius: 100,
  },
  etcImg: {
    height: 24,
    width: 26,
  },
  heading: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: Colors.White,
    marginBottom: 10,
  },
  description: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: Colors.Grey,
    lineHeight: 20,
  },
  img2: {
    borderRadius: 28,
    height: 30,
    width: 30,
  },

  timebox: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingVertical: 2,
    backgroundColor: '#292938',
    borderRadius: 5,
    margin: 5,
  },
  time: {
    fontFamily: 'Poppins-Regular',
    fontSize: 10,
    color: Colors.White,
  },
  placeholder: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    color: Colors.Grey,
    borderRadius: 10,
    borderColor: Colors.Grey,
    borderWidth: 1,
    marginTop: 10,
    paddingLeft: 10,
  },
  btn: {
    width: 110,
    height: 40,
    marginHorizontal: 10,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: Colors.White,
  },
});

export default Projectdetails;
