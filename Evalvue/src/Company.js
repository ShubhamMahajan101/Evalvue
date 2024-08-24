import {
    StatusBar, ScrollView, Animated, RefreshControl, FlatList, View, Text, Dimensions,
    TouchableOpacity, Modal, Image, StyleSheet, Alert, TextInput, ActivityIndicator
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState, useEffect} from 'react'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Colors } from './Provider/Colorsfont';
import { localStorage } from './Provider/localStorageProvider';
import { config, msgProvider, msgText, consolepro, Lang_chg, Font, msgTitle, localimag, apifuntion, notification } from './Provider/utilslib/Utils';
import Footer from './Provider/Footer';
import HideWithKeyboard from 'react-native-hide-with-keyboard';
import { AirbnbRating } from 'react-native-ratings';
import { useIsFocused } from '@react-navigation/native';  
import axios from 'axios';
const mobileW = Dimensions.get('window').width;
const mobileH = Dimensions.get('window').height;
export default function Company({ navigation, route }) {
    const Details = route.params.item
    var organization_id = Details.organization_id
    const [ttoken, settoken] = useState()
    const [ggetuser_id, setggetuser_id] = useState()
    const [employeeData, setemployeeData] = useState([])
    const [employee_list, setemployee_list] = useState([])
    const [modalVisible_gifloader, setModalVisible_gifloader] = useState(false);
    const isFocused = useIsFocused();
useEffect(() => {
    if (isFocused) {
      console.log("  !!!!!!!!!!!!!!!!!         Screen is focused, fetching data.. company.js .");
      
    //   _employeeList()
     const timeOUt = () => {
            setTimeout(() => {
                setModalVisible_gifloader(true)

                _employeeList()
            },);
        }
       
        timeOUt()
        getData()
    }
  }, [isFocused,ttoken]); 

 


    const getData = async () => {
        const user_token = await AsyncStorage.getItem('user_token')
        settoken(user_token)
        const userid = await AsyncStorage.getItem('userid')
        setggetuser_id(userid)
    }

    const _employeeList = () => {
        const userData = {
            user_id: ggetuser_id,
            organization_id: organization_id,
        };

        axios.post('http://test.api.evalvue.com/employees/', userData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${ttoken}`
            }
        })
            .then(async (response) => {
                console.log(response.data.employee_list, "response c screeeeennnnnnnnnnnnnnnnnn");
                console.log(response.data.employee_list, "!!!",);
                setemployeeData(response.data.employee_list);
                setModalVisible_gifloader(false)
                if (Array.isArray(response.data.employee_list) && response.data.employee_list.length > 0) {
                    // Extract and store each employee_id
                    response.data.employee_list.forEach(async (employee) => {
                        const employeeId = employee.employee_id;
                        console.log(employeeId, "........................here is fetched employee ID");
                    });

                } else {
                    console.error('Employee list is empty or not an array');
                    setLoading(false);
                }
            })
            .catch((error) => {
                console.log(error, "error");
                setLoading(false);
            });
    }
    const [refreshing, setRefreshing] = React.useState(false);
    const [loading, setLoading] = useState(true);
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            // _employeeList()
            setRefreshing(false);
        }, 2000);
        // getData()
    }, []);



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
                <View style={styles.Header} >
                    <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.goBack()}>
                        <Image resizeMode='contain' style={{ width: mobileW * 7 / 100, height: mobileW * 7 / 100, }} source={require("./icon/back.png")}></Image>
                    </TouchableOpacity>

                    <Text style={{
                        fontSize: mobileW * 5 / 100, color: Colors.black_color,
                        fontFamily: Font.FontBold
                    }}>Employee List</Text>

                    <Text></Text>
                </View>
                <ScrollView>
                <View
                    refreshControl={
                        <RefreshControl
                            colors={[Colors.themecolor]}
                            refreshing={refreshing} onRefresh={onRefresh} />
                    }>




<TouchableOpacity onPress={() => navigation.navigate('Addemployee', { Details: Details })} style={{

backgroundColor: Colors.themecolor, width: mobileW * 24 / 100, alignItems: 'center', justifyContent: 'center',marginBottom:mobileW*2/100,
height: mobileW * 12 / 100, borderRadius: mobileW * 2 / 100, marginTop: mobileW * 2 / 100,alignSelf:'flex-end',right:mobileW*5/100,
}}>
<Text style={{ fontSize: mobileW * 3.5 / 100, fontWeight: 'bold', color: Colors.white_color, textAlign: 'center' }}>+ Add Employee</Text>

</TouchableOpacity>
                    <View style={{
                        width: mobileW * 90 / 100, marginHorizontal: mobileW * 2 / 100,
                        elevation: mobileW * 1 / 100, flexDirection: 'row', borderRadius: mobileW * 3 / 100,
                        backgroundColor: Colors.white_color, padding: mobileW * 2 / 100, alignSelf: 'center',

                        borderColor: Colors.themecolor,
                        borderWidth: 1,
                        shadowOpacity: 0.1,
                        shadowOffset: { width: 0, },
                    }}>
                        <Image resizeMode='contain' style={{
                            width: mobileW * 20 / 100, height: mobileW * 20 / 100, elevation: mobileW * 2 / 100,
                            borderColor: Colors.themecolor, borderRadius: mobileW * 10 / 100,
                             borderWidth: mobileW * 0.3 / 100, marginTop: mobileW * 4 / 100
                        }}
                            source={{ uri: Details.image }}></Image>
                        <View style={{ padding: mobileW * 1 / 100,}}>
                            <Text style={{
                                fontSize: mobileW * 3.5 / 100,
                                fontFamily: Font.FontMedium, color: Colors.black_color, width:mobileW*64/100 
                            }}> Organization Name : - {Details.name}.</Text>
                            <Text style={{ width:mobileW*65/100 , padding: mobileW * 1 / 100, fontSize: mobileW * 3.5 / 100, fontFamily: Font.FontMedium, color: Colors.black_color,  }}>
                                Adddress  : -  {Details.city_name} {Details.area}</Text>
                            <Text style={{
                                fontSize: mobileW * 3.5 / 100, fontFamily: Font.FontMedium,
                                color: Colors.black_color,  marginHorizontal: mobileW * 22 / 100
                            }}>
                                {Details.state_name} {Details.country_name}.
                            </Text>

                            <Text style={{
                                padding: mobileW * 1 / 100, fontSize: mobileW * 3.5 / 100,
                                fontFamily: Font.FontMedium, color: Colors.black_color, 
                            }}> Pin Code :-   {Details.pincode}.</Text>
                  
                        </View>
</View>
            


                    <View style={{

                        backgroundColor: Colors.themecolor, width: mobileW * 35 / 100, alignItems: 'center', justifyContent: 'center',
                        height: mobileW * 12 / 100, borderRadius: mobileW * 2 / 100, marginTop: mobileW * 2 / 100, left: mobileW * 5 / 100
                    }}>

                        <Text style={styles.postJobtxt}> Employee List :-</Text>

                    </View>

                    {employeeData ? (
                        <View style={{marginBottom:mobileW*5/100}}>
                           
                                <FlatList
                                    data={employeeData}
                                   
                                    renderItem={({ item, index }) =>
                                        <View>
                                            <View style={styles.listcard}>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <View style={styles.imageCard2}>
                                                        <Image resizeMode='contain' style={{ width: mobileW * 7 / 100, height: mobileW * 7 / 100, }}
                                                            source={{ uri: item.employee_image }}></Image>
                                                    </View>
                                                    <View style={{ alignContent: 'center', marginHorizontal: mobileW * 3 / 100 }}>
                                                        <Text style={{
                                                            fontSize: mobileW * 3.5 / 100, fontFamily: Font.FontMedium,
                                                            color: Colors.black_color
                                                        }}>{item.employee_name}</Text>
                                                        <Text style={{
                                                            fontSize: mobileW * 3.5 / 100, fontFamily: Font.FontRegular,
                                                            color: Colors.black_color, width: mobileW * 55 / 100,
                                                        }}>{item.designation}</Text>
                                                    </View>
                                                </View>


                                                
                                                <TouchableOpacity activeOpacity={0.8} style={styles.buttonCard} onPress={() => navigation.navigate('Addreview', { item: item, Details: Details })}>
                                                    <Text style={{ fontSize: mobileW * 3.5 / 100, fontWeight: 'bold', color: Colors.white_color, textAlign: 'center' }}>Review</Text>
                                                </TouchableOpacity>

                                            </View>
                                            <View style={{ width: mobileW, height: mobileW * 0.4 / 100, backgroundColor:Colors.themecolor }}></View>
                                        </View>}
                                />
                         
                        </View>

                    ) : (
                        <Text style={styles.noData}>No data available</Text>
                    )}
                </View>
                </ScrollView>
            </SafeAreaView>

    
        </View>
    )
}

const styles = StyleSheet.create({
    Header: {
        width: mobileW,
        height: mobileW * 15 / 100,
        padding: mobileW * 4 / 100,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: Colors.white_color,
    },
    noData: {
        fontSize: mobileW * 5 / 100,
        color: Colors.black_color,
        alignSelf: 'center',
        marginTop: mobileW * 45 / 100
    },
    Company_LogoView: {
        width: mobileW * 14 / 100,
        height: mobileW * 14 / 100,
        borderRadius: mobileW * 1 / 100,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FAFAFA',
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
    postJobtxt: {
        fontSize: mobileW * 4 / 100,
        color: Colors.white_color,
        fontWeight: "bold",
        textAlign: 'center'
    },
    imageCard2: {
        alignItems: 'center',
        justifyContent: 'center',
        width: mobileW * 8 / 100,
        height: mobileW * 8 / 100,
        borderRadius: mobileW * 11 / 100,
        borderWidth: mobileW * 0.2 / 100,
        borderColor: Colors.themecolor,
        alignSelf: 'center',

    },
    listcard: {
        width: mobileW,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: mobileW * 2 / 100,
        paddingTop: mobileW * 2 / 100,
        paddingLeft: mobileW * 4 / 100,
        paddingRight: mobileW * 4 / 100,
        paddingBottom: mobileW * 2 / 100,
        backgroundColor: Colors.white_color,
        // elevation: 2,
        // shadowColor: '#000',
        // borderColor: "#e8edfb",
        // borderWidth: 1,
        // shadowOpacity: 0.1,
        // shadowOffset: { width: 0, },
    },
    buttonCard: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: mobileW * 0.3 / 100,
        width: mobileW * 18 / 100,
        borderRadius: mobileW * 1 / 100,
        backgroundColor: Colors.themecolor,
        height: mobileW * 10 / 100
    }
})


