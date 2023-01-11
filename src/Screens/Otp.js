import {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Dimensions,
  Image,
} from 'react-native';
import Backbtn from '../Components/Button/Backbtn';
import SmallBtn from '../Components/Button/SmallBtn';
import {Colors} from '../Theme/Color';

const Otp = () => {
  const [arr, setArr] = useState([]);
  const [rfr, setRfr] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  function add(Num) {
    if (arr.length > 5) arr.length = 5;
    if (arr.length != 5) arr.push(Num);
    setArr(arr);
    setRfr(!rfr);
  }
  function del() {
    arr.pop();
    setArr(arr);
    setRfr(!rfr);
  }
  console.log(arr.length);

  return (
    <ImageBackground
      style={styles.Image}
      source={require('../Assets/Image/BackgroundImage.png')}
      resizeMode="cover">
      <Backbtn />
      <View style={styles.container}>
        <View style={styles.box1}>
          <Text
            style={{
              fontSize: 28,
              color: Colors.White,
              fontFamily: 'Poppins-Bold',
              textAlign: 'center',
            }}>
            Enter OTP
          </Text>

          <View style={styles.pinview}>
            {arr.map(function (e, i) {
              return (
                <>
                  <View style={styles.inputb} key={i}>
                    <Text
                      style={{
                        fontSize: 20,
                        fontFamily: 'Poppins-Bold',
                        color: Colors.Blue,
                      }}>
                      {e}
                    </Text>
                  </View>
                </>
              );
            })}

            <View
              style={[
                styles.inputb,
                {display: arr.length > 4 ? 'none' : 'flex'},
              ]}
            />
            <View
              style={[
                styles.inputb,
                {display: arr.length > 3 ? 'none' : 'flex'},
              ]}
            />
            <View
              style={[
                styles.inputb,
                {display: arr.length > 2 ? 'none' : 'flex'},
              ]}
            />
            <View
              style={[
                styles.inputb,
                {display: arr.length > 1 ? 'none' : 'flex'},
              ]}
            />
            <View
              style={[
                styles.inputb,
                {display: arr.length > 0 ? 'none' : 'flex'},
              ]}
            />
          </View>

          <View>
            <View style={styles.keyboard}>
              <TouchableOpacity
                accessible={true}
                accessibilityLabel="Onpress1"
                onPress={() => {
                  add('1');
                }}>
                <Text style={styles.keyboardtext}>1</Text>
              </TouchableOpacity>
              <TouchableOpacity
                accessible={true}
                accessibilityLabel="Onpress2"
                onPress={() => {
                  add('2');
                }}>
                <Text style={styles.keyboardtext}>2</Text>
              </TouchableOpacity>
              <TouchableOpacity
                accessible={true}
                accessibilityLabel="Onpress3"
                onPress={() => {
                  add('3');
                }}>
                <Text style={styles.keyboardtext}>3</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.keyboard}>
              <TouchableOpacity
                accessible={true}
                accessibilityLabel="Onpress4"
                onPress={() => {
                  add('4');
                }}>
                <Text style={styles.keyboardtext}>4</Text>
              </TouchableOpacity>
              <TouchableOpacity
                accessible={true}
                accessibilityLabel="Onpress5"
                onPress={() => {
                  add('5');
                }}>
                <Text style={styles.keyboardtext}>5</Text>
              </TouchableOpacity>
              <TouchableOpacity
                accessible={true}
                accessibilityLabel="Onpress6"
                onPress={() => {
                  add('6');
                }}>
                <Text style={styles.keyboardtext}>6</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.keyboard}>
              <TouchableOpacity
                accessible={true}
                accessibilityLabel="Onpress7"
                onPress={() => {
                  add('7');
                }}>
                <Text style={styles.keyboardtext}>7</Text>
              </TouchableOpacity>
              <TouchableOpacity
                accessible={true}
                accessibilityLabel="Onpress8"
                onPress={() => {
                  add('8');
                }}>
                <Text style={styles.keyboardtext}>8</Text>
              </TouchableOpacity>
              <TouchableOpacity
                accessible={true}
                accessibilityLabel="Onpress9"
                onPress={() => {
                  add('9');
                }}>
                <Text style={styles.keyboardtext}>9</Text>
              </TouchableOpacity>
            </View>
            <View
              style={[
                styles.keyboard,
                {
                  alignItems: 'flex-start',
                  marginVertical: 10,
                },
              ]}>
              <TouchableOpacity style={styles.keyboardtext}>
                <Text style={styles.keyboardtext}>{'    '}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                accessible={true}
                accessibilityLabel="Onpress0"
                onPress={() => {
                  add('0');
                }}>
                <Text style={styles.keyboardtext}>0</Text>
              </TouchableOpacity>
              <View style={{marginTop: 5}}>
                <TouchableOpacity
                  accessible={true}
                  accessibilityLabel="Delete"
                  onPress={() => {
                    del();
                  }}
                  style={[styles.keyboardtext]}>
                  <Image source={require('../Assets/Image/Backspace.png')} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <TouchableOpacity
            style={{
              alignSelf: 'center',
              justifyContent: 'center',
              marginVertical: 80,
            }}>
            <SmallBtn title="Confirm" />
          </TouchableOpacity>
        </View>
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
  container: {
    flex: 1,
  },
  box1: {
    width: '100%',
    marginTop: 50,
    marginBottom: 10,
  },

  inputb: {
    height: 40,
    width: 35,
    borderRadius: 5,
    marginHorizontal: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pinview: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: 40,
    marginTop: 50,
  },
  keyboard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 40,
    marginHorizontal: 30,
  },
  keyboardtext: {
    color: Colors.White,
    alignItems: 'center',
    fontSize: 22,
    fontFamily: 'Inter-SemiBold',
    marginHorizontal: 5,
  },
});

export default Otp;
