import { AntDesign, Entypo, Feather } from '@expo/vector-icons';
import { useQueryClient } from '@tanstack/react-query';
import Touchable from 'app/components/Gestures/Touchable';
import { CreditCardOutline } from 'app/components/Icons/CreditCard';
import AmountModal from 'app/components/Modal/AmountModal';
import PaystackModal from 'app/components/Modal/PaystackModal';
import spacing from 'app/config/theme/spacing';
import { useRefillWalletMutation } from 'app/hooks/mutations/useWallet';
import useAppContext from 'app/hooks/useAppContext';
import en from 'app/i18n/index';
import { Box, Flex, Heading, Hidden, HStack, Icon, ScrollView, Stack, Text } from 'native-base';
import { useState } from 'react';
import { useRouter } from 'solito/router';
import copyToClipboard from 'app/utils/copyToClipboard';
import PaymentWithStripe from 'app/components/Modal/PaymentWithStripe';
import { Platform } from 'react-native';
import Modal from './index';
import useDimensions from 'app/hooks/useDimensions';
import { STATUS_BAR_HEIGHT } from 'app/constants/index';
import Button from '../Button';
import VirtualBankCard from 'app/components/VirtualBankCard';
import env from 'app/config/env';
import useWindow from 'app/hooks/useWindow';

function FundWalletModal({ visible, onClose = () => {} }) {
  const window = useWindow();
  const { push, replace } = useRouter();
  const queryClient = useQueryClient();
  const { state } = useAppContext('user');
  const [showAmountModal, setShowAmountModal] = useState(false);
  const [modalToShow, setModalToShow] = useState('');

  const {
    window: { width: WIDTH },
    screen: { height: SCREEN_HEIGHT }
  } = useDimensions();

  const isStripePaymentSuccessful =
    Platform.OS === 'web' ? (window?.location?.search === '?success=true' ? true : false) : false;

  const { refillWallet, refillWalletState } = useRefillWalletMutation();

  const handleSubmit = amount => {
    const payload = { amount, isMobile: Platform.OS !== 'web' };

    refillWallet(payload, data => {
      if (state.user?.profile?.country === 'Nigeria') {
        setShowAmountModal(false);
        setModalToShow('paystack');
      } else {
        if (Platform.OS === 'web') {
          push(data?.data?.paymentUrl);
        } else {
          setModalToShow('stripe');
        }
      }
    });
  };

  const goToProfile = () => {
    queryClient.invalidateQueries(['profile']);
    setModalToShow('');
    onClose();

    if (WIDTH < 600) {
      push('/profile');
    } else {
      replace('/profile/transactions', undefined, {
        experimental: {
          nativeBehavior: 'stack-replace'
        }
      });
    }
  };

  const refillPaymentPayload = {
    ...refillWalletState?.data?.data,
    currency: refillWalletState?.data?.data?.baseCurrency,
    email: state.user?.email,
    success: {
      title: en.profile.fundWallet.fundBy.success.title,
      btnText: en.profile.fundWallet.fundBy.success.btnText,
      size: 'sm',
      onDismiss: goToProfile
    },
    error: {
      title: en.profile.fundWallet.fundBy.error.title,
      text: refillWalletState.error?.message,
      btnText: en.profile.fundWallet.fundBy.error.btnText,
      size: 'sm',
      onDismiss: onClose
    },
    onDismiss: () => setModalToShow('')
  };

  return (
    <Modal
      isDrawer
      animationType="fade"
      visible={visible}
      onClose={onClose}
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
            <Heading fontSize={`${spacing[24]}px`}>{en.profile.fundWallet.headerTitle}</Heading>

            <Button onPress={onClose} size="sm" variant="unstyled" p={0}>
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
              <Button onPress={onClose} p={0} size="sm" variant="unstyled">
                <Icon as={Feather} name="arrow-left" size={`${spacing[24]}px`} color={'gray.500'} />
              </Button>

              <Heading
                maxWidth={WIDTH * 0.6}
                fontSize={`${spacing[16]}px`}
                color={'gray.500'}
                noOfLines={1}
              >
                {en.profile.fundWallet.headerTitle}
              </Heading>

              <Touchable onPress={onClose}>
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

        <ScrollView pt={`${spacing[40]}px`} showsVerticalScrollIndicator={false}>
          <Box
            px={`${spacing[24]}px`}
            _web={{ pt: { base: `${spacing[100]}px`, sm: 0 } }}
            w="100%"
            pb={`${spacing[100]}px`}
          >
            {state.user?.dedicatedBankAccounts?.length > 0 && (
              <>
                <Heading fontSize={`${spacing[20]}px`} pb={`${spacing[32]}px`}>
                  {en.profile.fundWallet.heading}
                </Heading>
                <Stack space={`${spacing[24]}px`} pb={`${spacing[40]}px`}>
                  {state.user?.dedicatedBankAccounts.map(bank => (
                    <VirtualBankCard
                      key={bank.uuid}
                      bankName={bank.bankName}
                      accountNumber={bank.accountNumber}
                      onCopy={() => copyToClipboard(bank.accountNumber)}
                    />
                  ))}
                </Stack>
              </>
            )}
            <Heading fontSize={`${spacing[20]}px`} pb={`${spacing[20]}px`}>
              {en.profile.fundWallet.fundBy.heading}
            </Heading>
            <Touchable
              borderWidth={1}
              borderColor={'gray.100'}
              bg="white"
              px={`${spacing[20]}px`}
              py={`${spacing[18]}px`}
              borderRadius={`${spacing[10]}px`}
              flexDirection="row"
              width="100%"
              justifyContent="space-between"
              onPress={() => setShowAmountModal(true)}
            >
              <HStack space={`${spacing[20]}px`}>
                <CreditCardOutline />
                <Stack>
                  <Text fontFamily="Satoshi-Medium">{en.profile.fundWallet.fundBy.card}</Text>
                </Stack>
              </HStack>
              <Icon
                as={Entypo}
                name="chevron-thin-right"
                size={`${spacing[18]}px`}
                color="gray.500"
              />
            </Touchable>
          </Box>
        </ScrollView>

        {showAmountModal && (
          <AmountModal
            visible
            isSubmitting={refillWalletState.isLoading}
            isError={refillWalletState.isError}
            errorMessage={refillWalletState.error?.message}
            onClose={() => {
              setShowAmountModal(false);
              refillWalletState.reset();
            }}
            onSubmit={handleSubmit}
          />
        )}

        {modalToShow === 'stripe' || isStripePaymentSuccessful ? (
          <PaymentWithStripe
            returnUrl={`${env.APP_SCHEME}://profile?success=true`}
            payload={refillPaymentPayload}
            onCancel={() => setModalToShow('')}
            onClose={() => setShowAmountModal(false)}
          />
        ) : null}

        {refillWalletState.isSuccess && modalToShow === 'paystack' && (
          <PaystackModal payload={refillPaymentPayload} />
        )}
      </Box>
    </Modal>
  );
}

export default FundWalletModal;
