import React from 'react';
import {View, StyleSheet, Text, Image, Dimensions} from 'react-native';
import {Colors} from '../../Theme/Color';

const Loader = props => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        zIndex: 5,
        backgroundColor: 'rgba(0,0,0,0.6)',
        height: Dimensions.get('screen').height,
      }}>
      <Image
        style={{marginLeft: -60}}
        source={require('../../Assets/Image/loader.gif')}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default Loader;
