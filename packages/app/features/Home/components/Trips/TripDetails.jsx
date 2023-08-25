import { Button, Container } from 'app/components/index';
import AccountLayout from 'app/components/Layout/AccountLayout';
import useScreenParams from 'app/hooks/useScreenParams';
import en from 'app/i18n/index';
import { Hidden, Box, Flex, HStack, Stack, Icon, ScrollView, Skeleton } from 'native-base';
import Breadcrumb from 'app/components/Breadcrumb';
import { useRouter } from 'solito/router';
import ExperienceProvisions from '../Explore/Experiences/components/ExperienceProvisions';
// import PerksForYou from '../Explore/Experiences/components/PerksForYou';
import ExperienceCancellationPolicy from '../Explore/Experiences/components/ExperienceCancellationPolicy';
import spacing from 'app/config/theme/spacing';
import { useTicketQuery } from 'app/hooks/queries/useUserProfile';
import useAppContext from 'app/hooks/useAppContext';
import ExperienceImportantNotes from '../Explore/Experiences/components/ExperienceImportantNotes';
import ErrorState from 'app/components/ErrorState';
import { TripExperienceDetails, TripInfo } from './components/TripBasicInfo';
import ViewTicket from './components/ViewTicket';
import { useState } from 'react';
import Receipt from './components/Receipt';
import { Feather } from '@expo/vector-icons';
import ReportModal from 'app/components/Modal/ReportModal';
import { FileXIcon } from 'app/components/Icons/File';
import ReceiptModal from 'app/components/Modal/ReceiptModal';
import CancelExperienceModal from 'app/components/Modal/CancelExperienceModal';
import ExperienceItenaries from '../Explore/Experiences/components/ExperienceItenaries';

function TripDetails() {
  const { id } = useScreenParams();
  const { push, back } = useRouter();
  const [show, setShow] = useState('');
  const { state, dispatch } = useAppContext('experienceDetails');

  const { data, isError, refetch } = useTicketQuery(id, {
    enabled: id ? true : false,
    onSuccess: data => {
      dispatch({
        ...state,
        isLoading: false,
        noOfAdults: data.booking.units,
        experience: data.experience,
        schedule: data.schedule
      });
    },
    onError: () => {
      dispatch({ ...state, isLoading: false, experience: {}, schedule: {} });
    }
  });

  return (
    <>
      {/* larger device(tablet & desktop) for web only */}
      <Hidden only="base">
        <AccountLayout>
          {show === 'ticket' ? (
            <Box mt="46px">
              <Breadcrumb
                as="button"
                variant="accent"
                data={[
                  {
                    id: 0,
                    name: en.profile.trips.heading,
                    onPress: () => push(`/trips`)
                  },
                  {
                    id: 1,
                    name: en.profile.trips.info.headerTitle,
                    onPress: () => setShow('')
                  },
                  {
                    id: 2,
                    name: en.profile.trips.info.ticket.heading,
                    onPress: () => {}
                  }
                ]}
              />
              <Receipt isTicket data={data} />
            </Box>
          ) : (
            <Box mt="46px">
              <Breadcrumb
                as="button"
                variant="accent"
                data={[
                  {
                    id: 0,
                    name: en.profile.trips.heading,
                    onPress: () => push(`/trips`)
                  },
                  {
                    id: 1,
                    name: en.profile.trips.info.headerTitle,
                    onPress: () => {}
                  }
                ]}
              />
              {isError ? (
                <Flex height="100%" minHeight="70vh" justifyContent="center" alignItems="center">
                  <ErrorState
                    isModal={false}
                    title={en.profile.trips.info.error.heading}
                    text={en.profile.trips.info.error.message}
                    btnText={en.profile.trips.info.error.linkText}
                    onGoBack={back}
                    onDismiss={() => {
                      dispatch({ ...state, isLoading: true });
                      refetch();
                    }}
                  />
                </Flex>
              ) : (
                <Flex
                  width="100%"
                  minHeight="60vh"
                  mt="40px"
                  px={{
                    base: '16px',
                    md: '40px'
                  }}
                >
                  <HStack justifyContent="space-between">
                    <Box width="50%">
                      <TripExperienceDetails />
                      {data?.cancelledAt === null && (
                        <>
                          {/* <PerksForYou /> TODO:MIGHT REMOVE THIS */}

                          <ExperienceProvisions
                            hideDivider
                            marginTop={`${spacing[40]}px`}
                            space={`${spacing[40]}px`}
                          />
                          <Box mt={`${spacing[16]}px`} mb={`${spacing[26]}px`}>
                            <ExperienceItenaries />
                          </Box>
                          <Box
                            mt={
                              state.experience?.type === 'REGULAR'
                                ? `${-spacing[26]}px`
                                : `${-spacing[10]}px`
                            }
                            mb={`${spacing[16]}px`}
                          >
                            <ExperienceImportantNotes />
                          </Box>
                          <ExperienceCancellationPolicy />
                        </>
                      )}
                    </Box>
                    <Box width="40%">
                      <TripInfo cancelledAt={data?.cancelledAt} />
                      {data?.cancelledAt === null && (
                        <ViewTicket
                          cancelledAt={data?.cancelledAt}
                          endDatetime={data?.schedule?.endDatetime}
                          onViewTicket={() => setShow('ticket')}
                          onReport={() => setShow('reportExperience')}
                          onCancel={() => setShow('cancelExperience')}
                        />
                      )}
                    </Box>
                  </HStack>
                  {data?.cancelledAt && (
                    <Skeleton
                      isLoaded={!state.isLoading}
                      height={`${spacing[20]}px`}
                      borderRadius="full"
                      mt="60px"
                      maxWidth="200px"
                      alignSelf="center"
                    >
                      <Button
                        alignSelf="center"
                        colorScheme="secondary"
                        variant="unstyled"
                        size="sm"
                        mt="60px"
                        maxWidth="200px"
                        leftIcon={<Icon as={Feather} name="flag" size="18px" color="base.black" />}
                        onPress={() => setShow('reportExperience')}
                      >
                        {en.profile.trips.info.report.heading}
                      </Button>
                    </Skeleton>
                  )}
                </Flex>
              )}
            </Box>
          )}
        </AccountLayout>
      </Hidden>
      {/* smaller device(mobile phones)for web & mobile app */}
      <Hidden from="sm">
        <Container pt={0} px={0} headerTitle={en.profile.trips.info.headerTitle}>
          <Box>
            {isError ? (
              <Flex h="100%" _web={{ h: '70vh' }} justifyContent="center" alignItems="center">
                <ErrorState
                  isModal={false}
                  title={en.profile.trips.info.error.heading}
                  text={en.profile.trips.info.error.message}
                  btnText={en.profile.trips.info.error.linkText}
                  onGoBack={back}
                  onDismiss={() => {
                    dispatch({ ...state, isLoading: true });
                    refetch();
                  }}
                />
              </Flex>
            ) : (
              <>
                <ScrollView pt={`${spacing[24]}px`} px={`${spacing[24]}px`}>
                  <TripInfo cancelledAt={data?.cancelledAt} />
                  {data?.cancelledAt === null && (
                    <ViewTicket onViewTicket={() => setShow('ticket')} />
                  )}
                  <Box pt={`${spacing[40]}px`}>
                    <TripExperienceDetails />
                  </Box>
                  {data?.cancelledAt === null && (
                    <>
                      {/* <PerksForYou /> TODO:MIGHT REMOVE THIS */}
                      <Box pt={`${spacing[40]}px`}>
                        <ExperienceProvisions hideDivider />
                      </Box>
                      <Box mt={`${spacing[16]}px`} mb={`${spacing[20]}px`}>
                        <ExperienceItenaries hideDivider />
                      </Box>
                      <Box
                        mt={
                          state.experience?.type === 'REGULAR'
                            ? `${-spacing[22]}px`
                            : `${-spacing[6]}px`
                        }
                      >
                        <ExperienceImportantNotes hideDivider />
                        <ExperienceCancellationPolicy />
                      </Box>
                    </>
                  )}
                  <Stack
                    mt={`${spacing[30]}px`}
                    space={state.isLoading ? `${spacing[10]}px` : `${spacing[30]}px`}
                    mb={`${spacing[100]}px`}
                  >
                    {data?.cancelledAt === null &&
                      (new Date() < new Date(data?.schedule?.endDatetime) ? (
                        <Skeleton
                          isLoaded={!state.isLoading}
                          height={`${spacing[20]}px`}
                          borderRadius="full"
                        >
                          <Button
                            colorScheme="secondary"
                            variant="unstyled"
                            size="sm"
                            leftIcon={<FileXIcon />}
                            onPress={() => setShow('cancelExperience')}
                          >
                            {en.profile.trips.info.cancel.heading}
                          </Button>
                        </Skeleton>
                      ) : null)}
                    <Skeleton
                      isLoaded={!state.isLoading}
                      height={`${spacing[20]}px`}
                      borderRadius="full"
                    >
                      <Button
                        colorScheme="secondary"
                        variant="unstyled"
                        size="sm"
                        leftIcon={<Icon as={Feather} name="flag" size="18px" color="base.black" />}
                        onPress={() => setShow('reportExperience')}
                      >
                        {en.profile.trips.info.report.heading}
                      </Button>
                    </Skeleton>
                  </Stack>
                </ScrollView>
                {show === 'ticket' && (
                  <ReceiptModal isTicket data={data} visible onClose={() => setShow('')} />
                )}
              </>
            )}
          </Box>
        </Container>
      </Hidden>

      {show === 'reportExperience' && (
        <ReportModal data={data} visible onClose={() => setShow('')} />
      )}

      {show === 'cancelExperience' && (
        <CancelExperienceModal
          experienceType={state.experience?.type}
          additionalCancellationInfo={state.experience?.bookingSetting?.additionalCancellationInfo}
          data={data}
          visible
          onClose={() => setShow('')}
        />
      )}
    </>
  );
}

export default TripDetails;
