import { View, Animated, StyleSheet, Dimensions } from 'react-native'
import React from 'react';
import { Colors } from './Provider/Colorsfont';
const {width} = Dimensions.get('screen')

export default function SliderDot({data, scrollX}) {
  return (
    <View style={styles.Container}>
      {/* <Text>SliderDot</Text> */}

      {data.map((_, idx) =>{
        const inputRange = [(idx-1)*width,idx * width,(idx+1)* width];
        const dotWidth =scrollX.interpolate({
            inputRange,
            outputRange:[15,15,15],
            extrapolate:'clamp'
        })
        const backgroundColor = scrollX.interpolate({
            inputRange,
            outputRange: [Colors.light_grey, Colors.themecolor, Colors.light_grey],
            extrapolate: 'clamp',
          });
        return <Animated.View kay={idx.toString()} style={[styles.dot, {width: dotWidth, backgroundColor},]}/>
      })}
    </View>
  )
}
const styles = StyleSheet.create({
    Container:{
position:'absolute',
bottom:10,
flexDirection:'row',
// width:'100%',
// alignItems:'center',
alignSelf:'center',
justifyContent:'center',
// backgroundColor:'yellow'
    },
    dot: {
        width: 6,
        height: 3,
        borderRadius: 3,
        marginHorizontal: 3,
        backgroundColor: '#ccc',
      },
      dotActive: {
        backgroundColor: Colors.themecolor,
      },
//     StyleDot:{
// width:12, height:12, borderRadius:6,
// backgroundColor:Colors.themecolor
//     }
})