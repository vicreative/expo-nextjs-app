import { useState } from 'react';
import Modal from './index';
import { AntDesign, Feather } from '@expo/vector-icons';
import spacing from 'app/config/theme/spacing';
import en from 'app/i18n/index';
import { Heading, HStack, Box, Icon, Text, Stack, Divider, Hidden, Flex } from 'native-base';
import Button from '../Button';
import ExperienceCard from 'app/components/Cards/ExperienceCard';
import { useReportExperienceMutation } from 'app/hooks/mutations/useExperience';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useExperienceReportTypesQuery } from 'app/hooks/queries/useExperiences';
import Select from '../Form/Select';
import Input from '../Form/Input';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { STATUS_BAR_HEIGHT } from 'app/constants/index';
import { FormButtonContainer, Toast } from '..';
import Touchable from 'app/components/Gestures/Touchable';
import useDimensions from 'app/hooks/useDimensions';

const reportTypeList = reportTypes =>
  reportTypes &&
  reportTypes.map(reportType => {
    return {
      id: reportType.uuid,
      label: reportType.name,
      value: reportType.uuid
    };
  });

const initialValues = {
  reportTypeId: '',
  message: ''
};

function ReportModal({ data, visible, onClose = () => {} }) {
  const [isFocused, setIsFocused] = useState(false);
  const {
    window: { width: WIDTH },
    screen: { height: SCREEN_HEIGHT }
  } = useDimensions();

  const { data: reportTypes, isLoading } = useExperienceReportTypesQuery();
  const { reportExperience, reportExperienceState } = useReportExperienceMutation(data?.uuid);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object().shape({
      reportTypeId: Yup.string('Select an option').required('Select an option'),
      message: Yup.string('Enter a description of the problem')
        .required('Enter a description of the problem')
        .min(20, 'Must have at least twenty characters')
    }),
    onSubmit: payload => {
      const onSuccess = () => {
        handleClose();
      };

      reportExperience(payload, onSuccess);
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
        _web={{ height: '100%' }}
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
            <Heading fontSize={`${spacing[24]}px`}>{en.profile.trips.info.report.heading}</Heading>

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
                {en.profile.trips.info.report.heading}
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

        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          keyboardDismissMode="interactive"
          extraScrollHeight={60}
        >
          <Box
            px={`${spacing[24]}px`}
            pb={`${spacing[60]}px`}
            _web={{ pt: { base: `${spacing[100]}px`, sm: 0 } }}
            w="100%"
          >
            <Text color="gray.300" pt={`${spacing[18]}px`} pb={`${spacing[24]}px`}>
              {en.profile.trips.info.report.subheading}
            </Text>
            <ExperienceCard
              sliderWidth="100%"
              sliderHeight="225px"
              location={data?.experience?.address}
              title={data?.experience?.title}
              data={data?.experience}
              showOnlyCoverImage
              showPriceTag={false}
              isDisabled
              bottomLeftTag={
                <Text fontSize={`${spacing[12]}px`} fontFamily="Satoshi-Bold">
                  {`By ${data?.experience?.business?.name}`}
                </Text>
              }
            />
            <Stack space="24px">
              <Select
                variant="outline"
                id="reportTypeId"
                hideSearch
                options={reportTypeList(reportTypes)}
                label={en.profile.trips.info.report.complaintType.label}
                placeholder={en.profile.trips.info.report.complaintType.placeholder}
                isFocused={isFocused}
                setIsFocused={setIsFocused}
                isLoading={isLoading}
                value={formik.values.reportTypeId}
                onBlur={formik.handleBlur('reportTypeId')}
                onChange={val => formik.setFieldValue('reportTypeId', val)}
                isInvalid={formik.touched.reportTypeId && Boolean(formik.errors.reportTypeId)}
                errorMsg={formik.errors.reportTypeId}
                inputAccessoryViewID="Next"
              />
              <Input
                multiline
                height="137px"
                textAlignVertical="top"
                id="message"
                pt={`${spacing[10]}px`}
                label={en.profile.trips.info.report.description.label}
                placeholder={en.profile.trips.info.report.description.placeholder}
                value={formik.values.message}
                onChangeText={formik.handleChange('message')}
                onBlur={formik.handleBlur('message')}
                isInvalid={formik.touched.message && Boolean(formik.errors.message)}
                errorMsg={formik.errors.message}
                inputAccessoryViewID="Next"
              />
            </Stack>
          </Box>
        </KeyboardAwareScrollView>
        {/* Buttons */}
        {/* larger device(tablet & desktop) for web only */}
        <Hidden only="base">
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
              {en.profile.trips.info.report.cancel}
            </Button>
            <Button
              variant="solid"
              colorScheme="secondary"
              size="md"
              fontFamily="Satoshi-Medium"
              px="18px"
              isDisabled={
                Object.keys(formik.errors).length !== 0 ||
                isLoading ||
                reportExperienceState.isLoading
              }
              isLoading={reportExperienceState.isLoading}
              onPress={formik.handleSubmit}
            >
              {en.profile.trips.info.report.submit}
            </Button>
          </HStack>
        </Hidden>
        {/* smaller device(mobile phones)for web & mobile app */}
        <Hidden from="sm">
          <Box px={`${spacing[24]}px`} pt={`${spacing[20]}px`} pb={`${spacing[20]}px`}>
            <FormButtonContainer>
              <Button
                variant="solid"
                colorScheme="secondary"
                size="xl"
                fontFamily="Satoshi-Medium"
                isDisabled={
                  Object.keys(formik.errors).length !== 0 ||
                  isLoading ||
                  reportExperienceState.isLoading
                }
                isLoading={reportExperienceState.isLoading}
                onPress={formik.handleSubmit}
              >
                {en.profile.trips.info.report.submit}
              </Button>
            </FormButtonContainer>
            <Button
              variant="unstyled"
              colorScheme="secondary"
              size="xl"
              fontFamily="Satoshi-Medium"
              onPress={onClose}
            >
              {en.profile.trips.info.report.cancel}
            </Button>
          </Box>
        </Hidden>
        {reportExperienceState.isError && (
          <Toast
            useRNModal
            error={reportExperienceState.isError}
            message={reportExperienceState.error?.message}
          />
        )}
      </Box>
    </Modal>
  );
}

export default ReportModal;
