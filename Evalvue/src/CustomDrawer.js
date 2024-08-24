import { View, Modal, Alert, ScrollView, Text, Image, Dimensions, ImageBackground, StyleSheet, Switch, TouchableOpacity, BackHandler } from 'react-native'
import React, { useState, useRef, useEffect } from 'react';
import { Colors } from './Provider/Colorsfont';
import { localStorage } from './Provider/localStorageProvider';
import { config, msgProvider, msgText, consolepro, Lang_chg, Font, msgTitle, localimag, apifuntion, notification } from './Provider/utilslib/Utils';
const mobileW = Dimensions.get('window').width;
const mobileH = Dimensions.get('window').height;

import { DrawerActions } from '@react-navigation/native';


const CustomDrawer = ({ navigation, props }) => {
  const initial ='learner'
  const [isEnabled, setIsEnabled] = useState(initial === 'learner');
  // console.log(isEnabled,"------------------ccustom drawer!!!!!!!!!!!! > ");
  const [isEnabled1, setIsEnabled1] = useState('active1');
  const [text, setText] = useState('');
  const [ModalVisible_loguot, setModalVisible_loguot] = useState(false);
  const [getUser_Mode,setgetUser_Mode] = useState('')
  console.log(getUser_Mode,'===========> getUser_Mode ===============> getUser_Mode =================> ');


   //  clear local storage data
  const clearAsyncStorage = async () => {
    try {
      await AsyncStorage.clear();
      console.log('AsyncStorage cleared successfully!');
    } catch (error) {
      console.error('Error clearing AsyncStorage:', error);
    }
  };

  global.MyVar = 'https://aboutreact.com';

  const logOut = async () => {
    onlinStatus(false)
    await localStorage.removeItem('UID');
    // await clearAsyncStorage("");
    navigation.navigate('Login')
    
}


  // const [modalVisible_loadergif, setModalVisible_loadergif] = useState(false);



  useEffect(() => {
    getMode()
    // setTimeout(() => {
      setModalVisible_loguot(false)
    // }, 1000);

    // setTimeout(() => {
    //   setModalVisible_loadergif(false)
    //   }, 1000);
    //   SetMode();
    // setIsEnabled('learner');
    // setIsEnabled('maven');
    console.log('i am here in calling');
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, []);



  const getMode = async()=> {
    var user_Mode = await localStorage.getItemString('UserMode')
    setgetUser_Mode(user_Mode)
    console.log(user_Mode,'=============> user_Mode ==========> user_Mode ===============> ');
  
   }

  const SetMode = async (data) => {
    if (data == 'maven') {
      global.togalemode = "maven"
      console.log(data,"======>");
      await localStorage.setItemString('UserMode', data)
      setIsEnabled('maven')
    } else {
      global.togalemode = "learner"
      console.log(data,"<<======");
      await localStorage.setItemString('UserMode', data)
      setIsEnabled('learner')
    }

    // const value = await localStorage.getItemObject('user_arr');
    // console.log("Hello Maven  ==============================================================", value.userType);
    //  setuserMode(value)
  }

  const backAction = () => {

    // BackHandler.exitApp()
  };
  const onShare = async () => {
    console.log("sssss")
    try {
      const result = await Share.share({
        message: Platform.OS === "android" ?
          'https://play.google.com/store/search?q=trulinco&c=apps' :
          "https://apps.apple.com/in/app/trulinco/id1583020135",
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {

        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
        
      }
    } catch (error) {
      alert(error.message);
    }
  };

   const onlinStatus =async () =>{
var uid =await AsyncStorage.getItem('UID'); 
UpdateOnlineStatus(uid,false)
   }
  
  // const fcmToken = Firebase.auth().currentUser.fcmToken;
  // console.log('==================uid !!!!!!!!!!!!!!!!!!! hey find me i am here',uid);Y
  

  return (
    <View style={{ flex: 1, backgroundColor: Colors.white_color, width: "100%" }}>




      <View style={styles.imageCard2}>
   
      <Image style={styles.imageIcon2} resizeMode='contain' source={require('./icon/kahli.png')}></Image> 
        
       </View>
       <Text style={{textAlign:'center',marginTop:mobileW*2/100,fontSize:mobileW*4/100,color:Colors.black_color}}>Jagjeet Shingh </Text>


    
          <Text style={styles.welcome_text}>WelcomeLearnerTxt</Text>
       







      <View style={styles.underline_}></View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableOpacity activeOpacity={0.8} onPress={()=>navigation.navigate('Dashboard')}>
          <View style={styles.drawer_style}>
            <Image resizeMode='contain' style={styles.Drawer_img} source={require('./icon/home.png')}></Image>
            <Text style={styles.drawer_txt}>Home</Text>
          </View>
        </TouchableOpacity>


       <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Notification')} >
          <View style={styles.drawer_style}>
            <Image resizeMode="stretch" style={styles.Drawer_img} source={require('./icon/bell-ring.png')}></Image>
            <Text style={styles.drawer_txt}> Notification </Text>

          </View>
        </TouchableOpacity>
    


          

            <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Payment')}>
            <View style={styles.drawer_style}>
              <Image resizeMode="stretch" style={styles.Drawer_img} source={require('./icon/home.png')}></Image>
              <Text style={styles.drawer_txt}>Payment</Text>
            </View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Refund')}>
            <View style={styles.drawer_style}>
              <Image resizeMode="stretch" style={styles.Drawer_img} source={require('./icon/home.png')}></Image>
              <Text style={styles.drawer_txt}>Refund</Text>
            </View>
            </TouchableOpacity>
      

        <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Help')} >
          <View style={styles.drawer_style}>
            <Image resizeMode="stretch" style={styles.Drawer_img} source={require('./icon/help1.png')}></Image>
            <Text style={styles.drawer_txt}>Help</Text>
          </View>
        </TouchableOpacity>
      

        <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('History')}>
          <View style={styles.drawer_style}>
            <Image resizeMode="stretch" style={styles.Drawer_img} source={require('./icon/history.png')}></Image>
            <Text style={styles.drawer_txt}>History</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Feedback')}>
          <View style={styles.drawer_style}>
            <Image resizeMode="stretch" style={styles.Drawer_img} source={require('./icon/feedbacvkk.pmg.png')}></Image>
            <Text style={styles.drawer_txt}>Feedback</Text>
          </View>
        </TouchableOpacity>

       

       

        <TouchableOpacity    style={styles.drawer_style} onPress={() =>
 {logOut(),navigation.dispatch(DrawerActions.closeDrawer())
}} activeOpacity={0.8} >
          <Image resizeMode='contain' style={styles.Drawer_img} source={require('./icon/sign-out-option.png')}></Image>
          <Text style={styles.drawer_txt}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
      <View>

        <Modal animationType="slide" transparent={true}
          visible={ModalVisible_loguot}
          onRequestClose={() => {
            setModalVisible_loguot(!ModalVisible_loguot);
          }}>
          <View style={styles.modal_view}>
            <View style={styles.Modal}>
              <View style={styles.ModalHeader}>
                <Text style={styles.logout_text}>Logout</Text>
                <TouchableOpacity activeOpacity={0.8} onPress={() => setModalVisible_loguot(!ModalVisible_loguot)} >
                  <Image style={{ width: mobileW * 6 / 100, height: mobileW * 6 / 100, tintColor: Colors.color_orange }}
                  resizeMode='contain' source={require('./icon/home.png')}></Image>
                </TouchableOpacity>
              </View>
              <View style={{ width: mobileW * 90 / 100, height: mobileW * 0.2 / 100, backgroundColor: '#E7E8EA' }}></View>

              <ScrollView>

                  <View style={styles.logout_view}>
                  <Text style={styles.ask_text}>Logout</Text>
                  <View style={{ flexDirection: 'row', marginTop: mobileW * 3 / 100 }}>
                    <TouchableOpacity onPress={() => {logOut(),navigation.dispatch(DrawerActions.closeDrawer()), setModalVisible_loguot(!ModalVisible_loguot)}} activeOpacity={0.8} style={styles.yes_button}>
                      <Text style={styles.yes_text}>Yes</Text>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={0.8} onPress={() => setModalVisible_loguot(!ModalVisible_loguot)} style={[styles.yes_button, { backgroundColor: Colors.white_color }]}>
                      <Text style={[styles.yes_text, { color: Colors.themecolor }]}>No</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                
              </ScrollView>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  )
}
export default CustomDrawer
const styles = StyleSheet.create({
  imageIcon2: {
    width: mobileW * 15/ 100,
    height: mobileW * 15 / 100,
    borderRadius: mobileW * 8 / 100,
    // tintColor: Colors.themecolor,
    // marginHorizontal: mobileW * 2 / 100,
  },
  welcome_text: {
    color: Colors.white_color,
    fontFamily: Font.FontRegular,
    fontSize: mobileW * 3.3 / 100,
    marginTop: mobileW * 2 / 100,
  },
  underline_: {
    width: "100%",
    borderColor: "#E7E8EA",
    height: mobileW * 0.2 / 100,
    borderWidth: mobileW * 0.1 / 100
  },
  GIF: {
    width: mobileW * 25 / 100,
    height: mobileW * 12 / 100
  },
  logout_icon: {
    width: mobileW * 6.5 / 100,
    height: mobileW * 6.5 / 100,
    tintColor: Colors.lightgray
  },
  togglebuttonview: {
    flexDirection: "row",
    alignItems: 'center',
    width: mobileW * 54 / 100,
  },
  logout_view: {
    alignItems: 'center',
    padding: mobileW * 3 / 100
  },
  history___icon: {
    width: mobileW * 7 / 100,
    height: mobileW * 7 / 100,
    tintColor: Colors.light_grey
  },
  ToggleButton_view: {
    alignItems: 'center',
    justifyContent: 'center',
    //  width: mobileW * 13 / 100,
    //  height: mobileW * 6 / 100, 
  },
  yes_button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Colors.themecolor,
    backgroundColor: Colors.themecolor,
    width: mobileW * 15 / 100,
    height: mobileW * 7 / 100,
    borderRadius: mobileW * 1 / 100,
    borderWidth: mobileW * 0.2 / 100,
    marginHorizontal: mobileW * 1 / 100,
  },
  BACKGROUND_TOP_IMAGE: {
    width: "100%",
    alignItems: 'center',
    justifyContent: 'center',
    height: mobileH * 18 / 100,
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    //  backgroundColor:'transparent',
    //  backgroundColor:'#121A23',
    // opacity: 0.5,
  },
  maven_image: {
    width: mobileW * 6 / 100,
    height: mobileW * 6 / 100,
  },
  TOGGLE: {
    alignItems: 'center',
    justifyContent: 'center',
    width: mobileW * 13 / 100,
    height: mobileW * 6 / 100,
  },
  yes_text: {
    color: Colors.white_color,
    fontFamily: Font.FontSemiBold,
    fontSize: mobileW * 3.8 / 100,
  },
  teach_text: {
    color: Colors.black_color,
    fontFamily: Font.FontRegular,
    fontSize: mobileW * 3.2 / 100,
    marginHorizontal: mobileW * 1.5 / 100,
  },
  mavenmode_view: {
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'center',
    width: mobileW * 25 / 100,
  },
  ask_text: {
    color: Colors.blackColor,
    fontFamily: Font.FontRegular,
    fontSize: mobileW * 3.5 / 100,
  },
  userMode: {
    width: mobileW * 5.5 / 100,
    height: mobileW * 5.5 / 100,
    borderRadius: mobileW * 3 / 100,
    borderWidth: mobileW * 0.4 / 100,
  },
  modal_view: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#00000060',
  },
  drawer_image: {
    width: mobileW * 7 / 100,
    height: mobileW * 7 / 100,
    tintColor: Colors.light_grey
  },
  imageCard2: {
    alignItems: 'center',
    justifyContent: 'center',
    width: mobileW * 16 / 100,
    height: mobileW * 16 / 100,
    borderRadius: mobileW * 11 / 100,
    borderWidth: mobileW * 0.1 / 100,
    borderColor: Colors.themecolor,
    alignSelf:'center',
    marginTop:mobileW*15/100
  },
  logout_text: {
    color: Colors.black_color,
    fontFamily: Font.FontMedium,
    fontSize: mobileW * 4 / 100,
  },
  containerstyle2: {
    width: mobileW * 78 / 100,
    height: mobileW * 14 / 100,
    elevation: mobileW * 2 / 100,
    marginTop: mobileW * 1 / 100,
    shadowColor: '#000',
    justifyContent: "center",
    borderColor: Colors.gray,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, },
    shadowOpacity: 0.1,
    backgroundColor: Colors.white_color,
  },
  ImageIcon: {
    width: mobileW * 7 / 100,
    height: mobileW * 7 / 100,
    tintColor: Colors.light_grey
  },
  containerstyle: {
    width: "100%",
    alignSelf: "center",
    alignItems: 'center',
    flexDirection: "row",
    justifyContent: 'center',
    height: mobileW * 13 / 100,
    padding: mobileW * 2 / 100,
    borderRadius: mobileW * 1 / 100,
    // backgroundColor: Colors.bgcolor,
    // elevation: mobileW * 0.6 / 100,
    // shadowColor: '#000',
    // borderColor: Colors.gray,
    // shadowOpacity: 0.1,
    // shadowOffset: { width: 0, },
    // shadowOpacity: 0.1,
  },
  containerstyle_radio: {
    width: "100%",
    shadowColor: '#000',
    borderColor: Colors.gray,
    backgroundColor: Colors.bgcolor,
    padding: mobileW * 2 / 100,
    elevation: mobileW * 0.6 / 100,
    // borderRadius: mobileW * 1 / 100,
    // shadowOpacity: 0.1,
    // shadowOffset: { width: 0, },
    // shadowOpacity: 0.1,
  },
  ModalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.white_color,
    width: mobileW * 90 / 100,
    height: mobileW * 12 / 100,
    paddingLeft: mobileW * 3 / 100,
    paddingRight: mobileW * 3 / 100,
    borderTopLeftRadius: mobileW * 2 / 100,
    borderTopRightRadius: mobileW * 2 / 100,
  },
  Modal: {
    elevation: 5,
    alignSelf: 'center',
    width: mobileW * 90 / 100,
    borderRadius: mobileW * 3 / 100,
    backgroundColor: Colors.white_color,
  },
  drawer_style: {
    flexDirection: "row",
    alignItems: "center",
    padding: mobileW * 5/ 100,
    marginTop: mobileW * 0/ 100
  },
  drawer_underline: {
    width: mobileW * 79 / 100,
    height: mobileW * 0.2 / 100,
    marginLeft: mobileW * 3 / 100,
    backgroundColor: Colors.light_grey,
  },
  drawer_txt: {
    color: Colors.black_color,
    fontFamily: Font.FontRegular,
    fontSize: mobileW * 3.5 / 100,
    marginHorizontal: mobileW * 4.7 / 100,
  },
  Drawer_img: {
    tintColor: Colors.themecolor,
    width: mobileW * 4.5 / 100,
    height: mobileW * 4.5 / 100,
  },
})


















// import { View, Modal, Alert, ScrollView, Text, Image, Dimensions, ImageBackground, StyleSheet, Switch, TouchableOpacity, BackHandler } from 'react-native'
// import React, { useState, useRef, useEffect } from 'react';
// import { localStorage } from './Provider/utilslib/Utils';
// import { Colors } from './Provider/utilslib/Utils';
// import { config, msgProvider, msgText, consolepro, Lang_chg, Font, msgTitle, localimag, apifuntion, notification } from './Provider/utilslib/Utils';
// const mobileW = Dimensions.get('window').width;
// const mobileH = Dimensions.get('window').height;
// import { DrawerActions } from '@react-navigation/native';

// //  import UserMaven from './UserMaven';
// // global.userMode = ''

// const CustomDrawer = ({ navigation, props }) => {



//   useEffect(() => {
//  console.log('i am here in calling');
//     const backHandler = BackHandler.addEventListener(
//       'hardwareBackPress',
//       backAction,
//     );
//     return () => backHandler.remove();
//   }, []);






//   const backAction = () => {
//   };

//  return (
//         <View style={{ flex: 1, backgroundColor: Colors.white_color, width: "65%" }}>
//   <ImageBackground resizeMode='stretch' style={styles.BACKGROUND_TOP_IMAGE} source={require('./icon/drawer_img.png')}>

//         <View style={{padding:mobileW*3/100}}>
//         <View style={{padding:mobileW*2/100}}>
//         <Image resizeMode='stretch' style={styles.BACKGROUND_TOP_IMAGE} source={require('./icon/12.jpg')}/>
//         <Text style={{fontSize:mobileW*5/100,fontFamily:Font.FontBlack,color:Colors.black_color,marginTop:mobileW*2/100}}>GLobal Organization</Text>
//         </View>
    
      
// <TouchableOpacity style={{flexDirection:'row',marginTop:mobileW*3/100}}
//  onPress={()=>navigation.navigate('Dashboard')}>

//        <Image resizeMode="contain" style={styles.logoutImage} source={require('./icon/home.png')}/>
//        <Text style={{color:Colors.black_color,fontSize:mobileW*5/100,left:mobileW*3/100}}>Home</Text>
//        </TouchableOpacity>
//               <TouchableOpacity style={{flexDirection:'row',marginTop:mobileW*3/100}} onPress={()=>navigation.navigate('Login')}>

//         <Image resizeMode="contain" style={styles.logoutImage} source={require('./icon/help.png')}/>
//         <Text style={{color:Colors.black_color,fontSize:mobileW*5/100,left:mobileW*3/100}}>Help</Text>
//         </TouchableOpacity>
//                    <TouchableOpacity style={{flexDirection:'row',marginTop:mobileW*3/100}} onPress={()=>navigation.navigate('Login')}>

//         <Image resizeMode="contain" style={styles.logoutImage} source={require('./icon/TERMS.png')}/>
//         <Text style={{color:Colors.black_color,fontSize:mobileW*5/100,left:mobileW*3/100}}>Terms & Condition</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={{flexDirection:'row',marginTop:mobileW*3/100}} onPress={()=>navigation.navigate('Search')}>

//         <Image resizeMode="contain" style={styles.logoutImage} source={require('./icon/search.png')}/>
//        <Text style={{color:Colors.black_color,fontSize:mobileW*5/100,left:mobileW*3/100}}>Search</Text>
      
//        </TouchableOpacity>
//        <View style={{flexDirection:'row',marginTop:mobileW*3/100}}>
//         <Image resizeMode="contain" style={styles.logoutImage} source={require('./icon/setting.png')}/>
//        <Text style={{color:Colors.black_color,fontSize:mobileW*5/100,left:mobileW*3/100}}>Setting</Text>
//        </View>
    
//        <TouchableOpacity style={{flexDirection:'row',marginTop:mobileW*3/100}} onPress={()=>navigation.navigate('Login')}>
//       <Image resizeMode="contain" style={styles.logoutImage} source={require('./icon/logout.png')}/>
//        <Text style={{color:Colors.black_color,fontSize:mobileW*5/100,left:mobileW*3/100}}>Logout</Text>
     
//         </TouchableOpacity>
//         </View>
//         </ImageBackground>
//         </View>
//   )
// }
// export default CustomDrawer
// const styles = StyleSheet.create({
//   imageIcon2: {
//     width: mobileW * 12 / 100,
//     height: mobileW * 12 / 100,
//     borderRadius: mobileW * 8 / 100,
//     tintColor: Colors.themecolor,
//     // marginHorizontal: mobileW * 2 / 100,
//   },
//   BACKGROUND_TOP_IMAGE: {
//     width: mobileW*25/100,
//     alignItems: 'center',
//     justifyContent: 'center',
//     height: mobileH * 12/ 100,
//     marginTop:mobileW*5/100,
//     borderRadius:mobileW*12/100,

//     // backgroundColor: 'rgba(52, 52, 52, 0.8)',
 
//   },
//   logoutImage:{
//     width:mobileW*10/100,
//     height:mobileW*10/100,

//   }

// })


