import { useState } from 'react';
import Modal from './index';
import { AntDesign, Feather } from '@expo/vector-icons';
import spacing from 'app/config/theme/spacing';
import en from 'app/i18n/index';
import { Heading, HStack, Box, Icon, Divider, Hidden, Flex, Text } from 'native-base';
import Button from '../Button';
import { STATUS_BAR_HEIGHT } from 'app/constants/index';
import { FormButtonContainer, PinCodeInput, Toast } from '..';
import Touchable from 'app/components/Gestures/Touchable';
import useAppContext from 'app/hooks/useAppContext';
import { Platform } from 'react-native';
import {
  useCreatePinMutation,
  useProcessPinResetMutation,
  useUpdatePinMutation,
  useValidateResetPinMutation
} from 'app/hooks/mutations/usePin';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import SuccessState from 'app/components/SuccessState';
import ErrorState from 'app/components/ErrorState';
import { useQueryClient } from '@tanstack/react-query';
import useDimensions from 'app/hooks/useDimensions';

function PinSettingsModal({
  visible,
  isChangePin = false,
  onClose = () => {},
  onSuccess = () => {}
}) {
  const { state } = useAppContext('user');

  if (isChangePin) {
    return <ChangePin visible={visible} onClose={onClose} onSuccess={onSuccess} />;
  }
  if (state.user?.hasSetPin) {
    return <ResetPin visible={visible} onClose={onClose} onSuccess={onSuccess} />;
  } else {
    return <CreatePin visible={visible} onClose={onClose} onSuccess={onSuccess} />;
  }
}

export default PinSettingsModal;

const CreatePin = ({ visible, onClose = () => {}, onSuccess = () => {} }) => {
  const queryClient = useQueryClient();
  const {
    window: { width: WIDTH },
    screen: { height: SCREEN_HEIGHT }
  } = useDimensions();

  const [formState, setFormState] = useState({
    pin: '',
    confirmPin: '',
    showConfirmPin: false
  });

  const { createPin, createPinState } = useCreatePinMutation();

  const isIncorrectPin =
    formState.showConfirmPin &&
    formState.confirmPin.length === 4 &&
    formState.pin !== formState.confirmPin;

  const shouldDisableBtn =
    (!formState.showConfirmPin && formState.pin.length < 4) ||
    (formState.showConfirmPin && formState.confirmPin.length < 4) ||
    isIncorrectPin;

  const handleClose = () => {
    if (formState.showConfirmPin) {
      setFormState({ ...formState, showConfirmPin: false, confirmPin: '' });
    } else {
      onClose();
    }
  };

  const handleSubmit = () => {
    if (!formState.showConfirmPin) {
      setFormState({ ...formState, showConfirmPin: true });
    } else {
      const payload = { pin: formState.pin };

      const onSuccess = () => {
        queryClient.invalidateQueries(['profile']);
      };

      createPin(payload, onSuccess);
    }
  };
  return (
    <Modal
      isDrawer
      animationType="fade"
      visible={visible}
      onClose={handleClose}
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
              {en.profile.pinSettings.headerTitle(false)}
            </Heading>

            <Button onPress={handleClose} size="sm" variant="unstyled" p={0}>
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
              <Button onPress={handleClose} p={0} size="sm" variant="unstyled">
                <Icon as={Feather} name="arrow-left" size={`${spacing[24]}px`} color={'gray.500'} />
              </Button>

              <Heading
                maxWidth={WIDTH * 0.6}
                fontSize={`${spacing[16]}px`}
                color={'gray.500'}
                noOfLines={1}
              >
                {en.profile.pinSettings.headerTitle(false)}
              </Heading>

              <Touchable onPress={handleClose}>
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

        {/* Body */}
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps="always"
          showsVerticalScrollIndicator={false}
          keyboardDismissMode="interactive"
        >
          <Box
            px={`${spacing[24]}px`}
            pt={`${spacing[32]}px`}
            _web={{
              pt: { base: `${spacing[100] * 1.24}px`, sm: `${spacing[32]}px` }
            }}
          >
            {!formState.showConfirmPin ? (
              <Flex alignItems="center">
                <Heading fontSize={`${spacing[24]}px`} pb={`${spacing[32]}px`}>
                  {en.profile.pinSettings.createPin.heading}
                </Heading>
                <PinCodeInput
                  value={formState.pin}
                  codeLength={4}
                  autoFocus
                  autoComplete="off"
                  textContentType="none"
                  password
                  onTextChange={pin => setFormState({ ...formState, pin })}
                  label={''}
                  inputAccessoryViewID="Next"
                />
              </Flex>
            ) : (
              <Flex alignItems="center">
                <Heading fontSize={`${spacing[24]}px`} pb={`${spacing[32]}px`}>
                  {en.profile.pinSettings.createPin.confirmPin}
                </Heading>
                <PinCodeInput
                  value={formState.confirmPin}
                  codeLength={4}
                  autoFocus
                  autoComplete="off"
                  textContentType="none"
                  password
                  onTextChange={confirmPin => setFormState({ ...formState, confirmPin })}
                  label={''}
                  inputAccessoryViewID="Next"
                />
                {isIncorrectPin && (
                  <Text fontSize={`${spacing[14]}px`} color={'error.500'} mt={`${spacing[4]}px`}>
                    {en.profile.pinSettings.createPin.incorrectPin}
                  </Text>
                )}
              </Flex>
            )}
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
              {en.profile.trips.info.cancel.cancel}
            </Button>
            <Button
              variant="solid"
              colorScheme="secondary"
              size="md"
              fontFamily="Satoshi-Medium"
              px="18px"
              isDisabled={shouldDisableBtn}
              isLoading={createPinState.isLoading}
              onPress={handleSubmit}
            >
              {en.profile.trips.info.cancel.next}
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
                isDisabled={shouldDisableBtn}
                isLoading={createPinState.isLoading}
                onPress={handleSubmit}
              >
                {en.profile.trips.info.cancel.next}
              </Button>
            </FormButtonContainer>
          </Box>
        </Hidden>
      </Box>
      {createPinState.isSuccess && (
        <SuccessState
          title={en.profile.pinSettings.createPin.success.title}
          text={createPinState?.data?.message}
          btnText={en.profile.pinSettings.createPin.success.btnText}
          onDismiss={() => {
            onClose();
            onSuccess();
          }}
          size={'sm'}
        />
      )}
      {createPinState.isError && (
        <ErrorState
          title={en.profile.pinSettings.createPin.error.title}
          text={createPinState?.error?.message}
          btnText={en.profile.pinSettings.createPin.error.btnText}
          onDismiss={onClose}
          size={'sm'}
        />
      )}
    </Modal>
  );
};

const ResetPin = ({ visible, onClose = () => {}, onSuccess = () => {} }) => {
  const queryClient = useQueryClient();
  const {
    window: { width: WIDTH },
    screen: { height: SCREEN_HEIGHT }
  } = useDimensions();

  const { state } = useAppContext('user');
  const [formState, setFormState] = useState({
    pin: '',
    token: '',
    showResetPin: false
  });

  const { validateResetPin, validateResetPinState } = useValidateResetPinMutation();
  const { processPinReset, processPinResetState } = useProcessPinResetMutation();

  const shouldDisableBtn =
    (!formState.showResetPin && formState.token.length < 5) ||
    (formState.showResetPin && formState.pin.length < 4);

  const handleClose = () => {
    if (formState.showResetPin) {
      setFormState({ ...formState, showResetPin: false, pin: '' });
    } else {
      onClose();
    }
  };

  const handleSubmit = () => {
    if (!formState.showResetPin) {
      const payload = { token: formState.token };

      const onSuccess = () => {
        setFormState({ ...formState, showResetPin: true });
      };

      validateResetPin(payload, onSuccess);
    } else {
      const payload = { token: formState.token, pin: formState.pin };

      const onSuccess = () => {
        queryClient.invalidateQueries(['profile']);
      };

      processPinReset(payload, onSuccess);
    }
  };
  return (
    <Modal
      isDrawer
      animationType="fade"
      visible={visible}
      onClose={handleClose}
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
              {en.profile.pinSettings.headerTitle(true)}
            </Heading>

            <Button onPress={handleClose} size="sm" variant="unstyled" p={0}>
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
              <Button onPress={handleClose} p={0} size="sm" variant="unstyled">
                <Icon as={Feather} name="arrow-left" size={`${spacing[24]}px`} color={'gray.500'} />
              </Button>

              <Heading
                maxWidth={WIDTH * 0.6}
                fontSize={`${spacing[16]}px`}
                color={'gray.500'}
                noOfLines={1}
              >
                {en.profile.pinSettings.headerTitle(true)}
              </Heading>

              <Touchable onPress={handleClose}>
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

        {/* Body */}
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps="always"
          showsVerticalScrollIndicator={false}
          keyboardDismissMode="interactive"
        >
          <Box
            px={`${spacing[24]}px`}
            pt={`${spacing[32]}px`}
            _web={{
              pt: { base: `${spacing[100] * 1.24}px`, sm: `${spacing[32]}px` }
            }}
          >
            {!formState.showResetPin ? (
              <Box>
                <Heading fontSize={`${spacing[24]}px`} pb={`${spacing[32]}px`}>
                  {en.profile.pinSettings.resetPin.validateHeading(state.user?.email)}
                </Heading>
                <PinCodeInput
                  value={formState.token}
                  codeLength={5}
                  autoFocus
                  importantForAutofill="yes"
                  autoComplete={Platform.OS === 'android' ? 'sms-otp' : 'one-time-code'}
                  textContentType="oneTimeCode"
                  onTextChange={token => setFormState({ ...formState, token })}
                  label={''}
                  inputAccessoryViewID="Next"
                />
              </Box>
            ) : (
              <Flex alignItems="center">
                <Heading fontSize={`${spacing[24]}px`} pb={`${spacing[32]}px`}>
                  {en.profile.pinSettings.resetPin.heading}
                </Heading>
                <PinCodeInput
                  value={formState.pin}
                  codeLength={4}
                  autoFocus
                  autoComplete="off"
                  textContentType="none"
                  password
                  onTextChange={pin => setFormState({ ...formState, pin })}
                  label={''}
                  inputAccessoryViewID="Next"
                />
              </Flex>
            )}
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
              {en.profile.trips.info.cancel.cancel}
            </Button>
            <Button
              variant="solid"
              colorScheme="secondary"
              size="md"
              fontFamily="Satoshi-Medium"
              px="18px"
              isDisabled={shouldDisableBtn}
              isLoading={validateResetPinState.isLoading || processPinResetState.isLoading}
              onPress={handleSubmit}
            >
              {en.profile.trips.info.cancel.next}
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
                isDisabled={shouldDisableBtn}
                isLoading={validateResetPinState.isLoading || processPinResetState.isLoading}
                onPress={handleSubmit}
              >
                {en.profile.trips.info.cancel.next}
              </Button>
            </FormButtonContainer>
          </Box>
        </Hidden>
      </Box>
      {(validateResetPinState.isSuccess || validateResetPinState.isError) && (
        <Toast
          useRNModal
          error={validateResetPinState.isError}
          message={validateResetPinState?.error?.message || validateResetPinState?.data?.message}
        />
      )}
      {processPinResetState.isSuccess && (
        <SuccessState
          title={en.profile.pinSettings.resetPin.success.title}
          text={processPinResetState?.data?.message}
          btnText={en.profile.pinSettings.resetPin.success.btnText}
          onDismiss={() => {
            onClose();
            onSuccess();
          }}
          size={'sm'}
        />
      )}
      {processPinResetState.isError && (
        <ErrorState
          title={en.profile.pinSettings.resetPin.error.title}
          text={processPinResetState?.error?.message}
          btnText={en.profile.pinSettings.resetPin.error.btnText}
          onDismiss={onClose}
          size={'sm'}
        />
      )}
    </Modal>
  );
};

const ChangePin = ({ visible, onClose = () => {}, onSuccess = () => {} }) => {
  const queryClient = useQueryClient();
  const {
    window: { width: WIDTH },
    screen: { height: SCREEN_HEIGHT }
  } = useDimensions();

  const [formState, setFormState] = useState({
    formerPin: '',
    newPin: '',
    confirmPin: '',
    showConfirmPin: false
  });

  const { updatePin, updatePinState } = useUpdatePinMutation();

  const isIncorrectPin =
    formState.showConfirmPin &&
    formState.confirmPin.length === 4 &&
    formState.newPin !== formState.confirmPin;

  const shouldDisableBtn =
    (!formState.showConfirmPin && formState.newPin.length < 4) ||
    (!formState.showConfirmPin && formState.formerPin.length < 4) ||
    (formState.showConfirmPin && formState.confirmPin.length < 4) ||
    isIncorrectPin;

  const handleClose = () => {
    if (formState.showConfirmPin) {
      setFormState({ ...formState, showConfirmPin: false, confirmPin: '' });
    } else {
      onClose();
    }
  };

  const handleSubmit = () => {
    if (!formState.showConfirmPin) {
      setFormState({ ...formState, showConfirmPin: true });
    } else {
      const payload = {
        newPin: formState.newPin,
        formerPin: formState.formerPin
      };

      const onSuccess = () => {
        queryClient.invalidateQueries(['profile']);
      };

      updatePin(payload, onSuccess);
    }
  };
  return (
    <Modal
      isDrawer
      animationType="fade"
      visible={visible}
      onClose={handleClose}
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
              {en.profile.pinSettings.changePin.headerTitle}
            </Heading>

            <Button onPress={handleClose} size="sm" variant="unstyled" p={0}>
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
              <Button onPress={handleClose} p={0} size="sm" variant="unstyled">
                <Icon as={Feather} name="arrow-left" size={`${spacing[24]}px`} color={'gray.500'} />
              </Button>

              <Heading
                maxWidth={WIDTH * 0.6}
                fontSize={`${spacing[16]}px`}
                color={'gray.500'}
                noOfLines={1}
              >
                {en.profile.pinSettings.changePin.headerTitle}
              </Heading>

              <Touchable onPress={handleClose}>
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

        {/* Body */}
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps="always"
          showsVerticalScrollIndicator={false}
          keyboardDismissMode="interactive"
        >
          <Box
            px={`${spacing[24]}px`}
            pt={`${spacing[32]}px`}
            _web={{
              pt: { base: `${spacing[100] * 1.24}px`, sm: `${spacing[32]}px` }
            }}
          >
            {!formState.showConfirmPin ? (
              <Flex alignItems="center">
                {/* former pin */}
                <>
                  <Heading fontSize={`${spacing[24]}px`} pb={`${spacing[10]}px`}>
                    {en.profile.pinSettings.changePin.oldPin}
                  </Heading>
                  <Box mb={`${spacing[32]}px`}>
                    <PinCodeInput
                      value={formState.formerPin}
                      codeLength={4}
                      autoFocus
                      autoComplete="off"
                      textContentType="none"
                      password
                      onTextChange={pin => setFormState({ ...formState, formerPin: pin })}
                      label={''}
                      inputAccessoryViewID="Next"
                    />
                  </Box>
                </>
                {/* new Pin */}
                <>
                  <Heading fontSize={`${spacing[24]}px`} pb={`${spacing[10]}px`}>
                    {en.profile.pinSettings.changePin.heading}
                  </Heading>
                  <PinCodeInput
                    value={formState.newPin}
                    codeLength={4}
                    autoComplete="off"
                    textContentType="none"
                    password
                    onTextChange={pin => setFormState({ ...formState, newPin: pin })}
                    label={''}
                    inputAccessoryViewID="Next"
                  />
                </>
              </Flex>
            ) : (
              <Flex alignItems="center">
                <Heading fontSize={`${spacing[24]}px`} pb={`${spacing[32]}px`}>
                  {en.profile.pinSettings.changePin.confirmPin}
                </Heading>
                <PinCodeInput
                  value={formState.confirmPin}
                  codeLength={4}
                  autoFocus
                  autoComplete="off"
                  textContentType="none"
                  password
                  onTextChange={confirmPin => setFormState({ ...formState, confirmPin })}
                  label={''}
                  inputAccessoryViewID="Next"
                />
                {isIncorrectPin && (
                  <Text fontSize={`${spacing[14]}px`} color={'error.500'} mt={`${spacing[4]}px`}>
                    {en.profile.pinSettings.changePin.incorrectPin}
                  </Text>
                )}
              </Flex>
            )}
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
              {en.profile.trips.info.cancel.cancel}
            </Button>
            <Button
              variant="solid"
              colorScheme="secondary"
              size="md"
              fontFamily="Satoshi-Medium"
              px="18px"
              isDisabled={shouldDisableBtn}
              isLoading={updatePinState.isLoading}
              onPress={handleSubmit}
            >
              {en.profile.trips.info.cancel.next}
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
                isDisabled={shouldDisableBtn}
                isLoading={updatePinState.isLoading}
                onPress={handleSubmit}
              >
                {en.profile.trips.info.cancel.next}
              </Button>
            </FormButtonContainer>
          </Box>
        </Hidden>
      </Box>
      {updatePinState.isSuccess && (
        <SuccessState
          title={en.profile.pinSettings.changePin.success.title}
          text={updatePinState?.data?.message}
          btnText={en.profile.pinSettings.changePin.success.btnText}
          onDismiss={() => {
            onClose();
            onSuccess();
          }}
          size={'sm'}
        />
      )}
      {updatePinState.isError && (
        <ErrorState
          title={en.profile.pinSettings.changePin.error.title}
          text={updatePinState?.error?.message}
          btnText={en.profile.pinSettings.changePin.error.btnText}
          onDismiss={onClose}
          size={'sm'}
        />
      )}
    </Modal>
  );
};
