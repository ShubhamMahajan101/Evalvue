import { View,StatusBar, Text, FlatList, Image, Dimensions, ImageBackground, StyleSheet, SlideItem, Animated, TouchableOpacity } from 'react-native'
import React, { useRef, useState, useEffect } from 'react'
import { config, msgProvider, msgText, consolepro, Lang_chg,  apifuntion, msgTitle, Font,  localimag, SocialLogin } from './Provider/utilslib/Utils';
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors } from './Provider/Colorsfont';
import SliderDot from './Slider';
import { localStorage } from './Provider/localStorageProvider';
const mobileW = Dimensions.get('window').width;
const mobileH = Dimensions.get('window').height;

const slides = [
  {
    id: 0,
    image: require('../src/icon/appicon.png.png'),
    title: 'Evalvue',
    discription: 'The specific abilities, knowledge, and expertise an employee has that are valuable to the organization operations and goals.'
  },
  {
    id: 1,
    image: require('../src/icon/appicon.png.png'),
    title: 'Performance',
    discription: 'How well an employee performs their job duties and meets or exceeds performance expectations and goals..'
  },
  {
    id: 2,
    image:require('../src/icon/appicon.png.png'),
    title: 'Productivity',
    discription: "Create an environment where employees feel comfortable sharing their ideas and feedback. Regular team meetings and open-door policies can help"
  },
  {
    id: 3,
    image: require('../src/icon/appicon.png.png'),
    title: 'Connect With Organization',
    discription: ' How well an employee aligns with the company’s values and culture, and their ability to work collaboratively with others.'
  },
  {
    id: 4,
    image:require('../src/icon/appicon.png.png'),
    title: 'Innovation and Problem-Solving',
    discription: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the'
  },
  {
    id: 5,
    image:require('../src/icon/appicon.png.png'),
    title: 'Cultural Fit and Teamwork',
    discription: 'For customer-facing roles, the extent to which an employee contributes to positive customer experiences and satisfaction'
  },
]

export default function Onbording({ navigation }) {
  const scrollX = useRef(new Animated.Value(0)).current;  
  const [indexof, setIndex] = useState(1);
  const handleOnScroll = event => {
    Animated.event(
      [
        {
          nativeEvent: {
            contentOffset: {
              x: scrollX
            },
          },
        },
      ],
      {
        useNativeDriver: false
      },
    )(event)
  };
  const handleOnViewableItemsChanged = useRef(({ viewableItems }) => {
    setIndex(viewableItems[0].index + 1)
    console.log(viewableItems[0].index + 1, '-------------', viewableItems[0].index);
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  const ITEM_WIDTH = mobileW * 100 / 100 // size of you element
  const flatListRef = useRef(null)
  const TochangeIndex = () => {
    console.log("indexof", indexof);
    if (indexof != 6) {
      setIndex(indexof)
      if (flatListRef.current) {
        flatListRef.current.scrollToIndex({ index: indexof }) 
      }
    }
  }

  const NavigationPage = () => {
    navigation.navigate('Login');
    navigation.navigate('OnboardingPage','Done');// it's change gaurav
    // localStorage.setItemString('OnboardingPage','Done'); // it's change bobdev
   }

  return (
    <View style={{ flex: 1 }}>

      <View style={{ flex: 1, }}>
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white_color }}>
          <StatusBar barStyle="light-content" hidden={false} backgroundColor={Colors.themecolor} />
          {/* <ImageBackground resizeMode='contain' style={styles.backgroundImage}
            source={require('./Icon/screen_design.png')}> */}
            <TouchableOpacity activeOpacity={0.8} onPress={() => NavigationPage()}>
              <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>
          {/* </ImageBackground> */}
          <View>

          <FlatList
            pagingEnabled
            viewabilityConfig={viewabilityConfig}
            snapToAlignment='center'
            onScroll={handleOnScroll}
            onViewableItemsChanged={handleOnViewableItemsChanged}

            ref={flatListRef} // add ref
            getItemLayout={(data, index) => (
              { length: ITEM_WIDTH, offset: ITEM_WIDTH * index, index }
            )}
            data={slides}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            // onViewableItemsChanged={onViewRef.current}
            // viewabilityConfig={viewConfigRef.current}
            renderItem={({ item, index }) =>
              <View style={{  width: mobileW, }}>
                    
                <View style={{ justifyContent: 'center', alignItems: 'center', width: mobileW, padding: mobileW * 10 / 100  }}>
                <Text style={{textAlign:'center',color:Colors.black_color,fontSize:mobileW*4/100,marginTop:mobileW*15/100}}>"Elevate Performance, Achieve Excellence"</Text>
                  <Image resizeMode='contain' style={{ width: mobileW * 35 / 100, height: mobileH * 25/ 100 ,marginTop:mobileW*8/100 }}
                    source={item.image}></Image>

                  <Text style={{ alignItems: 'center', 
                  color: Colors.black_color, fontFamily:Font.FontSemiBold,
                   fontSize: mobileW * 5.5 / 100}}>
                   {item.title}
                    </Text>
            

                  <View style={{marginTop:mobileH*2/100, width: mobileW * 87 / 100}}>
                  <Text style={styles.description}>{item.discription}</Text>
                  </View>
                  </View>

              </View>

            }

          />
          </View>

<View style={{}}>
  
           
          <View>
          {indexof != 6 ?
             <View style={{flexDirection:"row",justifyContent:'space-around',marginTop:mobileW*35/100,   }}>
             <View style={{marginHorizontal:mobileW*40/100,  }}>
             {indexof != 6 ?
           <SliderDot data={slides} scrollX={scrollX} />:null}
           </View>
            <TouchableOpacity activeOpacity={0.8} onPress={() => TochangeIndex()} style={styles.nextText}>
              <Text style={{fontSize:mobileW*5/100, 
              fontFamily:Font.FontMedium, color:Colors.white_color,textAlign:'center'}}>Next</Text>
              {/* <Image resizeMode='contain' style={{ width: mobileW * 7 / 100, height: mobileW * 7 / 100, }}
                source={require('./Icon/icon_arrow_next.png')}></Image> */}
            </TouchableOpacity>
            </View>

             :
            <TouchableOpacity activeOpacity={0.8} style={styles.getstart} onPress={() => NavigationPage()}>
              <Text style={{ fontSize: mobileW * 4 / 100, fontFamily:Font.FontMedium, color: Colors.white_color }}>GET STARTED</Text>
            </TouchableOpacity>}
            </View>
      
          </View>
        </SafeAreaView>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  skipText: {
    fontSize: mobileW * 4 / 100,
    fontFamily:Font.FontMedium,
    color: Colors.black_color,
    alignSelf: 'flex-end',
    marginRight: mobileW * 5 / 100,
    marginTop: mobileW * 8 / 100
  },
  backgroundImage: {
    width: mobileW * 50 / 100, 
    alignSelf: 'flex-end',
    height: mobileW * 35 / 100,
    backgroundColor: Colors.white_color
  },
  nextText:{
right:mobileW*5/100,
backgroundColor:Colors.themecolor,
width:mobileW*18/100,
height:mobileW*8/100,
borderRadius:mobileW*2/100

  },

  getstart: {
    bottom:mobileW*-45/100,
    width: mobileW * 90 / 100,
    height: mobileW * 10 / 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: mobileW * 1.5 / 100,
    alignSelf: 'center',
    backgroundColor: Colors.themecolor,
    elevation: 1,
    shadowColor: '#000',
    borderColor: "#e8edfb",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, },
    shadowOpacity: 0.1,
  },
  description:{ 
    alignItems: 'center', 
    textAlign: 'center', 
    color: Colors.blackColor, 
    fontFamily:Font.FontRegular, 
    fontSize: mobileW * 4 / 100 
  },
})




