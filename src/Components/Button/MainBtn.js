import React from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../../Theme/Color';
const MainBtn = props => {
  console.log(props);
  return (
  
      <LinearGradient style={styles.btn} colors={['#3F84E3', '#062A3D']}>
        <Text style={styles.text}>{props.title}</Text>
      </LinearGradient>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    width: Dimensions.get('window').width-40,
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
});

export default MainBtn;
