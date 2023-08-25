import AccountLayout from 'app/components/Layout/AccountLayout';
import PinSettingsModal from 'app/components/Modal/PinSettingsModal';
import { Button, Container, FormButtonContainer, Input } from 'app/components/index';
import spacing from 'app/config/theme/spacing';
import { useFormik } from 'formik';
import { useForgotPinMutation } from 'app/hooks/mutations/usePin';
import useAppContext from 'app/hooks/useAppContext';
import en from 'app/i18n/index';
import { Box, Divider, HStack, Heading, Hidden, Stack, Text } from 'native-base';
import { useRef, useState } from 'react';
import { UpdatePasswordSchema } from './components/schema';
import { Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Touchable from 'app/components/Gestures/Touchable';
import { useUpdatePasswordMutation } from 'app/hooks/mutations/useForgotPassword';
import { useRouter } from 'solito/router';
import useDimensions from 'app/hooks/useDimensions';

export default function Security() {
  const scrollRef = useRef();
  const { push } = useRouter();
  const { state } = useAppContext('user');
  const [changePin, setChangePin] = useState(false);
  const [showPinSettings, setShowPinSettings] = useState(false);

  const {
    window: { width: WIDTH }
  } = useDimensions();

  const { forgotPin, forgotPinState } = useForgotPinMutation();
  const { updatePassword, updatePasswordState } = useUpdatePasswordMutation();

  const initialValues = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  };

  const handleSubmit = async payload => {
    const data = {
      oldPassword: payload.oldPassword,
      newPassword: payload.newPassword
    };
    const onSuccess = () => {
      if (WIDTH < 600) {
        push('/profile');
      }
    };
    updatePassword(data, onSuccess);
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: UpdatePasswordSchema,
    onSubmit: handleSubmit
  });

  const openPinSettingsModal = changePin => {
    const openModal = () => {
      setShowPinSettings(true);
    };
    if (changePin) {
      setChangePin(true);
      openModal();
    } else if (state.user?.hasSetPin) {
      forgotPin({}, openModal);
    } else {
      openModal();
    }
  };

  return (
    <>
      {/* larger device(tablet & desktop) for web only */}
      <Hidden only="base">
        <AccountLayout>
          <Box mt="46px" px={{ base: '20px', md: '50px', lg: '98px' }}>
            {/* Pin */}
            <HStack
              mr={{ base: 0, lg: '80px' }}
              space={`${spacing[10]}px`}
              justifyContent="space-between"
              alignItems="center"
              flexWrap="wrap"
            >
              <Box width="25%">
                <Heading fontSize={`${spacing[18]}px`} mb={`${spacing[4]}px`}>
                  {en.profile.security.info.pin.heading}
                </Heading>
                <Text>
                  {state.user?.hasSetPin && (
                    <Touchable onPress={() => openPinSettingsModal(true)}>
                      <Text
                        textDecorationLine="underline"
                        fontFamily="Satoshi-Medium"
                        fontSize={`${spacing[14]}px`}
                        color="primary.700"
                      >
                        {en.profile.security.info.pin.changePin}
                      </Text>
                    </Touchable>
                  )}
                  <Text fontSize={`${spacing[14]}px`} color="gray.300">
                    {en.profile.security.info.pin.subheading(state.user?.hasSetPin)}
                  </Text>
                </Text>
              </Box>
              <Box width="73%">
                <HStack maxWidth="512px">
                  <Button
                    variant="subtle"
                    colorScheme="primary"
                    fontFamily="Satoshi-Medium"
                    size="md"
                    px={`${spacing[16]}px`}
                    onPress={() => openPinSettingsModal(false)}
                    isLoading={forgotPinState.isLoading}
                    isDisabled={forgotPinState.isLoading}
                  >
                    {en.profile.security.info.pin.action(state.user?.hasSetPin)}
                  </Button>
                </HStack>
              </Box>
            </HStack>

            <Divider bg="gray.100" thickness="1" mt="20px" mb="40px" />

            {/*Password */}
            <Box>
              <Heading fontSize={`${spacing[18]}px`} mb={`${spacing[4]}px`}>
                {en.profile.security.info.password.heading}
              </Heading>
              <Text fontSize={`${spacing[14]}px`} color="gray.300">
                {en.profile.security.info.password.subheading}
              </Text>
            </Box>

            <Divider bg="gray.100" thickness="1" mt="20px" mb="40px" />

            {/* Current password */}
            <HStack justifyContent="space-between" mr={{ base: 0, lg: '80px' }}>
              <Box width="25%">
                <Text fontSize={`${spacing[14]}px`} fontFamily="Satoshi-Medium">
                  {en.profile.security.info.password.oldPassword.heading}
                </Text>
              </Box>
              <Box width="73%">
                <Box maxWidth="512px">
                  <Input
                    id="oldPassword"
                    type="password"
                    autoCapitalize="sentences"
                    autoComplete="password"
                    textContentType="password"
                    value={formik.values.oldPassword}
                    onBlur={formik.handleBlur('oldPassword')}
                    onChangeText={formik.handleChange('oldPassword')}
                    placeholder={en.profile.security.info.password.oldPassword.label}
                    isInvalid={formik.touched.oldPassword && Boolean(formik.errors.oldPassword)}
                    errorMsg={formik.errors.oldPassword}
                    inputAccessoryViewID="Next"
                    width="100%"
                  />
                </Box>
              </Box>
            </HStack>

            <Divider bg="gray.100" thickness="1" my="20px" />

            {/* New password */}
            <HStack justifyContent="space-between" mr={{ base: 0, lg: '80px' }}>
              <Box width="25%">
                <Text fontSize={`${spacing[14]}px`} fontFamily="Satoshi-Medium">
                  {en.profile.security.info.password.newPassword.heading}
                </Text>
              </Box>
              <Box width="73%">
                <Box maxWidth="512px">
                  <Input
                    id="newPassword"
                    type="password"
                    autoCapitalize="sentences"
                    autoComplete={Platform.OS === 'android' ? 'password-new' : 'new-password'}
                    textContentType="newPassword"
                    value={formik.values.newPassword}
                    onBlur={formik.handleBlur('newPassword')}
                    onChangeText={formik.handleChange('newPassword')}
                    isInvalid={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
                    errorMsg={formik.errors.newPassword}
                    inputAccessoryViewID="Next"
                    placeholder={en.profile.security.info.password.newPassword.label}
                    width="100%"
                  />
                </Box>
              </Box>
            </HStack>

            <Divider bg="gray.100" thickness="1" my="20px" />

            {/* Confirm new password */}
            <HStack justifyContent="space-between" mr={{ base: 0, lg: '80px' }}>
              <Box width="25%">
                <Text fontSize={`${spacing[14]}px`} fontFamily="Satoshi-Medium">
                  {en.profile.security.info.password.confirmPassword.heading}
                </Text>
              </Box>
              <Box width="73%">
                <Box maxWidth="512px">
                  <Input
                    id="confirmPassword"
                    type="password"
                    autoCapitalize="sentences"
                    value={formik.values.confirmPassword}
                    onBlur={formik.handleBlur('confirmPassword')}
                    onChangeText={formik.handleChange('confirmPassword')}
                    isInvalid={
                      formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)
                    }
                    errorMsg={formik.errors.confirmPassword}
                    inputAccessoryViewID="Next"
                    placeholder={en.profile.security.info.password.confirmPassword.label}
                    width="100%"
                  />
                </Box>
              </Box>
            </HStack>

            <Divider bg="gray.100" thickness="1" my="20px" />

            {/* Buttons */}
            <HStack space="20px" alignSelf="flex-end">
              <Button
                variant="outline"
                colorScheme="secondary"
                size="md"
                fontFamily="Satoshi-Medium"
                px="18px"
                onPress={() => formik.setValues(initialValues)}
              >
                {en.profile.security.info.password.cancel}
              </Button>
              <Button
                variant="solid"
                colorScheme="secondary"
                size="md"
                fontFamily="Satoshi-Medium"
                px="18px"
                type="submit"
                isDisabled={
                  Object.keys(formik.errors).length !== 0 || updatePasswordState.isLoading
                }
                isLoading={updatePasswordState.isLoading}
                onPress={formik.handleSubmit}
              >
                {en.profile.security.info.password.update}
              </Button>
            </HStack>
          </Box>
        </AccountLayout>
      </Hidden>
      {/* smaller device(mobile phones)for web & mobile app */}
      <Hidden from="sm">
        <Container pt={0} px={0} headerTitle={en.profile.security.info.heading}>
          <Box maxH="84%" h="100%" _web={{ overflowY: 'scroll', height: '88vh' }}>
            <KeyboardAwareScrollView
              ref={scrollRef}
              keyboardShouldPersistTaps="always"
              showsVerticalScrollIndicator={false}
              keyboardDismissMode="interactive"
            >
              <Box pt={`${spacing[40]}px`} px={`${spacing[24]}px`}>
                {/* Pin */}
                <HStack
                  // space={`${spacing[10]}px`}

                  justifyContent="space-between"
                  alignItems="center"
                  flexWrap="wrap"
                >
                  <Box>
                    <Heading fontSize={`${spacing[20]}px`} mb={`${spacing[4]}px`}>
                      {en.profile.security.info.pin.heading}
                    </Heading>
                    <HStack mb={`${spacing[20]}px`} flexWrap="wrap">
                      {state.user?.hasSetPin && (
                        <Touchable onPress={() => openPinSettingsModal(true)}>
                          <Text
                            textDecorationLine="underline"
                            fontFamily="Satoshi-Medium"
                            fontSize={`${spacing[14]}px`}
                            color="primary.700"
                          >
                            {en.profile.security.info.pin.changePin}
                          </Text>
                        </Touchable>
                      )}
                      <Text fontSize={`${spacing[14]}px`} color="gray.300">
                        {en.profile.security.info.pin.subheading(state.user?.hasSetPin)}
                      </Text>
                    </HStack>
                  </Box>
                  <Button
                    variant="subtle"
                    colorScheme="primary"
                    fontFamily="Satoshi-Medium"
                    size="md"
                    px={`${spacing[16]}px`}
                    onPress={() => openPinSettingsModal(false)}
                    isLoading={forgotPinState.isLoading}
                    isDisabled={forgotPinState.isLoading}
                    mb={`${spacing[20]}px`}
                  >
                    {en.profile.security.info.pin.action(state.user?.hasSetPin)}
                  </Button>
                </HStack>

                {/*Password */}
                <Box my={`${spacing[20]}px`}>
                  <Heading fontSize={`${spacing[20]}px`} mb={`${spacing[4]}px`}>
                    {en.profile.security.info.password.heading}
                  </Heading>
                  <Text fontSize={`${spacing[14]}px`} color="gray.300">
                    {en.profile.security.info.password.subheading}
                  </Text>
                </Box>

                <Stack space={`${spacing[24]}px`}>
                  <Input
                    id="oldPassword"
                    type="password"
                    autoCapitalize="sentences"
                    autoComplete="password"
                    value={formik.values.oldPassword}
                    onBlur={formik.handleBlur('oldPassword')}
                    onChangeText={formik.handleChange('oldPassword')}
                    placeholder={en.profile.security.info.password.oldPassword.label}
                    isInvalid={formik.touched.oldPassword && Boolean(formik.errors.oldPassword)}
                    errorMsg={formik.errors.oldPassword}
                    inputAccessoryViewID="Next"
                    width="100%"
                    maxWidth="512px"
                  />
                  <Input
                    id="newPassword"
                    type="password"
                    autoCapitalize="sentences"
                    autoComplete={Platform.OS === 'android' ? 'password-new' : 'new-password'}
                    textContentType="newPassword"
                    value={formik.values.newPassword}
                    onBlur={formik.handleBlur('newPassword')}
                    onChangeText={formik.handleChange('newPassword')}
                    isInvalid={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
                    errorMsg={formik.errors.newPassword}
                    inputAccessoryViewID="Next"
                    placeholder={en.profile.security.info.password.newPassword.label}
                    width="100%"
                    maxWidth="512px"
                  />
                  <Input
                    id="confirmPassword"
                    type="password"
                    autoCapitalize="sentences"
                    value={formik.values.confirmPassword}
                    onBlur={formik.handleBlur('confirmPassword')}
                    onChangeText={formik.handleChange('confirmPassword')}
                    isInvalid={
                      formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)
                    }
                    errorMsg={formik.errors.confirmPassword}
                    inputAccessoryViewID="Next"
                    placeholder={en.profile.security.info.password.confirmPassword.label}
                    width="100%"
                    maxWidth="512px"
                  />
                </Stack>
              </Box>
            </KeyboardAwareScrollView>
          </Box>
          <Box
            h="16%"
            w="100%"
            bg="white"
            px={`${spacing[24]}px`}
            pt={`${spacing[20]}px`}
            _web={{ position: 'fixed', bottom: 0, py: `${spacing[20]}px` }}
          >
            <FormButtonContainer>
              <Button
                variant="solid"
                colorScheme="secondary"
                size="xl"
                fontFamily="Satoshi-Medium"
                type="submit"
                isDisabled={
                  Object.keys(formik.errors).length !== 0 || updatePasswordState.isLoading
                }
                isLoading={updatePasswordState.isLoading}
                onPress={formik.handleSubmit}
              >
                {en.profile.security.info.password.update}
              </Button>
            </FormButtonContainer>
          </Box>
        </Container>
      </Hidden>
      {showPinSettings && (
        <PinSettingsModal
          visible
          isChangePin={changePin}
          onClose={() => {
            setShowPinSettings(false);
            setChangePin(false);
          }}
        />
      )}
    </>
  );
}
