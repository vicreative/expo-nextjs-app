import spacing from 'app/config/theme/spacing';
import { Flex, Pressable } from 'native-base';
import React, { useEffect } from 'react';
import { Platform } from 'react-native';
import { Modal as RNModal } from 'react-native';
import Container from '../Container';
import { TouchableOpacity } from 'react-native';

function Modal({
  visible,
  closeOnOverlayClick = false,
  onClose = () => {},
  animationType = 'fade',
  overlayColor = 'rgba(0, 0, 0, 0.3)',
  isDrawer = false,
  children,
  ...rest
}) {
  useEffect(() => {
    if (Platform.OS === 'web' && visible) {
      document.body.style.overflow = 'hidden';

      return () => {
        document.body.style.overflow = 'unset';
      };
    }
  }, [visible]);

  return (
    visible && (
      <RNModal
        animationType={animationType}
        transparent
        visible={visible}
        onRequestClose={onClose}
        statusBarTranslucent={true}
      >
        {closeOnOverlayClick ? (
          <TouchableOpacity
            activeOpacity={1}
            style={styles.overlay(overlayColor)}
            onPress={onClose}
          >
            <Container {...(isDrawer ? styles.drawer : {})} {...rest}>
              <Pressable
                onPress={() => {}}
                _web={{ cursor: 'text' }}
                width="100%"
                height={{ base: 'auto', sm: isDrawer ? '100%' : 'auto' }}
              >
                {children}
              </Pressable>
            </Container>
          </TouchableOpacity>
        ) : (
          <Flex style={styles.overlay(overlayColor)} _web={{ cursor: 'default' }}>
            <Container {...(isDrawer ? styles.drawer : {})} {...rest}>
              {children}
            </Container>
          </Flex>
        )}
      </RNModal>
    )
  );
}

export default Modal;

const styles = {
  overlay: overlayColor => ({
    backgroundColor: overlayColor,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    cursor: 'default'
    // position: 'absolute',
  }),
  drawer: {
    px: 0,
    maxWidth: { base: '100%', sm: '540px' },
    m: { base: 0, sm: `${spacing[24]}px` },
    borderRadius: { base: 0, sm: '20px' },
    statusBarStyle: 'dark',
    statusBarBackgroundColor: 'white',
    bg: 'white',
    height: '100%',
    alignSelf: 'flex-end',
    zIndex: 1000,
    overflow: 'hidden'
  }
};
