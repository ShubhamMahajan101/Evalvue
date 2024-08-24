// import React, { useEffect, useState } from 'react'
// import { Text, View, Image, StyleSheet, StatusBar, Dimensions, PermissionsAndroid ,ImageBackground} from 'react-native'
//  const mobileW = Dimensions.get('window').width;
// const mobileH = Dimensions.get('window').height;
//  import { config, msgProvider, localStorage, apifuntion, msgText, msgTitle,Lang_chg,
//      consolepro, Font, Colors, localimag, Currentltlg } from './Provider/utilslib/Utils';
// //  import { Message } from '@react-native-firebase/messaging'


// export default function Splash({ navigation }) {
//   useEffect(() => {
//   //  getFcmToken()
      
//       authenticateSession();
//   }, []);

 

//   const getFcmToken = async () => {
//     let fcmToken = await AsyncStorage.getItem('fcmToken')
//     console.log(fcmToken, "the old token")
//     if (!fcmToken) {
//         try {
//             const fcmToken = await messaging().getToken();
//             if (fcmToken) {
//                 console.log(fcmToken, " ----------------->  the new generate token");
//                 await AsyncStorage.setItem('fcmToken', fcmToken)

//             }

//         } catch (error) {
//             console.log(error, "--------------- > error resaid in fcmToken")
//             //  ShowError(error.message)
//         }
//     }

// }
//   const authenticateSession = async () => {
//       // ---------- For language Start -----------
//   let languagetype = await localStorage.getItemString('languagecode')
//   console.log('languagetype-------------------------------------------------------------------------------------------',languagetype);
//   if(languagetype==null){
//     config.language = 0
//   }else{
//     config.language = languagetype     
//   }
//   // ---------- For language End -----------


//      // ---------- For Onboarding Page Start -----------
//     let OnboardingPage = await localStorage.getItemString('OnboardingPage')
//     if(OnboardingPage==null){
//       setTimeout(() => {
//         navigation.navigate('Onbording')
//       }, 1500);
//     }else{
//       let OnboardingPageNav = await localStorage.getItemString('OnboardingPage')
//       if(OnboardingPageNav == 'Done'){
//         console.log('----------------+',OnboardingPage);
//   //  Highlighter For AutoLogin
//   // const get_Id = async() => {
//   //   const highlighter_DATa = await AsyncStorage.getItem('ShowHeighlights');
//   //   console.log(highlighter_DATa,'highlighter_DATa========highlighter_DATa');
//   //   setHighlihter_data(highlighter_DATa)
//   //   highlighter_Value()
//   //   }

//   //   const highlighter_Value = ()=>{
//   //     if(Highlighter_data == '')
//   //     {
//   //       setmodalhighlighter(true)
//   //      }
//   //      else
//   //      {
//   //       setmodalhighlighter(false)
//   //      }
//   //   }
//   //  Highlighter For AutoLogin



//       // ---------- For AutoLogin Start -----------
//         const uid = await AsyncStorage.getItem('UID');
//         console.log(uid,"uid SPLash screen_________________");
//         if(uid==''){
//           setTimeout(() => {
//             navigation.navigate('Login')
//           }, 1500);
//         }
//         // ---------- For AutoLogin End -----------
//       }else{
//         setTimeout(() => {
//           navigation.navigate('Onbording')
//         }, 1500);
//       }
//     }
//      // ---------- For Onboarding Page End -----------
//   }
  
//   return (
//     <View style={styles.container}>
//         {/* <ImageBackground resizeMode='contain' style={styles.backgroundImage}
//             source={require('../src/icon/welcome_four.png')}> */}
//       <StatusBar
//         hidden={false}
//         backgroundColor={Colors.themecolor}
//         translucent={false}
//         barStyle="dark-content"
//         networkActivityIndicatorVisible={true}
//       />
//      <Image style={{width:mobileW*40/100, height:mobileW*40/100}}
//       source={require('../src/icon/appicon.png.png')}></Image>
//    {/* <Text style={{fontFamily:Font.FontMediumItalic}} >{Lang_chg.splashTxt[config.language]}</Text> */}
//    {/* </ImageBackground> */}
//     </View>
//   ) 
// }
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center', 
//     backgroundColor: Colors.whiteColor
//   },
//   logo: {
//     width: mobileW,
//     height: mobileH, 
   
//   },
//   backgroundImage: {
//     width: mobileW * 50 / 100, 
//     alignSelf: 'flex-end',
//     height: mobileW * 35 / 100,
//     backgroundColor: Colors.white_color
//   },
// });

import React, { useEffect, useState } from 'react'
import { Text, View, Image, StyleSheet, StatusBar, Dimensions, PermissionsAndroid ,ImageBackground} from 'react-native'
 const mobileW = Dimensions.get('window').width;
const mobileH = Dimensions.get('window').height;
 import { config, msgProvider, localStorage, apifuntion, msgText, msgTitle,Lang_chg,
     consolepro, Font, Colors, localimag, Currentltlg } from './Provider/utilslib/Utils';
//  import { Message } from '@react-native-firebase/messaging'


export default function Splash({ navigation }) {
  useEffect(() => {
    // getFcmToken()
      
      authenticateSession();
  }, []);

 

  const getFcmToken = async () => {
    let fcmToken = await AsyncStorage.getItem('fcmToken')
    console.log(fcmToken, "the old token")
    if (!fcmToken) {
        try {
            const fcmToken = await messaging().getToken();
            if (fcmToken) {
                console.log(fcmToken, " ----------------->  the new generate token");
                await AsyncStorage.setItem('fcmToken', fcmToken)

            }

        } catch (error) {
            console.log(error, "--------------- > error resaid in fcmToken")
            //  ShowError(error.message)
        }
    }

}
  const authenticateSession = async () => {
      // ---------- For language Start -----------
  let languagetype = await localStorage.getItemString('languagecode')
  console.log('languagetype-------------------------------------------------------------------------------------------',languagetype);
  if(languagetype==null){
    config.language = 0
  }else{
    config.language = languagetype     
  }
  // ---------- For language End -----------


     // ---------- For Onboarding Page Start -----------
    let OnboardingPage = await localStorage.getItemString('OnboardingPage')
    if(OnboardingPage==null){
      setTimeout(() => {
        navigation.navigate('Onbording')
      }, 1500);
    }else{
      let OnboardingPageNav = await localStorage.getItemString('OnboardingPage')
      if(OnboardingPageNav == 'Done'){
        console.log('----------------+',OnboardingPage);
  //  Highlighter For AutoLogin
  // const get_Id = async() => {
  //   const highlighter_DATa = await AsyncStorage.getItem('ShowHeighlights');
  //   console.log(highlighter_DATa,'highlighter_DATa========highlighter_DATa');
  //   setHighlihter_data(highlighter_DATa)
  //   highlighter_Value()
  //   }

  //   const highlighter_Value = ()=>{
  //     if(Highlighter_data == '')
  //     {
  //       setmodalhighlighter(true)
  //      }
  //      else
  //      {
  //       setmodalhighlighter(false)
  //      }
  //   }
  //  Highlighter For AutoLogin



      // ---------- For AutoLogin Start -----------
        const uid = await AsyncStorage.getItem('UID');
        console.log(uid,"uid SPLash screen_________________");
        if(uid==''){
          setTimeout(() => {
            navigation.navigate('Login')
          }, 1500);
        }
        else{
          setTimeout(() => {
            navigation.navigate('Onbording')
          },1500);
        }
        //  For AutoLogin End -----------
      }else{
        setTimeout(() => {
          navigation.navigate('Onbording')
        }, 1500);
      }
    }
     // ---------- For Onboarding Page End -----------
  }
  
  return (
    <View style={styles.container}>
      <StatusBar
        hidden={false}
        backgroundColor={Colors.themecolor}
        translucent={false}
        barStyle="dark-content"
        networkActivityIndicatorVisible={true}/>
      <Image style={{width:mobileW*40/100, height:mobileW*40/100}}
      source={require('../src/icon/appicon.png.png')}/>
    </View>
  ) 
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center', 
    backgroundColor: Colors.themecolor
  },
  logo: {
    width: mobileW,
    height: mobileH, 
   
  },
});