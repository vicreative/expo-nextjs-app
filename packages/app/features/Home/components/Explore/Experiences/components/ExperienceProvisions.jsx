import { AntDesign, Feather } from '@expo/vector-icons';
import spacing from 'app/config/theme/spacing';
import { useProvisionsQuery } from 'app/hooks/queries/useProvisions';
import useAppContext from 'app/hooks/useAppContext';
import en from 'app/i18n/index';
import { Divider, Heading, Hidden, HStack, Icon, Skeleton, Stack, Text } from 'native-base';

export default function ExperienceProvisions({
  hideDivider,
  marginTop = `${spacing[32]}px`,
  space = `${spacing[24]}px`
}) {
  const { state } = useAppContext('experienceDetails');
  const { data: provisions } = useProvisionsQuery(
    '',
    `?type=${state.experience?.type === 'REGULAR' ? 'city' : 'travel'}`,
    { enabled: state.experience?.type ? true : false }
  );

  const provisionsNotIcluded =
    provisions && state.experience?.experienceProvisions
      ? provisions?.filter(elem => {
          return !state.experience?.experienceProvisions?.some(ele => {
            return ele.provision.uuid === elem.uuid;
          });
        })
      : [];

  return (
    <>
      {/* larger device(tablet & desktop) for web only */}
      <Hidden only="base">
        <Stack
          justifyContent="space-between"
          flexDirection={'column'}
          mt={marginTop}
          width="100%"
          space={space}
        >
          {/*  What’s included*/}
          {state.experience?.experienceProvisions?.length ? (
            <Skeleton
              width={'100%'}
              isLoaded={!state.isLoading}
              py={`${spacing[24]}px`}
              px={`${spacing[32]}px`}
              borderRadius={`${spacing[10]}px`}
            >
              <Stack
                width={'100%'}
                borderWidth={1}
                borderColor="gray.100"
                py={`${spacing[24]}px`}
                px={`${spacing[32]}px`}
                space={`${spacing[24]}px`}
                borderRadius={`${spacing[10]}px`}
              >
                <Skeleton.Text lines={1} isLoaded={!state.isLoading}>
                  <Heading fontSize={`${spacing[20]}px`}>
                    {en.experiences.details.provisions.included}
                  </Heading>
                </Skeleton.Text>

                <HStack space={`${spacing[14]}px`} flexWrap="wrap" width="100%">
                  {state.experience?.experienceProvisions?.map(provision => (
                    <HStack
                      space={`${spacing[12]}px`}
                      width="48.5%"
                      alignItems="center"
                      key={provision.uuid}
                    >
                      <Icon
                        as={Feather}
                        name="check-circle"
                        size={`${spacing[24]}px`}
                        color="success.600"
                      />
                      <Text fontFamily="Satoshi-Medium">{provision.provision.name}</Text>
                    </HStack>
                  ))}
                </HStack>
              </Stack>
            </Skeleton>
          ) : null}

          {/*  What’s NOT included*/}
          {provisionsNotIcluded?.length ? (
            <Skeleton
              width={'100%'}
              isLoaded={!state.isLoading}
              py={`${spacing[24]}px`}
              px={`${spacing[32]}px`}
              borderRadius={`${spacing[10]}px`}
            >
              <Stack
                width={'100%'}
                borderWidth={1}
                borderColor="gray.100"
                py={`${spacing[24]}px`}
                px={`${spacing[32]}px`}
                space={`${spacing[24]}px`}
                borderRadius={`${spacing[10]}px`}
              >
                <Skeleton.Text lines={1} isLoaded={!state.isLoading}>
                  <Heading fontSize={`${spacing[20]}px`}>
                    {en.experiences.details.provisions.excluded}
                  </Heading>
                </Skeleton.Text>

                <HStack space={`${spacing[14]}px`} flexWrap="wrap" width="100%">
                  {provisionsNotIcluded?.map(provision => (
                    <HStack
                      space={`${spacing[12]}px`}
                      width="48.5%"
                      alignItems="center"
                      key={provision.uuid}
                    >
                      <Icon
                        as={AntDesign}
                        name="close"
                        size={`${spacing[24]}px`}
                        color="gray.300"
                      />
                      <Text fontFamily="Satoshi-Medium">{provision.name}</Text>
                    </HStack>
                  ))}
                </HStack>
              </Stack>
            </Skeleton>
          ) : null}
        </Stack>
      </Hidden>

      {/* smaller device(mobile phones)for web & mobile app */}
      <Hidden from="sm">
        {!hideDivider && (
          <Divider
            bg="gray.100"
            thickness="1"
            mt={{ base: `${spacing[40]}px`, lg: `${spacing[24]}px` }}
            mb={`${spacing[40]}px`}
          />
        )}

        {/*  What’s included*/}
        {state.experience?.experienceProvisions?.length ? (
          <>
            <Skeleton.Text lines={1} isLoaded={!state.isLoading} pb={`${spacing[18]}px`}>
              <Heading fontSize={`${spacing[20]}px`} pb={`${spacing[18]}px`}>
                {en.experiences.details.provisions.included}
              </Heading>
            </Skeleton.Text>

            <Skeleton
              isLoaded={!state.isLoading}
              p={`${spacing[16]}px`}
              mb={`${spacing[40]}px`}
              borderRadius={`${spacing[10]}px`}
            >
              <Stack space={`${spacing[14]}px`} pb={`${spacing[40]}px`}>
                {state.experience?.experienceProvisions?.map(provision => (
                  <HStack
                    borderWidth={1}
                    borderColor="gray.100"
                    p={`${spacing[16]}px`}
                    space={`${spacing[12]}px`}
                    borderRadius={`${spacing[10]}px`}
                    key={provision.uuid}
                    alignItems="center"
                  >
                    <Icon
                      as={Feather}
                      name="check-circle"
                      size={`${spacing[24]}px`}
                      color="success.600"
                    />
                    <Text fontFamily="Satoshi-Medium">{provision.provision.name}</Text>
                  </HStack>
                ))}
              </Stack>
            </Skeleton>
          </>
        ) : null}

        {/*  What’s NOT included*/}
        {provisionsNotIcluded?.length ? (
          <>
            <Skeleton.Text lines={1} isLoaded={!state.isLoading} pb={`${spacing[18]}px`}>
              <Heading fontSize={`${spacing[20]}px`} pb={`${spacing[18]}px`}>
                {en.experiences.details.provisions.excluded}
              </Heading>
            </Skeleton.Text>

            <Skeleton
              isLoaded={!state.isLoading}
              p={`${spacing[16]}px`}
              borderRadius={`${spacing[10]}px`}
            >
              <Stack space={`${spacing[14]}px`}>
                {provisionsNotIcluded?.map(provision => (
                  <HStack
                    borderWidth={1}
                    borderColor="gray.100"
                    p={`${spacing[16]}px`}
                    space={`${spacing[12]}px`}
                    borderRadius={`${spacing[10]}px`}
                    key={provision.uuid}
                    alignItems="center"
                  >
                    <Icon as={AntDesign} name="close" size={`${spacing[24]}px`} color="gray.300" />
                    <Text fontFamily="Satoshi-Medium">{provision.name}</Text>
                  </HStack>
                ))}
              </Stack>
            </Skeleton>
          </>
        ) : null}
      </Hidden>
    </>
  );
}
