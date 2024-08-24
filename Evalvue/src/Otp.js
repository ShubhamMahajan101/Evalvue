import { View, Text, StatusBar, Modal, Alert, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors } from './Provider/Colorsfont';
import OTPInputView from '@twotalltotems/react-native-otp-input'
import CountDownTimer from 'react-native-countdown-timer-hooks';
import { localStorage } from './Provider/utilslib/Utils';
import axios from "axios";
import {
  config, msgProvider, msgText, consolepro, Lang_chg, Font, msgTitle, localimag,
  apifuntion, notification
} from './Provider/utilslib/Utils';

const mobileW = Dimensions.get('window').width;
const mobileH = Dimensions.get('window').height;


const Otp = ({ navigation, route }) => {
  // const otpdata = route.paramas
  const user_id = route.params.user_id;
  console.log("user_id________________>", user_id, "<_____________________user_id");
  const email = route.params.email;
  const refTimer = useRef();
  const [timerEnd, setTimerEnd] = useState(false);
  const [OTP, setOTP] = useState('');
  console.log(OTP, "______> OTP number is here .................");
  const [DeviceId, setDeviceId] = useState('');
  const [useremail, setUserName] = useState()
  console.log(useremail, "useremail");
  const [userid, setuserid] = useState()
  console.log(userid, "____________> otp_user id ");
  const [Message, setMessage] = useState('')
  console.log(Message, "Message__________________> otp screen ");

  const _VerifyOtp = () => {
    const userData = {
      email: email,
      user_id: user_id,
      otp_number: OTP,
      user_verification:true ,
      employee_verification:false

    };
    axios.post('http://test.api.evalvue.com/verify/otp/', userData)
      .then(async (response) => {
        // console.log(response,"response_____________________________>");
        // console.log(' otp successful________________>', response.data);
        console.log('response.data.otp_verified_successfull________________>', response.data.otp_verified_successfull);
        console.log(' response.data.is_email_verified_successfull________________>', response.data);
        // if (response.data.otp_verified_successfull && is_email_verified_successfull == true) {
        if (response.data.otp_verified_successfull == true) {
          navigation.navigate('Login')
        }

        else {
          setMessage("otp is not verified")
        }

        if (response.data.otp_is_expired == true) {
          setMessage("Otp is expired")
        }
        else {
          console.log('Otp Not verrified!!!!')
        }
      })
      .catch((error) => {
        console.log(error.response.data.error, "error");
        setMessage(error.response.data.error)
      });
  }

  const resend_otp = () => {
    const userData = {
      email: useremail,
      user_verification:true ,
      employee_verification:false

    };

    axios.post('https://api.evalvue.com/shoot/otp/', userData)
      .then(async (response) => {
        console.log('Registration successful: = =====>>>', response.data);
        setuserid(response.data.user_id)
        if (response.data.otp_send_successfull == false) {
          navigation.navigate('Login')
        }
        else {
          alert('Otp not get yet!!!!')
        }
      })
      .catch((error) => {
        console.log(error, "error!!");
      });
  };
  const timerCallbackFunc = (timerFlag) => {
    setTimeout(() => {
    setTimerEnd(timerFlag);
    }, 2000);
    setTimerEnd(timerFlag);
    console.warn('You can alert the user by letting him know that Timer is out.',);
  };
  return (

        <View style={{ flex: 1, backgroundColor: Colors.white_color }}>
        <SafeAreaView style={styles.SafeAreaView}>
        <StatusBar barStyle="light-content" hidden={false} backgroundColor={Colors.themecolor} />
        <View style={styles.header_View}>
        <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.goBack()}>
        <Image style={styles.backicon} source={require('../src/icon/back.png')} resizeMode="contain" />
        </TouchableOpacity>
        </View>
        <View style={{ justifyContent: 'center', alignSelf: 'center', marginTop: mobileW * 12 / 100 }}>
          <Image style={styles.image} source={require('../src/icon/undraw_secure_login_pdn4.png')} resizeMode="contain" />
          <Text style={styles.loginText}>Verification Code</Text>

        </View>
        {/* ===========>  OTP VERIFICATION  */}
        <View style={{ alignItems: "center", }}>
          <OTPInputView
            style={styles.otp_view}
            pinCount={6}
            autoFocusOnLoad={false}
            codeInputFieldStyle={styles.underlineStyleBase}
            codeInputHighlightStyle={styles.underlineStyleHighLighted}
            onCodeFilled={(code => setOTP(code))} />
        </View>

        {Message ? (
          <Text style={{ textAlign: 'center', color: Colors.red, marginTop: mobileW * 2 / 100 }}>{Message}</Text>
        ) :
          null}
        {/* =========> VERIFY OTP Button  */}
        <TouchableOpacity activeOpacity={0.8} onPress={() => { _VerifyOtp() }} style={styles.button}>
          <Text style={styles.verifyotp_text}>Verify Otp</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', marginTop: mobileW * 2 / 100, justifyContent: 'center', alignItems: 'center', display: timerEnd ? 'none' : 'flex' }}>
          <Text style={styles.remaining_text}>Remaining </Text>

          {/* > Time CountDownTimer */}
          <View>
            <CountDownTimer
              ref={refTimer}
              timestamp={120}
              timerCallback={timerCallbackFunc}
              containerStyle={{ justifyContent: 'center', alignItems: 'center', borderRadius: 35, color: "black" }} textStyle={{ color: 'black', fontWeight: 'bold', letterSpacing: 0.25, }} />
          </View>
        </View>
        <View style={{ display: timerEnd ? 'flex' : 'none', marginTop: mobileW * 3 / 100, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', alignSelf: 'center', }}>
          <TouchableOpacity onPress={() => { resend_otp() }}>
         <Text style={styles.resendotp_txt}>Resend Otp</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  )
}

export default Otp
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header_View: {
    width: mobileW,
    justifyContent: 'center',
    height: mobileW * 15 / 100,
    paddingHorizontal: mobileW * 6 / 100,
  },
  otp_view: {
    width: '75%',
    height: mobileW * 30 / 100,
  },
  backicon: {
    width: mobileH * 8 / 100,
    height: mobileW * 10 / 100,
    marginTop: mobileW * 3 / 100,
  },
  verifyotp_text: {
    fontSize: mobileW * 4 / 100,
    color: Colors.white_color,
    fontFamily: Font.FontSemiBold
  },
  backIcon: {
    width: mobileW * 3 / 100,
    height: mobileW * 6 / 100,
    tintColor: Colors.white_color
  },
  backIcon_: {
    width: mobileW * 6 / 100,
    height: mobileW * 6 / 100,
  },
  gif_view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00000096'
  },
  gif_image: {
    width: mobileW * 25 / 100,
    height: mobileW * 12 / 100
  },
  mavenowLogo: {
    alignSelf: 'center',
    width: mobileW * 70 / 100,
    height: mobileW * 18 / 100,
    marginTop: mobileW * 3 / 100,
  },
  image: {
    width: mobileH * 52 / 100,
    height: mobileW * 35 / 100,
    alignSelf: "center",
    marginBottom: mobileW * 0 / 100
  },
  loginText: {
    alignSelf: "center",
    color: Colors.black_color,
    fontFamily: Font.FontMedium,
    marginTop: mobileW * 2 / 100,
    fontSize: mobileW * 5 / 100,

  },
  cardView: {
    width: mobileW,
    height: "77%",
    backgroundColor: Colors.whiteColor,
    paddingLeft: mobileW * 8 / 100,
    paddingRight: mobileW * 8 / 100,
    borderTopLeftRadius: mobileW * 10 / 100
  },
  remaining_text: {
    color: Colors.gray,
    fontFamily: Font.FontRegular,
    fontSize: mobileW * 3 / 100
  },
  topText: {
    color: Colors.gray,
    fontFamily: Font.FontRegular,
    fontSize: mobileW * 3.2 / 100,
  },
  LoginView: {
    alignSelf: "center",
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.themecolor,
    elevation: 1,
    shadowOpacity: 0.1,
    shadowColor: '#000',
    borderColor: "#e8edfb",
    shadowOffset: { width: 0, },
    width: mobileW * 88 / 100,
    height: mobileW * 12.6 / 100,
    borderRadius: mobileW * 1 / 100,
  },
  underlineStyleBase: {
    width: mobileW * 11 / 100,
    fontSize: mobileW * 5 / 100,
    height: mobileW * 12.8 / 100,
    borderRadius: mobileW * 3 / 100,
    color: Colors.black_color,
    fontFamily: Font.FontBold,
    backgroundColor: '#EFF2F1',
    fontFamily: Font.FontRegular,
    padding: mobileW * 2 / 100
  },
  otp_view: {
    width: '75%',
    height: mobileW * 30 / 100,
  },
  underlineStyleHighLighted: {
    // borderColor: Colors.themecolor,
    // elevation:5, backgroundColor:"white"
  },
  SafeAreaView: {
    flex: 1,
    backgroundColor: Colors.white_color
  },
  backicon_touch: {
    width: mobileW,
    height: "23%",
    padding: mobileW * 3 / 100,
  },
  resendotp_txt: {
    color: Colors.themecolor,
    fontFamily: Font.FontBold,
    fontFamily: Font.FontExtraBold,
    fontSize: mobileW * 4.5 / 100,
    marginTop: mobileW * 0.7 / 100,
  },
  button: {
    width: mobileW * 75 / 100,
    height: mobileW * 11 / 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.themecolor,
    borderRadius: mobileW * 20 / 100,
    alignSelf: "center",
    marginTop: mobileW * 5 / 100
  },

})






