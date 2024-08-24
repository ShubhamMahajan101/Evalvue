// import React, { Component } from 'react';
// import { Text, View, Image, TextInput, StyleSheet, ScrollView, Switch, Modal, TouchableOpacity, Dimensions, Alert, FlatList, BackHandler } from 'react-native';

// import { config, msgProvider, localStorage, apifuntion, msgText, msgTitle, Colors, mobileH, Font, mobileW , Lang_chg} from './utilslib/Utils';
// // import Icon1 from 'react-native-vector-icons/Entypo'

// const screenHeight = Math.round(Dimensions.get('window').height);
// const screenWidth = Math.round(Dimensions.get('window').width);




// let user_id = 0;
// export default class Footer extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       color: '',
//       modalVisible1: false,
//       loading: false,
//       isConnected: true,
//       newTask: false
//     }
//     BackHandler.removeEventListener('hardwareBackPress',
//       () => { return true });
//   }
//   componentDidMount() {
//     // firebaseprovider.messagecountforfooter()
//   }
//   messagecountforfooter = async () => {

//     console.log('getMyInboxAllDatagetinboxaccount');
//     userdata = await localStorage.getItemObject('user_arr')
//     //------------------------------ firbase code get user inbox ---------------
//     if (userdata != null) {
//       // alert("himanshu");
//       var id = 'u_' + userdata.user_id;
//       if (inboxoffcheck > 0) {
//       console.log('getMyInboxAllDatainboxoffcheck');
//         var queryOffinbox = firebase.database().ref('users/' + id + '/myInbox/').child(userChatIdGlobal);
//         //queryOff.off('child_added');
//         queryOffinbox.off('child_changed');
//       }

//       var queryUpdatemyinbox = firebase.database().ref('users/' + id + '/myInbox/');
//       queryUpdatemyinbox.on('child_changed', (data) => {
//         console.log('inboxkachildchange', data.toJSON())
//         //  this.showUserInbox()
//         firebaseprovider.firebaseUserGetInboxCount();
//       })
//     }
//   }
//   usercheckbtn = async (page) => {
//     this.props.functionremove
//     const navigation = this.props.navigation;
//   //  let userdata = await localStorage.getItemObject('user_arr')
//    //// let user_id = await localStorage.getItemString('user_id')
//    // console.log('userdata', userdata)
//    // console.log('user_id', user_id)
//    navigation.navigate(page)
//   }
  
//   // static contextType = Context;

  
  
//   Checkuser = async (page,index) => {
//     // console.log('Drawar Open========>>>>',page,index);
//     if (index==0) {
//     // if (page=='Menu') {
//       this.props.functionremove
//       const navigation = this.props.navigation;
//       navigation.openDrawer()
//       // navigation.closeDrawer()
//       // console.log('page========1111111111111111>>>>',page);
//       console.log('................................');
//     }
//    else if (index==1) {
//       this.props.functionremove
//       const navigation = this.props.navigation;
//       navigation.navigate('Chat',{ videourl: '', videoid:''})
//     }
//    else if (index==2) {
//       this.props.functionremove
//       const navigation = this.props.navigation;
//       navigation.navigate('Schedule',{ videourl: '', videoid:''})
//     }
//    else if (index==3) {
//       this.props.functionremove
//       const navigation = this.props.navigation;
//       navigation.navigate('UpskillingCourses',{ videourl: '', videoid:''})
//     }
//     else if (index==4) {
//       // global.dashoard_modal=true;
//       // modalVisible=true;
//       // this.setState({newTask:true})
//       // setTimeout(() => {
//       //   this.context.addNewTask(true)
//       // }, 200);
      
//     }
//  else {
//       this.usercheckbtn(page);
//     }
//   }


//   render() {
//     const navigation = this.props.navigation;
//     user_id = this.props.user_id;
//     let footerwidth = parseInt(100 / this.props.footerpage.length)
//     return (
  
//       <View style={[style1.footercontainer,{backgroundColor: this.props.imagestyle1.backgroundColor,
//          width:screenWidth*100/100,borderTopLeftRadius:mobileW*0/100,height:mobileW*14/100,
//           alignSelf:'center',
//       backgroundColor:Colors.white_color,elevation:1, shadowColor: '#000',
//       borderColor:"#E7E8EA",
//       borderWidth: mobileW * 0.1 / 100,
//       shadowOpacity: 0.1,
//       shadowOffset: { width: 0, },
//       shadowOpacity: 0.1,}]}>
//       <FlatList
//           data={this.props.footerpage}
//           //horizontal={false},backgroundColor:Colors.green_color
//           scrollEnabled={false}
//           showsVerticalScrollIndicator={false}
//           showsHorizontalScrollIndicator={false}
//           numColumns={this.props.footerpage.length}
//           keyExtractor={(item, index) => index.toString()}
//           renderItem={({ item, index }) => {
//             return (
                     
//               <View style={{ width: screenWidth * 21/ 100 , alignSelf: 'center', alignItems: 'center', height: mobileH * 6 / 100,justifyContent: 'center',right:mobileW*2/100}}>
//               {item.name == this.props.activepage ?
//                    // active part of footer...............................
//                 <TouchableOpacity activeOpacity={0.8} style={[style1.footericon]} onPress={() => { this.Checkuser(item.name,index)}}>
//                 <View style={[style1.footericonview,{borderTopColor:Colors.themecolor,borderTopWidth:0}]}>
//                 <Image source={item.activeimage} resizeMethod='resize' style={[style1.footerimage, {width: this.props.imagestyle1.width, height: this.props.imagestyle1.height,width:mobileW*5/100,height:mobileW*5/100}]} />
                   
//                       {/* <Text style={{ color: Colors.themecolor, textAlign: 'center', textAlignVertical: 'center', fontFamily: Font.FontRegular, fontSize: mobileW * 3.3 / 100, marginTop: mobileH * 0.5 / 100 }}>{index!=0?item.name:null}</Text> */}
//                       {item.countshow != true && <View style={{ position: 'absolute', top: -5, left: 20, alignItems: 'center', justifyContent: 'center' }}>
//                         {item.countshow > 0 &&
//                           <View style={{ alignSelf: 'center', width: 26, height: 18, borderRadius: 0, 
//                           backgroundColor: this.props.imagestyle1.countbackground, justifyContent: 'center',  
//                           alignContent: 'center', alignItems: 'center' }}>
//                          <Text style={{ color: this.props.imagestyle1.countcolor, textAlign: 'center',  textAlignVertical: 'center', fontFamily: Font.FontRegular, fontSize: 13,
//                              }}>{item.countshow > 9 ? '+9' : item.countshow} </Text>
//                           </View>}

//                       </View>}

//                     </View>
//                   </TouchableOpacity> 
//                   :
//                     <TouchableOpacity activeOpacity={0.8} style={[style1.footericon,]} 
//                     onPress={() => { this.Checkuser(item.name,index) }}>
//                     <View style={[style1.footericonview]}>

//                        <Image source={item.image}
//                         resizeMethod='resize' style={[style1.footerimage, {
//                         width: this.props.imagestyle1.width,
//                         height: this.props.imagestyle1.height,
//                         tintColor:index==0?Colors.themecolor:Colors.gray ,width:mobileW*6/100,height:mobileW*6/100}]} />
//                         {/* // tintColor:Colors.themecolor,marginTop:index==0?mobileW*4/100:mobileW*0/100,width:index==0?mobileW*7/100:mobileW*6/100,height:index==0?mobileW*8/100:mobileW*5/100}]} /> */}
//                              {/* {Lang_chg.WelcometoMavenow[config.language]} */}
//                       {/* <Text style={{ color: Colors.themecolor, textAlign:'center',textAlignVertical: 
//                  'center', fontFamily: Font.FontMedium, fontSize: mobileW * 3.3/ 100, marginTop: mobileH * 0.5 / 100 }}>{index!==0?item.name:null}</Text> */}
//                                     {/* {userMode == 'maven' ?Lang_chg.MavenTxt[config.language]  :Lang_chg.LearnerTxt[config.language]  */}
//                       {item.countshow != true && <View style={{ position: 'absolute', top: -5,left: 20, 
//                       alignItems: 'center', justifyContent: 'center' }}>
//                         {item.countshow > 0 &&
//                           <View style={{ alignSelf:'center', width: 26, height: 18, borderRadius: 5, 
//                           backgroundColor: this.props.imagestyle1.countbackground, justifyContent: 'center', 
//                           alignContent: 'center', alignItems:'center'}}>
//                             <Text style={{ color: this.props.imagestyle1.countcolor, textAlign: 'center', 
//                             textAlignVertical: 'center', fontFamily: Font.FontRegular, fontSize: 15,
//                              }}>{item.countshow > 9 ? '+9' : item.countshow}</Text>
//                           </View>}

//                       </View>}

//                     </View>
//                   </TouchableOpacity>

//                   //inactive part of footer----------------------------------------------
//                   // <TouchableOpacity activeOpacity={0.8} style={[style1.footericon]} onPress={() => { this.Checkuser(item.name) }}>
//                   //   <View style={style1.footericonview}>
//                   //     <Image source={item.image} resizeMethod='resize' style={[style1.footerimage, {
//                   //       width: this.props.imagestyle1.width,
//                   //       height: this.props.imagestyle1.height,
//                   //       tintColor:'#a1a2d0'
//                   //     }]} />
//                   //     {/* <Text style={{color: Colors.black_color, textAlign: 'center', textAlignVertical: 'center', fontFamily: Font.FontRegular, fontSize: mobileW * 3 / 100, marginTop: mobileH * 0.5 / 100 }}>{item.name}</Text> */}
//                   //     {item.countshow != true && <View style={{ position: 'absolute', top: -5, left: 20, alignItems: 'center', justifyContent: 'center' }}>
//                   //       {item.countshow > 0 &&
//                   //         <View style={{ alignSelf: 'center', width: 26, height: 18, borderRadius: 5, backgroundColor: this.props.imagestyle1.countbackground, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
//                   //           <Text style={{ color: this.props.imagestyle1.countcolor, textAlign: 'center', textAlignVertical: 'center', fontFamily: Font.FontRegular, fontSize: 15, }}>{item.countshow > 9 ? '+9' : item.countshow}</Text>
//                   //         </View>}

//                   //     </View>}
//                   //   </View>
//                   // </TouchableOpacity>
//                 }
//               </View>


//             )
//           }}
//         />
  
// </View>
//     )
//   }
// }
// const style1 = StyleSheet.create({
//    footercontainer: {
//     flexDirection: 'row',
//     width: screenWidth,
//     position: 'absolute',
//     elevation: 40,
//     shadowColor: '#000',
//     shadowOpacity: 0.1, 
//     shadowOffset: { width: 0, },
//     shadowColor: 'white',
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 1, height: 1 },
//     shadowOpacity: 0.15,
//     shadowColor: 'white',
//     bottom:0,
//      },
//  footericon: {
//     width: screenWidth * 17/ 100,
//     tintColor:Colors.themecolor,
//     },
//   footericonview: {
//     alignSelf: 'center',
//     paddingVertical:config.device_type=='android'? 14:18,


//   },
//   footertext: {
//     color: 'gray',
//     fontSize: 13,
//     fontFamily: Font.FontRegular,
//   },
//   footerimage: {
//     alignSelf: 'center',
//     resizeMode: 'contain',
//     backgroundColor:Colors.whiteColor

//   }

// })
import React, { Component } from 'react';
import { Text, View, Image, TextInput, StyleSheet, ScrollView, Switch, Modal, TouchableOpacity, Dimensions, Alert, FlatList, BackHandler } from 'react-native';

// import { config, msgProvider, localStorage, apifuntion, msgText,
//    msgTitle, Colors, mobileH, Font, mobileW , Lang_chg} from './utilslib/Utils';
import { config, msgProvider, localStorage, apifuntion, msgText,
   msgTitle, Colors, mobileH, Font, mobileW , Lang_chg} from './utilslib/Utils';

const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);
// import Context from '../Components/context';



let user_id = 0;
export default class Footer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      color: '',
      modalVisible1: false,
      loading: false,
      isConnected: true,
      newTask: false
    }
    BackHandler.removeEventListener('hardwareBackPress',
      () => { return true });
  }
  componentDidMount() {
    // firebaseprovider.messagecountforfooter()
  }
  messagecountforfooter = async () => {

    console.log('getMyInboxAllDatagetinboxaccount');
    userdata = await localStorage.getItemObject('user_arr')
    //------------------------------ firbase code get user inbox ---------------
    if (userdata != null) {
      // alert("himanshu");
      var id = 'u_' + userdata.user_id;
      if (inboxoffcheck > 0) {
      console.log('getMyInboxAllDatainboxoffcheck');
        var queryOffinbox = firebase.database().ref('users/' + id + '/myInbox/').child(userChatIdGlobal);
        //queryOff.off('child_added');
        queryOffinbox.off('child_changed');
      }

      var queryUpdatemyinbox = firebase.database().ref('users/' + id + '/myInbox/');
      queryUpdatemyinbox.on('child_changed', (data) => {
        console.log('inboxkachildchange', data.toJSON())
        //  this.showUserInbox()
        firebaseprovider.firebaseUserGetInboxCount();
      })
    }
  }
  usercheckbtn = async (page) => {
    this.props.functionremove
    const navigation = this.props.navigation;
  //  let userdata = await localStorage.getItemObject('user_arr')
   //// let user_id = await localStorage.getItemString('user_id')
   // console.log('userdata', userdata)
   // console.log('user_id', user_id)
   navigation.navigate(page)
  }
  
  // static contextType = Context;

  
  
  Checkuser = async (page,index) => {
    // console.log('Drawar Open========>>>>',page,index);
    if (index==0) {
    // if (page=='Menu') {
      this.props.functionremove
      const navigation = this.props.navigation;
      navigation.navigate('Dashboard')
      navigation.openDrawer()
      // navigation.closeDrawer()
      // console.log('page========1111111111111111>>>>',page);
      console.log('................................');
    }
   else if (index==1) {
      this.props.functionremove
      const navigation = this.props.navigation;
      navigation.navigate('Employee')
    }
   else if (index==2) {
      this.props.functionremove
      const navigation = this.props.navigation;
      navigation.navigate('Post')
    }
   else if (index==3) {
      this.props.functionremove
      const navigation = this.props.navigation;
      navigation.navigate('Notification')
    }
    else if (index==4) {
      this.props.functionremove
      const navigation = this.props.navigation;
      navigation.navigate('Organization')
      
    }
 else {
      this.usercheckbtn(page);
    }
  }


  render() {
    const navigation = this.props.navigation;
    user_id = this.props.user_id;
    let footerwidth = parseInt(100 / this.props.footerpage.length)
    return (
  
      <View style={[style1.footercontainer,{backgroundColor: this.props.imagestyle1.backgroundColor, width:screenWidth*100/100,borderTopLeftRadius:mobileW*0/100,height:mobileW*14/100, alignSelf:'center',backgroundColor:Colors.white_color,elevation:1, shadowColor: '#000',
      borderColor:"#E7E8EA",
      borderWidth: mobileW * 0.1 / 100,
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, },
      shadowOpacity: 0.1,}]}>
      <FlatList
          data={this.props.footerpage}
          //horizontal={false},backgroundColor:Colors.green_color
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          numColumns={this.props.footerpage.length}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => {
            return (
                     
              <View style={{ width: screenWidth * 21/ 100 , alignSelf: 'center', alignItems: 'center', height: mobileH * 6 / 100,justifyContent: 'center',right:mobileW*2/100}}>
              {item.name == this.props.activepage ?
                   // active part of footer...............................
                <TouchableOpacity activeOpacity={0.8} style={[style1.footericon]} onPress={() => { this.Checkuser(item.name,index)}}>
                <View style={[style1.footericonview,{borderTopColor:Colors.themecolor,borderTopWidth:0}]}>
                <Image source={item.activeimage} resizeMethod='resize' style={[style1.footerimage, {width: this.props.imagestyle1.width, height: this.props.imagestyle1.height,width:mobileW*6/100,height:mobileW*6/100}]} />
                   <Text>jhhhhh</Text>
                      {/* <Text style={{ color: Colors.themecolor, textAlign: 'center', textAlignVertical: 'center', fontFamily: Font.FontRegular, fontSize: mobileW * 3.3 / 100, marginTop: mobileH * 0.5 / 100 }}>{index!=0?item.name:null}</Text> */}
                      {item.countshow != true && <View style={{ position: 'absolute', top: -5, left: 20, alignItems: 'center', justifyContent: 'center' }}>
                        {item.countshow > 0 &&
                          <View style={{ alignSelf: 'center', width: 26, height: 18, borderRadius: 0, 
                          backgroundColor: this.props.imagestyle1.countbackground, justifyContent: 'center',  
                          alignContent: 'center', alignItems: 'center' }}>
                         <Text style={{ color: this.props.imagestyle1.countcolor, textAlign: 'center',  textAlignVertical: 'center', fontFamily: Font.FontRegular, 
                         fontSize: 13,}}>{item.countshow > 9 ? '+9' : item.countshow} </Text>
                          </View>}

                      </View>}

                    </View>
                  </TouchableOpacity> 
                  :
                    <TouchableOpacity activeOpacity={0.8} style={[style1.footericon,]} 
                    onPress={() => { this.Checkuser(item.name,index) }}>
                    <View style={[style1.footericonview]}>

                       <Image source={item.image}
                        resizeMethod='resize' style={[style1.footerimage, {
                        width: this.props.imagestyle1.width,
                        height: this.props.imagestyle1.height,
 width:mobileW*6/100,height:mobileW*6/100}]} />
                        {/* // tintColor:Colors.themecolor,marginTop:index==0?mobileW*4/100:mobileW*0/100,width:index==0?mobileW*7/100:mobileW*6/100,height:index==0?mobileW*8/100:mobileW*5/100}]} /> */}
                             {/* {Lang_chg.WelcometoMavenow[config.language]} */}
                      {/* <Text style={{ color: Colors.themecolor, textAlign:'center',textAlignVertical: 
                 'center', fontFamily: Font.FontMedium, fontSize: mobileW * 3.3/ 100, marginTop: mobileH * 0.5 / 100 }}>{index!==0?item.name:null}</Text> */}
                                    {/* {userMode == 'maven' ?Lang_chg.MavenTxt[config.language]  :Lang_chg.LearnerTxt[config.language]  */}
                      {item.countshow != true && <View style={{ position: 'absolute', top: -5,left: 20, 
                      alignItems: 'center', justifyContent: 'center' }}>
                        {item.countshow > 0 &&
                          <View style={{ alignSelf:'center', width: 26, height: 18, borderRadius: 5, 
                          backgroundColor: this.props.imagestyle1.countbackground, justifyContent: 'center', 
                          alignContent: 'center', alignItems:'center'}}>
                            <Text style={{ color: this.props.imagestyle1.countcolor, textAlign: 'center', 
                            textAlignVertical: 'center', fontFamily: Font.FontRegular, fontSize: 15,
                             }}>{item.countshow > 9 ? '+9' : item.countshow}</Text>
                          </View>}

                      </View>}

                    </View>
                  </TouchableOpacity>

                  //inactive part of footer----------------------------------------------
                  // <TouchableOpacity activeOpacity={0.8} style={[style1.footericon]} onPress={() => { this.Checkuser(item.name) }}>
                  //   <View style={style1.footericonview}>
                  //     <Image source={item.image} resizeMethod='resize' style={[style1.footerimage, {
                  //       width: this.props.imagestyle1.width,
                  //       height: this.props.imagestyle1.height,
                  //       tintColor:'#a1a2d0'
                  //     }]} />
                  //     {/* <Text style={{color: Colors.black_color, textAlign: 'center', textAlignVertical: 'center', fontFamily: Font.FontRegular, fontSize: mobileW * 3 / 100, marginTop: mobileH * 0.5 / 100 }}>{item.name}</Text> */}
                  //     {item.countshow != true && <View style={{ position: 'absolute', top: -5, left: 20, alignItems: 'center', justifyContent: 'center' }}>
                  //       {item.countshow > 0 &&
                  //         <View style={{ alignSelf: 'center', width: 26, height: 18, borderRadius: 5, backgroundColor: this.props.imagestyle1.countbackground, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                  //           <Text style={{ color: this.props.imagestyle1.countcolor, textAlign: 'center', textAlignVertical: 'center', fontFamily: Font.FontRegular, fontSize: 15, }}>{item.countshow > 9 ? '+9' : item.countshow}</Text>
                  //         </View>}

                  //     </View>}
                  //   </View>
                  // </TouchableOpacity>
                }
              </View>


            )
          }}
        />
  
</View>
    )
  }
}
const style1 = StyleSheet.create({

  footercontainer: {
    flexDirection: 'row',
    width: screenWidth,
    position: 'absolute',
    elevation: 40,
    shadowColor: '#000',
    shadowOpacity: 0.1, 
    shadowOffset: { width: 0, },
    shadowColor: 'white',
    shadowOpacity: 0.1,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.15,
    shadowColor: 'white',
    bottom:0,
   
  },
  footericon: {
    width: screenWidth * 17/ 100,
    tintColor:Colors.themecolor,
    },
  footericonview: {
    alignSelf: 'center',
    paddingVertical:config.device_type=='android'? 14:18,
    marginTop:mobileW*2/100
 },
  footertext: {
    color: 'gray',
    fontSize: 13,
    fontFamily: Font.FontRegular,
  },
  footerimage: {
    alignSelf: 'center',
    resizeMode: 'contain',
    tintColor:Colors.themecolor    // backgroundColor:Colors.whiteColor

  }

})