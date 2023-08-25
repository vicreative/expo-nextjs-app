import { AntDesign, Feather, MaterialCommunityIcons, Octicons } from '@expo/vector-icons';
import spacing from 'app/config/theme/spacing';
import { usePerksQuery } from 'app/hooks/queries/useExperiences';
import useAppContext from 'app/hooks/useAppContext';
import en from 'app/i18n/index';
import { Box, Divider, Heading, HStack, Icon, Skeleton, Stack, Text } from 'native-base';

export default function PerksForYou() {
  const { state } = useAppContext('experienceDetails');
  const { data: perks } = usePerksQuery();

  const discounts = state.experience?.discounts;

  const discount = discounts?.find(item =>
    state.noOfAdults >= item.minUnits && state.noOfAdults <= item.maxUnits ? item : undefined
  );

  return (
    <Stack space={`${spacing[14]}px`} mt={`${spacing[40]}px`} mb={`${spacing[26]}px`}>
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
            {en.experiences.bookExperience.perks.heading}
          </Heading>
          <Divider bg="gray.100" thickness="1" my={`${spacing[18]}px`} />
          <Stack
            space={`${spacing[18]}px`}
            pb={{ base: `${spacing[16]}px`, sm: `${spacing[24]}px` }}
            px={{ base: `${spacing[16]}px`, sm: `${spacing[32]}px` }}
          >
            {perks
              ?.filter(element =>
                state.experience?.type === 'REGULAR'
                  ? element.name.toLowerCase() === 'group discounts'
                  : element
              )
              ?.map((perk, index) => {
                const experiencePerkIndex = state.experience?.experiencePerks?.findIndex(
                  element => element.perk.uuid === perk.uuid
                );

                return (
                  <HStack
                    key={perk.uuid}
                    w="100%"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <HStack space={`${spacing[12]}px`}>
                      {perk.name.toLowerCase() === 'flight booking' ? (
                        <Icon
                          as={MaterialCommunityIcons}
                          name="ticket-confirmation-outline"
                          color="primary.600"
                          size={`${spacing[26]}px`}
                        />
                      ) : perk.name.toLowerCase() === 'group discounts' ? (
                        <Icon
                          as={Feather}
                          name="percent"
                          color="primary.600"
                          size={`${spacing[26]}px`}
                        />
                      ) : perk.name.toLowerCase() === 'visa application' ? (
                        <Icon
                          as={Octicons}
                          name="checklist"
                          color="primary.600"
                          size={`${spacing[26]}px`}
                        />
                      ) : null}
                      <Text fontFamily="Satoshi-Medium">{perk.name}</Text>
                    </HStack>

                    {perk.name.toLowerCase() !== 'group discounts' &&
                      (index === experiencePerkIndex ? (
                        <Icon
                          as={Feather}
                          name="check-circle"
                          size={`${spacing[24]}px`}
                          color="success.600"
                        />
                      ) : (
                        <Icon
                          as={AntDesign}
                          name="close"
                          size={`${spacing[24]}px`}
                          color="gray.300"
                        />
                      ))}

                    {perk.name.toLowerCase() === 'group discounts' &&
                      (discount ? (
                        <Icon
                          as={Feather}
                          name="check-circle"
                          size={`${spacing[24]}px`}
                          color="success.600"
                        />
                      ) : (
                        <Icon
                          as={AntDesign}
                          name="close"
                          size={`${spacing[24]}px`}
                          color="gray.300"
                        />
                      ))}
                  </HStack>
                );
              })}
          </Stack>
        </Box>
      </Skeleton>
      <Skeleton.Text
        lines={1}
        isLoaded={!state.isLoading}
        _line={{
          height: `${spacing[16]}px`
        }}
      >
        <Text color="gray.400">
          {en.experiences.bookExperience.perks.groupDiscount.tip(
            discount,
            state.experience?.bookingSetting?.minGroupSize,
            state.noOfAdults
          )}
        </Text>
      </Skeleton.Text>
    </Stack>
  );
}
