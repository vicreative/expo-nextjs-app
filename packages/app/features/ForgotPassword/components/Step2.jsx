import { Entypo } from '@expo/vector-icons';
import { BackButton, Button, PinCodeInput, FormButtonContainer } from 'app/components/index';
import { Flex, Heading, Hidden, HStack, Icon, Text, VStack } from 'native-base';
import { useEffect, useState, createRef } from 'react';
import en from 'app/i18n/index';
import spacing from 'app/config/theme/spacing';
import useCountDown from 'app/hooks/useCountDown';
import { millisToMinutesAndSeconds } from 'app/utils/index';
import { Platform } from 'react-native';
import useAppContext from 'app/hooks/useAppContext';
import {
  useForgotPasswordMutation,
  useValidateResetPasswordTokenMutation
} from 'app/hooks/mutations/useForgotPassword';
import useDimensions from 'app/hooks/useDimensions';

export default function Step2({ back, next, getState, saveState }) {
  const pinInputRef = createRef();
  const {
    window: { height: HEIGHT }
  } = useDimensions();

  const state = getState();
  const [value, setValue] = useState(state.token || '');
  const { actions } = useCountDown(60000, 500);
  const { state: navigationState, dispatch } = useAppContext('navigation');
  const { validateResetToken, validateResetTokenState } = useValidateResetPasswordTokenMutation();

  useEffect(() => {
    actions.start();
    dispatch({
      ...navigationState,
      headerTitle: en.forgotPassword.steps.two.headerTitle,
      onGoBack: () => back()
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = token => {
    const payload = {
      token: token,
      email: state.email
    };

    const onSuccess = () => {
      saveState({ ...state, token: token });
      next();
    };

    validateResetToken(payload, onSuccess);
  };

  return (
    <>
      {/* larger device(tablet & desktop) for web only */}
      <Hidden only="base">
        <Flex alignItems="center" justifyContent="center" height="100%" width="100%">
          <Flex
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            px="30px"
            width="100%"
          >
            <VStack width="100%" space={`${spacing[24]}`}>
              <BackButton onPress={back} />
              <RenderInput
                pinInputRef={pinInputRef}
                state={state}
                value={value}
                onChange={val => setValue(val)}
                onFulfill={val => handleSubmit(val)}
              />
              <FormButtonContainer>
                <Button
                  onPress={() => handleSubmit(value)}
                  isLoading={validateResetTokenState.isLoading}
                  isDisabled={validateResetTokenState.isLoading || value.length < 5}
                >
                  {en.forgotPassword.next}
                </Button>
              </FormButtonContainer>
            </VStack>
          </Flex>
        </Flex>
      </Hidden>

      {/* smaller device(mobile phones)for web & mobile app */}
      <Hidden from="sm">
        <Flex justify="space-between" flexDirection="column" height="94%">
          <RenderInput
            pinInputRef={pinInputRef}
            state={state}
            value={value}
            onChange={val => setValue(val)}
            onFulfill={val => handleSubmit(val)}
          />

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
                onPress={() => handleSubmit(value)}
                isLoading={validateResetTokenState.isLoading}
                isDisabled={validateResetTokenState.isLoading || value.length < 5}
              >
                {en.forgotPassword.next}
              </Button>
            </Flex>
          </FormButtonContainer>
        </Flex>
      </Hidden>
    </>
  );
}

const RenderInput = ({ state, pinInputRef, value, onChange, onFulfill }) => {
  const { actions, timeLeft } = useCountDown(60000, 500);
  const { generateResetToken, generateResetTokenState } = useForgotPasswordMutation();

  //Resend Token to email
  const resendToken = () => {
    const data = {
      email: state.email
    };

    const onSuccess = () => {
      actions.start();
      onChange('');
    };

    generateResetToken(data, onSuccess);
  };
  return (
    <VStack>
      <Heading fontSize={`${spacing[26]}px`} mb={26}>
        {en.forgotPassword.steps.two.title(state.email)}
      </Heading>
      <PinCodeInput
        ref={pinInputRef}
        label={en.forgotPassword.steps.two.label}
        value={value}
        codeLength={5}
        autoFocus
        importantForAutofill="yes"
        autoComplete={Platform.OS === 'android' ? 'sms-otp' : 'one-time-code'}
        textContentType="oneTimeCode"
        onTextChange={code => onChange(code)}
        inputAccessoryViewID="Next"
        onFulfill={onFulfill}
      />

      <HStack mt={30} alignItems="center" space={`${spacing[6]}px`}>
        <Text fontSize={`${spacing[14]}px`} mr={4}>
          {en.forgotPassword.steps.two.resendText}
        </Text>
        {timeLeft > 0 ? (
          <Text fontSize={`${spacing[14]}px`} variant="link" color="primary.600" opacity={0.5}>
            {`${en.forgotPassword.steps.two.resendCode} (${millisToMinutesAndSeconds(timeLeft)})`}
          </Text>
        ) : (
          <Button
            variant="link"
            size="sm"
            padding={0}
            fontFamily="Satoshi-Medium"
            onPress={resendToken}
            isDisabled={generateResetTokenState.isLoading}
          >
            {en.forgotPassword.steps.two.resendCode}
          </Button>
        )}
      </HStack>
    </VStack>
  );
};
