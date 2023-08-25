import AsyncStorage from '@react-native-async-storage/async-storage';
import env from 'app/config/env';
import {
  AUTH_TOKEN_IDENTIFIER,
  COLOR_MODE_IDENTIFIER,
  CURRENT_ROUTE,
  EXPITRA_LOGIN_IDENTIFIER
} from 'app/constants/strings';
import Cookies from 'js-cookie';
import { Platform } from 'react-native';

export const storeAuthToken = token => {
  if (Platform.OS === 'web') {
    return Cookies.set(AUTH_TOKEN_IDENTIFIER, token, {
      path: '/',
      domain: env.APP_ENV !== 'local' ? '.expitra.com' : null
    });
  } else {
    return AsyncStorage.setItem(AUTH_TOKEN_IDENTIFIER, token);
  }
};

export const getAuthToken = async () => {
  if (Platform.OS === 'web') {
    return Cookies.get(AUTH_TOKEN_IDENTIFIER);
  } else {
    return await AsyncStorage.getItem(AUTH_TOKEN_IDENTIFIER);
  }
};

export const removeAuthToken = () => {
  if (Platform.OS === 'web') {
    return Cookies.remove(AUTH_TOKEN_IDENTIFIER, {
      path: '/',
      domain: env.APP_ENV !== 'local' ? '.expitra.com' : null
    });
  } else {
    return AsyncStorage.removeItem(AUTH_TOKEN_IDENTIFIER);
  }
};

export const storeColorMode = mode => {
  if (Platform.OS === 'web') {
    return Cookies.set(COLOR_MODE_IDENTIFIER, mode, {
      path: '/',
      domain: env.APP_ENV !== 'local' ? '.expitra.com' : null
    });
  } else {
    return AsyncStorage.setItem(COLOR_MODE_IDENTIFIER, mode);
  }
};

export const getColorMode = async () => {
  if (Platform.OS === 'web') {
    return Cookies.get(COLOR_MODE_IDENTIFIER);
  } else {
    return await AsyncStorage.getItem(COLOR_MODE_IDENTIFIER);
  }
};

export const removeColorMode = () => {
  if (Platform.OS === 'web') {
    return Cookies.remove(COLOR_MODE_IDENTIFIER, {
      path: '/',
      domain: env.APP_ENV !== 'local' ? '.expitra.com' : null
    });
  } else {
    return AsyncStorage.removeItem(COLOR_MODE_IDENTIFIER);
  }
};

export const storeCurrentRoute = path => {
  if (Platform.OS === 'web') {
    return Cookies.set(CURRENT_ROUTE, path, {
      path: '/',
      domain: env.APP_ENV !== 'local' ? '.expitra.com' : null
    });
  } else {
    return AsyncStorage.setItem(CURRENT_ROUTE, path);
  }
};

export const getPreviousRoute = async () => {
  if (Platform.OS === 'web') {
    return Cookies.get(CURRENT_ROUTE);
  } else {
    return await AsyncStorage.getItem(CURRENT_ROUTE);
  }
};

export const removePreviousRoute = () => {
  if (Platform.OS === 'web') {
    return Cookies.remove(CURRENT_ROUTE, {
      path: '/',
      domain: env.APP_ENV !== 'local' ? '.expitra.com' : null
    });
  } else {
    return AsyncStorage.removeItem(CURRENT_ROUTE);
  }
};

export const storeLoginIdentifier = isLoggedIn => {
  if (Platform.OS === 'web') {
    return Cookies.set(EXPITRA_LOGIN_IDENTIFIER, isLoggedIn, {
      path: '/',
      domain: env.APP_ENV !== 'local' ? '.expitra.com' : null
    });
  } else {
    return AsyncStorage.setItem(EXPITRA_LOGIN_IDENTIFIER, isLoggedIn);
  }
};

export const getLoginIdentifier = async () => {
  if (Platform.OS === 'web') {
    return Cookies.get(EXPITRA_LOGIN_IDENTIFIER);
  } else {
    return await AsyncStorage.getItem(EXPITRA_LOGIN_IDENTIFIER);
  }
};

export const removeLoginIdentifier = () => {
  if (Platform.OS === 'web') {
    return Cookies.remove(EXPITRA_LOGIN_IDENTIFIER, {
      path: '/',
      domain: env.APP_ENV !== 'local' ? '.expitra.com' : null
    });
  } else {
    return AsyncStorage.removeItem(EXPITRA_LOGIN_IDENTIFIER);
  }
};
