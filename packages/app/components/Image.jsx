import React, { forwardRef, useState } from 'react';
import { Box, Flex, Icon, Spinner, Image as RNImage } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import spacing from 'app/config/theme/spacing';
import { Platform } from 'react-native';

let EXImage;

if (Platform.OS !== 'web') {
  EXImage = require('expo-image').Image;
}

const Image = forwardRef(
  (
    {
      hasLoadingIndicator = false,
      loadingIndicatorSize = 'small',
      hasErrorIndicator = false,
      errorIndicatorSize = 'small',
      overlayColor,
      borderRadius,
      minHeight,
      backgroundColor,
      resizeMode,
      style = {},
      ...rest
    },
    ref
  ) => {
    const [state, setState] = useState({
      isLoading: false,
      isError: false
    });
    return (
      <Box
        alignItems="center"
        justifyContent="center"
        _web={{ width: '100%', height: '100%' }}
        bg={backgroundColor}
        borderRadius={borderRadius}
      >
        {Platform.OS === 'web' ? (
          <RNImage
            ref={ref}
            resizeMode={resizeMode}
            style={{
              borderRadius,
              minHeight,
              backgroundColor,
              ...style
            }}
            {...rest}
          />
        ) : (
          <EXImage
            ref={ref}
            onLoadStart={() => setState({ ...state, isLoading: true })}
            onLoadEnd={() => setState({ ...state, isLoading: false })}
            onError={() => setState({ ...state, isError: true })}
            onLoad={() => setState({ ...state, isError: false })}
            contentFit={resizeMode}
            style={{
              borderRadius,
              minHeight,
              backgroundColor,
              ...style
            }}
            {...rest}
          />
        )}

        {hasLoadingIndicator && state.isLoading && !state.isError && (
          <Spinner position="absolute" color="white" size={loadingIndicatorSize} />
        )}
        {hasErrorIndicator && state.isError && state.isLoading && (
          <Icon
            as={MaterialIcons}
            name="broken-image"
            color="gray.50"
            position="absolute"
            size={errorIndicatorSize === 'large' ? `${spacing[50]}px` : `${spacing[30]}px`}
          />
        )}
        {overlayColor && !state.isLoading && !state.isError && (
          <Flex
            height="100%"
            width="100%"
            bg={overlayColor}
            borderRadius={borderRadius}
            position="absolute"
          />
        )}
      </Box>
    );
  }
);

export default Image;
