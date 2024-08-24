import { View, ScrollView, StatusBar, Modal, Alert, FlatList, Text, SafeAreaView, TextInput, StyleSheet, Dimensions, TouchableOpacity, Image, Keyboard, RefreshControl } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Colors } from './Provider/Colorsfont'
import axios from 'axios';
import { Font, } from './Provider/utilslib/Utils';
const mobileW = Dimensions.get('window').width;
const mobileH = Dimensions.get('window').height;


export default function Post ({ navigation }) {

  const [Searchtext, setSearchtext] = useState('')
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {

    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);



  useEffect(() => {

  }, [])
  const apiCalling = () => {
    Keyboard.dismiss()
    alert('no data found')
  }

  return (
    <View style={{ flex: 1, }}>
      {/* <SafeAreaView style={{ flex: 0.2, backgroundColor: Colors.white_color }}> */}
        <StatusBar barStyle="light-content" hidden={false} backgroundColor={Colors.themecolor} />
        <View style={styles.Header}>
          <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.goBack()}>
            <Image style={styles.backIcon_arrow} resizeMode='contain' source={require('./icon/close.png')}></Image>
          </TouchableOpacity>

          <View style={styles.searchBarView}>
            <TextInput
              style={styles.input}
              onChangeText={text => setSearchtext(text)}
              paddingLeft={mobileW * 5 / 100}
              mode="outlined"
              placeholderTextColor={Colors.black_color}
              fontSize={mobileW * 3.5 / 100}
              placeholder="Search"
            />
            {Searchtext != '' &&
              <TouchableOpacity onPress={() => apiCalling()} activeOpacity={0.8} style={{ marginRight: mobileW * 0 / 100 }}>
                <Image style={styles.SearchIcon} resizeMode='contain'
                  source={require('./icon/search.png')}></Image>
              </TouchableOpacity>}
          </View>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              colors={[Colors.themecolor]}
              refreshing={refreshing} onRefresh={onRefresh} />
          }>


        </ScrollView>
      {/* </SafeAreaView> */}
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  Header: {
    backgroundColor: Colors.white_color,
    width: mobileW,
    height: mobileW * 15 / 100,
    flexDirection: 'row',
    // justifyContent: 'space-between',
    padding: mobileW * 4 / 100,
    alignItems: "center",
    marginTop:mobileW*10/100
  },
  backIcon: {
    width: mobileW * 5 / 100,
    height: mobileW * 5 / 100,
    tintColor: Colors.black_color
  },
  backIcon_CLOse: {
    width: mobileW * 6 / 100,
    height: mobileW * 6 / 100,
    tintColor: Colors.color_orange
  },
  backIcon_arrow: {
    width: mobileW * 4/ 100,
    height: mobileW * 4 / 100
  },
  SearchIcon: {
    width: mobileW * 5 / 100,
    height: mobileW * 5 / 100,
    tintColor: Colors.themecolor,
    right: mobileW * 3 / 100
  },
  searchText: {
    color: Colors.black_color,
    marginHorizontal: mobileW * 3 / 100,
    fontSize: mobileW * 4 / 100,
    fontFamily: Font.FontSemiBold
  },
  input: {
    width: mobileW * 80 / 100,
    height: mobileW * 11 / 100,
    fontFamily: Font.FontRegular,
    borderColor: Colors.themecolor,
    color: Colors.gray,

  },
  searchBarView: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    width: mobileW * 85 / 100,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: "#E7E8EA",
    justifyContent: 'space-between',
    borderRadius: mobileW * 1 / 100,
    borderRadius: mobileW * 7 / 100,
    backgroundColor: Colors.bgcolor,
    marginHorizontal: mobileW * 3 / 100

  },
  ModelView: {
    width: mobileW * 85 / 100,
    borderRadius: mobileW * 3 / 100,
    backgroundColor: Colors.white_color,
    elevation: 5,
  },
  ModelHeader: {
    width: mobileW * 85 / 100,
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
  GIF_modal: {
    flex: 1,
    backgroundColor: '#00000060',
    justifyContent: 'center',
    alignItems: "center"
  },
  Card: {
    backgroundColor: Colors.white_color,
    width: mobileW,
    flexDirection: 'row',
    marginTop: mobileW * 3 / 100,
  },
  imageCard: {
    width: mobileW * 14 / 100,
    height: mobileW * 14 / 100,
    borderRadius: mobileW * 10 / 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.green,
    backgroundColor: Colors.white_color
  },
  chatButton: {
    width: mobileW * 17 / 100,
    borderRadius: mobileW * 1 / 100,
    marginTop: mobileW * 2 / 100,
    justifyContent: 'center',
    alignItems: 'center',
    height: mobileW * 6.5 / 100,
    backgroundColor: Colors.themecolor,
    marginBottom: mobileW * 2 / 100,
    left: mobileW * 10 / 100
  }
}
)














