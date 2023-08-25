import { useState } from 'react';
import Modal from './index';
import { AntDesign } from '@expo/vector-icons';
import { BankOutline } from 'app/components/Icons/Bank';
import { CreditCardOutline } from 'app/components/Icons/CreditCard';
import spacing from 'app/config/theme/spacing';
import useAppContext from 'app/hooks/useAppContext';
import en from 'app/i18n/index';
import { Heading, HStack, Box, Icon, Text } from 'native-base';
import Button from '../Button';
import OptionGroup from 'app/components/OptionGroup';
import { resolvePrice } from 'app/utils/resolvePrice';
import AmountText from 'app/components/AmountText';
import AmountModal from './AmountModal';
import { Toast } from '..';
import CreatePinCard from 'app/components/Cards/CreatePinCard';
import PinSettingsModal from './PinSettingsModal';

function PayWithModal({
  amount = 0,
  payload,
  visible = false,
  isError = false,
  isSuccess = false,
  isInitiatingCardPayment = false,
  isInitiatingWalletPayment = false,
  onCloseWallet = () => {},
  onClose = () => {},
  onPayWithCard = () => {},
  onPayWithWallet = () => {}
}) {
  const [show, setShow] = useState('');
  const [selected, setSelected] = useState('');
  const { state: userState } = useAppContext('user');

  const payWithCard = () => {
    if (userState.user?.profile?.country === 'Nigeria') {
      onPayWithCard('paystack');
    } else {
      onPayWithCard('stripe');
    }
  };

  const payWithWallet = () => {
    if (!userState.user?.hasSetPin) {
      setShow('createPin');
    } else {
      setShow('amountModal');
    }
  };

  const WalletBalance = () =>
    userState.user?.wallets?.length && (
      <Text>
        ({' '}
        <AmountText
          amount={resolvePrice(
            userState.user?.wallets[0]?.currency,
            userState.user?.wallets[0]?.balance
          )}
          fontSize={spacing[16]}
        />{' '}
        )
      </Text>
    );

  const options = [
    {
      id: userState.user?.profile?.country === 'Nigeria' ? 'cardLocal' : 'cardGlobal',
      title: en.experiences.bookExperience.pay.payWith.creditCard,
      icon: <CreditCardOutline />,
      onPress: payWithCard,
      isLoading: isInitiatingCardPayment
    },
    {
      id: 'wallet',
      title: en.experiences.bookExperience.pay.payWith.wallet,
      icon: <BankOutline />,
      content: <WalletBalance />,
      onPress: payWithWallet,
      disabled:
        userState.user?.wallets[0]?.balance === 0 ||
        userState.user?.wallets[0]?.balance < amount.slice(1).replace(/,/g, '')
          ? true
          : false
    }
  ];

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
        borderTopRadius={`${spacing[20]}px`}
        height={{ base: 'auto', sm: '100%' }}
        shadow={5}
      >
        <HStack
          justifyContent="space-between"
          px={`${spacing[24]}px`}
          pt={`${spacing[38]}px`}
          pb={`${spacing[24]}px`}
          width="100%"
          borderBottomWidth={1}
          borderBottomColor="gray.100"
        >
          <Heading fontSize={`${spacing[24]}px`}>
            {en.experiences.bookExperience.pay.payWith.heading}
          </Heading>

          <Button onPress={onClose} size="sm" variant="unstyled" p={0}>
            <Icon as={AntDesign} name="closecircleo" size={`${spacing[30]}px`} color={'gray.500'} />
          </Button>
        </HStack>

        <Box
          px={`${spacing[24]}px`}
          pt={`${spacing[24]}px`}
          pb={`${spacing[60]}px`}
          w="100%"
          overflow="scroll"
        >
          <OptionGroup selected={selected} onChange={id => setSelected(id)} options={options} />
          {/* <Text fontSize={`${spacing[14]}px`} pt={`${spacing[24]}px`}>
          {en.experiences.bookExperience.pay.payWith.tip}
        </Text> */}
        </Box>
      </Box>
      {show === 'createPin' && <CreatePinCard onPress={() => setShow('pinSettings')} />}

      {show === 'pinSettings' && (
        <PinSettingsModal
          visible
          onClose={() => setShow('')}
          onSuccess={() => setShow('amountModal')}
        />
      )}

      {show === 'amountModal' && (
        <AmountModal
          shouldEnterPin
          heading={en.experiences.bookExperience.pay.totalDue}
          headerTitle={en.profile.withdrawalBank.info.withdraw.walletBalance(
            resolvePrice(userState.user?.wallets[0]?.currency, userState.user?.wallets[0]?.balance)
          )}
          payload={{ ...payload, paymentType: selected }}
          amount={amount}
          visible
          isError={isError}
          isSuccess={isSuccess}
          errorMessage={payload.error.text}
          isSubmitting={isInitiatingWalletPayment}
          onClose={() => {
            setShow('');
            onCloseWallet();
          }}
          onSubmit={onPayWithWallet}
        />
      )}

      {isError && (selected === 'cardLocal' || selected === 'cardGlobal') && (
        <Toast useRNModal error={isError} message={payload.error.text} />
      )}
    </Modal>
  );
}

export default PayWithModal;
