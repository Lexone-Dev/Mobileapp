import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './src/Screens/Home.js';
import Login from './src/Screens/Login.js';
import Signup from './src/Screens/Signup.js';
import Information from './src/Screens/Information.js';
import Forgot from './src/Screens/Forgot.js';
import CreateProject from './src/Screens/CreateProject.js';
import Projectdetails from './src/Screens/ProjectdetailsScreen.js';
import Bidhistory from './src/Screens/Bidhistory.js';
import Profile from './src/Screens/Profile.js';
import CreatedProjectDetailes from './src/Screens/CreatedProjectDetailes.js';
import Faqs from './src/Screens/Faqs';
import Tnc from './src/Screens/Tnc';
import PrivacyPolicy from './src/Screens/PrivacyPolicy';
import AboutUs from './src/Screens/AboutUs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomSidebarMenu from './CustomSidebarMenu';
import {Provider} from 'react-redux';
import Store from './src/Redux/store';
import SplashScreen from 'react-native-splash-screen';
import Profile_edit from './src/Screens/Profile_edit.js';
import ProjectdetailsCancel from './src/Screens/ProjectdetailsCancelScreen';
import Otp from './src/Screens/Otp.js';
import Confirmpsw from './src/Screens/Confirmpsw.js';
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const App = () => {
  SplashScreen.hide();
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <Drawer.Navigator
          drawerContentOptions={{
            activeTintColor: '#e91e63',
            itemStyle: {marginVertical: 5},
          }}
          screenOptions={{
            swipeEnabled: false,
          }}
          drawerContent={props => <CustomSidebarMenu {...props} />}>
          <Drawer.Screen
            name="All"
            options={{headerShown: false}}
            component={All}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </Provider>
  );
};
function All() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ProjectdetailsCancel"
        component={ProjectdetailsCancel}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="Information"
        component={Information}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="CreatedProject"
        component={CreatedProjectDetailes}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="CreateProject"
        component={CreateProject}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Projectdetails"
        component={Projectdetails}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Bidhistory"
        component={Bidhistory}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="Profile_edit"
        component={Profile_edit}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Faqs"
        component={Faqs}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Tnc" component={Tnc} options={{headerShown: false}} />
      <Stack.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicy}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AboutUs"
        component={AboutUs}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Forgot"
        component={Forgot}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Otp" component={Otp} options={{headerShown: false}} />
      <Stack.Screen
        name="Confirmpsw"
        component={Confirmpsw}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
export default App;
