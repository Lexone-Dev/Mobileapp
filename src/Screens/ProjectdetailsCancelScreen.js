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
import CancelBtn from '../Components/Button/CancelBtn';
import MainBtn from '../Components/Button/MainBtn';
import SmallBtn from '../Components/Button/SmallBtn';
import Header from '../Components/Header/Header';
import {Colors} from '../Theme/Color';

const ProjectdetailsCancel = ({navigation}) => {
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

          <View style={styles.Smallbox}>
            <View>
              <Text
                style={{
                  color: Colors.White,
                  fontSize: 18,
                  fontFamily: 'Poppins-SemiBold',
                }}>
                Netfilx
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={require('../Assets/Image/Profile.png')}
                  style={styles.img2}
                />
                <Text
                  style={{
                    color: Colors.White,
                    marginLeft: 5,
                    fontSize: 12,
                    width: 80,
                    fontFamily: 'Poppins-Medium',
                  }}>
                  Sagarika
                </Text>
              </View>
            </View>

            <View
              style={{
                backgroundColor: '#1E1E2D',
                borderRadius: 15,
                justifyContent: 'center',
                alignItems: 'center',
                padding: 10,
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
                  <Text style={styles.time}>19</Text>
                </View>
                <Text style={{color: Colors.White, alignSelf: 'center'}}>
                  :
                </Text>
                <View style={styles.timebox}>
                  <Text style={styles.time}>19</Text>
                </View>
                <Text style={{color: Colors.White, alignSelf: 'center'}}>
                  :
                </Text>
                <View style={styles.timebox}>
                  <Text style={styles.time}>19</Text>
                </View>
              </View>
            </View>
          </View>
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
        <Bidlist />
        <Bidlist />
        <Bidlist />
      </ScrollView>
      <TouchableOpacity
        style={{width: 100}}
        onPress={() => {
          setModalshow(!modalshow);
        }}>
        <CancelBtn title={'Cancel'} />
      </TouchableOpacity>
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
              <View
                style={{
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: 'Poppins-Medium',
                    color: Colors.Black,
                  }}>
                  Are you sure you want cancel this bid ?
                </Text>
              </View>

              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  onPress={() => {
                    setModalshow(!modalshow);
                    navigation.navigate('Projectdetails');
                  }}
                  style={{marginTop: 20, alignSelf: 'center'}}>
                  <LinearGradient
                    style={styles.btn}
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
                    style={styles.btn}
                    colors={['#952121', '#460505']}>
                    <Text style={styles.text}>No</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
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

export default ProjectdetailsCancel;
