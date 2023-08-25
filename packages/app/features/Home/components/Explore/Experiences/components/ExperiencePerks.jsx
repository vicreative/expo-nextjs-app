import spacing from 'app/config/theme/spacing';
import { Stack, Text, Box, Skeleton, HStack, Heading, Icon, Divider } from 'native-base';
import en from 'app/i18n/index';
import useAppContext from 'app/hooks/useAppContext';
import { Feather } from '@expo/vector-icons';

export default function ExperiencePerks() {
  const { state } = useAppContext('experienceDetails');

  return (
    <>
      {state.experience?.discounts?.length ? (
        <Box mt={{ base: `${spacing[16]}px`, sm: `${spacing[40]}px` }}>
          <Skeleton
            isLoaded={!state.isLoading}
            p={{ base: `${spacing[16]}px`, sm: `${spacing[20]}px` }}
            width="100%"
            height="180px"
            borderRadius={`${spacing[10]}px`}
          >
            <Box
              borderWidth={{ base: 0, sm: 1 }}
              borderColor="gray.100"
              borderRadius={`${spacing[10]}px`}
              width="100%"
              pt={`${spacing[24]}px`}
              pb={{ base: 0, sm: `${spacing[24]}px` }}
              px={{ base: 0, sm: `${spacing[32]}px` }}
            >
              <Stack space={{ base: `${spacing[18]}px`, sm: `${spacing[24]}px` }}>
                <Heading fontSize={`${spacing[20]}px`}>
                  {en.experiences.details.selectDate.perks.heading}
                </Heading>

                <Skeleton isLoaded={!state.isLoading} borderRadius={`${spacing[10]}px`} w="100%">
                  <Box
                    borderWidth={{ base: 0, sm: '1px' }}
                    borderColor="primary.200"
                    bg="primary.100"
                    borderRadius={`${spacing[10]}px`}
                    w="100%"
                  >
                    <Box px={`${spacing[16]}px`}>
                      <HStack space={`${spacing[12]}px`} pt={`${spacing[14]}px`}>
                        <Icon
                          as={Feather}
                          name="percent"
                          color="primary.600"
                          size={`${spacing[26]}px`}
                        />

                        <Text fontFamily="Satoshi-Medium" fontSize={`${spacing[18]}px`}>
                          {en.experiences.details.selectDate.perks.groupDiscount.title}
                        </Text>
                      </HStack>
                      <Divider
                        bg="primary.200"
                        thickness="1"
                        mt={`${spacing[14]}px`}
                        mb={`${spacing[10]}px`}
                      />
                    </Box>
                    <Stack
                      space={`${spacing[16]}px`}
                      px={`${spacing[16]}px`}
                      pb={`${spacing[24]}px`}
                    >
                      {state.experience?.discounts?.map(discount => {
                        return (
                          <HStack
                            space={`${spacing[12]}px`}
                            justifyContent="space-between"
                            alignItems="center"
                            flexWrap="wrap"
                            key={discount.uuid}
                          >
                            <Text fontSize={`${spacing[16]}px`} color="gray.300">
                              {en.experiences.details.selectDate.perks.groupDiscount.persons(
                                discount.minUnits,
                                discount.maxUnits
                              )}
                            </Text>
                            <Heading fontSize={`${spacing[18]}px`}>
                              {en.experiences.details.selectDate.perks.groupDiscount.percentage(
                                discount.ratio * 100
                              )}
                            </Heading>
                          </HStack>
                        );
                      })}
                    </Stack>
                  </Box>
                </Skeleton>
              </Stack>
            </Box>
          </Skeleton>
        </Box>
      ) : null}
    </>
  );
}
