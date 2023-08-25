import { Entypo } from '@expo/vector-icons';
import { Button, PinCodeInput, BackButton, FormButtonContainer } from 'app/components/index';
import { Flex, Heading, Hidden, HStack, Icon, Text, VStack } from 'native-base';
import { createRef, useEffect, useState } from 'react';
import en from 'app/i18n/index';
import spacing from 'app/config/theme/spacing';
import useCountDown from 'app/hooks/useCountDown';
import { millisToMinutesAndSeconds } from 'app/utils/index';
import { Platform } from 'react-native';
import {
  useGenerateTokenMutation,
  useValidateTokenMutation
} from 'app/hooks/mutations/useCreateUser';
import RegistrationSchema from './schema';
import { useFormik } from 'formik';
import useDimensions from 'app/hooks/useDimensions';

export default function Step2({ back, next, getState, saveState }) {
  const { actions } = useCountDown(60000, 500);
  const state = getState();
  const { validateToken, validateTokenState } = useValidateTokenMutation();
  const {
    window: { height: HEIGHT }
  } = useDimensions();

  useEffect(() => {
    actions.start();
    return () => {};
  }, []);

  const handleSubmit = token => {
    const data = {
      phoneNumber: state.phoneNumber,
      phoneCode: state.phoneCode,
      token: token
    };

    const onSuccess = () => {
      saveState(state);
      next();
    };

    validateToken(data, onSuccess);
  };

  const formik = useFormik({
    initialValues: {
      token: ''
    },
    validationSchema: RegistrationSchema(2),
    onSubmit: payload => handleSubmit(payload.token)
  });

  return (
    <>
      {/* larger device(tablet & desktop) for web only */}
      <Hidden only={['base', 'sm']}>
        <VStack width="100%" space={`${spacing[24]}`}>
          <BackButton onPress={back} />
          <RenderInput state={state} formik={formik} onFulfill={val => handleSubmit(val)} />
          <FormButtonContainer>
            <Button
              onPress={formik.handleSubmit}
              isLoading={validateTokenState.isLoading}
              isDisabled={validateTokenState.isLoading || Object.keys(formik.errors).length !== 0}
            >
              {en.register.next}
            </Button>
          </FormButtonContainer>
        </VStack>
      </Hidden>
      {/* smaller device(mobile phones)for web & mobile app */}
      <Hidden from="md">
        <Flex justify="space-between" flexDirection="column" height="94%">
          <VStack mt={25}>
            <RenderInput state={state} formik={formik} onFulfill={val => handleSubmit(val)} />
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
                onPress={back}
              >
                <Icon as={Entypo} name="chevron-up" size={'20px'} color="primary.600" />
              </Button>

              <Button
                onPress={formik.handleSubmit}
                isLoading={validateTokenState.isLoading}
                isDisabled={validateTokenState.isLoading || Object.keys(formik.errors).length !== 0}
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

const RenderInput = ({ state, formik, onFulfill }) => {
  const pinInput = createRef();
  const { actions, timeLeft } = useCountDown(60000, 500);
  const [notificationType, setNotificationType] = useState('');
  const { generateToken, generateTokenState } = useGenerateTokenMutation();

  useEffect(() => {
    if (notificationType !== '') {
      resendToken();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notificationType]);

  //Resend Token
  const resendToken = () => {
    const data = {
      phoneNumber: state.phoneNumber,
      phoneCode: state.phoneCode,
      notificationType: notificationType
    };

    const onSuccess = () => {
      actions.start();
      setNotificationType('');
      formik.setFieldValue('token', '');
    };

    generateToken(data, onSuccess);
  };

  return (
    <VStack>
      <Text color="gray.300" pb={18} fontSize={`${spacing[14]}px`}>
        {en.register.steps.two.progress}
      </Text>
      <Heading fontSize={`${spacing[26]}px`} mb={26}>
        {en.register.steps.two.title(`${state.phoneCode}${state.phoneNumber.slice(-10)}`)}
      </Heading>
      <PinCodeInput
        ref={pinInput}
        label={en.register.steps.two.label}
        value={formik.values.token}
        codeLength={5}
        autoFocus
        isInvalid={formik.touched.token && Boolean(formik.errors.token)}
        importantForAutofill="yes"
        autoComplete={Platform.OS === 'android' ? 'sms-otp' : 'one-time-code'}
        textContentType="oneTimeCode"
        onTextChange={code => formik.setFieldValue('token', code)}
        onBlur={formik.handleBlur('token')}
        inputAccessoryViewID="Next"
        onFulfill={onFulfill}
      />

      <HStack mt={30} alignItems="center" space={`${spacing[6]}px`}>
        <Text fontSize={`${spacing[14]}px`} mr={4}>
          {en.register.steps.two.resendText}
        </Text>
        {timeLeft > 0 ? (
          <Text fontSize={`${spacing[14]}px`} variant="link" color="primary.600" opacity={0.5}>
            {`${en.register.steps.two.resendCode} (${millisToMinutesAndSeconds(timeLeft)})`}
          </Text>
        ) : (
          <>
            <Button
              variant="link"
              size="sm"
              padding={0}
              fontFamily="Satoshi-Medium"
              isDisabled={generateTokenState.isLoading}
              onPress={() => setNotificationType('SMS')}
            >
              {en.register.steps.two.resendCode}
            </Button>
            <Text fontSize={`${spacing[14]}px`}>{en.register.steps.two.or}</Text>
            <Button
              variant="link"
              size="sm"
              padding={0}
              fontFamily="Satoshi-Medium"
              isDisabled={generateTokenState.isLoading}
              onPress={() => setNotificationType('VOICE')}
            >
              {en.register.steps.two.tryVoice}
            </Button>
          </>
        )}
      </HStack>
    </VStack>
  );
};
