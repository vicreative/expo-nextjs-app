import spacing from 'app/config/theme/spacing';
import { Heading, VStack } from 'native-base';
import { Button, Toast } from '..';
import Modal from './index';
import en from 'app/i18n/index';
import useScreenParams from 'app/hooks/useScreenParams';
import { useRespondToConversationInviteMutation } from 'app/hooks/mutations/useConversations';
import { useState } from 'react';

function RespondToInviteModal({ visible = false, onClose = () => {} }) {
  const [isAccepted, setIsAccepted] = useState(false);
  const { referenceId, setParams } = useScreenParams();

  const { respondToInvite, respondToInviteState } =
    useRespondToConversationInviteMutation(referenceId);

  const handleClose = () => {
    respondToInviteState.reset();
    onClose();
  };

  const handleResponseToInivite = response => {
    const payload = { accepted: response };

    const onSuccess = () => {
      setParams({ referenceId: null });
      handleClose();
    };

    const onError = () => {
      handleClose();
    };

    respondToInvite(payload, onSuccess, onError);
  };

  return (
    <Modal
      closeOnOverlayClick
      bg="transparent"
      animationType="fade"
      visible={visible}
      onClose={handleClose}
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
        <Heading fontSize={`${spacing[20]}px`} mt={`${spacing[20]}px`} pb={`${spacing[40]}px`}>
          {en.chats.invite.heading}
        </Heading>

        <Button
          variant="solid"
          colorScheme="secondary"
          w="100%"
          onPress={() => {
            setIsAccepted(true);
            handleResponseToInivite(true);
          }}
          spinnerPlacement="end"
          isLoadingText={en.chats.invite.accept}
          isLoading={isAccepted && respondToInviteState.isLoading}
          isDisabled={respondToInviteState.isLoading}
        >
          {en.chats.invite.accept}
        </Button>

        <Button
          variant="unstyled"
          colorScheme="secondary"
          w="100%"
          onPress={() => {
            setIsAccepted(false);
            handleResponseToInivite(false);
          }}
          spinnerPlacement="end"
          isLoadingText={en.chats.invite.decline}
          isLoading={!isAccepted && respondToInviteState.isLoading}
          isDisabled={respondToInviteState.isLoading}
        >
          {en.chats.invite.decline}
        </Button>
      </VStack>

      {respondToInviteState.isError && (
        <Toast
          useRNModal
          error={respondToInviteState.isError}
          message={respondToInviteState.error?.message}
        />
      )}
    </Modal>
  );
}

export default RespondToInviteModal;
