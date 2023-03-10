import {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  ImageBackground,
  Dimensions,
  ScrollView,
  BackHandler,
  Alert,
} from 'react-native';
import Topbar from '../Components/Header/Topbar';
import Liveauction from '../Components/BoxLayout/LiveAuctionbox';
import Upcomingbox from '../Components/BoxLayout/Upcomingbox';
import {Colors} from '../Theme/Color';
import LinearGradient from 'react-native-linear-gradient';
import {apicaller} from '../Components/ApiCaller/Api';

const Home = ({navigation}) => {
  const [advlexoneBanner, setLexoneAdvBanner] = useState([]);
  const [liveDetail, setLiveDetail] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [loadmore, setLoadmore] = useState(8);

  const [isLoading, setIsLoading] = useState(false);
  let screens = 'Login';
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, []);
  const backAction = () => {
    if (screens == 'Login') {
      Alert.alert('Hold on!', 'Are you sure you want to close the app?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => BackHandler.exitApp()},
      ]);
    }
    return true;
  };
  useEffect(() => {
    getAllHomeData();
  }, []);

  const getAllHomeData = () => {
    setIsLoading(true);

    apicaller('banner', null, 'get', null)
      .then(res => {
        setLexoneAdvBanner(res.data.result);
      })
      .catch(e => {
        console.log(e);
      });

    apicaller('project/get-by-status?status=active', null, 'get', null, null)
      .then(res => {
        setLiveDetail(res.data.result);
      })
      .catch(e => {
        console.log(e);
      })
      .finally(() => setIsLoading(false));

    apicaller('project/get-by-status?status=inactive', null, 'get', null, null)
      .then(res => {
        setUpcoming(res.data.result);
        // console.log('res.data.result', res.data.result);
      })
      .catch(e => {
        console.log(e);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <ImageBackground
      style={styles.Image}
      source={require('../Assets/Image/BackgroundImage.png')}
      resizeMode="cover">
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.Topbarview}>
          <Topbar />
        </View>
        <View style={styles.information}>
          <View style={styles.Infoview}></View>
          <View style={styles.Infoview}></View>
          <View style={styles.Infoview}></View>
          <View style={styles.Infoview}></View>
        </View>
        <View style={{marginHorizontal: 20}}>
          <Text style={styles.heading}>Live Auction</Text>
        </View>

        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {liveDetail?.slice(0, loadmore)?.map((item, i) => (
            <Liveauction
              bidLastDate={item?.endDate}
              image={item?.image}
              user={item?.createdBy?.firstName}
              userimg={item?.createdBy?.image}
              projectname={item?.name}
              descriptions={item?.descriptions}
              price={item?.price}
              status={item?.status}
              sheets={item?.sheet}
              details1="Details"
            />
          ))}
        </ScrollView>

        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          style={{marginVertical: 30}}>
          {advlexoneBanner.map(item => {
            return (
              <LinearGradient
                style={styles.img2}
                colors={['#fffcfc', '#6C7C87']}>
                <Image source={{uri: item.image}} style={styles.img1} />
              </LinearGradient>
            );
          })}
        </ScrollView>
        <View style={{marginHorizontal: 20}}>
          <Text style={styles.heading1}>Upcoming Auction</Text>
        </View>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          style={{marginVertical: 20}}>
          {upcoming?.slice(0, loadmore)?.map((item, i) => (
            // console.log('item',item),
            <Upcomingbox
              bidDate={item?.startDate}
              image={item?.image}
              projectname={item?.name}
              details1="Details"
              items={item}
            />
          ))}
        </ScrollView>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 20,
  },
  Image: {
    justifyContent: 'center',
    flex: 1,
  },
  Topbarview: {
    marginTop: 20,
  },
  information: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: Dimensions.get('window').width,
    paddingHorizontal: 20,
  },

  Infoview: {
    height: 34,
    width: 76,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  heading: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: Colors.White,
    marginTop: 30,
    marginBottom: 20,
  },
  heading1: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: Colors.White,
  },
  img1: {
    height: 162,
    width: Dimensions.get('window').width - 52,
    alignSelf: 'center',
    borderRadius: 20,
  },
  img2: {
    height: 164,
    width: Dimensions.get('window').width - 50,
    alignSelf: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginRight: -10,
    borderRadius: 20,
  },
});

export default Home;
