import { Entypo } from '@expo/vector-icons';

import { Button, Link, PhoneInput, FormButtonContainer } from 'app/components/index';
import { countryCodes } from 'app/constants/index';
import { Center, Flex, Heading, Hidden, HStack, Icon, Text, VStack } from 'native-base';
import { useRouter } from 'solito/router';
import { useRef } from 'react';
import en from 'app/i18n/index';
import spacing from 'app/config/theme/spacing';
import { removeWhiteSpaces } from 'app/utils/index';
import { useGenerateTokenMutation } from 'app/hooks/mutations/useCreateUser';
import useCountriesQuery from 'app/hooks/queries/useCountriesQuery';
import { useFormik } from 'formik';
import RegistrationSchema from './schema';
import { Platform } from 'react-native';
import useDimensions from 'app/hooks/useDimensions';
import { LogoWithText } from 'app/components/Icons/Logo';
let useNavigation = () => {};

if (Platform.OS !== 'web') {
  useNavigation = require('@react-navigation/native').useNavigation;
}

export default function Step1({ next, getState, saveState }) {
  const state = getState();
  const {
    window: { height: HEIGHT }
  } = useDimensions();
  const { back, replace } = useRouter();
  const navigation = useNavigation();

  const { generateToken, generateTokenState } = useGenerateTokenMutation();

  const onGoBack = () => {
    if (Platform.OS !== 'web' && !navigation.canGoBack()) {
      replace('/onboarding', undefined, {
        experimental: {
          nativeBehavior: 'stack-replace'
        }
      });
    } else {
      back();
    }
  };

  const formik = useFormik({
    initialValues: {
      phoneNumber: state.phoneNumber || '',
      phoneCode: state.phoneCode || '+234',
      notificationType: state.notificationType || 'SMS'
    },
    validationSchema: RegistrationSchema(1),
    onSubmit: payload => {
      const onSuccess = () => {
        saveState({
          ...state,
          phoneNumber: payload.phoneNumber,
          phoneCode: payload.phoneCode
        });
        next();
      };

      generateToken(payload, onSuccess);
    }
  });

  return (
    <>
      {/* larger device(tablet & desktop) for web only */}
      <Hidden only={['base', 'sm']}>
        <VStack width="100%" space={`${spacing[24]}`}>
          <RenderInput formik={formik} />
          <FormButtonContainer>
            <Button
              onPress={formik.handleSubmit}
              isLoading={generateTokenState.isLoading}
              isDisabled={generateTokenState.isLoading || Object.keys(formik.errors).length !== 0}
            >
              {en.register.next}
            </Button>
          </FormButtonContainer>
          <Center mt={-spacing[20]}>
            <HStack space={`${spacing[4]}`}>
              <Text fontSize={`${spacing[14]}px`}>{en.register.steps.one.existingUser}</Text>
              <Link fontSize={`${spacing[14]}px`} href="/login">
                {en.register.steps.one.login}
              </Link>
            </HStack>
          </Center>
        </VStack>
      </Hidden>
      {/* smaller device(mobile phones)for web & mobile app */}
      <Hidden from="md">
        <Flex justify="space-between" flexDirection="column" width="100%" height="94%">
          <VStack>
            <Flex mt={25} mb={HEIGHT * 0.067}>
              <LogoWithText width={spacing[100] * 1.95} height={HEIGHT * 0.0425} />
            </Flex>
            <RenderInput formik={formik} />
          </VStack>
          <FormButtonContainer>
            <Flex flexDirection="row" width="100%" justifyContent="space-between">
              <Button
                variant="outline"
                p={0}
                _web={{ width: '55px', height: '55px', borderWidth: 1.5 }}
                width={HEIGHT * 0.067}
                height={HEIGHT * 0.067}
                borderRadius="full"
                borderWidth={2}
                onPress={onGoBack}
              >
                <Icon as={Entypo} name="chevron-left" size={'20px'} color="primary.600" />
              </Button>

              <Button
                onPress={formik.handleSubmit}
                isLoading={generateTokenState.isLoading}
                isDisabled={generateTokenState.isLoading || Object.keys(formik.errors).length !== 0}
              >
                {en.register.next}
              </Button>
            </Flex>
          </FormButtonContainer>
        </Flex>
      </Hidden>
    </>
  );
}

const RenderInput = ({ formik }) => {
  const inputRef = useRef();
  const { data, isLoading } = useCountriesQuery(`supportedUsersCountries=true`);

  return (
    <VStack>
      <Heading fontSize={`${spacing[26]}px`} mb={26}>
        {en.register.steps.one.title}
      </Heading>
      <PhoneInput
        ref={inputRef}
        id="phoneNumber"
        hideSearch // TODO: might remove this
        placeholder={en.register.steps.one.phoneNumber.placeholder}
        dropdownValue={formik.values.phoneCode}
        onChangeDropdown={val => formik.setFieldValue('phoneCode', val)}
        options={countryCodes(data, isLoading)}
        autoFocus
        value={formik.values.phoneNumber}
        onBlur={formik.handleBlur('phoneNumber')}
        onChangeText={event => formik.handleChange('phoneNumber')(removeWhiteSpaces(event))}
        isInvalid={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
        errorMsg={formik.errors.phoneNumber}
        inputAccessoryViewID="Next"
        disablePhoneCode
        phoneCodeOpacity={1}
      />
    </VStack>
  );
};
