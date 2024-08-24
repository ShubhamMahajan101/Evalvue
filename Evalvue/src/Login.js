import React, { useState, useEffect } from 'react';
import axios from "axios";
import { View, TextInput, Button, TouchableOpacity, StyleSheet, Dimensions, Text, Image, SafeAreaView, StatusBar } from 'react-native';
const mobileW = Dimensions.get('window').width;
const mobileH = Dimensions.get('window').height;
const { width: mobileWidth, height: mobileHeight } = Dimensions.get('window');
import { Colors } from './Provider/Colorsfont'
import { config, msgProvider, msgText, consolepro, Lang_chg, Font, localStorage, msgTitle, localimag, apifuntion, notification }
 from './Provider/utilslib/Utils';
 import AsyncStorage from '@react-native-async-storage/async-storage';
import { log } from 'react-native-reanimated';
const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  console.log(email, ".........email");
  const [password, setPassword] = useState('');
  console.log(password, "password,,,,,,,,,,,");
  const [shouldShow, setShouldShow] = useState(true);
  const [Message, setMessage] = useState('')
  console.log(Message, "Message-----------> Login screen");
  const [usertoken,setusertoken] = useState('');
  console.log(usertoken,"usertoken=============> here ");
  const [userid,setuserid] = useState('')
  console.log(userid,"!!!!!!!!!!!!!! userid login screen  !!!!!!!!!!!!!!!!!! ");

 

     const clearAllData = async () => {
      try {
        const user_token = await AsyncStorage.getItem('user_token')
          console.log(user_token," Logintokem!!!!!!!!!!!!!!!!!!! lgin screen user_token>>>>>>>>>> login screen",user_token);
        await AsyncStorage.clear(user_token);
        console.log('AsyncStorage Cleared Successfully.');
      } catch (error) {
        console.error('Error clearing AsyncStorage:', error);
      }
    };
  const _loginApiCalling = () => {

 const userData = {
      email: email,
      password: password
      
    };
    if (email.length > 0 & password.length > 0) {
      axios.post('http://test.api.evalvue.com/login/user/', userData)
       .then(async (response) => {
          console.log(response, "response login screen ");
          console.log('login screen response data : = =====>>>', response.data);
          console.log('login screen response user id ====> !! : = =====>>>', response.data.user_id);
          var userid = response.data.user_id;
          console.log(userid,".................................> login screennnnnnnnnnnnnnnnnn");
          //  setuserid(User_id)
           await AsyncStorage.setItem( 'userid', userid.toString());
          var usertoken = response.data.access
          console.log(usertoken,"token__________>");
          // setusertoken(token)
           await AsyncStorage.setItem('user_token', usertoken);
          
          if (response.data.is_login_successfull && response.data.is_user_verified == true) {
            // navigation.navigate('CompanyDetails')
            navigation.navigate('CompanyDetails',{user_id:userid})
            // navigation.navigate('AddOrganization')
            
                           }
          else {
            navigation.navigate('Otp')
          }
        })
        .catch((error) => {
          console.log(error.response.data.error, "error");
          setMessage(error.response.data.error)

        });
    }
    else {
      setMessage("All Field required")
    }
  }
  useEffect(() => {
  

    clearAllData();
    
    
     }, [])

  return (
    <View style={{ flex: 1, backgroundColor: Colors.white_color }}>
      <SafeAreaView style={{ flex: 0.9, justifyContent: 'center', alignSelf: 'center', alignItems: 'center' }}>
        <StatusBar barStyle="dark-content" hidden={false} backgroundColor={Colors.themecolor} />
        <Image style={styles.image} source={require('../src/icon/undraw_secure_login_pdn4.png')} resizeMode="contain" />
        <Text style={{
          fontSize: mobileW * 5 / 100, color: Colors.black_color, fontFamily: Font.FontBold,
          right: mobileW * 32 / 100, marginBottom: mobileW * 2 / 100
        }}>Login Here !!</Text>
        <View style={styles.jobCardView}>
          <Text style={{ fontSize: mobileW * 4 / 100, color: Colors.black_color, padding: mobileW * 2 / 100, left: mobileW * 3.5 / 100 }}>Email</Text>
          <View style={{
            width: mobileWidth * 75 / 100, height: mobileWidth * 12 / 100, borderWidth: mobileWidth * 0.2 / 100,
            borderRadius: mobileWidth * 20 / 100, flexDirection: 'row', alignSelf: 'center',
            borderColor: 'gray', padding: mobileWidth * 0 / 100
          }}>
            <Image style={styles.email}
              source={require('../src/icon/email(2).png')} tintColor={Colors.themecolor} resizeMode="contain" />
            <TextInput
              placeholderTextColor={'gray'}
              placeholder="Email"
              onChangeText={(text) => setEmail(text)}
              value={email}
              maxLength={45}
              style={{
                width: mobileWidth * 68 / 100, height: mobileWidth * 12 / 100,
                borderWidth: mobileWidth * 0 / 100, borderRadius: mobileWidth * 20 / 100, left: mobileW * 5 / 100,
                borderColor: 'gray', padding: mobileWidth * 0 / 100
              }}

            />
          </View>
<Text style={{ fontSize: mobileW * 4 / 100, color: Colors.black_color, padding: mobileW * 2 / 100, left: mobileW * 3.5 / 100, marginTop: mobileW * 3 / 100 }}>Password</Text>
<View style={{
            width: mobileWidth * 75 / 100, height: mobileWidth * 12 / 100, borderWidth: mobileWidth * 0.2 / 100,
            borderRadius: mobileWidth * 20 / 100, flexDirection: 'row', alignSelf: 'center', borderColor: 'gray', padding: mobileWidth * 0 / 100
          }}>

        <Image style={styles.email} tintColor={Colors.themecolor}source={require('../src/icon/key(1).png')}resizeMode="contain" />
            {shouldShow ? (
              <TextInput
                placeholderTextColor={'gray'}
                placeholder="Password"
                returnKeyType="next"
                onChangeText={(text) => setPassword(text)}
                value={password}
                secureTextEntry
                maxLength={25}
                style={{
                  width: mobileWidth * 65 / 100, height: mobileWidth * 12 / 100,
                  borderWidth: mobileWidth * 0 / 100, borderRadius: mobileWidth * 20 / 100, left: mobileW * 5 / 100,
                  borderColor: 'gray'
                }} />) :

              <TextInput
                placeholderTextColor={'gray'}
                placeholder="Password"
                returnKeyType="next"
                onChangeText={(text) => setPassword(text)}
                value={password}
                maxLength={25}
                style={{
                  width: mobileWidth * 65 / 100, height: mobileWidth * 12 / 100,
                  borderWidth: mobileWidth * 0 / 100, borderRadius: mobileWidth * 20 / 100, left: mobileW * 5 / 100, borderColor: 'gray'
                }} />
            }
            <TouchableOpacity onPress={() => setShouldShow(!shouldShow)}>
              {shouldShow ? (
                <Image style={styles.eye} tintColor={Colors.themecolor} source={require('../src/icon/hide.png')}
                  resizeMode="contain" />) :

                <Image style={styles.eye} tintColor={Colors.themecolor} source={require('../src/icon/show.png')} resizeMode="contain" />
              }
            </TouchableOpacity>
          </View>

          {Message ? (
            <Text style={{ textAlign: 'center', color: Colors.red, marginTop: mobileW * 2 / 100 }}>{Message}</Text>
          ) :
            null
          }
          <TouchableOpacity onPress={() => navigation.navigate('Fogotpassword')}>
            <Text style={{ color: '#01377d', fontSize: mobileWidth * 4 / 100, marginTop: mobileWidth * 3 / 100, textAlign: "right", right: mobileW * 4.1 / 100 }}>Forgot Password ?</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => _loginApiCalling()}>
          {/* <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CompanyDetails')}> */}
            <Text style={{ color: "white", fontSize: mobileWidth * 5 / 100 }}>Login</Text>
          </TouchableOpacity>
          <View style={{ flexDirection: "row", marginTop: mobileWidth * 8 / 100, justifyContent: "center", left: mobileW * 11 / 100 }}>
            <Text style={{ color: 'black', fontSize: mobileWidth * 3.5 / 100, }}>Don't have an account ?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
              <Text style={{ color: '#01377d', fontSize: mobileWidth * 4 / 100 }}> Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default LoginScreen;
const styles = StyleSheet.create({
  button: {
    width: mobileWidth * 75 / 100,
    height: mobileWidth * 11 / 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.themecolor,
    borderRadius: mobileWidth * 20 / 100,
    alignSelf: "center",
    marginTop: mobileWidth * 5 / 100
  },
  image: {
    width: mobileHeight * 48 / 100,
    height: mobileWidth * 55 / 100,
    alignSelf: "center",
    marginBottom: mobileWidth * 0 / 100
  },
  jobCardView: {
    elevation: 3,
    shadowColor: '#000',
    borderColor: "#e8edfb",
    borderWidth: 1,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, },
    width: mobileW * 90 / 100,
    padding: mobileW * 2 / 100,
    marginRight: mobileW * 1 / 100,
    borderRadius: mobileW * 2 / 100,
    marginBottom: mobileW * 2 / 100,
    backgroundColor: Colors.white_color,
    height: mobileW * 95 / 100,
  },
  email: {
    width: mobileW * 5 / 100,
    height: mobileW * 5 / 100,
    alignSelf: 'center',
    left: mobileW * 2 / 100
  },
  eye: {
    width: mobileW * 5 / 100,
    height: mobileW * 5 / 100,
    right: mobileW * 3 / 100,
    marginTop: mobileW * 3 / 100
  }
})




