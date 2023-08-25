import React from 'react';
import { Icon, Flex, HStack, Box } from 'native-base';
import { AntDesign, Entypo } from '@expo/vector-icons';
import spacing from 'app/config/theme/spacing';
import Touchable from 'app/components/Gestures/Touchable';
import { Media } from './index';
import * as mime from 'react-native-mime-types';
import useDimensions from 'app/hooks/useDimensions';
import ChatInput from 'app/features/Home/components/Chats/components/ChatInput';
import { TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView } from 'react-native';
import { Platform } from 'react-native';

export function MediaPreview({
  file,
  hasChatInput,
  hideSendButton,
  onClose = () => {},
  onUpload = () => {}
}) {
  const {
    screen: { height: SCREEN_HEIGHT, width: WIDTH }
  } = useDimensions();

  const fileMime =
    file?.base64 !== null && file?.base64 !== undefined
      ? file.base64?.split(';')[0]?.split(':')[1]
      : mime.lookup(file?.uri);

  const type = fileMime && fileMime?.split('/').shift();

  function handleUpload() {
    onUpload(file);
  }

  function dismissKeyboard() {
    if (Platform.OS !== 'web') {
      Keyboard.dismiss();
    }
  }
  return (
    file && (
      <KeyboardAvoidingView
        behavior={'padding'}
        style={{ height: '100%', width: '100%', marginBottom: spacing[30] }}
      >
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
          <Flex
            width="100%"
            height="100%"
            pt={`${spacing[30]}px`}
            _web={{ width: '100vw' }}
            alignItems="center"
            justifyContent={{ base: 'flex-start', sm: 'center' }}
          >
            <Flex
              width="100%"
              height={{
                base: `${SCREEN_HEIGHT * 0.85}px`,
                sm: `${SCREEN_HEIGHT * 0.7}px`
              }}
              justifyContent="center"
              maxWidth={{ base: 'auto', sm: '560px', md: '760px' }}
            >
              {type === 'audio' ? (
                <Box
                  bg="white"
                  mx={`${spacing[24]}px`}
                  px={`${spacing[14]}px`}
                  py={`${spacing[8]}px`}
                  borderRadius={`${spacing[8]}px`}
                >
                  <Media source={{ uri: file.uri }} type={type} preview={true} />
                </Box>
              ) : (
                <Media
                  source={{ uri: file.uri }}
                  alt={'File'}
                  type={type}
                  width={type === 'video' ? WIDTH : '100%'}
                  height={type === 'video' ? SCREEN_HEIGHT * 0.5 : '100%'}
                  resizeMode={type === 'video' ? 'cover' : 'contain'}
                  backgroundColor="black"
                  borderRadius={0}
                  useNativeControls
                  hasLoadingIndicator
                  loadingIndicatorSize="large"
                  preview={type !== 'application'}
                  iconSize={100}
                />
              )}
            </Flex>
            <CloseBtn onClose={onClose} />s
            <Box width="100%" position="absolute" bottom={0}>
              <SendButton
                hasChatInput={hasChatInput}
                onSendMessage={handleUpload}
                hideSendButton={hideSendButton}
              />
            </Box>
          </Flex>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    )
  );
}

const CloseBtn = ({ color = 'white', onClose, ...rest }) => (
  <HStack
    justifyContent="space-between"
    alignItems="center"
    px={`${spacing[12]}px`}
    py={`${spacing[8]}px`}
    position="absolute"
    top={`${spacing[30]}px`}
    left={0}
    {...rest}
  >
    <Touchable bg="rgba(0, 0, 0, 0.08)" p={`${spacing[8]}px`} borderRadius="full" onPress={onClose}>
      <Icon as={AntDesign} name="close" size={`${spacing[24]}px`} color={color} />
    </Touchable>
  </HStack>
);

const SendButton = ({ hasChatInput, onSendMessage = () => {}, hideSendButton }) => {
  return (
    <>
      {hasChatInput ? (
        <ChatInput
          hideSendButton
          hideMicrophone
          hideExtraHeight
          variant="filled"
          onSendMessage={onSendMessage}
        />
      ) : !hideSendButton ? (
        <HStack
          justifyContent="flex-end"
          alignItems="center"
          px={`${spacing[20]}px`}
          py={`${spacing[16]}px`}
          position="absolute"
          bottom={`${spacing[60]}px`}
          right={0}
        >
          <Touchable
            onPress={onSendMessage}
            p={`${spacing[10]}px`}
            bg="primary.600"
            borderRadius="full"
          >
            <Icon as={Entypo} name="check" size={`${spacing[24]}px`} color="white" opacity={0.9} />
          </Touchable>
        </HStack>
      ) : null}
    </>
  );
};
