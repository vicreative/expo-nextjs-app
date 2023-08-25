import React, { useReducer } from 'react';
import { StyleSheet, Platform } from 'react-native';
import { Text, Heading, Stack, Flex, Divider } from 'native-base';
import spacing from 'app/config/theme/spacing';
import en from 'app/i18n/index';
import Modal from './index';
import Touchable from 'app/components/Gestures/Touchable';
import { Camera } from 'expo-camera';
import CustomCamera from 'app/components/Media/CustomCamera';
import * as mime from 'react-native-mime-types';
import { MediaPreview } from 'app/components/Media/MediaPreview';
import { chooseFile, openDocumentPicker, openCamera } from 'app/utils/mediaUpload';
import uploadToAws from 'app/utils/uploadToAws';

const initialState = {
  show: '',
  file: null,
  fileMime: ''
};

const uploadReducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_CAMERA_VISIBLITY':
      return {
        ...state,
        show: state.show === 'camera' ? '' : 'camera'
      };

    case 'SET_FILE':
      return {
        ...state,
        file: action.file,
        fileMime:
          action.file === null
            ? null
            : action.file.base64 !== null && action.file.base64 !== undefined
            ? action.file.base64.split(';')[0].split(':')[1]
            : mime.lookup(action.file.uri),
        show: action.show
      };

    default:
      return { ...state, ...action };
  }
};

const FileUploadModal = ({
  visible = false,
  onClose = () => {},
  animationType = 'fade',
  onSendMessage = () => {}
}) => {
  const [state, dispatch] = useReducer(uploadReducer, initialState);
  const [cameraPermission, requestCameraPermission] = Camera.useCameraPermissions({});

  function toggleCameraVisibility() {
    dispatch({ type: 'TOGGLE_CAMERA_VISIBLITY' });
  }

  function handleTakePhoto() {
    openCamera({
      cameraPermission,
      toggleCameraVisibility,
      requestCameraPermission
    });
  }

  function handleChoosePhoto() {
    chooseFile({
      allowsEditing: false,
      mediaType: 'All',
      setFile: manipResult => {
        dispatch({
          type: 'SET_FILE',
          show: 'previewMode',
          file: {
            ...manipResult,
            base64: manipResult.base64 ? `data:image/jpg;base64,${manipResult.base64}` : null
          }
        });
      }
    });
  }

  function closePreview() {
    dispatch({ type: 'SET_FILE', file: null, show: '' });
  }

  function handleOpenDocumentPicker() {
    openDocumentPicker({
      onCancel: closePreview,
      setDocument: result => {
        dispatch({
          type: 'SET_FILE',
          show: 'previewMode',
          file: {
            ...result,
            base64: Platform.OS === 'web' ? result.uri : null
          }
        });
      }
    });
  }

  function handleUpload(file) {
    uploadToAws(file, data => {
      onSendMessage({
        mediaFileName: data.fileName,
        mediaMimetype: data.fileMime,
        link: data.location
      });
    });
    closePreview();
    onClose();
    if (state.show === 'camera') {
      toggleCameraVisibility();
    }
  }

  return (
    <Modal
      animationType={animationType}
      visible={visible}
      onClose={onClose}
      closeOnOverlayClick={state.show === '' ? true : false}
      bg={state.show === '' ? 'transparent' : 'black'}
      statusBarBackgroundColor={'transparent'}
      alignItems="center"
      justifyContent="flex-end"
      px={0}
      pt={0}
    >
      {state.show === 'camera' ? (
        <CustomCamera
          allowsEditing={false}
          hasChatInput
          onClose={toggleCameraVisibility}
          onUpload={handleUpload}
        />
      ) : state.show === 'previewMode' ? (
        <MediaPreview
          file={state.file}
          hasChatInput
          onClose={closePreview}
          onUpload={handleUpload}
        />
      ) : (
        <Stack space={`${spacing[6]}px`} w="100%" px={`${spacing[20]}px`} pb={`${spacing[30]}px`}>
          <Flex
            alignSelf="center"
            bg="white"
            w="100%"
            borderRadius={`${spacing[10]}px`}
            shadow={3}
            maxWidth="540px"
          >
            <Touchable onPress={handleTakePhoto} {...styles.btn}>
              <Text color="primary.600" {...styles.text}>
                {en.chats.createGroup.upload.camera.title}
              </Text>
            </Touchable>

            <Divider bg="gray.100" thickness="1" />
            <Touchable onPress={handleChoosePhoto} {...styles.btn}>
              <Text color="primary.600" {...styles.text}>
                {en.chats.createGroup.upload.photo.title}
              </Text>
            </Touchable>

            <Divider bg="gray.100" thickness="1" />
            <Touchable onPress={handleOpenDocumentPicker} {...styles.btn}>
              <Text color="primary.600" {...styles.text}>
                {en.chats.createGroup.upload.document.title}
              </Text>
            </Touchable>
          </Flex>

          <Touchable onPress={onClose} {...styles.cancel}>
            <Heading fontSize={`${spacing[18]}px`} color="primary.600">
              {en.chats.createGroup.upload.cancel}
            </Heading>
          </Touchable>
        </Stack>
      )}
    </Modal>
  );
};

export default FileUploadModal;

const styles = StyleSheet.create({
  btn: {
    alignItems: 'center',
    p: `${spacing[14]}px`,
    _disabled: { opacity: 0.3 }
  },
  text: { fontFamily: 'Satoshi-Medium', fontSize: `${spacing[18]}px` },
  cancel: {
    bg: 'white',
    w: '100%',
    maxWidth: '540px',
    alignItems: 'center',
    alignSelf: 'center',
    p: `${spacing[16]}px`,
    borderRadius: `${spacing[10]}px`,
    shadow: 3
  }
});
