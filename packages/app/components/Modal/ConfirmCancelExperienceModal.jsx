import Modal from './index';
import { AntDesign, Feather } from '@expo/vector-icons';
import spacing from 'app/config/theme/spacing';
import en from 'app/i18n/index';
import {
  Heading,
  HStack,
  Box,
  Icon,
  Stack,
  Divider,
  Hidden,
  Flex,
  ScrollView,
  Text
} from 'native-base';
import Button from '../Button';
import { STATUS_BAR_HEIGHT } from 'app/constants/index';
import Touchable from 'app/components/Gestures/Touchable';
import { resolvePrice } from 'app/utils/resolvePrice';
import SuccessState from 'app/components/SuccessState';
import ErrorState from 'app/components/ErrorState';
import { useRouter } from 'solito/router';
import AmountText from 'app/components/AmountText';
import { useBookingCancellationDetails } from 'app/hooks/queries/useBookings';
import { LoadingState } from '..';
import { useCancelBookingMutation } from 'app/hooks/mutations/useBooking';
import useDimensions from 'app/hooks/useDimensions';

function ConfirmCancelExperienceModal({ bookingId, payload, visible, onClose = () => {} }) {
  const {
    window: { width: WIDTH },
    screen: { height: SCREEN_HEIGHT }
  } = useDimensions();

  const { back } = useRouter();
  const { cancelBooking, cancelBookingState } = useCancelBookingMutation(bookingId);

  const { data: cancellationDetails, isLoading } = useBookingCancellationDetails(bookingId);

  const experiencePrice =
    cancellationDetails?.booking?.type === 'PRIVATE'
      ? Number(cancellationDetails?.booking?.privateGroupPrice)
      : Number(cancellationDetails?.booking?.pricePerTicket) *
        Number(cancellationDetails?.booking?.units);

  const serviceFee =
    cancellationDetails?.booking?.type === 'PRIVATE'
      ? Number(cancellationDetails?.booking?.serviceCharge)
      : Number(cancellationDetails?.booking?.serviceCharge) * cancellationDetails?.booking?.units;

  const amountPaid = experiencePrice + serviceFee;

  const amountToRefund =
    cancellationDetails?.type === 'noRefund' ? 0 : cancellationDetails?.amountToBeRefunded;

  const cancellationFee = experiencePrice + serviceFee - amountToRefund;

  const handleSubmit = () => {
    cancelBooking(payload);
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
            <Heading fontSize={`${spacing[24]}px`}>
              {en.profile.trips.info.cancel.confirm.headerTitle}
            </Heading>

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
                {en.profile.trips.info.cancel.confirm.headerTitle}
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

        {isLoading ? (
          <LoadingState />
        ) : (
          cancellationDetails && (
            <>
              {/* Body */}
              <ScrollView
                keyboardShouldPersistTaps="always"
                keyboardDismissMode="interactive"
                contentContainerStyle={{
                  justifyContent: 'space-between',
                  height: '100%'
                }}
              >
                <Box
                  px={`${spacing[24]}px`}
                  pt={`${spacing[32]}px`}
                  _web={{
                    pt: {
                      base: `${spacing[100] * 1.24}px`,
                      sm: `${spacing[32]}px`
                    }
                  }}
                  w="100%"
                >
                  <Box
                    borderWidth={1}
                    borderColor="gray.100"
                    borderRadius={`${spacing[20]}px`}
                    p={`${spacing[24]}px`}
                    mb={`${spacing[38]}px`}
                  >
                    {/* amount paid */}
                    <>
                      <Text
                        color="gray.300"
                        fontSize={`${spacing[14]}px`}
                        pb={`${spacing[14]}px`}
                        textAlign="center"
                      >
                        {en.profile.trips.info.cancel.confirm.paid}
                      </Text>
                      <AmountText
                        textAlign="center"
                        amount={resolvePrice(
                          cancellationDetails?.booking?.payment?.baseCurrency,
                          amountPaid
                        )}
                        fontSize={spacing[24]}
                      />
                    </>

                    {cancellationDetails?.systemRefundPolicy ||
                    cancellationDetails?.type === 'noRefund' ? (
                      <Divider bg="gray.100" thickness="1" my={`${spacing[24]}px`} />
                    ) : null}

                    {/* amount to be refunded */}
                    {cancellationDetails?.systemRefundPolicy ||
                    cancellationDetails?.type === 'noRefund' ? (
                      <>
                        <Text
                          color="gray.300"
                          fontSize={`${spacing[14]}px`}
                          pb={`${spacing[14]}px`}
                          textAlign="center"
                        >
                          {en.profile.trips.info.cancel.confirm.refund}
                        </Text>
                        <AmountText
                          textAlign="center"
                          amount={resolvePrice(
                            cancellationDetails?.type === 'noRefund'
                              ? cancellationDetails?.booking?.currency
                              : cancellationDetails?.currency,
                            amountToRefund
                          )}
                          fontSize={spacing[24]}
                        />
                      </>
                    ) : null}
                  </Box>

                  {/* Refund details */}
                  <Heading fontSize={`${spacing[24]}px`} pb={`${spacing[32]}px`}>
                    {en.profile.trips.info.cancel.confirm.heading}
                  </Heading>

                  <Stack space={`${spacing[24]}px`} mb={`${spacing[40]}px`}>
                    <HStack justifyContent="space-between" alignItems="center">
                      <Text>{en.profile.trips.info.cancel.confirm.experiencePrice}</Text>
                      <AmountText
                        amount={resolvePrice(
                          cancellationDetails?.booking?.currency,
                          experiencePrice
                        )}
                        fontSize={spacing[20]}
                      />
                    </HStack>

                    <HStack justifyContent="space-between" alignItems="center">
                      <Text>{en.profile.trips.info.cancel.confirm.serviceFee}</Text>
                      <AmountText
                        amount={resolvePrice(cancellationDetails?.booking?.currency, serviceFee)}
                        fontSize={spacing[20]}
                      />
                    </HStack>

                    {cancellationDetails?.systemRefundPolicy ||
                    cancellationDetails?.type === 'noRefund' ? (
                      <HStack justifyContent="space-between" alignItems="center">
                        <Text>{en.profile.trips.info.cancel.confirm.cancellationFee}</Text>

                        <AmountText
                          amount={resolvePrice(
                            cancellationDetails?.type === 'noRefund'
                              ? cancellationDetails?.booking?.currency
                              : cancellationDetails?.currency,
                            cancellationFee
                          )}
                          fontSize={spacing[20]}
                        />
                      </HStack>
                    ) : (
                      <Stack>
                        <Heading fontSize={`${spacing[18]}px`} pb={`${spacing[10]}px`}>
                          {en.profile.trips.info.cancel.confirm.creatorRefundMesssage}
                        </Heading>
                        <Text>{cancellationDetails?.messageFromCreator}</Text>
                      </Stack>
                    )}
                  </Stack>
                </Box>
                {/* Buttons */}

                <Box>
                  {!cancellationDetails?.systemRefundPolicy ||
                  cancellationDetails?.type === 'noRefund' ? null : (
                    <>
                      <Divider bg="gray.100" thickness="1" mb={`${spacing[26]}px`} />
                      <Flex alignItems="center" justifyContent="center" pb={`${spacing[32]}px`}>
                        <Text
                          color="gray.300"
                          fontSize={`${spacing[14]}px`}
                          textAlign="center"
                          maxW={`${spacing[100] * 3.25}px`}
                        >
                          {en.profile.trips.info.cancel.confirm.tip}
                        </Text>
                      </Flex>
                    </>
                  )}
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
                        onPress={onClose}
                      >
                        {en.profile.trips.info.cancel.cancel}
                      </Button>
                      <Button
                        variant="solid"
                        colorScheme="secondary"
                        size="md"
                        fontFamily="Satoshi-Medium"
                        px="18px"
                        isDisabled={cancelBookingState.isLoading}
                        isLoading={cancelBookingState.isLoading}
                        onPress={handleSubmit}
                      >
                        {en.profile.trips.info.cancel.confirm.confirmCancellation}
                      </Button>
                    </HStack>
                  </Hidden>

                  {/* smaller device(mobile phones)for web & mobile app */}
                  <Hidden from="sm">
                    <Box px={`${spacing[24]}px`} pb={`${spacing[50]}px`}>
                      <Button
                        variant="solid"
                        colorScheme="secondary"
                        size="xl"
                        fontFamily="Satoshi-Medium"
                        isDisabled={cancelBookingState.isLoading}
                        isLoading={cancelBookingState.isLoading}
                        onPress={handleSubmit}
                      >
                        {en.profile.trips.info.cancel.confirm.confirmCancellation}
                      </Button>
                    </Box>
                  </Hidden>
                </Box>
              </ScrollView>
            </>
          )
        )}
      </Box>
      {cancelBookingState.isSuccess && (
        <SuccessState
          title={en.profile.trips.info.cancel.confirm.success.title}
          text={en.profile.trips.info.cancel.confirm.success.text}
          btnText={en.profile.trips.info.cancel.confirm.success.btnText}
          onDismiss={back}
          size={'sm'}
        />
      )}
      {cancelBookingState.isError && (
        <ErrorState
          title={en.profile.trips.info.cancel.confirm.error.title}
          text={cancelBookingState.error?.message}
          btnText={en.profile.trips.info.cancel.confirm.error.btnText}
          onDismiss={back}
          size={'sm'}
        />
      )}
    </Modal>
  );
}

export default ConfirmCancelExperienceModal;
