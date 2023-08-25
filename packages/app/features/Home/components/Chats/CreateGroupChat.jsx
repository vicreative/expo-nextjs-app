import { Button, Container, Input } from 'app/components/index';
import spacing from 'app/config/theme/spacing';
import en from 'app/i18n/index';
import { Box, Heading, Icon, ScrollView, Text } from 'native-base';
import UploadModal from 'app/components/Modal/UploadModal';
import { useQueryClient } from '@tanstack/react-query';
import { useFormik } from 'formik';
import { CreateGroupSchema } from './components/schema';
import { useCreateConversationMutation } from 'app/hooks/mutations/useConversations';
import { autoCapitalizeFirstLetter } from 'app/utils/index';
import { useRouter } from 'solito/router';
import OptionGroup from 'app/components/OptionGroup';
import { Feather } from '@expo/vector-icons';
import { useState } from 'react';
import uploadToAws from 'app/utils/uploadToAws';
import useDimensions from 'app/hooks/useDimensions';

function CreateGroupChat() {
  const { replace } = useRouter();
  const queryClient = useQueryClient();
  const {
    screen: { height: SCREEN_HEIGHT }
  } = useDimensions();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { createConversation, createConversationState } = useCreateConversationMutation();

  const initialValues = {
    name: '',
    isPrivate: false,
    image: null
  };

  const createGroup = (payload, fileName) => {
    const data = {
      imageFileName: fileName,
      name: autoCapitalizeFirstLetter(payload.name)
      //   isPrivate: payload.isPrivate  TODO: USE THIS WHEN BACKEDD ADDS SUPPORT FOR IT
    };

    const onSuccess = data => {
      queryClient.invalidateQueries(['conversations', '']);
      setIsSubmitting(false);
      replace(`/chats/${data.data.reference}`, undefined, {
        experimental: {
          nativeBehavior: 'stack-replace',
          isNestedNavigator: true
        }
      });
    };

    const onError = () => {
      setIsSubmitting(false);
    };

    createConversation(data, onSuccess, onError);
  };

  const handleSubmit = payload => {
    setIsSubmitting(true);
    if (payload.image) {
      uploadToAws(payload.image, data => createGroup(payload, data.fileName));
    } else {
      createGroup(payload, null);
    }
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: CreateGroupSchema,
    onSubmit: handleSubmit
  });

  const handleUpload = image => {
    formik.setFieldValue('image', image, true);
  };

  const options = [
    {
      id: 'public',
      title: en.chats.createGroup.groupAccess.public.title,
      icon: <Icon as={Feather} name="check" color="primary.600" size={`${spacing[18]}px`} />,
      extraComponent: (
        <Text color="gray.300" fontSize={`${spacing[14]}px`}>
          {en.chats.createGroup.groupAccess.public.text}
        </Text>
      )
    },
    {
      id: 'private',
      title: en.chats.createGroup.groupAccess.private.title,
      icon: <Icon as={Feather} name="lock" color="primary.600" size={`${spacing[18]}px`} />,
      extraComponent: (
        <Text color="gray.300" fontSize={`${spacing[14]}px`}>
          {en.chats.createGroup.groupAccess.private.text}
        </Text>
      )
    }
  ];

  return (
    <Container headerTitle={en.chats.createGroup.headerTitle} alignItems="center" px={0} pt={0}>
      <Box w="100%" h="100%">
        <ScrollView
          w="100%"
          contentContainerStyle={{ alignItems: 'center' }}
          px={`${spacing[24]}px`}
          pt={`${spacing[24]}px`}
          pb={`${spacing[60]}px`}
        >
          <Text
            color="gray.300"
            fontSize={`${spacing[24]}px`}
            pb={`${spacing[48]}px`}
            textAlign="center"
          >
            {en.chats.createGroup.heading}
          </Text>
          <UploadModal file={formik.values.image} onUpload={handleUpload} />
          <Box w="100%" mt={`${spacing[24]}px`} mb={`${SCREEN_HEIGHT * 0.084}px`}>
            <Input
              id="name"
              value={formik.values.name}
              onBlur={formik.handleBlur('name')}
              onChangeText={formik.handleChange('name')}
              placeholder={en.chats.createGroup.name.placeholder}
            />
          </Box>
          <Heading fontSize={`${spacing[20]}px`} pb={`${spacing[24]}px`} textAlign="center">
            {en.chats.createGroup.groupAccess.heading}
          </Heading>
          <Box w="100%">
            <OptionGroup
              selected={formik.values.isPrivate === false ? 'public' : 'private'}
              onChange={id => formik.setFieldValue('isPrivate', id === 'public' ? false : true)}
              options={options}
              hasRightIcon={false}
              bg="white"
              borderColor="gray.100"
              space={`${spacing[12]}px`}
              px={`${spacing[16]}px`}
              py={`${spacing[16]}px`}
              fontSize={`${spacing[14]}px`}
            />
          </Box>
        </ScrollView>
        <Box
          w="100%"
          borderTopWidth={1}
          borderTopColor="gray.100"
          pt={`${spacing[24]}px`}
          px={`${spacing[24]}px`}
          pb={`${spacing[60]}px`}
          bg="gray.25"
        >
          <Button
            colorScheme="secondary"
            type="submit"
            onPress={formik.submitForm}
            isLoading={createConversationState.isLoading || isSubmitting}
            isDisabled={
              Object.keys(formik.errors).length !== 0 ||
              isSubmitting ||
              createConversationState.isLoading
            }
          >
            {en.chats.createGroup.create}
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default CreateGroupChat;
