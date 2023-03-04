// Custom Navigation Drawer / Sidebar with Image and Icon in Menu Options
// https://aboutreact.com/custom-navigation-drawer-sidebar-with-image-and-icon-in-menu-options/

import React from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  Text,
  Linking,
} from 'react-native';

import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {useDispatch, useSelector} from 'react-redux';
import {cleardata, getUser} from './src/Redux/slices/userSlice';

const CustomSidebarMenu = ({navigation}, props) => {
  const BASE_PATH =
    'https://raw.githubusercontent.com/AboutReact/sampleresource/master/';
  const proileImage = 'react_logo.png';
  const user = useSelector(getUser);
  const dispatch = useDispatch();
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#07030B'}}>
      {/*Top Large Image */}
      <Text
        style={{
          fontFamily: 'Poppins-Bold',
          fontSize: 25,
          color: '#44C1F2',
          lineHeight: 35,
          textAlign: 'left',
          marginTop: 50,
          marginLeft: 20,
        }}>
        Welcome{`\n`}
        {user?.firstName} {user?.lastName}
      </Text>
      <View style={styles.customItem}>
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 10,
            justifyContent: 'space-between',
            width: '100%',
            alignItems: 'center',
          }}>
          <Text
            onPress={() => {
              navigation.navigate('Home');
            }}
            style={{
              color: 'white',
              fontSize: 18,
              fontFamily: 'Poppins-SemiBold',
            }}>
            Home
          </Text>
          <Image
            source={require('./src/Assets/Image/Vector.png')}
            style={styles.iconStyle}
          />
        </View>
      </View>
      <View style={styles.customItem}>
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 10,
            justifyContent: 'space-between',
            width: '100%',
            alignItems: 'center',
          }}>
          <Text
            onPress={() => {
              navigation.navigate('Bidhistory');
            }}
            style={{
              color: 'white',
              fontSize: 18,
              fontFamily: 'Poppins-SemiBold',
            }}>
            My Bids
          </Text>
          <Image
            source={require('./src/Assets/Image/Vector.png')}
            style={styles.iconStyle}
          />
        </View>
      </View>
      <View style={styles.customItem}>
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 10,
            justifyContent: 'space-between',
            width: '100%',
            alignItems: 'center',
          }}>
          <Text
            onPress={() => {
              navigation.navigate('CreateProject');
            }}
            style={{
              color: 'white',
              fontSize: 18,
              fontFamily: 'Poppins-SemiBold',
            }}>
            Create Project
          </Text>
          <Image
            source={require('./src/Assets/Image/Vector.png')}
            style={styles.iconStyle}
          />
        </View>
      </View>
      {/* <View style={styles.customItem}>
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 10,
            justifyContent: 'space-between',
            width: '100%',
            alignItems: 'center',
          }}>
          <Text
            onPress={() => {
              navigation.navigate('AboutUs');
            }}
            style={{
              color: 'white',
              fontSize: 18,
              fontFamily: 'Poppins-SemiBold',
            }}>
            About Us
          </Text>
          <Image
            source={require('./src/Assets/Image/Vector.png')}
            style={styles.iconStyle}
          />
        </View>
      </View> */}
      <View style={styles.customItem}>
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 10,
            justifyContent: 'space-between',
            width: '100%',
            alignItems: 'center',
          }}>
          <Text
            onPress={() => {
              navigation.navigate('Faqs');
            }}
            style={{
              color: 'white',
              fontSize: 18,
              fontFamily: 'Poppins-SemiBold',
            }}>
            Faqs
          </Text>
          <Image
            source={require('./src/Assets/Image/Vector.png')}
            style={styles.iconStyle}
          />
        </View>
      </View>
      <View style={styles.customItem}>
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 10,
            justifyContent: 'space-between',
            width: '100%',
            alignItems: 'center',
          }}>
          <Text
            onPress={() => {
              navigation.navigate('Tnc');
            }}
            style={{
              color: 'white',
              fontSize: 18,
              fontFamily: 'Poppins-SemiBold',
            }}>
            T&C
          </Text>
          <Image
            source={require('./src/Assets/Image/Vector.png')}
            style={styles.iconStyle}
          />
        </View>
      </View>
      <View style={styles.customItem}>
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 10,
            justifyContent: 'space-between',
            width: '100%',
            alignItems: 'center',
          }}>
          <Text
            onPress={() => {
              navigation.navigate('PrivacyPolicy');
            }}
            style={{
              color: 'white',
              fontSize: 18,
              fontFamily: 'Poppins-SemiBold',
            }}>
            Privacy Policy
          </Text>
          <Image
            source={require('./src/Assets/Image/Vector.png')}
            style={styles.iconStyle}
          />
        </View>
      </View>
      <View style={styles.customItem}>
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 10,
            justifyContent: 'space-between',
            width: '100%',
            alignItems: 'center',
          }}>
          <Text
            onPress={() => {
              dispatch(cleardata());
              navigation.navigate('Login');
            }}
            style={{
              color: 'white',
              fontSize: 18,
              fontFamily: 'Poppins-SemiBold',
            }}>
            Logout
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sideMenuProfileIcon: {
    resizeMode: 'center',
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    alignSelf: 'center',
    backgroundColor: 'grey',
  },
  iconStyle: {
    width: 10,
    height: 10,
    marginHorizontal: 5,
  },
  customItem: {
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
    marginHorizontal: 10,
  },
});

export default CustomSidebarMenu;
