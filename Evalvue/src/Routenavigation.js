import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import * as React from 'react';
const mobileW = Dimensions.get('window').width;
const mobileH = Dimensions.get('window').height;
import { View, Text, Dimensions } from 'react-native';
import Fogotpassword from './Fogotpassword';
import CompanyDetails from './CompanyDetails';
import Dashboard from './Dashboard';
import LoginScreen from './Login';
import Otp from './Otp';
import Reviewratingscreen from './Reviewratingscreen';
import SignupScreen from './Signup';
import Employee from './Employee';
import Organization from './Organization';
import CustomDrawer from './CustomDrawer';
import Search from './Search';
import Notification from './Notification';
import Company from './Company';
import Review from './Review';
import SliderDot from './Slider';
// import Onbording from './Onboarding';

import AddOrganization from './AddOrganization';
import Post from './Post';
import Addemployee from './Addemployee';

import Addreview from './Addreview';
import Payment from './Payment'
const Stack = createNativeStackNavigator();
//  remo lash screeeee    rrrrrrrrrrrememmmmmmmmmmmmmmmmmmmbbbberrrr
// https://api.evalvue.com/
const Drawer = createDrawerNavigator();
function DrawerNavigator({ navigation }) {

    return (
           <Drawer.Navigator drawerPosition="left"
            screenOptions={{
                drawerStyle: {
                    width: mobileW * 80 / 100,
                },
            }}
            drawerContent={() => <CustomDrawer navigation={navigation} />}>
            <Drawer.Screen name='Dashboard' component={Dashboard} options={{ headerShown: false }}>
            </Drawer.Screen>
            </Drawer.Navigator>
    )
}
const Stacknav = (navigation) => {
    return (
            <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Addreview" component={Addreview} options={{ headerShown: false }} />
            <Stack.Screen name="Payment" component={Payment} options={{ headerShown: false }} />
           
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Addemployee" component={Addemployee} options={{ headerShown: false }} />
            <Stack.Screen name="Dashboard" component={DrawerNavigator} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="CustomDrawer" component={CustomDrawer} options={{ headerShown: false }} />
            <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Otp" component={Otp} options={{ headerShown: false }} />
            <Stack.Screen name="CompanyDetails" component={CompanyDetails} options={{ headerShown: false }} />
            {/* <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }} /> */}
            <Stack.Screen name="Reviewratingscreen" component={Reviewratingscreen} options={{ headerShown: false }} />
            <Stack.Screen name="Fogotpassword" component={Fogotpassword} options={{ headerShown: false }} />
            <Stack.Screen name="Employee" component={Employee} options={{ headerShown: false }} />
            <Stack.Screen name="Search" component={Search} options={{ headerShown: false }} />
            <Stack.Screen name="Organization" component={Organization} options={{ headerShown: false }} />
            <Stack.Screen name="Notification" component={Notification} options={{ headerShown: false }} />
            <Stack.Screen name="Company" component={Company} options={{ headerShown: false }} />
            <Stack.Screen name="Review" component={Review} options={{ headerShown: false }} />
            <Stack.Screen name="SliderDot" component={SliderDot} options={{ headerShown: false }} />
            {/* <Stack.Screen name="Onbording" component={Onbording} options={{ headerShown: false }} /> */}
            <Stack.Screen name="Post" component={Post} options={{ headerShown: false }} />
            <Stack.Screen name="AddOrganization" component={AddOrganization} options={{ headerShown: false }} />
          
           </Stack.Navigator>




    );
}


export default Stacknav;
// for (let i = 0; i < response.assets.length; i++) {
//     const asset = response.assets[i];
// const uri = asset.uri;
//     // setFilePath(uri);
