import colors from 'app/config/theme/colors';
import { isDevice } from 'expo-device';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

export const registerForPushNotificationsAsync = async () => {
  let token;
  if (isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (
      await Notifications.getExpoPushTokenAsync({
        experienceId: 'my@experienceId' //TODO:  USE YOUR EXPERIENCE ID HERE
      })
    ).data;
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: colors.error[500]
    });
  }

  return token;
};
