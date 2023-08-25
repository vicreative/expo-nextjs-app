import Modal from './index';
import { AntDesign, Feather } from '@expo/vector-icons';
import spacing from 'app/config/theme/spacing';
import en from 'app/i18n/index';
import { Heading, HStack, Box, Icon, Text, Divider, Stack, Hidden, Flex } from 'native-base';
import Button from '../Button';
import { useFormik } from 'formik';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import {
  useAddBeneficiaryMutation,
  useResolveBankDetailsMutations
} from 'app/hooks/mutations/useBankDetails';
import useBanksQuery from 'app/hooks/queries/useBanks';
import { FormButtonContainer, Input, Select, Toast } from '..';
import { VerifyProfileSchema } from 'app/features/Home/components/Profile/components/schema';
import { STATUS_BAR_HEIGHT } from 'app/constants/index';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Touchable from 'app/components/Gestures/Touchable';
import useDimensions from 'app/hooks/useDimensions';

const bankList = banks =>
  banks?.map(bank => ({
    id: bank.id,
    label: bank.name,
    value: bank.code
  }));

const initialValues = {
  accountName: '',
  accountNumber: '',
  bankCode: ''
};

function WithdrawalBankModal({ visible, onClose = () => {} }) {
  const queryClient = useQueryClient();
  const {
    window: { width: WIDTH },
    screen: { height: SCREEN_HEIGHT }
  } = useDimensions();

  const [isFocused, setIsFocused] = useState(false);

  const { data: banks, isLoading: isLoadingBanks } = useBanksQuery();
  const { resolveBankDetails, resolveBankDetailsState } = useResolveBankDetailsMutation();
  const { addBeneficiary, addBeneficiaryState } = useAddBeneficiaryMutation();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: VerifyProfileSchema(false),
    onSubmit: payload => handleSubmit(payload)
  });

  useEffect(() => {
    if (formik.values.bankCode !== '' && formik.values.accountNumber.length === 10) {
      const payload = {
        accountNumber: formik.values.accountNumber,
        bankCode: formik.values.bankCode
      };
      const onSuccess = data => {
        formik.setFieldValue('accountName', data.data.accountName, true);
      };
      resolveBankDetails(payload, onSuccess);
    } else {
      formik.setFieldValue('accountName', '', true);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.bankCode, formik.values.accountNumber.length]);

  const handleSubmit = payload => {
    const data = {
      accountNumber: payload.accountNumber,
      bankCode: payload.bankCode
    };
    const onSuccess = () => {
      queryClient.invalidateQueries(['beneficiaries']);
      onClose();
    };
    addBeneficiary(data, onSuccess);
  };

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
              {en.profile.withdrawalBank.info.withdraw.title}
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
                {en.profile.withdrawalBank.info.withdraw.title}
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
          keyboardShouldPersistTaps="always"
          showsVerticalScrollIndicator={false}
          keyboardDismissMode="interactive"
        >
          <Box
            px={`${spacing[24]}px`}
            pb={`${spacing[60]}px`}
            _web={{ pt: { base: `${spacing[100]}px`, sm: 0 } }}
            w="100%"
          >
            <Text color="gray.300" pt={`${spacing[18]}px`} pb={`${spacing[24]}px`}>
              {en.profile.withdrawalBank.info.withdraw.subheading}
            </Text>
            <Stack space={`${spacing[24]}px`} pb={`${spacing[24]}px`}>
              <Select
                id="bankCode"
                label={en.profile.account.verification.bankName.label}
                placeholder={en.profile.account.verification.bankName.placeholder}
                variant="outline"
                options={bankList(banks)}
                isFocused={isFocused}
                setIsFocused={setIsFocused}
                value={formik.values.bankCode}
                onBlur={formik.handleBlur('bankCode')}
                onChange={val => formik.setFieldValue('bankCode', val)}
                isInvalid={formik.touched.bankCode && Boolean(formik.errors.bankCode)}
                errorMsg={formik.errors.bankCode}
                isLoading={isLoadingBanks}
                inputAccessoryViewID="Next"
              />
              <Input
                id="accountNumber"
                type="number"
                keyboardType={'number-pad'}
                label={en.profile.account.verification.accountNumber.label}
                placeholder={en.profile.account.verification.accountNumber.placeholder}
                value={formik.values.accountNumber}
                onBlur={formik.handleBlur('accountNumber')}
                onChangeText={formik.handleChange('accountNumber')}
                isInvalid={formik.touched.accountNumber && Boolean(formik.errors.accountNumber)}
                errorMsg={formik.errors.accountNumber}
                inputAccessoryViewID="Next"
              />
              <Input
                variant="filled"
                id="accountName"
                label={en.profile.account.verification.accountName.label}
                placeholder={en.profile.account.verification.accountName.placeholder}
                value={formik.values.accountName}
                onBlur={formik.handleBlur('accountName')}
                onChangeText={formik.handleChange('accountName')}
                isInvalid={formik.touched.accountName && Boolean(formik.errors.accountName)}
                errorMsg={formik.errors.accountName}
                isLoading={resolveBankDetailsState.isLoading}
                inputAccessoryViewID="Next"
                isDisabled
              />
            </Stack>
            {/* larger device(tablet & desktop) for web only */}
            <Hidden only="base">
              <Box p={`${spacing[24]}px`}>
                <Text textAlign="center">{en.profile.account.verification.note}</Text>
              </Box>
            </Hidden>
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
                resolveBankDetailsState.isLoading ||
                isLoadingBanks ||
                addBeneficiaryState.isLoading
              }
              isLoading={addBeneficiaryState.isLoading}
              onPress={formik.handleSubmit}
            >
              {en.profile.trips.info.report.submit}
            </Button>
          </HStack>
        </Hidden>
        {/* smaller device(mobile phones)for web & mobile app */}
        <Hidden from="sm">
          <Box px={`${spacing[24]}px`} pb={`${spacing[50]}px`}>
            <FormButtonContainer>
              <Text pb={`${spacing[24]}px`} textAlign="center">
                {en.profile.account.verification.note}
              </Text>

              <Button
                variant="solid"
                colorScheme="secondary"
                size="xl"
                fontFamily="Satoshi-Medium"
                isDisabled={
                  Object.keys(formik.errors).length !== 0 ||
                  resolveBankDetailsState.isLoading ||
                  isLoadingBanks ||
                  addBeneficiaryState.isLoading
                }
                isLoading={addBeneficiaryState.isLoading}
                onPress={formik.handleSubmit}
              >
                {en.profile.trips.info.report.submit}
              </Button>
            </FormButtonContainer>
          </Box>
        </Hidden>
        {addBeneficiaryState.isError && (
          <Toast
            useRNModal
            error={addBeneficiaryState.isError}
            message={addBeneficiaryState.error?.message}
          />
        )}
      </Box>
    </Modal>
  );
}

export default WithdrawalBankModal;
