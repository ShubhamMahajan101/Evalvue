// import {
// 	StatusBar, ScrollView, Animated, RefreshControl, FlatList, View, Text, Dimensions,
// 	TouchableOpacity, Modal, Image, StyleSheet, Alert, SafeAreaView, TextInput,
// } from 'react-native'
// import React, { useCallback, useRef, useState, useEffect } from 'react'
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { Colors } from './Provider/Colorsfont';
// import { localStorage } from './Provider/localStorageProvider';
// import { config, msgProvider, msgText, consolepro, Lang_chg, Font, msgTitle, localimag, apifuntion, notification } from './Provider/utilslib/Utils';
// import Footer from './Provider/Footer';
// import HideWithKeyboard from 'react-native-hide-with-keyboard';
// import { AirbnbRating } from 'react-native-ratings';
// import axios from 'axios';
// import {
// 	createDrawerNavigator,
// 	DrawerContentScrollView,
// 	DrawerItemList,
// 	DrawerItem,
// } from '@react-navigation/drawer';
// const mobileW = Dimensions.get('window').width;
// const mobileH = Dimensions.get('window').height;
// const organizationData = [
// 	{
// 		id: 1,
// 		companymane: "Tata Consultancy Services",
// 		Companylogo: require('./icon/16.png'),
// 		Company_Logo: require('./icon/12.jpg'),
// 		startratting: require('./icon/icons8-star-48.png'),
// 		employeename: "AMan",
// 		Eprofile: "Python Developer",
// 		Time: "5 h ago",
// 		profile: require('./icon/karthik.jpeg'),
// 		EDescription: "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the",


// 	},

// 	{
// 		id: 2,
// 		companymane: "Infosys",
// 		Companylogo: require('./icon/17.png'),
// 		Company_Logo: require('./icon/12.jpg'),
// 		employeename: "Gupta",
// 		Eprofile: "Python Developer",
// 		Time: "5 h ago",
// 		startratting: require('./icon/icons8-star-48.png'),
// 		EDescription: "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the"
// 	},
// 	{
// 		id: 3,
// 		companymane: "Infobeans",
// 		Companylogo: require('./icon/18.jpg'),
// 		Company_Logo: require('./icon/karthik.jpeg'),
// 		employeename: "Virat",
// 		Eprofile: "Python Developer",
// 		Time: "5 h ago",
// 		startratting: require('./icon/icons8-star-48.png'),
// 		profile: require('./icon/kahli.png'),
// 		EDescription: "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the"
// 	},
// 	{
// 		id: 4,
// 		companymane: "Tata Consultancy Services",
// 		Companylogo: require('./icon/16.png'),
// 		profile: require('./icon/karthik.jpeg'),
// 		employeename: "Mohali",
// 		Eprofile: "Python Developer",
// 		Time: "5 h ago",
// 		startratting: require('./icon/icons8-star-48.png'),

// 		profile: require('./icon/kahli.png'),
// 		EDescription: "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the"
// 	},
// 	{
// 		id: 5,
// 		companymane: "Infobeans",
// 		Companylogo: require('./icon/18.jpg'),
// 		Company_Logo: require('./icon/12.jpg'),
// 		employeename: "Gupta",
// 		Eprofile: "Python Developer",
// 		Time: "5 h ago",
// 		startratting: require('./icon/icons8-star-48.png'),

// 		EDescription: "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the"
// 	},
// 	{
// 		id: 6,
// 		companymane: "Infobeans",
// 		Companylogo: require('./icon/18.jpg'),
// 		Company_Logo: require('./icon/12.jpg'),
// 		employeename: "Gupta",
// 		Eprofile: "Python Developer",
// 		Time: "5 h ago",
// 		startratting: require('./icon/icons8-star-48.png'),

// 		EDescription: "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the"
// 	},
// 	{
// 		id: 7,
// 		companymane: "Infobeans",
// 		Companylogo: require('./icon/18.jpg'),
// 		profile: require('./icon/karthik.jpeg'),
// 		employeename: "Gupta",
// 		Eprofile: "Python Developer",
// 		Time: "5 h ago",
// 		startratting: require('./icon/icons8-star-48.png'),

// 		EDescription: "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the"
// 	},

// ]


// export const trimText = (text, length) => {
// 	return text.length > length ? text.substring(0, length) + "..." : text;
// }
// const Dashboard = ({ navigation, route }) => {
// 	//  const  {userid, organizationid } = route.params;
// 	// console.log(userid, organizationid , "....................... user_id _________> ,organization_id _____________>");
// 	// const user_id = route.params.user_id;
// 	// console.log(user_id, "....................... dash     screeen.!!!!!!!!!!!!user_id");
// 	// const image = route.params.item;
// 	// console.log(image,"image====== Dashbord screen ====>");
// 	const [feeddata, setfeeddata] = useState()
// 	// console.log(feeddata  , "... feeddata-");
// 	const [ttoken, settoken] = useState()
// 	console.log(ttoken, "ttoken > .. dashboard screen ..........> ttoken");
// 	const [ggetuser_id, setggetuser_id] = useState()
// 	console.log(ggetuser_id, "ggetuser_id........ dashboard screen..........>");
// 	const [image, setimgeset] = useState()
// 	const [ModalVisible_GifModal, setModalVisible_GifModal] = useState(false)
// 	useEffect(() => {
// 		feed_api()
// 		const getData = async () => {
// 			const user_token = await AsyncStorage.getItem('user_token')
// 			settoken(user_token)
// 			// console.log("==================> get data to ken  c screen =============>", ttoken);

// 			const userid = await AsyncStorage.getItem('userid')
// 			setggetuser_id(userid)

// 			const imgeset = await AsyncStorage.getItem('imgeset')
// 			setimgeset(imgeset)
// 			console.log(imgeset, " imgeset          imgeset imgeset imgeset imgeset ==================> imgeset =============>", imgeset);

// 		}
// 		getData()
// 	}, [ttoken])
// 	useEffect(() => {
// 		setModalVisible_GifModal(false)
// 	}, 1000)



// 	// 0738
// 	const feed_api = () => {
// 		axios.post('http://test.api.evalvue.com/dashboard/feed/', {}, {
// 			headers: {
// 				Authorization: `Bearer ${ttoken}`
// 			}
// 		})
// 			.then(async (response) => {
// 				console.log(response.data.dashboard_list, '.......... response feed api ');
// 				setfeeddata(response.data.dashboard_list)
// 			})
// 			.catch((error) => {
// 				console.error('Error fetching feed data:', error.response ? error.response.data : error.message);
// 			});
// 	}






// 	return (
// 		<View style={{ flex: 1 }}>
// 			<SafeAreaView style={{ flex: 1 }}>
// 				<StatusBar barStyle="dark-content" hidden={false} backgroundColor={Colors.themecolor} />


// 				<View style={{
// 					flexDirection: 'row', padding: mobileW * 2 / 100, justifyContent: 'space-around',
// 					backgroundColor: Colors.white_color,
// 				}}>
// 					<View style={{ alignItems: 'center' }}>
// 						<TouchableOpacity onPress={() => navigation.openDrawer()} >
// 							<Image style={styles.imageIcon2} resizeMode='contain'
// 								source={require('./icon/12.jpg')}></Image>
// 							{/* //  source={ image= null ? require('./icon/12.jpg'):{ uri: image}}></Image> */}

// 						</TouchableOpacity>
// 						<Text style={{
// 							color: Colors.black_color, fontSize: mobileW * 2.5 / 100,
// 							fontFamily: Font.FontBold, marginTop: mobileW * 0.4 / 100
// 						}}>  Shingh</Text>
// 					</View>
// 					<TouchableOpacity style={styles.searchBarView} onPress={() => navigation.navigate('Search')} activeOpacity={0.8} >


// 						<Image style={styles.SearchIcon} resizeMode='contain'
// 							source={require('./icon/search.png')}></Image>

// 						<Text style={{ color: Colors.dark_gray, fontSize: mobileW * 3.5 / 100, left: mobileW * 3.5 / 100 }}>Search </Text>
// 					</TouchableOpacity>
// 					<Image style={styles.dotIcon} resizeMode='contain' source={require('./icon/dots.png')}></Image>
// 				</View>
// {/* 
// 				{feeddata == ""? */}
// 				 <View>
// 					{feeddata != "" ? (
// 						<View style={{width:mobileW*100/100,height:mobileH*100/100}}>
// 							<Modal   animationType="slide" transparent={true}
// 								visible={ModalVisible_GifModal}
// 								onRequestClose={() => { setModalVisible_GifModal(!ModalVisible_GifModal); }} >
// 								<View style={[styles.GIF_modal,]}>
// 									<Image style={{ width: mobileW * 30 / 100, height: mobileW * 20 / 100, alignSelf: "center" }}
// 										resizeMode='contain' source={require("./icon/neighcoach_loader.gif")}></Image>
// 								</View>
// 							</Modal>
// 						</View>
// 					) : ( 

// 						<FlatList
// 							data={feeddata}
// 							// horizontal={true}
// 							showsHorizontalScrollIndicator={false}
// 							renderItem={({ item, index }) =>
// 								<View style={styles.jobCardView1}>
// 									<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
// 										<View style={{ flexDirection: 'row', justifyContent: "space-around" }}>
// 											<Image resizeMode="contain" style={{
// 												width: mobileW * 8 / 100, height: mobileW * 8 / 100,
// 												borderRadius: mobileW * 12 / 100, borderColor: Colors.themecolor, borderWidth: mobileW * 0.3 / 100
// 											}} source={{ uri: item.organization_image }}></Image>
// 											<View>
// 												<Text style={{
// 													color: Colors.black_color, fontSize: mobileW * 3.5 / 100,
// 													fontFamily: Font.FontBold, alignItems: 'center', alignSelf: 'center', left: mobileW * 0 / 100
// 												}}>
// 													{item.organization_name}</Text>
// 												<Text style={{
// 													color: Colors.black_color, fontSize: mobileW * 3 / 100,
// 													fontFamily: Font.FontBold, alignItems: 'center', alignSelf: 'center', left: mobileW * 2 / 100
// 												}}>
// 													{item.created_on}</Text>

// 											</View>
// 										</View>
// 										<Image style={[styles.dotIcon, {}]} resizeMode='contain' source={require('./icon/dots.png')}></Image>
// 									</View>

// 									<View style={[styles.jobCardView]}>
// 										{/* <Text style={[styles.Dynamic_text, { width: mobileW * 22 / 100, }]}> */}
// 										<View style={{ flexDirection: 'row' }}>
// 											<Image resizeMode='contain' style={{
// 												width: mobileW * 14 / 100, height: mobileW * 14 / 100,
// 												borderRadius: mobileW * 12 / 100, borderColor: Colors.themecolor,
// 												borderWidth: mobileW * 0.3 / 100
// 											}} source={{ uri: item.employee_image }}></Image>

// 											<View style={{ padding: mobileW * 1 / 100 }}>
// 												<Text style={{ color: Colors.black_color, fontSize: mobileW * 3.5 / 100, fontFamily: Font.FontBold }}>{item.employee_name}</Text>
// 												<Text style={{ color: Colors.black_color, fontSize: mobileW * 3 / 100, }}>{item.designation}</Text>
// 											</View>
// 										</View>
// 										<Image resizeMode="contain" style={{
// 											alignSelf: 'center',
// 											width: mobileW * 8 / 100, height: mobileW * 8 / 100,
// 											borderRadius: mobileW * 12 / 100, borderColor: Colors.themecolor, borderWidth: mobileW * 0.3 / 100
// 										}} source={{ uri: item.organization_image }}></Image>
// 										<Text style={{
// 											color: Colors.black_color, fontSize: mobileW * 3 / 100, width: mobileW * 85 / 100,
// 											marginTop: mobileW * 2 / 100, fontFamily: Font.FontBold
// 										}}>{item.comment}...</Text>

// 									</View>
// 									<View style={{ flexDirection: 'row' }}>
// 										<Text style={{ fontSize: mobileW * 3 / 100, color: Colors.black_color, right: mobileW * 0 / 100 }}>Total over All ratting :</Text>
// 										<AirbnbRating
// 											count={5}
// 											defaultRating={item.rating}
// 											size={18}
// 											showRating={false}
// 											isDisabled
// 											starContainerStyle={{ marginTop: mobileW * -1 / 100 }}
// 										/>
// 									</View>

// 								</View>
// 							} />

// 					 )} 


// 				</View>



// 				</SafeAreaView>
// 				<HideWithKeyboard>
// 					<Footer
// 						activepage='Dashboard'
// 						usertype={1}
// 						footerpage={[
// 							{
// 								name: "Footer", countshow: false, image: require('./icon/home.png'),
// 								activeimage: require('../src/icon/appicon.png.png')
// 							},
// 							{
// 								name: "Employee", countshow: false, image: require('./icon/teamwork(2).png'),
// 								activeimage: require('../src/icon/appicon.png.png')
// 							},
// 							{
// 								name: "Post", countshow: false, image: require('./icon/more.png'),
// 								activeimage: require('../src/icon/appicon.png.png')
// 							},
// 							{
// 								name: "Employee", countshow: false, image: require('./icon/bell-ring.png'),
// 								activeimage: require('../src/icon/appicon.png.png')
// 							},
// 							{
// 								name: "Login", countshow: false, image: require('./icon/teamwork.png'),
// 								activeimage: require('../src/icon/appicon.png.png'),
// 							},
// 						]}
// 						navigation={navigation}
// 						imagestyle1={{
// 							width: mobileW * 10 / 100, height: mobileW * 6 / 100, backgroundColor: Colors.whiteColor,
// 							countcolor: 'black', countbackground: 'black',
// 						}} />
// 				</HideWithKeyboard>

// 		</View>
// 	)
// }
// export default Dashboard;
// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 	},
// 	imageIcon2: {
// 		width: mobileW * 12 / 100,
// 		height: mobileW * 12 / 100,
// 		borderRadius: mobileW * 8 / 100,
// 		borderColor: Colors.themecolor,
// 		borderWidth: mobileW * 0.3 / 100
// 	},
// 	customRatingBarStyle: {
// 		flexDirection: 'row',
// 		right: mobileW * 2 / 100,
// 		paddingLeft: mobileW * 2 / 100,
// 		paddingRight: mobileW * 2 / 100,

// 	},
// 	SearchIcon: {
// 		width: mobileW * 5 / 100,
// 		height: mobileW * 5 / 100,
// 		tintColor: Colors.themecolor,
// 		left: mobileW * 2 / 100
// 	},
// 	dotIcon: {
// 		width: mobileW * 5 / 100,
// 		height: mobileW * 5 / 100,
// 		tintColor: Colors.themecolor,
// 		alignSelf: 'center',
// 		left: mobileW * 2 / 100
// 	},
// 	searchText: {
// 		color: Colors.black_color,
// 		marginHorizontal: mobileW * 3 / 100,
// 		fontSize: mobileW * 4 / 100,
// 		fontFamily: Font.FontSemiBold
// 	},
// 	GIF_modal: {
// 		flex: 1,
// 		backgroundColor: '#00000060',
// 		justifyContent: 'center',
// 		alignItems: "center"
// 	},
// 	input: {
// 		width: mobileW * 35 / 100,
// 		height: mobileW * 20 / 100,
// 		fontFamily: Font.FontRegular,
// 		borderColor: Colors.themecolor,
// 		color: Colors.gray,

// 	},
// 	starImageStyle: {
// 		resizeMode: 'contain',
// 		tintColor: "#DBB000",
// 		width: mobileW * 4.5 / 100,
// 		height: mobileW * 4.5 / 100,
// 		marginRight: mobileW * 0.5 / 100,
// 	},
// 	searchBarView: {
// 		flexDirection: 'row',
// 		alignItems: 'center',
// 		backgroundColor: 'white',
// 		width: mobileW * 68 / 100,
// 		height: mobileW * 10 / 100,
// 		alignSelf: 'center',
// 		borderWidth: 1,
// 		borderColor: "#E7E8EA",
// 		borderRadius: mobileW * 1 / 100,
// 		backgroundColor: Colors.bgcolor,
// 		left: mobileW * 1 / 100
// 	},
// 	jobCardView: {
// 		elevation: mobileW * 2 / 100,
// 		shadowColor: '#000',
// 		borderColor: "#e8edfb",
// 		borderWidth: 1,
// 		shadowOpacity: 0.1,
// 		shadowOffset: { width: 0, },
// 		width: mobileW * 90 / 100,
// 		padding: mobileW * 2 / 100,
// 		// marginRight: mobileW * 1 / 100,
// 		borderRadius: mobileW * 2 / 100,
// 		marginBottom: mobileW * 2 / 100,
// 		backgroundColor: Colors.white_color,
// 		marginTop: mobileW * 2 / 100,
// 		// height:mobileW*35/100
// 	},
// 	jobCardView1: {
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
// 		marginBottom: mobileW * 1 / 100,
// 		backgroundColor: Colors.white_color,
// 		marginTop: mobileW * 1 / 100,
// 		alignSelf: 'center'
// 	},

// })
import {
	StatusBar, ScrollView, Animated, RefreshControl, FlatList, View, Text, Dimensions,
	TouchableOpacity, Modal, Image, StyleSheet, Alert, SafeAreaView, TextInput, ActivityIndicator
} from 'react-native'
import React, { useCallback, useRef, useState, useEffect } from 'react'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Colors } from './Provider/Colorsfont';
import { localStorage } from './Provider/localStorageProvider';
import { config, msgProvider, msgText, consolepro, Lang_chg, Font, msgTitle, localimag, apifuntion, notification } from './Provider/utilslib/Utils';
import Footer from './Provider/Footer';
import HideWithKeyboard from 'react-native-hide-with-keyboard';
import { AirbnbRating } from 'react-native-ratings';
import axios from 'axios';
import {
	createDrawerNavigator,
	DrawerContentScrollView,
	DrawerItemList,
	DrawerItem,
} from '@react-navigation/drawer';
const mobileW = Dimensions.get('window').width;
const mobileH = Dimensions.get('window').height;
const organizationData = [
	{
		id: 1,
		companymane: "Tata Consultancy Services",
		Companylogo: require('./icon/16.png'),
		Company_Logo: require('./icon/12.jpg'),
		startratting: require('./icon/icons8-star-48.png'),
		employeename: "AMan",
		Eprofile: "Python Developer",
		Time: "5 h ago",
		profile: require('./icon/karthik.jpeg'),
		EDescription: "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the",


	},

	{
		id: 2,
		companymane: "Infosys",
		Companylogo: require('./icon/17.png'),
		Company_Logo: require('./icon/12.jpg'),
		employeename: "Gupta",
		Eprofile: "Python Developer",
		Time: "5 h ago",
		startratting: require('./icon/icons8-star-48.png'),
		EDescription: "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the"
	},
	{
		id: 3,
		companymane: "Infobeans",
		Companylogo: require('./icon/18.jpg'),
		Company_Logo: require('./icon/karthik.jpeg'),
		employeename: "Virat",
		Eprofile: "Python Developer",
		Time: "5 h ago",
		startratting: require('./icon/icons8-star-48.png'),
		profile: require('./icon/kahli.png'),
		EDescription: "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the"
	},
	{
		id: 4,
		companymane: "Tata Consultancy Services",
		Companylogo: require('./icon/16.png'),
		profile: require('./icon/karthik.jpeg'),
		employeename: "Mohali",
		Eprofile: "Python Developer",
		Time: "5 h ago",
		startratting: require('./icon/icons8-star-48.png'),

		profile: require('./icon/kahli.png'),
		EDescription: "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the"
	},
	{
		id: 5,
		companymane: "Infobeans",
		Companylogo: require('./icon/18.jpg'),
		Company_Logo: require('./icon/12.jpg'),
		employeename: "Gupta",
		Eprofile: "Python Developer",
		Time: "5 h ago",
		startratting: require('./icon/icons8-star-48.png'),

		EDescription: "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the"
	},
	{
		id: 6,
		companymane: "Infobeans",
		Companylogo: require('./icon/18.jpg'),
		Company_Logo: require('./icon/12.jpg'),
		employeename: "Gupta",
		Eprofile: "Python Developer",
		Time: "5 h ago",
		startratting: require('./icon/icons8-star-48.png'),

		EDescription: "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the"
	},
	{
		id: 7,
		companymane: "Infobeans",
		Companylogo: require('./icon/18.jpg'),
		profile: require('./icon/karthik.jpeg'),
		employeename: "Gupta",
		Eprofile: "Python Developer",
		Time: "5 h ago",
		startratting: require('./icon/icons8-star-48.png'),

		EDescription: "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the"
	},

]


export const trimText = (text, length) => {
	return text.length > length ? text.substring(0, length) + "..." : text;
}
const Dashboard = ({ navigation, route }) => {
	const [feeddata, setfeeddata] = useState()
	const [ttoken, settoken] = useState()
	console.log(ttoken, "ttoken > .. dashboard screen ..........> ttoken");
	const [ggetuser_id, setggetuser_id] = useState()
	console.log(ggetuser_id, "ggetuser_id........ dashboard screen..........>");
	const [image, setimgeset] = useState()
	const [ModalVisible_GifModal, setModalVisible_GifModal] = useState(true)
	const [loading, setLoading] = useState(true);
	useEffect(() => {

		const getData = async () => {
			const user_token = await AsyncStorage.getItem('user_token')
			settoken(user_token)
			// console.log("==================> get data to ken  c screen =============>", ttoken);

			const userid = await AsyncStorage.getItem('userid')
			setggetuser_id(userid)

			const imgeset = await AsyncStorage.getItem('imgeset')
			setimgeset(imgeset)
			console.log(imgeset, " imgeset          imgeset imgeset imgeset imgeset ==================> imgeset =============>", imgeset);

		}
		setModalVisible_GifModal(false)
		getData()
		feed_api()
	}, [ttoken], 1000)
	useEffect(() => {
		setModalVisible_GifModal(false)
	}, 2000)



	// 0738
	const feed_api = () => {
		axios.post('http://test.api.evalvue.com/dashboard/feed/', {}, {
			headers: {
				Authorization: `Bearer ${ttoken}`
			}
		})
			.then(async (response) => {
				console.log(response.data.dashboard_list, '.......... response feed api ');
				setfeeddata(response.data.dashboard_list)

			})
			.catch((error) => {
				console.error('Error fetching feed data:', error.response ? error.response.data : error.message);
				setLoading(false);
			});
	}






	return (
		<View style={{ flex: 1 }}>
			<SafeAreaView style={{ flex: 1 }}>
				<StatusBar barStyle="dark-content" hidden={false} backgroundColor={Colors.themecolor} />


				<View style={{
					flexDirection: 'row', padding: mobileW * 2 / 100, justifyContent: 'space-around',
					backgroundColor: Colors.white_color,
				}}>
					<View style={{ alignItems: 'center' }}>
						<TouchableOpacity onPress={() => navigation.openDrawer()} >
							<Image style={styles.imageIcon2} resizeMode='contain'
								source={require('./icon/12.jpg')}></Image>
							{/* //  source={ image= null ? require('./icon/12.jpg'):{ uri: image}}></Image> */}

						</TouchableOpacity>
						<Text style={{
							color: Colors.black_color, fontSize: mobileW * 2.5 / 100,
							fontFamily: Font.FontBold, marginTop: mobileW * 0.4 / 100
						}}>  Shingh</Text>
					</View>
					<TouchableOpacity style={styles.searchBarView} onPress={() => navigation.navigate('Search')} activeOpacity={0.8} >


						<Image style={styles.SearchIcon} resizeMode='contain'
							source={require('./icon/search.png')}></Image>

						<Text style={{ color: Colors.dark_gray, fontSize: mobileW * 3.5 / 100, left: mobileW * 3.5 / 100 }}>Search </Text>
					</TouchableOpacity>
					<Image style={styles.dotIcon} resizeMode='contain' source={require('./icon/dots.png')}></Image>
				</View>

				{/* {feeddata == ""? */}

				{/* {feeddata == "" ?  */}
				<View>
					<Modal animationType="slide" transparent={true}
						visible={ModalVisible_GifModal}
						onRequestClose={() => { setModalVisible_GifModal(ModalVisible_GifModal) }} >
						<View style={[styles.GIF_modal,]}>
							<Image style={{ width: mobileW * 30 / 100, height: mobileW * 20 / 100, alignSelf: "center" }}
								resizeMode='contain' source={require("./icon/neighcoach_loader.gif")}></Image>
						</View>
					</Modal>
				</View>
				{feeddata ? (

					<FlatList
						data={feeddata}
						// horizontal={true}
						showsHorizontalScrollIndicator={false}
						renderItem={({ item, index }) =>
							<View style={styles.jobCardView1}>
								<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
									<View style={{ flexDirection: 'row', justifyContent: "space-around" }}>
										<Image resizeMode="contain" style={{
											width: mobileW * 8 / 100, height: mobileW * 8 / 100,
											borderRadius: mobileW * 12 / 100, borderColor: Colors.themecolor, borderWidth: mobileW * 0.3 / 100
										}} source={{ uri: item.organization_image }}></Image>
										<View>
											<Text style={{
												color: Colors.black_color, fontSize: mobileW * 3.5 / 100,
												fontFamily: Font.FontBold, alignItems: 'center', alignSelf: 'center', left: mobileW * 2 / 100
											}}>
												{item.organization_name}</Text>
											<Text style={{
												color: Colors.black_color, fontSize: mobileW * 3 / 100,
												fontFamily: Font.FontBold, alignItems: 'center', alignSelf: 'center', left: mobileW * 2 / 100
											}}>
												{item.created_on}</Text>

										</View>
									</View>
									{/* <Image style={[styles.dotIcon, {}]} resizeMode='contain' source={require('./icon/dots.png')}></Image> */}
								</View>

								<View style={[styles.jobCardView]}>
									{/* <Text style={[styles.Dynamic_text, { width: mobileW * 22 / 100, }]}> */}
									<View style={{ flexDirection: 'row' }}>
										<Image resizeMode='contain' style={{
											width: mobileW * 14 / 100, height: mobileW * 14 / 100,
											borderRadius: mobileW * 12 / 100, borderColor: Colors.themecolor,
											borderWidth: mobileW * 0.3 / 100
										}} source={{ uri: item.employee_image }}></Image>

										<View style={{ padding: mobileW * 1 / 100 }}>
											<Text style={{ color: Colors.black_color, fontSize: mobileW * 3.5 / 100, fontFamily: Font.FontBold }}>{item.employee_name}</Text>
											<Text style={{ color: Colors.black_color, fontSize: mobileW * 3 / 100, }}>{item.designation}</Text>
										</View>
									</View>
									<View>
										{/* {image  ==""? */}
										{/* {image ? ( */}

										<Image resizeMode="contain" style={{
											alignSelf: 'center',
											width: mobileW * 55 / 100, height: mobileW * 32 / 100,borderRadius:mobileW*2/100

										}} source={{ uri: item.image }}></Image>
										{/* // ) : (
									// 	<View></View>
									// )} */}
									</View>
									<Text style={{
										color: Colors.black_color, fontSize: mobileW * 3 / 100, width: mobileW * 85 / 100,
										marginTop: mobileW * 2 / 100, fontFamily: Font.FontBold
									}}>{item.comment}...</Text>

								</View>
								<View style={{ flexDirection: 'row' }}>
									<Text style={{ fontSize: mobileW * 3 / 100, color: Colors.black_color, right: mobileW * 0 / 100 }}>Total over All ratting :</Text>
									<AirbnbRating
										count={5}
										defaultRating={item.rating}
										size={18}
										showRating={false}
										isDisabled
										starContainerStyle={{ marginTop: mobileW * -1 / 100 }}
									/>
								</View>

							</View>
						} />



				) : (
					<ActivityIndicator size="large" color="#575fb4" />
				)}



			</SafeAreaView>
			<HideWithKeyboard>
				<Footer
					activepage='Dashboard'
					usertype={1}
					footerpage={[
						{
							name: "Footer", countshow: false, image: require('./icon/home.png'),
							activeimage: require('../src/icon/appicon.png.png')
						},
						{
							name: "Employee", countshow: false, image: require('./icon/teamwork(2).png'),
							activeimage: require('../src/icon/appicon.png.png')
						},
						{
							name: "Post", countshow: false, image: require('./icon/more.png'),
							activeimage: require('../src/icon/appicon.png.png')
						},
						{
							name: "Employee", countshow: false, image: require('./icon/bell-ring.png'),
							activeimage: require('../src/icon/appicon.png.png')
						},
						{
							name: "Login", countshow: false, image: require('./icon/teamwork.png'),
							activeimage: require('../src/icon/appicon.png.png'),
						},
					]}
					navigation={navigation}
					imagestyle1={{
						width: mobileW * 10 / 100, height: mobileW * 6 / 100, backgroundColor: Colors.whiteColor,
						countcolor: 'black', countbackground: 'black',
					}} />
			</HideWithKeyboard>

		</View>
	)
}
export default Dashboard;
const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	imageIcon2: {
		width: mobileW * 12 / 100,
		height: mobileW * 12 / 100,
		borderRadius: mobileW * 8 / 100,
		borderColor: Colors.themecolor,
		borderWidth: mobileW * 0.3 / 100
	},
	customRatingBarStyle: {
		flexDirection: 'row',
		right: mobileW * 2 / 100,
		paddingLeft: mobileW * 2 / 100,
		paddingRight: mobileW * 2 / 100,

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
	GIF_modal: {
		flex: 1,
		// backgroundColor: '#00000060',
		backgroundColor: 'red',
		justifyContent: 'center',
		alignItems: "center"
	},
	input: {
		width: mobileW * 35 / 100,
		height: mobileW * 20 / 100,
		fontFamily: Font.FontRegular,
		borderColor: Colors.themecolor,
		color: Colors.gray,

	},
	starImageStyle: {
		resizeMode: 'contain',
		tintColor: "#DBB000",
		width: mobileW * 4.5 / 100,
		height: mobileW * 4.5 / 100,
		marginRight: mobileW * 0.5 / 100,
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
	jobCardView: {
		elevation: mobileW * 2 / 100,
		shadowColor: '#000',
		borderColor: Colors.themecolor,
		borderWidth: 1,
		shadowOpacity: 0.1,
		shadowOffset: { width: 0, },
		width: mobileW * 90 / 100,
		padding: mobileW * 2 / 100,
		// marginRight: mobileW * 1 / 100,
		borderRadius: mobileW * 2 / 100,
		marginBottom: mobileW * 2 / 100,
		backgroundColor: Colors.white_color,
		marginTop: mobileW * 2 / 100,
		// height:mobileW*35/100
	},
	jobCardView1: {
		elevation: 0.2,
		shadowColor: '#000',
		borderColor: Colors.themecolor,
		borderWidth: 1,
		shadowOpacity: 0.1,
		shadowOffset: { width: 0, },
		width: mobileW * 95 / 100,
		padding: mobileW * 2 / 100,
		marginRight: mobileW * 1 / 100,
		borderRadius: mobileW * 2 / 100,
		marginBottom: mobileW * 1 / 100,
		backgroundColor: Colors.white_color,
		marginTop: mobileW * 1 / 100,
		alignSelf: 'center'
	},

})









