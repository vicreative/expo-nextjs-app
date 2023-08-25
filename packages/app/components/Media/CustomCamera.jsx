import React, { useReducer, useRef } from 'react';
import { StyleSheet } from 'react-native';
import { Icon, Flex, HStack } from 'native-base';
import { AntDesign, MaterialIcons, Ionicons } from '@expo/vector-icons';
import spacing from 'app/config/theme/spacing';
import Touchable from 'app/components/Gestures/Touchable';
import { Camera, CameraType, FlashMode } from 'expo-camera';
import { STATUS_BAR_HEIGHT } from 'app/constants/index';
import { manipulateAsync, FlipType, SaveFormat } from 'expo-image-manipulator';
import { MediaPreview } from './MediaPreview';
import useDimensions from 'app/hooks/useDimensions';
import { chooseFile } from 'app/utils/mediaUpload';

const initialState = {
  cameraType: CameraType.back,
  flashMode: FlashMode.off,
  capturedImage: null
};

const cameraReducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_CAMERA_TYPE':
      return {
        ...state,
        cameraType: state.cameraType === 'back' ? CameraType.front : CameraType.back
      };

    case 'TOGGLE_FLASH_MODE':
      return {
        ...state,
        flashMode:
          state.flashMode === 'off'
            ? FlashMode.auto
            : state.flashMode === 'auto'
            ? FlashMode.on
            : state.flashMode === 'on'
            ? FlashMode.torch
            : FlashMode.off
      };

    case 'SET_IMAGE':
      return {
        ...state,
        capturedImage: action.capturedImage
      };

    default:
      return { ...state, ...action };
  }
};

const CustomCamera = ({
  hasChatInput = false,
  allowsEditing = true,
  onClose = () => {},
  onUpload = () => {}
}) => {
  const cameraRef = useRef(null);
  const [state, dispatch] = useReducer(cameraReducer, initialState);
  const {
    window: { width: WIDTH },
    screen: { height: SCREEN_HEIGHT }
  } = useDimensions();

  function toggleCameraType() {
    dispatch({ type: 'TOGGLE_CAMERA_TYPE' });
  }

  function toggleFlashMode() {
    dispatch({ type: 'TOGGLE_FLASH_MODE' });
  }

  function handleChoosePhoto() {
    chooseFile({
      allowsEditing: allowsEditing,
      setFile: manipResult =>
        dispatch({
          type: 'SET_IMAGE',
          capturedImage: {
            ...manipResult,
            base64: `data:image/jpg;base64,${manipResult.base64}`
          }
        })
    });
  }

  async function captureImage() {
    if (!cameraRef) return;

    const options = {
      base64: true,
      quality: 1
    };

    const result = await cameraRef.current.takePictureAsync(options);

    const selfieOptions =
      state.cameraType === 'front' ? [{ rotate: 180 }, { flip: FlipType.Vertical }] : [];

    const manipResult = await manipulateAsync(
      result.uri,
      [...selfieOptions, { resize: { width: WIDTH, height: SCREEN_HEIGHT * 0.85 } }],
      {
        base64: true,
        compress: 1,
        format: SaveFormat.JPEG
      }
    );

    dispatch({
      type: 'SET_IMAGE',
      capturedImage: {
        ...manipResult,
        base64: `data:image/jpg;base64,${manipResult.base64}`
      }
    });
  }

  function handleUpload() {
    onUpload(state.capturedImage);
  }

  return (
    <>
      {state.capturedImage ? (
        <MediaPreview
          hasChatInput={hasChatInput}
          file={state.capturedImage}
          onClose={() => dispatch({ type: 'SET_IMAGE', capturedImage: null })}
          onUpload={handleUpload}
        />
      ) : (
        <Flex
          bg="black"
          width="100%"
          height={SCREEN_HEIGHT}
          pt={`${STATUS_BAR_HEIGHT + spacing[10]}px`}
          _web={{ height: '100vh', width: '100vw' }}
          alignItems="center"
        >
          <Camera
            ref={cameraRef}
            style={styles.camera(SCREEN_HEIGHT)}
            type={state.cameraType}
            flashMode={state.flashMode}
            ratio={'16:9'}
          >
            <Flex justifyContent="space-between" height="100%">
              <HStack
                justifyContent="space-between"
                alignItems="center"
                px={`${spacing[12]}px`}
                py={`${spacing[8]}px`}
              >
                <Touchable
                  onPress={onClose}
                  bg="rgba(0, 0, 0, 0.08)"
                  p={`${spacing[8]}px`}
                  borderRadius="full"
                >
                  <Icon as={AntDesign} name="close" size={`${spacing[24]}px`} color="white" />
                </Touchable>
                <Touchable
                  onPress={toggleFlashMode}
                  bg="rgba(0, 0, 0, 0.08)"
                  p={`${spacing[8]}px`}
                  borderRadius="full"
                >
                  <Icon
                    as={MaterialIcons}
                    name={
                      state.flashMode === 'off'
                        ? 'flash-off'
                        : state.flashMode === 'auto'
                        ? 'flash-auto'
                        : 'flash-on'
                    }
                    size={`${spacing[24]}px`}
                    color={state.flashMode === 'torch' ? 'warning.300' : 'white'}
                    opacity={0.9}
                  />
                </Touchable>
              </HStack>

              <HStack
                justifyContent="space-between"
                alignItems="center"
                px={`${spacing[20]}px`}
                py={`${spacing[16]}px`}
              >
                <Touchable
                  onPress={handleChoosePhoto}
                  bg="rgba(0,0,0,0.5)"
                  borderRadius="full"
                  p={`${spacing[10]}px`}
                >
                  <Icon
                    as={Ionicons}
                    name="image"
                    size={`${spacing[24]}px`}
                    color="white"
                    opacity={0.9}
                  />
                </Touchable>

                <Touchable onPress={captureImage}>
                  <Icon as={MaterialIcons} name="camera" size={`${spacing[100]}px`} color="white" />
                </Touchable>

                <Touchable
                  onPress={toggleCameraType}
                  bg="rgba(0,0,0,0.5)"
                  borderRadius="full"
                  p={`${spacing[10]}px`}
                >
                  <Icon
                    as={MaterialIcons}
                    name="flip-camera-android"
                    size={`${spacing[24]}px`}
                    color="white"
                    opacity={0.9}
                  />
                </Touchable>
              </HStack>
            </Flex>
          </Camera>
        </Flex>
      )}
    </>
  );
};

export default CustomCamera;

const styles = StyleSheet.create({
  camera: SCREEN_HEIGHT => ({
    width: '100%',
    maxWidth: 1440,
    height: SCREEN_HEIGHT * 0.85
  })
});
