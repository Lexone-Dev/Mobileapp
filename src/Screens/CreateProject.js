import React, {useState} from 'react';
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
} from 'react-native';
import Backbtn from '../Components/Button/Backbtn';
import SmallBtn from '../Components/Button/SmallBtn';
import {Colors} from '../Theme/Color';
const CreateProject = ({navigation}) => {
  const [modalshow, setModalshow] = useState(false);
  return (
    <ImageBackground
      style={styles.Image}
      source={require('../Assets/Image/BackgroundImage.png')}
      resizeMode="cover">
      <SafeAreaView style={styles.container}>
        <View style={styles.backbutton}>
          <Backbtn />
        </View>
        <ScrollView>
          <View style={styles.inputview}>
            <Text style={styles.title}>Upload Image</Text>
            <View style={styles.Subinputview}>
              <TextInput
                style={styles.placeholder}
                placeholderTextColor={Colors.Grey}
              />
            </View>
          </View>
          <View style={styles.inputview}>
            <Text style={styles.title}>Project Name</Text>
            <View style={styles.Subinputview}>
              <TextInput
                style={styles.placeholder}
                placeholderTextColor={Colors.Grey}
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 30,
            }}>
            <View style={[{width: '62%'}]}>
              <Text style={styles.title}>Auction Start Date</Text>
              <View style={[{width: '62%'}, styles.Subinputview]}>
                <TextInput
                  style={styles.placeholder}
                  placeholderTextColor={Colors.Grey}
                />
              </View>
            </View>

            <View style={[{width: '62%'}]}>
              <Text style={styles.title}>Auction End Date</Text>
              <View style={[{width: '62%'}, styles.Subinputview]}>
                <TextInput
                  style={styles.placeholder}
                  placeholderTextColor={Colors.Grey}
                />
              </View>
            </View>
          </View>

          <View style={styles.inputview}>
            <Text style={styles.title}>Max. Project Price</Text>
            <View style={styles.Subinputview}>
              <TextInput
                style={styles.placeholder}
                placeholderTextColor={Colors.Grey}
              />
            </View>
          </View>
          <View style={styles.inputview}>
            <Text style={styles.title}>Project Delivery Date</Text>
            <View style={styles.Subinputview}>
              <TextInput
                style={styles.placeholder}
                placeholderTextColor={Colors.Grey}
              />
            </View>
          </View>
          <View style={styles.inputview}>
            <Text style={styles.title}>Upload Brounchers</Text>
            <View style={styles.Subinputview}>
              <TextInput
                style={styles.placeholder}
                placeholderTextColor={Colors.Grey}
              />
            </View>
          </View>
          <View style={styles.inputview}>
            <Text style={styles.title}>Description</Text>
            <View style={styles.Subinputview}>
              <TextInput
                style={styles.placeholder}
                placeholderTextColor={Colors.Grey}
              />
            </View>
          </View>

          <View style={styles.btnview}>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
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
