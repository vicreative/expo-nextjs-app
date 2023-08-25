import AsyncStorage from '@react-native-async-storage/async-storage';
import { EXPITRA_CONTACT } from 'app/constants/strings';
import * as Contacts from 'expo-contacts';

async function writeToAppCache(contacts) {
  await AsyncStorage.setItem(EXPITRA_CONTACT, JSON.stringify(contacts));

  return contacts;
}

async function fetchFromAppCache() {
  const jsonValue = await AsyncStorage.getItem(EXPITRA_CONTACT);
  return jsonValue != null ? JSON.parse(jsonValue) : null;
}

const fetch = async () => {
  try {
    // const contactsFromCache = await fetchFromAppCache();

    // if (contactsFromCache) return contactsFromCache;

    const { status } = await Contacts.requestPermissionsAsync();

    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({
        fields: [
          Contacts.Fields.Name,
          Contacts.Fields.Image,
          Contacts.Fields.PhoneNumbers,
          Contacts.Fields.Addresses
        ]
      });

      // const contacts = writeToAppCache(data);
      const contacts = data;

      return contacts;
    } else {
      alert(
        `Please grant Expitra permission to access contacts. This information is confidential and will not be released to third parties.`
      );
    }
  } catch (e) {
    console.error(e);
  }
};

export default { fetch };
