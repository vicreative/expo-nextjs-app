import { SimpleLineIcons } from '@expo/vector-icons';
import { Media } from 'app/components/Media';
import spacing from 'app/config/theme/spacing';
import useAppContext from 'app/hooks/useAppContext';
import useDimensions from 'app/hooks/useDimensions';
import en from 'app/i18n/index';
import moment from 'moment';
import { Box, Divider, Flex, Heading, HStack, Icon, Skeleton, Stack, Text } from 'native-base';
import { autoCapitalizeFirstLetter, resolveFileUrl } from 'app/utils/index';
import resolveExperienceDuration, {
  resolveExperienceTimeLeft
} from 'app/utils/resolveExperienceDuration';

export default function TripBasicInfo() {
  return (
    <Stack space={`${spacing[40]}px`}>
      <TripInfo />
      <TripExperienceDetails />
    </Stack>
  );
}

export const TripInfo = ({ cancelledAt }) => {
  const { state } = useAppContext('experienceDetails');
  const timeLeft = resolveExperienceTimeLeft(state.schedule.startDatetime);

  return (
    <Stack width={'100%'}>
      <Skeleton
        isLoaded={!state.isLoading}
        width="100%"
        height={{ base: '240px', sm: '280px' }}
        borderRadius={`${spacing[10]}px`}
      >
        <Flex
          alignItems="center"
          justifyContent="center"
          height={{ base: '240px', sm: '280px' }}
          width="100%"
        >
          <Media
            height="100%"
            width="100%"
            source={{
              uri: resolveFileUrl(state.experience?.coverMediaPath)
            }}
            alt={state.experience?.title}
            type="image"
            resizeMode="cover"
            borderRadius={spacing[16]}
          />
          {cancelledAt && (
            <Box
              bg="white"
              position="absolute"
              height="100%"
              width="100%"
              opacity={0.35}
              borderRadius={spacing[16]}
            />
          )}
          <Box
            position="absolute"
            bg={cancelledAt ? 'red.700' : timeLeft.includes('ago') ? 'gray.100' : 'primary.100'}
            py={`${spacing[18]}px`}
            px={`${spacing[26]}px`}
            mx={`${spacing[26]}px`}
            borderRadius={spacing[6]}
          >
            <Heading
              textAlign="center"
              fontSize={{ base: `${spacing[20]}px`, sm: `${spacing[30]}px` }}
              color={cancelledAt ? 'white' : 'gray.500'}
            >
              {cancelledAt ? 'Cancelled' : timeLeft}
            </Heading>
          </Box>
        </Flex>
      </Skeleton>
      <Skeleton.Text
        lines={4}
        space={`${spacing[10]}px`}
        mt={`${spacing[48]}px`}
        isLoaded={!state.isLoading}
      >
        <Text
          fontSize={`${spacing[24]}px`}
          fontFamily={'Satoshi-Bold'}
          mt={{ base: `${spacing[24]}px`, sm: `${spacing[48]}px` }}
          mb={{ base: `${spacing[16]}px`, sm: `${spacing[32]}px` }}
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
            <Text fontSize={{ base: `${spacing[16]}px`, md: `${spacing[18]}px` }} color="gray.300">
              {state.experience?.address}
            </Text>
          </HStack>
          <HStack space={`${spacing[12]}px`}>
            <Icon as={SimpleLineIcons} name="clock" color="gray.500" size={`${spacing[24]}px`} />
            <Text fontSize={{ base: `${spacing[16]}px`, md: `${spacing[18]}px` }} color="gray.300">
              {resolveExperienceDuration(
                state.experience.type,
                [state.schedule],
                state.experience.initialStartDatetime,
                state.experience.initialEndDatetime,
                true
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
            <Text fontSize={{ base: `${spacing[16]}px`, md: `${spacing[18]}px` }} color="gray.300">
              {state.experience?.language?.name}
            </Text>
          </HStack>
        </Stack>
      </Skeleton.Text>
    </Stack>
  );
};

export const TripExperienceDetails = () => {
  const { state } = useAppContext('experienceDetails');
  const {
    screen: { height: SCREEN_HEIGHT }
  } = useDimensions();

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
            <Stack space={`${spacing[6]}px`}>
              <Text fontSize={`${spacing[14]}px`}>
                {en.experiences.bookExperience.details.startDate}
              </Text>
              <Heading fontSize={`${spacing[16]}px`} color="gray.400">
                {moment(state.schedule?.startDatetime).format('lll')}
              </Heading>
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
            <Stack space={`${spacing[6]}px`}>
              <Text fontSize={`${spacing[14]}px`}>
                {en.experiences.bookExperience.details.persons.title}
              </Text>

              <Heading fontSize={`${spacing[16]}px`} color="gray.400">
                {en.experiences.bookExperience.details.persons.noOfAdults(state.noOfAdults)}
              </Heading>
            </Stack>

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
