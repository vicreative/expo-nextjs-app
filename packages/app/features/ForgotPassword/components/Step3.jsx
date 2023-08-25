import { BackButton, Button, Input, FormButtonContainer } from 'app/components/index';
import { Box, Flex, Heading, Hidden, VStack } from 'native-base';
import en from 'app/i18n/index';
import spacing from 'app/config/theme/spacing';
import { useEffect } from 'react';
import SuccessState from 'app/components/SuccessState';
import { useRouter } from 'solito/router';
import { Platform } from 'react-native';
import useAppContext from 'app/hooks/useAppContext';
import { useFormik } from 'formik';
import { ResetPasswordSchema } from './schema';
import { useResetPasswordMutation } from 'app/hooks/mutations/useForgotPassword';

export default function Step3({ next, getState, setCurrentStep, resetState, saveState }) {
  const state = getState();
  const { replace } = useRouter();
  const { state: navigationState, dispatch } = useAppContext('navigation');
  const { resetPassword, resetPasswordState } = useResetPasswordMutation();

  const onGoBack = () => {
    saveState({ ...state, token: '' });
    setCurrentStep(0);
  };

  useEffect(() => {
    dispatch({
      ...navigationState,
      headerTitle: en.forgotPassword.steps.three.headerTitle,
      onGoBack: onGoBack
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: ''
    },
    validationSchema: ResetPasswordSchema,
    onSubmit: payload => {
      const data = {
        email: state.email,
        token: state.token,
        password: payload.password
      };

      const onSuccess = () => {
        resetState();
        next();
      };

      resetPassword(data, onSuccess);
    }
  });

  const onDismiss = () => {
    replace('/login', undefined, {
      experimental: {
        nativeBehavior: 'stack-replace',
        isNestedNavigator: true
      }
    });
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
              <BackButton onPress={onGoBack} />
              <RenderInput formik={formik} />
              <FormButtonContainer>
                <Button
                  onPress={formik.handleSubmit}
                  isLoading={resetPasswordState.isLoading}
                  isDisabled={
                    resetPasswordState.isLoading || Object.keys(formik.errors).length !== 0
                  }
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
          <RenderInput formik={formik} />

          <FormButtonContainer>
            <Button
              onPress={formik.handleSubmit}
              isLoading={resetPasswordState.isLoading}
              isDisabled={resetPasswordState.isLoading || Object.keys(formik.errors).length !== 0}
            >
              {en.forgotPassword.next}
            </Button>
          </FormButtonContainer>
        </Flex>
      </Hidden>
      {resetPasswordState.isSuccess && (
        <SuccessState
          title={en.forgotPassword.success.title}
          text={en.forgotPassword.success.text}
          btnText={en.forgotPassword.success.btnText}
          onDismiss={onDismiss}
        />
      )}
    </>
  );
}

const RenderInput = ({ formik }) => {
  return (
    <VStack>
      <Heading fontSize={`${spacing[26]}px`} mb={26}>
        {en.forgotPassword.steps.three.title}
      </Heading>
      <Box mb={24}>
        <Input
          id="password"
          type="password"
          autoComplete={Platform.OS === 'android' ? 'password-new' : 'new-password'}
          textContentType="newPassword"
          placeholder={en.forgotPassword.steps.three.password.placeholder}
          value={formik.values.password}
          onBlur={formik.handleBlur('password')}
          onChangeText={formik.handleChange('password')}
          isInvalid={formik.touched.password && Boolean(formik.errors.password)}
          errorMsg={formik.errors.password}
          inputAccessoryViewID="Next"
        />
      </Box>
      <Box>
        <Input
          id="confirmPassword"
          type="password"
          placeholder={en.forgotPassword.steps.three.confirmPassword.placeholder}
          tip={en.forgotPassword.steps.three.tip}
          value={formik.values.confirmPassword}
          onBlur={formik.handleBlur('confirmPassword')}
          onChangeText={formik.handleChange('confirmPassword')}
          isInvalid={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
          errorMsg={formik.errors.confirmPassword}
          inputAccessoryViewID="Next"
        />
      </Box>
    </VStack>
  );
};
