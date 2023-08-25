// import { Switch } from 'app/components/index';
import spacing from 'app/config/theme/spacing';
import useAppContext from 'app/hooks/useAppContext';
import en from 'app/i18n/index';
import { Box, Divider, Heading, HStack, Skeleton, Stack, Text, Switch } from 'native-base';

export default function PrivateBooking() {
  const { state, dispatch } = useAppContext('experienceDetails');

  const noOfTicketsLeft =
    state.experience?.bookingSetting?.privateGroupMaxCapacity - state.schedule?.numTickets;

  const toggleSwitch = () => {
    dispatch({
      ...state,
      isPrivateBooking: !state.isPrivateBooking,
      noOfAdults: state.noOfAdults > noOfTicketsLeft ? noOfTicketsLeft : state.noOfAdults
    });
  };

  return (
    <>
      {state.experience?.bookingSetting?.bookingType !== 'PUBLIC' ? (
        noOfTicketsLeft < state.experience?.bookingSetting?.privateGroupMaxCapacity ? null : (
          <Stack space={`${spacing[14]}px`} mt={`${spacing[40]}px`}>
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
                  {en.experiences.bookExperience.privateBooking.heading}
                </Heading>
                <Divider bg="gray.100" thickness="1" my={`${spacing[18]}px`} />
                <Stack
                  space={`${spacing[4]}px`}
                  pb={{ base: `${spacing[16]}px`, sm: `${spacing[24]}px` }}
                  px={{ base: `${spacing[16]}px`, sm: `${spacing[32]}px` }}
                >
                  <Text color="gray.300">
                    {en.experiences.bookExperience.privateBooking.content(
                      state.experience?.business?.name,
                      state.experience?.bookingSetting?.privateGroupMaxCapacity
                    )}
                  </Text>
                  <HStack
                    w="100%"
                    justifyContent="space-between"
                    alignItems="center"
                    mt={`${spacing[18]}px`}
                  >
                    <Text fontFamily="Satoshi-Medium">
                      {en.experiences.bookExperience.privateBooking.label}
                    </Text>
                    <Switch
                      colorScheme="primary"
                      onToggle={toggleSwitch}
                      isDisabled={state.experience?.bookingSetting?.bookingType === 'PRIVATE'}
                      isChecked={state.isPrivateBooking}
                    />
                  </HStack>
                </Stack>
              </Box>
            </Skeleton>
          </Stack>
        )
      ) : null}
    </>
  );
}
