import React from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../../Theme/Color';
const SmallBtn = props => {
  console.log(props);
  return (
    <View>
      <LinearGradient
        style={styles.btn}
        colors={props.disable ? ['#aaa', '#aaa'] : ['#3F84E3', '#062A3D']}>
        <Text style={styles.text}>{props.title}</Text>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    width: 185,
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

export default SmallBtn;
