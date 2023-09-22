import { forwardRef } from 'react';
import { STATUS_BAR_HEIGHT } from 'app/constants/index';
import { StatusBar } from 'expo-status-bar';
import { Box, Center } from 'native-base';
import spacing from 'app/config/theme/spacing';

const Container = forwardRef(
  (
    {
      hidePaddingTop,
      maxWidth = '1440px',
      width = '100%',
      px = spacing[24],
      pt = spacing[24],
      bg = 'white',
      statusBarStyle = 'dark',
      statusBarBackgroundColor = 'transparent',
      children,
      ...rest
    },
    ref
  ) => {
    return (
      <Center height="100%" width="100%" ref={ref}>
        <Box
          bg={bg}
          width={width}
          maxWidth={maxWidth}
          px={px}
          pt={!hidePaddingTop ? `${STATUS_BAR_HEIGHT}px` : pt}
          flex={1}
          {...rest}
        >
          {children}
          <StatusBar
            style={statusBarStyle}
            translucent
            backgroundColor={statusBarBackgroundColor}
          />
        </Box>
      </Center>
    );
  }
);

export default Container;
