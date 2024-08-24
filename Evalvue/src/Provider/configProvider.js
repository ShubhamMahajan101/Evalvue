import { Platform, Alert, Linking } from "react-native";
import base64 from 'react-native-base64'
import { msgProvider, localStorage, consolepro, Lang_chg, msgTitle } from './utilslib/Utils';
 
// import { LoginManager, AccessToken, GraphRequest, GraphRequestManager, } from 'react-native-fbsdk'
global.player_id_me1 = '123456';

//--------------------------- Config Provider Start -----------------------
class configProvider {
 
	maplanguage = 'en';
	language =0;
	player_id = '123456';
	player_id_me = '123456';
	device_type = Platform.OS;
	loading_type = false;
	latitude = 37.0902;
	longitude = 95.7129;
	namevalidation = /^[^-\s][a-zA-Z0-9_\s-]+$/;
	emailvalidation = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	mobilevalidation = /^[0-9\_]+$/;
	otpvalidation = /^[0-9\_]+$/;
	amountvalidation = /^[0-9\_.]+$/;
	passwordvalidation = /^\S{3,}$/;
	messagevalidation = /^[^-\s][a-zA-Z0-9_\s- ,]+$/;
	country_code = '+64';
	country_code_signup = '64';
	dishvalidation = /^[^-\s][a-zA-Z0-9_\s- ]+$/;
	url_validation = new RegExp("^(http|https)://", "i");


	curreny = '$'



	headersapi = {
		'Authorization': 'Basic ' + base64.encode(base64.encode('mario') + ":" + base64.encode('carbonell')),
		Accept: 'application/json',
		'Content-Type': 'multipart/form-data',
		'Cache-Control': 'no-cache,no-store,must-revalidate',
		'Pragma': 'no-cache',
		'Expires': 0,
	}
	GetPlayeridfunctin = (player_id) => {
		player_id_me1 = player_id
	}

	languagecheck = async()=>{
		let languagetype = await  localStorage.getItemString('languagecode');
		language = Number(languagetype)
	}

	//-----------check user deactive ---------
	checkUserDeactivate = async (navigation) => {
		setTimeout(() => {
			msgProvider.toast('Your account is deactivated', 'long')
			
		}, 300);

		setTimeout(() => {
			this.AppLogout(navigation);
		}, 200);
		return false;
	}

	//----------open advertisement url----------
	open_advertisement = () => {
		consolepro.consolelog('I am in open advertisemet')
		// Linking.openURL(this.advertisement_url).catch(err =>
		//     alert('Please contacnt to admin')
		// );
	}


 

	//--------no_approved_by_admin popup -------------//
	no_approved_by_admin = () => {
		consolepro.consolelog('I am in no_approved_by_admin')
		Alert.alert(
			info,
			no_approved_by_admin,
			[
				{
					text: msgTitle.ok[0],
					onPress: () => {
						consolepro.consolelog('Closed')
					}

				},
			],
			{ cancelable: false },
		);
	}
	//--------no_authorized_by_admin popup -------------//
	no_authorized_by_admin = () => {
		consolepro.consolelog('I am in no_authorized_by_admin')
		Alert.alert(
			Lang_chg.info[config.language],
			 Lang_chg.no_authorized_by_admin[config.language],
			[
				{
					text: msgTitle.ok[0],
					onPress: () => {
						consolepro.consolelog('Closed')
					}

				},
			],
			{ cancelable: false },
		);
	}
	//--------login first popup -------------//
	please_login_first_popup = (navigation) => {
		consolepro.consolelog('I am in please login first popup')
		Alert.alert(
			Lang_chg.confirm_txt[config.language],
			Lang_chg.please_login_first[config.language],
			[
				{
					text: msgTitle.cancel[0],
				},
				{
					text: msgTitle.ok[0],
					onPress: () => {
						navigation.navigate('Login');
					}

				},
			],
			{ cancelable: false },
		);
	}


	//----------functions for clear local storage...------------//
	//1 for quick and details enquiry---------
	clear_quick_details = () => {
		consolepro.consolelog('I am in clear quick and details ');
		localStorage.removeItem('enquiry_arr');
		localStorage.removeItem('enquiry_details_arr');
		localStorage.removeItem('service_history_id');
	}

	//2. Hydraulic clear------------
	clear_hydraulic = () => {
		consolepro.consolelog('I am in clear hydraulic breakdown');
		localStorage.removeItem('hydraulic_enquiry_arr');
		localStorage.removeItem('hy_enquiry_details_arr');
		localStorage.removeItem('hy_service_history_id');
	}

	//3. Mechanical Breakdown clear------------
	clear_mechanical_breakdown = () => {
		consolepro.consolelog('I am in clear mechanical breakdown');
		localStorage.removeItem('mechanical_enquiry_arr');
		localStorage.removeItem('me_enquiry_details_arr');
		localStorage.removeItem('me_service_history_id');
	}

	//4. Mechanical Service clear------------
	clear_mechanical_service = () => {
		consolepro.consolelog('I am in clear mechanical service');
		localStorage.removeItem('mechanical_service_enquiry_arr');
		localStorage.removeItem('me_book_enquiry_details_arr');
		localStorage.removeItem('me_book_service_history_id');
	};

	//5. Digimax clear------------
	clear_digimax = () => {
		consolepro.consolelog('I am in clear digimax');
		localStorage.removeItem('digmax_enquiry_arr');
		localStorage.removeItem('digmax_enquiry_details_arr');
		localStorage.removeItem('digmax_enquiry_id');
	}

	//6. Buy Second  clear------------
	clear_buy_second = () => {
		consolepro.consolelog('I am in clear buy second');
		localStorage.removeItem('buy_second_enquiry_arr');
		localStorage.removeItem('buy_enquiry_details_arr');
		localStorage.removeItem('buy_service_history_id');
	}

	//7. Sell Second  clear------------
	clear_sell_second = () => {
		consolepro.consolelog('I am in clear sell second');
		localStorage.removeItem('sell_second_enquiry_arr');
		localStorage.removeItem('sell_enquiry_details_arr');
		localStorage.removeItem('sell_service_history_id');
	}

};
//--------------------------- Config Provider End -----------------------

export const config = new configProvider();

