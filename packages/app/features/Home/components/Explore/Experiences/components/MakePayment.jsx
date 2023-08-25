import { useQueryClient } from '@tanstack/react-query';
import AmountText from 'app/components/AmountText';
import { Button } from 'app/components/index';
import PaystackModal from 'app/components/Modal/PaystackModal';
import PayWithModal from 'app/components/Modal/PayWithModal';
import spacing from 'app/config/theme/spacing';
import { initialExperienceState } from 'app/context/ExperienceContext';
import { useCreateBookingMutation } from 'app/hooks/mutations/useBooking';
import useAppContext from 'app/hooks/useAppContext';
import useToast from 'app/hooks/useToast';
import en from 'app/i18n/index';
import { Flex, HStack, Skeleton, Stack, Text } from 'native-base';
import { useState } from 'react';
import { Platform } from 'react-native';
import { useRouter } from 'solito/router';
import { resolvePriceInLocalCurrency, resolveProcessorFee } from 'app/utils/resolvePrice';
import { validateBookExperience } from './schema';
import PaymentWithStripe from 'app/components/Modal/PaymentWithStripe';
import env from 'app/config/env';
import useScreenParams from 'app/hooks/useScreenParams';
import useWindow from 'app/hooks/useWindow';

export default function MakePayment() {
  const toast = useToast();
  const window = useWindow();
  const { push } = useRouter();
  const queryClient = useQueryClient();
  const { id, scheduleId } = useScreenParams();

  const { state: userState } = useAppContext('user');
  const { state, dispatch } = useAppContext('experienceDetails');
  const { createBooking, createBookingState } = useCreateBookingMutation();

  const [showPayWithSheet, setShowPayWithSheet] = useState(false);
  const [modalToShow, setModalToShow] = useState('');

  const isStripePaymentSuccessful =
    Platform.OS === 'web' ? (window?.location?.search === '?success=true' ? true : false) : false;

  const discounts = state.experience?.discounts;

  const discount =
    state.experience?.bookingSetting?.bookingType === 'PRIVATE'
      ? null
      : discounts?.find(discount =>
          state.noOfAdults >= discount.minUnits && state.noOfAdults <= discount.maxUnits
            ? discount
            : undefined
        );

  const processorFeeInUSD = resolveProcessorFee(
    'USD',
    userState.currency?.rateInfo,
    userState.processorFee
  );

  const totalAmount = state.isPrivateBooking
    ? Number(state.experience?.privateGroupPrice)
    : Number(state.experience?.pricePerHead) * state.noOfAdults;

  const totalAmountPlusProcessorFeeInUSD = Number(processorFeeInUSD) + totalAmount;

  const discountOff = Number(state.experience?.pricePerHead) * state.noOfAdults * discount?.ratio;

  const totalAmountToPay = discount
    ? totalAmountPlusProcessorFeeInUSD - discountOff
    : totalAmountPlusProcessorFeeInUSD;

  const viewPlans = () => {
    queryClient.invalidateQueries(['tickets']);
    queryClient.invalidateQueries(['experience', state.experience?.uuid]);
    dispatch(initialExperienceState(false));

    push('/trips');
    setModalToShow('');
  };

  const bookingPayload = {
    ...createBookingState?.data?.data,
    currency: createBookingState?.data?.data?.baseCurrency,
    email: userState.user?.email,
    amount: Number(createBookingState?.data?.data?.amount),
    success: {
      title: en.experiences.bookExperience.pay.success.title,
      text: en.experiences.bookExperience.pay.success.text,
      btnText: en.experiences.bookExperience.pay.success.btnText,
      size: 'sm',
      onDismiss: viewPlans
    },
    error: {
      title: en.experiences.bookExperience.pay.error.title,
      text: createBookingState.error?.message,
      btnText: en.experiences.bookExperience.pay.error.btnText,
      size: 'sm',
      onDismiss: () => {
        setShowPayWithSheet(false);
        createBookingState.reset();
        setModalToShow('');
      }
    },
    onDismiss: () => {
      setModalToShow('');
      createBookingState.reset();
    }
  };

  const onMakePayment = () => {
    validateBookExperience(toast, state, () => setShowPayWithSheet(!showPayWithSheet));
  };

  const withGroup = state.selectedGroupSize === 1;
  const justMe = !withGroup && state.noOfAdults === 1;
  const hasOtherParticipants = state.noOfAdults > 1;

  let data;

  if (justMe) {
    data = {
      scheduleId: state.schedule.uuid
    };
  }

  if (withGroup) {
    data = {
      scheduleId: state.schedule.uuid,
      conversationId: state.selectedGroupId
    };
  }

  if (hasOtherParticipants) {
    data = {
      scheduleId: state.schedule.uuid,
      otherParticipants: state.participants
    };
  }

  const payWithCard = type => {
    const payload = {
      ...data,
      isMobile: Platform.OS !== 'web',
      paymentMethod: 'card',
      isPrivateBooking: state.isPrivateBooking
    };

    const onSuccess = data => {
      if (type == 'stripe') {
        if (Platform.OS === 'web') {
          push(data?.data?.paymentUrl);
        } else {
          setModalToShow('stripe');
        }
      } else {
        setModalToShow('paystack');
        setShowPayWithSheet(false);
      }
    };

    createBooking(payload, onSuccess);
  };

  const payWithWallet = (amount, pin) => {
    const payload = {
      ...data,
      pin,
      isMobile: Platform.OS !== 'web',
      paymentMethod: 'wallet',
      isPrivateBooking: state.isPrivateBooking
    };

    const onSuccess = () => {
      queryClient.invalidateQueries(['profile']);
    };

    createBooking(payload, onSuccess);
  };

  return (
    <>
      <Skeleton
        isLoaded={!state.isLoading}
        p={`${spacing[16]}px`}
        mt={`${spacing[40]}px`}
        height={`${spacing[100] * 2}px`}
        borderRadius={{ base: 0, sm: `${spacing[10]}px` }}
      >
        <Flex position="relative" width="100%" height={{ base: 'auto', sm: '70%' }}>
          <Stack
            width="100%"
            bg="gray.500"
            borderRadius={{ base: 0, sm: `${spacing[10]}px` }}
            space={`${spacing[26]}px`}
            px={`${spacing[24]}px`}
            pt={`${spacing[20]}px`}
            pb={`${spacing[60]}px`}
            mt={`${spacing[40]}px`}
            _web={{
              top: 100,
              position: 'sticky'
            }}
          >
            <Stack alignItems="center" width="100%">
              {discount && (
                <HStack width="100%" justifyContent="flex-end" space={`${spacing[12]}px`}>
                  <AmountText
                    color="white"
                    strikeThrough
                    amount={resolvePriceInLocalCurrency(userState.currency, totalAmount)}
                    fontSize={spacing[14]}
                  />
                </HStack>
              )}

              <HStack alignItems="center" justifyContent="space-between" width="100%">
                <Text color="white" fontSize={`${spacing[18]}px`}>
                  {en.experiences.bookExperience.pay.totalDue}
                </Text>
                <AmountText
                  color="white"
                  amount={resolvePriceInLocalCurrency(userState.currency, totalAmountToPay)}
                  fontSize={spacing[24]}
                />
              </HStack>
            </Stack>

            <Button
              colorScheme="white"
              variant="solid"
              bg="white"
              _hover={{ bg: 'white' }}
              size="xl"
              _text={{ color: 'gray.500' }}
              onPress={onMakePayment}
            >
              {en.experiences.bookExperience.pay.makePayment}
            </Button>
          </Stack>
        </Flex>
      </Skeleton>

      {modalToShow === 'stripe' || isStripePaymentSuccessful ? (
        <PaymentWithStripe
          returnUrl={`${env.APP_SCHEME}://experiences/${id}/schedule/${scheduleId}?success=true`}
          payload={bookingPayload}
          onCancel={() => setModalToShow('')}
          onClose={() => setShowPayWithSheet(false)}
        />
      ) : null}

      {showPayWithSheet && (
        <PayWithModal
          amount={resolvePriceInLocalCurrency(userState.currency, totalAmountToPay)}
          visible
          onClose={() => {
            setShowPayWithSheet(!showPayWithSheet);
            createBookingState.reset();
          }}
          onPayWithCard={payWithCard}
          onPayWithWallet={payWithWallet}
          isInitiatingCardPayment={createBookingState.isLoading}
          isInitiatingWalletPayment={createBookingState.isLoading}
          isError={createBookingState.isError}
          isSuccess={createBookingState.isSuccess}
          onCloseWallet={() => createBookingState.reset()}
          payload={bookingPayload}
        />
      )}

      {createBookingState.isSuccess && modalToShow === 'paystack' && (
        <PaystackModal payload={bookingPayload} />
      )}
    </>
  );
}
