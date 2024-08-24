import { Alert, ToastAndroid, I18nManager, Platform } from "react-native";
import { localStorage } from './localStorageProvider';
import { config } from "./configProvider";
import Support from "../Support";

global.language_key = 1;
class Language_provider {

  language_get = async () => {
    var item = await AsyncStorage.getItem('language');
    console.log('check launguage option', item)
    if (item != null) {
      console.log('config language console', config.language)
      config.language = item;
    }
    console.log('language_key123', config.language)
  }

  language_set = (value) => {
    config.language = value;
    localStorage.setItemObject('language', value)
  }


// english
// hindi
// spanish
// dutch
// french
// Thai
// Arabic
// Chinese


  // Media option ///////////////////

                               // ***************************************************************************************** Create Syllabus Screen *****************************************************************************************


 
}
export const Lang_chg = new Language_provider();






