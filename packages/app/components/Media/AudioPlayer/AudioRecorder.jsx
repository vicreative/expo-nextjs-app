import spacing from 'app/config/theme/spacing';
import { HStack, Icon, Stack, Text, VStack } from 'native-base';
import { useState } from 'react';
import { stopRecording } from 'app/utils/audioRecorder';
import { millisToMinutesAndSeconds } from 'app/utils/index';
import Touchable from 'app/components/Gestures/Touchable';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import uploadToAws from 'app/utils/uploadToAws';
import { Media } from '..';

export default function AudioRecorder({
  recording,
  durationMillis,
  onCancel = () => {},
  onSuccessfulUploadToAWS = () => {}
}) {
  const [recordedUri, setRecordedUri] = useState(null);

  const onStopRecording = ({ shouldCancel = false, shouldSend = false }) => {
    stopRecording({
      recording: recording,
      recordedUri: recordedUri,
      onRecordingStopped: uri => {
        if (!shouldCancel) {
          if (shouldSend) {
            uploadToAws(uri, onSuccessfulUploadToAWS);
          }
          setRecordedUri(uri);
        }
      }
    });
  };

  const handleCancel = () => {
    onStopRecording({ shouldCancel: true, shouldSend: false });
    onCancel();
  };

  return (
    <VStack space={`${spacing[12]}px`}>
      <HStack width="100%" justifyContent="space-between" alignItems="center">
        {recordedUri ? (
          <Media source={{ uri: recordedUri }} type={'audio'} width="100%" height="100%" />
        ) : (
          <Text>{millisToMinutesAndSeconds(durationMillis)}</Text>
        )}
      </HStack>
      <HStack width="100%" justifyContent="space-between" alignItems="center">
        {/* cancel */}
        <Stack alignItems="flex-start" width="32%">
          <Touchable onPress={handleCancel} pr={`${spacing[6]}px`}>
            <Text fontFamily="Satoshi-Medium" color="warning.700">
              Cancel
            </Text>
          </Touchable>
        </Stack>
        {/* stop */}
        <Stack alignItems="center" width="32%">
          {recordedUri ? null : (
            <Touchable
              onPress={() => onStopRecording({ shouldCancel: false, shouldSend: false })}
              p={`${spacing[6]}px`}
            >
              <Icon
                as={FontAwesome5}
                name={'stop-circle'}
                color="error.600"
                size={`${spacing[30]}px`}
              />
            </Touchable>
          )}
        </Stack>
        {/* send */}
        <Stack alignItems="flex-end" width="32%">
          <Touchable
            onPress={() => onStopRecording({ shouldCancel: false, shouldSend: true })}
            pl={`${spacing[6]}px`}
          >
            <Icon as={Ionicons} name={'ios-send'} color="gray.500" size={`${spacing[24]}px`} />
          </Touchable>
        </Stack>
      </HStack>
    </VStack>
  );
}
