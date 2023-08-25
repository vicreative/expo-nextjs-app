import { forwardRef } from 'react';
import colors from 'app/config/theme/colors';
import { STATUS_BAR_HEIGHT } from 'app/constants/index';
import { StatusBar } from 'expo-status-bar';
import { Box, Center, Flex } from 'native-base';
import Header from 'app/navigation/Header';
import spacing from 'app/config/theme/spacing';
import useDimensions from 'app/hooks/useDimensions';

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
      headerTitle,
      headerRight,
      extraHeaderComponent,
      onGoBack,
      statusBarBackgroundColor = 'transparent',
      headerBackgroundColor = colors.primary[100],
      headerPrimaryColor = 'base.black',
      headerCloseIconName = 'arrow-left',
      headerBorderBottomWidth = 0,
      children,
      ...rest
    },
    ref
  ) => {
    const {
      screen: { height: SCREEN_HEIGHT }
    } = useDimensions();

    return (
      <Center height="100%" width="100%" ref={ref}>
        <Box
          bg={bg}
          width={width}
          maxWidth={maxWidth}
          px={px}
          pt={
            !headerTitle
              ? !hidePaddingTop
                ? `${STATUS_BAR_HEIGHT}px`
                : pt
              : `${SCREEN_HEIGHT * 0.1 + pt}px`
          }
          flex={1}
          {...rest}
        >
          {children}
          <StatusBar
            style={statusBarStyle}
            translucent
            backgroundColor={
              headerTitle
                ? statusBarBackgroundColor
                  ? statusBarBackgroundColor
                  : colors.primary[100]
                : statusBarBackgroundColor
            }
          />

          {headerTitle && (
            <Flex position="absolute" top={0} w="100%">
              <Header
                title={headerTitle}
                headerRight={headerRight}
                onGoBack={onGoBack}
                headerBackgroundColor={headerBackgroundColor}
                headerPrimaryColor={headerPrimaryColor}
                extraComponent={extraHeaderComponent}
                headerCloseIconName={headerCloseIconName}
                headerBorderBottomWidth={headerBorderBottomWidth}
              />
            </Flex>
          )}
        </Box>
      </Center>
    );
  }
);

export default Container;
