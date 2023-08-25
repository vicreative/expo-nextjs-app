import { Button } from 'app/components/index';
import spacing from 'app/config/theme/spacing';
import { Box, Center, Flex, Hidden, HStack, Icon, Skeleton, Stack, Text } from 'native-base';
import en from 'app/i18n/index';
import { resolvePriceInLocalCurrency } from 'app/utils/resolvePrice';
import useAppContext from 'app/hooks/useAppContext';
import ExperienceDates from './ExperienceDates';
import { Feather } from '@expo/vector-icons';
import ShareBottomSheet from 'app/components/BottomSheet/ShareBottomSheet/index.web';
import AmountText from 'app/components/AmountText';
import useDimensions from 'app/hooks/useDimensions';

export default function Pricing() {
  const { state } = useAppContext('experienceDetails');
  const { state: userState } = useAppContext('user');
  const {
    screen: { height: SCREEN_HEIGHT }
  } = useDimensions();

  const schedules = state.experience?.schedules?.filter(
    schedule => new Date() < new Date(schedule.deadlineDatetime)
  );

  return (
    <>
      {/* larger device(tablet & desktop) for web only */}
      <Hidden only="base">
        <Flex position="relative" width="100%" height={{ base: 'auto', sm: '100%' }}>
          <Box
            _web={{
              top: 100,
              position: 'sticky'
            }}
          >
            <Skeleton
              width="100%"
              height={`${spacing[100]}px`}
              borderRadius={{ base: 0, sm: '10px' }}
              isLoaded={!state.isLoading}
            >
              <Stack
                borderRadius={{ base: 0, sm: '10px' }}
                bg={{
                  base: 'primary.100',
                  sm: schedules?.length <= 0 ? 'gray.25' : 'primary.25'
                }}
                px={`${spacing[24]}px`}
                pt={`${spacing[18]}px`}
                pb={{
                  base: `${spacing[50]}px`,
                  sm: `${spacing[24]}px`
                }}
                space={schedules?.length <= 0 ? `${spacing[24]}px` : `${spacing[32]}px`}
                alignItems="center"
                width="100%"
                justifyContent="space-between"
                flexWrap="wrap"
              >
                {/* Price per person */}
                <Skeleton.Text
                  lines={1}
                  maxW={`${spacing[100] * 1.8}px`}
                  isLoaded={!state.isLoading}
                >
                  <HStack space={`${spacing[2]}px`} alignSelf="flex-start" flexWrap="wrap">
                    <AmountText
                      amount={
                        state.experience?.bookingSetting?.bookingType === 'PRIVATE'
                          ? resolvePriceInLocalCurrency(
                              userState.currency,
                              state.experience?.privateGroupPrice
                            )
                          : resolvePriceInLocalCurrency(
                              userState.currency,
                              state.experience?.pricePerHead
                            )
                      }
                      fontSize={spacing[24]}
                    />

                    {state.experience?.bookingSetting?.bookingType === 'PRIVATE' ? null : (
                      <Text fontSize={`${spacing[24]}px`}>
                        {en.experiences.details.selectDate.price}
                      </Text>
                    )}
                  </HStack>
                </Skeleton.Text>

                {schedules?.length <= 0 ? (
                  <HStack
                    // p={`${spacing[20]}px`}
                    w="100%"
                    space={`${spacing[10]}px`}
                    alignItems="center"
                  >
                    <Flex
                      borderRadius={100}
                      alignItems="center"
                      justifyContent="center"
                      bg="gray.50"
                      width={`${spacing[24]}px`}
                      height={`${spacing[24]}px`}
                    >
                      <Icon as={Feather} name="info" size={`${spacing[12]}px`} color="gray.300" />
                    </Flex>
                    <Text fontSize={`${spacing[16]}px`}>
                      {en.experiences.details.selectDate.expiredBooking}
                    </Text>
                  </HStack>
                ) : (
                  <>
                    {/* Schedule */}
                    <ExperienceDates showSingleDate />

                    {/* View more dates btn */}
                    {schedules?.length > 1 && (
                      <Skeleton.Text
                        lines={1}
                        maxW={`${spacing[100] * 1.8}px`}
                        isLoaded={!state.isLoading}
                      >
                        <Button
                          variant="link"
                          colorScheme="secondary"
                          p={0}
                          size="md"
                          height={`${spacing[22]}px`}
                          fontFamily="Satoshi-Medium"
                          onPress={state.toggleDates}
                        >
                          {en.experiences.details.selectDate.viewMoreDates}
                        </Button>
                      </Skeleton.Text>
                    )}
                  </>
                )}
              </Stack>
            </Skeleton>
            <Skeleton
              isLoaded={!state.isLoading}
              mt="34px"
              alignSelf="center"
              height="48px"
              maxW="224px"
              borderRadius="8px"
            >
              <Center mt="34px">
                <ShareBottomSheet
                  btnTitle={en.experiences.shareExperience.btnText}
                  text={en.experiences.shareExperience.text}
                  title={en.experiences.shareExperience.title}
                />
              </Center>
            </Skeleton>
          </Box>
        </Flex>
      </Hidden>

      {/* smaller device(mobile phones)for web & mobile app */}
      <Hidden from="sm">
        <Skeleton width="100%" height={`${spacing[100]}px`} isLoaded={!state.isLoading}>
          <HStack
            bg="primary.100"
            px={`${spacing[24]}px`}
            pt={`${spacing[18]}px`}
            pb={`${spacing[50]}px`}
            space={`${spacing[20]}px`}
            alignItems="center"
            width="100%"
            justifyContent="space-between"
            flexWrap="wrap"
          >
            <Skeleton.Text lines={2} maxW={`${spacing[100] * 1.8}px`} isLoaded={!state.isLoading}>
              <Stack>
                {/* Price per person */}
                <AmountText
                  amount={
                    state.experience?.bookingSetting?.bookingType === 'PRIVATE'
                      ? resolvePriceInLocalCurrency(
                          userState.currency,
                          state.experience?.privateGroupPrice
                        )
                      : resolvePriceInLocalCurrency(
                          userState.currency,
                          state.experience?.pricePerHead
                        )
                  }
                  fontSize={spacing[20]}
                />

                {state.experience?.bookingSetting?.bookingType === 'PRIVATE' ? null : (
                  <Text fontSize={`${spacing[12]}px`} color="gray.300">
                    {en.experiences.details.selectDate.perPerson}
                  </Text>
                )}
              </Stack>
            </Skeleton.Text>

            {/* Select date btn  */}
            <Skeleton
              endColor="primary.200"
              height={`${SCREEN_HEIGHT * 0.0536}px`}
              width={`${spacing[100] * 1.4}px`}
              rounded="8px"
              maxW={`${spacing[100] * 1.8}px`}
              isLoaded={!state.isLoading}
            >
              <Button
                colorScheme="secondary"
                height={`${SCREEN_HEIGHT * 0.0536}px`}
                px={`${spacing[16]}px`}
                _text={{
                  fontSize: `${spacing[16]}px`
                }}
                onPress={state.toggleDates}
                isDisabled={schedules?.length === 0}
              >
                {en.experiences.details.selectDate.btnText(false, schedules?.length === 0)}
              </Button>
            </Skeleton>
          </HStack>
        </Skeleton>
      </Hidden>
    </>
  );
}
