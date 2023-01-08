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
  ScrollView,
  Modal,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Bidlist from '../Components/BoxLayout/BidList';
import Backbtn from '../Components/Button/Backbtn';
import MainBtn from '../Components/Button/MainBtn';
import SmallBtn from '../Components/Button/SmallBtn';
import Header from '../Components/Header/Header';
import {Colors} from '../Theme/Color';

const CreatedProjectDetailes = ({navigation}) => {
  const [more, setMore] = useState(2);
  const [modalshow, setModalshow] = useState(false);
  return (
    <ImageBackground
      style={styles.Image}
      source={require('../Assets/Image/BackgroundImage.png')}
      resizeMode="cover">
      <Backbtn />
      <ScrollView>
        <View style={styles.Box1}>
          <Image
            source={require('../Assets/Image/Image.png')}
            style={styles.img1}
          />
        </View>
        <View>
          <Text style={styles.heading}>Description</Text>

          <Text numberOfLines={more} style={styles.description}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an Lorem Ipsum has been
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
        <View style={styles.Box3}>
          <View style={styles.Box2}>
            <Text style={styles.Head}>Min. Price</Text>
            <Text style={styles.Titel}>$ 18</Text>
          </View>

          <View style={styles.Box2}>
            <Text style={styles.Head}>Current Price</Text>
            <Text style={styles.Titel}>$ 26</Text>
          </View>

          <View style={styles.Box2}>
            <Text style={styles.Head}>Project Pdf</Text>
            <Image
              source={require('../Assets/Image/Download.png')}
              style={{height: 14, width: 14}}
            />
          </View>
        </View>
        <View style={styles.Box4}>
          <View style={styles.Box5}>
            <Image
              source={require('../Assets/Image/Profile.png')}
              style={styles.profileImg}
            />
            <View style={{marginHorizontal: 15}}>
              <Text style={[styles.Head, {color: Colors.White}]}>
                Bid placed by Sagarika Mohanty
              </Text>
              <Text style={[styles.Titel]}>Dec 05, 2021 at 18:33 pm</Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignContent: 'center',
                  marginTop: 5,
                }}>
                <Image
                  source={require('../Assets/Image/Download.png')}
                  style={{height: 14, width: 14}}
                />
                <Text
                  style={{
                    color: Colors.Blue,
                    fontFamily: 'Poppins-Medium',
                    fontSize: 12,
                    marginLeft: 5,
                  }}>
                  Download Pdf
                </Text>
              </View>
            </View>
            <View style={{flexDirection: 'row', marginLeft: 20}}>
              <Text
                style={{
                  color: Colors.Blue,
                  fontSize: 16,
                  fontFamily: 'Poppins-Regular',
                }}>
                $ 3.5
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={{margin: 10, marginTop: 20}}
            onPress={() => {
              setModalshow(!modalshow);
            }}>
            <LinearGradient style={styles.btn} colors={['#3F84E3', '#062A3D']}>
              <Text style={styles.text}>Accept Bid Request</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <View style={styles.Box4}>
          <View style={styles.Box5}>
            <Image
              source={require('../Assets/Image/Profile.png')}
              style={styles.profileImg}
            />
            <View style={{marginHorizontal: 15}}>
              <Text style={[styles.Head, {color: Colors.White}]}>
                Bid placed by Sagarika Mohanty
              </Text>
              <Text style={[styles.Titel]}>Dec 05, 2021 at 18:33 pm</Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignContent: 'center',
                  marginTop: 5,
                }}>
                <Image
                  source={require('../Assets/Image/Download.png')}
                  style={{height: 14, width: 14}}
                />
                <Text
                  style={{
                    color: Colors.Blue,
                    fontFamily: 'Poppins-Medium',
                    fontSize: 12,
                    marginLeft: 5,
                  }}>
                  Download Pdf
                </Text>
              </View>
            </View>
            <View style={{flexDirection: 'row', marginLeft: 20}}>
              <Text
                style={{
                  color: Colors.Blue,
                  fontSize: 16,
                  fontFamily: 'Poppins-Regular',
                }}>
                $ 3.5
              </Text>
            </View>
          </View>
          <TouchableOpacity style={{margin: 10, marginTop: 20}}>
            <LinearGradient style={styles.btn} colors={['#3F84E3', '#062A3D']}>
              <Text style={styles.text}>Accept Bid Request</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <View style={styles.Box4}>
          <View style={styles.Box5}>
            <Image
              source={require('../Assets/Image/Profile.png')}
              style={styles.profileImg}
            />
            <View style={{marginHorizontal: 15}}>
              <Text style={[styles.Head, {color: Colors.White}]}>
                Bid placed by Sagarika Mohanty
              </Text>
              <Text style={[styles.Titel]}>Dec 05, 2021 at 18:33 pm</Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignContent: 'center',
                  marginTop: 5,
                }}>
                <Image
                  source={require('../Assets/Image/Download.png')}
                  style={{height: 14, width: 14}}
                />
                <Text
                  style={{
                    color: Colors.Blue,
                    fontFamily: 'Poppins-Medium',
                    fontSize: 12,
                    marginLeft: 5,
                  }}>
                  Download Pdf
                </Text>
              </View>
            </View>
            <View style={{flexDirection: 'row', marginLeft: 20}}>
              <Text
                style={{
                  color: Colors.Blue,
                  fontSize: 16,
                  fontFamily: 'Poppins-Regular',
                }}>
                $ 3.5
              </Text>
            </View>
          </View>
          <TouchableOpacity style={{margin: 10, marginTop: 20}}>
            <LinearGradient style={styles.btn} colors={['#3F84E3', '#062A3D']}>
              <Text style={styles.text}>Accept Bid Request</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
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
                    fontFamily: 'Poppins-SemiBold',
                    color: Colors.Black,
                    marginBottom: 20,
                    textAlign: 'center',
                  }}>
                  Confirm
                </Text>
                <View
                  style={{
                    width: '100%',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={require('../Assets/Image/Profile.png')}
                    style={styles.profileImg}
                  />
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: 'Poppins-Medium',
                      color: Colors.Black,
                      marginTop: 10,
                    }}>
                    Sagarika Mohanty
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: 'Poppins-Medium',
                      color: Colors.Black,
                    }}>
                    Final Price : $3.3
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: 'Poppins-Medium',
                      color: Colors.Black,
                    }}>
                    Delivery Date : 20.12.2022
                  </Text>
                </View>

                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity
                    onPress={() => {
                      setModalshow(!modalshow);
                    }}
                    style={{marginTop: 20, alignSelf: 'center'}}>
                    <LinearGradient
                      style={styles.btn1}
                      colors={['#3F84E3', '#062A3D']}>
                      <Text style={styles.text}>Yes</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setModalshow(!modalshow);
                    }}
                    style={{marginTop: 20, alignSelf: 'center'}}>
                    <LinearGradient
                      style={styles.btn1}
                      colors={['#952121', '#460505']}>
                      <Text style={styles.text}>No</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </ScrollView>
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

    borderColor: Colors.White,
    borderWidth: 1,
  },
  Box2: {
    backgroundColor: '#1E1E2D',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
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
  Box5: {
    width: Dimensions.get('window').width - 40,

    backgroundColor: '#1E1E2D',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  Box4: {
    width: Dimensions.get('window').width - 40,
    backgroundColor: '#1E1E2D',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    marginBottom: 10,
  },
  profileImg: {
    height: 51,
    width: 53,
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
  Smallbox: {
    height: 90,
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.09)',
    marginHorizontal: 10,
    marginTop: -135,
    marginBottom: 50,
    borderRadius: 15,
    borderColor: 'rgba(255, 255, 255, 1)',
    borderWidth: 0.2,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
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
  btn: {
    width: Dimensions.get('window').width - 80,
    height: 50,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: Colors.White,
  },
  btn1: {
    width: 110,
    height: 40,
    marginHorizontal: 10,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CreatedProjectDetailes;
