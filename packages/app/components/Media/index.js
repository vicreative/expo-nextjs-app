import VideoPlayer from './VideoPlayer';
import colors from 'app/config/theme/colors';
import spacing from 'app/config/theme/spacing';
import { Box } from 'native-base';
import { StyleSheet } from 'react-native';
import Image from '../Image';
import AudioPlayer from './AudioPlayer';
import { useState } from 'react';
import DocumentViewer from './DocumentViewer';

export const Media = ({
  type = 'image',
  width,
  height,
  minHeight,
  source,
  alt,
  borderRadius = spacing[10],
  style,
  posterStyle,
  overlayColor,
  backgroundColor = colors.primary[100],
  ...rest
}) => {
  const [sound, setSound] = useState(null);
  return (
    <>
      {type === 'video' ? (
        <VideoPlayer
          source={source}
          style={{
            ...styles.video(width, height, borderRadius, minHeight, backgroundColor),
            ...style
          }}
          posterStyle={[
            styles.video(width, height, borderRadius, minHeight, backgroundColor),
            { resizeMode: 'cover' },
            posterStyle
          ]}
          overlayColor={overlayColor}
          {...rest}
        />
      ) : type === 'audio' ? (
        <AudioPlayer
          sound={sound}
          setSound={setSound}
          uri={source.uri}
          shouldLoadSound={type === 'audio'}
          width={width}
          height={height}
          {...rest}
        />
      ) : type === 'application' ? (
        <DocumentViewer source={source} width={width} height={height} {...rest} />
      ) : (
        <Box width={width} height={height}>
          <Image
            width={'100%'}
            height={'100%'}
            source={source}
            borderRadius={borderRadius}
            minHeight={minHeight}
            backgroundColor={backgroundColor}
            overlayColor={overlayColor}
            style={style}
            alt={alt}
            {...rest}
          />
        </Box>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  video: (width, height, borderRadius, minHeight, backgroundColor = '#1F1F1F') => ({
    width: width,
    height: height,
    borderRadius: borderRadius,
    minHeight: minHeight,
    backgroundColor: backgroundColor
  })
});
