import { Ionicons } from '@expo/vector-icons';
import { Flex, Pressable } from 'native-base';
import { useRef, useState } from 'react';
import { ActivityIndicator } from 'react-native-web';
import getDeviceOS from 'app/utils/deviceOs.web';
import { Image } from '../..';

export default function VideoPlayer(props) {
  const videoRef = useRef(null);
  const deviceOs = getDeviceOS();
  const isMobile = deviceOs === 'iOS' || deviceOs === 'Android';
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showControls, setShowControls] = useState(false);
  const [iconName, setIconName] = useState('play');

  const onLoadStart = () => {
    setIsLoading(false);
  };

  const onMouseEnter = () => {
    setShowControls(true);
    videoRef.current?.play();
  };
  const onMouseLeave = () => {
    setShowControls(false);
    videoRef.current?.pause();
  };

  const onPlay = () => {
    setIsPlaying(true);
    setIconName('pause');
  };

  const onPause = () => {
    setIsPlaying(false);
    setIconName('play');
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      videoRef.current?.pause();
    } else {
      videoRef.current?.play();
    }
  };

  return (
    <Flex
      width={props?.width}
      height={props?.height}
      position="relative"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <video
        ref={videoRef}
        width="100%"
        height="100%"
        src={props?.src}
        poster={props?.posterSource?.uri}
        preload={props?.preload}
        style={props?.style}
        controls={props?.controls}
        autoPlay={props?.autoPlay}
        controlsList={props?.controlsList}
        disablePictureInPicture={props?.disablePictureInPicture}
        disableRemotePlayback={props?.disableRemotePlayback}
        loop={props?.loop}
        muted={props?.muted}
        crossOrigin="anonymous"
        playsInline={props?.playsInline}
        onLoadStart={onLoadStart}
        onPlay={onPlay}
        onPause={onPause}
      />
      {props.usePoster && !isPlaying && (
        <Flex width="100%" height="100%" position="absolute">
          <Image
            width="100%"
            height="100%"
            borderRadius={props.borderRadius}
            resizeMode={props.resizeMode}
            source={{ uri: props.posterSource?.uri }}
            alt={props.alt}
          />
        </Flex>
      )}

      {props?.overlayColor && (
        <Flex width="100%" height="100%" position="absolute" bg={props?.overlayColor} />
      )}

      {isMobile || showControls ? (
        props.hasCustomControls && props.useCustomPauseBtn ? (
          <Pressable
            px={'8px'}
            py={'6px'}
            bg={'rgba(0, 0, 0, 0.2)'}
            zIndex={1000}
            borderRadius="full"
            position="absolute"
            right={'14px'}
            bottom={'20px'}
            onPress={e => {
              e.stopPropagation();
              togglePlayPause();
            }}
          >
            {isLoading ? (
              <ActivityIndicator animating={true} size={'small'} color={'white'} />
            ) : (
              <Ionicons name={iconName} size={16} color="white" />
            )}
          </Pressable>
        ) : null
      ) : null}

      {props.hasLoadingIndicator && isLoading && !props.controls && (
        <Flex position="absolute" top="50%" left="50%">
          <ActivityIndicator
            animating={true}
            size={props.loadingIndicatorSize ? props.loadingIndicatorSize : 'small'}
            color={'white'}
          />
        </Flex>
      )}
    </Flex>
  );
}
