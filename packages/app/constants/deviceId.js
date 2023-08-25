import * as Application from 'expo-application';
import { Platform } from 'react-native';
import generateRandomString from 'app/utils/generateRandomString';
let SecureStore;

if (Platform.OS !== 'web') {
  SecureStore = require('expo-secure-store');
}

const getDeviceId = async () => {
  if (Platform.OS === 'android') {
    return Application.androidId;
  } else if (Platform.OS === 'web') {
    return null;
  } else {
    let deviceId = await SecureStore.getItemAsync('deviceId');

    if (!deviceId) {
      deviceId = generateRandomString(32);

      await SecureStore.setItemAsync('deviceId', deviceId);
    }

    return deviceId;
  }
};

export default getDeviceId;
