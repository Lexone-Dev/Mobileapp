import React, {useEffect, useState} from 'react';
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
  BackHandler,
} from 'react-native';
import {useSelector} from 'react-redux';
import {apicaller} from '../Components/ApiCaller/Api';
import SmallBtn from '../Components/Button/SmallBtn';
import Header from '../Components/Header/Header';
import Topbar from '../Components/Header/Topbar';
import {getToken, getUser} from '../Redux/slices/userSlice';
import {Colors} from '../Theme/Color';

const Bidhistory = ({navigation}) => {
  const [select, setSelect] = useState('Allproject');
  const [prodata, setProdata] = useState([]);
  const user = useSelector(getUser);
  const userToken = useSelector(getToken);

  useEffect(() => {
    getallProjectsByUserFun();
  }, []);

  const getallProjectsByUserFun = () => {
    apicaller(`project/get/${user._id}`, null, 'get', userToken)
      .then(res => {
        console.log('project/get', res.data.result);
        setProdata(res.data.result);
      })
      .catch(e => {
        console.log(e);
      });
  };
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
      <Topbar />
      {prodata[0] == undefined && (
        <Text style={{color: '#fff', alignSelf: 'center', marginVertical: 200}}>
          No Bid Yet
        </Text>
      )}
      {/* <View style={styles.Box1}>
        <TouchableOpacity
          onPress={() => {
            setSelect('Allproject');
          }}
          style={select == 'Allproject' ? styles.Box2 : styles.Box21}>
          <Text
            style={select == 'Allproject' ? styles.txtcolor : styles.txtcolor1}>
            All Project
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setSelect('Myproject');
          }}
          style={select == 'Myproject' ? styles.Box2 : styles.Box21}>
          <Text
            style={select == 'Myproject' ? styles.txtcolor : styles.txtcolor1}>
            My Project
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setSelect('Createdproject');
          }}
          style={select == 'Createdproject' ? styles.Box2 : styles.Box21}>
          <Text
            style={
              select == 'Createdproject' ? styles.txtcolor : styles.txtcolor1
            }>
            Created Project
          </Text>
        </TouchableOpacity>
      </View> */}
      <ScrollView>
        {prodata.map(e => {
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('CreatedProject', {e});
              }}
              style={styles.Box3}>
              <View style={styles.Box5}>
                <Text style={styles.head}>{e.name}</Text>
                {/* <View style={styles.Box4}>
                  <Image
                    source={require('../Assets/Image/Profile.png')}
                    style={styles.img1}
                  />
                  <Text style={{color: Colors.White, marginLeft: 20}}>
                    Deepali Samal
                  </Text>
                </View> */}
              </View>
              <Image source={{uri: e.image}} style={styles.imgs} />
              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: 'rgba(255, 255, 255, 0.3)',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginHorizontal: 10,
                  marginTop: 5,
                  height: 30,
                  borderRadius: 10,
                }}>
                <Text
                  style={[
                    styles.Head,
                    {color: Colors.Blue, fontWeight: 'bold', fontSize: 14},
                  ]}>
                  Status :
                </Text>

                <Text
                  style={[
                    styles.Titel,
                    {color: Colors.Blue, fontWeight: 'bold', fontSize: 14},
                  ]}>
                  {e.status}
                </Text>
              </View>
              <View style={styles.Box6}>
                <View style={styles.Box7}>
                  <Text style={styles.Head}>Bid Price</Text>
                  <View style={styles.timebox}>
                    <Text style={styles.Titel}>$ {e.price}</Text>
                  </View>
                </View>
                <View style={styles.Box7}>
                  <Text style={styles.Head}>Auction Ends</Text>
                  <View style={{flexDirection: 'row'}}>
                    <View style={styles.timebox}>
                      <Text style={styles.time}>{e?.endDate?.slice(0, 2)}</Text>
                    </View>
                    <Text style={{color: Colors.White, alignSelf: 'center'}}>
                      :
                    </Text>
                    <View style={styles.timebox}>
                      <Text style={styles.time}>
                        {' '}
                        {e?.endDate?.slice(3, 5)}
                      </Text>
                    </View>
                    <Text style={{color: Colors.White, alignSelf: 'center'}}>
                      :
                    </Text>
                    <View style={styles.timebox}>
                      <Text style={styles.time}>
                        {' '}
                        {e?.endDate?.slice(6, 10)}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}

        {/* <View style={styles.Box3}>
          <View style={styles.Box5}>
            <Text style={styles.head}>Netfilx</Text>
            <View style={styles.Box4}>
              <Image
                source={require('../Assets/Image/Profile.png')}
                style={styles.img1}
              />
              <Text style={{color: Colors.White, marginLeft: 20}}>
                Deepali Samal
              </Text>
            </View>
          </View>
          <Image
            source={require('../Assets/Image/Image.png')}
            style={styles.imgs}
          />
          <View style={styles.Box6}>
            <View style={styles.Box7}>
              <Text style={styles.Head}>Bid Price</Text>
              <View style={styles.timebox}>
                <Text style={styles.Titel}>$ 18</Text>
              </View>
            </View>
            <View style={styles.Box7}>
              <Text style={styles.Head}>Delivery Date</Text>
              <View style={styles.timebox}>
                <Text style={styles.Titel}>02.12.2022</Text>
              </View>
            </View>
            <View style={styles.Box7}>
              <Text style={styles.Head}>Status</Text>
              <View style={styles.timebox}>
                <Text style={styles.Titel}>Archived</Text>
              </View>
            </View>
          </View>
        </View> */}

        {/* <View style={styles.Box3}>
          <View style={styles.Box5}>
            <Text style={styles.head}>Netfilx</Text>
            <View style={styles.Box4}>
              <Image
                source={require('../Assets/Image/Profile.png')}
                style={styles.img1}
              />
              <Text
                style={{
                  color: Colors.White,
                  marginLeft: 20,
                  fontFamily: 'Poppins-Medium',
                  fontSize: 12,
                }}>
                Deepali Samal
              </Text>
            </View>
          </View>
          <Image
            source={require('../Assets/Image/Image.png')}
            style={styles.imgs}
          />
          <View style={styles.Box6}>
            <View style={styles.Box7}>
              <Text style={styles.Head}>Bid Price</Text>
              <View style={styles.timebox}>
                <Text style={styles.Titel}>$ 18</Text>
              </View>
            </View>
            <View style={styles.Box7}>
              <Text style={styles.Head}>Auction Ends</Text>
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
            <View style={styles.Box7}>
              <Text style={styles.Head}>Status</Text>
              <View style={styles.timebox}>
                <Text style={styles.Titel}>Live</Text>
              </View>
            </View>
          </View>
        </View> */}
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  Image: {
    flex: 1,
  },
  Box1: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
  },
  txtcolor: {
    color: Colors.Blue,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 12,
  },
  Box2: {
    flexDirection: 'row',
    borderColor: Colors.Blue,
    borderWidth: 1,
    height: 40,
    width: 115,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },

  txtcolor1: {
    color: Colors.White,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 12,
  },
  Box21: {
    flexDirection: 'row',
    borderColor: Colors.White,
    borderWidth: 1,
    height: 40,
    width: 115,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Box3: {
    backgroundColor: 'rgba(255, 255, 255, 0.07)',
    width: Dimensions.get('window').width - 40,
    alignSelf: 'center',
    justifyContent: 'center',

    marginTop: 15,
    borderRadius: 30,
  },
  head: {
    color: Colors.White,
    fontSize: 18,

    fontFamily: 'Poppins-Bold',
  },
  img1: {
    width: 30,
    height: 30,
  },
  Box4: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Box5: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  imgs: {
    width: Dimensions.get('window').width / 1.2,
    borderRadius: 28,
    height: Dimensions.get('window').height / 4,
    borderColor: Colors.White,
    borderWidth: 1,
    alignSelf: 'center',
  },
  Box6: {
    width: Dimensions.get('window').width / 1.2,
    alignSelf: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.09)',
    borderRadius: 26,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 5,
  },
  Box7: {
    height: 64,
    width: Dimensions.get('window').width / 2.8,
    backgroundColor: '#1E1E2D',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  Head: {
    color: '#44C1F2',
    fontSize: 10,
    fontFamily: 'Poppins-SemiBold',
  },
  Titel: {
    color: Colors.White,
    fontSize: 10,
    paddingHorizontal: 10,
    fontFamily: 'Poppins-Regular',
  },
  timebox: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingVertical: 3,
    backgroundColor: '#292938',
    borderRadius: 5,
    margin: 5,
  },
  time: {
    fontFamily: 'Poppins-Regular',
    fontSize: 10,
    fontFamily: 'Poppins-SemiBold',
    color: Colors.White,
  },
});

export default Bidhistory;
