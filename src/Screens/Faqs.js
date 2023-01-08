import {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ImageBackground,
} from 'react-native';
import Backbtn from '../Components/Button/Backbtn';
import {Colors} from '../Theme/Color';

const Faqs = () => {
  const [show, setShow] = useState(false);
  const [idcheck, setIdcheck] = useState('');

  const data = [
    {
      id: '1',
      head: 'What is Lorem Ipsum?',
      title:
        ' Lorem Ipsum is simply dummy text of the printing and typesetting industry orem Ipsum is simply dummy text of the printing and typesetting industry orem Ipsum is simply dummy text of the printing and typesetting industry . ',
    },
    {
      id: '2',
      head: 'What is Lorem Ipsum?',
      title:
        ' Lorem Ipsum is simply dummy text of the printing and typesetting industry orem Ipsum is simply dummy text of the printing and typesetting industry .',
    },
    {
      id: '3',
      head: 'What is Lorem Ipsum?',
      title:
        ' Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    },
    {
      id: '4',
      head: 'What is Lorem Ipsum?',
      title:
        ' Lorem Ipsum is simply dummy text of the printing and typesetting industry orem Ipsum is simply dummy text of the printing and typesetting industry orem Ipsum is simply dummy text of the printing and typesetting industry .',
    },
  ];

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
        <ScrollView>
          {data.map(item => {
            return (
              <>
                <TouchableOpacity
                  style={styles.btn1}
                  onPress={() => {
                    setShow(true), setIdcheck(item.id);
                    if (idcheck == item.id) {
                      setShow(false);
                      setIdcheck('0');
                    }
                  }}>
                  <Text style={styles.maintxt}>{item.head}</Text>
                </TouchableOpacity>
                {show && idcheck == item.id && (
                  <Text style={styles.infotxt}>{item.title}</Text>
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
