// import React, { useEffect, useState } from "react";

// import {
//     View, TextInput, Button, TouchableOpacity,Modal,
//     StyleSheet, Dimensions, Text, Image, SafeAreaView, StatusBar, ImageBackground ,ScrollView , Alert 
// } from 'react-native';
// const mobileW = Dimensions.get('window').width;
// const mobileH = Dimensions.get('window').height;
// const { width: mobileWidth, height: mobileHeight } = Dimensions.get('window');
// import { Colors } from './Provider/Colorsfont'
// import { Font } from './Provider/utilslib/Utils';
// import DeviceInfo from 'react-native-device-info';
// import DocumentPicker from 'react-native-document-picker';
// import axios from "axios";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import ImagePicker from 'react-native-image-crop-picker'
// import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// const AddCardScreen = () => {
//   const [cardNumber, setCardNumber] = useState('');
//   const [expiryDate, setExpiryDate] = useState('');
//   const [cvv, setCvv] = useState('');
//   const [nameOnCard, setNameOnCard] = useState('');
//   const [saveCard, setSaveCard] = useState(false);

//   const handleSaveCard = async () => {
//     const cardDetails = {
//       cardNumber,
//       expiryDate,
//       cvv,
//       nameOnCard,
//     };

//     if (saveCard) {
//       await AsyncStorage.setItem('cardDetails', JSON.stringify(cardDetails));
//       console.log('Card details saved');
//     } else {
//       console.log('Card details not saved');
//     }

//     // Proceed with payment or other logic here
//     console.log('Card details:', cardDetails);
//   };

//   return (
//     <View style={{ flex: 1, backgroundColor: Colors.white_color }}>
//         <SafeAreaView style={{ flex: 1 }}>
//             <StatusBar barStyle="light-content" hidden={false} backgroundColor="#4863A0" translucent={true} />
//             <TouchableOpacity activeOpacity={0.8} style={styles.Header} onPress={() => navigation.goBack()}>
//                 <Image resizeMode='contain' style={{ width: mobileW * 7 / 100, height: mobileW * 7 / 100,marginTop:mobileW*6/100 }}
//                     source={require("./icon/back.png")}></Image>
//             </TouchableOpacity>
//       <View style={styles.cardPreview}>
//         <View style={styles.cardRow}>
//           <Text style={styles.cardText}>**** **** **** {cardNumber.slice(-4)}</Text>
//           <Text style={styles.cardText}>{expiryDate}</Text>
//         </View>
//         <Text style={styles.cardText}>{nameOnCard.toUpperCase()}</Text>
//       </View>
//       <Text style={styles.label}>Card Number</Text>
//       <TextInput
//         style={styles.input}
//         value={cardNumber}
//         onChangeText={setCardNumber}
//         placeholder="1179 9088 5241 7041"
//         keyboardType="numeric"
//       />
//       <View style={styles.row}>
//         <View style={styles.inputWrapper}>
//           <Text style={styles.label}>Expiry Date</Text>
//           <TextInput
//             style={styles.input}
//             value={expiryDate}
//             onChangeText={setExpiryDate}
//             placeholder="MM/YY"
//             keyboardType="numeric"
//           />
//         </View>
//         <View style={styles.inputWrapper}>
//           <Text style={styles.label}>CVV</Text>
//           <TextInput
//             style={styles.input}
//             value={cvv}
//             onChangeText={setCvv}
//             placeholder="980"
//             keyboardType="numeric"
//             secureTextEntry
//           />
//         </View>
//       </View>
//       <Text style={styles.label}>Name on Card</Text>
//       <TextInput
//         style={styles.input}
//         value={nameOnCard}
//         onChangeText={setNameOnCard}
//         placeholder="MEJINA THOSE"
//       />
//       <View style={styles.row}>
//         <TouchableOpacity
//           style={styles.checkbox}
//           onPress={() => setSaveCard(!saveCard)}
//         >
//           {saveCard && <Icon name="check" size={20} color="black" />}
//         </TouchableOpacity>
//         <Text style={styles.checkboxLabel}>Securely save card and details</Text>
//       </View>
//       <TouchableOpacity style={styles.button} onPress={handleSaveCard}>
//         <Text style={styles.buttonText}>Add Card</Text>
//       </TouchableOpacity>
//     </SafeAreaView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: '#f5f5f5',
//   },
//   cardPreview: {
//     backgroundColor: '#0054ff',
//     borderRadius: 10,
//     padding: 16,
//     marginBottom: 24,
//   },
//   cardRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   cardText: {
//     color: '#fff',
//     fontSize: 18,
//   },
//   label: {
//     fontSize: 16,
//     marginBottom: 8,
//   },
//   Header: {
//     width: mobileW,
//     height: mobileW * 15 / 100,
//     padding: mobileW * 4 / 100,
//     justifyContent: 'center',
//     backgroundColor: Colors.white_color,
//     marginTop:mobileW*4/100
// },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     padding: 10,
//     marginBottom: 16,
//     borderRadius: 4,
//     backgroundColor: '#fff',
//   },
//   row: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   inputWrapper: {
//     flex: 1,
//     marginRight: 8,
//   },
//   checkbox: {
//     width: 20,
//     height: 20,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     marginRight: 8,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   checkboxLabel: {
//     fontSize: 16,
//   },
//   button: {
//     backgroundColor: '#0054ff',
//     padding: 16,
//     borderRadius: 4,
//     alignItems: 'center',
//     marginTop: 16,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 18,
//   },
// });

// export default AddCardScreen;


// React Native Custom Star Rating Bar
// https://aboutreact.com/react-native-custom-star-rating-bar/

// import React in our code
import React, {useState} from 'react';

// import all the components we are going to use
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';

const Payment = () => {
  const [defaultRating, setDefaultRating] = useState(2);
  console.log(defaultRating,"defaultRating----------------------------------------");
  const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);
  const starImageFilled =
    'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_filled.png';
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
                    ? {uri: starImageFilled}
                    : {uri: starImageCorner}
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
      </View>
    </SafeAreaView>
  );
};

export default Payment;

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
});
