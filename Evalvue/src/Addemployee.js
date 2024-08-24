import React, { useEffect, useState } from "react";
import {View, TextInput, Button, TouchableOpacity, Modal,
    StyleSheet, Dimensions, Text, Image, StatusBar, ImageBackground, ScrollView, Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
const mobileW = Dimensions.get('window').width;
const mobileH = Dimensions.get('window').height;
const { width: mobileWidth, height: mobileHeight } = Dimensions.get('window');
import { Colors } from './Provider/Colorsfont'
import { Font } from './Provider/utilslib/Utils';
import DeviceInfo from 'react-native-device-info';
import DocumentPicker from 'react-native-document-picker';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ImagePicker from 'react-native-image-crop-picker'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
const Addemployee = ({ navigation, route }) => {
    const Details = route.params.Details
    var Organization_id = Details.organization_id
    const [image, setimage] = useState();
    const [lastname, setlastname] = useState('');
    const [email, setEmail] = useState('');
    const [name, setname] = useState('');
    const [mobile_number, setMnumber] = useState('')
    const [Message, setMessage] = useState(true)
    const [aadharnumber, setAAdharnumber] = useState('')
    const [confirmAadharnumber, setcAAdharnumber] = useState('')
    const [uploderesume, setSelectedPDF] = useState([]);
    const [designation, setdesignation] = useState()
    const [ttoken, settoken] = useState()
    const [ggetuser_id, setggetuser_id] = useState()
    const [profileImage, setProfileImage] = useState(false);
    const [ProfileImage_, setProfileImage_] = useState(false)
    const [image_, setimage_] = useState()
    const [imageUri, setimageUri] = useState()
    const [getorganizationid, setgetorganizationid] = useState(null)
    const [errors, setErrors] = useState({});
    useEffect(() => {
       console.log('Add Employee.js screen !!!!!!!!!!!!!!!!!!!!! useEffect screeen');
        const getData = async () => {
            const user_token = await AsyncStorage.getItem('user_token')
            settoken(user_token)
            const userid = await AsyncStorage.getItem('userid')
            setggetuser_id(userid)


        }
        getData()

    }, [ttoken])
    const validate = () => {
        let valid = true;
        let errors = {};

        // Regex patterns
        const namePattern = /^[A-Za-z]+$/;
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const mobileNumberPattern = /^[6-9]\d{9}$/;
        const aadharPattern = /^\d{12}$/;

        if (!name) {
            errors.name = "First name is required";
            valid = false;
        } else if (!namePattern.test(name)) {
            errors.name = "First name is not valid";
            valid = false;
        }
        if (!lastname) {
            errors.lastname = "Last name is required";
            valid = false;
        } else if (!namePattern.test(lastname)) {
            errors.lastname = "Last name is not valid";
            valid = false;
        }
        if (!email) {
            errors.email = "Email is required";
            valid = false;
        } else if (!emailPattern.test(email)) {
            errors.email = "Email is not valid";
            valid = false;
        }
        if (!mobile_number) {
            errors.mobile_number = "Mobile number is required";
            valid = false;
        } else if (!mobileNumberPattern.test(mobile_number)) {
            errors.mobile_number = "Mobile number is not valid";
            valid = false;
        }
        if (!aadharnumber) {
            errors.aadharnumber = "Aadhar number is required";
            valid = false;
        } else if (!aadharPattern.test(aadharnumber)) {
            errors.aadharnumber = "Aadhar number is not valid";
            valid = false;
        }
        if (aadharnumber !== confirmAadharnumber) {
            errors.confirmAadharnumber = "Aadhar number and confirm Aadhar number do not match";
            valid = false;
        }
        if (!designation) {
            errors.designation = "Designation is required";
            valid = false;
        }
        if (!image) {
            errors.image = "Image is required";
            valid = false;
        }

        setErrors(errors);
        return valid;
    };


    const _createEmployee = () => {
        if (!validate()) return;
        const cleanedAadharNumber = aadharnumber.trim();
        const cleanedConfirmAadharNumber = confirmAadharnumber.trim();

        console.log(`Aadhar Number: ${cleanedAadharNumber}`);
        console.log(`Confirm Aadhar Number: ${cleanedConfirmAadharNumber}`);

        // Validate if Aadhar numbers match
        if (cleanedAadharNumber !== cleanedConfirmAadharNumber) {
            alert("Aadhar number and confirm Aadhar number do not match.");
            return;
        }

        const formData = new FormData();
        formData.append('user_id', ggetuser_id);
        formData.append('organization_id', Organization_id);
        formData.append('first_name', name);
        formData.append('last_name', lastname);

        if (image) {
            const filename = image.split('/').pop();
            const type = 'image/jpeg';          // Adjust this based on your image type
            formData.append('employee_image', {
                uri: image,
                name: filename,
                type: type,
            });
        }

        formData.append('aadhar_number', cleanedAadharNumber);
        formData.append('confirm_aadhar_number', cleanedConfirmAadharNumber);
        formData.append('email', email);
        formData.append('mobile_number', mobile_number);
        formData.append('designation', designation);

        console.log('FormData Before API Call form data Add Employeeee screeen !!!!!!!!!!!!!! :', formData);

        axios.post('http://test.api.evalvue.com/create/employees/', formData, {
            headers: {
                Authorization: `Bearer ${ttoken}`,
                'Content-Type': 'multipart/form-data',
            }
        })
            .then(async (response) => {
                console.log(response, '.......... response Add employees screen ');
                var organization_id = response.data.organization_id;
                console.log(organization_id, "ap", organization_id);
                navigation.navigate('Company', { item: Details });
            })
            .catch((error) => {
                console.error('Error fetching Add employee screen data:', error.response ? error.response.data : error.message);
                // alert(`Error ---:1 ${error.response ? error.response.data.error : error.message}`);
        console.log(`Error ---:1 ${error.response }`);
        console.log(`Error ---:2 ${ error.response.data.error }`);
        setMessage(error.response.data.error)
                console.log(`Error ---:3 ${ error.message}`);
               
            });
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
            // setProfileImage(false)
            // settype(typeset)

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
                        fontFamily: Font.FontBold
                    }}>Employee Details</Text>

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




                    <View >


                        <View style={styles.jobCardView}>
                            <Text style={{
                                fontSize: mobileW * 4 / 100, color: Colors.black_color,
                                padding: mobileW * 2 / 100, left: mobileW * 4 / 100, marginTop: mobileW * 0 / 100, fontWeight: "bold"
                            }}>First Name</Text>

                            <View style={{
                                width: mobileWidth * 75 / 100, height: mobileWidth * 12 / 100, borderWidth: mobileWidth * 0.2 / 100,
                                borderRadius: mobileWidth * 20 / 100, flexDirection: 'row', alignSelf: 'center', borderColor: 'gray', padding: mobileWidth * 0 / 100
                            }}>

                                <TextInput
                                    placeholderTextColor={'gray'}
                                    placeholder="First Name"
                                    onChangeText={(text) => setname(text)}
                                    value={name}

                                    style={{
                                        width: mobileWidth * 65 / 100,
                                        height: mobileWidth * 12 / 100,
                                        borderWidth: mobileWidth * 0 / 100,
                                        borderRadius: mobileWidth * 20 / 100,
                                        left: mobileW * 5 / 100,
                                        borderColor: 'gray',
                                        padding: mobileWidth * 0 / 100
                                    }}

                                />
                               
                            </View>
                            {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
                            <Text style={{
                                fontSize: mobileW * 4 / 100, color: Colors.black_color,
                                padding: mobileW * 2 / 100, left: mobileW * 4 / 100, marginTop: mobileW * 0/ 100, fontWeight: "bold",marginTop:mobileW*0/100,
                            }}>Last Name</Text>
                            <View style={{
                                width: mobileWidth * 75 / 100, height: mobileWidth * 12 / 100, borderWidth: mobileWidth * 0.2 / 100,
                                borderRadius: mobileWidth * 20 / 100, flexDirection: 'row', alignSelf: 'center',
                                borderColor: 'gray', padding: mobileWidth * 0 / 100
                            }}>

                                <TextInput
                                    placeholderTextColor={'gray'}
                                    placeholder="Last Name"
                                    onChangeText={(text) => setlastname(text)}
                                    value={lastname}
                                    style={{
                                        width: mobileWidth * 65 / 100,
                                        height: mobileWidth * 12 / 100,
                                        borderWidth: mobileWidth * 0 / 100,
                                        borderRadius: mobileWidth * 20 / 100,
                                        left: mobileW * 5 / 100,
                                        borderColor: 'gray',
                                        padding: mobileWidth * 0 / 100
                                    }} />
                            </View>
                            {errors.lastname && <Text style={styles.errorText}>{errors.lastname}</Text>}

                            <Text style={{
                                fontSize: mobileW * 4 / 100, color: Colors.black_color,
                                padding: mobileW * 2 / 100, left: mobileW * 4 / 100, marginTop: mobileW * 0.25 / 100, fontWeight: "bold"
                            }}>AAdhar Number</Text>
                            <View style={{
                                width: mobileWidth * 75 / 100,
                                height: mobileWidth * 12 / 100,
                                borderWidth: mobileWidth * 0.2 / 100,
                                borderRadius: mobileWidth * 20 / 100,
                                flexDirection: 'row', alignSelf: 'center',
                                borderColor: 'gray', padding: mobileWidth * 0 / 100
                            }}>


                                <TextInput
                                    placeholderTextColor={'gray'}
                                    placeholder="Aadhar number"
                                    onChangeText={(text) => setAAdharnumber(text)}
                                    value={aadharnumber}
                                    keyboardType="numeric"
                                    style={{
                                        width: mobileWidth * 65 / 100, height: mobileWidth * 12 / 100,
                                        borderWidth: mobileWidth * 0 / 100, borderRadius: mobileWidth * 20 / 100, left: mobileW * 5 / 100,
                                        borderColor: 'gray', padding: mobileWidth * 0 / 100
                                    }}
                                />
                            </View>
                            {errors.aadharnumber && <Text style={styles.errorText}>{errors.aadharnumber}</Text>}

                            <Text style={{
                                fontSize: mobileW * 4 / 100, color: Colors.black_color,
                                padding: mobileW * 2 / 100, left: mobileW * 4 / 100, marginTop: mobileW * 0.25 / 100, fontWeight: "bold"
                            }}>Confirm AAdhar Number</Text>
                            <View style={{
                                width: mobileWidth * 75 / 100,
                                height: mobileWidth * 12 / 100,
                                borderWidth: mobileWidth * 0.2 / 100,
                                borderRadius: mobileWidth * 20 / 100,
                                flexDirection: 'row', alignSelf: 'center',
                                borderColor: 'gray', padding: mobileWidth * 0 / 100
                            }}>


                                <TextInput
                                    placeholderTextColor={'gray'}
                                    placeholder="Confirm Aadhar number"
                                    onChangeText={(text) => setcAAdharnumber(text)}
                                    value={confirmAadharnumber}
                                    keyboardType="numeric"
                                    style={{
                                        width: mobileWidth * 65 / 100, height: mobileWidth * 12 / 100,
                                        borderWidth: mobileWidth * 0 / 100, borderRadius: mobileWidth * 20 / 100, left: mobileW * 5 / 100,
                                        borderColor: 'gray', padding: mobileWidth * 0 / 100
                                    }} />
                            </View>
                           
                            {errors.confirmAadharnumber && <Text style={styles.errorText}>{errors.confirmAadharnumber}</Text>}

                            <Text style={{
                                fontSize: mobileW * 4 / 100, color: Colors.black_color,
                                padding: mobileW * 2 / 100, left: mobileW * 4 / 100, marginTop: mobileW * 0.25 / 100, fontWeight: "bold"
                            }}>Email</Text>
                            <View style={{
                                width: mobileWidth * 75 / 100, height: mobileWidth * 12 / 100, borderWidth: mobileWidth * 0.2 / 100,
                                borderRadius: mobileWidth * 20 / 100, flexDirection: 'row', alignSelf: 'center',
                                borderColor: 'gray', padding: mobileWidth * 0 / 100
                            }}>

                                <TextInput
                                    placeholderTextColor={'gray'}
                                    placeholder="Email"
                                    onChangeText={(text) => setEmail(text)}
                                    value={email}
                                    style={{
                                        width: mobileWidth * 65 / 100, height: mobileWidth * 12 / 100,
                                        borderWidth: mobileWidth * 0 / 100, borderRadius: mobileWidth * 20 / 100, left: mobileW * 5 / 100,
                                        borderColor: 'gray', padding: mobileWidth * 0 / 100
                                    }} />
                            </View>
                            {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

                            <Text style={{
                                fontSize: mobileW * 4 / 100, color: Colors.black_color,
                                padding: mobileW * 2 / 100, left: mobileW * 4 / 100, marginTop: mobileW * 0.25 / 100, fontWeight: "bold"
                            }}>Mobile Number</Text>
                            <View style={{
                                width: mobileWidth * 75 / 100,
                                height: mobileWidth * 12 / 100,
                                borderWidth: mobileWidth * 0.2 / 100,
                                borderRadius: mobileWidth * 20 / 100,
                                flexDirection: 'row', alignSelf: 'center',
                                borderColor: 'gray', padding: mobileWidth * 0 / 100
                            }}>


                                <TextInput
                                    placeholderTextColor={'gray'}
                                    placeholder="Mobile number"
                                    onChangeText={(text) => setMnumber(text)}
                                    value={mobile_number}
                                    keyboardType="numeric"
                                    style={{
                                        width: mobileWidth * 65 / 100, height: mobileWidth * 12 / 100,
                                        borderWidth: mobileWidth * 0 / 100, borderRadius: mobileWidth * 20 / 100, left: mobileW * 5 / 100,
                                        borderColor: 'gray', padding: mobileWidth * 0 / 100
                                    }}
                                />
                            </View>
                            
                            {errors.mobile_number && <Text style={styles.errorText}>{errors.mobile_number}</Text>}

                            
                            <Text style={{
                                fontSize: mobileW * 4 / 100, color: Colors.black_color,
                                padding: mobileW * 2 / 100, left: mobileW * 4 / 100, marginTop: mobileW * 0.25 / 100, fontWeight: "bold"
                            }}>Designation</Text>
                            <View style={{
                                width: mobileWidth * 75 / 100, height: mobileWidth * 12 / 100, borderWidth: mobileWidth * 0.2 / 100,
                                borderRadius: mobileWidth * 20 / 100, flexDirection: 'row', alignSelf: 'center', borderColor: 'gray', padding: mobileWidth * 0 / 100
                            }}>

                                <TextInput
                                    placeholderTextColor={'gray'}
                                    placeholder="Designation "
                                    onChangeText={(text) => setdesignation(text)}
                                    value={designation}
                                    style={{
                                        width: mobileWidth * 65 / 100,
                                        height: mobileWidth * 12 / 100,
                                        borderWidth: mobileWidth * 0 / 100,
                                        borderRadius: mobileWidth * 20 / 100,
                                        left: mobileW * 5 / 100,
                                        borderColor: 'gray',
                                        padding: mobileWidth * 0 / 100
                                    }}

                                />
                            </View>
                            {errors.designation && <Text style={styles.errorText}>{errors.designation}</Text>}

                            <Text style={{
                                color: 'black',
                                fontSize: mobileWidth * 4 / 100,
                                marginHorizontal: mobileW * 5 / 100, marginTop: mobileW * 2 / 100, fontWeight: "bold"
                            }}>
                                Upload Employee Image</Text>

                            <View style={{
                                padding: mobileWidth * 0.1 / 100, width: mobileWidth * 75 / 100,
                                height: mobileWidth * 12 / 100, borderWidth: mobileWidth * 0.2 / 100,
                                borderRadius: mobileWidth * 20 / 100,
                                borderColor: Colors.gray, marginTop: mobileWidth * 3 / 100,
                                flexDirection: 'row', justifyContent: 'space-between',
                                alignItems: 'center', marginHorizontal: mobileW * 5 / 100
                            }}>
                                <Text style={{ fontSize: mobileWidth * 3.2 / 100, padding: mobileWidth * 3.5 / 100 }}>  Upload Employee Image</Text>

                                <TouchableOpacity activeOpacity={0.8} style={{
                                    width: mobileW * 10 / 100, height: mobileW * 10 / 100,
                                    right: mobileW * 3 / 100, marginTop: mobileW * 0 / 100,
                                    alignItems: 'center', justifyContent: 'center', 
                                    borderRadius: mobileW * 4 / 100,borderColor:Colors.themecolor,borderWidth:mobileW*0.2/100
                                }} onPress={() => Galleryopen()}>


                                    <Image style={{
                                        width: mobileW * 10 / 100, height: mobileW * 10 / 100, borderRadius: mobileW * 4 / 100
                                    }} resizeMode='contain'
                                        source={image == null ? "" : { uri: image }}></Image>
                                </TouchableOpacity>
                                
                            </View>
                            {errors.image && <Text style={styles.errorText}>{errors.image}</Text>}

                        </View>
        
                    </View>

                </ScrollView>
                
                {Message ?(

            <Text style={{textAlign:'center',color:Colors.red,position:'absolute',fontWeight:"bold",
                bottom:65,alignSelf:'center'}}>{Message}</Text>
        ):
   null
        }
                <TouchableOpacity style={styles.button} onPress={() => {_createEmployee()}}>
                {/* <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Company', { item: Details }) }> */}
                {/* <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Company') }> */}
                    <Text style={{ color: "white", fontSize: mobileWidth * 4.5 / 100, fontFamily: Font.FontBold, fontWeight: Font.FontBold }}>
                        Add Employee</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </View>
    );
};

export default Addemployee;
const styles = StyleSheet.create({
    button: {
        width: mobileWidth * 75 / 100,
        height: mobileWidth * 12 / 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#01377d',
        borderRadius: mobileWidth * 20 / 100,
        alignSelf: "center",
        marginTop: mobileWidth * 2 / 100,
        position: "absolute",
        bottom: 16
    },
    email: {
        width: mobileW * 5 / 100,
        height: mobileW * 5 / 100,
        alignSelf: 'center',
        left: mobileW * 2 / 100
    },
    Header: {
        width: mobileW,
        height: mobileW * 15 / 100,
        padding: mobileW * 4 / 100,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: Colors.white_color,
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
    image: {
        width: mobileHeight * 52 / 100,
        height: mobileWidth * 35 / 100,
        alignSelf: "center",
        marginBottom: mobileWidth * 0 / 100
    },
    backicon: {
        width: mobileHeight * 8 / 100,
        height: mobileWidth * 10 / 100,

    },
    Header: {
        width: mobileW,
        height: mobileW * 15 / 100,
        padding: mobileW * 4 / 100,
        justifyContent: 'center',
        backgroundColor: Colors.white_color,
        marginTop: mobileW * 4 / 100
    },
    background: {
        resizeMode: 'contain',
        justifyContent: 'center',
        flex: 1
    },
    jobCardView: {
        elevation: mobileW * 3 / 100,
        borderColor: "#e8edfb",
        borderWidth: 1,
        shadowOpacity: 0.1,
        shadowOffset: { width: 0 },
        width: mobileW * 90 / 100,
        padding: mobileW * 2 / 100,
        marginRight: mobileW * 1 / 100,
        borderRadius: mobileW * 2 / 100,
        backgroundColor: Colors.white_color,
        height:'100%',
     
        marginBottom:mobileW* 15/100,
        alignSelf: 'center',
        // justifyContent: 'center',
    },

    // jobCardView: {
    //     elevation: mobileW * 3 / 100,
    //     // shadowColor: '#000',
    //     borderColor: "#e8edfb",
    //     borderWidth: 1,
    //     shadowOpacity: 0.1,
    //     shadowOffset: { width: 0, },
    //     width: mobileW * 95 / 100,
    //     padding: mobileW * 2 / 100,
    //     marginRight: mobileW * 1 / 100,
    //     borderRadius: mobileW * 2 / 100,
    //     marginBottom: mobileW * 10 / 100,
    //     backgroundColor: Colors.white_color,
    //     height: mobileW * 195 / 100,
    //     alignSelf: 'center',
    //     justifyContent: 'center',
    //     // alignItems: 'center'
    // },
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
    errorText:{
       color:Colors.red
    },

})




