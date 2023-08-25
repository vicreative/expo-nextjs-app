/* eslint-disable no-useless-escape */
import { EMAIL_REGEX } from 'app/constants';
import env from 'app/config/env';
import { decode as atob } from 'base-64';
import moment from 'moment';

/**
 * check for upper and lowercase
 *
 * @param { str } value
 */
export const isUpperAndLowerCase = str => {
  return /[a-z]/.test(str) && /[A-Z]/.test(str);
};

/**
 * check for number and special characters
 *
 * @param { str } value
 */
export const isNumberAndSpecialCharacter = str => {
  return /[0-9]/.test(str) && /[!@#\$%\^&\*]/.test(str);
};

/**
 * autocapitalize first letter
 *
 * @param { str } value
 */
export const autoCapitalizeFirstLetter = str => {
  if (str) {
    if (typeof str === 'string' && str !== undefined && str !== null)
      return str.charAt(0)?.toUpperCase() + str.substring(1);
    else {
      console.warn('invalid string');
    }
  }
};

/**
 * convert milliseconds to minutes and seconds
 *
 * @param { number } value - The number of milliseconds to convert
 */
export const millisToMinutesAndSeconds = millis => {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
};

/**
 * convert milliseconds to hours and  minutes
 *
 * @param { number } value - The number of milliseconds
 */
export function msToTime(duration) {
  if (duration) {
    var minutes = Math.floor((duration / (1000 * 60)) % 60);
    var hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    return (
      (hours < 1 ? '' : hours === 1 ? hours + 'hr' : hours + 'hrs' + ' ') +
      (minutes < 1 ? '' : minutes === 1 ? minutes + 'min' : minutes + 'mins')
    );
  }
}

/**
 * Format date AM/PM
 *
 * @param { date } value - date
 */
export const formatAMPM = date => {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
};

/**
 * Thousands separator
 *
 * @param { number } value - number
 */
export function numberWithCommas(x) {
  return Number(x) === 0
    ? '0.00'
    : Number(x)
        .toFixed(2)
        .replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

/**
 * Truncates a text if its lenght exceeds a given max length
 *
 * @param { string } value - A string to be truncated
 * @param { number } [maxLength] - The max allowed length of the string before initiating truncation
 */
export const truncate = (value, maxLength = 20) => {
  if (value.length <= maxLength) return value;
  return `${value.slice(0, maxLength)}...`;
};

/**
 * Validate email address
 *
 * @param { string } value - email address
 */
export function validateEmail(emailAdress) {
  if (emailAdress !== '') {
    if (emailAdress.match(EMAIL_REGEX)) {
      return true;
    } else {
      return false;
    }
  }
}

/**
 * Find an object by id
 *
 * @param { string } value - id
 */
export function findById(source, id) {
  for (var i = 0; i < source.length; i++) {
    if (
      source[i].id === id ||
      source[i].uuid === id ||
      source[i].userId === id ||
      source[i].user.id === id
    ) {
      return source[i];
    }
  }
  console.warn("Couldn't find object with id: " + id);
}

/**
 * Returns the full url of a file in a cloud storage
 * @param { string } fileName - A file name
 * @returns { string } Full URL
 */
export const resolveFileUrl = fileName => {
  return fileName ? `${env.CLOUD_STORAGE_URL}/${fileName}` : '';
};

/**
 * Returns the full url of a file in a cloud storage
 * @param { string } fileName - A file name
 * @returns { string } Full URL
 */
export const resolveAssetsUrl = (fileName, assetType = 'images') => {
  return fileName ? `${env.CLOUD_STORAGE_URL}/assets/${assetType}/${fileName}` : '';
};

/**
 * Format number (add comma seperators)
 *
 * @param { number } value
 */
export const formatNumber = value =>
  value ? parseInt(value.replace(/,/g, '')).toLocaleString() : '';

/**
 * Remove comma seperators
 *
 * @param { number } value
 */
export const removeCommaSeperators = value =>
  value ? value.replace(/\,/g, '').toLocaleString() : '';

/**
 * Remove white spaces
 *
 * @param { number } value
 */
export const removeWhiteSpaces = string => (string ? string.replace(/ /g, '') : '');

/**
 * Resolve today's date
 *
 * @param { number } value
 */
export const resolveTodayDate = createdAt => {
  const today = new Date().toDateString() === new Date(createdAt).toDateString();

  return today;
};

/**
 * Resolve yesterday's date
 *
 * @param { number } value
 */
export const resolveYesterdayDate = createdAt => {
  const oneDay = 86400000; //number of milliseconds in a day

  const yesterday =
    new Date(new Date() - new Date(oneDay)).toDateString() === new Date(createdAt).toDateString();
  return yesterday;
};

/**
 *  Returns initial letter of firstname and lastname
 *
 *  @param { string } - firstName
 *  @param { string } - lastName
 */
export const resolveAvatarText = (firstName = 'Sonia', lastName = 'Gabriel') => {
  return firstName.charAt(0)?.toUpperCase() + ' ' + lastName.charAt(0)?.toUpperCase();
};

export function dataURLtoFile(dataurl, filename) {
  var arr = dataurl.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
}

export const resolveMessageTime = (date, showDayAndTime = false) => {
  const currentDate = moment().format();
  const yesterday = moment().subtract(1, 'days');
  const oneWeekAgo = moment().subtract(7, 'days');

  const isToday = moment(date).isSame(moment(), 'day');
  const isYesterday = moment(date).isSame(moment(yesterday), 'day');
  const isWithinSameWeek = moment(date).isBetween(oneWeekAgo, currentDate);

  if (isToday) {
    if (showDayAndTime) {
      return moment(date).format('[Today] h:mm a');
    } else {
      return moment(date).format('h:mm a');
    }
  } else if (isYesterday) {
    if (showDayAndTime) {
      return moment(date).format('[Yesterday] h:mm a');
    } else {
      return 'Yesterday';
    }
  } else if (isWithinSameWeek) {
    if (showDayAndTime) {
      return moment(date).format('dddd h:mm a');
    } else {
      return moment(date).format('dddd');
    }
  } else {
    if (showDayAndTime) {
      return `${moment(date).format('L')} ${moment(date).format('h:mm a')}`;
    } else {
      return moment(date).format('L');
    }
  }
};

export function dateCompare(d1, d2) {
  const date1 = new Date(d1);
  const date2 = new Date(d2);

  if (date1.getTime() > date2.getTime()) {
    return false;
  } else if (date1.getTime() < date2.getTime()) {
    return false;
  } else if (date1.getTime() === date2.getTime()) {
    return true;
  } else {
    return false;
  }
}
