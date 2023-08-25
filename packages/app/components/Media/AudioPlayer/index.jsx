import { useEffect, useState } from 'react';
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';
import Touchable from 'app/components/Gestures/Touchable';
import spacing from 'app/config/theme/spacing';
import { Box, Flex, HStack, Icon, Slider, Stack, Text } from 'native-base';
import { pauseSound, playSound, stopSound, unLoadSound } from 'app/utils/audioRecorder';
import { millisToMinutesAndSeconds } from 'app/utils/index';
import { loadSound } from 'app/utils/audioRecorder';
import { AudioFrequencyIcon } from 'app/components/Icons/Audio';

const initialStatus = {
  durationMillis: 0,
  positionMillis: 0,
  progressUpdateIntervalMillis: 500,
  isLoaded: false,
  isPlaying: false,
  shouldPlay: false
};

export default function AudioPlayer({
  preview = true,
  iconSize = spacing[100],
  sound = null,
  width,
  height,
  uri,
  shouldLoadSound,
  setSound = () => {}
}) {
  const [iconName, setIconName] = useState('play');
  const [playbackStatus, setPlaybackStatus] = useState(initialStatus);

  const hasEnded =
    playbackStatus.isLoaded && playbackStatus.durationMillis === playbackStatus.positionMillis;

  useEffect(() => {
    if (shouldLoadSound) {
      loadSound({
        setSound,
        uri: uri,
        initialStatus: playbackStatus,
        onPlaybackStatusUpdate: setPlaybackStatus
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldLoadSound]);

  useEffect(() => {
    return sound
      ? () => {
          if (playbackStatus.isPlaying) {
            stopSound({ sound });
          }
          unLoadSound({ sound });
        }
      : undefined;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sound]);

  const togglePlay = async () => {
    try {
      if (hasEnded) {
        await sound.playFromPositionAsync(0);
      } else if (playbackStatus.isPlaying) {
        pauseSound({ sound });
        setIconName('play');
      } else {
        playSound({ sound });
        setIconName('pause');
      }
    } catch (e) {
      console.warn('togglePlay', e);
    }
  };

  const handleSliderChange = async v => {
    try {
      setIconName('pause');
      await sound.playFromPositionAsync(Math.floor(v));
    } catch (e) {
      console.warn('An error occured on slider change', e);
    }
  };

  const handleSliderEndChange = async v => {
    if (v) {
      try {
        await sound.setPositionAsync(Math.floor(v));
      } catch (e) {
        console.warn('An error occured on slider change end', e);
      }
    }
  };

  return preview ? (
    <HStack width="100%" justifyContent="space-between" alignItems="center">
      <Stack alignItems="flex-start">
        <Touchable onPress={togglePlay}>
          <Icon
            as={hasEnded ? AntDesign : FontAwesome5}
            name={hasEnded ? 'reload1' : iconName}
            color="gray.500"
            size={`${spacing[18]}px`}
          />
        </Touchable>
      </Stack>
      <Box width="72%">
        <Slider
          minValue={0}
          maxValue={playbackStatus.durationMillis}
          value={playbackStatus.positionMillis}
          onChange={handleSliderChange}
          onChangeEnd={handleSliderEndChange}
        >
          <Slider.Track>
            <Slider.FilledTrack />
          </Slider.Track>
          {playbackStatus.durationMillis > 0 ? <Slider.Thumb /> : <></>}
        </Slider>
      </Box>
      <Stack alignItems="flex-end">
        <Text>
          {millisToMinutesAndSeconds(
            playbackStatus.positionMillis <= 0
              ? playbackStatus.durationMillis
              : playbackStatus.positionMillis
          )}
        </Text>
      </Stack>
    </HStack>
  ) : (
    <Flex alignItems="center" justifyContent="center" width={width} height={height}>
      <AudioFrequencyIcon width={iconSize} height={iconSize} />
    </Flex>
  );
}
