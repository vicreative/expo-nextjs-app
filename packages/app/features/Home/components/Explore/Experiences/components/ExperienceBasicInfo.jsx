import { Feather, SimpleLineIcons } from '@expo/vector-icons';
import { LineChartIcon } from 'app/components/Icons/Chart';
import { UsersIcon } from 'app/components/Icons/UserIcon';
import { Tooltip, Image } from 'app/components/index';
import spacing from 'app/config/theme/spacing';
import useAppContext from 'app/hooks/useAppContext';
import en from 'app/i18n/index';
import { Box, Heading, Skeleton, Stack, Text, HStack, Icon, Flex } from 'native-base';
import { resolveFileUrl } from 'app/utils/index';
import resolveExperienceDuration from 'app/utils/resolveExperienceDuration';

export default function ExperienceBasicInfo() {
  const { state } = useAppContext('experienceDetails');
  return (
    <>
      <Skeleton.Text lines={3} isLoaded={!state.isLoading} maxW={`${spacing[100] * 5}px`}>
        <Stack space={{ base: `${spacing[14]}px`, lg: `${spacing[20]}px` }}>
          <Text color="gray.600" fontSize={`${spacing[16]}px`}>
            {state.experience?.address?.toUpperCase()}
          </Text>
          <Heading fontSize={{ base: `${spacing[24]}px`, lg: `${spacing[26]}px` }}>
            {state.experience?.title}
          </Heading>
          <HStack space={`${spacing[10]}px`} alignItems="center">
            <Icon as={SimpleLineIcons} name="clock" color="gray.500" size={`${spacing[22]}px`} />
            <Text color="gray.600" fontSize={{ base: `${spacing[14]}px`, lg: `${spacing[18]}px` }}>
              {resolveExperienceDuration(
                state.experience.type,
                state.experience.schedules,
                state.experience.initialStartDatetime,
                state.experience.initialEndDatetime
              )}
            </Text>
          </HStack>
        </Stack>
      </Skeleton.Text>
      <Stack
        flexDirection={{ base: 'column', sm: 'row' }}
        justifyContent={{ base: 'flex-start', sm: 'space-between' }}
        space={{ base: `${spacing[14]}px`, sm: 0 }}
        mt={`${spacing[40]}px`}
        flexWrap={{ base: 'nowrap', sm: 'wrap' }}
        width="100%"
      >
        {/* Language Spoken */}
        <Skeleton
          isLoaded={!state.isLoading}
          p={{ base: `${spacing[16]}px`, sm: `${spacing[20]}px` }}
          mb={{ base: 0, sm: `${spacing[14]}px` }}
          width={{ base: '100%', sm: '49%' }}
          borderRadius={`${spacing[10]}px`}
          height={`${spacing[100]}px`}
        >
          <Box
            borderWidth={1}
            borderColor="gray.100"
            borderRadius={`${spacing[10]}px`}
            width={{ base: '100%', sm: '49%' }}
            p={{ base: `${spacing[16]}px`, sm: `${spacing[20]}px` }}
            mb={{ base: 0, sm: `${spacing[14]}px` }}
          >
            <HStack space={`${spacing[10]}px`} flexDirection={{ base: 'row', sm: 'column' }}>
              <Flex
                width={`${spacing[32]}px`}
                height={`${spacing[32]}px`}
                bg="primary.100"
                borderRadius="full"
                justifyContent="center"
                alignItems="center"
              >
                <Icon as={Feather} name="mic" size={`${spacing[18]}px`} color="gray.500" />
              </Flex>
              <Stack space={`${spacing[10]}px`} justifyContent="space-between">
                <Text color="gray.300">{en.experiences.details.language}</Text>
                <Text fontFamily="Satoshi-Medium">{state.experience?.language?.name}</Text>
              </Stack>
            </HStack>
          </Box>
        </Skeleton>

        {/* Type of Experience */}
        <Skeleton
          isLoaded={!state.isLoading}
          p={{ base: `${spacing[16]}px`, sm: `${spacing[20]}px` }}
          mb={{ base: 0, sm: `${spacing[14]}px` }}
          width={{ base: '100%', sm: '49%' }}
          borderRadius={`${spacing[10]}px`}
          height={`${spacing[100]}px`}
        >
          <Box
            borderWidth={1}
            borderColor="gray.100"
            borderRadius={`${spacing[10]}px`}
            width={{ base: '100%', sm: '49%' }}
            p={{ base: `${spacing[16]}px`, sm: `${spacing[20]}px` }}
            mb={{ base: 0, sm: `${spacing[14]}px` }}
          >
            <HStack space={`${spacing[10]}px`} flexDirection={{ base: 'row', sm: 'column' }}>
              <Flex
                width={`${spacing[32]}px`}
                height={`${spacing[32]}px`}
                bg="primary.100"
                borderRadius="full"
                justifyContent="center"
                alignItems="center"
              >
                <Image
                  width={spacing[18]}
                  height={spacing[18]}
                  source={{
                    uri: resolveFileUrl(state.experience?.service?.imgPath)
                  }}
                  alt="Experience type icon"
                />
              </Flex>
              <Stack space={`${spacing[10]}px`} justifyContent="space-between">
                <Text color="gray.300">{en.experiences.details.experienceType}</Text>
                <Text fontFamily="Satoshi-Medium">{state.experience?.service?.name}</Text>
              </Stack>
            </HStack>
          </Box>
        </Skeleton>

        {/* Activity Level */}
        <Skeleton
          isLoaded={!state.isLoading}
          p={{ base: `${spacing[16]}px`, sm: `${spacing[20]}px` }}
          mb={{ base: 0, sm: `${spacing[14]}px` }}
          width={{ base: '100%', sm: '49%' }}
          borderRadius={`${spacing[10]}px`}
          height={`${spacing[100]}px`}
        >
          <Box
            borderWidth={1}
            borderColor="gray.100"
            borderRadius={`${spacing[10]}px`}
            width={{ base: '100%', sm: '49%' }}
            p={{ base: `${spacing[16]}px`, sm: `${spacing[20]}px` }}
            mb={{ base: 0, sm: `${spacing[14]}px` }}
          >
            <HStack space={`${spacing[10]}px`} flexDirection={{ base: 'row', sm: 'column' }}>
              <Flex
                width={`${spacing[32]}px`}
                height={`${spacing[32]}px`}
                bg="primary.100"
                borderRadius="full"
                justifyContent="center"
                alignItems="center"
              >
                <LineChartIcon />
              </Flex>
              <Stack space={`${spacing[10]}px`} justifyContent="space-between">
                <HStack space={`${spacing[10]}px`}>
                  <Text color="gray.300">{en.experiences.details.activityLevel.title}</Text>

                  <Tooltip
                    alignSelf="flex-start"
                    label={en.experiences.details.activityLevel.activeness}
                  >
                    <Icon as={Feather} name="info" color="gray.500" size={`${spacing[14]}px`} />
                  </Tooltip>
                </HStack>
                {/* <HStack alignItems="center" space={`${spacing[10]}px`}> */}
                <Text fontFamily="Satoshi-Medium">
                  {en.experiences.details.activityLevel.level(
                    state.experience?.instruction?.stressRating
                  )}
                </Text>
                {/* <Tooltip
                    label={en.experiences.details.activityLevel.tip(
                      state.experience?.instruction?.stressRating
                    )}
                  >
                    <Icon as={Feather} name="info" color="gray.500" size={`${spacing[14]}px`} />
                  </Tooltip> */}
                {/* </HStack> */}
              </Stack>
            </HStack>
          </Box>
        </Skeleton>

        {/* Maximum Group Size */}
        <Skeleton
          isLoaded={!state.isLoading}
          p={{ base: `${spacing[16]}px`, sm: `${spacing[20]}px` }}
          mb={{ base: 0, sm: `${spacing[14]}px` }}
          width={{ base: '100%', sm: '49%' }}
          borderRadius={`${spacing[10]}px`}
          height={`${spacing[100]}px`}
        >
          <Box
            borderWidth={1}
            borderColor="gray.100"
            borderRadius={`${spacing[10]}px`}
            width={{ base: '100%', sm: '49%' }}
            p={{ base: `${spacing[16]}px`, sm: `${spacing[20]}px` }}
            mb={{ base: 0, sm: `${spacing[14]}px` }}
          >
            <HStack space={`${spacing[10]}px`} flexDirection={{ base: 'row', sm: 'column' }}>
              <Flex
                width={`${spacing[32]}px`}
                height={`${spacing[32]}px`}
                bg="primary.100"
                borderRadius="full"
                justifyContent="center"
                alignItems="center"
              >
                <UsersIcon />
              </Flex>
              <Stack space={`${spacing[10]}px`} justifyContent="space-between">
                <Text color="gray.300">{en.experiences.details.maxCapacity}</Text>
                <Text fontFamily="Satoshi-Medium">
                  {state.experience?.bookingSetting?.privateGroupMaxCapacity >
                  state.experience?.bookingSetting?.maxCapacity
                    ? state.experience?.bookingSetting?.privateGroupMaxCapacity
                    : state.experience?.bookingSetting?.maxCapacity}
                </Text>
              </Stack>
            </HStack>
          </Box>
        </Skeleton>
      </Stack>
    </>
  );
}
