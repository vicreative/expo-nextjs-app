import { AntDesign, Feather } from '@expo/vector-icons';
import AmountText from 'app/components/AmountText';
import ErrorState from 'app/components/ErrorState';
import Touchable from 'app/components/Gestures/Touchable';
import SuccessState from 'app/components/SuccessState';
import spacing from 'app/config/theme/spacing';
import { STATUS_BAR_HEIGHT } from 'app/constants/index';
import useAppContext from 'app/hooks/useAppContext';
import useDimensions from 'app/hooks/useDimensions';
import en from 'app/i18n/index';
import { Box, Divider, Flex, Heading, Hidden, HStack, Icon, Text } from 'native-base';
import { useState } from 'react';
import { resolvePrice } from 'app/utils/resolvePrice';
import { Button, FormButtonContainer, Input, PinCodeInput, Toast } from '..';
import Modal from './index';

function AmountModal({
  payload,
  errorMessage,
  visible = false,
  isSubmitting = false,
  isError = false,
  isSuccess = false,
  shouldEnterPin = false,
  amount = '',
  onClose = () => {},
  headerTitle = en.profile.fundWallet.fundBy.amount.headerTitle,
  heading = en.profile.fundWallet.fundBy.amount.totalAmount,
  onSubmit = () => {}
}) {
  const {
    window: { width: WIDTH },
    screen: { height: SCREEN_HEIGHT }
  } = useDimensions();

  const [value, setValue] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [pin, setPin] = useState('');
  const { state } = useAppContext('user');

  const handleClose = () => {
    if (shouldEnterPin && showPin) {
      setShowPin(false);
    } else {
      onClose();
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
            <Heading fontSize={`${spacing[24]}px`}>{headerTitle}</Heading>

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
                {headerTitle}
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

        <Flex
          height="86%"
          _web={{
            height: { base: `96%`, sm: '84%' },
            pt: { base: `${spacing[100]}px`, sm: 0 }
          }}
          justifyContent="space-between"
          px={`${spacing[24]}px`}
          w="100%"
        >
          {showPin ? (
            <Flex alignItems="center" pt={`${spacing[40]}px`}>
              <HStack
                justifyContent="space-between"
                alignItems="center"
                space={`${spacing[20]}px`}
                w="100%"
              >
                <Text>{heading}</Text>
                {amount ? (
                  <AmountText textAlign="center" amount={amount} fontSize={spacing[18]} />
                ) : (
                  <Heading fontSize={`${spacing[18]}px`}>
                    {resolvePrice(state.currency?.name, value)}
                  </Heading>
                )}
              </HStack>
              <Divider bg="gray.100" thickness="1" my={`${spacing[24]}px`} />

              <Heading
                pt={`${spacing[24]}px`}
                pb={`${spacing[18]}px`}
                textAlign="center"
                fontSize={`${spacing[24]}px`}
              >
                Enter your PIN
              </Heading>

              <PinCodeInput
                value={pin}
                codeLength={4}
                autoFocus
                autoComplete="off"
                textContentType="none"
                password
                onTextChange={pin => setPin(pin)}
                label={''}
                inputAccessoryViewID="Next"
              />
            </Flex>
          ) : (
            <Box>
              <Text
                pb={`${spacing[18]}px`}
                pt={`${spacing[50]}px`}
                textAlign="center"
                fontSize={`${spacing[18]}px`}
              >
                {heading}
              </Text>
              {amount ? (
                <AmountText textAlign="center" amount={amount} fontSize={spacing[36]} />
              ) : (
                <Input type="currency-amount" value={value} onChangeText={setValue} />
              )}
            </Box>
          )}

          <Box pt={`${spacing[20]}px`} w="100%">
            <FormButtonContainer>
              <Button
                variant="solid"
                colorScheme="secondary"
                w="100%"
                isDisabled={
                  isSubmitting || (!amount && value === '') || (showPin && pin.length < 4)
                }
                isLoading={isSubmitting}
                onPress={() => {
                  if (shouldEnterPin && pin.length < 4) {
                    setShowPin(true);
                  } else {
                    onSubmit(amount ? amount : value, pin);
                  }
                }}
              >
                {en.profile.fundWallet.fundBy.amount.btnText}
              </Button>
            </FormButtonContainer>
          </Box>
        </Flex>
      </Box>

      {isError && payload?.paymentType === 'wallet' && errorMessage === 'Incorrect PIN' && (
        <Toast useRNModal error={isError} message={errorMessage} />
      )}

      {isError && payload?.paymentType !== 'wallet' && (
        <Toast useRNModal error={isError} message={errorMessage} />
      )}

      {payload?.paymentType === 'wallet' && isSuccess && (
        <SuccessState
          title={payload.success.title}
          text={payload.success.text}
          btnText={payload.success.btnText}
          onDismiss={() => {
            onClose();
            payload.success.onDismiss();
          }}
          size={payload.success.size}
        />
      )}

      {payload?.paymentType === 'wallet' && isError && errorMessage !== 'Incorrect PIN' && (
        <ErrorState
          title={`Opps...there’s an error`}
          text={errorMessage}
          btnText={payload.error.btnText}
          onDismiss={() => {
            onClose();
            payload.error.onDismiss();
          }}
          size={payload.success.size}
        />
      )}
    </Modal>
  );
}

export default AmountModal;
