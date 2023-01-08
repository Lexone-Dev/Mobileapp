import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Colors} from '../../Theme/Color';

const Header = props => {
  return (
    <View style={styles.headerview}>
      <Text style={styles.Bigheader}>{props.Headertitle}</Text>
      <Text style={styles.SmallTitle}>{props.Smalltitle}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerview: {
    marginTop: 150,
    paddingBottom: 40,
  },
  Bigheader: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 30,
    color: Colors.White,
  },
  SmallTitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.White,
  },
});

export default Header;
