import { useState } from 'react';
import Modal from './index';
import { AntDesign, Feather } from '@expo/vector-icons';
import spacing from 'app/config/theme/spacing';
import en from 'app/i18n/index';
import { Heading, HStack, Box, Icon, Stack, Divider, Hidden, Flex } from 'native-base';
import Button from '../Button';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Select from '../Form/Select';
import Input from '../Form/Input';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { STATUS_BAR_HEIGHT } from 'app/constants/index';
import { FormButtonContainer } from '..';
import Touchable from 'app/components/Gestures/Touchable';
import CancellationPolicyModal from './CancellationPolicyModal';
import ConfirmCancelExperienceModal from './ConfirmCancelExperienceModal';
import useDimensions from 'app/hooks/useDimensions';
import moment from 'moment';

const cancellationReasons = [
  {
    id: 0,
    label: `I am unable to go for this experience due to unforeseen circumstances`,
    value: `I am unable to go for this experience due to unforeseen circumstances`
  },
  {
    id: 1,
    label: `I am no longer interested in going for this experience`,
    value: `I am no longer interested in going for this experience`
  }
];

const initialValues = {
  reasonTitle: '',
  reasonBody: ''
};

function CancelExperienceModal({
  data,
  experienceType,
  additionalCancellationInfo,
  visible,
  onClose = () => {}
}) {
  const {
    window: { width: WIDTH },
    screen: { height: SCREEN_HEIGHT }
  } = useDimensions();

  const [isFocused, setIsFocused] = useState(false);
  const [showCancellationPolicy, setShowCancellationPolicy] = useState(false);
  const [confirmCancellation, setConfirmCancellation] = useState(false);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object().shape({
      reasonTitle: Yup.string('Select an option').required('Select an option'),
      reasonBody: Yup.string('Enter a description of the problem')
        .required('Enter a description of the problem')
        .min(20, 'Must have at least twenty characters')
    }),
    onSubmit: () => {
      setConfirmCancellation(true);
    }
  });

  const handleClose = () => {
    formik.resetForm(initialValues);
    onClose();
  };

  return (
    <Modal
      isDrawer
      animationType="fade"
      visible={visible}
      onClose={onClose}
      bg="transparent"
      statusBarBackgroundColor="transparent"
      justifyContent="flex-end"
      pt={0}
      maxWidth={{ base: '100%', sm: '400px' }}
    >
      <Box
        bg="white"
        borderTopRadius={{ base: 0, sm: `${spacing[20]}px` }}
        height={{ base: SCREEN_HEIGHT, sm: '100%' }}
        _web={{ height: { base: '100%', sm: '100%' } }}
        shadow={5}
      >
        {/* Header */}
        {/* larger device(tablet & desktop) for web only */}
        <Hidden only="base">
          <HStack
            justifyContent="space-between"
            px={`${spacing[24]}px`}
            pt={{ base: `${spacing[60]}px`, sm: `${spacing[38]}px` }}
            pb={`${spacing[24]}px`}
            width="100%"
            borderBottomWidth={1}
            borderBottomColor="gray.100"
          >
            <Heading fontSize={`${spacing[24]}px`}>
              {en.profile.trips.info.cancel.headerTitle}
            </Heading>

            <Button onPress={onClose} size="sm" variant="unstyled" p={0}>
              <Icon
                as={AntDesign}
                name="closecircleo"
                size={`${spacing[30]}px`}
                color={'gray.500'}
              />
            </Button>
          </HStack>
        </Hidden>
        {/* smaller device(mobile phones)for web & mobile app */}
        <Hidden from="sm">
          <Flex
            width="100%"
            bg={'primary.100'}
            pt={STATUS_BAR_HEIGHT + SCREEN_HEIGHT * 0.01}
            pb={SCREEN_HEIGHT * 0.014}
            px={spacing[20]}
            zIndex={1000}
            minHeight={`${SCREEN_HEIGHT * 0.1117}px`}
            justifyContent="center"
            _web={{
              position: 'fixed',
              top: 0,
              pt: 0,
              pb: 0
            }}
          >
            <HStack justifyContent="space-between" alignItems="center" width="100%">
              <Button onPress={onClose} p={0} size="sm" variant="unstyled">
                <Icon as={Feather} name="arrow-left" size={`${spacing[24]}px`} color={'gray.500'} />
              </Button>

              <Heading
                maxWidth={WIDTH * 0.6}
                fontSize={`${spacing[16]}px`}
                color={'gray.500'}
                noOfLines={1}
              >
                {en.profile.trips.info.cancel.headerTitle}
              </Heading>

              <Touchable onPress={onClose}>
                <Icon
                  as={AntDesign}
                  name="closecircleo"
                  size={`${spacing[24]}px`}
                  color={'gray.500'}
                />
              </Touchable>
            </HStack>
          </Flex>
        </Hidden>

        {/* Body */}
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps="always"
          showsVerticalScrollIndicator={false}
          keyboardDismissMode="interactive"
        >
          <Box
            px={`${spacing[24]}px`}
            pt={`${spacing[32]}px`}
            pb={`${spacing[60]}px`}
            _web={{
              pt: { base: `${spacing[100] * 1.24}px`, sm: `${spacing[32]}px` }
            }}
            w="100%"
          >
            <Heading fontSize={`${spacing[20]}px`} pb={`${spacing[32]}px`}>
              {en.profile.trips.info.cancel.title}
            </Heading>

            <Stack space="24px">
              <Select
                variant="outline"
                id="reasonTitle"
                hideSearch
                options={cancellationReasons}
                label={en.profile.trips.info.cancel.cancelType.label}
                placeholder={en.profile.trips.info.cancel.cancelType.placeholder}
                isFocused={isFocused}
                setIsFocused={setIsFocused}
                value={formik.values.reasonTitle}
                onBlur={formik.handleBlur('reasonTitle')}
                onChange={val => formik.setFieldValue('reasonTitle', val)}
                isInvalid={formik.touched.reasonTitle && Boolean(formik.errors.reasonTitle)}
                errorMsg={formik.errors.reasonTitle}
                inputAccessoryViewID="Next"
              />
              <Input
                multiline
                height="137px"
                textAlignVertical="top"
                id="reasonBody"
                pt={`${spacing[10]}px`}
                label={en.profile.trips.info.cancel.description.label}
                placeholder={en.profile.trips.info.cancel.description.placeholder}
                value={formik.values.reasonBody}
                onChangeText={formik.handleChange('reasonBody')}
                onBlur={formik.handleBlur('reasonBody')}
                isInvalid={formik.touched.reasonBody && Boolean(formik.errors.reasonBody)}
                errorMsg={formik.errors.reasonBody}
                inputAccessoryViewID="Next"
              />
            </Stack>
          </Box>
        </KeyboardAwareScrollView>
        {/* Buttons */}
        {/* larger device(tablet & desktop) for web only */}
        <Hidden only="base">
          <Button
            size="sm"
            colorScheme="secondary"
            variant="link"
            fontFamily="Satoshi-Medium"
            mb={`${spacing[38]}px`}
            onPress={() => setShowCancellationPolicy(true)}
          >
            {en.profile.trips.info.cancel.learnMore}
          </Button>
          <Divider bg="gray.100" thickness="1" />
          <HStack space="16px" p="16px" alignSelf="flex-end">
            <Button
              variant="outline"
              colorScheme="secondary"
              size="md"
              fontFamily="Satoshi-Medium"
              px="18px"
              onPress={handleClose}
            >
              {en.profile.trips.info.cancel.cancel}
            </Button>
            <Button
              variant="solid"
              colorScheme="secondary"
              size="md"
              fontFamily="Satoshi-Medium"
              px="18px"
              isDisabled={Object.keys(formik.errors).length !== 0}
              //   isLoading={reportExperienceState.isLoading}
              onPress={formik.handleSubmit}
            >
              {en.profile.trips.info.cancel.next}
            </Button>
          </HStack>
        </Hidden>
        {/* smaller device(mobile phones)for web & mobile app */}
        <Hidden from="sm">
          <Box px={`${spacing[24]}px`} pt={`${spacing[20]}px`} pb={`${spacing[20]}px`}>
            <FormButtonContainer>
              <Button
                size="sm"
                colorScheme="secondary"
                variant="link"
                fontFamily="Satoshi-Medium"
                mb={`${spacing[32]}px`}
                onPress={() => setShowCancellationPolicy(true)}
              >
                {en.profile.trips.info.cancel.learnMore}
              </Button>
              <Button
                variant="solid"
                colorScheme="secondary"
                size="xl"
                fontFamily="Satoshi-Medium"
                isDisabled={Object.keys(formik.errors).length !== 0}
                // isLoading={reportExperienceState.isLoading}
                onPress={formik.handleSubmit}
              >
                {en.profile.trips.info.cancel.next}
              </Button>
            </FormButtonContainer>
          </Box>
        </Hidden>
      </Box>

      {showCancellationPolicy && (
        <CancellationPolicyModal
          deadlineDatetime={moment(data?.schedule?.deadlineDatetime).format('LLLL')}
          experienceType={experienceType}
          additionalCancellationInfo={additionalCancellationInfo}
          visible
          onClose={() => setShowCancellationPolicy(false)}
        />
      )}

      {confirmCancellation && (
        <ConfirmCancelExperienceModal
          bookingId={data?.bookingId}
          payload={formik.values}
          visible
          onClose={() => setConfirmCancellation(false)}
        />
      )}
    </Modal>
  );
}

export default CancelExperienceModal;
