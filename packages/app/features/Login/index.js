import { useKeyboard } from '@react-native-community/hooks';
import { Button, Input, Container, Link, FormButtonContainer } from 'app/components';
import spacing from 'app/config/theme/spacing';
import { useFormik } from 'formik';
import useLogin from 'app/hooks/mutations/useLogin';
import en from 'app/i18n/index';
import { Avatar, Box, Flex, Heading, Hidden, HStack, Text, VStack } from 'native-base';
import { NavHeader } from 'app/navigation/Header';
import { useRouter } from 'solito/router';
import { resolveAvatarText, resolveFileUrl } from 'app/utils/index';
import LoginSchema from './schema';
import useAppContext from 'app/hooks/useAppContext';
import useAsyncStorage from 'app/hooks/useAsyncStorage';
import { removeAuthToken, removeLoginIdentifier, removePreviousRoute } from 'app/utils/auth';
import { Platform } from 'react-native';
import env from 'app/config/env';
import getDeviceId from 'app/constants/deviceId';
import { useUserQuery } from 'app/hooks/queries/useUserProfile';
import useDimensions from 'app/hooks/useDimensions';
import { LogoWithText } from 'app/components/Icons/Logo';

const Login = () => {
  const keyboard = useKeyboard();
  const {
    window: { height: HEIGHT }
  } = useDimensions();

  const { push, replace } = useRouter();
  const { login, loginState } = useLogin();
  const { previousPath } = useAsyncStorage();
  const { state, dispatch } = useAppContext('user');
  const { state: notificationState } = useAppContext('notification');

  const goToRegistrationScreen = () => {
    push('/register');
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: LoginSchema,
    onSubmit: payload => handleLogin(payload)
  });

  const handleLogin = async payload => {
    const deviceId = await getDeviceId();

    const onSuccess = data => {
      dispatch({ ...state, token: data.data.accessToken, isLoggedIn: 'true' });
      if (previousPath !== null) {
        replace(previousPath, undefined, {
          experimental: {
            nativeBehavior: 'stack-replace'
          }
        });
        removePreviousRoute();
      } else if (Platform.OS === 'web' && data.data.user.businesses?.length > 0) {
        replace(`${env.WEBSITE_URL}/creator/dashboard`, undefined, {
          experimental: {
            nativeBehavior: 'stack-replace'
          }
        });
      } else {
        replace('/', undefined, {
          experimental: {
            nativeBehavior: 'stack-replace'
          }
        });
      }
    };

    const data = {
      ...payload,
      platform: Platform.OS.toUpperCase(),
      deviceToken: notificationState.pushToken,
      deviceId: deviceId
    };

    login(data, onSuccess);
  };

  return (
    <Container pt={{ base: spacing[24], sm: 0 }} px={{ base: spacing[24], sm: 0 }} maxWidth="100%">
      {/* larger device(tablet & desktop) for web only */}
      <Hidden only="base">
        <Flex alignItems="center" justifyContent="center" height="100%" width="100%">
          {/* header */}
          <NavHeader onlyLogo />
          <Flex
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            px="30px"
            maxWidth="560px"
            width="100%"
            mt="88px"
          >
            <VStack width="100%">
              <RenderInputs formik={formik} />
              <FormButtonContainer>
                <Button
                  variant="solid"
                  isLoading={loginState.isLoading}
                  isDisabled={loginState.isLoading || Object.keys(formik.errors).length !== 0}
                  onPress={formik.handleSubmit}
                >
                  {en.login.login}
                </Button>
              </FormButtonContainer>
            </VStack>
            <Link
              href="/register"
              textProps={{
                marginTop: 20
              }}
            >
              {en.login.createAccount}
            </Link>
          </Flex>
        </Flex>
      </Hidden>

      {/* smaller device(mobile phones)for web & mobile app */}
      <Hidden from="sm">
        <Flex justify="space-between" flexDirection="column" height="94%">
          <VStack>
            <Flex alignItems="center" mt={25} mb={HEIGHT * 0.1452}>
              <LogoWithText width={spacing[100] * 1.95} height={HEIGHT * 0.0425} />
            </Flex>
            <RenderInputs formik={formik} />
          </VStack>

          <FormButtonContainer>
            <VStack space={`${spacing[24]}px`}>
              <Button
                variant="solid"
                size="xl"
                isLoading={loginState.isLoading}
                isDisabled={loginState.isLoading || Object.keys(formik.errors).length !== 0}
                onPress={formik.handleSubmit}
              >
                {en.login.login}
              </Button>
              {!keyboard.keyboardShown && (
                <Button variant="outline" size="xl" bottom={0} onPress={goToRegistrationScreen}>
                  {en.login.signup}
                </Button>
              )}
            </VStack>
          </FormButtonContainer>
        </Flex>
      </Hidden>
    </Container>
  );
};

export default Login;

const RenderInputs = ({ formik }) => {
  const { state, dispatch } = useAppContext('user');
  const {
    window: { height: HEIGHT }
  } = useDimensions();

  const isUserLoggedIn = state.token !== null;

  useUserQuery({
    enabled: isUserLoggedIn,
    onSuccess: data => {
      formik.setFieldValue('email', data.email, false);
      dispatch({ ...state, user: data });
    }
  });

  const switchAccount = async () => {
    removeLoginIdentifier();
    removeAuthToken();
    dispatch({ ...state, user: null, token: null, isLoggedIn: null });
    formik.resetForm({ email: '', password: '' });
  };

  return (
    <>
      {state.user ? (
        <HStack mb={`${spacing[20]}px`} alignItems="center">
          <Box w="14%">
            <Avatar
              bg="primary.100"
              width={`${spacing[42]}px`}
              height={`${spacing[42]}px`}
              source={
                state.user.avatar && {
                  uri: resolveFileUrl(state.user.avatar)
                }
              }
            >
              {resolveAvatarText(state.user.firstName, state.user.lastName)}
            </Avatar>
          </Box>
          <VStack w="64%">
            <Heading
              fontSize={`${spacing[14]}px`}
            >{`${state.user.firstName} ${state.user.lastName}`}</Heading>
            <Text fontSize={`${spacing[14]}px`}>{state.user.email}</Text>
          </VStack>
          <Flex w="22%" alignItems="flex-end">
            <Button
              variant="subtle"
              size="sm"
              p={0}
              width={`${spacing[100] * 0.8}px`}
              _web={{ width: '80px', height: '44px' }}
              height={`${HEIGHT * 0.0447}px`}
              onPress={switchAccount}
            >
              {en.login.switchAccount}
            </Button>
          </Flex>
        </HStack>
      ) : (
        <Box mb={`${spacing[24]}px`}>
          <Input
            placeholder={en.login.email.placeholder}
            type="email"
            id="email"
            autoCapitalize="none"
            keyboardType="email-address"
            textContentType="emailAddress"
            value={formik.values.email}
            onBlur={formik.handleBlur('email')}
            onChangeText={formik.handleChange('email')}
            isInvalid={formik.touched.email && Boolean(formik.errors.email)}
            errorMsg={formik.errors.email}
            inputAccessoryViewID="Next"
          />
        </Box>
      )}
      <Box mb={`${spacing[24]}px`}>
        <Input
          id="password"
          placeholder={en.login.password.placeholder}
          type="password"
          autoCapitalize="sentences"
          autoComplete="password"
          textContentType="password"
          value={formik.values.password}
          onBlur={formik.handleBlur('password')}
          onChangeText={formik.handleChange('password')}
          isInvalid={formik.touched.password && Boolean(formik.errors.password)}
          errorMsg={formik.errors.password}
          inputAccessoryViewID="Next"
        />
      </Box>
      <Link
        href="/forgot-password"
        textProps={{
          marginBottom: 40,
          width: spacing[100] * 1.335
        }}
      >
        {en.login.forgotPassword}
      </Link>
    </>
  );
};
