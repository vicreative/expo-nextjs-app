import colors from 'app/config/theme/colors';
import { Flex } from 'native-base';
import { createElement } from 'react';
import VideoPlayer from './VideoPlayer';
import Image from '../Image';
import AudioPlayer from './AudioPlayer';
import DocumentViewer from './DocumentViewer/index';

/**
 * Resolves the media type base on a give mimetype
 * @param { string } mimetype - The mimetype of a file
 */
export const resolveMediaType = (mimetype = '') => {
  return mimetype.split('/')[0];
};

const MediaComponentTypeMap = {
  image: {
    component: Image,
    props: {},
    asyncProps: function ({
      id,
      src,
      alt,
      source,
      borderRadius,
      minHeight,
      width,
      overlayColor,
      resizeMode = 'cover',
      height = 'inherit'
    }) {
      return {
        ...this.props,
        id,
        src,
        alt,
        source,
        borderRadius: borderRadius ? borderRadius : '0px',
        minHeight: minHeight,
        resizeMode: resizeMode,
        overlayColor: overlayColor,
        width: width,
        height: height
      };
    }
  },
  video: {
    component: VideoPlayer,
    props: {},
    asyncProps: function ({
      id,
      src,
      alt,
      width = '100%',
      height = 'inherit',
      minHeight,
      rounded,
      posterSource,
      usePoster,
      borderRadius,
      hasCustomControls,
      overlayColor,
      muted,
      controls,
      autoPlay,
      useCustomPauseBtn,
      hasLoadingIndicator,
      loadingIndicatorSize,
      objectFit
    }) {
      return {
        ...this.props,
        id,
        src,
        alt,
        width,
        height,
        posterSource,
        hasCustomControls,
        usePoster,
        overlayColor,
        muted,
        autoPlay,
        useCustomPauseBtn,
        controls: controls,
        hasLoadingIndicator,
        loadingIndicatorSize,
        style: {
          objectFit: objectFit,
          width: width,
          height: height,
          minHeight: minHeight,
          borderRadius: rounded ? '100%' : borderRadius ? borderRadius : '0px'
        }
      };
    }
  },
  audio: {
    component: AudioPlayer,
    props: {},
    asyncProps: function ({ id, src, alt, rounded, borderRadius, preview, iconSize }) {
      return {
        ...this.props,
        id,
        src,
        alt,
        preview,
        iconSize,
        style: {
          width: '100%',
          height: '30px',
          borderRadius: rounded ? '100%' : borderRadius ? borderRadius : '0px'
        }
      };
    }
  },
  application: {
    component: DocumentViewer,
    props: {},
    asyncProps: function ({ id, src, alt, width = '100%', height = '100%', preview, iconSize }) {
      return {
        ...this.props,
        'aria-label': alt,
        id,
        src,
        alt,
        preview,
        iconSize,
        style: {
          width: width,
          height: height
        }
      };
    }
  }
};

/**
 * A dynamic media component
 * @param { object } props
 * @param { string } props.id
 * @param { string } props.src
 * @param { "image" | "audio" | "video" | "pdf" } props.type - Defaults to `image`
 * @param { string } props.mimetype
 */
export const Media = ({
  id,
  alt,
  source,
  type = 'image',
  mimetype,
  rounded,
  width,
  height,
  borderRadius,
  minHeight,
  noBackgroundColor,
  posterSource,
  isMuted,
  shouldPlay,
  hasCustomControls,
  overlayColor,
  usePoster,
  resizeMode = 'cover',
  useCustomPauseBtn,
  useNativeControls,
  hasLoadingIndicator,
  loadingIndicatorSize,
  preview,
  iconSize,
  backgroundColor = colors.primary[100],
  ...rest
}) => {
  const mediaType = mimetype ? resolveMediaType(mimetype) : type;
  const MediaComponentType = MediaComponentTypeMap[mediaType];

  return (
    <Flex
      bg={
        type === 'video'
          ? '#1F1F1F'
          : type === 'application' && preview
          ? 'white'
          : rounded || noBackgroundColor || type === 'audio' || !preview
          ? 'none'
          : backgroundColor
      }
      borderRadius={borderRadius}
      width={width}
      height={height}
      minHeight={minHeight}
    >
      {createElement(MediaComponentType.component, {
        id,
        alt,
        ...MediaComponentType.props,
        ...MediaComponentType.asyncProps({
          id,
          alt,
          width,
          rounded,
          preview,
          iconSize,
          minHeight,
          usePoster,
          resizeMode,
          borderRadius,
          posterSource,
          overlayColor,
          hasCustomControls,
          useCustomPauseBtn,
          hasLoadingIndicator,
          loadingIndicatorSize,
          muted: isMuted,
          src: source.uri,
          source: source,
          autoPlay: shouldPlay,
          objectFit: resizeMode,
          controls: useNativeControls
        }),
        ...rest
      })}
    </Flex>
  );
};
