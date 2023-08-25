import { Feather, Octicons } from '@expo/vector-icons';
import spacing from 'app/config/theme/spacing';
import useDimensions from 'app/hooks/useDimensions';
import { Flex, Icon, Text } from 'native-base';
import { memo, useState } from 'react';
import Modal from './Modal';

function Toast({ mode, message, error = false, useRNModal = false, centerContent = false }) {
  const [isVisible, setIsVisible] = useState(true);
  const {
    window: { width }
  } = useDimensions();

  if (useRNModal && isVisible) {
    setTimeout(() => {
      setIsVisible(false);
    }, 2500);
  }
  return !useRNModal ? (
    <Flex {...styles.toast(error, mode, centerContent, width)}>
      {error ? (
        <Icon as={Feather} name="alert-circle" {...styles.icon(error, mode, centerContent)} />
      ) : (
        <Icon as={Octicons} name="check-circle" {...styles.icon(error, mode, centerContent)} />
      )}
      <Text {...styles.message(error, mode, centerContent)}>{message}</Text>
    </Flex>
  ) : (
    <Modal
      px={0}
      animationType="fade"
      visible={isVisible}
      bg="transparent"
      overlayColor="transparent"
      alignItems="center"
      onClose={() => setIsVisible(false)}
      maxW="100%"
    >
      <Flex {...styles.toast(error, mode, centerContent, width)}>
        {error ? (
          <Icon as={Feather} name="alert-circle" {...styles.icon(error, mode, centerContent)} />
        ) : (
          <Icon as={Octicons} name="check-circle" {...styles.icon(error, mode, centerContent)} />
        )}
        <Text {...styles.message(error, mode, centerContent)}>{message}</Text>
      </Flex>
    </Modal>
  );
}
export default memo(Toast);

const styles = {
  toast: (error, mode, centerContent, width) => ({
    bg: error
      ? 'error.25'
      : mode === 'dark'
      ? 'gray.500'
      : mode === 'light'
      ? 'white'
      : 'success.25',
    px: `${spacing[18]}px`,
    py: `${spacing[16]}px`,
    maxWidth: { base: '100%', sm: `${spacing[100] * 3.66}px` },
    _web: {
      minWidth: { base: 'auto', sm: '400px' },
      maxWidth: {
        base: '360px',
        sm: '400px'
      }
    },
    width: { base: width - 48, sm: '100%' },
    borderWidth: 1,
    borderColor: error
      ? 'error.300'
      : mode === 'dark'
      ? 'gray.500'
      : mode === 'light'
      ? 'white'
      : 'success.300',
    rounded: 'sm',
    top: 24,
    borderRadius: `${spacing[8]}px`,
    flexDirection: 'row',
    alignItems: centerContent ? 'center' : 'flex-start',
    justifyContent: centerContent ? 'center' : 'space-between'
  }),
  icon: (error, mode, centerContent) => ({
    size: `${spacing[20]}px`,
    color: error
      ? 'error.600'
      : mode === 'dark'
      ? 'white'
      : mode === 'light'
      ? 'gray.500'
      : 'success.600',
    mr: `${spacing[14]}px`,
    mt: `${spacing[4]}px`,
    width: centerContent ? 'auto' : '10%'
  }),
  message: (error, mode, centerContent) => ({
    color: error
      ? 'error.600'
      : mode === 'dark'
      ? 'white'
      : mode === 'light'
      ? 'gray.500'
      : 'success.600',
    fontSize: `${spacing[16]}px`,
    fontFamily: 'Satoshi-Medium',
    width: centerContent ? 'auto' : '90%'
  })
};
