import { useEffect, useState } from 'react';
import { AntDesign, Ionicons, SimpleLineIcons } from '@expo/vector-icons';
import Touchable from 'app/components/Gestures/Touchable';
import { Button, Input } from 'app/components/index';
import spacing from 'app/config/theme/spacing';
import useAppContext from 'app/hooks/useAppContext';
import { Box, Flex, HStack, Heading, Icon, Stack, Text, VStack } from 'native-base';
import { KeyboardAvoidingView } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming
} from 'react-native-reanimated';
import { startRecording } from 'app/utils/audioRecorder';
import AudioRecorder from 'app/components/Media/AudioPlayer/AudioRecorder';
import en from 'app/i18n/index';
import colors from 'app/config/theme/colors';
import { Media } from 'app/components/Media';
import { resolveFileUrl } from 'app/utils/index';

export default function ChatInput({
  inputRef,
  placeholder = 'Send a message',
  variant = 'outline',
  hideSendButton,
  hideMicrophone,
  hideExtraHeight = false,
  onFocus = () => {},
  onSendMessage = () => {},
  onShowUploadModal = () => {}
}) {
  const { state, dispatch } = useAppContext('chat');
  const [recorder, setRecorder] = useState({
    showVoiceNote: false,
    recording: null,
    recordingStatus: null
  });

  const onStartRecording = () => {
    const onRecordingStatusUpdate = (status, recording) => {
      setRecorder({ showVoiceNote: true, recordingStatus: status, recording });
    };

    startRecording({
      onRecordingStatusUpdate
    });
  };

  const clearAudioState = () => {
    setRecorder({
      showVoiceNote: false,
      recordingStatus: null,
      recording: null
    });
  };

  const onSuccessfulUploadToAWS = data => {
    onSendMessage({
      mediaFileName: data.fileName,
      mediaMimetype: data.fileMime,
      link: data.location
    });
    clearAudioState();
  };

  return (
    <>
      <KeyboardAvoidingView behavior={'padding'}>
        <ReplyCard />
        <Box
          borderTopWidth={variant === 'outline' ? 1 : 0}
          borderTopColor="gray.100"
          bg={variant === 'outline' ? 'white' : 'transparent'}
          px={`${spacing[24]}px`}
          py={`${spacing[14]}px`}
        >
          {recorder.showVoiceNote ? (
            <AudioRecorder
              onCancel={clearAudioState}
              recording={recorder.recording}
              onSuccessfulUploadToAWS={onSuccessfulUploadToAWS}
              durationMillis={recorder.recordingStatus?.durationMillis}
            />
          ) : (
            <HStack width="100%" justifyContent="space-between" alignItems="center">
              {!hideSendButton && (
                <Flex alignItems="flex-start" width="10%">
                  <Touchable onPress={onShowUploadModal} pr={`${spacing[6]}px`}>
                    <Icon
                      as={AntDesign}
                      name="pluscircleo"
                      color="gray.500"
                      size={`${spacing[24]}px`}
                    />
                  </Touchable>
                </Flex>
              )}

              <Box width={hideSendButton ? '90%' : '80%'}>
                <Input
                  ref={inputRef}
                  multiline
                  value={state.message}
                  onChangeText={val => dispatch({ type: 'SET_MESSAGE', message: val })}
                  onFocus={onFocus}
                  focusOutlineColor="gray.100"
                  textAlignVertical="center"
                  px={`${spacing[12]}px`}
                  py={`${spacing[8]}px`}
                  h="auto"
                  maxH="120px"
                  variant={variant}
                  placeholder={placeholder}
                />
              </Box>

              <Flex alignItems="flex-end" width="10%">
                {state.message === '' && !hideMicrophone ? (
                  <Touchable onPress={onStartRecording} pl={`${spacing[6]}px`}>
                    <Icon
                      as={SimpleLineIcons}
                      name={'microphone'}
                      color="gray.500"
                      size={`${spacing[24]}px`}
                    />
                  </Touchable>
                ) : (
                  <Touchable
                    onPress={() =>
                      onSendMessage({
                        mediaFileName: null,
                        mediaMimetype: null,
                        link: null
                      })
                    }
                    pl={`${spacing[6]}px`}
                  >
                    <Icon
                      as={Ionicons}
                      name={'ios-send'}
                      color={variant === 'outline' ? 'gray.500' : 'gray.100'}
                      size={`${spacing[24]}px`}
                    />
                  </Touchable>
                )}
              </Flex>
            </HStack>
          )}
        </Box>
      </KeyboardAvoidingView>
      {!hideExtraHeight && (
        <Box
          height={`${spacing[30]}px`}
          bg={variant === 'outline' ? 'white' : 'transparent'}
          _web={{ height: 0 }}
        />
      )}
    </>
  );
}

const ReplyCard = () => {
  const height = useSharedValue(60);
  const { state, dispatch } = useAppContext('chat');
  const { state: userState } = useAppContext('user');

  const heightAnimatedStyle = useAnimatedStyle(() => {
    return {
      height: height.value
    };
  });

  useEffect(() => {
    if (state.reply) {
      height.value = withTiming(60);
    } else {
      height.value = withSpring(70);
    }
  }, [height, state.reply]);

  const userId = userState.user?.id;
  const isLeft = userId !== state.reply?.user?.id;
  const username = `${state.reply?.user?.firstName} ${state.reply?.user?.lastName}`;

  const onClose = () => {
    dispatch({ type: 'SET_REPLY', reply: null });
  };

  return (
    state.reply && (
      <Animated.View style={[heightAnimatedStyle]}>
        <HStack bg="white" h="100%" borderTopWidth={1} borderTopColor="gray.100" width="100%">
          <HStack
            width="90%"
            h="100%"
            borderLeftWidth={5}
            borderColor="primary.600"
            pl={`${spacing[10]}px`}
            py={`${spacing[4]}px`}
            alignItems="center"
            justifyContent="space-between"
            overflow="hidden"
          >
            <Stack maxW={state.reply.media ? '85%' : '100%'}>
              <Heading fontSize={`${spacing[16]}px`} color="primary.700">
                {isLeft ? username : 'You'}
              </Heading>

              {/* body */}
              <Text fontSize={`${spacing[14]}px`} noOfLines={1}>
                {en.chats.lastMessage({
                  hasLastMessage: state.reply ? true : false,
                  lastMessage: state.reply.body,
                  mimeType: state.reply.media?.type?.split('/')[0]
                })}
              </Text>
            </Stack>

            {state.reply.media && (
              <Box width={`${spacing[50]}px`} height="100%">
                <Media
                  source={{ uri: resolveFileUrl(state.reply.media?.link) }}
                  alt={'File'}
                  type={state.reply.media?.type?.split('/')[0]}
                  width="100%"
                  height="100%"
                  resizeMode={'cover'}
                  backgroundColor={colors.primary[50]}
                  borderRadius={spacing[4]}
                  hasLoadingIndicator
                  loadingIndicatorSize="small"
                  iconSize={`${spacing[50]}px`}
                  preview={false}
                />
              </Box>
            )}
          </HStack>

          <VStack alignItems="center" justifyContent="center" width="10%">
            <Button size="sm" variant="unstyled" onPress={onClose}>
              <Icon as={AntDesign} name="close" size={`${spacing[20]}px`} color={'gray.500'} />
            </Button>
          </VStack>
        </HStack>
      </Animated.View>
    )
  );
};
