import React, { useState, useEffect, useCallback } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import {View, Text, StyleSheet, Dimensions, TouchableOpacity, Image, TextInput, Modal, FlatList,
    Platform, PermissionsAndroid, ScrollView,LogBox} from 'react-native';
// import axiosInstance from './axiosConfig';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { SelectList } from 'react-native-dropdown-select-list'
import ImagePicker from 'react-native-image-crop-picker'
const mobileW = Dimensions.get('window').width;
const mobileH = Dimensions.get('window').height;
const { width: mobileWidth, height: mobileHeight } = Dimensions.get('window');
import { useIsFocused } from '@react-navigation/native';  
import {
    config, msgProvider, msgText, consolepro, Lang_chg, Font,
    msgTitle, localimag, apifuntion, notification,
    validation
} from './Provider/utilslib/Utils';
import { Colors } from './Provider/Colorsfont'
import DocumentPicker from 'react-native-document-picker';
const data2 = [
    { label: '30', value: '1' },
    { label: '35', value: '2' },
    { label: '45', value: '3' },
];
const docdata = [
    { label: 'AAdhar card', value: '1' },
    { label: 'Pan card', value: '1' },
    { label: 'Driving License', value: '1' },
];
const Sector = [
    { label: 'Private', value: '1' },
    { label: 'Government', value: '2' },

];
const Listdata = [
    { label: 'Yes', value: '1' },
    { label: 'No', value: '2' },
];
const Citydata = [
    { label: 'Indore', value: '313' },
    { label: 'Dhar', value: '314' },
    { label: 'Pune', value: '315' },
];


const Area = [
    { label: 'Indore', value: '1' },
    { label: 'Dhar', value: '2' },
    { label: 'Pune', value: '3' },
];
const Country = [
    { label: 'India', value: '1' },
    { label: 'Australia', value: '1' },
    { label: 'England', value: '1' },
];

const State = [
    { label: 'Madhya Pradesh', value: '1' },
    { label: 'Uttar Pradesh', value: '2' },
    { label: 'Chhattisgarh', value: '3' },
];
const employeeRangeData = [
    { label: '50-100', value: '1' },
    { label: '100-200', value: '2' },
    { label: '500-1000', value: '3' },
];


const CompanyDetails = ({ navigation, route, }) => {
    const user_id = route.params.user_id;
    // console.log(user_id, "....................... Cscreeen.!!!!!!!!!!!!user_id");
    const [getuserid, setgetuser_id] = useState(user_id)
    const [getorganizationid, setorganization_id] = useState()
    const [companyname, setcompanyname] = useState('')
    const [employeeRange, setEmployeeRange] = useState('');
    const [profileImage, setProfileImage] = useState(false);
    const [filePath, setFilePath] = useState({});
    const [image, setimage] = useState();

  
    // console.log(image,"!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    const [pickerimage, setpickerimage] = useState()
    const [gstnumber, setgstnumber] = useState()
    console.log(gstnumber, "gstnumber");
    const [dtNumber, setdtNumber] = useState()
    const [Pincode, setPincode] = useState()
    const [ProfileImage_, setProfileImage_] = useState(false)
    const [image_, setimage_] = useState()
    const [organizationmapped, setorganizationmapped] = useState(false)
    const [documentvalue, setdocumentvalue] = useState()
    const [sectordata, setsectordata] = useState()
    const [listdata, setlistdata] = useState()
    const [citydata, setcitydata] = useState()
    const [areadata, setareadata] = useState()
    const [countrydata, setcountrydata] = useState()
    const [statedata, setstatedata] = useState()
    const [imageUri, setimageUri] = useState()
    const [selectedPDF, setSelectedPDF] = useState(null);
    // console.log(selectedPDF,"selectedPDF.....................selectedPDF ");
    const [type, settype] = useState()
    // console.log(type," type  ...........>");
    const [filename, setfilename] = useState()
    const [pdftype, setpdftype] = useState()
    console.log(pdftype, "pdftype");
    // console.log(filename," filename  ...............>");
    // console.log(selectedPDF, "selectedPDF ......................> ");
    const [pdfname, setpdfname] = useState()
    // console.log(pdfname,"pdfname");

    const [ggetuser_id, setggetuser_id] = useState()
    console.log(ggetuser_id, "getuser_id........................ cCCCCCC screeen state............");
    const [ttoken, settoken] = useState()
    console.log(ttoken, "ttoken......... CCCCCCCCCCCCCCCCCC  SCREEEENNNNNN ..........", ttoken);
    const isFocused = useIsFocused();
useEffect(() => {
    if (isFocused) {
      console.log("  !!!!!!!!!!!!!!!!!         Screen is focused, fetching data.. company.js .");
      const getData = async () => {
        const user_token = await AsyncStorage.getItem('user_token')
        settoken(user_token)
        const userid = await AsyncStorage.getItem('userid')
        setggetuser_id(userid)
        // console.log("==================> get data user_id =============>", ggetuser_id);

    }
    getData()
    _organization()
    }
}, [isFocused,ttoken]); 

    // useEffect(() => {
    //     const getData = async () => {
    //         const user_token = await AsyncStorage.getItem('user_token')
    //         settoken(user_token)
    //         const userid = await AsyncStorage.getItem('userid')
    //         setggetuser_id(userid)
    //         // console.log("==================> get data user_id =============>", ggetuser_id);

    //     }
    //     getData()
    //     _organization()
    // }, [ttoken])





    
    const _organization = () => {
        const userData = {
            user_id: ggetuser_id
        };
    
        axios.post('http://test.api.evalvue.com/organizations/', JSON.stringify(userData), {
            headers: {
                Authorization: `Bearer ${ttoken}`,
                'Content-Type': 'application/json'
            }
        })
        .then((response) => {
            console.log('Response:', response.data);
    
            if (response.data.is_organization_mapped) {
                setorganizationmapped(response.data.is_organization_mapped);
                console.log(response.data.is_organization_mapped, "response.data.is_organization_mapped");
                navigation.navigate('Dashboard');
            } else {
                console.log("Organization is not mapped");
                setorganizationmapped(response.data.is_organization_mapped);
            }
        })
        .catch((error) => {
            if (error.response && error.response.data) {
                console.log('Error:', error.response.data.error);
            } else {
                console.log('Error:', error.message);
            }
        });
    };
    
    const _organizationfirst = () => {
        const userData = {
            user_id: ggetuser_id
        };
        axios.post('http://test.api.evalvue.com/organizations/', userData, {
            headers: {
                Authorization: `Bearer ${ttoken}`
            }
        })
            .then((response) => {
                console.log(response.data.is_organization_mapped);
                if (response.data.is_organization_mapped) {
                    setorganizationmapped(response.data.is_organization_mapped)
                    console.log(response.data.is_organization_mapped, "response.data.is_organization_mapped!!!!!!!!!!!!");
                    navigation.navigate('Dashboard')
 
                }
                else {
                    console.log("organization is not mapped")
                    setorganizationmapped(response.data.is_organization_mapped)
                }

            })
            .catch((error) => {
                console.log(error.response.data.error, "error");
                //  setMessage(error.response.data.error)
            });
    };
    useEffect(() => {
        if (isFocused) {
            console.log('Screen is focused cccccc screeen');
        }
    }, [isFocused])




    const pickPDF = async () => {
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.pdf],
            });
            console.log(res, "  !!!!!!!!!!!!!!!! <----->  pdff filwe res <------> !!!!!!!!!!!!!!!!!");
            const ress = res[0].uri;
            const name = res[0].name;
            const type = res[0].type;
            setpdftype(type)
            setpdfname(name)
            setSelectedPDF(ress,);
        }
        catch (err) {
            if (DocumentPicker.isCancel(err)) {
                // User cancelled the picker
                console.log('User cancelled the picker');
            } else {
                console.error('Error picking PDF:', err);
            }
        }
    };








    // const _organization = () => {
    //     const userData = {
    //         user_id: ggetuser_id
    //     };

    //     // axios.post('http://test.api.evalvue.com/organizations/', userData)
    //     axios.post('http://test.api.evalvue.com/organizations/', userData, {
    //         headers: {
    //             Authorization: `Bearer ${ttoken}`
    //         }
    //     })       
    //         .then(async (response) => {
    //             // console.log(response.data.is_organization_mapped);
    //             if (response.data.is_organization_mapped) {
    //                 setorganizationmapped(response.data.is_organization_mapped)
    //                 navigation.navigate('Dashboard')
    //                 // await AsyncStorage.setItem('userID', user_id);
    //             }
    //             else {
    //                 console.log("organization is not mapped")
    //                 setorganizationmapped(response.data.is_organization_mapped)
    //             }

    //         })
    //         .catch((error) => {
    //             console.log(error.response.data.error, "error");
    //             //  setMessage(error.response.data.error)
    //         });
    // }


    // const _createEmployee = async () => {
    //     var formData = new FormData();
    //     formData.append('user_id', ggetuser_id);
    //     formData.append('organization_name', companyname);
    //     if (image) {
    //       const filename = image.split('/').pop(); // Assuming image is a local URI
    //       const type = 'image/jpeg'; // Adjust the type according to your image type
    //       formData.append('organization_image', {
    //         uri: image,
    //         name: filename,
    //         type: type,
    //       });
    //     }
    //     // await AsyncStorage.setItem('image', image)
    //     formData.append('document_type_id', documentvalue);
    //     formData.append('document_number', dtNumber);
    //     formData.append('gstin', gstnumber ? gstnumber : "");
    //     formData.append('sector_id', sectordata);
    //     formData.append('listed_id', listdata);
    //     formData.append('country_id', countrydata);
    //     formData.append('state_id', statedata);
    //     formData.append('city_id', citydata);
    //     formData.append('area', areadata);
    //     formData.append('pincode', Pincode);
    //     formData.append('number_of_employee', employeeRange);

    //     // Append PDF file
    //     if (selectedPDF) {
    //       const pdfname = selectedPDF.split('/').pop(); // Assuming selectedPDF is a local URI
    //       const pdftype = 'application/pdf'; // Adjust the type according to your PDF type
    //       formData.append('document_file', {
    //         uri: selectedPDF,
    //         name: pdfname,
    //         type: pdftype,
    //       });
    //     }
    //     console.log(formData, "formData ............>");
    //     try {
    //       const response = await axios.post(
    //         'http://test.api.evalvue.com/create/organization/',
    //         formData,
    //         {
    //           headers: {
    //             'Content-Type': 'multipart/form-data',
    //               Authorization: `Bearer ${ttoken}`
    //           },
    //         }
    //       );

    //       if (response.data.is_organization_register_successfull) {
    //         // const { user_id, organization_id } = response.data.user_id;
    //         var user_id = response.data.user_id;
    //         console.log(user_id,"api response gettt");
    //         setgetuser_id(user_id)
    //         var organization_id   = response.data.organization_id
    //         console.log(organization_id,"api response gettt organization_id");
    //         setorganization_id(organization_id)
    //         navigation.navigate('Dashboard', { userid:getuserid, organizationid :getorganizationid });
    //         console.log(user_id, "here api response user id");
    //         console.log(organization_id, "here api response organization_id");
    //       }
    //     } catch (error) {
    //       console.error('Error :::::::::::::::::::::::::', error.response.data);
    //     }
    //   };

    const refreshAccessToken = async () => {
        try {
            const response = await axios.post('http://test.api.evalvue.com/token/refresh/', {
                refresh: ttoken, // your stored refresh token
            });
            const newAccessToken = response.data.access;
            await AsyncStorage.setItem('accessToken', newAccessToken);
            return newAccessToken;
        } catch (error) {
            console.error('Error refreshing token:', error.response.data);
            // Handle token refresh failure (e.g., redirect to login)
        }
    };

    const _createEmployee = async () => {
        var formData = new FormData();
        formData.append('user_id', ggetuser_id);
        formData.append('organization_name', companyname);
        if (image) {
            const filename = image.split('/').pop(); // Assuming image is a local URI
            const type = 'image/jpeg'; // Adjust the type according to your image type
            formData.append('organization_image', {
                uri: image,
                name: filename,
                type: type,
            });
        }
        formData.append('document_type_id', documentvalue);
        formData.append('document_number', dtNumber);
        formData.append('gstin', gstnumber ? gstnumber : "");
        formData.append('sector_id', sectordata);
        formData.append('listed_id', listdata);
        formData.append('country_id', countrydata);
        formData.append('state_id', statedata);
        formData.append('city_id', citydata);
        formData.append('area', areadata);
        formData.append('pincode', Pincode);
        formData.append('number_of_employee', employeeRange);

        if (selectedPDF) {
            const pdfname = selectedPDF.split('/').pop(); // Assuming selectedPDF is a local URI
            const pdftype = 'application/pdf'; // Adjust the type according to your PDF type
            formData.append('document_file', {
                uri: selectedPDF,
                name: pdfname,
                type: pdftype,
            });
        }

        console.log(formData, "formData ............>");

        try {
            const response = await axios.post(
                'http://test.api.evalvue.com/create/organization/',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${ttoken}`
                    },
                }
            );

            if (response.data.is_organization_register_successfull) {
                var user_id = response.data.user_id;
                console.log(user_id, "api response gettt");
                setgetuser_id(user_id);
                var organization_id = response.data.organization_id;
                console.log(organization_id, "api response gettt organization_id");
                setorganization_id(organization_id);
                navigation.navigate('Dashboard', { userid: getuserid, organizationid: getorganizationid });
                console.log(user_id, "here api response user id");
                console.log(organization_id, "here api response organization_id");
            }
        } catch (error) {
            console.error('Error :::::::::::::::::::::::::', error.response.data);
            // Additional logging for debugging
            console.error('Full error response:', error.response);
        }
    };






    const [isFocus, setIsFocus] = useState(false);
    const [value, setValue] = useState('Dance');
    console.log(value, "............ value ");

    const requestCameraPermission = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.CAMERA,
                    {
                        title: 'Camera Permission',
                        message: 'App needs camera permission',
                    },
                );
                // If CAMERA Permission is granted
                return granted === PermissionsAndroid.RESULTS.GRANTED;
            } catch (err) {
                console.warn(err);
                return false;
            }
        } else return true;
    };

    const requestExternalWritePermission = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        title: 'External Storage Write Permission',
                        message: 'App needs write permission',
                    },
                );

                return granted === PermissionsAndroid.RESULTS.GRANTED;
            } catch (err) {
                console.warn(err);
                alert('Write permission err', err);
            }
            return false;
        } else return true;
    };


    const Galleryopen = () => {
        launchImageLibrary('photo', async (response) => {
            var ImageUri = response.assets
            console.log('--->', ImageUri)
            setimageUri(ImageUri)
            for (let i = 0; i < ImageUri.length; i++) {
                var imgeset = ImageUri[i].uri
                var typeset = ImageUri[i].type
                var fileName = ImageUri[i].fileName
                console.log("-------------------------==========", imgeset);
            }
            setProfileImage(false)
            settype(typeset)
            setfilename(fileName)
            setimage(imgeset);
            await AsyncStorage.setItem('imgeset', imgeset);
        })
    }

    const Camerapopen = (cropping, mediaType = 'photo') => {
        ImagePicker.openCamera({
            cropping: cropping,
            width: 500,
            height: 500,
            includeExif: true,
            mediaType,
        })
            .then((image) => {
                console.log('received image', image);
                setProfileImage(false)
                setimage(image.path)
                console.log(image.path);
            })
    }

    const Galleryopen_ = () => {
        launchImageLibrary('photo', (response) => {
            var ImageUri = response.assets
            console.log('--->', ImageUri)

            for (let i = 0; i < ImageUri.length; i++) {
                var imgeset = ImageUri[i].uri
                console.log("==========", imgeset);
            }
            setProfileImage_(false)
            setimage_(imgeset);
        })
    }

    const Camerapopen_ = (cropping, mediaType = 'photo') => {
        ImagePicker.openCamera({
            cropping: cropping,
            width: 500,
            height: 500,
            includeExif: true,
            mediaType,
        })
            .then((image) => {
                console.log('received image', image);
                setProfileImage_(false)
                setpickerimage(image.path)
                console.log(image.path);
            })
    }

    return (

        <View>
            {organizationmapped ? (null) :
                <View styl={{ backgroundColor: 'red' }}>
                    <ScrollView>
                        <TouchableOpacity style={{ width: mobileWidth * 100 / 100, height: mobileWidth * 12 / 100 }}
                            onPress={() => navigation.goBack()}>
                            <Image style={styles.backicon} source={require('../src/icon/back.png')} resizeMode="contain" />
                        </TouchableOpacity>

                        <View>
                            <Modal
                                animationType="slide"
                                transparent={true}
                                visible={ProfileImage_}>

                                <View style={{ flex: 1, backgroundColor: '#00000060', alignItems: 'center', justifyContent: 'center' }}>
                                    <View style={styles.Modal}>
                                        <View style={{
                                            width: mobileW * 90 / 100,
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            height: mobileW * 12 / 100,
                                            borderTopLeftRadius: mobileW * 3 / 100,
                                            borderTopRightRadius: mobileW * 3 / 100,
                                            paddingLeft: mobileW * 3 / 100,
                                            paddingRight: mobileW * 3 / 100,
                                            backgroundColor: Colors.white_color
                                        }}>

                                            <Text style={{
                                                color: Colors.black_color, fontSize: mobileW * 4 / 100,
                                                fontFamily: Font.FontSemiBold
                                            }}>Select Option</Text>
                                            <TouchableOpacity activeOpacity={0.8} onPress={() => setProfileImage_(!ProfileImage_)}  >
                                                <Image style={styles.backIcon_close} resizeMode='contain'
                                                    source={require("./icon/close.png")}></Image>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={{ width: mobileW * 90 / 100, height: mobileW * 0.2 / 100, backgroundColor: '#E7E8EA' }}></View>

                                        <View style={{ padding: mobileW * 2 / 100, alignItems: 'center' }}>
                                            <View style={{
                                                borderBottomWidth: 2,
                                                borderBottomColor: 'black',
                                                marginBottom: 10,
                                                width: mobileW * 90 / 100
                                            }}>
                                                <TouchableOpacity activeOpacity={0.8} onPress={() => Camerapopen_()}>
                                                    <Text style={{
                                                        fontSize: mobileW * 3.5 / 100,
                                                        color: Colors.black_color, paddingBottom: mobileW * 4 / 100, fontFamily: Font.FontMedium
                                                    }}>Media Camera</Text>
                                                </TouchableOpacity>
                                            </View>
                                            <TouchableOpacity activeOpacity={0.8} onPress={() => Galleryopen_()}>
                                                <Text style={{
                                                    fontSize: mobileW * 3.5 / 100, color: Colors.black_color, padding: mobileW * 4 / 100,
                                                    fontFamily: Font.FontMedium
                                                }}>Media gallery</Text>
                                            </TouchableOpacity>
                                            <View style={{ width: mobileW * 90 / 100, height: mobileW * 0.4 / 100, backgroundColor: 'gray', }}></View>
                                            <TouchableOpacity activeOpacity={0.8} onPress={() => setProfileImage_(!ProfileImage_)}>
                                                <Text style={{
                                                    fontSize: mobileW * 4 / 100, color: Colors.black_color, paddingTop: mobileW * 2 / 100,
                                                    fontFamily: Font.FontMedium
                                                }}>Cancel media</Text>
                                            </TouchableOpacity>
                                        </View>


                                    </View>
                                </View>
                            </Modal>
                        </View>
                        <View>
                            <Modal
                                animationType="slide"
                                transparent={true}
                                visible={profileImage}>

                                <View style={{ flex: 1, backgroundColor: '#00000060', alignItems: 'center', justifyContent: 'center' }}>
                                    <View style={styles.Modal}>
                                        <View style={{
                                            width: mobileW * 90 / 100,
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',

                                            alignItems: 'center',
                                            height: mobileW * 12 / 100,
                                            borderTopLeftRadius: mobileW * 3 / 100,
                                            borderTopRightRadius: mobileW * 3 / 100,
                                            paddingLeft: mobileW * 3 / 100,
                                            paddingRight: mobileW * 3 / 100,
                                            backgroundColor: Colors.white_color
                                        }}>

                                            <Text style={{
                                                color: Colors.black_color, fontSize: mobileW * 4 / 100,
                                                fontFamily: Font.FontSemiBold
                                            }}>Select Option</Text>
                                            <TouchableOpacity activeOpacity={0.8} onPress={() => setProfileImage(!profileImage)}  >
                                                <Image style={styles.backIcon_close} resizeMode='contain'
                                                    source={require("./icon/close.png")}></Image>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={{ width: mobileW * 90 / 100, height: mobileW * 0.2 / 100, backgroundColor: '#E7E8EA' }}></View>

                                        <View style={{ padding: mobileW * 2 / 100, alignItems: 'center' }}>
                                            <TouchableOpacity activeOpacity={0.8} onPress={() => Camerapopen()}>
                                                <Text style={{
                                                    fontSize: mobileW * 3.5 / 100,
                                                    color: Colors.black_color, paddingBottom: mobileW * 4 / 100, fontFamily: Font.FontMedium
                                                }}>Media Camera</Text>
                                            </TouchableOpacity>
                                            <View style={{ width: mobileW * 90 / 100, height: mobileW * 0.4 / 100, backgroundColor: 'gray', }}></View>
                                            <TouchableOpacity activeOpacity={0.8} onPress={() => Galleryopen()}>
                                                <Text style={{
                                                    fontSize: mobileW * 3.5 / 100, color: Colors.black_color, padding: mobileW * 4 / 100,
                                                    fontFamily: Font.FontMedium
                                                }}>Media gallery</Text>
                                            </TouchableOpacity>
                                            <View style={{ width: mobileW * 90 / 100, height: mobileW * 0.4 / 100, backgroundColor: 'gray', }}></View>
                                            <TouchableOpacity activeOpacity={0.8} onPress={() => setProfileImage(!profileImage)}>
                                                <Text style={{
                                                    fontSize: mobileW * 4 / 100, color: Colors.black_color, paddingTop: mobileW * 2 / 100,
                                                    fontFamily: Font.FontMedium
                                                }}>Cancel media</Text>
                                            </TouchableOpacity>
                                        </View>


                                    </View>
                                </View>
                            </Modal>
                        </View>
                        <View style={{ alignSelf: "center", marginTop: mobileW * 2 / 100 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View style={styles.imageCard}>
                                    <Image style={styles.mavenImage} resizeMode='contain'
                                        source={image == null ? require("./icon/kahli.png") : { uri: image }}></Image>
                                </View>
                                <TouchableOpacity activeOpacity={0.8} style={{
                                    width: mobileW * 6 / 100, height: mobileW * 6 / 100,
                                    marginLeft: mobileW * -5 / 100, marginTop: mobileW * -5 / 100, alignItems: 'center', justifyContent: 'center',
                                    backgroundColor: Colors.white_color, elevation: 1, borderRadius: mobileW * 4 / 100
                                }} onPress={() => setProfileImage(true)}>
                                    <Image style={{ width: mobileW * 3.5 / 100, height: mobileW * 3.5 / 100, tintColor: Colors.themecolor }}
                                        resizeMode='contain' source={require('./icon/image-gallery.png')}></Image>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.jobCardView}>
                            <TextInput placeholderTextColor={'black'}
                                placeholder="Organization Name"
                                onChangeText={(text) => setcompanyname(text)}
                                value={companyname}

                                style={{
                                    padding: mobileWidth * 3 / 100, width: mobileWidth * 75 / 100, height: mobileWidth * 12 / 100, borderWidth: mobileWidth * 0.2 / 100,
                                    borderRadius: mobileWidth * 20 / 100, borderColor: Colors.themecolor, marginTop: mobileWidth * 3 / 100
                                }} />
                            <View>
                                <Dropdown
                                    style={[styles.dropdown, isFocus && { borderColor: Colors.themecolor }]}
                                    placeholderStyle={styles.placeholderStyle}
                                    selectedTextStyle={styles.selectedTextStyle}
                                    inputSearchStyle={styles.inputSearchStyle}
                                    iconStyle={styles.iconStyle}
                                    data={docdata}
                                    placeholder='Document type'
                                    Mode={"outlined"}
                                    maxHeight={300}
                                    labelField="label"
                                    valueField="value"
                                    placeholderTextColor={Colors.black_color}
                                    value={documentvalue}
                                    onFocus={() => setIsFocus(true)}
                                    onBlur={() => setIsFocus(false)}
                                    onChange={item => {
                                        setdocumentvalue(item.value);
                                        setIsFocus(false);
                                    }}
                                />
                            </View>

                            <TextInput
                                value={dtNumber}
                                onChangeText={(text) => setdtNumber(text)}
                                placeholder="Document type Number"
                                placeholderTextColor={'black'}
                                maxLength={8}
                                style={{
                                    padding: mobileWidth * 4 / 100, width: mobileWidth * 75 / 100, height: mobileWidth * 12 / 100,
                                    borderWidth: mobileWidth * 0.2 / 100, borderRadius: mobileWidth * 20 / 100, borderColor: Colors.themecolor,
                                    marginTop: mobileWidth * 3 / 100
                                }} />




                            <TextInput
                                placeholderTextColor={'black'}
                                placeholder="Gst Number"
                                onChangeText={(text) => setgstnumber(text)}
                                value={gstnumber}

                                style={{
                                    padding: mobileWidth * 4 / 100, width: mobileWidth * 75 / 100, height: mobileWidth * 12 / 100, borderWidth: mobileWidth * 0.2 / 100,
                                    borderRadius: mobileWidth * 20 / 100, borderColor: Colors.themecolor, marginTop: mobileWidth * 3 / 100
                                }} />


                            <View>

                                <Dropdown
                                    style={[styles.dropdown, isFocus && { borderColor: Colors.themecolor }]}
                                    placeholderStyle={styles.placeholderStyle}
                                    selectedTextStyle={styles.selectedTextStyle}
                                    inputSearchStyle={styles.inputSearchStyle}
                                    iconStyle={styles.iconStyle}
                                    data={Sector}
                                    placeholder='Sector data'
                                    Mode={"outlined"}
                                    maxHeight={300}
                                    labelField="label"
                                    valueField="value"
                                    placeholderTextColor={Colors.black_color}
                                    value={sectordata}
                                    onFocus={() => setIsFocus(true)}
                                    onBlur={() => setIsFocus(false)}
                                    onChange={item => {
                                        setsectordata(item.value);
                                        setIsFocus(false);
                                    }} />
                            </View>

                            <View>
                                <Dropdown
                                    style={[styles.dropdown, isFocus && { borderColor: Colors.themecolor }]}
                                    placeholderStyle={styles.placeholderStyle}
                                    selectedTextStyle={styles.selectedTextStyle}
                                    inputSearchStyle={styles.inputSearchStyle}
                                    iconStyle={styles.iconStyle}
                                    data={Listdata}
                                    placeholder='Listed Id'
                                    Mode={"outlined"}
                                    maxHeight={300}
                                    labelField="label"
                                    valueField="value"
                                    placeholderTextColor={Colors.black_color}
                                    searchPlaceholder="Search..."
                                    value={listdata}
                                    onFocus={() => setIsFocus(true)}
                                    onBlur={() => setIsFocus(false)}
                                    onChange={item => {
                                        setlistdata(item.value);
                                        setIsFocus(false);
                                    }}
                                />
                            </View>
                            <View>
                                <Dropdown
                                    style={[styles.dropdown, isFocus && { borderColor: Colors.themecolor }]}
                                    placeholderStyle={styles.placeholderStyle}
                                    selectedTextStyle={styles.selectedTextStyle}
                                    inputSearchStyle={styles.inputSearchStyle}
                                    iconStyle={styles.iconStyle}
                                    data={Country}
                                    Mode={"outlined"}
                                    maxHeight={300}
                                    labelField="label"
                                    valueField="value"
                                    placeholder="country id"
                                    placeholderTextColor={Colors.black_color}
                                    value={countrydata}
                                    onFocus={() => setIsFocus(true)}
                                    onBlur={() => setIsFocus(false)}
                                    onChange={item => {
                                        setcountrydata(item.value);
                                        setIsFocus(false);
                                    }}
                                />
                            </View>
                            <View>
                                <Dropdown
                                    style={[styles.dropdown, isFocus && { borderColor: Colors.themecolor }]}
                                    placeholderStyle={styles.placeholderStyle}
                                    selectedTextStyle={styles.selectedTextStyle}
                                    inputSearchStyle={styles.inputSearchStyle}
                                    iconStyle={styles.iconStyle}
                                    data={State}
                                    Mode={"outlined"}
                                    maxHeight={300}
                                    labelField="label"
                                    valueField="value"
                                    placeholder="State Id"
                                    placeholderTextColor={Colors.black_color}
                                    value={statedata}
                                    onFocus={() => setIsFocus(true)}
                                    onBlur={() => setIsFocus(false)}
                                    onChange={item => {
                                        setstatedata(item.value);
                                        setIsFocus(false);
                                    }}
                                />
                            </View>




                            <View>
                                <Dropdown
                                    style={[styles.dropdown, isFocus && { borderColor: Colors.themecolor }]}
                                    placeholderStyle={styles.placeholderStyle}
                                    selectedTextStyle={styles.selectedTextStyle}
                                    inputSearchStyle={styles.inputSearchStyle}
                                    iconStyle={styles.iconStyle}
                                    data={Citydata}
                                    Mode={"outlined"}
                                    maxHeight={300}
                                    labelField="label"
                                    valueField="value"
                                    placeholderTextColor={Colors.black_color}
                                    placeholder='City'
                                    value={citydata}
                                    onFocus={() => setIsFocus(true)}
                                    onBlur={() => setIsFocus(false)}
                                    onChange={item => {
                                        setcitydata(item.value);
                                        setIsFocus(false);
                                    }}
                                />
                            </View>
                            <View>
                                <Dropdown
                                    style={[styles.dropdown, isFocus && { borderColor: Colors.themecolor }]}
                                    placeholderStyle={styles.placeholderStyle}
                                    selectedTextStyle={styles.selectedTextStyle}
                                    inputSearchStyle={styles.inputSearchStyle}
                                    iconStyle={styles.iconStyle}
                                    data={Area}
                                    Mode={"outlined"}
                                    maxHeight={300}
                                    labelField="label"
                                    valueField="value"
                                    placeholderTextColor={Colors.black_color}
                                    placeholder='Area'
                                    value={areadata}
                                    onFocus={() => setIsFocus(true)}
                                    onBlur={() => setIsFocus(false)}
                                    onChange={item => {
                                        setareadata(item.value);
                                        setIsFocus(false);
                                    }}
                                />
                            </View>


                            <TextInput
                                placeholderTextColor={'black'}
                                placeholder="Pin Code"
                                onChangeText={(text) => setPincode(text)}
                                value={Pincode}
                                style={{
                                    padding: mobileWidth * 4 / 100,
                                    width: mobileWidth * 75 / 100,
                                    height: mobileWidth * 12 / 100,
                                    borderWidth: mobileWidth * 0.2 / 100,
                                    borderRadius: mobileWidth * 20 / 100,
                                    borderColor: Colors.themecolor,
                                    marginTop: mobileWidth * 3 / 100
                                }} />


                            <View>
                                <Dropdown
                                    style={[styles.dropdown, isFocus && { borderColor: Colors.themecolor }]}
                                    placeholderStyle={styles.placeholderStyle}
                                    selectedTextStyle={styles.selectedTextStyle}
                                    inputSearchStyle={styles.inputSearchStyle}
                                    iconStyle={styles.iconStyle}
                                    data={employeeRangeData}
                                    placeholder="Enter Employee Range (0-100)"
                                    Mode={"outlined"}
                                    maxHeight={300}
                                    labelField="label"
                                    valueField="value"
                                    placeholderTextColor={Colors.black_color}
                                    value={employeeRange}
                                    onFocus={() => setIsFocus(true)}
                                    onBlur={() => setIsFocus(false)}
                                    onChange={item => {
                                        setEmployeeRange(item.value);
                                        setIsFocus(false);
                                    }}
                                />
                            </View>

                            <TouchableOpacity activeOpacity={0.8} style={{
                                padding: mobileWidth * 0.1 / 100, width: mobileWidth * 75 / 100,
                                height: mobileWidth * 12 / 100, borderWidth: mobileWidth * 0.2 / 100, borderRadius: mobileWidth * 20 / 100, borderColor: Colors.themecolor, marginTop: mobileWidth * 3 / 100, flexDirection: 'row', justifyContent: 'space-between',
                                alignItems: 'center'
                            }}>
                                <Text style={{ color: 'black', fontSize: mobileWidth * 4 / 100, padding: mobileWidth * 3.5 / 100 }}>Dacument Upload</Text>

                                <TouchableOpacity onPress={() => pickPDF()}
                                    activeOpacity={0.8} style={{
                                        width: mobileW * 10 / 100,
                                        height: mobileW * 10 / 100,
                                        right: mobileW * 3 / 100,
                                        marginTop: mobileW * 0 / 100,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        backgroundColor: Colors.white_color,
                                        elevation: 1,
                                        borderRadius: mobileW * 4 / 100
                                        // }} onPress={() => setProfileImage_(true)}>
                                    }}>

                                    <Image style={{
                                        width: mobileW * 10 / 100,
                                        height: mobileW * 10 / 100,
                                        borderRadius: mobileW * 4 / 100
                                    }}
                                        resizeMode='contain'
                                        source={selectedPDF == '' ? require('../src/icon/file.png') : selectedPDF}></Image>
                                </TouchableOpacity>
                            </TouchableOpacity>



                        </View>




                    </ScrollView>
                    <TouchableOpacity style={styles.button} onPress={() => { _createEmployee() }}>
                        {/* <TouchableOpacity style={styles.button}> */}
                        <Text style={{ color: "white", fontSize: mobileWidth * 5.5 / 100 }}>Details VerifY </Text>
                    </TouchableOpacity>
                </View>






            }
        </View>
    )





};
export default CompanyDetails;
const styles = StyleSheet.create({
    button: {
        width: mobileW * 75 / 100,
        height: mobileW * 11 / 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.themecolor,
        borderRadius: mobileW * 20 / 100,
        alignSelf: "center",
        position: 'absolute',
        bottom: 5

    },
    jobCardView: {
        elevation: mobileW * 3 / 100,
        // shadowColor: '#000',
        borderColor: "#e8edfb",
        borderWidth: 1,
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, },
        width: mobileW * 95 / 100,
        padding: mobileW * 2 / 100,
        marginRight: mobileW * 1 / 100,
        borderRadius: mobileW * 2 / 100,
        marginBottom: mobileW * 10 / 100,
        backgroundColor: Colors.white_color,
        height: mobileW * 195 / 100,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    backicon: {
        width: mobileHeight * 7 / 100,
        height: mobileWidth * 7 / 100,
        marginTop: mobileWidth * 3 / 100,
    },
    file_Icon: {
        width: mobileHeight * 8 / 100,
        height: mobileWidth * 10 / 100,

    },

    image: {
        width: mobileHeight * 55 / 100,
        height: mobileWidth * 45 / 100,
        alignSelf: "center",
        marginBottom: mobileWidth * 3 / 100
    },
    galleryIcon: {
        width: mobileWidth * 8 / 100,
        height: mobileWidth * 8 / 100,
        alignSelf: "flex-end",
        marginTop: mobileWidth * 4 / 100,
        left: mobileWidth * -1.5 / 100
    },
    uploadImage: {
        width: mobileWidth * 33 / 100,
        height: mobileWidth * 33 / 100,
        borderRadius: mobileWidth * 25 / 100,
        alignSelf: 'center',
        marginTop: mobileWidth * -12.5 / 100

    },
    upload_File: {
        width: mobileWidth * 33 / 100,
        height: mobileWidth * 33 / 100,
        alignSelf: 'center'
    },
    mavenImage: {
        width: mobileW * 20 / 100,
        height: mobileW * 20 / 100,
        borderRadius: mobileW * 10 / 100,
    },
    Female_txt: {
        marginHorizontal: mobileW * 2 / 100,
        color: Colors.black_color,
        fontSize: mobileW * 3.2 / 100,
        fontFamily: Font.FontRegular
    },
    maven_button: {
        width: mobileW * 93 / 100,
        height: mobileW * 12 / 100,
        backgroundColor: Colors.themecolor,
        borderRadius: mobileW * 1.5 / 100,
        marginTop: mobileW * 4 / 100,
        alignItems: "center",
        justifyContent: "center"
    },
    gif_view: {
        flex: 1, alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#00000096'
    },
    gif_image: {
        width: mobileW * 25 / 100,
        height: mobileW * 12 / 100
    },
    inputContainerStyle: {
        width: mobileW * 92 / 100,
        alignSelf: 'center',
        height: mobileW * 12 / 100,
        backgroundColor: '#FAFAFA',
        borderColor: '#E7E8EA',
        borderWidth: mobileW * 0.3 / 100,
        borderRadius: mobileW * 1 / 100,
        color: Colors.black_color
    },

    Bottoom_View: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: mobileW * 2 / 100,
    },


    Expert_text: {
        color: Colors.white_color,
        fontSize: mobileW * 3.5 / 100,
        alignSelf: 'center',
        fontFamily: Font.FontSemiBold
    },

    backIcon: {
        width: mobileW * 6 / 100,
        height: mobileW * 6 / 100,
        tintColor: Colors.color_orange,
    },

    backIcon_: {
        width: mobileW * 6 / 100,
        height: mobileW * 6 / 100,
    },




    cardView: {
        width: mobileW,
        height: "75%",
        backgroundColor: Colors.whiteColor,
        paddingLeft: mobileW * 8 / 100,
        paddingRight: mobileW * 8 / 100,
        borderTopLeftRadius: mobileW * 10 / 100
    },


    backIcon_close: {
        width: mobileW * 6 / 100,
        height: mobileW * 6 / 100,
        tintColor: Colors.themecolor

    },
    Header: {
        backgroundColor: Colors.white_color,
        width: mobileW,
        height: mobileW * 15 / 100,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: mobileW * 4 / 100,
    },

    learner_icon: {
        width: mobileW * 20 / 100,
        height: mobileW * 20 / 100,
        alignSelf: "center",
        borderWidth: mobileW * 0.45 / 100,
        borderColor: Colors.themecolor,
        borderRadius: mobileW * 10 / 100,
        marginTop: mobileW * 2 / 100
    },
    imageCard: {
        width: mobileW * 20 / 100,
        height: mobileW * 20 / 100,
        borderRadius: mobileW * 13 / 100,
        borderWidth: mobileW * 0.6 / 100,
        marginTop: mobileW * 2 / 100,
        borderColor: Colors.themecolor,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: mobileW * 2 / 100

    },
    mavenImage: {
        width: mobileW * 19.5 / 100,
        height: mobileW * 19.5 / 100,
        borderRadius: mobileW * 12 / 100,
    },
    datePicker: {
        width: 320,
        height: 260,

    },
    gender_text: {
        marginTop: mobileW * 3 / 100,
        color: Colors.black_color,
        fontSize: mobileW * 3.5 / 100,
        fontFamily: Font.FontMedium
    },
    help_text: {
        color: Colors.white_color,
        fontSize: mobileW * 3.50 / 100
    },
    ModalHeader: {
        width: mobileW * 90 / 100,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        height: mobileW * 12 / 100,
        borderTopLeftRadius: mobileW * 2 / 100,
        borderTopRightRadius: mobileW * 2 / 100,
        paddingLeft: mobileW * 3 / 100,
        paddingRight: mobileW * 3 / 100,
        backgroundColor: Colors.white_color
    },
    Modal: {
        width: mobileW * 90 / 100,
        borderRadius: mobileW * 3 / 100,

        backgroundColor: Colors.white_color,
        elevation: 5
    },
    selectedTextStyle: {
        fontSize: mobileW * 4 / 100,
        color: Colors.black_color,
        fontFamily: Font.FontMedium,
    },
    iconStyle: {
        width: mobileW * 7 / 100,
        height: mobileW * 2 / 100,
    },
    inputSearchStyle: {
        height: mobileW * 10 / 100,
        fontSize: mobileW * 3.5 / 100,
        fontFamily: Font.FontMedium,
    },
    dropdown: {
        height: mobileW * 12 / 100,
        width: mobileW * 75 / 100,
        alignSelf: 'center',
        borderWidth: mobileW * 0.3 / 100,
        borderColor: Colors.themecolor,
        borderRadius: mobileW * 10 / 100,
        paddingHorizontal: mobileW * 3 / 100,
        marginTop: mobileW * 2 / 100
    },
    placeholderStyle: {
        fontSize: mobileW * 4 / 100,
        fontFamily: Font.FontMedium,
        marginHorizontal: mobileW * 1 / 100,
        color: Colors.black_color
    },



})











