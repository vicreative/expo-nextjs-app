import Modal from './index';
import spacing from 'app/config/theme/spacing';
import en from 'app/i18n/index';
import { Heading, HStack, Box, Text, Stack, Avatar } from 'native-base';
import Button from '../Button';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Input from '../Form/Input';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { FormButtonContainer, Stars } from '..';
import useDimensions from 'app/hooks/useDimensions';
import { resolveAssetsUrl } from 'app/utils/index';
// import SuccessState from 'app/components/SuccessState';

const initialValues = {
  experience: '',
  itinerary: '',
  operator: '',
  message: ''
};

const ReviewSchema = Yup.object().shape({
  experience: Yup.number().required('Select experience ratings'),
  itinerary: Yup.number().required('Select Itinerary/Activities ratings'),
  operator: Yup.number().required('Select operator ratings'),
  message: Yup.string().min(20, 'Must have at least twenty characters')
});

function ReviewModal({ visible, onClose = () => {} }) {
  const {
    screen: { height: SCREEN_HEIGHT }
  } = useDimensions();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: ReviewSchema,
    onSubmit: payload => {
      console.log(payload);
    }
  });

  const handleClose = () => {
    formik.resetForm(initialValues);
    onClose();
  };

  return (
    <Modal
      isDrawer
      closeOnOverlayClick
      animationType="fade"
      visible={visible}
      onClose={handleClose}
      bg="transparent"
      statusBarBackgroundColor="transparent"
      justifyContent="flex-end"
      pt={0}
      maxWidth={{ base: '100%', sm: '400px' }}
    >
      <Box
        bg="white"
        borderTopRadius={`${spacing[20]}px`}
        height={{ base: SCREEN_HEIGHT * 0.93, sm: '100%' }}
        _web={{ height: { base: '80vh', sm: '100%' } }}
        shadow={5}
      >
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          keyboardDismissMode="interactive"
          // extraScrollHeight={60}
        >
          <Stack
            space={`${spacing[24]}px`}
            px={`${spacing[24]}px`}
            pt={`${spacing[40]}px`}
            pb={`${spacing[60]}px`}
            w="100%"
          >
            <Heading fontSize={`${spacing[20]}px`}>{en.notifications.review.heading}</Heading>
            <Stack
              space={`${spacing[6]}px`}
              alignItems="flex-start"
              borderWidth={1}
              borderColor="gray.100"
              px={`${spacing[20]}px`}
              py={`${spacing[16]}px`}
              borderRadius={`${spacing[8]}px`}
            >
              <Heading fontSize={`${spacing[16]}px`}>Cycling tour in Amsterdam</Heading>
              <HStack space={`${spacing[8]}px`} alignItems="center">
                <Avatar
                  bg={'primary.100'}
                  width={`${spacing[42]}px`}
                  height={`${spacing[42]}px`}
                  source={{
                    uri: resolveAssetsUrl('avi-avatar.png')
                  }}
                >
                  😉
                </Avatar>
                <Text fontFamily="Satoshi-Medium" color="gray.400" fontSize={`${spacing[14]}px`}>
                  Ibiza-Remi John
                </Text>
              </HStack>
            </Stack>
            <Stack
              space={`${spacing[20]}px`}
              alignItems="flex-start"
              borderWidth={1}
              borderColor="gray.100"
              p={`${spacing[20]}px`}
              borderRadius={`${spacing[8]}px`}
            >
              <Text fontFamily="Satoshi-Medium">{en.notifications.review.subheading}</Text>
              <Stack space={`${spacing[16]}px`}>
                {/* experience */}
                <Stack space={`${spacing[6]}px`} alignItems="flex-start">
                  <Text fontFamily="Satoshi-Medium" fontSize={`${spacing[14]}px`}>
                    {en.notifications.review.experience}
                  </Text>
                  <Stars
                    default={0}
                    count={5}
                    half={true}
                    spacing={spacing[5]}
                    update={val => formik.setFieldValue('experience', val)}
                  />
                  {Boolean(formik.errors.experience) && (
                    <Text
                      fontFamily="Satoshi-Medium"
                      fontSize={`${spacing[14]}px`}
                      color="error.500"
                    >
                      {formik.errors.experience}
                    </Text>
                  )}
                </Stack>
                {/* itinerary */}
                <Stack space={`${spacing[6]}px`} alignItems="flex-start">
                  <Text fontFamily="Satoshi-Medium" fontSize={`${spacing[14]}px`}>
                    {en.notifications.review.itinerary}
                  </Text>
                  <Stars
                    default={0}
                    count={5}
                    half={true}
                    spacing={spacing[5]}
                    update={val => formik.setFieldValue('itinerary', val)}
                  />
                  {Boolean(formik.errors.itinerary) && (
                    <Text
                      fontFamily="Satoshi-Medium"
                      fontSize={`${spacing[14]}px`}
                      color="error.500"
                    >
                      {formik.errors.itinerary}
                    </Text>
                  )}
                </Stack>
                {/* operator */}
                <Stack space={`${spacing[6]}px`} alignItems="flex-start">
                  <Text fontFamily="Satoshi-Medium" fontSize={`${spacing[14]}px`}>
                    {en.notifications.review.operator}
                  </Text>
                  <Stars
                    default={0}
                    count={5}
                    half={true}
                    spacing={spacing[5]}
                    update={val => formik.setFieldValue('operator', val)}
                  />
                  {Boolean(formik.errors.operator) && (
                    <Text
                      fontFamily="Satoshi-Medium"
                      fontSize={`${spacing[14]}px`}
                      color="error.500"
                    >
                      {formik.errors.operator}
                    </Text>
                  )}
                </Stack>
              </Stack>
            </Stack>
            <Box>
              <Text fontFamily="Satoshi-Medium" fontSize={`${spacing[14]}px`} mb="6px">
                {en.notifications.review.label}
              </Text>
              <Input
                multiline
                height="137px"
                textAlignVertical="top"
                id="message"
                pt={`${spacing[10]}px`}
                placeholder={en.notifications.review.placeholder}
                value={formik.values.message}
                onChangeText={formik.handleChange('message')}
                onBlur={formik.handleBlur('message')}
                isInvalid={formik.touched.message && Boolean(formik.errors.message)}
                errorMsg={formik.errors.message}
                inputAccessoryViewID="Next"
              />
            </Box>
            <FormButtonContainer>
              <Button
                variant="solid"
                colorScheme="secondary"
                size="xl"
                fontFamily="Satoshi-Medium"
                isDisabled={Object.keys(formik.errors).length !== 0}
                onPress={formik.handleSubmit}
              >
                {en.notifications.review.submit}
              </Button>
            </FormButtonContainer>
          </Stack>
        </KeyboardAwareScrollView>

        {/* <SuccessState
          title={en.notifications.review.success.title}
          text={en.notifications.review.success.text}
          btnText={en.notifications.review.success.btnText}
          onDismiss={handleClose}
          size={'sm'}
        /> */}
      </Box>
    </Modal>
  );
}

export default ReviewModal;
