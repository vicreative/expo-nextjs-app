import { Button } from 'app/components/index';
import spacing from 'app/config/theme/spacing';
import { Box, FlatList, Heading, HStack, Icon, Skeleton, Stack, Text } from 'native-base';
import { AntDesign } from '@expo/vector-icons';
import en from 'app/i18n/index';
import useAppContext from 'app/hooks/useAppContext';
import moment from 'moment';
import { useCallback } from 'react';
import { useRouter } from 'solito/router';
import Modal from 'app/components/Modal';
import useDimensions from 'app/hooks/useDimensions';

export default function ExperienceDates({ showSingleDate }) {
  const { state, dispatch } = useAppContext('experienceDetails');
  const { push } = useRouter();
  const {
    screen: { height: SCREEN_HEIGHT }
  } = useDimensions();

  const schedules = state.experience?.schedules
    ?.filter(schedule => new Date() < new Date(schedule.deadlineDatetime))
    ?.sort((a, b) => new Date(a.startDatetime).getTime() - new Date(b.startDatetime).getTime());

  const renderSchedules = useCallback(
    ({ item, index }) => {
      const isLastItemInBatch = index == schedules?.length - 1;

      const noOfTicketsLeft =
        state.experience?.bookingSetting?.bookingType === 'PRIVATE'
          ? state.experience?.bookingSetting?.privateGroupMaxCapacity - item.numTickets
          : state.experience?.bookingSetting?.maxCapacity - item.numTickets;

      const noOfPrivateTicketsLeft =
        state.experience?.bookingSetting?.privateGroupMaxCapacity - item.numTickets;

      const isSoldOut = noOfTicketsLeft <= 0;

      const bookingHasEnded = new Date() > new Date(item.deadlineDatetime);

      const bookExperience = bookingType => {
        if (bookingType || state.experience?.bookingSetting?.bookingType === 'PRIVATE') {
          push(
            `/experiences/${state.experience?.uuid}/schedule/${item.uuid}?bookingType=${
              bookingType || state.experience?.bookingSetting?.bookingType
            }`
          );
        } else {
          push(`/experiences/${state.experience?.uuid}/schedule/${item.uuid}`);
        }

        dispatch({
          ...state,
          showAvailableDates: false,
          showPerks: false,
          schedule: { ...state.schedule, ...item },
          noOfAdults: state.noOfAdults > noOfTicketsLeft ? noOfTicketsLeft : state.noOfAdults,
          isPrivateBooking:
            bookingType === 'PRIVATE' || state.experience?.bookingSetting?.bookingType === 'PRIVATE'
        });
      };

      return (
        <Stack
          space={`${spacing[18]}px`}
          px={`${spacing[20]}px`}
          py={`${spacing[24]}px`}
          bg="white"
          width="100%"
          borderWidth="1px"
          borderColor="gray.100"
          borderRadius="10px"
          key={item.uuid}
          mb={{
            base: isLastItemInBatch ? SCREEN_HEIGHT * 0.15 : `${spacing[20]}px`,
            sm: showSingleDate ? 0 : `${spacing[20]}px`
          }}
        >
          <HStack justifyContent="space-between" alignItems="flex-start" flexWrap="wrap">
            <Box mr={`${spacing[16]}px`}>
              <Heading fontSize={{ base: `${spacing[14]}px`, lg: `${spacing[16]}px` }}>
                {item.startDatetime && state.experience?.type === 'REGULAR'
                  ? `${item.startDatetime && moment(item.startDatetime).format('ddd, MMM Do YYYY')}`
                  : `${moment(new Date(item.startDatetime)).format('ll')}  -  ${moment(
                      new Date(item.endDatetime)
                    ).format('ll')}`}
              </Heading>
              <Text
                pt={`${spacing[8]}px`}
                pb={`${spacing[14]}px`}
                fontSize={{ base: `${spacing[14]}px`, lg: `${spacing[16]}px` }}
              >
                {`${moment(new Date(item.startDatetime)).format('LT')} - ${moment(
                  new Date(item.endDatetime)
                ).format('LT')}`}
              </Text>
            </Box>
            <Box width={{ base: '100%', xl: 'auto' }}>
              <Button
                variant="solid"
                colorScheme="secondary"
                size="md"
                fontFamily="Satoshi-Medium"
                _text={{
                  fontSize: '14px'
                }}
                px="16px"
                width="100%"
                isDisabled={isSoldOut || bookingHasEnded}
                onPress={() => bookExperience(null)}
              >
                {en.experiences.details.selectDate.bookBtnText(isSoldOut, bookingHasEnded)}
              </Button>
            </Box>
          </HStack>

          <Box>
            {/* <Text fontSize={`${spacing[14]}px`}>
              {en.experiences.details.selectDate.ticketsLeft(
                noOfTicketsLeft < state.experience?.bookingSetting?.maxCapacity
                  ? noOfTicketsLeft
                  : state.experience?.bookingSetting?.bookingType !== 'PUBLIC'
                  ? noOfPrivateTicketsLeft
                  : noOfTicketsLeft
              )}
            </Text> */}

            {state.experience?.bookingSetting?.bookingType !== 'PUBLIC' ? (
              noOfPrivateTicketsLeft < state.experience?.bookingSetting?.privateGroupMaxCapacity ? (
                <Text fontSize={`${spacing[14]}px`} pt={`${spacing[8]}px`}>
                  {en.experiences.details.selectDate.joinOthers(item.numTickets)}
                </Text>
              ) : (
                <HStack
                // pt={`${spacing[8]}px`}
                >
                  <Button
                    variant="link"
                    colorScheme="secondary"
                    p={0}
                    size="md"
                    height={`${spacing[22]}px`}
                    fontFamily="Satoshi-Medium"
                    isDisabled={isSoldOut || bookingHasEnded}
                    onPress={() => bookExperience('PRIVATE')}
                  >
                    {en.experiences.details.selectDate.privateBooking}
                  </Button>
                </HStack>
              )
            ) : null}
          </Box>
        </Stack>
      );
    },
    [schedules?.length, state, SCREEN_HEIGHT, showSingleDate, push, dispatch]
  );

  return (
    <>
      {showSingleDate ? (
        <Skeleton width="100%" px="32px" py="24px" borderRadius="10px" isLoaded={!state.isLoading}>
          <Stack space={`${spacing[20]}px`} width="100%">
            <FlatList
              data={schedules.slice(0, 1)}
              renderItem={renderSchedules}
              keyExtractor={item => item.uuid}
            />
          </Stack>
        </Skeleton>
      ) : (
        <Modal
          isDrawer
          closeOnOverlayClick
          animationType="fade"
          visible={state.showAvailableDates}
          onClose={state.toggleDates}
          maxWidth="520px"
        >
          <HStack
            justifyContent="space-between"
            px={`${spacing[24]}px`}
            pt={{ base: `${spacing[14]}px`, sm: `${spacing[38]}px` }}
            pb={`${spacing[24]}px`}
            width="100%"
            borderBottomWidth={1}
            borderBottomColor="gray.100"
            bg="white"
          >
            <Heading fontSize={`${spacing[24]}px`}>
              {en.experiences.details.selectDate.heading}
            </Heading>

            <Button onPress={state.toggleDates} size="sm" variant="unstyled" p={0}>
              <Icon
                as={AntDesign}
                name="closecircleo"
                size={`${spacing[30]}px`}
                color={'gray.500'}
              />
            </Button>
          </HStack>

          <FlatList
            data={schedules}
            renderItem={renderSchedules}
            keyExtractor={item => item.uuid}
            contentContainerStyle={{
              paddingHorizontal: spacing[24],
              paddingBottom: spacing[100]
            }}
            ListHeaderComponent={
              <Text
                color="gray.300"
                fontSize={`${spacing[18]}px`}
                pt={`${spacing[20]}px`}
                pb={`${spacing[34]}px`}
              >
                {en.experiences.details.selectDate.subheading}
              </Text>
            }
            _web={{
              overflowY: 'scroll',
              height: { base: '88vh', sm: 'inherit' }
            }}
          />
        </Modal>
      )}
    </>
  );
}
