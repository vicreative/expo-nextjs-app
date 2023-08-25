import spacing from 'app/config/theme/spacing';
import { Heading, Icon, Text, VStack } from 'native-base';
import { Button } from '..';
import Modal from './index';
import en from 'app/i18n/index';
import { Feather } from '@expo/vector-icons';
import useAppContext from 'app/hooks/useAppContext';
import env from 'app/config/env';
import ShareBottomSheet from 'app/components/BottomSheet/ShareBottomSheet';
import { Platform } from 'react-native';
import { useGenerateConversationSharesQuery } from 'app/hooks/queries/useConversations';

function InviteToGroupModal({ visible = false, onClose = () => {} }) {
  const { state } = useAppContext('chat');
  const { state: userState, dispatch } = useAppContext('user');

  const { data } = useGenerateConversationSharesQuery(state.conversation?.id, {
    enabled: state.conversation?.id ? true : false
  });

  const openShareBottomSheet = () => {
    dispatch({
      ...userState,
      modal: {
        modalToShow: 'shareBottomSheet',
        options: {
          canGoBack: userState.modal.options.canGoBack,
          media: userState.modal.options.media,
          share: {
            showGroups: false,
            uri: `${env.APP_URL}/chats?referenceId=${data?.reference}`,
            campaignName: 'Chat',
            text: en.chats.chatRoom.invite.share.text,
            title: en.chats.chatRoom.invite.share.title,
            pathname: `${env.APP_URL}/chats?referenceId=${data?.reference}`
          }
        }
      }
    });
    onClose();
  };
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
        <Heading fontSize={`${spacing[24]}px`} mt={`${spacing[20]}px`}>
          {en.chats.chatRoom.invite.heading}
        </Heading>

        <Text
          color="gray.300"
          pt={`${spacing[12]}px`}
          pb={`${spacing[24]}px`}
          fontSize={`${spacing[18]}px`}
        >
          {en.chats.chatRoom.invite.subheading}
        </Text>

        {Platform.OS === 'web' ? (
          <ShareBottomSheet
            btnWidth="100%"
            btnVariant="solid"
            iconName="share"
            btnHeight={`${spacing[55]}px`}
            btnTitle={en.chats.chatRoom.invite.share.btn}
            uri={userState.modal.options.share.uri}
            text={en.experiences.shareExperience.text}
            title={en.experiences.shareExperience.title}
          />
        ) : (
          <Button
            variant="solid"
            colorScheme="secondary"
            w="100%"
            leftIcon={<Icon as={Feather} name="share" />}
            onPress={openShareBottomSheet}
          >
            {en.chats.chatRoom.invite.share.btn}
          </Button>
        )}
        <Button variant="unstyled" colorScheme="secondary" w="100%" onPress={onClose}>
          {en.chats.chatRoom.invite.dismiss}
        </Button>
      </VStack>
    </Modal>
  );
}

export default InviteToGroupModal;
