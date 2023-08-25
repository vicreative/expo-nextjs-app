import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, ActivityIndicator } from 'react-native';
import { Video } from 'expo-av';

import VideoControls from './VideoControls';
import { Box, Icon, VStack } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import spacing from 'app/config/theme/spacing';

export default function VideoPlayer(props) {
  const {
    showIcon,
    isMuted = true,
    onPlaybackStatusUpdate = () => {},
    hasLoadingIndicator = false,
    hasErrorIndicator = false,
    loadingIndicatorSize,
    errorIndicatorSize,
    useNativeControls,
    hasCustomControls = false,
    useCustomPauseBtn = false,
    overlayColor,
    style,
    ...rest
  } = props;

  const playbackInstance = useRef(null);

  const [playbackInstanceInfo, setPlaybackInstanceInfo] = useState({
    position: 0,
    duration: 0,
    isLoaded: false,
    state: 'Buffering',
    isLoading: false,
    isError: false
  });

  useEffect(() => {
    if (playbackInstanceInfo.state === 'Ended') {
      setPlaybackInstanceInfo(playbackInstanceInfo => ({
        ...playbackInstanceInfo,
        state: 'Ended'
      }));
    }

    return () => {};
  }, [playbackInstanceInfo.state]);

  const togglePlay = async () => {
    const shouldPlay = playbackInstanceInfo.state !== 'Playing';

    if (playbackInstance.current !== null) {
      await playbackInstance.current.setStatusAsync({
        shouldPlay,
        ...(playbackInstanceInfo.state === 'Ended' && { positionMillis: 0 })
      });
      setPlaybackInstanceInfo({
        ...playbackInstanceInfo,
        isLoaded: true,
        state: playbackInstanceInfo.state === 'Playing' ? 'Paused' : 'Playing'
      });
    }
  };

  const updatePlaybackCallback = status => {
    if (status.isLoaded) {
      setPlaybackInstanceInfo({
        ...playbackInstanceInfo,
        isLoaded: status.isLoaded,
        position: status.positionMillis,
        duration: status.durationMillis || 0,
        state: status.isBuffering
          ? 'Buffering'
          : status.isPlaying
          ? 'Playing'
          : status.didJustFinish || status.positionMillis === status.durationMillis
          ? 'Ended'
          : 'Paused'
      });
      onPlaybackStatusUpdate(status);
    } else {
      if (status.isLoaded === false && status.error) {
        const errorMsg = `Encountered a fatal error during playback: ${status.error}`;
        console.warn(errorMsg);
      }
    }
  };

  return (
    <Box position="relative">
      <Video
        ref={playbackInstance}
        isMuted={isMuted}
        useNativeControls={playbackInstanceInfo.isLoading ? false : useNativeControls}
        onPlaybackStatusUpdate={updatePlaybackCallback}
        onLoadStart={() => setPlaybackInstanceInfo({ ...playbackInstanceInfo, isLoading: true })}
        onReadyForDisplay={() =>
          setPlaybackInstanceInfo({ ...playbackInstanceInfo, isLoading: false })
        }
        onLoad={() => setPlaybackInstanceInfo({ ...playbackInstanceInfo, isError: false })}
        onError={() => setPlaybackInstanceInfo({ ...playbackInstanceInfo, isError: true })}
        style={style}
        {...rest}
      />

      {((hasLoadingIndicator && playbackInstanceInfo.isLoading) ||
        (hasErrorIndicator && playbackInstanceInfo.isError) ||
        overlayColor ||
        hasCustomControls) && (
        <VStack
          style={styles.overlay(
            playbackInstanceInfo.isLoading || playbackInstanceInfo.isError
              ? 'transparent'
              : overlayColor
          )}
        >
          {hasLoadingIndicator && playbackInstanceInfo.isLoading ? (
            <ActivityIndicator
              animating={true}
              size={loadingIndicatorSize ? loadingIndicatorSize : 'small'}
              color={'white'}
            />
          ) : hasErrorIndicator && playbackInstanceInfo.isError ? (
            <Icon
              as={MaterialIcons}
              name="broken-image"
              color="gray.50"
              size={errorIndicatorSize === 'large' ? `${spacing[50]}px` : `${spacing[30]}px`}
            />
          ) : null}
          {hasCustomControls && (
            <VideoControls
              state={playbackInstanceInfo.state}
              playbackInstance={playbackInstance.current}
              playbackInstanceInfo={playbackInstanceInfo}
              setPlaybackInstanceInfo={setPlaybackInstanceInfo}
              togglePlay={togglePlay}
              showIcon={showIcon}
              useCustomPauseBtn={useCustomPauseBtn}
            />
          )}
        </VStack>
      )}
    </Box>
  );
}

const styles = StyleSheet.create({
  overlay: overlayColor => ({
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: overlayColor
  })
});
