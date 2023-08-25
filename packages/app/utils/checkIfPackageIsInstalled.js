import * as Linking from 'expo-linking';
import { Platform } from 'react-native';
import { Alert } from 'react-native';
let Share;

if (Platform.OS !== 'web') {
  Share = require('react-native-share').default;
}
/**
 * You can use the method isPackageInstalled to find if a package is installed.
 * It returns an object { isInstalled, message }.
 * Works on Android & iOS.
 */
const checkIfPackageIsInstalled = async (packageName, packageSearch) => {
  let isPackageInstalled;

  if (Platform.OS === 'android') {
    const { isInstalled } = await Share.isPackageInstalled(packageSearch);
    isPackageInstalled = isInstalled;
    if (!isInstalled) {
      Alert.alert(`Package: ${packageName}`, `Is not installed on your device`);
      return;
    }
  }

  if (Platform.OS === 'ios') {
    const isInstalled = await Linking.canOpenURL(packageSearch);
    isPackageInstalled = isInstalled;
    if (!isInstalled) {
      Alert.alert(`Package: ${packageName}`, `Is not installed on your device`);
      return;
    }
  }

  return isPackageInstalled;
};
export default checkIfPackageIsInstalled;
