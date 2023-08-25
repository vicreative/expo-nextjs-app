import { useEffect, useRef, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import {
  Button,
  Container,
  Input,
  Select,
  FormButtonContainer,
  Footer,
  BackButton
} from 'app/components/index';
import spacing from 'app/config/theme/spacing';
import { useFormik } from 'formik';
import { useResolveBankDetailsMutation } from 'app/hooks/mutations/useBankDetails';
import { useVerifyProfile } from 'app/hooks/mutations/useUserProfile';
import useBanksQuery from 'app/hooks/queries/useBanks';
import en from 'app/i18n/index';
import { Box, Center, Flex, Heading, Hidden, Stack, Text, VStack } from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { VerifyProfileSchema } from './components/schema';
import { NavHeader } from 'app/navigation/Header';
import SuccessState from 'app/components/SuccessState';
import { useRouter } from 'solito/router';
import useDimensions from 'app/hooks/useDimensions';

const bankList = banks =>
  banks?.map(bank => ({
    id: bank.id,
    label: bank.name,
    value: bank.code
  }));

const initialState = {
  bvn: '',
  accountName: '',
  accountNumber: '',
  bankCode: ''
};
export default function VerifyProfile() {
  const queryClient = useQueryClient();
  const scrollRef = useRef();
  const [isFocused, setIsFocused] = useState(false);

  const {
    screen: { height: SCREEN_HEIGHT }
  } = useDimensions();

  const { push } = useRouter();
  const { data: banks, isLoading: isLoadingBanks } = useBanksQuery();
  const { resolveBankDetails, resolveBankDetailsState } = useResolveBankDetailsMutation();
  const { verifyProfile, verifyProfileState } = useVerifyProfile();

  const formik = useFormik({
    initialValues: initialState,
    validationSchema: VerifyProfileSchema(true),
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
      bankCode: payload.bankCode,
      bvn: payload.bvn
    };
    const onSuccess = () => {
      queryClient.invalidateQueries(['beneficiaries']);
      queryClient.invalidateQueries(['profile']);
    };
    verifyProfile(data, onSuccess);
  };

  return (
    <>
      {/* larger device(tablet & desktop) for web only */}
      <Hidden only="base">
        <Box mt="88px">
          <Hero />
          <Container pt={0} px={0}>
            <Center>
              <Box
                pt={`${spacing[100] * 0.98}px`}
                pb={`${spacing[100] * 1.2}px`}
                px={{ sm: `${spacing[40]}px`, md: `${spacing[40]}px` }}
                maxW="800px"
              >
                <Heading fontSize={`${spacing[26]}px`} pb={`${spacing[14]}px`}>
                  {en.profile.account.verification.heading}
                </Heading>
                <Text fontSize={`${spacing[18]}px`} pb={`${spacing[36]}px`} color="gray.300">
                  {en.profile.account.verification.subheading}
                </Text>
                <Stack space={`${spacing[24]}px`} pb={`${spacing[100] * 0.96}px`}>
                  <Input
                    id="bvn"
                    type="number"
                    keyboardType={'number-pad'}
                    label={en.profile.account.verification.bvn.label}
                    placeholder={en.profile.account.verification.bvn.placeholder}
                    value={formik.values.bvn}
                    onBlur={formik.handleBlur('bvn')}
                    onChangeText={formik.handleChange('bvn')}
                    isInvalid={formik.touched.bvn && Boolean(formik.errors.bvn)}
                    errorMsg={formik.errors.bvn}
                    inputAccessoryViewID="Next"
                  />
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
                <FormButtonContainer>
                  <VStack space={`${spacing[36]}px`} alignItems="center">
                    <Box p={`${spacing[24]}px`} bg="gray.25">
                      <Text textAlign="center">{en.profile.account.verification.note}</Text>
                    </Box>
                    <Button
                      variant="solid"
                      colorScheme="secondary"
                      size="lg"
                      width={`${spacing[100]}px`}
                      isLoading={verifyProfileState.isLoading}
                      isDisabled={
                        verifyProfileState.isLoading || Object.keys(formik.errors).length !== 0
                      }
                      onPress={formik.handleSubmit}
                    >
                      {en.profile.account.verification.btnText}
                    </Button>
                  </VStack>
                </FormButtonContainer>
              </Box>
            </Center>
          </Container>
        </Box>
        <NavHeader />
        <Footer />
      </Hidden>
      {/* smaller device(mobile phones)for web & mobile app */}
      <Hidden from="sm">
        <Container headerTitle="Verify Your Profile" pt={0} height="100%">
          <KeyboardAwareScrollView
            ref={scrollRef}
            keyboardShouldPersistTaps="always"
            showsVerticalScrollIndicator={false}
            keyboardDismissMode="interactive"
          >
            <Flex height={SCREEN_HEIGHT * 0.86} justifyContent="space-between">
              <Box pt={`${spacing[24]}px`}>
                <Heading fontSize={`${spacing[26]}px`} pb={`${spacing[14]}px`}>
                  {en.profile.account.verification.heading}
                </Heading>
                <Text fontSize={`${spacing[18]}px`} pb={`${spacing[36]}px`} color="gray.300">
                  {en.profile.account.verification.subheading}
                </Text>
                <Stack space={`${spacing[24]}px`} pb={`${spacing[24]}px`}>
                  <Input
                    id="bvn"
                    type="number"
                    keyboardType={'number-pad'}
                    placeholder={en.profile.account.verification.bvn.placeholder}
                    value={formik.values.bvn}
                    onBlur={formik.handleBlur('bvn')}
                    onChangeText={formik.handleChange('bvn')}
                    isInvalid={formik.touched.bvn && Boolean(formik.errors.bvn)}
                    errorMsg={formik.errors.bvn}
                    inputAccessoryViewID="Next"
                  />
                  <Select
                    id="bankCode"
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
              </Box>

              <FormButtonContainer>
                <VStack space={`${spacing[24]}px`} pb={`${spacing[24]}px`}>
                  <Text textAlign="center">{en.profile.account.verification.note}</Text>
                  <Button
                    colorScheme="secondary"
                    variant="solid"
                    size="xl"
                    fontFamily="Satoshi-Medium"
                    isLoading={verifyProfileState.isLoading}
                    isDisabled={
                      verifyProfileState.isLoading || Object.keys(formik.errors).length !== 0
                    }
                    onPress={formik.handleSubmit}
                  >
                    {en.profile.account.verification.btnText}
                  </Button>
                </VStack>
              </FormButtonContainer>
            </Flex>
          </KeyboardAwareScrollView>
        </Container>
      </Hidden>
      {verifyProfileState.isSuccess && (
        <SuccessState
          title={en.profile.account.verification.success.title}
          text={en.profile.account.verification.success.text}
          btnText={en.profile.account.verification.success.btnText}
          onDismiss={() => push('/profile')}
          size="sm"
        />
      )}
    </>
  );
}

const Hero = () => {
  return (
    <Flex width="100%" alignItems="center" justifyContent="center" bg="primary.50">
      <Box
        px={{ sm: `${spacing[55]}px`, lg: `${spacing[100] * 1.2}px` }}
        pt={`${spacing[100] * 0.48}px`}
        pb={spacing[100] * 0.7}
        width="100%"
        maxWidth="1440px"
      >
        <BackButton colorScheme="primary" mb={`${spacing[28]}px`} />
        <Heading fontSize={`${spacing[36]}px`} textAlign="center">
          {en.profile.account.verification.hero.heading}
        </Heading>
      </Box>
    </Flex>
  );
};
