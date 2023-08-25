import React from 'react';
import { Button } from 'app/components';
import { StyleSheet } from 'react-native';
import { Text, VStack, Heading, Icon } from 'native-base';
import { Feather, AntDesign } from '@expo/vector-icons';
import spacing from 'app/config/theme/spacing';
import en from 'app/i18n/index';
import Modal from './index';

const VerifyProfileModal = ({
  visible,
  animationType = 'fade',
  onClose = () => {},
  onVerify = () => {}
}) => {
  return (
    <Modal
      animationType={animationType}
      visible={visible}
      onClose={onClose}
      closeOnOverlayClick
      bg="transparent"
      statusBarBackgroundColor="transparent"
      alignItems="center"
      justifyContent="flex-end"
      px={`${spacing[20]}px`}
      pb={`${spacing[30]}px`}
    >
      <VStack style={styles.container}>
        <Button onPress={onClose} size="sm" variant="unstyled" {...styles.closeIcon}>
          <Icon as={AntDesign} name="closecircleo" size={`${spacing[24]}px`} color={'gray.500'} />
        </Button>
        <VStack space={`${spacing[16]}px`} mt={`${spacing[38]}px`} mb={`${spacing[14]}px`}>
          <Icon as={Feather} name="info" size={`${spacing[26]}px`} color="gray.500" />
          <Heading fontSize={`${spacing[20]}px`}>{en.explore.verifyProfile.title}</Heading>
        </VStack>
        <Text mb={`${spacing[24]}px`} color="gray.300">
          {en.explore.verifyProfile.text}
        </Text>
        <Button
          size="xl"
          colorScheme="secondary"
          onPress={() => {
            onClose();
            onVerify();
          }}
        >
          {en.explore.verifyProfile.btn}
        </Button>
      </VStack>
    </Modal>
  );
};

export default VerifyProfileModal;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingHorizontal: spacing[24],
    paddingTop: spacing[10],
    paddingBottom: spacing[30],
    borderRadius: spacing[20],
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  closeIcon: {
    width: `${spacing[28]}px`,
    height: `${spacing[28]}px`,
    p: 0,
    position: 'absolute',
    right: `${-spacing[14]}px`
  }
});
