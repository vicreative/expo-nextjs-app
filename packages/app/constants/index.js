import { Platform } from 'react-native';
import getFlagEmoji from 'app/utils/getFlagEmoji';

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

export const DAY_NAMES = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];

export const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

export const mediaList = (data, limit = 9) => {
  let medias = [];

  if (data?.medias?.length) {
    medias = [...data.medias];
    const hasVideo = medias.filter(media => media.type.split('/').shift() === 'video').length > 0;

    if (!hasVideo) {
      medias.unshift({
        uuid: data.uuid,
        createdAt: data?.createdAt,
        experienceId: data?.uuid,
        filePath: data?.coverMediaPath,
        type: data.coverMediaType
      });
    }
  }
  return medias
    .sort((a, b) =>
      a.type.split('/').shift() === 'video' ? -1 : b.type.split('/').shift() === 'image' ? 1 : 0
    )
    .slice(0, limit)
    .map((media, i) => ({
      ...media,
      id: media.uuid,
      uri: media.filePath,
      title: `${data.title}-${i}`,
      mediaType: media.type.split('/').shift()
    }));
};

export const countryCodes = (countries, isLoading) =>
  isLoading
    ? [
        {
          id: 0,
          label: `${getFlagEmoji('NG')} +234`,
          value: '+234'
        }
      ]
    : countries
        ?.filter(country => country.name === 'Nigeria')
        ?.sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0))
        ?.map(country => ({
          id: country.uuid,
          label: `${getFlagEmoji(country.code)} ${country.dialCode}`,
          value: country.dialCode
        }));
