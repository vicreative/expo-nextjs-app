import { AntDesign } from '@expo/vector-icons';
import spacing from 'app/config/theme/spacing';
import en from 'app/i18n/index';
import { Avatar, Box, Divider, HStack, Heading, Icon, Text } from 'native-base';
import Modal from './index';
import Button from '../Button';
import useAppContext from 'app/hooks/useAppContext';
import { resolveFileUrl } from 'app/utils/index';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { FormButtonContainer, Input, Toast } from '..';
import { useSendCreatorMessageMutation } from 'app/hooks/mutations/useConversations';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'solito/router';

function ContactGuideModal({ visible, onClose = () => {} }) {
  const queryClient = useQueryClient();
  const { push } = useRouter();
  const { state } = useAppContext('experienceDetails');
  const { sendMessage, sendMessageState } = useSendCreatorMessageMutation();

  const handleClose = () => {
    formik.resetForm();
    onClose();
  };

  const formik = useFormik({
    initialValues: { message: '' },
    validationSchema: Yup.object().shape({
      message: Yup.string()
        .required('Enter the message you want to send')
        .min(20, 'Must have at least twenty characters')
    }),
    onSubmit: payload => {
      const data = {
        body: payload.message,
        recipientId: state.experience?.business?.userId
      };
      const onSuccess = data => {
        queryClient.invalidateQueries(['conversations']);
        push(`/chats/${data.data.conversation.reference}`);
        handleClose();
      };

      sendMessage(data, onSuccess);
    }
  });
  return (
    <Modal
      isDrawer
      closeOnOverlayClick
      animationType="fade"
      visible={visible}
      onClose={handleClose}
      maxWidth={{ base: '100%', sm: '400px' }}
    >
      <Box
        bg="white"
        borderTopRadius={{ base: 0, sm: `${spacing[20]}px` }}
        height="100%"
        shadow={{ base: 'none', sm: 5 }}
      >
        <Box pt={`${spacing[20]}px`} px={`${spacing[20]}px`}>
          <Button alignSelf="flex-end" onPress={handleClose} size="sm" variant="unstyled" p={0}>
            <Icon as={AntDesign} name="close" size={`${spacing[30]}px`} color={'gray.500'} />
          </Button>
          <HStack my={`${spacing[24]}px`} width="100%">
            <Box w="22%">
              <Avatar
                bg="primary.100"
                width={`${spacing[64]}px`}
                height={`${spacing[64]}px`}
                borderRadius={'full'}
                alt="Operator Profile Image"
                source={{
                  uri:
                    state.experience?.business?.logoImagePath &&
                    resolveFileUrl(state.experience?.business?.logoImagePath)
                }}
              >
                {state.experience?.business?.name.charAt(0)}
              </Avatar>
            </Box>
            <Box w="78%">
              <Heading fontSize={`${spacing[24]}px`}>
                {en.experiences.details.contactGuide.heading(state.experience?.business?.name)}
              </Heading>
              <Text color="gray.300">{en.experiences.details.contactGuide.subheading}</Text>
            </Box>
          </HStack>
          <Divider bg="gray.100" thickness="1" />
        </Box>
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps="always"
          showsVerticalScrollIndicator={false}
          keyboardDismissMode="interactive"
          style={{ padding: spacing[24] }}
        >
          <Text pb={`${spacing[4]}px`}>{en.experiences.details.contactGuide.label}</Text>
          <Input
            multiline
            height="137px"
            textAlignVertical="top"
            id="message"
            pt={`${spacing[10]}px`}
            placeholder={en.experiences.details.contactGuide.placeholder}
            value={formik.values.message}
            onChangeText={formik.handleChange('message')}
            onBlur={formik.handleBlur('message')}
            isInvalid={formik.touched.message && Boolean(formik.errors.message)}
            errorMsg={formik.errors.message}
            inputAccessoryViewID="Next"
          />
        </KeyboardAwareScrollView>
        <Box
          bg="gray.25"
          borderTopWidth={1}
          borderTopColor="gray.100"
          px={`${spacing[24]}px`}
          pt={`${spacing[20]}px`}
          pb={{ base: `${spacing[40]}px`, sm: `${spacing[20]}px` }}
        >
          <FormButtonContainer>
            <Button
              variant="solid"
              colorScheme="secondary"
              size="xl"
              fontFamily="Satoshi-Medium"
              isDisabled={Object.keys(formik.errors).lengt || sendMessageState.isLoading}
              isLoading={sendMessageState.isLoading}
              onPress={formik.handleSubmit}
            >
              {en.experiences.details.contactGuide.send}
            </Button>
          </FormButtonContainer>
        </Box>
        {sendMessageState.isError && (
          <Toast
            useRNModal
            error={sendMessageState.isError}
            message={sendMessageState.error?.message}
          />
        )}
      </Box>
    </Modal>
  );
}

export default ContactGuideModal;
