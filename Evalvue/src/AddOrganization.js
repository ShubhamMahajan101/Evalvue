import React, { useState, useEffect } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image, TextInput, Modal, FlatList,StatusBar,
 Platform, PermissionsAndroid, ScrollView,LogBox} from 'react-native';
 import { SafeAreaView } from 'react-native-safe-area-context';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import ImagePicker from 'react-native-image-crop-picker'
const mobileW = Dimensions.get('window').width;
const mobileH = Dimensions.get('window').height;
const { width: mobileWidth, height: mobileHeight } = Dimensions.get('window');
import {config, msgProvider, msgText, consolepro, Lang_chg, Font,msgTitle, localimag, apifuntion, notification,
            validation } from './Provider/utilslib/Utils';
import { Colors } from './Provider/Colorsfont'
import DocumentPicker from 'react-native-document-picker';

const Area = [
    { label: 'Indore', value: '1' },
    { label: 'Dhar', value: '2' },
    { label: 'Pune', value: '3' },
];

const employeeRangeData = [
    { label: '50-100', value: '1' },
    { label: '100-200', value: '2' },
    { label: '500-1000', value: '3' },
];


const AddOrganization = ({ navigation, route }) => {
    const [getuserid, setgetuser_id] = useState()
    const [getorganizationid, setorganization_id] = useState()
    const [companyname, setcompanyname] = useState('')
    const [employeeRange, setEmployeeRange] = useState('');
    const [profileImage, setProfileImage] = useState(false);
    const [filePath, setFilePath] = useState({});
    const [image, setimage] = useState();
    // console.log(image,"image!!!!!!!!!!!!!!!!!!!!!!");
    const [pickerimage, setpickerimage] = useState()
    const [gstnumber, setgstnumber] = useState()
    console.log(gstnumber, "gstnumber");
    const [dtNumber, setdtNumber] = useState()
    const [Pincode, setPincode] = useState()
    const [ProfileImage_, setProfileImage_] = useState(false)
    const [image_, setimage_] = useState()
    const [organizationmapped, setorganizationmapped] = useState(false)
   
     const [imageUri, setimageUri] = useState()
    const [selectedPDF, setSelectedPDF] = useState(null);
    // console.log(selectedPDF,"selectedPDF !!!!!!!!!!!!!!!!!!!");
    const [type, settype] = useState()
    const [filename, setfilename] = useState()
    const [pdftype, setpdftype] = useState()
    console.log(pdftype, "pdftype");
    const [pdfname, setpdfname] = useState()

    const [ggetuser_id, setggetuser_id] = useState()
    // console.log(ggetuser_id, "getuser_id........................ Add  organization screen screeen ............");
    const [ttoken, settoken] = useState()
    // console.log(ttoken, "ttoken.........  Add  organization screen screeen  ..........", ttoken);
    
   
    // dropdown state
    const [isFocus, setIsFocus] = useState(false);
    const [docname, setDocname] = useState([]);
    const [documentvalue, setDocumentvalue] = useState(null);
    const [cityname, setcityname] = useState([]);
    const [cityvalue, setcityvalue] = useState(null);
    const [sectordata, setsectordata] = useState([]);
    const [sectorvalue, setsectorvalue] = useState(null);
    const [statedata, setstatedata] = useState([]);
    const [statevalue, setstatevalue] = useState(null);
    const [listeddata, setlisteddata] = useState([]);
    const [listedvalue, setlistedvalue] = useState(null);
    const [countrydata, setcountrydata] = useState([]);
    const [countryvalue, setcountryvalue] = useState(null);
    const [areadata, setareadata] = useState(null);
     const [address,setAddress] = useState()
     const [loading, setLoading] = useState(true);
    useEffect(() => {
        const getData = async () => {
            const user_token = await AsyncStorage.getItem('user_token')
            // console.log(user_token,"................................. Add course scereen .........user_token");
            settoken(user_token)
            const userid = await AsyncStorage.getItem('userid')
            // console.log(userid,"!!!!!!!!!!!!userid  add  course screnn !!!!!!!!!!!!!!!!!!!!!!!! add  course screnn ");
            setggetuser_id(userid)
            }
    getData()
   add_Organization()
    }, [ttoken])
        const add_Organization = () => {
        const userData = {
            user_id: ggetuser_id,
            token: ttoken,
        };

        axios.post('http://test.api.evalvue.com/add/organization/', userData, {
            headers: {
                Authorization: `Bearer ${ttoken}`
            }
        })
        .then(async(res) => {
            console.log('API response:', res.data);
           const userId = res.data.user_id;
                     console.log(userId,"userIduserIduserIdv         Addd organization screen",userId);
            //  await AsyncStorage.setItem('userId_', userId);
            // Check if document_type exists and is an array
            const documentType = res.data.document_type;
            const city = res.data.city;
            const sector_type = res.data.sector_type; //SectorTypeId
            const state = res.data.state; //SectorTypeId
            const listed_type = res.data.listed_type //ListedTypeId
             const country = res.data.country //CountryId
            // const city = res.data.city;
            if (documentType,city,sector_type,state,listed_type,country) {
                let formattedData;
                let citydata;
                let sectordata;
                let statedata;
                let listedtypedata;
                let countrydata;
                 
                if (Array.isArray(documentType,city,sector_type,state,listed_type,country)) {
                    formattedData = documentType.map(type => ({ label: type, value: type }));
                    citydata = city.map(type => ({ label: type, value: type }));
                    sectordata = sector_type.map(type => ({ label: type, value: type }));
                    statedata = state.map(type => ({ label: type, value: type }));
                    listedtypedata = listed_type.map(type => ({ label: type, value: type }));
                    countrydata = country.map(type => ({ label: type, value: type }));
                } else if (typeof documentType,city,sector_type,state,listed_type,country === 'object' && documentType,city,sector_type,state,listed_type,country !== null) {
                    formattedData = Object.keys(documentType).map(key => ({ label: key, value: documentType[key] }));
                    citydata = Object.keys(city).map(key => ({ label: key, value: city[key] }));
                    sectordata = Object.keys(sector_type).map(key => ({ label: key, value: sector_type[key] }));
                    statedata = Object.keys(state).map(key => ({ label: key, value: state[key] }));
                    listedtypedata = Object.keys(listed_type).map(key => ({ label: key, value: listed_type[key] }));
                    countrydata = Object.keys(country).map(key => ({ label: key, value: country[key] }));
                } else {
                    console.error('Unexpected format for document_type:', documentType);
                    console.error('Unexpected format for document_type:', city);
                    console.error('Unexpected format for document_type:', sectordata);
                    console.error('Unexpected format for document_type:', statedata);
                    console.error('Unexpected format for document_type:', listedtypedata);
                    console.error('Unexpected format for document_type:', countrydata);
                    return;
                }
                // console.log('Formatted Data:', formattedData); // Debug log to check formatted data
                // console.log('Formatt ed city Data:', citydata); // Debug log to check formatted data
                setDocname(formattedData);
                setcityname(citydata);
                setsectordata(sectordata);
                setstatedata(statedata);
                setlisteddata(listedtypedata);
                setcountrydata(countrydata);
                
            } else {
                console.error('document_type is not defined or is in an unexpected format:', documentType);
                console.error('document_type is not defined or is in an unexpected format:',city);
                console.error('document_type is not defined or is in an unexpected format:',sector_type);
                console.error('document_type is not defined or is in an unexpected format:',state);
                console.error('document_type is not defined or is in an unexpected format:',country);
                console.error('document_type is not defined or is in an unexpected format:',listed_type);
            }
        })
        .catch((error) => {
            console.error('Error:', error.response ? error.response.data : error.message);
        });
    };

  

    useEffect(() => {
        // console.log('Docname State:', docname); 
    }, [docname,cityname,sectordata,statedata,listeddata,countrydata]);




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



    const _createEmployee = async () => {
        var formData = new FormData();
        formData.append('user_id', ggetuser_id);
        formData.append('organization_name', companyname);
        if (image) {
            const filename = image.split('/').pop();
            const type = 'image/jpeg';
            formData.append('organization_image', {
                uri: image,
                name: filename,
                type: type,
            });
        }
        formData.append('document_type_id', documentvalue);
        formData.append('document_number', dtNumber);
        formData.append('gstin', gstnumber ? gstnumber : "");
        formData.append('sector_id', sectorvalue);
        formData.append('listed_id', listedvalue);
        formData.append('country_id', countryvalue);
        formData.append('state_id', statevalue);
        formData.append('city_id', cityvalue);
        formData.append('area', address);
        formData.append('pincode', Pincode);
        formData.append('number_of_employee', employeeRange);
    
        if (selectedPDF) {
            const pdfname = selectedPDF.split('/').pop();
            const pdftype = 'application/pdf';
            formData.append('document_file', {
                uri: selectedPDF,
                name: pdfname,
                type: pdftype,
            });
        }
    
        
    console.log(formData,"formData------------------------> ");
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
                var organization_id = response.data.organization_id;
                console.log(organization_id, "api response gettt organization_id  Add organization screen !!!!!!!!!!!",organization_id);
                await AsyncStorage.setItem('organization_id',JSON.stringify(organization_id));  
                navigation.navigate('Organization', { item: getuserid, item: getorganizationid });
                console.log(organization_id, "here api response organization_id");
            }
        } catch (error) {
            console.error('Error :::::::::::::::::::::::::', error.response.data);
            console.error('Full error response:', error.response);
        }
    };

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
        launchImageLibrary('photo', (response) => {
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

        <View style={{ flex: 1, backgroundColor: Colors.white_color }}>
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar barStyle="light-content" hidden={false} backgroundColor="#4863A0" translucent={true} />
            <View style={styles.Header} >
            <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.goBack()}>
              <Image resizeMode='contain' style={{ width: mobileW * 7 / 100, height: mobileW * 7 / 100, }} source={require("./icon/back.png")}></Image>
            </TouchableOpacity>
            <Text style={{
                                fontSize: mobileW * 5 / 100, color: Colors.black_color,
                               fontFamily:Font.FontBold
                            }}>Organization Detail's</Text>  

                            <Text></Text>          
          </View>
            <ScrollView>
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
               

                <View style={styles.jobCardView}>
                <View style={{
                                padding: mobileWidth * 0.1 / 100, width: mobileWidth * 75 / 100,
                                height: mobileWidth * 12 / 100, borderWidth: mobileWidth * 0.2 / 100,
                                borderRadius: mobileWidth * 20 / 100,
                                borderColor: Colors.gray, marginTop: mobileWidth * 3 / 100,
                                flexDirection: 'row', justifyContent: 'space-between',
                                alignItems: 'center',marginHorizontal:mobileW*5/100
                            }}>
 <Text style={{ color: 'black', fontSize: mobileWidth * 4 / 100, padding: mobileWidth * 3.5 / 100 }}>  Upload Organization Image</Text>

                                <TouchableOpacity activeOpacity={0.8} style={{
                                    width: mobileW * 10 / 100, height: mobileW * 10 / 100,
                                    right: mobileW * 3 / 100, marginTop: mobileW * 0 / 100,
                                    alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.white_color, elevation: 1,
                                    borderRadius: mobileW * 4 / 100
                                }} onPress={() => setProfileImage(true)}>


                                    <Image style={{
                                        width: mobileW * 10 / 100, height: mobileW * 10 / 100, borderRadius: mobileW * 4 / 100
                                    }} resizeMode='contain' 
                                    source={image == null ? require("./icon/kahli.png") : { uri: image }}></Image>
                                </TouchableOpacity>
                            </View>
                   
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
                               data={docname}
                               placeholder='Document type'
                               Mode={"outlined"}
                               maxHeight={300}
                               labelField="value.Name"
                               valueField="value.DocumentTypeId"
                               placeholderTextColor={Colors.black_color}
                               value={documentvalue}
                               onFocus={() => setIsFocus(true)}
                               onBlur={() => setIsFocus(false)}
                               onChange={item => {
                                   setDocumentvalue(item.value.DocumentTypeId);
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
                               data={sectordata}
                               placeholder='Sector type'
                               Mode={"outlined"}
                               maxHeight={300}
                               labelField="value.Name"
                               valueField="value.SectorTypeId"
                               placeholderTextColor={Colors.black_color}
                               value={sectorvalue}
                               onFocus={() => setIsFocus(true)}
                               onBlur={() => setIsFocus(false)}
                               onChange={item => {
                                   setsectorvalue(item.value.SectorTypeId);
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
                data={listeddata}
                placeholder='Listed'
                Mode={"outlined"}
                maxHeight={300}
                labelField="value.Name"
                valueField="value.ListedTypeId"
                placeholderTextColor={Colors.black_color}
                value={listedvalue}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                    setlistedvalue(item.value.ListedTypeId);
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
                data={countrydata}
                placeholder='Country '
                Mode={"outlined"}
                maxHeight={300}
                labelField="value.Name"
                valueField="value.CountryId"
                placeholderTextColor={Colors.black_color}
                value={countryvalue}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                    setcountryvalue(item.value.CountryId);
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
                               data={statedata}
                               placeholder='State'
                               Mode={"outlined"}
                               maxHeight={300}
                               labelField="value.Name"
                               valueField="value.StateId"
                               placeholderTextColor={Colors.black_color}
                               value={statevalue}
                               onFocus={() => setIsFocus(true)}
                               onBlur={() => setIsFocus(false)}
                               onChange={item => {
                                setstatevalue(item.value.StateId);
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
                               data={cityname}
                               placeholder='City Name'
                               Mode={"outlined"}
                               maxHeight={300}
                               labelField="value.Name"
                               valueField="value.CityId"
                               placeholderTextColor={Colors.black_color}
                               value={cityvalue}
                               onFocus={() => setIsFocus(true)}
                               onBlur={() => setIsFocus(false)}
                               onChange={item => {
                                   setcityvalue(item.value.CityId);
                                   setIsFocus(false);
                               }}
                           />
                      
                    </View>
                    <View>
                        {/* <Dropdown
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
                        /> */}

<TextInput
                        placeholderTextColor={'black'}
                        placeholder="Address"
                        onChangeText={(text) => setAddress(text)}
                        value={address}
                        style={{
                            padding: mobileWidth * 4 / 100,
                            width: mobileWidth * 75 / 100,
                            height: mobileWidth * 12 / 100,
                            borderWidth: mobileWidth * 0.2 / 100,
                            borderRadius: mobileWidth * 20 / 100,
                            borderColor: Colors.themecolor,
                            marginTop: mobileWidth * 3 / 100
                        }} />
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
            <TouchableOpacity style={styles.button} onPress={() => {_createEmployee()}}>

            {/* <TouchableOpacity style={styles.button} > */}
                <Text style={{ color: "white", fontSize: mobileWidth * 5.5 / 100 }}>Details VerifY </Text>
            </TouchableOpacity>





</SafeAreaView>

        </View>
    )





};
export default AddOrganization;
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
        bottom: 15

    },
    Header: {
        width: mobileW,
        height: mobileW * 15 / 100,
        padding: mobileW * 4 / 100,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: Colors.white_color,
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
        marginBottom: mobileW * 13 / 100,
        backgroundColor: Colors.white_color,
        height: mobileW * 210 / 100,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:mobileW*3/100
    },
    backicon: {
        width: mobileHeight * 7 / 100,
        height: mobileWidth * 7 / 100,
        marginTop: mobileWidth * -5 / 100,
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



// import React, { useState, useEffect } from 'react';
// import { Dropdown } from 'react-native-element-dropdown';
// import {
//     View, Text, StyleSheet, Dimensions, TouchableOpacity, Image, TextInput, Modal, FlatList,
//     Platform, PermissionsAndroid, ScrollView, LogBox
// } from 'react-native';
// import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';
// import ImagePicker from 'react-native-image-crop-picker'
// const mobileW = Dimensions.get('window').width;
// const mobileH = Dimensions.get('window').height;
// const { width: mobileWidth, height: mobileHeight } = Dimensions.get('window');
// import {
//     config, msgProvider, msgText, consolepro, Lang_chg, Font, msgTitle, localimag, apifuntion, notification,
//     validation
// } from './Provider/utilslib/Utils';
// import { Colors } from './Provider/Colorsfont'
// import DocumentPicker from 'react-native-document-picker';
// import { SelectList, MultiSelect } from 'react-native-element-dropdown';

// const AddOrganization = ({navigation}) => {
//     const [docname, setDocname] = useState([]);
//     const [documentvalue, setDocumentvalue] = useState(null);
//     const [cityname, setcityname] = useState([]);
//     const [cityvalue, setcityvalue] = useState(null);
//     const [sectordata, setsectordata] = useState([]);
//     const [sectorvalue, setsectorvalue] = useState(null);
//     const [statedata, setstatedata] = useState([]);
//     const [statevalue, setstatevalue] = useState(null);
//     const [listeddata, setlisteddata] = useState([]);
//     const [listedvalue, setlistedvalue] = useState(null);
//     const [countrydata, setcountrydata] = useState([]);
//     const [countryvalue, setcountryvalue] = useState(null);
//     const [isFocus, setIsFocus] = useState(false);
//     const [ggetuser_id, setggetuser_id] = useState()
//     console.log(ggetuser_id, "getuser_id........................ Add  organization screen screeen ............");
//     const [ttoken, settoken] = useState()
//     console.log(ttoken, "ttoken.........  Add  organization screen screeen  ..........", ttoken);

//     useEffect(() => {
//         const getData = async () => {
//             const user_token = await AsyncStorage.getItem('user_token')
//             console.log(user_token, "................................. Add course scereen .........user_token");
//             settoken(user_token)
//             const userid = await AsyncStorage.getItem('userid')
//             console.log(userid, "!!!!!!!!!!!!userid  add  course screnn !!!!!!!!!!!!!!!!!!!!!!!! add  course screnn ");
//             setggetuser_id(userid)
//         }
//         getData()
//         add_Organization();
//     }, [ttoken]);

//     const add_Organization = () => {
//         const userData = {
//             user_id: ggetuser_id,
//             token: ttoken,
//         };

//         axios.post('http://test.api.evalvue.com/add/organization/', userData, {
//             headers: {
//                 Authorization: `Bearer ${ttoken}`
//             }
//         })
//         .then((res) => {
//             console.log('API response:', res.data);

//             // Check if document_type exists and is an array
//             const documentType = res.data.document_type;
//             const city = res.data.city;
//             const sector_type = res.data.sector_type; //SectorTypeId
//             const state = res.data.state; //SectorTypeId
//             const listed_type = res.data.listed_type //ListedTypeId
//              const country = res.data.country //CountryId
//             // const city = res.data.city;
//             if (documentType,city,sector_type,state,listed_type,country) {
//                 let formattedData;
//                 let citydata;
//                 let sectordata;
//                 let statedata;
//                 let listedtypedata;
//                 let countrydata;
                 
//                 if (Array.isArray(documentType,city,sector_type,state,listed_type,country)) {
//                     formattedData = documentType.map(type => ({ label: type, value: type }));
//                     citydata = city.map(type => ({ label: type, value: type }));
//                     sectordata = sector_type.map(type => ({ label: type, value: type }));
//                     statedata = state.map(type => ({ label: type, value: type }));
//                     listedtypedata = listed_type.map(type => ({ label: type, value: type }));
//                     countrydata = country.map(type => ({ label: type, value: type }));
//                 } else if (typeof documentType,city,sector_type,state,listed_type,country === 'object' && documentType,city,sector_type,state,listed_type,country !== null) {
//                     formattedData = Object.keys(documentType).map(key => ({ label: key, value: documentType[key] }));
//                     citydata = Object.keys(city).map(key => ({ label: key, value: city[key] }));
//                     sectordata = Object.keys(sector_type).map(key => ({ label: key, value: sector_type[key] }));
//                     statedata = Object.keys(state).map(key => ({ label: key, value: state[key] }));
//                     listedtypedata = Object.keys(listed_type).map(key => ({ label: key, value: listed_type[key] }));
//                     countrydata = Object.keys(country).map(key => ({ label: key, value: country[key] }));
//                 } else {
//                     console.error('Unexpected format for document_type:', documentType);
//                     console.error('Unexpected format for document_type:', city);
//                     console.error('Unexpected format for document_type:', sectordata);
//                     console.error('Unexpected format for document_type:', statedata);
//                     console.error('Unexpected format for document_type:', listedtypedata);
//                     console.error('Unexpected format for document_type:', countrydata);
//                     return;
//                 }
//                 console.log('Formatted Data:', formattedData); // Debug log to check formatted data
//                 console.log('Formatt ed city Data:', citydata); // Debug log to check formatted data
//                 setDocname(formattedData);
//                 setcityname(citydata);
//                 setsectordata(sectordata);
//                 setstatedata(statedata);
//                 setlisteddata(listedtypedata);
//                 setcountrydata(countrydata);
//             } else {
//                 console.error('document_type is not defined or is in an unexpected format:', documentType);
//                 console.error('document_type is not defined or is in an unexpected format:',city);
//                 console.error('document_type is not defined or is in an unexpected format:',sector_type);
//                 console.error('document_type is not defined or is in an unexpected format:',state);
//                 console.error('document_type is not defined or is in an unexpected format:',country);
//                 console.error('document_type is not defined or is in an unexpected format:',listed_type);
//             }
//         })
//         .catch((error) => {
//             console.error('Error:', error.response ? error.response.data : error.message);
//         });
//     };

  

//     useEffect(() => {
//         console.log('Docname State:', docname); 
//     }, [docname,cityname,sectordata,statedata,listeddata,countrydata]);
//     return (
//         <View>
//             {/* <Text>{docname}</Text> */}
//             <TouchableOpacity style={{marginTop:mobileW*5/100}} activeOpacity={0.8}  onPress={() => navigation.goBack()}>
//                 <Image resizeMode='contain' style={{ width: mobileW * 7 / 100, height: mobileW * 7 / 100, marginTop: mobileW *3/ 100,padding:mobileW*2/100 }}
//                     source={require("./icon/back.png")}></Image>
//             </TouchableOpacity>
//             <Text>docname ................................................................</Text>

//             <View>
               

// <Dropdown
//                 style={[styles.dropdown, isFocus && { borderColor: Colors.themecolor }]}
//                 placeholderStyle={styles.placeholderStyle}
//                 selectedTextStyle={styles.selectedTextStyle}
//                 inputSearchStyle={styles.inputSearchStyle}
//                 iconStyle={styles.iconStyle}
//                 data={listeddata}
//                 placeholder='Listed'
//                 Mode={"outlined"}
//                 maxHeight={300}
//                 labelField="value.Name"
//                 valueField="value.ListedTypeId"
//                 placeholderTextColor={Colors.black_color}
//                 value={listedvalue}
//                 onFocus={() => setIsFocus(true)}
//                 onBlur={() => setIsFocus(false)}
//                 onChange={item => {
//                     setlistedvalue(item.value.ListedTypeId);
//                     setIsFocus(false);
//                 }}
//             />
//             </View>
//             <View>
               

// <Dropdown
//                 style={[styles.dropdown, isFocus && { borderColor: Colors.themecolor }]}
//                 placeholderStyle={styles.placeholderStyle}
//                 selectedTextStyle={styles.selectedTextStyle}
//                 inputSearchStyle={styles.inputSearchStyle}
//                 iconStyle={styles.iconStyle}
//                 data={countrydata}
//                 placeholder='Country '
//                 Mode={"outlined"}
//                 maxHeight={300}
//                 labelField="value.Name"
//                 valueField="value.CountryId"
//                 placeholderTextColor={Colors.black_color}
//                 value={countryvalue}
//                 onFocus={() => setIsFocus(true)}
//                 onBlur={() => setIsFocus(false)}
//                 onChange={item => {
//                     setcountryvalue(item.value.CountryId);
//                     setIsFocus(false);
//                 }}
//             />
//             </View>







//             <View>
               

// <Dropdown
//                 style={[styles.dropdown, isFocus && { borderColor: Colors.themecolor }]}
//                 placeholderStyle={styles.placeholderStyle}
//                 selectedTextStyle={styles.selectedTextStyle}
//                 inputSearchStyle={styles.inputSearchStyle}
//                 iconStyle={styles.iconStyle}
//                 data={docname}
//                 placeholder='Document type'
//                 Mode={"outlined"}
//                 maxHeight={300}
//                 labelField="value.Name"
//                 valueField="value.DocumentTypeId"
//                 placeholderTextColor={Colors.black_color}
//                 value={documentvalue}
//                 onFocus={() => setIsFocus(true)}
//                 onBlur={() => setIsFocus(false)}
//                 onChange={item => {
//                     setDocumentvalue(item.value.DocumentTypeId);
//                     setIsFocus(false);
//                 }}
//             />
//             </View>
//             {documentvalue && <Text style={styles.textSelectedStyle}>{documentvalue}</Text>}
//             <View>
               

//                <Dropdown
//                                style={[styles.dropdown, isFocus && { borderColor: Colors.themecolor }]}
//                                placeholderStyle={styles.placeholderStyle}
//                                selectedTextStyle={styles.selectedTextStyle}
//                                inputSearchStyle={styles.inputSearchStyle}
//                                iconStyle={styles.iconStyle}
//                                data={cityname}
//                                placeholder='City Name'
//                                Mode={"outlined"}
//                                maxHeight={300}
//                                labelField="value.Name"
//                                valueField="value.CountryId"
//                                placeholderTextColor={Colors.black_color}
//                                value={cityvalue}
//                                onFocus={() => setIsFocus(true)}
//                                onBlur={() => setIsFocus(false)}
//                                onChange={item => {
//                                    setcityvalue(item.value.CountryId);
//                                    setIsFocus(false);
//                                }}
//                            />
//                            </View>
//                            {documentvalue && <Text style={styles.textSelectedStyle}>{documentvalue}</Text>}
//                            <View>
//                <Dropdown
//                                style={[styles.dropdown, isFocus && { borderColor: Colors.themecolor }]}
//                                placeholderStyle={styles.placeholderStyle}
//                                selectedTextStyle={styles.selectedTextStyle}
//                                inputSearchStyle={styles.inputSearchStyle}
//                                iconStyle={styles.iconStyle}
//                                data={sectordata}
//                                placeholder='Sector type'
//                                Mode={"outlined"}
//                                maxHeight={300}
//                                labelField="value.Name"
//                                valueField="value.SectorTypeId"
//                                placeholderTextColor={Colors.black_color}
//                                value={sectorvalue}
//                                onFocus={() => setIsFocus(true)}
//                                onBlur={() => setIsFocus(false)}
//                                onChange={item => {
//                                    setsectorvalue(item.value.SectorTypeId);
//                                    setIsFocus(false);
//                                }}
//                            />
//                            </View>
//                            {sectorvalue && <Text style={styles.textSelectedStyle}>{sectorvalue}</Text>}
//                            <View>
//                <Dropdown
//                                style={[styles.dropdown, isFocus && { borderColor: Colors.themecolor }]}
//                                placeholderStyle={styles.placeholderStyle}
//                                selectedTextStyle={styles.selectedTextStyle}
//                                inputSearchStyle={styles.inputSearchStyle}
//                                iconStyle={styles.iconStyle}
//                                data={statedata}
//                                placeholder='State'
//                                Mode={"outlined"}
//                                maxHeight={300}
//                                labelField="value.Name"
//                                valueField="value.StateId"
//                                placeholderTextColor={Colors.black_color}
//                                value={statevalue}
//                                onFocus={() => setIsFocus(true)}
//                                onBlur={() => setIsFocus(false)}
//                                onChange={item => {
//                                 setstatevalue(item.value.StateId);
//                                    setIsFocus(false);
//                                }}
//                            />
//                            </View>
//                            {statevalue && <Text style={styles.textSelectedStyle}>{statevalue}</Text>}

//         </View>
//     );
// };

// export default AddOrganization;
// const styles = StyleSheet.create({
//     button: {
//         width: mobileW * 75 / 100,
//         height: mobileW * 11 / 100,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: Colors.themecolor,
//         borderRadius: mobileW * 20 / 100,
//         alignSelf: "center",
//         position: 'absolute',
//         bottom: -5

//     },
//     Header: {
//         width: mobileW,
//         height: mobileW * 15 / 100,
//         padding: mobileW * 4 / 100,
//         justifyContent: 'center',
//         backgroundColor: Colors.white_color,
//         marginTop: mobileW * 4 / 100
//     },
//     jobCardView: {
//         elevation: mobileW * 3 / 100,
//         // shadowColor: '#000',
//         borderColor: "#e8edfb",
//         borderWidth: 1,
//         shadowOpacity: 0.1,
//         shadowOffset: { width: 0, },
//         width: mobileW * 95 / 100,
//         padding: mobileW * 2 / 100,
//         marginRight: mobileW * 1 / 100,
//         borderRadius: mobileW * 2 / 100,
//         marginBottom: mobileW * 10 / 100,
//         backgroundColor: Colors.white_color,
//         height: mobileW * 195 / 100,
//         alignSelf: 'center',
//         justifyContent: 'center',
//         alignItems: 'center'
//     },
//     backicon: {
//         width: mobileHeight * 7 / 100,
//         height: mobileWidth * 7 / 100,
//         marginTop: mobileWidth * -5 / 100,
//     },
//     file_Icon: {
//         width: mobileHeight * 8 / 100,
//         height: mobileWidth * 10 / 100,

//     },

//     image: {
//         width: mobileHeight * 55 / 100,
//         height: mobileWidth * 45 / 100,
//         alignSelf: "center",
//         marginBottom: mobileWidth * 3 / 100
//     },
//     galleryIcon: {
//         width: mobileWidth * 8 / 100,
//         height: mobileWidth * 8 / 100,
//         alignSelf: "flex-end",
//         marginTop: mobileWidth * 4 / 100,
//         left: mobileWidth * -1.5 / 100
//     },
//     uploadImage: {
//         width: mobileWidth * 33 / 100,
//         height: mobileWidth * 33 / 100,
//         borderRadius: mobileWidth * 25 / 100,
//         alignSelf: 'center',
//         marginTop: mobileWidth * -12.5 / 100

//     },
//     upload_File: {
//         width: mobileWidth * 33 / 100,
//         height: mobileWidth * 33 / 100,
//         alignSelf: 'center'
//     },
//     mavenImage: {
//         width: mobileW * 20 / 100,
//         height: mobileW * 20 / 100,
//         borderRadius: mobileW * 10 / 100,
//     },
//     Female_txt: {
//         marginHorizontal: mobileW * 2 / 100,
//         color: Colors.black_color,
//         fontSize: mobileW * 3.2 / 100,
//         fontFamily: Font.FontRegular
//     },
//     maven_button: {
//         width: mobileW * 93 / 100,
//         height: mobileW * 12 / 100,
//         backgroundColor: Colors.themecolor,
//         borderRadius: mobileW * 1.5 / 100,
//         marginTop: mobileW * 4 / 100,
//         alignItems: "center",
//         justifyContent: "center"
//     },
//     gif_view: {
//         flex: 1, alignItems: 'center',
//         justifyContent: 'center',
//         backgroundColor: '#00000096'
//     },
//     gif_image: {
//         width: mobileW * 25 / 100,
//         height: mobileW * 12 / 100
//     },
//     inputContainerStyle: {
//         width: mobileW * 92 / 100,
//         alignSelf: 'center',
//         height: mobileW * 12 / 100,
//         backgroundColor: '#FAFAFA',
//         borderColor: '#E7E8EA',
//         borderWidth: mobileW * 0.3 / 100,
//         borderRadius: mobileW * 1 / 100,
//         color: Colors.black_color
//     },

//     Bottoom_View: {
//         flexDirection: "row",
//         justifyContent: "space-around",
//         marginTop: mobileW * 2 / 100,
//     },


//     Expert_text: {
//         color: Colors.white_color,
//         fontSize: mobileW * 3.5 / 100,
//         alignSelf: 'center',
//         fontFamily: Font.FontSemiBold
//     },

//     backIcon: {
//         width: mobileW * 6 / 100,
//         height: mobileW * 6 / 100,
//         tintColor: Colors.color_orange,
//     },

//     backIcon_: {
//         width: mobileW * 6 / 100,
//         height: mobileW * 6 / 100,
//     },




//     cardView: {
//         width: mobileW,
//         height: "75%",
//         backgroundColor: Colors.whiteColor,
//         paddingLeft: mobileW * 8 / 100,
//         paddingRight: mobileW * 8 / 100,
//         borderTopLeftRadius: mobileW * 10 / 100
//     },


//     backIcon_close: {
//         width: mobileW * 6 / 100,
//         height: mobileW * 6 / 100,
//         tintColor: Colors.themecolor

//     },
//     Header: {
//         backgroundColor: Colors.white_color,
//         width: mobileW,
//         height: mobileW * 15 / 100,
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         padding: mobileW * 4 / 100,
//     },

//     learner_icon: {
//         width: mobileW * 20 / 100,
//         height: mobileW * 20 / 100,
//         alignSelf: "center",
//         borderWidth: mobileW * 0.45 / 100,
//         borderColor: Colors.themecolor,
//         borderRadius: mobileW * 10 / 100,
//         marginTop: mobileW * 2 / 100
//     },
//     imageCard: {
//         width: mobileW * 20 / 100,
//         height: mobileW * 20 / 100,
//         borderRadius: mobileW * 13 / 100,
//         borderWidth: mobileW * 0.6 / 100,
//         marginTop: mobileW * 2 / 100,
//         borderColor: Colors.themecolor,
//         alignItems: 'center',
//         justifyContent: 'center',
//         marginBottom: mobileW * 2 / 100

//     },
//     mavenImage: {
//         width: mobileW * 19.5 / 100,
//         height: mobileW * 19.5 / 100,
//         borderRadius: mobileW * 12 / 100,
//     },
//     datePicker: {
//         width: 320,
//         height: 260,

//     },
//     gender_text: {
//         marginTop: mobileW * 3 / 100,
//         color: Colors.black_color,
//         fontSize: mobileW * 3.5 / 100,
//         fontFamily: Font.FontMedium
//     },
//     help_text: {
//         color: Colors.white_color,
//         fontSize: mobileW * 3.50 / 100
//     },
//     ModalHeader: {
//         width: mobileW * 90 / 100,
//         justifyContent: 'space-between',
//         flexDirection: 'row',
//         alignItems: 'center',
//         height: mobileW * 12 / 100,
//         borderTopLeftRadius: mobileW * 2 / 100,
//         borderTopRightRadius: mobileW * 2 / 100,
//         paddingLeft: mobileW * 3 / 100,
//         paddingRight: mobileW * 3 / 100,
//         backgroundColor: Colors.white_color
//     },
//     Modal: {
//         width: mobileW * 90 / 100,
//         borderRadius: mobileW * 3 / 100,

//         backgroundColor: Colors.white_color,
//         elevation: 5
//     },
//     selectedTextStyle: {
//         fontSize: mobileW * 4 / 100,
//         color: Colors.black_color,
//         fontFamily: Font.FontMedium,
//     },
//     iconStyle: {
//         width: mobileW * 7 / 100,
//         height: mobileW * 2 / 100,
//     },
//     inputSearchStyle: {
//         height: mobileW * 10 / 100,
//         fontSize: mobileW * 3.5 / 100,
//         fontFamily: Font.FontMedium,
//     },
//     dropdown: {
//         height: mobileW * 12 / 100,
//         width: mobileW * 75 / 100,
//         alignSelf: 'center',
//         borderWidth: mobileW * 0.3 / 100,
//         borderColor: Colors.themecolor,
//         borderRadius: mobileW * 10 / 100,
//         paddingHorizontal: mobileW * 3 / 100,
//         marginTop: mobileW * 2 / 100
//     },
//     placeholderStyle: {
//         fontSize: mobileW * 4 / 100,
//         fontFamily: Font.FontMedium,
//         marginHorizontal: mobileW * 1 / 100,
//         color: Colors.black_color
//     },



// })








