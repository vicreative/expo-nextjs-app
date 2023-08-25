import { Alert, Platform } from 'react-native';
import env from 'app/config/env';
import * as ImagePicker from 'expo-image-picker';
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';
import * as DocumentPicker from 'expo-document-picker';

export function openCamera({
  cameraPermission,
  toggleCameraVisibility = () => {},
  requestCameraPermission = () => {}
}) {
  if (!cameraPermission.granted) {
    Alert.alert('Allow access to camera', `Allow ${env.APP_NAME} to access your camera.`, [
      { text: 'Ask me later' },
      { text: 'Cancel', style: 'cancel' },
      { text: 'Grant permission', onPress: requestCameraPermission }
    ]);
  }
  toggleCameraVisibility();
}

export async function chooseFile({
  allowsEditing = true,
  aspect = [4, 3],
  mediaType = 'Images',
  setFile = () => {}
}) {
  // No permissions request is necessary for launching the image library
  let result = await ImagePicker.launchImageLibraryAsync({
    aspect,
    allowsEditing,
    quality: 1,
    base64: true,
    mediaTypes:
      mediaType === 'Videos'
        ? ImagePicker.MediaTypeOptions.Videos
        : mediaType === 'All'
        ? ImagePicker.MediaTypeOptions.All
        : ImagePicker.MediaTypeOptions.Images
  });

  if (!result.canceled) {
    if (result.assets[0].fileSize > 20000000) {
      alert('maximum of 20mb exceeded');
    } else {
      if (result.assets[0].type === 'image') {
        const manipResult = await manipulateAsync(result.assets[0].uri, [], {
          base64: true,
          compress: 1,
          format: SaveFormat.JPEG
        });

        setFile({
          ...manipResult,
          type: result.assets[0]?.type,
          duration: result.assets[0]?.duration,
          fileName: result.assets[0]?.fileName,
          fileSize: result.assets[0]?.fileSize
        });
      } else {
        setFile(result.assets[0]);
      }
    }
  }
}

export async function openDocumentPicker({ onCancel = () => {}, setDocument = () => {} }) {
  const result = await DocumentPicker.getDocumentAsync();

  if (result.type === 'cancel') {
    onCancel();
  }

  if (result.type === 'success') {
    if (result.size > 20000000) {
      alert('maximum of 20mb exceeded');
    } else {
      if (Platform.OS === 'web' && result.mimeType === 'image/heic') {
        alert('Unsupported image format');
      } else {
        setDocument(result);
      }
    }
  }
}
