import * as dotenv from 'dotenv';
dotenv.config();
import Config from './config';

const adaptiveIcon =
  Config.APP_ENV === 'staging'
    ? './assets/images/adaptive-icon-staging.png'
    : Config.APP_ENV === 'production'
    ? './assets/images/adaptive-icon.png'
    : './assets/images/adaptive-icon-dev.png';

const appConfig = () => ({
  expo: {
    name: Config.APP_NAME,
    slug: 'expo-nextjs-app',
    version: '1.0.0',
    scheme: Config.APP_SCHEME,
    platforms: ['ios', 'android'],
    orientation: 'portrait',
    icon: './assets/images/icon.png',
    backgroundColor: '#ffffff',
    primaryColor: '#8331FF',
    assetBundlePatterns: ['**/*'],
    splash: {
      image: './assets/images/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff'
    },
    extra: {
      env: Config,
      eas: {
        projectId: '00ac7537-e1c6-4c78-b843-e004d85c3542'
      }
    },
    plugins: [
      ['./plugins/withAndroidVerifiedLinksWorkaround'],
      ['./plugins/android-datepicker-color-config-plugin'],
      [
        'expo-navigation-bar',
        {
          position: 'absolute',
          visibility: 'hidden',
          behavior: 'inset-swipe',
          backgroundColor: '#00000080'
        }
      ],
      [
        'expo-notifications',
        {
          icon: './assets/images/notification-icon.png',
          sounds: [],
          mode: 'default',
          androidMode: 'default',
          androidCollapsedTitle: 'Expo NextJs App',
          iosDisplayInForeground: true
        }
      ]
    ],
    notification: {
      icon: './assets/images/notification-icon.png',
      androidMode: 'default',
      androidCollapsedTitle: 'Expo NextJs App',
      iosDisplayInForeground: true
    },
    ios: {
      icon: adaptiveIcon,
      bundleIdentifier: Config.BUNDLE_IDENTIFIER
    },
    androidStatusBar: {
      backgroundColor: '#FFFFFF',
      barStyle: 'dark-content'
    },
    androidNavigationBar: {
      visible: 'sticky-immersive'
    },
    android: {
      icon: adaptiveIcon,
      package: Config.BUNDLE_IDENTIFIER,
      adaptiveIcon: {
        foregroundImage: adaptiveIcon
      }
    }
  }
});

export default appConfig;
