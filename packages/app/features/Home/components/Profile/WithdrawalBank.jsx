import React, { useState } from 'react';
import {
  Box,
  FlatList,
  Flex,
  Heading,
  Hidden,
  HStack,
  Icon,
  Pressable,
  Stack,
  Text,
  VStack
} from 'native-base';
import AccountLayout from 'app/components/Layout/AccountLayout';
import { Button, Container, EmptyState, LoadingState, Toast } from 'app/components/index';
import en from 'app/i18n/index';
import { useBeneficiariesQuery } from 'app/hooks/queries/useBanks';
import { AntDesign, Feather } from '@expo/vector-icons';
import WithdrawalBankModal from 'app/components/Modal/WithdrawalBankModal';
import { useQueryClient } from '@tanstack/react-query';
import { useDeleteBeneficiaryMutation } from 'app/hooks/mutations/useBankDetails';
import ConfirmationModal from 'app/components/Modal/ConfirmationModal';
import spacing from 'app/config/theme/spacing';
import { useCallback } from 'react';
import AmountModal from 'app/components/Modal/AmountModal';
import { resolvePrice } from 'app/utils/resolvePrice';
import useAppContext from 'app/hooks/useAppContext';
import { useWithdrawMutation } from 'app/hooks/mutations/useWallet';
import { useRouter } from 'solito/router';
import PinSettingsModal from 'app/components/Modal/PinSettingsModal';
import CreatePinCard from 'app/components/Cards/CreatePinCard';

function WithdrawalBank() {
  const queryClient = useQueryClient();
  const { back, push } = useRouter();
  const { state } = useAppContext('user');

  const [show, setShow] = useState('');
  const [beneficiaryId, setBeneficiaryId] = useState('');

  const { data: beneficiaries, isLoading } = useBeneficiariesQuery();
  const { withdraw, withdrawState } = useWithdrawMutation();

  const { deleteBeneficiary, deleteBeneficiaryState } = useDeleteBeneficiaryMutation(
    beneficiaryId,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['beneficiaries']);
        setBeneficiaryId('');
      },
      onError: () => {
        setBeneficiaryId('');
      }
    }
  );

  const withdrawToBankAccount = useCallback(
    id => {
      if (!state.user?.hasSetPin) {
        setShow('createPin');
      } else {
        setBeneficiaryId(id);
        setShow('amountModal');
      }
    },
    [state.user?.hasSetPin]
  );

  const renderItem = useCallback(
    ({ item }) => {
      return (
        <Box
          borderWidth={1}
          borderColor="gray.100"
          borderRadius={`${spacing[20]}px`}
          p={`${spacing[24]}px`}
          mb={`${spacing[24]}px`}
          shadow={5}
          bg="white"
        >
          <HStack justifyContent="space-between">
            <Text fontSize={`${spacing[18]}px`} color="gray.300">
              {item.bankName}
            </Text>
            {beneficiaries?.length > 1 && (
              <Button
                variant="unstyled"
                bg="error.100"
                size="sm"
                maxW={`${spacing[36]}px`}
                onPress={() => {
                  setBeneficiaryId(item.uuid);
                  setShow('confirmationModal');
                }}
              >
                <Icon as={Feather} name="trash-2" color="error.600" size={`${spacing[18]}px`} />
              </Button>
            )}
          </HStack>
          <Box mt={`${spacing[14]}px`}>
            <Text fontFamily="Satoshi-Medium" fontSize={`${spacing[24]}px`}>
              {item.accountNumber}
            </Text>
          </Box>
          <Text
            fontSize={`${spacing[16]}px`}
            mt={`${spacing[14]}px`}
            mb={`${spacing[32]}px`}
            fontFamily="Satoshi-Medium"
            color="gray.400"
          >
            {item.accountName}
          </Text>
          <Button
            colorScheme="secondary"
            fontFamily="Satoshi-Medium"
            _text={{ fontSize: `${spacing[14]}px` }}
            maxH={`${spacing[40]}px`}
            minH={`${spacing[40]}px`}
            onPress={() => withdrawToBankAccount(item.uuid)}
            isDisabled={state.user?.wallets[0]?.balance === 0}
          >
            {en.profile.withdrawalBank.info.withdraw.heading}
          </Button>
        </Box>
      );
    },
    [beneficiaries?.length, state.user?.wallets, withdrawToBankAccount]
  );

  const onWithdraw = (amount, pin) => {
    const data = {
      amount,
      bankDetailId: beneficiaryId,
      remark: 'Withdrawal from wallet',
      pin: pin
    };

    const onSuccess = () => {
      queryClient.invalidateQueries(['profile']);
    };

    withdraw(data, onSuccess);
  };

  const withdrawalPayload = {
    ...withdrawState?.data?.data,
    success: {
      title: en.profile.withdrawalBank.info.withdraw.success.title,
      text: en.profile.withdrawalBank.info.withdraw.success.text,
      btnText: en.profile.withdrawalBank.info.withdraw.success.btnText,
      size: 'sm',
      onDismiss: () => push('/profile')
    },
    error: {
      title: en.profile.withdrawalBank.info.withdraw.error.title,
      text: withdrawState?.error?.message,
      btnText: en.profile.withdrawalBank.info.withdraw.error.btnText,
      size: 'sm',
      onDismiss: () => {
        withdrawState.reset();
        back();
      }
    }
  };

  return (
    <>
      {/* larger device(tablet & desktop) for web only */}
      <Hidden only="base">
        <AccountLayout>
          {isLoading ? (
            <Flex mt={`${spacing[100] * 1.5}`}>
              <LoadingState />
            </Flex>
          ) : (
            <Box mt="46px">
              <Box mb={{ base: '30px', md: '46px', lg: '64px' }}>
                <Heading fontSize="24px">{en.profile.withdrawalBank.info.title}</Heading>
              </Box>
              <HStack space="2%" flexWrap="wrap">
                {beneficiaries?.map(beneficiary => (
                  <Stack
                    key={beneficiary.uuid}
                    p="24px"
                    borderWidth={1}
                    borderRadius="8px"
                    borderColor="gray.100"
                    width={{ base: '48.5%', xl: '32%' }}
                    space="48px"
                    mb="24px"
                  >
                    <HStack justifyContent="space-between">
                      <Text fontFamily="Satoshi-Medium" color="gray.300">
                        {beneficiary.bankName}
                      </Text>
                      <Button
                        variant="unstyled"
                        size="sm"
                        onPress={() => {
                          setBeneficiaryId(beneficiary.uuid);
                          setShow('confirmationModal');
                        }}
                      >
                        <Icon as={Feather} name="trash-2" color="error.600" size="24px" />
                      </Button>
                    </HStack>
                    <Box>
                      <Text fontSize="18px" fontFamily="Satoshi-Medium" color="gray.300">
                        {beneficiary.accountName}
                      </Text>
                      <Heading fontSize="36px" mt="14px">
                        {beneficiary.accountNumber}
                      </Heading>
                    </Box>
                    <Button
                      variant="subtle"
                      fontFamily="Satoshi-Medium"
                      _text={{
                        fontSize: '16px'
                      }}
                      leftIcon={<Icon as={Feather} name="download" />}
                      onPress={() => withdrawToBankAccount(beneficiary.uuid)}
                    >
                      {en.profile.withdrawalBank.info.withdraw.heading}
                    </Button>
                  </Stack>
                ))}
                <Pressable
                  p="24px"
                  mb="24px"
                  width={{ base: '48.5%', xl: '32%' }}
                  borderWidth={1}
                  alignItems="center"
                  justifyContent="center"
                  borderRadius="8px"
                  borderColor="gray.100"
                  onPress={() => setShow('withdrawalBank')}
                >
                  <VStack
                    bg="primary.50"
                    alignItems="center"
                    justifyContent="center"
                    borderRadius="8px"
                    w="56px"
                    h="56px"
                    mb="24px"
                  >
                    <Icon as={Feather} name="plus-square" color="primary.700" size="24px" />
                  </VStack>
                  <Text
                    fontSize="20px"
                    fontFamily="Satoshi-Medium"
                    textAlign="center"
                    color="gray.300"
                  >
                    {en.profile.withdrawalBank.info.add}
                  </Text>
                </Pressable>
              </HStack>
            </Box>
          )}
        </AccountLayout>
      </Hidden>

      {/* smaller device(mobile phones)for web & mobile app */}
      <Hidden from="sm">
        <Container
          pt={0}
          px={0}
          headerTitle={en.profile.withdrawalBank.info.heading}
          justifyContent="space-between"
        >
          <Box>
            {isLoading ? (
              <Flex
                _web={{ pt: '25vh' }}
                width="100%"
                height="100%"
                alignItems="center"
                justifyContent="center"
              >
                <LoadingState />
              </Flex>
            ) : (
              <>
                {beneficiaries?.length === 0 ? (
                  <Box maxH="84%" _web={{ mt: '10vh' }}>
                    <EmptyState message={en.profile.withdrawalBank.info.nodata} bg="white" />
                  </Box>
                ) : (
                  <FlatList
                    data={beneficiaries}
                    renderItem={renderItem}
                    keyExtractor={item => item.uuid}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                      paddingHorizontal: spacing[24]
                    }}
                    ListHeaderComponent={
                      <Heading
                        fontSize={`${spacing[20]}px`}
                        pb={`${spacing[32]}px`}
                        pt={`${spacing[32]}px`}
                      >
                        {en.profile.withdrawalBank.info.title}
                      </Heading>
                    }
                    _web={{
                      mb: '16vh',
                      overflowY: 'scroll',
                      height: { base: '84vh', sm: 'inherit' }
                    }}
                  />
                )}
                <Box
                  h="16%"
                  w="100%"
                  bg="white"
                  px={`${spacing[24]}px`}
                  pt={`${spacing[20]}px`}
                  _web={{ position: 'fixed', bottom: 0 }}
                >
                  <Button
                    colorScheme="secondary"
                    variant="outline"
                    fontFamily="Satoshi-Medium"
                    size="xl"
                    leftIcon={<Icon as={AntDesign} name="pluscircleo" />}
                    onPress={() => setShow('withdrawalBank')}
                  >
                    {en.profile.withdrawalBank.info.withdraw.title}
                  </Button>
                </Box>
              </>
            )}
          </Box>
        </Container>
      </Hidden>

      {show === 'withdrawalBank' && <WithdrawalBankModal visible onClose={() => setShow('')} />}

      {beneficiaryId !== '' && show === 'confirmationModal' && (
        <ConfirmationModal
          heading={en.profile.withdrawalBank.info.withdraw.delete.heading}
          message={en.profile.withdrawalBank.info.withdraw.delete.message}
          visible
          onClose={() => setBeneficiaryId('')}
          isSubmitting={deleteBeneficiaryState.isLoading}
          onSubmit={deleteBeneficiary}
        />
      )}

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
          heading={en.profile.withdrawalBank.info.withdraw.withdrawalAmount}
          headerTitle={en.profile.withdrawalBank.info.withdraw.walletBalance(
            resolvePrice(state.user?.wallets[0]?.currency, state.user?.wallets[0]?.balance)
          )}
          visible
          payload={{ ...withdrawalPayload, paymentType: 'wallet' }}
          isSuccess={withdrawState.isSuccess}
          isError={withdrawState.isError}
          errorMessage={withdrawState.error?.message}
          isSubmitting={withdrawState.isLoading}
          onClose={() => {
            setShow('');
            withdrawState.reset();
          }}
          onSubmit={onWithdraw}
        />
      )}

      {(deleteBeneficiaryState.isSuccess || deleteBeneficiaryState.isError) && (
        <Toast
          useRNModal
          error={deleteBeneficiaryState.isError}
          message={deleteBeneficiaryState.data?.message || deleteBeneficiaryState.error?.message}
        />
      )}
    </>
  );
}

export default WithdrawalBank;
