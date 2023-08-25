import { Button, Input, FormButtonContainer } from 'app/components/index';
import { Flex, Heading, Hidden, VStack } from 'native-base';
import { useRouter } from 'solito/router';
import { useEffect } from 'react';
import en from 'app/i18n/index';
import spacing from 'app/config/theme/spacing';
import useAppContext from 'app/hooks/useAppContext';
import { useFormik } from 'formik';
import { ForgotPasswordSchema } from './schema';
import { useForgotPasswordMutation } from 'app/hooks/mutations/useForgotPassword';

export default function Step1({ next, getState, saveState }) {
  const { back: goBack } = useRouter();
  const { state: navigationState, dispatch } = useAppContext('navigation');
  const { generateResetToken, generateResetTokenState } = useForgotPasswordMutation();
  const state = getState();

  useEffect(() => {
    dispatch({
      ...navigationState,
      headerTitle: en.forgotPassword.steps.one.headerTitle,
      onGoBack: () => goBack()
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formik = useFormik({
    initialValues: {
      email: state.email || ''
    },
    validationSchema: ForgotPasswordSchema,
    onSubmit: payload => {
      const onSuccess = () => {
        saveState({ ...state, email: payload.email });
        next();
      };

      generateResetToken(payload, onSuccess);
    }
  });
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
              <RenderInput formik={formik} />
              <FormButtonContainer>
                <Button
                  onPress={formik.handleSubmit}
                  isLoading={generateResetTokenState.isLoading}
                  isDisabled={
                    generateResetTokenState.isLoading || Object.keys(formik.errors).length !== 0
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
              isLoading={generateResetTokenState.isLoading}
              isDisabled={
                generateResetTokenState.isLoading || Object.keys(formik.errors).length !== 0
              }
            >
              {en.forgotPassword.next}
            </Button>
          </FormButtonContainer>
        </Flex>
      </Hidden>
    </>
  );
}

const RenderInput = ({ formik }) => {
  return (
    <VStack>
      <Heading fontSize={`${spacing[26]}px`} mb={26}>
        {en.forgotPassword.steps.one.title}
      </Heading>
      <Input
        id="email"
        type="email"
        autoCapitalize="none"
        keyboardType="email-address"
        textContentType="emailAddress"
        placeholder={en.forgotPassword.steps.one.email.placeholder}
        value={formik.values.email}
        onBlur={formik.handleBlur('email')}
        onChangeText={formik.handleChange('email')}
        isInvalid={formik.touched.email && Boolean(formik.errors.email)}
        errorMsg={formik.errors.email}
        inputAccessoryViewID="Next"
      />
    </VStack>
  );
};
