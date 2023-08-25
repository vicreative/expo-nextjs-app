import React from 'react';
import { StyleSheet, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Icon, Pressable } from 'native-base';
import spacing from 'app/config/theme/spacing';

const VideoControls = props => {
  const { state, togglePlay, playbackInstanceInfo, useCustomPauseBtn } = props;

  function renderIcon() {
    if (state === 'Buffering') {
      return <ActivityIndicator size="small" color="white" />;
    } else if (state === 'Playing') {
      return <Icon as={Ionicons} name={'pause'} size={`${spacing[16]}px`} color="white" />;
    } else if (state === 'Paused') {
      return <Icon as={Ionicons} name={'play'} size={`${spacing[16]}px`} color="white" />;
    } else if (state === 'Ended') {
      return <Icon as={Ionicons} name={'reload'} size={`${spacing[16]}px`} color="white" />;
    }
  }

  return (
    <>
      {useCustomPauseBtn && !playbackInstanceInfo.isLoading && !playbackInstanceInfo.isError ? (
        <Pressable onPress={state === 'Buffering' ? null : togglePlay} {...styles.customPauseBtn}>
          {renderIcon()}
        </Pressable>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  customPauseBtn: {
    p: '6px',
    bg: 'rgba(0, 0, 0, 0.2)',
    position: 'absolute',
    bottom: '20',
    right: '14',
    borderRadius: 'full'
  }
});

export default VideoControls;
