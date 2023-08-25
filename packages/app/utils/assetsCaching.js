import { Image } from 'react-native';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
// import { resolveAssetsUrl } from './index';

const fonts = {
  'Satoshi-Black': require('../../../apps/next/public/assets/fonts/Satoshi-Black.otf'),
  'Satoshi-Light': require('../../../apps/next/public/assets/fonts/Satoshi-Light.otf'),
  'Satoshi-Bold': require('../../../apps/next/public/assets/fonts/Satoshi-Bold.otf'),
  'Satoshi-Regular': require('../../../apps/next/public/assets/fonts/Satoshi-Regular.otf'),
  'Satoshi-Medium': require('../../../apps/next/public/assets/fonts/Satoshi-Medium.otf')
};

const images = [
  require('../../../apps/next/public/assets/images/icon.png'),
  require('../../../apps/next/public/assets/images/splash.png'),
  require('../../../apps/next/public/assets/images/favicon.png'),
  require('../../../apps/next/public/assets/images/notification-icon.png'),
  require('../../../apps/next/public/assets/images/adaptive-icon.png'),
  require('../../../apps/next/public/assets/images/adaptive-android-icon-dev.png'),
  require('../../../apps/next/public/assets/images/adaptive-android-icon-staging.png'),
  require('../../../apps/next/public/assets/images/adaptive-ios-icon-dev.png'),
  require('../../../apps/next/public/assets/images/adaptive-ios-icon-staging.png')
  // resolveAssetsUrl('balloon-dark.png'),
  // resolveAssetsUrl('avi-avatar.png'),
  // resolveAssetsUrl('road-trip.png'),
  // resolveAssetsUrl('explore-illustration.png'),
  // resolveAssetsUrl('soft-life-girl-illustration.png'),
  // resolveAssetsUrl('onboarding-1.png'),
  // resolveAssetsUrl('onboarding-2.png'),
  // resolveAssetsUrl('onboarding-3.png'),
  // resolveAssetsUrl('onboarding-4.png')
];

export const cacheImages = (data = images) => {
  return data.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
};

export const cacheFonts = () => {
  return Font.loadAsync(fonts);
};
