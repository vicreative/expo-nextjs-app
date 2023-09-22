import React from 'react';
import { Animated, Platform, StyleSheet, View, Text } from 'react-native';
import colors from 'app/config/theme/colors';
import spacing from 'app/config/theme/spacing';
import Modal from './Modal';
import { Logo } from './Icons/Logo';
let Image;

if (Platform.OS === 'web') {
  Image = require('next/image').default;
}

const LoadingState = ({
  fontSize = 14,
  iconSize = spacing[64],
  colorScheme = 'primary',
  hasOpaqueBackground,
  justLogo,
  useSvgLogo = true,
  message = 'Loading'
}) => {
  const [animation] = React.useState(new Animated.Value(1));

  const animatePulse = () => {
    Animated.sequence([
      Animated.timing(animation, {
        toValue: 0.95,
        duration: 1000,
        useNativeDriver: Platform.OS === 'web' ? false : true
      }),
      Animated.timing(animation, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: Platform.OS === 'web' ? false : true
      })
    ]).start(() => animatePulse());
  };

  React.useEffect(() => {
    animatePulse();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderLoader = () => (
    <Animated.View style={{ transform: [{ scale: animation }] }}>
      {useSvgLogo ? (
        <Logo width={iconSize} height={iconSize} />
      ) : (
        <Image
          src="/assets/images/favicon.png"
          width={64}
          height={64}
          alt="Loading Icon"
          priority={true}
        />
      )}
      {!justLogo && <Text style={styles.text(colorScheme, fontSize)}>{message}</Text>}
    </Animated.View>
  );
  return (
    <>
      {hasOpaqueBackground ? (
        <Modal
          visible
          overlayColor={colorScheme === 'white' ? 'rgba(0, 0, 0, 0.3)' : 'rgba(255, 255, 255, 0.8)'}
          bg="transparent"
          px={0}
          pt={0}
          m={0}
          maxW="100%"
        >
          <View style={styles.container(hasOpaqueBackground)}>{renderLoader()}</View>
        </Modal>
      ) : (
        <View style={styles.container(false)}>{renderLoader()}</View>
      )}
    </>
  );
};
export default LoadingState;

const styles = StyleSheet.create({
  container: hasOpaqueBackground => ({
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: hasOpaqueBackground ? 'transparent' : colors.base.white
  }),
  text: (colorScheme, fontSize) => ({
    marginTop: 10,
    textAlign: 'center',
    fontSize: fontSize,
    color: colorScheme === 'white' ? colors.base.white : colors.base.black
  })
});
