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
      <ScrollView style={styles.container}>
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

        <ScrollView horizontal={true} style={{marginLeft: 20}}>
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
          horizontal={true}
          style={{marginVertical: 30, marginHorizontal: 20}}>
          {advlexoneBanner.map(item => {
            return (
              <LinearGradient
                style={styles.img2}
                colors={['#fffcfc', '#6C7C87']}>
                <Image source={{uri: item.image}} style={styles.img1} />
              </LinearGradient>
            );
          })}
          {/* <LinearGradient style={styles.img2} colors={['#fffcfc', '#6C7C87']}>
            <Image
              source={require('../Assets/Image/Banner.png')}
              style={styles.img1}
            />
            <Text
              style={{
                position: 'absolute',
                color: Colors.White,
                fontFamily: 'Poppins-Bold',
                fontSize: 20,
                width: 300,
                textAlign: 'center',
                left: 20,
              }}>
              An auction without a bid is no auction at all
            </Text>
          </LinearGradient> */}
        </ScrollView>
        <View style={{marginHorizontal: 20}}>
          <Text style={styles.heading1}>Upcoming Auction</Text>
        </View>
        <ScrollView
          horizontal={true}
          style={{marginVertical: 20, marginLeft: 20}}>
          {upcoming?.slice(0, loadmore)?.map((item, i) => (
            <Upcomingbox
              bidDate={item?.startDate}
              image={item?.image}
              projectname={item?.name}
              details1="Details"
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
    marginRight: 10,
    borderRadius: 20,
  },
});

export default Home;
