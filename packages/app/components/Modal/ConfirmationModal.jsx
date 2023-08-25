import { AlertCircle } from 'app/components/Icons/Alert';
import colors from 'app/config/theme/colors';
import spacing from 'app/config/theme/spacing';
import { Heading, Text, VStack } from 'native-base';
import { Button } from '..';
import Modal from './index';

function ConfirmationModal({
  visible = false,
  isSubmitting = false,
  heading = 'Are you sure you want to perform this action',
  message = 'This action cannot be undone.',
  onClose = () => {},
  onSubmit = () => {}
}) {
  return (
    <Modal
      closeOnOverlayClick
      bg="transparent"
      animationType="fade"
      visible={visible}
      onClose={onClose}
      maxWidth={{ base: '100%', sm: '424px' }}
      px={0}
      alignItems="center"
      justifyContent={{ base: 'flex-end', sm: 'center' }}
    >
      <VStack
        width="100%"
        overflow="scroll"
        bg="white"
        p={`${spacing[24]}px`}
        pb={{ base: `${spacing[60]}px`, sm: `${spacing[24]}px` }}
        borderTopRadius={`${spacing[20]}px`}
        borderBottomRadius={{ base: 0, sm: `${spacing[20]}px` }}
      >
        <AlertCircle
          fill={colors.warning[100]}
          stroke={colors.warning[50]}
          iconColor={colors.warning[600]}
        />
        {heading && (
          <Heading fontSize={`${spacing[24]}px`} mt={`${spacing[20]}px`}>
            {heading}
          </Heading>
        )}
        {message && (
          <Text
            color="gray.300"
            pt={`${spacing[12]}px`}
            pb={`${spacing[24]}px`}
            fontSize={`${spacing[18]}px`}
          >
            {message}
          </Text>
        )}
        <Button
          variant="solid"
          colorScheme="secondary"
          w="100%"
          isDisabled={isSubmitting}
          isLoading={isSubmitting}
          onPress={onSubmit}
        >
          Yes, Got It
        </Button>
        <Button variant="unstyled" colorScheme="secondary" w="100%" onPress={onClose}>
          Dismiss
        </Button>
      </VStack>
    </Modal>
  );
}

export default ConfirmationModal;
