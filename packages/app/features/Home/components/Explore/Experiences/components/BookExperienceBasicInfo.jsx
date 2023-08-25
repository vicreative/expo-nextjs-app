import { SimpleLineIcons } from '@expo/vector-icons';
import { NestedImageCarousel } from 'app/components/Carousel';
import { Button, Counter } from 'app/components/index';
import { Media } from 'app/components/Media';
import spacing from 'app/config/theme/spacing';
import { mediaList } from 'app/constants/index';
import useAppContext from 'app/hooks/useAppContext';
import useDimensions from 'app/hooks/useDimensions';
import en from 'app/i18n/index';
import moment from 'moment';
import { Box, Divider, Heading, Hidden, HStack, Icon, Skeleton, Stack, Text } from 'native-base';
import { useCallback, useState } from 'react';
import { autoCapitalizeFirstLetter, resolveFileUrl } from 'app/utils/index';
import resolveExperienceDuration from 'app/utils/resolveExperienceDuration';

export default function BookExperienceBasicInfo() {
  return (
    <Stack space={`${spacing[40]}px`}>
      <BookExperienceInfo />
      <BookExperienceDetails />
    </Stack>
  );
}

export const BookExperienceInfo = () => {
  const {
    window: { width: WIDTH },
    screen: { height: SCREEN_HEIGHT }
  } = useDimensions();
  const sliderWidth = WIDTH / 2 - spacing[34];
  const sliderHeight = SCREEN_HEIGHT * 0.22;
  const { state } = useAppContext('experienceDetails');

  const renderItem = useCallback(
    ({ item }) => {
      return (
        <Box key={item.uuid} width={sliderWidth} height={{ base: sliderHeight, sm: 412 }}>
          <Media
            height={WIDTH < 600 ? sliderHeight : 412}
            width={'100%'}
            source={{
              uri: resolveFileUrl(item.uri)
            }}
            alt={item.title}
            type={item.mediaType}
            resizeMode="cover"
            usePoster
            borderRadius={0}
            preload="auto"
            posterSource={{
              uri: resolveFileUrl(state.experience?.coverMediaPath)
            }}
            hasCustomControls
            useCustomPauseBtn
            overlayColor="rgba(16, 16, 16, 0.15)"
            isMuted={true}
            shouldPlay={false}
            loop={false}
          />
        </Box>
      );
    },
    [WIDTH, sliderHeight, sliderWidth, state.experience?.coverMediaPath]
  );
  return (
    <>
      {/* larger device(tablet & desktop) for web only */}
      <Hidden only="base">
        <Stack width={'100%'}>
          <Skeleton
            isLoaded={!state.isLoading}
            width={'100%'}
            height={'412px'}
            borderRadius={`${spacing[10]}px`}
          >
            <NestedImageCarousel
              data={mediaList(state.experience, state.experience?.medias?.length + 1)}
              renderItem={renderItem}
              width="100%"
              imgHeight="100%"
              borderRadius={20}
              showPaginationOnHover
            />
          </Skeleton>
          <Skeleton.Text
            lines={5}
            space={`${spacing[10]}px`}
            mt={`${spacing[48]}px`}
            isLoaded={!state.isLoading}
          >
            <Text
              fontSize={`${spacing[24]}px`}
              fontFamily={'Satoshi-Bold'}
              mt={`${spacing[48]}px`}
              mb={`${spacing[32]}px`}
            >
              {state.experience?.title}
            </Text>
            <Stack space={`${spacing[12]}px`}>
              <HStack space={`${spacing[12]}px`}>
                <Icon
                  as={SimpleLineIcons}
                  name="location-pin"
                  color="gray.500"
                  size={`${spacing[24]}px`}
                />
                <Text fontSize={`${spacing[18]}px`} color="gray.300">
                  {state.experience?.address}
                </Text>
              </HStack>
              <HStack space={`${spacing[12]}px`}>
                <Icon
                  as={SimpleLineIcons}
                  name="clock"
                  color="gray.500"
                  size={`${spacing[24]}px`}
                />
                <Text fontSize={`${spacing[18]}px`} color="gray.300">
                  {resolveExperienceDuration(
                    state.experience.type,
                    state.experience.schedules,
                    state.experience.initialStartDatetime,
                    state.experience.initialEndDatetime
                  )}
                </Text>
              </HStack>
              <HStack space={`${spacing[12]}px`}>
                <Icon
                  as={SimpleLineIcons}
                  name="microphone"
                  color="gray.500"
                  size={`${spacing[24]}px`}
                />
                <Text fontSize={`${spacing[18]}px`} color="gray.300">
                  {state.experience?.language?.name}
                </Text>
              </HStack>
            </Stack>
          </Skeleton.Text>
        </Stack>
      </Hidden>

      {/* smaller device(mobile phones)for web & mobile app */}
      <Hidden from="sm">
        <HStack width="100%" justifyContent="space-between" alignItems="center">
          <Box width={sliderWidth} borderRadius={spacing[10]} overflow="hidden">
            <Skeleton
              isLoaded={!state.isLoading}
              width={sliderWidth}
              height={sliderHeight}
              borderRadius={`${spacing[10]}px`}
            >
              <NestedImageCarousel
                data={mediaList(state.experience, state.experience?.medias?.length + 1)}
                renderItem={renderItem}
                width="100%"
                imgHeight="100%"
                borderRadius={10}
                hidePagination
              />
            </Skeleton>
          </Box>
          <Box width={sliderWidth}>
            <Skeleton.Text
              lines={5}
              isLoaded={!state.isLoading}
              _line={{
                height: `${spacing[12]}px`
              }}
            >
              <Text fontSize={`${spacing[12]}px`} mb={`${spacing[8]}px`}>
                {state.experience?.address?.toUpperCase()}
              </Text>
              <Text
                fontSize={`${spacing[14]}px`}
                fontFamily={'Satoshi-Medium'}
                mb={`${spacing[12]}px`}
              >
                {state.experience?.title}
              </Text>
              <Text fontSize={`${spacing[12]}px`} mb={`${spacing[12]}px`}>
                {resolveExperienceDuration(
                  state.experience.type,
                  state.experience.schedules,
                  state.experience.initialStartDatetime,
                  state.experience.initialEndDatetime
                )}
              </Text>
              <Text fontSize={`${spacing[12]}px`} mb={`${spacing[12]}px`}>
                {en.experiences.bookExperience.language(state.experience?.language?.name)}
              </Text>
            </Skeleton.Text>
          </Box>
        </HStack>
      </Hidden>
    </>
  );
};

export const BookExperienceDetails = () => {
  const {
    screen: { height: SCREEN_HEIGHT }
  } = useDimensions();
  const { state, dispatch } = useAppContext('experienceDetails');
  const [isEditMode, setIsEditMode] = useState(false);

  const noOfTicketsLeft = state.isPrivateBooking
    ? state.experience?.bookingSetting?.privateGroupMaxCapacity - state.schedule?.numTickets
    : state.experience?.bookingSetting?.maxCapacity - state.schedule?.numTickets;
  return (
    <Stack space={`${spacing[14]}px`}>
      <Skeleton
        isLoaded={!state.isLoading}
        p={{ base: `${spacing[16]}px`, sm: `${spacing[20]}px` }}
        width="100%"
        height={SCREEN_HEIGHT * 0.6}
        borderRadius={`${spacing[10]}px`}
      >
        <Box borderWidth={1} borderColor="gray.100" borderRadius={`${spacing[10]}px`}>
          <Heading
            fontSize={`${spacing[20]}px`}
            pt={{ base: `${spacing[16]}px`, sm: `${spacing[24]}px` }}
            px={{ base: `${spacing[16]}px`, sm: `${spacing[32]}px` }}
          >
            {en.experiences.bookExperience.details.heading}
          </Heading>
          <Divider bg="gray.100" thickness="1" my={`${spacing[18]}px`} />
          <Stack
            space={`${spacing[32]}px`}
            pb={{ base: `${spacing[16]}px`, sm: `${spacing[24]}px` }}
            px={{ base: `${spacing[16]}px`, sm: `${spacing[32]}px` }}
          >
            {/* Start Date */}
            <Stack
              w="100%"
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              flexWrap="wrap"
              space={`${spacing[32]}px`}
            >
              <Stack space={`${spacing[6]}px`}>
                <Text fontSize={`${spacing[14]}px`}>
                  {en.experiences.bookExperience.details.startDate}
                </Text>
                <Heading fontSize={`${spacing[16]}px`} color="gray.400">
                  {moment(state.schedule?.startDatetime).format('lll')}
                </Heading>
              </Stack>
              {state.experience?.schedules?.length > 1 && (
                <Button
                  colorScheme="secondary"
                  variant="outline"
                  size="md"
                  px={`${spacing[18]}px`}
                  onPress={() => {
                    state.toggleDates();
                    setIsEditMode(false);
                  }}
                >
                  {en.experiences.bookExperience.details.change}
                </Button>
              )}
            </Stack>

            {/* End Date */}
            <Stack space={`${spacing[6]}px`}>
              <Text fontSize={`${spacing[14]}px`}>
                {en.experiences.bookExperience.details.endDate}
              </Text>
              <Heading fontSize={`${spacing[16]}px`} color="gray.400">
                {moment(state.schedule?.endDatetime).format('lll')}
              </Heading>
            </Stack>

            {/* Persons */}
            <HStack
              w="100%"
              justifyContent="space-between"
              alignItems="center"
              flexWrap="wrap"
              space={`${spacing[32]}px`}
            >
              <Stack space={`${spacing[6]}px`}>
                <Text fontSize={`${spacing[14]}px`}>
                  {en.experiences.bookExperience.details.persons.title}
                </Text>
                {isEditMode ? (
                  <Counter
                    counter={state.noOfAdults}
                    minimumValue={1}
                    maximumValue={noOfTicketsLeft}
                    onIncrement={() => dispatch({ ...state, noOfAdults: state.noOfAdults + 1 })}
                    onDecrement={() => {
                      dispatch({ ...state, noOfAdults: state.noOfAdults - 1 });
                      if (state.participants?.length >= state.noOfAdults - 1) {
                        state.participants.splice(-1, 1);
                      }
                    }}
                  />
                ) : (
                  <Heading fontSize={`${spacing[16]}px`} color="gray.400">
                    {en.experiences.bookExperience.details.persons.noOfAdults(state.noOfAdults)}
                  </Heading>
                )}
              </Stack>
              {noOfTicketsLeft > 1 && (
                <Button
                  colorScheme={'secondary'}
                  variant={isEditMode ? 'solid' : 'outline'}
                  size="md"
                  px={`${spacing[18]}px`}
                  onPress={() => setIsEditMode(!isEditMode)}
                >
                  {en.experiences.bookExperience.details.persons.edit(isEditMode)}
                </Button>
              )}
            </HStack>

            <HStack w="100%" justifyContent="space-between" alignItems="flex-start">
              {/* Spaces Left */}
              <Stack space={`${spacing[6]}px`} width="64%">
                <Text fontSize={`${spacing[14]}px`}>
                  {en.experiences.bookExperience.details.spaceLeft.title}
                </Text>
                <Heading fontSize={`${spacing[16]}px`} color="gray.400">
                  {en.experiences.bookExperience.details.spaceLeft.content(noOfTicketsLeft)}
                </Heading>
              </Stack>
              {/* Maximum Size */}
              <Stack space={`${spacing[6]}px`} width="33%" alignItems="flex-end">
                <Box>
                  <Text fontSize={`${spacing[14]}px`}>
                    {en.experiences.bookExperience.details.maximumSize.title}
                  </Text>
                  <Heading fontSize={`${spacing[16]}px`} color="gray.400">
                    {en.experiences.bookExperience.details.maximumSize.content(
                      state.isPrivateBooking
                        ? state.experience?.bookingSetting?.privateGroupMaxCapacity
                        : state.experience?.bookingSetting?.maxCapacity
                    )}
                  </Heading>
                </Box>
              </Stack>
            </HStack>

            {/* Booking deadline */}
            <Stack space={`${spacing[6]}px`}>
              <Text fontSize={`${spacing[14]}px`}>
                {en.experiences.bookExperience.details.bookingDeadline}
              </Text>
              <Heading fontSize={`${spacing[16]}px`} color="gray.400">
                {moment(state.schedule?.deadlineDatetime).format('llll')}
              </Heading>
            </Stack>

            <HStack w="100%" justifyContent="space-between" alignItems="flex-start">
              {/* Type of Experience */}
              <Stack space={`${spacing[6]}px`} width="37%">
                <Text fontSize={`${spacing[14]}px`}>
                  {en.experiences.bookExperience.details.experienceType}
                </Text>
                <Heading fontSize={`${spacing[16]}px`} color="gray.400">
                  {autoCapitalizeFirstLetter(state.experience?.type?.toLowerCase())}
                </Heading>
              </Stack>
              {/* Location */}
              <Stack space={`${spacing[6]}px`} width="60%" alignItems="flex-end">
                <Box>
                  <Text fontSize={`${spacing[14]}px`}>
                    {en.experiences.bookExperience.details.location}
                  </Text>
                  <Heading noOfLines={1} fontSize={`${spacing[16]}px`} color="gray.400">
                    {state.experience?.address}
                  </Heading>
                </Box>
              </Stack>
            </HStack>

            {/* Languages Spoken */}
            <Stack space={`${spacing[6]}px`}>
              <Text fontSize={`${spacing[14]}px`}>
                {en.experiences.bookExperience.details.languagesSpoken}
              </Text>
              <Heading fontSize={`${spacing[16]}px`} color="gray.400">
                {state.experience?.language?.name}
              </Heading>
            </Stack>
          </Stack>
        </Box>
      </Skeleton>
    </Stack>
  );
};
