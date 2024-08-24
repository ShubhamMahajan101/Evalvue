import React, { useState, useEffect } from 'react';
import axios from "axios";
import { AsyncStorage, ToastAndroid } from 'react-native';
import { View, TextInput, Button, TouchableOpacity, StyleSheet, Dimensions, Text, Image, SafeAreaView, StatusBar } from 'react-native';
const mobileW = Dimensions.get('window').width;
const mobileH = Dimensions.get('window').height;
const { width: mobileWidth, height: mobileHeight } = Dimensions.get('window');
import {
  config, msgProvider, msgText, consolepro, Lang_chg, Font,
  msgTitle, localimag, apifuntion, notification
} from './Provider/utilslib/Utils';
import { Colors } from './Provider/Colorsfont'
import { useFocusEffect } from '@react-navigation/native';


const Fogotpassword = ({ navigation }) => {
  const [email, setEmail] = useState('');
  console.log(email, ".........email");
  const [password, setPassword] = useState('');
  console.log(password, "password,,,,,,,,,,,");
  const [shouldShow, setShouldShow] = useState(true);
  const [otp, setotp] = useState(false)
  const [useremail, setUserName] = useState()
  console.log(useremail, "useremail");
  const [Message, setMessage] = useState(true)
  const [userid,setuserid] = useState()
  console.log(userid,"____________> user id mail screen  ");
  useEffect(() => {
    // userNameHere()
  }, [])
  // const userNameHere = async () => {
  //   // const UserName = await AsyncStorage.getItem('UserName')
  //   const User_email = await AsyncStorage.getItem('email');
  //   console.log("User_email", User_email);
  //   setUserName(User_email)

  // }
  // const _loginApiCalling = () => {
  //   if (email.length <= 0) {
  //     msgProvider.toast(msgText.emptyEmail[config.language], 'bottom')
  //     return false
  //   }
  //   var reg = config.emailvalidation;
  //   if (reg.test(email) !== true) {
  //     msgProvider.toast(msgText.validEmail[config.language], 'center')
  //     setEmail('NA')
  //     return false
  //   }
  //   navigation.navigate('CompanyDetails')
  // }
  const _loginApiCalling = () => {

    const userData = {
      email: email,
      user_verification:true ,
      employee_verification:false
    };

       axios.post('http://test.api.evalvue.com/shoot/otp/', userData)
      .then(async (response) => {
        var data =  response
        console.log(data.user_id,"________> data_user_id");
        console.log(' mail screen Registration successful: = =====>>>', response.data.error);
        console.log('    mail screen response.data.otp_send_successfull: = =====>>>', response.data.otp_send_successfull);
        setuserid(response.data.user_id)

        setMessage(response.data.error)
        if (response.data.otp_send_successfull == true) {
          // await AsyncStorage.setItem('email', email);
          navigation.navigate('Otp',{user_id:userid ,email:email})
        }
        else {
        ('Otp not get yet!!!!')
        }
      })
      .catch((error) => {
        console.log(error.response.data.error, "error");
        
      });
  };





  return (
    <View style={{ flex: 1, backgroundColor: Colors.white_color }}>
      <SafeAreaView style={{ flex: 0.9, }}>
        <StatusBar barStyle="dark-content" hidden={false} backgroundColor={Colors.themecolor} />
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Image style={styles.backicon}
            source={require('../src/icon/back.png')} // Replace this with the path to your image
            resizeMode="contain" />
        </TouchableOpacity>
        <Image style={styles.image}
          source={require('../src/icon/undraw_secure_login_pdn4.png')} resizeMode="contain" />


        <View style={styles.jobCardView}>
          <Text style={{ fontSize: mobileW * 4 / 100, color: Colors.black_color, padding: mobileW * 2 / 100, left: mobileW * 3.5 / 100 }}>Email</Text>
          <View style={{
            width: mobileWidth * 75 / 100, height: mobileWidth * 12 / 100, borderWidth: mobileWidth * 0.2 / 100,
            borderRadius: mobileWidth * 20 / 100, flexDirection: 'row', alignSelf: 'center',
            borderColor: 'gray', padding: mobileWidth * 0 / 100
          }}>
            <Image
              style={styles.email}
              source={require('../src/icon/email(2).png')}
              tintColor={Colors.themecolor}
              resizeMode="contain"
            />
            <TextInput
              placeholderTextColor={'gray'}
              placeholder="Email"
              onChangeText={(text) => setEmail(text)}
              value={email}
    
              style={{
                width: mobileWidth * 65 / 100, height: mobileWidth * 12 / 100,
                borderWidth: mobileWidth * 0 / 100, borderRadius: mobileWidth * 20 / 100, left: mobileW * 5 / 100,
                borderColor: 'gray', padding: mobileWidth * 0 / 100
              }}

            />
          </View>

          {Message ? (
            <Text style={{ textAlign: 'center', color: Colors.red, marginTop: mobileW * 2 / 100 }}>{Message}</Text>
          ) :
            null
          }
          <TouchableOpacity style={styles.button} onPress={() => _loginApiCalling()}>
            <Text style={{ color: "white", fontSize: mobileWidth * 5 / 100 }}>Send Otp</Text>
          </TouchableOpacity>

        </View>
        {/* </View> */}
      </SafeAreaView>
    </View>
  );
};

export default Fogotpassword;
const styles = StyleSheet.create({
  button: {
    width: mobileWidth * 75 / 100,
    height: mobileWidth * 11 / 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.themecolor,
    borderRadius: mobileWidth * 20 / 100,
    alignSelf: "center",
    marginTop: mobileWidth * 10 / 100
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
    height: mobileW * 80 / 100,
    alignSelf: 'center',
    justifyContent: 'center',
    // alignItems:'center'
  },
  backicon: {
    width: mobileHeight * 8 / 100,
    height: mobileWidth * 10 / 100,
    marginTop: mobileWidth * 3 / 100,
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

