import { StatusBar, ScrollView, Animated, RefreshControl, FlatList, View, Text, Dimensions,
    TouchableOpacity, Modal, Image, StyleSheet, Alert, TextInput, ActivityIndicator
} from 'react-native'
import React, { useCallback, useRef, useState, useEffect } from 'react'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Colors } from './Provider/Colorsfont';
import { localStorage } from './Provider/localStorageProvider';
import { config, msgProvider, msgText, consolepro, Lang_chg, Font, msgTitle, localimag, apifuntion, notification } from './Provider/utilslib/Utils';
import Footer from './Provider/Footer';
import HideWithKeyboard from 'react-native-hide-with-keyboard';
import { AirbnbRating } from 'react-native-ratings';
import axios from 'axios';
import { useIsFocused } from '@react-navigation/native';  
import { SafeAreaView } from 'react-native-safe-area-context';
const mobileW = Dimensions.get('window').width;
const mobileH = Dimensions.get('window').height;


export default function Addreview({ navigation, route }) {
    const employeeData = route.params.item;
    const employeeid = employeeData.employee_id
   const Details = route.params.Details
    const organizationid = Details.organization_id
    const [ttoken, settoken] = useState()
    const [ggetuser_id, setggetuser_id] = useState()
    const isFocused = useIsFocused();
    const [modalVisible_gifloader, setModalVisible_gifloader] = useState(false);
useEffect(() => {
    if (isFocused) {

        const timeOUt = () => {
            setTimeout(() => {
                setModalVisible_gifloader(true)

                _reviews()
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
 
    const [reviewData, setreview_list] = useState([]);
 

    const _reviews = () => {
        const userData = {
            employee_id: employeeid,
            user_id: ggetuser_id,
            organization_id: organizationid,
        };



        axios.post('http://test.api.evalvue.com/reviews/', userData, {
            headers: {
                Authorization: `Bearer ${ttoken}`,  // Ensure this variable is defined and holds the correct token
                'Content-Type': 'application/json',  // 'application/json' is appropriate unless the backend expects 'multipart/form-data'
            }
        })

            .then(async (response) => {
                console.log(response, " response     Add Review screeeen---------------------- ",response);
                // console.log(response.data.employee_list, '.......... response ADD review screen employees response.data.employee_list');
                // console.log(response.data.review_list, '.......... response.data.review_list  company sceree s');
                // console.log(response.data.employee_id, '.......... rresponse.data.employee_id  company sceree s');
                // console.log(response.data.organization_id, '.......... response.data.organization_id response.data.organization_id');
                // setemployee_list(response.data.employee_list)
                setreview_list(response.data.review_list)
                setModalVisible_gifloader(false)
                // setemployee_id(response.data.employee_id)
                // setorganization_id(response.data.organization_id)
                // navigation.navigate('Addreview', { item: employee_list  ,Details:Details });
                // navigation.navigate('Addreview', { item: employee_list ,Details:Details });
                // navigation.navigate('Addreview', {employee});
                // handleReviewClick(item)
            })
            .catch((error) => {
                console.log('Error fetching Add employee screen data:', error.response ? error.response.data : error.message);
                console.log(`Error: ${error.response ? error.response.data.error : error.message}`);
            });
    };





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
                
                <View style={[styles.Header,{flexDirection:"row",justifyContent:'space-between'}]}>
                <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.goBack()}>
                    <Image resizeMode='contain' style={{ width: mobileW * 6 / 100, height: mobileW * 6 / 100, }}
                        source={require("./icon/back.png")}></Image>
                </TouchableOpacity>
                <Text style={{ color: Colors.black_color, fontSize: mobileW * 5 / 100, fontFamily: Font.FontMedium }}>Employee Review List</Text>
                <Text></Text>
                </View>
                <ScrollView>
                {employeeData !== "" ?
                    <View>

                        <View>
                            <View style={styles.listcard}>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={styles.imageCard2}>
                                        <Image resizeMode='contain' style={{ width: mobileW * 11 / 100, height: mobileW * 11 / 100, borderRadius: mobileW * 11 / 100 }}
                                            source={{ uri: employeeData.employee_image }}></Image>

                                    </View>
                                    <View style={{ alignContent: 'center', marginHorizontal: mobileW * 3 / 100, width: mobileW * 56 / 100, marginTop: mobileW * 1 / 100 }}>
                                        <Text style={{
                                            fontSize: mobileW * 3 / 100, fontFamily: Font.FontMedium,
                                            color: '#121A23'
                                        }}>Employee Name : {employeeData.employee_name}</Text>
                                        <Text style={{
                                            fontSize: mobileW * 3 / 100, fontFamily: Font.FontRegular,
                                            color: Colors.black_color,
                                        }}>Designation: {employeeData.designation}</Text>
                                    </View>
                                </View>

                                <TouchableOpacity activeOpacity={0.8} style={styles.buttonCard} onPress={() => navigation.navigate('Review', { item: employeeData, Details: Details })}>
                                    <Text style={{ fontSize: mobileW * 3.5 / 100, fontWeight: 'bold', color: Colors.white_color, textAlign: 'center' }}> + Add Review</Text>
                                </TouchableOpacity>


                            </View>
                        </View>

                    </View>
                    :
                    <View style={{ alignSelf: 'center', justifyContent: 'center' }}>
                        <TouchableOpacity activeOpacity={0.8} style={styles.buttonCard} onPress={() => navigation.navigate('Review', { item: employeeData, Details: Details })}>
                            <Text style={{ fontSize: mobileW * 3 / 100, fontFamily: Font.FontMedium, color: Colors.white_color, textAlign: 'center' }}> + Add Review</Text>
                        </TouchableOpacity>
                        <Text style={styles.noData}>No data available</Text>
                    </View>
                }
                {/* {reviewData !== "" ? */}
                {reviewData ? (
                    <View style={{marginBottom:mobileW*5/100}}>
                        <FlatList
                        inverted
                            data={reviewData}
                            renderItem={({ item, index }) =>
                                <View>
                                    <View style={styles.jobCardView1}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <View style={{ flexDirection: 'row', justifyContent: "space-around" }}>
                                                <Image resizeMode="contain" style={{
                                                    width: mobileW * 8 / 100, height: mobileW * 8 / 100,
                                                    borderRadius: mobileW * 12 / 100, borderColor: Colors.themecolor, borderWidth: mobileW * 0.3 / 100
                                                }} source={{ uri: item.organization_image }}></Image>
                                                {/* }} source={{ uri: item.organization_image }}></Image> */}
                                                <View>
                                                    <Text style={{
                                                        color: Colors.black_color, fontSize: mobileW * 3.5 / 100,
                                                        fontFamily: Font.FontBold, alignItems: 'center', alignSelf: 'center', left: mobileW * 2 / 100
                                                    }}>
                                                        {item.organization_name}</Text>
                                                    <Text style={{
                                                        color: Colors.black_color, fontSize: mobileW * 3 / 100,
                                                        fontFamily: Font.FontBold, alignItems: 'center', alignSelf: 'center', left: mobileW * 2 / 100
                                                    }}>
                                                        {item.created_on}</Text>

                                                </View>
                                            </View>
                                            {/* <Image style={[styles.dotIcon, {}]} resizeMode='contain' source={require('./icon/dots.png')}></Image> */}
                                        </View>
                                       
                                        <Image resizeMode='contain' style={{ width: mobileW * 32 / 100,padding:mobileW*3/100, 
                                        height: mobileW * 28 / 100, borderRadius: mobileW * 2 / 100,alignSelf:'center' }}
                                            source={{ uri:item.image}}></Image>
                                        

                                        <View style={[styles.jobCardView]}>
 
                                       
                                            <Text style={{
                                                color: Colors.black_color, fontSize: mobileW * 3 / 100, width: mobileW * 85 / 100,
                                                marginTop: mobileW * 2 / 100, fontFamily: Font.FontBold
                                            }}>{item.comment}...</Text>

                                        </View>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={{ fontSize: mobileW * 3 / 100, color: Colors.black_color, right: mobileW * 0 / 100 }}>Total over All ratting :</Text>
                                            <AirbnbRating
                                                count={5}
                                                defaultRating={item.rating}
                                                size={18}
                                                showRating={false}
                                                isDisabled
                                                starContainerStyle={{ marginTop: mobileW * -1 / 100 }}
                                            />
                                        </View>

                                    </View>
                                </View>
                            } />
                    </View>
                ) : (
                    <Text style={{ fontSize: mobileW * 5 / 100, alignSelf: 'center', justifyContent: 'center', marginTop: mobileW * 75 / 100, color: Colors.black_color, fontWeight: "bold" }}>No data available</Text>
                )}
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
        justifyContent: 'center',
        backgroundColor: Colors.white_color
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
    jobCardView: {
        elevation: mobileW * 2 / 100,
        shadowColor: '#000',
        borderColor: Colors.themecolor,
        borderWidth: 1,
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, },
        width: mobileW * 90 / 100,
        padding: mobileW * 2 / 100,
        // marginRight: mobileW * 1 / 100,
        borderRadius: mobileW * 2 / 100,
        marginBottom: mobileW * 2 / 100,
        backgroundColor: Colors.white_color,
        marginTop: mobileW * 2 / 100,
        // height:mobileW*35/100
    },
    jobCardView1: {
        elevation: 0.2,
        shadowColor: '#000',
        borderColor: Colors.themecolor,
        borderWidth: 1,
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, },
        width: mobileW * 95 / 100,
        padding: mobileW * 2 / 100,
        marginRight: mobileW * 1 / 100,
        borderRadius: mobileW * 2 / 100,
        marginBottom: mobileW * 5 / 100,
        backgroundColor: Colors.white_color,
        marginTop: mobileW * 1 / 100,
        alignSelf: 'center'
    },
    postJobtxt: {
        marginLeft: mobileW * 4 / 100,
        marginTop: mobileW * 10 / 100,
        // marginBottom: mobileW * 3 / 100,
        fontSize: mobileW * 3.5 / 100,
        color: Colors.gray,
        fontFamily: Font.FontRegular
    },
    imageCard2: {
        alignItems: 'center',
        justifyContent: 'center',
        width: mobileW * 11 / 100,
        height: mobileW * 11 / 100,
        borderRadius: mobileW * 11 / 100,
        borderWidth: mobileW * 0.2 / 100,
        borderColor: Colors.themecolor,
        alignSelf: 'center',

    },
    noData: {
        fontSize: mobileW * 5 / 100,
        color: Colors.black_color,
        alignSelf: 'center'
    },
    listcard: {
        width: mobileW * 93 / 100, alignSelf: 'center',
        elevation: mobileW * 2 / 100, flexDirection: 'row', borderRadius: mobileW * 3 / 100,
        backgroundColor: Colors.white_color, padding: mobileW * 2 / 100,
        // shadowColor: '#000',
        borderColor: Colors.themecolor,
        borderWidth: 1,
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, },
        marginTop: mobileW * 4 / 100
    },
    buttonCard: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: mobileW * 0.3 / 100,
        width: mobileW * 17 / 100,
        borderRadius: mobileW * 1 / 100,
        backgroundColor: Colors.themecolor,
    }
})