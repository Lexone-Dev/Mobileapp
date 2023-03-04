import {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ImageBackground,
  BackHandler,
} from 'react-native';
import Backbtn from '../Components/Button/Backbtn';
import {Colors} from '../Theme/Color';
import {apicaller} from '../Components/ApiCaller/Api';

const Faqs = () => {
  const [show, setShow] = useState(false);
  const [idcheck, setIdcheck] = useState('');
  const [data, setData] = useState([]);
  useEffect(() => {
    apicaller(`/faq`, null, 'get', null)
      .then(function (response) {
        console.log(JSON.stringify(response.data.result));
        setData(response.data.result);
      })
      .catch(function (error) {
        console.log(error.response.data);
      });
  }, []);
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
            Faqs
          </Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          {data.map(item => {
            return (
              <>
                <TouchableOpacity
                  style={styles.btn1}
                  onPress={() => {
                    setShow(true), setIdcheck(item._id);
                    if (idcheck == item._id) {
                      setShow(false);
                      setIdcheck('0');
                    }
                  }}>
                  <Text style={styles.maintxt}>{item.question}</Text>
                </TouchableOpacity>
                {show && idcheck == item._id && (
                  <Text style={styles.infotxt}>{item.answer}</Text>
                )}
              </>
            );
          })}
        </ScrollView>
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
    marginTop: 70,
    marginBottom: 10,
  },
  btn1: {
    borderRadius: 15,
    height: 60,
    justifyContent: 'center',
    paddingLeft: 20,
    marginVertical: 10,

    backgroundColor: 'rgba(255, 255, 255, 0.07)',
  },
  maintxt: {
    fontSize: 16,
    color: '#44C1F2',
    fontFamily: 'Poppins-SemiBold',
  },
  infotxt: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    lineHeight: 30,
    color: Colors.White,
    marginHorizontal: 10,
  },
});

export default Faqs;
