// React Native Custom Star Rating Bar
// https://aboutreact.com/react-native-custom-star-rating-bar/

// import React in our code
import React, { useState } from 'react';

import { SafeAreaView, StyleSheet, View, Text, Image, TouchableOpacity,Dimensions,TextInput} from 'react-native';
const { width: mobileWidth, height: mobileHeight } = Dimensions.get('window');
const Reviewratingscreen = ({ navigation }) => {
    // To set the default Star Selected
    const [defaultRating, setDefaultRating] = useState(2);
    // To set the max number of Stars
    const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);
    const [name ,setname] = useState('')
    // Filled Star. You can also give the path from local
    const starImageFilled =
        'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_filled.png';
    // Empty Star. You can also give the path from local
    const starImageCorner =
        'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_corner.png';

    const CustomRatingBar = () => {
        return (
            <View style={styles.customRatingBarStyle}>



                {maxRating.map((item, key) => {
                    return (
                        <TouchableOpacity
                            activeOpacity={0.7}
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
        <SafeAreaView style={styles.container}>
            <TouchableOpacity  onPress={() => navigation.navigate('Dashboard')}>
       <Image
          style={styles.backicon}
          source={require('../src/icon/back.png')} // Replace this with the path to your image
          resizeMode="contain" // You can adjust resizeMode as per your requirement
        />
        </TouchableOpacity>
            <View style={styles.container}>
                <Text style={styles.titleText}>
                    React Native Custom Star Rating Bar
                </Text>
                <Text style={styles.textStyle}>
                    How was your experience with us
                </Text>
                <Text style={styles.textStyleSmall}>
                    Please Rate Us
                </Text>
                {/* View to hold our Stars */}
                <CustomRatingBar />
                <Text style={styles.textStyle}>
                    {/* To show the rating selected */}
                    {defaultRating} / {Math.max.apply(null, maxRating)}
                </Text>
                <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.buttonStyle}
                    onPress={() => alert(defaultRating)}>
                    {/* Clicking on button will show the rating as an alert */}
                    <Text style={styles.buttonTextStyle}>
                        Get Selected Value
                    </Text>
                </TouchableOpacity>
                  {/* <View           style={{ width: mobileWidth * 75 / 100, height: mobileWidth * 20/ 100, borderWidth: mobileWidth * 0.2 / 100, borderRadius: mobileWidth * 20 / 100, borderColor: 'gray',
                  alignItems:'center',justifyContent:'center',alignSelf:'center',
                  marginTop:mobileWidth*3/100}}> */}

                <TextInput
          placeholder="   Write something"
          onChangeText={(text) => setname(text)}
          value={name}
          numberOfLines={3}
          multiline={true}
          maxLength={100}
         fontSize ={20}
         



          style={{alignItems:'center',justifyContent:'center',alignSelf:'center',
          width: mobileWidth * 70 / 100, height: mobileWidth * 18/ 100, borderWidth: mobileWidth * 0.2 / 100, borderRadius: mobileWidth * 0 / 100, borderColor: 'gray',marginTop:mobileWidth*3/100}}
        
        />
        {/* </View>/ */}
            </View>
        </SafeAreaView>
    );
};

export default Reviewratingscreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 10,
        justifyContent: 'center',
        textAlign: 'center',
    },
    titleText: {
        padding: 8,
        fontSize: 16,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    textStyle: {
        textAlign: 'center',
        fontSize: 23,
        color: '#000',
        marginTop: 15,
    },
    textStyleSmall: {
        textAlign: 'center',
        fontSize: 16,
        color: '#000',
        marginTop: 15,
    },
    buttonStyle: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 30,
        padding: 15,
        backgroundColor: '#8ad24e',
    },
    buttonTextStyle: {
        color: '#fff',
        textAlign: 'center',
    },
    customRatingBarStyle: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 30,
    },
    starImageStyle: {
        width: 40,
        height: 40,
        resizeMode: 'cover',
    },
    backicon:{
        width: mobileHeight * 8/ 100,
        height: mobileWidth * 10/ 100,
        marginTop: mobileWidth * 3 / 100,
      },
});