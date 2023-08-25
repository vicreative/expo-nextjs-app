import { Feather } from '@expo/vector-icons';
import AmountText from 'app/components/AmountText';
import Touchable from 'app/components/Gestures/Touchable';
import ProcessorFeeModal from 'app/components/Modal/ProcessorFeeModal';
import spacing from 'app/config/theme/spacing';
import useAppContext from 'app/hooks/useAppContext';
import en from 'app/i18n/index';
import { Box, Divider, Heading, HStack, Icon, Skeleton, Stack, Text } from 'native-base';
import {
  resolvePriceInLocalCurrency,
  resolvePrice,
  resolveProcessorFee
} from 'app/utils/resolvePrice';

export default function PriceDetails() {
  const { state, dispatch } = useAppContext('experienceDetails');
  const { state: userState } = useAppContext('user');

  const discounts = state.experience?.discounts;

  const discount =
    state.experience?.bookingSetting?.bookingType === 'PRIVATE'
      ? null
      : discounts?.find(discount =>
          state.noOfAdults >= discount.minUnits && state.noOfAdults <= discount.maxUnits
            ? discount
            : undefined
        );

  const processorFee = resolveProcessorFee(
    userState.currency?.name,
    userState.currency?.rateInfo,
    userState.processorFee
  );

  const totalAmount = state.isPrivateBooking
    ? state.experience?.privateGroupPrice
    : state.experience?.pricePerHead * state.noOfAdults;

  const discountOff = totalAmount * discount?.ratio;

  const totalAmountToPay = discount ? totalAmount - discountOff : totalAmount;

  return (
    <>
      <Stack space={`${spacing[14]}px`} mt={`${spacing[40]}px`} mb={`${spacing[40]}px`}>
        <Skeleton
          isLoaded={!state.isLoading}
          p={{ base: `${spacing[16]}px`, sm: `${spacing[20]}px` }}
          width="100%"
          height="286px"
          borderRadius={`${spacing[10]}px`}
        >
          <Box borderWidth={1} borderColor="gray.100" borderRadius={`${spacing[10]}px`}>
            <Heading
              fontSize={`${spacing[20]}px`}
              pt={{ base: `${spacing[16]}px`, sm: `${spacing[24]}px` }}
              px={{ base: `${spacing[16]}px`, sm: `${spacing[32]}px` }}
            >
              {en.experiences.bookExperience.priceDetails.heading}
            </Heading>
            <Divider bg="gray.100" thickness="1" my={`${spacing[18]}px`} />
            <Stack
              space={`${spacing[4]}px`}
              pb={{ base: `${spacing[16]}px`, sm: `${spacing[24]}px` }}
              px={{ base: `${spacing[16]}px`, sm: `${spacing[32]}px` }}
            >
              <HStack w="100%" justifyContent="space-between" alignItems="center">
                {state.isPrivateBooking ? (
                  <Text>
                    {en.experiences.bookExperience.privateBooking.privatePrice(state.noOfAdults)}
                  </Text>
                ) : (
                  <Text>
                    <AmountText
                      amount={resolvePriceInLocalCurrency(
                        userState.currency,
                        state.experience?.pricePerHead
                      )}
                      fontFamily="Satoshi-Regular"
                      fontSize={spacing[16]}
                    />
                    {` x ${state.noOfAdults}`}
                  </Text>
                )}

                <AmountText
                  strikeThrough={discount ? true : false}
                  amount={resolvePriceInLocalCurrency(userState.currency, totalAmount)}
                  fontSize={discount ? spacing[16] : spacing[20]}
                />
              </HStack>

              {discount && (
                <HStack
                  space={`${spacing[10]}px`}
                  w="100%"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Text
                    fontFamily="Satoshi-Medium"
                    fontSize={`${spacing[14]}px`}
                    color="primary.700"
                  >
                    {en.experiences.bookExperience.priceDetails.discount(
                      `${discount.ratio * 100}%`,
                      state.noOfAdults
                    )}
                  </Text>
                  <AmountText
                    amount={resolvePriceInLocalCurrency(userState.currency, totalAmountToPay)}
                    fontSize={spacing[20]}
                  />
                </HStack>
              )}

              {/* Processor fee */}
              <HStack w="100%" justifyContent="space-between" alignItems="center">
                <HStack space={`${spacing[10]}px`} alignItems="center">
                  <Text>{en.experiences.bookExperience.priceDetails.processorFee}</Text>
                  <Touchable onPress={() => dispatch({ ...state, showProcessorFeeModal: true })}>
                    <Icon name="info" as={Feather} size={`${spacing[20]}px`} color="primary.600" />
                  </Touchable>
                </HStack>
                <AmountText
                  amount={resolvePrice(userState.currency.name, processorFee)}
                  fontSize={spacing[20]}
                />
              </HStack>
            </Stack>
          </Box>
        </Skeleton>
      </Stack>
      {state.showProcessorFeeModal && (
        <ProcessorFeeModal
          visible
          onClose={() => dispatch({ ...state, showProcessorFeeModal: false })}
        />
      )}
    </>
  );
}
