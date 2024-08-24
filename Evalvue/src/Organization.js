import { ActivityIndicator, View, StatusBar, Text, StyleSheet, Dimensions, TouchableOpacity, Image, Modal, Alert, ScrollView, FlatList, TextInput, RefreshControl } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from './Provider/Colorsfont';
import { config, msgProvider, msgText, consolepro, Lang_chg, Font, localStorage, msgTitle, localimag, apifuntion, notification } from './Provider/utilslib/Utils';
import HideWithKeyboard from 'react-native-hide-with-keyboard';
import Footer from './Provider/Footer';
const mobileW = Dimensions.get('window').width;
const mobileH = Dimensions.get('window').height;
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios"
import { useIsFocused } from '@react-navigation/native';  




const Organization = ({ navigation, route }) => {
  const [modalVisible_gifloader, setModalVisible_gifloader] = useState(false);
  const [organizationData, setorganizationData] = useState([])

  const [searchQuery, setSearchQuery] = useState('');
  const [ttoken, settoken] = useState()
  console.log(ttoken, "ttoken > .. organization screen ..........> ttoken");
  const [ggetuser_id, setggetuser_id] = useState()
  console.log(ggetuser_id, "ggetuser_id........  screen..........>");
  // ================ refresh controller 
  const [refreshing, setRefreshing] = React.useState(false);
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused();
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      organizationsApi();
      setRefreshing(false);
    }, 1000);
  }, []);

  useEffect(() => {
    if (isFocused) {
        console.log("data Add REview .js scrennnnnnnnnnnnnnnnnn ---------------------------------------");
        const timeOUt = () => {
          setTimeout(() => {
              setModalVisible_gifloader(true)
              organizationsApi();
          },);
      }
    timeOUt()
    getData()
      
    }
  }, [isFocused,ttoken]);

  // ================ refresh controller 

  const _searchLearner = (text) => {
    setSearchQuery(text);
    const filteredResults = jobdata.filter((item) =>
      item.company.toLowerCase().includes(text.toLowerCase())
    );
    setcompanyList(filteredResults);
  };


  const getData = async () => {
    const user_token = await AsyncStorage.getItem('user_token')
    settoken(user_token)
    const userid = await AsyncStorage.getItem('userid')
    setggetuser_id(userid)

   
  }
  const organizationsApi = () => {
    const userData = {
      user_id: ggetuser_id,
    };

    axios.post('http://test.api.evalvue.com/organizations/', userData, {
      headers: {
        Authorization: `Bearer ${ttoken}` // Ensure ttoken is defined and has the correct value
      }
    })
      .then(async (response) => {
        console.log(response, "!!!!!!!!response organizations data !!!!!!!!!!!!!!", response);
        console.log(response.data.organization_list, '.......... organizations data ');
        setorganizationData(response.data.organization_list);
        setModalVisible_gifloader(false)
         })
      .catch((error) => {
        console.log(error, "error");
        setLoading(false);
      });
  }
  return (
    <View style={{ flex: 1, backgroundColor: Colors.white_color }}>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" hidden={false} backgroundColor="#4863A0" translucent={true} />
        <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible_gifloader}
                    onRequestClose={() => {
                        setModalVisible_gifloader(!modalVisible_gifloader);
                    }}>
                    <View style={styles.GIFVIEW}>
                        <Image style={styles.GIF} source={require("./icon/neighcoach_loader.gif")}></Image>
                    </View>
                </Modal>
        <ScrollView
          refreshControl={
            <RefreshControl
              colors={[Colors.themecolor]}
              refreshing={refreshing} onRefresh={onRefresh} />
          }>

          <View style={styles.Header} >
            <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.goBack()}>
              <Image resizeMode='contain' style={{ width: mobileW * 7 / 100, height: mobileW * 7 / 100, }} source={require("./icon/back.png")}></Image>
            </TouchableOpacity>
            <Text style={{ color: Colors.black_color, fontSize: mobileW * 5 / 100, fontFamily: Font.FontMedium }}>Organization List</Text>
            <Text></Text>
          </View>

          <TouchableOpacity onPress={() => navigation.navigate('AddOrganization')} style={{
            backgroundColor: Colors.themecolor, borderRadius: mobileW * 2 / 100,
            width: mobileW * 35 / 100, height: mobileW * 12 / 100, alignSelf: 'flex-end', right: mobileW * 7 / 100, alignItems: 'center', justifyContent: 'center'
          }}>
            <Text style={{ fontSize: mobileW * 3.5 / 100, fontWeight:'bold', color: Colors.white_color, textAlign: 'center' }}>+ Add Organization</Text>
          </TouchableOpacity>


          {organizationData !=="" ?
            // <View style={{
            //   justifyContent: "center", alignSelf: 'center',
            //   marginTop: mobileW * 2 / 100, marginBottom: mobileW * 20 / 100
            // }}>
            <View style={{marginBottom:mobileW*18/100}}>
              <FlatList
                data={organizationData}
                renderItem={({ item, id }) =>
                              <View style={{marginBottom:mobileW*0/100}}>
                  <TouchableOpacity activeOpacity={0.8} style={styles.CardView}>
                    <View style={{ flexDirection: "row", padding: mobileW * 3 / 100, alignItems: 'center', justifyContent: 'space-between' }}>
                      <View style={styles.Company_LogoView}>
                        <Image resizeMode='contain' style={{
                          width: mobileW * 12 / 100, height: mobileW * 12 / 100,
                          borderColor: Colors.themecolor, borderRadius: mobileW * 10 / 100, borderWidth: mobileW * 0.3 / 100
                        }}
                          source={{ uri: item.image }} />
                      </View>
                      <View style={{ width: mobileW * 55 / 100 }}>
                        <Text style={styles.CompanyName}>Organization :-{item.name}</Text>
                        <Text style={styles.CompanyName1}>Address :- {item.area}</Text>
                      </View>
                      <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Company', { item: item })}
                        style={styles.button_View}>
                        <Text style={{ fontSize: mobileW * 3.5 / 100, fontWeight:'bold', color: Colors.white_color, textAlign: 'center' }}>View</Text>
                        {/* <Text style={{ color: Colors.white_color, fontSize: mobileW * 4.5 / 100, textAlign: 'center' }}>Pay ₹7</Text> */}
                      </TouchableOpacity>
                      {/* {item.organization_paid && (
          <TouchableOpacity style={styles.button_View}>
            <Text style={styles.rupeesButtonText}>Pay ₹ 99 </Text>
          </TouchableOpacity>
        )}
        {item.organization_rejected && (
          <TouchableOpacity style={styles.rejectedButton}>
            <Text style={styles.rejectedButtonText}>Rejected</Text>
          </TouchableOpacity>
        )}
        {!item.organization_verified && (
          <TouchableOpacity style={styles.verifiedButton}>
            <Text style={styles.verifiedButtonText}>View</Text>
          </TouchableOpacity>
        )} */}


                    </View>



                  </TouchableOpacity>
 </View>
                } />


            </View>

 : 
  <ActivityIndicator size="large" color="#575fb4" />
  }


        </ScrollView>
        <HideWithKeyboard>
          <Footer
            activepage='Dashboard'
            usertype={1}
            footerpage={[
              { name: "Footer", countshow: false, image: require('./icon/home.png'), activeimage: require('../src/icon/appicon.png.png') },
              { name: "Employee", countshow: false, image: require('./icon/teamwork(2).png'), activeimage: require('../src/icon/appicon.png.png') },
              { name: "Login", countshow: false, image: require('./icon/more.png'), activeimage: require('../src/icon/appicon.png.png') },
              { name: "Employee", countshow: false, image: require('./icon/bell-ring.png'), activeimage: require('../src/icon/appicon.png.png') },
              { name: "Login", countshow: false, image: require('./icon/teamwork.png'), activeimage: require('../src/icon/appicon.png.png') },
            ]}
            navigation={navigation}
            imagestyle1={{ width: mobileW * 10 / 100, height: mobileW * 6 / 100, backgroundColor: Colors.whiteColor, countcolor: 'black', countbackground: 'black', }}
          />
        </HideWithKeyboard>
      </SafeAreaView>
    </View>
  )
}
export default Organization;
const styles = StyleSheet.create({
  Header: {
    width: mobileW,
    height: mobileW * 15 / 100,
    padding: mobileW * 4 / 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.white_color,
  },
  backIcon: {
    width: mobileW * 6 / 100,
    height: mobileW * 6 / 100,
    left: mobileW * 5.7 / 100,
  },
  SearchView: {
    flexDirection: 'row',
    borderColor: "#E7E8EA",
    left: mobileW * 4 / 100,
    width: mobileW * 92 / 100,
    height: mobileW * 12 / 100,
    marginTop: mobileW * 4 / 100,
    borderRadius: mobileW * 6 / 100,
    borderWidth: mobileW * 0.3 / 100,
  },

  GIF: {
    width: mobileW * 25 / 100,
    height: mobileW * 12 / 100
},
GIFVIEW: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00000060'
},
  SearchIcon: {
    alignSelf: 'center',
    tintColor: '#9B9B9B',
    left: mobileW * 2 / 100,
    width: mobileW * 5 / 100,
    height: mobileW * 5 / 100,
  },
  CardView: {
    alignSelf: "center",
    borderColor: "#E7E8EA",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    width: mobileW * 88 / 100,
    borderRadius: mobileW * 3 / 100,
    borderWidth: mobileW * 0.2 / 100,
    marginVertical: mobileW * 1 / 100,
    marginHorizontal: mobileW * 1 / 100,
    elevation: mobileW * 2 / 100,
    shadowColor: '#000',
    borderColor:Colors.themecolor,
    borderWidth: 1,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, },
    marginBottom:mobileW*2/100,
    marginTop:mobileW*2/100,
  },
  button_View: {
    alignSelf: "center",
    borderColor: Colors.themecolor,
    justifyContent: "center",
    backgroundColor: Colors.themecolor,
    width: mobileW * 14 / 100,
    height: mobileW * 9/ 100,
    borderRadius: mobileW * 2 / 100,
    marginVertical: mobileW * 1 / 100,
    marginHorizontal: mobileW * 1 / 100,
  },
  Company_LogoView: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FAFAFA',
    width: mobileW * 10 / 100,
    height: mobileW * 10 / 100,
    borderRadius: mobileW * 1 / 100,
  },
  CompanyName: {
    color: Colors.black_color,
    fontFamily: Font.FontMedium,
    left: mobileW * 2 / 100,
    fontSize: mobileW * 3.8 / 100,
  },
  CompanyName1: {
    color: Colors.black_color,
    fontFamily: Font.FontMedium,
    left: mobileW * 2 / 100,
    fontSize: mobileW * 3.8 / 100,
    marginTop: mobileW * 1 / 100
  },
  Address: {
    color: Colors.black_color,
    fontFamily: Font.FontMedium,
    left: mobileW * 1 / 100,
    fontSize: mobileW * 4 / 100,
    marginBottom: mobileW * 1 / 100,
    // textAlign:'center'
  },
  viewButton: {
    backgroundColor: '#4b7bec',
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  viewButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
  rupeesButton: {
    backgroundColor: '#f39c12',
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  rupeesButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
  rejectedButton: {
    backgroundColor: '#e74c3c',
    alignSelf: "center",
    
    justifyContent: "center",
    
    width: mobileW * 14 / 100,
    height: mobileW * 8 / 100,
    borderRadius: mobileW * 3 / 100,
 
    marginVertical: mobileW * 1 / 100,
    marginHorizontal: mobileW * 1 / 100,
  },
  rejectedButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
  verifiedButton: {
    backgroundColor: '#2ecc71',
    alignSelf: "center",
   
    justifyContent: "center",
    
    width: mobileW * 18 / 100,
    height: mobileW * 8 / 100,
    borderRadius: mobileW * 3 / 100,
   
    marginVertical: mobileW * 1 / 100,
    marginHorizontal: mobileW * 1 / 100,
  },
  verifiedButtonText: {
    color: '#fff',
    textAlign: 'center',
  },

})


