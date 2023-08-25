import React, { useReducer } from 'react';
import { StyleSheet } from 'react-native';
import { Text, Heading, Stack, Flex, Divider, HStack, Box, Spinner } from 'native-base';
import spacing from 'app/config/theme/spacing';
import en from 'app/i18n/index';
import Modal from './index';
import Touchable from 'app/components/Gestures/Touchable';
import CameraPlusOutline from 'app/components/Icons/Camera';
import { Camera } from 'expo-camera';
import CustomCamera from 'app/components/Media/CustomCamera';
import * as mime from 'react-native-mime-types';
import { Media } from 'app/components/Media';
import { MediaPreview } from 'app/components/Media/MediaPreview';
import { AlertCircle } from 'app/components/Icons/Alert';
import { chooseFile, openCamera } from 'app/utils/mediaUpload';

const initialState = {
  isVisible: false,
  show: '',
  image: null,
  fileMime: ''
};

const uploadReducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_MODAL_VISIBLITY':
      return { ...state, isVisible: !state.isVisible, show: '' };

    case 'DELETE_PHOTO':
      return {
        ...state,
        image: action.image,
        isVisible: !state.isVisible
      };

    case 'TOGGLE_MEDIA_VISIBLITY':
      return {
        ...state,
        show: state.show === 'media' ? '' : 'media'
      };

    case 'TOGGLE_CAMERA_VISIBLITY':
      return {
        ...state,
        show: state.show === 'camera' ? '' : 'camera'
      };

    case 'SET_IMAGE':
      return {
        ...state,
        image: action.image,
        fileMime:
          action.image === null
            ? null
            : action.image.base64 !== null && action.image.base64 !== undefined
            ? action.image.base64.split(';')[0].split(':')[1]
            : mime.lookup(action.image.uri),
        show: state.show === 'previewMode' ? '' : 'previewMode'
      };

    default:
      return { ...state, ...action };
  }
};

const UploadModal = ({
  animationType = 'fade',
  size = `${spacing[100] * 0.9}px`,
  file = null,
  showColumns = false,
  uploadLabel,
  uploading = false,
  uploadInfo,
  disableDelete = false,
  onUpload = () => {}
}) => {
  const [state, dispatch] = useReducer(uploadReducer, initialState);
  const [cameraPermission, requestCameraPermission] = Camera.useCameraPermissions({});

  function toggleModalVisibility() {
    dispatch({ type: 'TOGGLE_MODAL_VISIBLITY' });
  }

  function toggleCameraVisibility() {
    dispatch({ type: 'TOGGLE_CAMERA_VISIBLITY' });
  }

  function deletePhoto() {
    dispatch({ type: 'DELETE_PHOTO', image: null });
    onUpload(null);
  }
  function viewPhoto() {
    dispatch({ type: 'TOGGLE_MEDIA_VISIBLITY' });
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
      setFile: manipResult =>
        dispatch({
          type: 'SET_IMAGE',
          image: {
            ...manipResult,
            base64: `data:image/jpg;base64,${manipResult.base64}`
          }
        })
    });
  }

  function handleUpload(image) {
    onUpload(image);

    toggleCameraVisibility();
    toggleModalVisibility();
  }

  return (
    <>
      {showColumns ? (
        <HStack justifyContent="space-between" w="100%">
          <Box width={{ base: '18%', md: '16%', xl: '14%' }}>
            <Touchable
              alignItems="center"
              justifyContent="center"
              width={size}
              height={size}
              borderRadius="full"
              bg={state.image || file ? 'primary.100' : 'primary.600'}
              onPress={toggleModalVisibility}
              isDisabled={uploading}
            >
              {state.image || file ? (
                <Media
                  source={{ uri: state.image ? state.image.uri : file.uri }}
                  alt={'Image'}
                  type={
                    state.image
                      ? state.fileMime.split('/').shift()
                      : mime.lookup(file.uri).split('/').shift()
                  }
                  width={'100%'}
                  height={'100%'}
                  resizeMode="cover"
                  borderRadius={100}
                />
              ) : (
                <CameraPlusOutline />
              )}
            </Touchable>
          </Box>
          <Box w={{ base: '80%', md: '82%', xl: '84%' }}>
            <Touchable
              w="100%"
              onPress={toggleModalVisibility}
              borderWidth={1}
              borderColor="gray.100"
              borderRadius="8px"
              alignItems="center"
              justifyContent="center"
              p={`${spacing[24]}px`}
              isDisabled={uploading}
            >
              {uploading ? (
                <Spinner size="sm" my="40px" />
              ) : (
                <>
                  <AlertCircle />
                  <Text
                    fontSize="14px"
                    color="primary.700"
                    variant="link"
                    textAlign="center"
                    mt="12px"
                  >
                    {uploadLabel}
                  </Text>
                  <Text fontSize="12px" textAlign="center" mt="4px">
                    {uploadInfo}
                  </Text>
                </>
              )}
            </Touchable>
          </Box>
        </HStack>
      ) : (
        <Touchable
          alignItems="center"
          justifyContent="center"
          width={size}
          height={size}
          borderRadius="full"
          bg={state.image || file ? 'primary.100' : 'primary.600'}
          onPress={toggleModalVisibility}
          isDisabled={uploading}
        >
          {(state.image || file) && (
            <Media
              source={{ uri: state.image ? state.image.uri : file.uri }}
              alt={'Image'}
              type={
                state.image
                  ? state.fileMime.split('/').shift()
                  : mime.lookup(file.uri).split('/').shift()
              }
              width={'100%'}
              height={'100%'}
              resizeMode="cover"
              borderRadius={100}
              overlayColor="rgba(16, 16, 16, 0.15)"
            />
          )}
          <Box position="absolute">
            {uploading ? <Spinner color="white" size={'small'} /> : <CameraPlusOutline />}
          </Box>
        </Touchable>
      )}
      <Modal
        animationType={animationType}
        visible={state.isVisible}
        onClose={toggleModalVisibility}
        closeOnOverlayClick={state.show === '' ? true : false}
        bg={state.show === '' ? 'transparent' : 'black'}
        statusBarBackgroundColor={'transparent'}
        alignItems="center"
        justifyContent="flex-end"
        px={0}
        pt={0}
      >
        {state.show === 'camera' ? (
          <CustomCamera onClose={toggleCameraVisibility} onUpload={handleUpload} />
        ) : state.show === 'media' || state.show === 'previewMode' ? (
          <MediaPreview
            hideSendButton={state.show === 'media'}
            file={state.image ? state.image : file}
            onClose={() => {
              if (state.show === 'media') {
                viewPhoto();
                toggleModalVisibility();
              } else {
                dispatch({ type: 'SET_IMAGE', image: file });
              }
            }}
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
              <Touchable
                onPress={deletePhoto}
                isDisabled={!state.image || disableDelete}
                {...styles.btn}
              >
                <Text color="error.600" {...styles.text}>
                  {en.chats.createGroup.upload.deletePhoto.title}
                </Text>
              </Touchable>

              <Divider bg="gray.100" thickness="1" />
              <Touchable onPress={handleChoosePhoto} {...styles.btn}>
                <Text color="primary.600" {...styles.text}>
                  {en.chats.createGroup.upload.choosePhoto.title}
                </Text>
              </Touchable>

              <Divider bg="gray.100" thickness="1" />
              <Touchable onPress={handleTakePhoto} {...styles.btn}>
                <Text color="primary.600" {...styles.text}>
                  {en.chats.createGroup.upload.takePhoto.title}
                </Text>
              </Touchable>

              <Divider bg="gray.100" thickness="1" />
              <Touchable onPress={viewPhoto} isDisabled={!state.image && !file} {...styles.btn}>
                <Text color="primary.600" {...styles.text}>
                  {en.chats.createGroup.upload.viewPhoto.title}
                </Text>
              </Touchable>
            </Flex>

            <Touchable onPress={toggleModalVisibility} {...styles.cancel}>
              <Heading fontSize={`${spacing[18]}px`} color="primary.600">
                {en.chats.createGroup.upload.cancel}
              </Heading>
            </Touchable>
          </Stack>
        )}
      </Modal>
    </>
  );
};

export default UploadModal;

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
