import React, { useState, useEffect } from 'react';
import axios from "axios";
import { AsyncStorage, ToastAndroid } from 'react-native';
import {
    View, TextInput, Button, TouchableOpacity, StyleSheet, Modal, Alert,
    Dimensions, Text, Image, StatusBar, FlatList
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AirbnbRating } from 'react-native-ratings';
const mobileW = Dimensions.get('window').width;
const mobileH = Dimensions.get('window').height;
const { width: mobileWidth, height: mobileHeight } = Dimensions.get('window');
import {
    config, msgProvider, msgText, consolepro, Lang_chg, Font,
    msgTitle, localimag, apifuntion, notification
} from './Provider/utilslib/Utils';
import { Colors } from './Provider/Colorsfont'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import StarRating from 'react-native-star-rating';
const Review = ({ navigation, route }) => {
    const employeeData = route.params.item
    const dataArray = [employeeData];
    const employeeid = employeeData.employee_id;
    const Details = route.params.Details
    const Organization_id = Details.organization_id
    const [profileImage, setProfileImage] = useState(false);
    const [ProfileImage_, setProfileImage_] = useState(false)
    const [name, setname] = useState()
    const [comment, setcomment] = useState('');
    const [ttoken, settoken] = useState()

    const [ggetuser_id, setggetuser_id] = useState()

    const [imageUri, setimageUri] = useState()
    const [image, setimage] = useState();

    const [getorganizationid, setgetorganizationid] = useState(Organization_id)
    const [defaultRating, setDefaultRating] = useState(0);
    const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);
    const [review_Data, setreviewData] = useState([])
    const [type, settype] = useState()
    const [filename, setfilename] = useState()
    const starImageFilled =
        'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_filled.png';
    const starImageCorner =
        'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_corner.png';
    useEffect(() => {

        const getData = async () => {
            const user_token = await AsyncStorage.getItem('user_token')
            settoken(user_token)
            const userid = await AsyncStorage.getItem('userid')
            setggetuser_id(userid)

        }
        getData()

        //   getOrganizationId()
    }, [ttoken])




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

    const [error, setError] = useState('');
    const [ImageError, setImageError] = useState('');
    const [ratting, setratting] = useState('');
    const [Message, setMessage] = useState(true)
    // const handleTextChange = (input) => {
    //     const wordArray = input.trim().split(/\s+/);
    //     if (wordArray.length <= 250) {
    //         setcomment(input);
    //         if (wordArray.length < 250) {
    //             setError('Please write at least 250 words.');
    //         } else {
    //             setError('');
    //         }
    //     } else {
    //         setcomment(wordArray.slice(0, 250).join(' '));
    //         setError('');
    //     }
    // };

    const handleSubmit = () => {
        const wordCount = comment.trim().split(/\s+/).filter(word => word !== '').length;
        if (wordCount < 250) {
            setError('Minimum 250 characters required.');
        } else {
            setError('');

        }
        if (!image) {
            setImageError('Please upload an image.');
            valid = false;
        } else {
            setImageError('');
        }
        if (!rating) {
            setratting('rating require.');
            valid = false;
        } else {
            setratting('');
        }
        _createReview()
    };



    const _createReview = () => {
        const encodedComment = encodeURIComponent(comment);
        const formData = new FormData();
        formData.append('user_id', ggetuser_id);
        formData.append('organization_id', getorganizationid);
        formData.append('employee_id', employeeid);
        formData.append('rating', defaultRating);
        formData.append('comment', comment);
        // if (image) {
        //     const filename = image.split('/').pop();
        //     const type = 'image/jpeg' ? `image/${filename.split('.').pop()}` : 'image/jpeg';
        //     formData.append('employee_image', {
        //         uri: image,
        //         name: filename,
        //         type: type,
        //     });
        // }
        if (image) {
            const filename = image.split('/').pop();
            const type = 'image/jpeg';          // Adjust this based on your image type
            formData.append('image', {
                uri: image,
                name: filename,
                type: type,
            });
        }
        console.log('Form Data  !!!!!!!!!!!!!!!! Review screen !!!!!!! : ----------------------------------------', formData);

        axios.post('http://test.api.evalvue.com/create/review/', formData, {
            headers: {
                Authorization: `Bearer ${ttoken}`,
                'Content-Type': 'multipart/form-data',
            }
        })
            .then(async (response) => {
                // console.log(response,"----------------------------------------------> review .js screen response");
                if (response.data.is_review_added_successfull) {
                    var reviewData = response.data;
                    setreviewData(reviewData);
                    await AsyncStorage.setItem('review_Data', JSON.stringify(reviewData));
                    navigation.navigate('Addreview', { item: employeeData, Details: Details });
                } else {
                    throw new Error(response.data.error);
                }
            })
            .catch((error) => {
                console.log(); ('Error fetching Add employee screen data:', error.response ? error.response.data : error.message);
                console.log(); ('Error', `Error: ${error.response ? error.response.data.error : error.message}`);
                setMessage(error.response.data.error)
            });
    };

    const [rating, setRating] = useState(0);
    const onStarRatingPress = (rating) => {
        setRating(rating);
    };

    const CustomRatingBar = () => {
        return (
            <View style={styles.customRatingBarStyle}>
                {maxRating.map((item, key) => {
                    return (
                        <TouchableOpacity
                            activeOpacity={0.2}
                            key={item}
                            onPress={() => setDefaultRating(item)}>
                            <Image
                                style={styles.starImageStyle}
                                source={
                                    item <= defaultRating
                                        ? { uri: starImageFilled }
                                        : { uri: starImageCorner }
                                }
                            />
                        </TouchableOpacity>
                    );
                })}
            </View>
        );
    };

    return (
        <View style={{ flex: 1, backgroundColor: Colors.white_color }}>

            <SafeAreaView style={{ flex: 1 }}>
                <StatusBar barStyle="light-content" hidden={false} backgroundColor="#4863A0" translucent={true} />
                <View style={[styles.Header, { flexDirection: "row", justifyContent: 'space-between' }]}>
                    <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.goBack()}>
                        <Image resizeMode='contain' style={{ width: mobileW * 6 / 100, height: mobileW * 6 / 100, }}
                            source={require("./icon/back.png")}></Image>
                    </TouchableOpacity>
                    <Text style={{ color: Colors.black_color, fontSize: mobileW * 5 / 100, fontFamily: Font.FontMedium }}>Generate Review</Text>
                    <Text></Text>
                </View>

                
                <View style={styles.inputBoxView}>

<TextInput
    style={{ fontSize: mobileW * 3.5 / 100, color: Colors.gray, padding: mobileW * 2 / 100, }}
    multiline
    onChangeText={newText => setcomment(newText)}
    // onChangeText={handleTextChange}
    value={comment}
    placeholderTextColor={Colors.black_color}
    placeholder="Enter your comment (up to 250 words)"
/>

</View>
{/* <Text style={styles.wordCount}>{comment.trim().split(/\s+/).filter(word => word !== '').length} / 250 words</Text> */}
{error ? (
<Text style={{ color: Colors.redColor, alignSelf: 'flex-end' }}>{error}</Text>
) :
null}
                <View style={styles.jobCardView}>
                    <View style={[styles.inputBoxView, {
                        flexDirection: 'row', justifyContent: 'space-between',
                        alignItems: 'center', marginHorizontal: mobileW * 5 / 100
                    }]}>
                        <Text style={{ color: 'black', fontSize: mobileWidth * 4 / 100, padding: mobileWidth * 3.5 / 100 }}>Upload Your Image</Text>

                        <TouchableOpacity activeOpacity={0.8} style={{
                            width: mobileW * 15 / 100, height: mobileW * 15 / 100,
                            right: mobileW * 3 / 100, marginTop: mobileW * 0 / 100,
                            alignItems: 'center', justifyContent: 'center',
                            borderRadius: mobileW * 4 / 100, padding: mobileW * 1 / 100
                        }} onPress={() => Galleryopen()}>


                            <Image style={{
                                width: mobileW * 15 / 100, height: mobileW * 15 / 100, borderRadius: mobileW * 10 / 100, borderColor: Colors.themecolor, borderWidth: mobileW * 0.2 / 100
                            }} resizeMode='contain'
                                source={image == null ? "" : { uri: image }}></Image>
                        </TouchableOpacity>
                    </View>
                    {ImageError ? (
                        <Text style={{ color: Colors.redColor, alignSelf: 'flex-end' }}>{ImageError}</Text>
                    ) :
                        null}

                    <View style={styles.customRatingBarStyle}>
                        {/* <Text style={{ fontSize: mobileW * 3.5 / 100, color: Colors.black_color }}>Review & RAtting : </Text> */}
                        <CustomRatingBar />
                        {ratting ? (
                            <Text style={{ color: Colors.redColor, alignSelf: 'flex-end' }}>{ratting}</Text>
                        ) :
                            null
                        }
                    </View>
                </View>
                <FlatList
                    data={dataArray}
                    renderItem={({ item, index }) =>
                        <View style={styles.jobCardView}>
                            <View style={styles.aboutCompany}>

                                <Image resizeMode='contain' style={{
                                    marginHorizontal: mobileW * 5 / 100,
                                    width: mobileW * 15 / 100, borderColor: Colors.themecolor, borderWidth: mobileW * 0.2 / 100,
                                    height: mobileW * 15 / 100, borderRadius: mobileW * 8 / 100
                                }}
                                    source={{ uri: item.employee_image }}></Image>

                                <View style={{ width: mobileW * 65 / 100, marginHorizontal: mobileW * 1 / 100 }}>
                                    <Text style={{ fontSize: mobileW * 3.5 / 100, fontFamily: Font.FontMedium, color: Colors.black_color }}> Employee Name : {item.employee_name}</Text>
                                    <Text style={{ fontSize: mobileW * 3.5 / 100, fontFamily: Font.FontMedium, color: Colors.black_color, marginTop: mobileW * 1 / 100 }}> Designation : {item.designation}</Text>
                                </View>
                            </View>
                        </View>
                    }
                />

                {/* {Message ? (

                    <Text style={{
                        textAlign: 'center', color: Colors.red, position: 'absolute', fontWeight: "bold",
                        bottom: 65, alignSelf: 'center'
                    }}>{Message}</Text>
                ) :
                    null
                } */}
                <TouchableOpacity style={styles.button} onPress={() => handleSubmit()}>
                    {/* <TouchableOpacity style={styles.button} onPress={() => _createReview()}> */}
                    <Text style={{ color: "white", fontSize: mobileWidth * 4.5 / 100, fontFamily: Font.FontBold, fontWeight: Font.FontBold }}> Submit Review </Text>
                </TouchableOpacity>


            </SafeAreaView>
        </View>
    );
};

export default Review;
const styles = StyleSheet.create({
    starImageStyle: {
        resizeMode: 'contain',
        tintColor: "#DBB000",
        width: mobileW * 5 / 100,
        height: mobileW * 5 / 100,
        marginLeft: mobileW * 3 / 100,
        marginTop: mobileW * -2 / 100
    },

    cardView: {
        width: mobileW,
        height: "75%",
        backgroundColor: Colors.whiteColor,
        paddingLeft: mobileW * 8 / 100,
        paddingRight: mobileW * 8 / 100,
        borderTopLeftRadius: mobileW * 10 / 100
    },
    Header: {
        width: mobileW,
        height: mobileW * 15 / 100,
        padding: mobileW * 4 / 100,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: Colors.white_color,
    },

    backIcon_close: {
        width: mobileW * 6 / 100,
        height: mobileW * 6 / 100,
        tintColor: Colors.themecolor

    },
    inputBoxView: {
        borderColor: Colors.themecolor,
        marginTop: mobileW * 5 / 100,
        borderRadius: mobileW * 2 / 100,
        borderWidth: 1,
        width: mobileW * 86 / 100,
        alignSelf: 'center',
        // height:mobileW*70/100
    },
    selectedTextStyle: {
        fontSize: mobileW * 4 / 100,
        color: Colors.black_color,
        fontFamily: Font.FontMedium,
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
    iconStyle: {
        width: mobileW * 7 / 100,
        height: mobileW * 2 / 100,
    },
    Modal: {
        width: mobileW * 90 / 100,
        borderRadius: mobileW * 3 / 100,
        backgroundColor: Colors.white_color,
        elevation: 5
    },
    button: {
        width: mobileWidth * 75 / 100,
        height: mobileWidth * 12 / 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#01377d',
        borderRadius: mobileWidth * 20 / 100,
        alignSelf: "center",
        marginTop: mobileWidth * 2 / 100,
        bottom: 10,
        position: 'absolute'



    },

    aboutCompany: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        width: mobileW * 92 / 100,

    },
    jobCardView: {
        elevation: 0.2,
        shadowColor: '#000',
        borderColor: Colors.themecolor,
        borderWidth: 1,
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, },
        width: mobileW * 90 / 100,
        padding: mobileW * 2 / 100,
        borderRadius: mobileW * 2 / 100,
        backgroundColor: Colors.white_color,
        marginTop: mobileW * 2 / 100,
        alignSelf: 'center'

    },

    Company_LogoView: {
        width: mobileW * 14 / 100,
        height: mobileW * 14 / 100,
        borderRadius: mobileW * 1 / 100,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FAFAFA',
    },
    backicon: {
        width: mobileHeight * 8 / 100,
        height: mobileWidth * 10 / 100,
        marginTop: mobileWidth * 12 / 100,
    },
    customRatingBarStyle: {
        flexDirection: 'row',
        right: mobileW * 2 / 100,
        paddingLeft: mobileW * 2 / 100,
        paddingRight: mobileW * 2 / 100,
        marginTop: mobileW * 2 / 100
    },

})







