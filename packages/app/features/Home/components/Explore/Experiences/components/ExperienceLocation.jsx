import { Feather, Ionicons } from '@expo/vector-icons';
import { Button } from 'app/components/index';
import spacing from 'app/config/theme/spacing';
import useAppContext from 'app/hooks/useAppContext';
import en from 'app/i18n/index';
import { Box, Divider, Heading, Hidden, HStack, Icon, Skeleton, Stack, Text } from 'native-base';
import copyToClipboard from 'app/utils/copyToClipboard';

export default function ExperienceLocation() {
  const { state } = useAppContext('experienceDetails');

  const location = `${
    state.experience?.location?.apartmentNumber
      ? `${state.experience?.location?.apartmentNumber} `
      : ''
  }${state.experience?.location?.street}, ${state.experience?.location?.city} ${
    state.experience?.location?.zipCode
  }, ${state.experience?.location?.state}, ${state.experience?.location?.country}.`;

  const copyLocation = () => {
    copyToClipboard(location);
  };

  return (
    <>
      {/* smaller device(mobile phones)for web & mobile app */}
      <Hidden from="sm">
        <Divider bg="gray.100" thickness="1" mt={`${spacing[40]}px`} mb={`${spacing[16]}px`} />
      </Hidden>
      <Box mt={`${spacing[24]}px`}>
        <Skeleton
          isLoaded={!state.isLoading}
          p={{ base: `${spacing[16]}px`, sm: `${spacing[20]}px` }}
          width="100%"
          height="286px"
          borderRadius={`${spacing[10]}px`}
        >
          <Box
            borderWidth={1}
            borderColor="gray.100"
            borderRadius={`${spacing[10]}px`}
            width="100%"
            py={`${spacing[24]}px`}
            px={{ base: `${spacing[20]}px`, sm: `${spacing[32]}px` }}
          >
            <Stack space={`${spacing[27]}px`}>
              <Skeleton.Text lines={3} isLoaded={!state.isLoading}>
                <Stack space={{ base: `${spacing[14]}px`, lg: `${spacing[20]}px` }}>
                  <HStack space={`${spacing[14]}px`} alignItems="center">
                    <Icon as={Feather} name="map-pin" size={`${spacing[28]}px`} color="gray.500" />
                    <Heading fontSize={`${spacing[20]}px`}>
                      {en.experiences.details.location.heading}
                    </Heading>
                  </HStack>

                  <Text color="gray.300">{location}</Text>

                  <Button
                    variant="subtle"
                    minH={`${spacing[36]}px`}
                    p={0}
                    size="sm"
                    leftIcon={<Icon as={Ionicons} name="copy-outline" size={`${spacing[18]}px`} />}
                    width={{ base: '100%', sm: `${spacing[100] * 1.51}px` }}
                    onPress={copyLocation}
                  >
                    {en.experiences.details.location.copy}
                  </Button>
                </Stack>
              </Skeleton.Text>
            </Stack>
          </Box>
        </Skeleton>
      </Box>
    </>
  );
}
