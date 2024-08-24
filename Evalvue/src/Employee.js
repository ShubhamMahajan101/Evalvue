// import { View, ScrollView, StatusBar, Modal, Alert, FlatList, Text, SafeAreaView, TextInput, StyleSheet, Dimensions, TouchableOpacity, Image, Keyboard, RefreshControl } from 'react-native'
// import React, { useState, useEffect } from 'react'
// import { Colors } from './Provider/Colorsfont'
// import axios from 'axios';
// import { Font, } from './Provider/utilslib/Utils';
// const mobileW = Dimensions.get('window').width;
// const mobileH = Dimensions.get('window').height;

// const organizationData = [

// 	{
// 		id:1,
// 		Company_Logo:require('./icon/18.jpg'),
// 		employeename:"AMan",
// 		Eprofile:"Python Developer",
// 		Time:"5 h ago",
// 		profile:require('./icon/karthik.jpeg'),
// 		EDescription:"In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the"
// 	},
// 	{
// 		id:2,
// 		Company_Logo:require('./icon/18.jpg'),
// 		employeename:"Gupta",
// 		Eprofile:"Python Developer",
// 		Time:"5 h ago",
// 		EDescription:"In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the"
// 	},
// 	{
// 		id:3,
// 		Company_Logo:require('./icon/karthik.jpeg'),
// 		employeename:"Virat",
// 		Eprofile:"Python Developer",
// 		Time:"5 h ago",
// 		profile:require('./icon/kahli.png'),
// 		EDescription:"In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the"
// 	},
// 	{
// 		id:4,
// 		profile:require('./icon/karthik.jpeg'),
// 		employeename:"Mohali",
// 		Eprofile:"Python Developer",
// 		Time:"5 h ago",
// 		profile:require('./icon/kahli.png'),
// 		EDescription:"In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the"
// 	},
// 	{
// 		id:5,
// 		Company_Logo:require('./icon/18.jpg'),
// 		employeename:"Gupta",
// 		Eprofile:"Python Developer",
// 		Time:"5 h ago",
// 		EDescription:"In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the"
// 	},
// 	{
// 		id:6,
// 		Company_Logo:require('./icon/18.jpg'),
// 		employeename:"Gupta",
// 		Eprofile:"Python Developer",
// 		Time:"5 h ago",
// 		EDescription:"In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the"
// 	},
// 	{
// 		id:7,
// 		profile:require('./icon/18.jpg'),
// 		employeename:"Gupta",
// 		Eprofile:"Python Developer",
// 		Time:"5 h ago",
// 		EDescription:"In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the"
// 	},

// ]





//  const Employee = ({ navigation }) => {

//   return (
//     <View style={{ flex: 1,alignSelf:'center',justifyContent:'center' }}>
//     <SafeAreaView style={{ flex: 1 }}>
//       <StatusBar barStyle="dark-content" hidden={false} backgroundColor={Colors.themecolor} />

//       <View style={{flexDirection:'row',padding:mobileW*2/100,justifyContent:'space-around'}}>
//       <View style={{alignItems:'center'}}>
//       <Image style={styles.imageIcon2} resizeMode='contain' source={require('./icon/12.jpg')}></Image>
//             <Text style={{color:Colors.black_color,fontSize:mobileW*3/100}}>Koshik</Text>
//       </View>
//       <TouchableOpacity style={styles.searchBarView} onPress={() => navigation.navigate('Search')} activeOpacity={0.8} >


//               <Image style={styles.SearchIcon} resizeMode='contain'
//                 source={require('./icon/search.png')}></Image>

//        <Text style={{color:Colors.dark_gray,fontSize:mobileW*3.5/100,left:mobileW*3.5/100}}>Search </Text>

//     </TouchableOpacity>
// <Image style={styles.dotIcon} resizeMode='contain'source={require('./icon/dots.png')}></Image>







//       </View>

// <FlatList
//                 data={organizationData}
//                 // horizontal={true}
//                 showsHorizontalScrollIndicator={false}
//                 renderItem={({ item, index }) =>
//     <View style={styles.jobCardView}>

// 	<View style={{flexDirection:'row'}}>	
// 	<Image resizeMode='contain' style={{ width: mobileW * 14 / 100, height: mobileW * 14 / 100,
// 		borderRadius:mobileW*12/100
// 	 }} source={item.Company_Logo}></Image>
// 	<View style={{padding:mobileW*1/100}}>	
// 	<Text style={{color:Colors.black_color,fontSize:mobileW*3.5/100,fontFamily:Font.FontBold}}>{item.employeename}</Text>
// 	<Text style={{color:Colors.black_color,fontSize:mobileW*2.5/100}}>{item.Eprofile}</Text>
// 	<Text style={{color:Colors.black_color,fontSize:mobileW*2.5/100}}>{item.Time}</Text>
// 	</View>
// 	</View>
// 	<Image resizeMode='contain' style={{ width: mobileW * 45 / 100, height: mobileW * 18 / 100,
// 		borderRadius:mobileW*0/100,alignSelf:"center" }} source={item.profile}></Image>
// 	<Text style={{color:Colors.black_color,fontSize:mobileW*3/100,
// 	width:mobileW*85/100,marginTop:mobileW*2/100,fontFamily:Font.FontBold}}>{item.EDescription}</Text>

//      </View>

// 				}/>
//    	</SafeAreaView>
// 		</View>
//   );
// };

// export default Employee;
// const styles = StyleSheet.create({
//   jobCardView: {
// 		elevation: 0.2,
// 		shadowColor: '#000',
// 		borderColor: "#e8edfb",
// 		borderWidth: 1,
// 		shadowOpacity: 0.1,
// 		shadowOffset: { width: 0, },
// 		width: mobileW * 95 / 100,
// 		padding: mobileW * 2 / 100,
// 		marginRight: mobileW * 1 / 100,
// 		borderRadius: mobileW * 2 / 100,
// 		marginBottom: mobileW * 2 / 100,
// 		backgroundColor: Colors.white_color,
// 		marginTop:mobileW*2/100,
// 		// height:mobileW*35/100
// 	  },
//     container: {
//       flex: 1,
//     },
//     imageIcon2: {
//       width: mobileW * 12 / 100,
//       height: mobileW * 12 / 100,
//       borderRadius: mobileW * 8 / 100,

//       // marginHorizontal: mobileW * 2 / 100,
//       },
//       SearchIcon: {
//       width: mobileW * 5 / 100,
//       height: mobileW * 5 / 100,
//       tintColor: Colors.themecolor,
//       left: mobileW * 2 / 100
//       },
//       dotIcon: {
//       width: mobileW * 5 / 100,
//       height: mobileW * 5 / 100,
//       tintColor: Colors.themecolor,
//       alignSelf:'center',
//        left: mobileW * 2 / 100
//       },
//       searchText: {
//       color: Colors.black_color,
//       marginHorizontal: mobileW * 3 / 100,
//       fontSize: mobileW * 4 / 100,
//       fontFamily: Font.FontSemiBold
//       },
//       input: {
//       width: mobileW * 35 / 100,
//       height: mobileW * 20 / 100,
//       fontFamily: Font.FontRegular,
//       borderColor: Colors.themecolor,
//       color: Colors.gray,
//         },
//         searchBarView: {
//           flexDirection: 'row',
//           alignItems: 'center',
//           backgroundColor: 'white',
//           width: mobileW * 68/ 100,
//           height: mobileW * 10 / 100,
//           alignSelf: 'center',
//           borderWidth: 1,
//           borderColor: "#E7E8EA",
//           borderRadius: mobileW * 1 / 100,
//           backgroundColor: Colors.bgcolor,
//           },


// })
{/* <TouchableOpacity onPress={() => navigation.navigate('Jobapply')}  */ }


import { View, StatusBar, Text, StyleSheet, Dimensions, TouchableOpacity, Image, Modal, Alert, ScrollView, FlatList, TextInput, RefreshControl } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from './Provider/Colorsfont';
import { config, msgProvider, msgText, consolepro, Lang_chg, Font, localStorage, msgTitle, localimag, apifuntion, notification } from './Provider/utilslib/Utils';
import HideWithKeyboard from 'react-native-hide-with-keyboard';
import Footer from './Provider/Footer';
const mobileW = Dimensions.get('window').width;
const mobileH = Dimensions.get('window').height;



const jobdata = [
  {
    id: 1,
    company: 'Kunal pandey',
    Company_Logo: require('./icon/karthik.jpeg'),
    designation: "React-Native"

  },
  {
    id: 2,
    company: 'Rahul chokse',
    Company_Logo: require('./icon/karthik.jpeg'),
    designation: "Qa Tester"
  },
  {
    id: 3,
    company: 'Shivam dubey',
    Company_Logo: require('./icon/karthik.jpeg'),
    designation: "Android Developer"
  },
  {
    id: 4,
    company: 'Bigbasket',
    Company_Logo: require('./icon/karthik.jpeg'),
    designation: "UI-Ux Designer"
  },
  {
    id: 5,
    company: 'Robin raj',
    Company_Logo: require('./icon/karthik.jpeg'),
    designation: "Project Manager"
  },
  {
    id: 6,
    company: 'AAyu ',
    Company_Logo: require('./icon/karthik.jpeg'),
    designation: "UI-Ux Designer"
  },
  {
    id: 7,
    company: 'Ritvik gawde',
    Company_Logo: require('./icon/karthik.jpeg'),
    designation: "Project Manager"
  },
  {
    id: 8,
    company: 'Robin sharma',
    Company_Logo: require('./icon/karthik.jpeg'),
    designation: "UX Designer"
  },
  {
    id: 9,
    company: 'Abhishek gurjar',
    Company_Logo: require('./icon/karthik.jpeg'),
    designation: "Project Manager"
  },
  {
    id: 10,
    company: 'Prateek khare',
    Company_Logo: require('./icon/karthik.jpeg'),
    designation: "HR Specialist "
  },
  {
    id: 1,
    company: 'Kunal pandey',
    Company_Logo: require('./icon/karthik.jpeg'),
    designation: "React-Native"

  },
  {
    id: 2,
    company: 'Rahul chokse',
    Company_Logo: require('./icon/karthik.jpeg'),
    designation: "Qa Tester"
  },
  {
    id: 3,
    company: 'Shivam dubey',
    Company_Logo: require('./icon/karthik.jpeg'),
    designation: "Android Developer"
  },
  {
    id: 4,
    company: 'Bigbasket',
    Company_Logo: require('./icon/karthik.jpeg'),
    designation: "UI-Ux Designer"
  },
  {
    id: 5,
    company: 'Robin raj',
    Company_Logo: require('./icon/karthik.jpeg'),
    designation: "Project Manager"
  },
  {
    id: 6,
    company: 'AAyu ',
    Company_Logo: require('./icon/karthik.jpeg'),
    designation: "UI-Ux Designer"
  },
  {
    id: 7,
    company: 'Ritvik gawde',
    Company_Logo: require('./icon/karthik.jpeg'),
    designation: "Project Manager"
  },
  {
    id: 8,
    company: 'Robin sharma',
    Company_Logo: require('./icon/karthik.jpeg'),
    designation: "UX Designer"
  },
  {
    id: 9,
    company: 'Abhishek gurjar',
    Company_Logo: require('./icon/karthik.jpeg'),
    designation: "Project Manager"
  },
  {
    id: 10,
    company: 'Prateek khare',
    Company_Logo: require('./icon/karthik.jpeg'),
    designation: "HR Specialist "
  }
]



const Employee = ({ navigation }) => {

  const [companyList, setcompanyList] = useState(jobdata)
  const [searchQuery, setSearchQuery] = useState('');

  // ================ refresh controller 
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  // ================ refresh controller 

  const _searchLearner = (text) => {
    setSearchQuery(text);
    const filteredResults = jobdata.filter((item) =>
      item.company.toLowerCase().includes(text.toLowerCase())
    );
    setcompanyList(filteredResults);
  };




  return (
    <View style={{ flex: 1, backgroundColor: Colors.white_color }}>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" hidden={false} backgroundColor="#575fb4" translucent={true} />
        <ScrollView

          refreshControl={
            <RefreshControl
              // tintColor={Colors.themecolor}
              colors={[Colors.themecolor]}
              refreshing={refreshing} onRefresh={onRefresh} />
          }>

          <View style={{ flexDirection: 'row', padding: mobileW * 2 / 100, justifyContent: 'space-around', backgroundColor: Colors.white_color }}>
            <View style={{ alignItems: 'center' }}>
              <TouchableOpacity >
                <Image style={styles.imageIcon2} resizeMode='contain'
                  source={require('./icon/12.jpg')}></Image>
              </TouchableOpacity>
              <Text style={{
                color: Colors.black_color, fontSize: mobileW * 2.5 / 100,
                fontFamily: Font.FontBold, marginTop: mobileW * 0.4 / 100
              }}>JAGJEET Shingh</Text>
            </View>
            <TouchableOpacity style={styles.searchBarView} onPress={() => navigation.navigate('Search')} activeOpacity={0.8} >


              <Image style={styles.SearchIcon} resizeMode='contain'
                source={require('./icon/search.png')}></Image>

              <Text style={{ color: Colors.dark_gray, fontSize: mobileW * 3.5 / 100, left: mobileW * 3.5 / 100 }}>Search </Text>
            </TouchableOpacity>
            <Image style={styles.dotIcon} resizeMode='contain' source={require('./icon/dots.png')}></Image>
          </View>
          <View style={{}}>


            {companyList != "" ?
              <View style={{ justifyContent: "center", alignSelf: 'center', marginTop: mobileW * 3 / 100 }}>

                <FlatList
                  // numColumns={2}
                  data={companyList}
                  renderItem={({ item, id }) =>

                    <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Jobapply', { item: item })} style={styles.CardView}>

                      <View style={styles.Company_LogoView}>
                        <Image resizeMode='contain' style={{ width: mobileW * 9 / 100, height: mobileW * 10 / 100, alignSelf: 'center' }} source={item.Company_Logo} />
                      </View>


                      <Text style={styles.CompanyName}>{item.company}</Text>
                      <Text style={styles.CompanyName}>{item.designation}</Text>
                    </TouchableOpacity>

                  } />
              </View>
              :
              <View style={{ alignItems: "center", justifyContent: "center", marginTop: mobileH * 35 / 100 }}>
                <Text style={{ fontSize: mobileW * 5 / 100, color: Colors.blackColor, fontFamily: Font.FontMedium }}>No data founD</Text>
              </View>
            }
          </View>

        </ScrollView>
        <HideWithKeyboard>
          <Footer
            activepage='Dashboard'
            usertype={1}
            footerpage={[
              { name: "Footer", countshow: false, image: require('./icon/home.png'), activeimage: require('../src/icon/appicon.png.png') },
              { name: "Employee", countshow: false, image: require('./icon/teamwork(2).png'), activeimage: require('../src/icon/appicon.png.png') },
              { name: "Login", countshow: false, image: require('./icon/more.png'), activeimage: require('../src/icon/appicon.png.png') },
              { name: "Employee", countshow: false, image: require('./icon/bell-ring.png'), activeimage: require('../src/icon/appicon.png.png') },
              { name: "Login", countshow: false, image: require('./icon/teamwork.png'), activeimage: require('../src/icon/appicon.png.png') },
            ]}
            navigation={navigation}
            imagestyle1={{ width: mobileW * 10 / 100, height: mobileW * 6 / 100, backgroundColor: Colors.whiteColor, countcolor: 'black', countbackground: 'black', }}
          />
        </HideWithKeyboard>
      </SafeAreaView>
    </View>
  )
}
export default Employee;
const styles = StyleSheet.create({
  Header: {
    width: mobileW,
    height: mobileW * 15 / 100,
    // padding: mobileW * 4 / 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.white_color,
    alignItems: 'center',
    padding: mobileW * 5 / 100,
    marginTop: mobileW * 3 / 100
  },
  Company_LogoView: {
    width: mobileW * 14 / 100,
    height: mobileW * 14 / 100,
    borderRadius: mobileW * 1 / 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FAFAFA',
  },
  backIcon: {
    width: mobileW * 6 / 100,
    height: mobileW * 6 / 100,
    left: mobileW * 5.7 / 100,
  },
  SearchView: {
    flexDirection: 'row',
    borderColor: "#E7E8EA",
    left: mobileW * 4 / 100,
    width: mobileW * 75 / 100,
    height: mobileW * 12 / 100,
    borderRadius: mobileW * 6 / 100,
    borderWidth: mobileW * 0.3 / 100,
  },
  imageIcon2: {
    width: mobileW * 12 / 100,
    height: mobileW * 12 / 100,
    borderRadius: mobileW * 8 / 100,

    // marginHorizontal: mobileW * 2 / 100,
  },
  SearchIcon: {
    width: mobileW * 5 / 100,
    height: mobileW * 5 / 100,
    tintColor: Colors.themecolor,
    left: mobileW * 2 / 100
  },
  dotIcon: {
    width: mobileW * 5 / 100,
    height: mobileW * 5 / 100,
    tintColor: Colors.themecolor,
    alignSelf: 'center',
    left: mobileW * 2 / 100
  },
  searchText: {
    color: Colors.black_color,
    marginHorizontal: mobileW * 3 / 100,
    fontSize: mobileW * 4 / 100,
    fontFamily: Font.FontSemiBold
  },
  input: {
    width: mobileW * 35 / 100,
    height: mobileW * 20 / 100,
    fontFamily: Font.FontRegular,
    borderColor: Colors.themecolor,
    color: Colors.gray,

  },
  searchBarView: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    width: mobileW * 68 / 100,
    height: mobileW * 10 / 100,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: "#E7E8EA",
    borderRadius: mobileW * 1 / 100,
    backgroundColor: Colors.bgcolor,
    left: mobileW * 1 / 100
  },
  SearchIcon: {
    alignSelf: 'center',
    tintColor: '#9B9B9B',
    left: mobileW * 2 / 100,
    width: mobileW * 5 / 100,
    height: mobileW * 5 / 100,
  },
  CardView: {
    alignSelf: "center",
    borderColor: "#E7E8EA",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    width: mobileW * 85 / 100,
    height: mobileW * 15 / 100,
    borderRadius: mobileW * 3 / 100,
    borderWidth: mobileW * 0.2 / 100,
    marginVertical: mobileW * 1 / 100,
    marginHorizontal: mobileW * 1 / 100,
    flexDirection: 'row'
  },
  Company_LogoView: {
    alignSelf: 'center',
    backgroundColor: Colors.gray,
    width: mobileW * 12 / 100,
    height: mobileW * 12 / 100,
    borderRadius: mobileW * 10 / 100,
    borderColor: Colors.white_color,
    borderWidth: mobileW * 0.4 / 100
  },
  CompanyName: {
    color: Colors.black_color,
    fontFamily: Font.FontMedium,
    // left: mobileW * 2 / 100,
    width: mobileW * 30 / 100,
    fontSize: mobileW * 3.5 / 100,
    textAlign: 'center',
    alignSelf: 'center'
  }

})


