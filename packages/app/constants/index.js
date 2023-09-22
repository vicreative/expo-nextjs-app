import { Platform } from 'react-native';

let Constants;

if (Platform.OS !== 'web') {
  Constants = require('expo-constants');
}

export const PHONE_REGEX =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const EMAIL_REGEX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

export const STATUS_BAR_HEIGHT = Constants && Constants.default.statusBarHeight;
export const TIMEZONE_OFFSET = new Date().getTimezoneOffset() / -60;

// `true` when running in Expo Go.
export const isExpoGo =
  Constants &&
  Constants.default.executionEnvironment === Constants.ExecutionEnvironment.StoreClient;
