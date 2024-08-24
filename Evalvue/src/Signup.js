import React, { useEffect, useState } from "react";
import { View, TextInput, Button, TouchableOpacity, 
  StyleSheet, Dimensions, Text, Image ,SafeAreaView,StatusBar,ImageBackground} from 'react-native';
const mobileW = Dimensions.get('window').width;
const mobileH = Dimensions.get('window').height;
const { width: mobileWidth, height: mobileHeight } = Dimensions.get('window');
import { Colors } from './Provider/Colorsfont'
import { ScrollView } from "react-native-gesture-handler";
import {Font} from './Provider/utilslib/Utils';
import DeviceInfo from 'react-native-device-info';
import axios from "axios";

  const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setname] = useState('');
  const [cpassword, setcpassword] = useState('');
  const [mobile_number, setMnumber] = useState('')
  const [shouldShow, setShouldShow] = useState(true);
  const [cshouldShow, csetShouldShow] = useState(true);
  const [Message,setMessage] = useState(true)
  useEffect(() => {
    // registration_Api()
  },[]);


  const _signupBtn = () => {
   const userData = {
    name: name,
    email: email,
    mobile_number: mobile_number,
    password: password ,
    // user_verification:true ,
    // employee_verification:false
  };

  axios.post('http://test.api.evalvue.com/create/user/', userData)
   .then(async (response) => {
        var rdata =  response
        console.log(rdata,"rdata__________________>");
        console.log('Registration successful: ________>', response.data);
      if (response.data.is_user_register_successfull == true) {
        navigation.navigate('Fogotpassword', {mobile_number: mobile_number,email:email})
      }
      else {
       alert('user not registered')
      }
      })
     .catch((error) => {
      console.log(error.response.data.error,"error");
      setMessage(error.response.data.error)
        }); 
};
return (
                                        // sunitalovanshi11@gmail.com
    // <ImageBackground source={require('../src/icon/backgroundimage.webp')} style={styles.background}>

    <View style={{ flex: 1,backgroundColor:Colors.white_color}}>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Image style={styles.backicon}
          source={require('../src/icon/back.png')} // Replace this with the path to your image
          resizeMode="contain" />
      </TouchableOpacity>
      <View style={{ flex: 1, }}>

        
        <ScrollView>
    <Image style={styles.image} source={require('../src/icon/undraw_secure_login_pdn4.png')} resizeMode="contain"/>
        <View>

          <Text style={{ fontSize: mobileWidth * 6 / 100, color: "black", left: mobileWidth * 4.1/ 100,
          marginBottom:mobileW*3/100 }}>Sign up Your Account</Text>
          <View style={styles.jobCardView}>
          <Text style={{fontSize:mobileW*4/100,color:Colors.black_color,
          padding:mobileW*2/100,left:mobileW*4/100,marginTop:mobileW*0.25/100}}>Organization Name </Text>

          <View style={{width: mobileWidth * 75 / 100, height: mobileWidth * 12 / 100, borderWidth: mobileWidth * 0.2 / 100, 
           borderRadius: mobileWidth * 20 / 100,flexDirection:'row',alignSelf:'center',
            borderColor: 'gray' ,padding:mobileWidth*0/100}}>
           <Image
          style={styles.email}
          source={require('../src/icon/teamwork.png')} 
          tintColor={Colors.themecolor}
          resizeMode="contain" 
        />
          <TextInput
            placeholderTextColor={'gray'}
            placeholder="Organization Name"
            onChangeText={(text) => setname(text)}
            value={name}
            maxLength={25}
            style={{
            width: mobileWidth * 65 / 100, 
            height: mobileWidth * 12 / 100, 
            borderWidth: mobileWidth * 0 / 100, 
            borderRadius: mobileWidth * 20 / 100,
            left:mobileW*5/100,
             borderColor: 'gray' ,
             padding:mobileWidth*0/100
            }}

          />
          </View>
          <Text style={{fontSize:mobileW*4/100,color:Colors.black_color,
          padding:mobileW*2/100,left:mobileW*4/100,marginTop:mobileW*0.25/100}}>Mobile Number</Text>
          <View style={{width: mobileWidth * 75 / 100,
           height: mobileWidth * 12 / 100,
           borderWidth: mobileWidth * 0.2 / 100, 
           borderRadius: mobileWidth * 20 / 100,
           flexDirection:'row',alignSelf:'center',
            borderColor: 'gray' ,padding:mobileWidth*0/100}}>
           <Image
          style={styles.email}
          source={require('../src/icon/phone-call.png')} 
          tintColor={Colors.themecolor}
          resizeMode="contain"/>


          <TextInput
            placeholderTextColor={'gray'}
            placeholder="Mobile number"
            onChangeText={(text) => setMnumber(text)}
            value={mobile_number}
            maxLength={10}
            keyboardType="numeric"
            // withDarkTheme
            // withShadow
            // autoFocus
          style={{ width: mobileWidth * 65 / 100, height: mobileWidth * 12 / 100, 
            borderWidth: mobileWidth * 0 / 100, borderRadius: mobileWidth * 20 / 100,left:mobileW*5/100,
             borderColor: 'gray' ,padding:mobileWidth*0/100}}

          />
          </View>



          <Text style={{fontSize:mobileW*4/100,color:Colors.black_color,
          padding:mobileW*2/100,left:mobileW*4/100,marginTop:mobileW*0.25/100}}>Email</Text>
          <View style={{width: mobileWidth * 75 / 100, height: mobileWidth * 12 / 100, borderWidth: mobileWidth * 0.2 / 100, 
           borderRadius: mobileWidth * 20 / 100,flexDirection:'row',alignSelf:'center',
            borderColor: 'gray' ,padding:mobileWidth*0/100}}>
           <Image
          style={styles.email}
          source={require('../src/icon/email(2).png')} 
          tintColor={Colors.themecolor}
          resizeMode="contain" />
            <TextInput
            placeholderTextColor={'gray'}
            placeholder="Email"
            onChangeText={(text) => setEmail(text)}
            value={email}
            // maxLength={25}
            style={{ width: mobileWidth * 65 / 100, height: mobileWidth * 12 / 100, 
            borderWidth: mobileWidth * 0 / 100, borderRadius: mobileWidth * 20 / 100,left:mobileW*5/100,
             borderColor: 'gray' ,padding:mobileWidth*0/100}}

          />
          </View>
         

          <Text style={{fontSize:mobileW*4/100,color:Colors.black_color,
          padding:mobileW*2/100,left:mobileW*4/100,marginTop:mobileW*0.25/100}}>Password</Text>
              <View style={{width: mobileWidth * 75 / 100, height: mobileWidth * 12 / 100, borderWidth: mobileWidth * 0.2 / 100, 
        borderRadius: mobileWidth * 20 / 100,flexDirection:'row',alignSelf:'center',
         borderColor: 'gray',padding:mobileWidth*0/100}}>
          
          <Image
          style={styles.email}
          tintColor={Colors.themecolor}
          source={require('../src/icon/key(1).png')} 
          resizeMode="contain"/>
       {shouldShow ?(
        <TextInput
        placeholderTextColor={'gray'}
         placeholder="Password"
         returnKeyType="next"
          onChangeText={(text) => setPassword(text)}
          value={password}
           secureTextEntry
                                               maxLength={25}
          style={{ width: mobileWidth * 65 / 100, height: mobileWidth * 12 / 100,
           borderWidth: mobileWidth * 0/ 100, borderRadius: mobileWidth * 20/ 100,left:mobileW*5/100,
           borderColor: 'gray'}}/>
           ) : 

            <TextInput
        placeholderTextColor={'gray'}
         placeholder="Password"
         returnKeyType="next"
          onChangeText={(text) => setPassword(text)}
          value={password}
          //  secureTextEntry
          maxLength={25}
          style={{ width: mobileWidth * 65 / 100, height: mobileWidth * 12 / 100,
           borderWidth: mobileWidth * 0/ 100, borderRadius: mobileWidth * 20/ 100,left:mobileW*5/100,
           borderColor: 'gray'}}/>
                       }
           



       {/* <TouchableOpacity onPress={() => setShouldShow(!shouldShow)}>
      {shouldShow?(
           <Image
          style={styles.eye}
          tintColor={Colors.themecolor}
          source={require('../src/icon/hide.png')} 
          resizeMode="contain"/>):

           <Image
          style={styles.eye}
          tintColor={Colors.themecolor}
          source={require('../src/icon/show.png')} 
          resizeMode="contain"/>
      }
          </TouchableOpacity> */}
        </View>
        <View>
        {Message ?(
      <Text style={{textAlign:'center',color:Colors.red,marginTop:mobileW*2/100}}>{Message}</Text>
        ):
   null
        }
</View>
          {/* <Text style={{fontSize:mobileW*4/100,color:Colors.black_color,
          padding:mobileW*2/100,left:mobileW*4/100,marginTop:mobileW*0.25/100}}>Confirm Password</Text> */}
         {/* <View style={{width: mobileWidth * 75 / 100, height: mobileWidth * 12 / 100, borderWidth: mobileWidth * 0.2 / 100, 
        borderRadius: mobileWidth * 20 / 100,flexDirection:'row',alignSelf:'center',
         borderColor: 'gray',padding:mobileWidth*0/100}}>
          
          <Image
          style={styles.email}
          tintColor={Colors.themecolor}
          source={require('../src/icon/key(1).png')} 
          resizeMode="contain"/>
       {cshouldShow ?(
        <TextInput
        placeholderTextColor={'gray'}
         placeholder="Confirm Password"
         returnKeyType="next"
          onChangeText={(text) => setcpassword(text)}
          value={cpassword}
           secureTextEntry
             maxLength={25}
          style={{ width: mobileWidth * 65 / 100, height: mobileWidth * 12 / 100,
           borderWidth: mobileWidth * 0/ 100, borderRadius: mobileWidth * 20/ 100,left:mobileW*5/100,
           borderColor: 'gray'}}/> ) : 

            <TextInput
        placeholderTextColor={'gray'}
         placeholder="Confirm Password"
         returnKeyType="next"
          onChangeText={(text) => setcpassword(text)}
          value={cpassword}
          //  secureTextEntry
          maxLength={25}
          style={{ width: mobileWidth * 65 / 100, height: mobileWidth * 12 / 100,
           borderWidth: mobileWidth * 0/ 100, borderRadius: mobileWidth * 20/ 100,left:mobileW*5/100,
           borderColor: 'gray'}}/>
                        }

       <TouchableOpacity onPress={() => csetShouldShow(!cshouldShow)}>
        {cshouldShow?(
           <Image
          style={styles.eye}
          tintColor={Colors.themecolor}
          source={require('../src/icon/hide.png')} 
          resizeMode="contain"/>):

           <Image
          style={styles.eye}
          tintColor={Colors.themecolor}
          source={require('../src/icon/show.png')} 
          resizeMode="contain"/>
      }
          </TouchableOpacity>
          
        </View> */}
        </View>

        </View>
        <TouchableOpacity style={styles.button} onPress={() => _signupBtn()}>
          <Text style={{ color: "white", fontSize: mobileWidth * 4.5 / 100,fontFamily:Font.FontBold,fontWeight:Font.FontBold }}>Sign Up Now</Text>
        </TouchableOpacity>
        </ScrollView>
      </View>
 
   
    </View>
    
    // </ImageBackground>
  );
};

export default SignupScreen;
const styles = StyleSheet.create({
  button: {
    width: mobileWidth * 75 / 100,
    height: mobileWidth * 12 / 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#01377d',
    borderRadius: mobileWidth * 20 / 100,
    alignSelf: "center",
    marginTop: mobileWidth * 2 / 100
   },
  email:{
    width:mobileW*5/100,
    height:mobileW*5/100,
    alignSelf:'center',
    left:mobileW*2/100
  },
  image: {
    width: mobileHeight * 52/ 100,
    height: mobileWidth * 35 / 100,
    alignSelf: "center",
    marginBottom: mobileWidth * 0/ 100
  },
  backicon: {
    width: mobileHeight * 8 / 100,
    height: mobileWidth * 10 / 100,
    marginTop: mobileWidth * 3 / 100,
  },
  background: {
    resizeMode: 'contain',
    justifyContent: 'center',
    flex: 1
  },
  jobCardView: {
		elevation:mobileW*3/100,
		// shadowColor: '#000',
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
		height:mobileW*118/100,
    alignSelf:'center',
	  },
    eye:{
      width:mobileW*5/100,
      height:mobileW*5/100,
      right:mobileW*3/100,
marginTop:mobileW*3/100
    }

})

// const _loginBtn = async() => {
//   // await localStorage.setItemString('select', select);
// console.log('Before validation');


//     //=====================All Fields Check================
//     if (isEnabled == '') {
//       msgProvider.toast(msgText.selectMode[config.language], 'center')
//       return false
//     }
//     if (fullname.length <= 0) {
//       msgProvider.toast(msgText.accountHolderName[config.language], 'center')
//       return false
//     }

//     if (fullname.length <= 2) {
//       msgProvider.toast(msgText.firstNameMinLength[config.language], 'center')
//       return false
//     }
//     //===========email============================
//     if (email.length <= 0) {
//       msgProvider.toast(msgText.emptyEmail[config.language], 'center')
//       setEmail('NA')
//       return false
//     }
//     var reg = config.emailvalidation;
//     if (reg.test(email) !== true) {
//       msgProvider.toast(msgText.validEmail[config.language], 'center')
//       setEmail('NA')
//       return false
//     }
//     //======================================mobile============================
//     if (mobile_number.length <=9) {
//       msgProvider.toast(msgText.emptyMobile[config.language], 'center')
//       return false
//     }
//     if (language.length <= 0) {
//       msgProvider.toast(msgText.ChooseLanguage[config.language], 'center')
//       return false
//     }



//     if (mobile_number.length > 13) {
//       msgProvider.toast(msgText.mobileMaxLength[config.language], 'center')
//       return false
//     }
//     // var mobilevalidation = config.mobilevalidation;
//     // if (mobilevalidation.test(mobile_number) !== true) {
//     //   msgProvider.toast(msgText.validMobile[config.language], 'center')
//     //   return false
//     // }
  
//     if (language == 'Select language*') {
//       msgProvider.toast(msgText.ChooseLanguage[config.language], 'center')
//       return false
//     }
//     if (shouldShow == false) {
//       msgProvider.toast(msgText.acceptTerms[config.language], 'center')
//       return false
//     }


//     SignUPtoFIrebase()
// // return false;
//     // setModalVisible_Gif(true)
//   console.log('After validation');
//   var dataTOSendToNextPage = {
//       // fullName: fullname,
//       email: email,
//       mobile: mobile_number,
//       countryCode: countryCode,
//       userType: isUserType,
//       firebaseToken: "",
//       deviceId: DeviceId,
//       lcid: languageId,
//       fullname:fullname
//     }

//     var dataTOSend = {
//       mobileNo: mobile_number,
//       countryCode: countryCode,
//       email: email,
//       // fullName: fullname
//     }

//     let config12 = {
//       method: 'post',
//       maxBodyLength: Infinity,
//       url: config.baseURL + 'registration/otp',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       data: dataTOSend
//     };

//     axios.request(config12)
//       .then(async (response) => {
//         console.log('-------------------------- sign up screen>>', response.data);
//         // var user_arr = response.data;
//         var otpsuccesses = response.data.ErrorCode;
//         console.log("otpsuccesses====================================", otpsuccesses);
//         var ErrorMessage = response.data.ErrorMessage;
//         if (otpsuccesses == 200) {
//           setModalVisible_Gif(false)
//           await localStorage.setItemObject('dataTOSend', dataTOSend);
//           var userId = response.data.registrationOTP._id
//           console.log('userId------>>>sign up screen ', userId);
//           // navigation.navigate('VerificationCode', { mobile_number: mobile_number, dataTOSend: dataTOSendToNextPage, isLoginScreen: false })
//           SignUPtoFIrebase(dataTOSendToNextPage)
//           navigation.navigate('VerificationCode', {mobile_number: mobile_number, dataTOSend: dataTOSendToNextPage, isLoginScreen: false})
//         }
//         else {
//           setTimeout(() => {
//             msgProvider.alert(msgTitle.information[config.language], ErrorMessage, false);
//             return false;
//            }, 2000);
//         }
//         })
//        .catch((error) => {
//         console.log(error);
//           }); }



