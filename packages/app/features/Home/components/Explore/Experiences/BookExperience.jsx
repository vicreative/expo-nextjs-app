import { Container, Footer } from 'app/components/index';
import {
  useExperienceDetailsQuery,
  useExperienceScheduleQuery
} from 'app/hooks/queries/useExperiences';
import useScreenParams from 'app/hooks/useScreenParams';
import { Box, Flex, Hidden, HStack, ScrollView } from 'native-base';
import { NavHeader } from 'app/navigation/Header';
import useAppContext from 'app/hooks/useAppContext';
import spacing from 'app/config/theme/spacing';
import ExperienceProvisions from './components/ExperienceProvisions';
import ExperienceCancellationPolicy from './components/ExperienceCancellationPolicy';
// import PerksForYou from './components/PerksForYou'; TODO: MIGHT REMOVE THIS
import PriceDetails from './components/PriceDetails';
import BookExperienceBasicInfo, {
  BookExperienceDetails,
  BookExperienceInfo
} from './components/BookExperienceBasicInfo';
import ExperienceDates from './components/ExperienceDates';
import AddParticipant from './components/AddParticipant';
import BookExperienceHero from './components/BookExperienceHero';
import ErrorState from 'app/components/ErrorState';
import en from 'app/i18n/index';
import { useRouter } from 'solito/router';
import MakePayment from './components/MakePayment';
import ExperienceImportantNotes from './components/ExperienceImportantNotes';
import PrivateBooking from './components/PrivateBooking';

const BookExperience = () => {
  const { back } = useRouter();
  const { id, scheduleId } = useScreenParams();
  const { state, dispatch } = useAppContext('experienceDetails');

  const {
    data: schedule,
    isSuccess,
    isError,
    refetch
  } = useExperienceScheduleQuery(scheduleId, {
    enabled: scheduleId ? true : false
  });

  const { isLoading, isError: hasErrorFetchingExperience } = useExperienceDetailsQuery(id, {
    enabled: id && isSuccess ? true : false,
    onSuccess: data => {
      dispatch({ ...state, isLoading: false, experience: data, schedule });
    },
    onError: () => {
      dispatch({ ...state, isLoading: false, experience: {}, schedule: {} });
    }
  });

  return (
    <>
      {/* larger device(tablet & desktop) for web only */}
      <Hidden only="base">
        <Box mt="88px">
          <BookExperienceHero isLoading={isLoading} />
          <Container pt={0} px={0}>
            {isError || hasErrorFetchingExperience ? (
              <Flex height="100%" minHeight="70vh" justifyContent="center" alignItems="center">
                <ErrorState
                  isModal={false}
                  title={en.experiences.details.error.heading}
                  text={en.experiences.details.error.message}
                  btnText={en.experiences.details.error.linkText}
                  onGoBack={back}
                  onDismiss={() => {
                    dispatch({ ...state, isLoading: true });
                    refetch();
                  }}
                />
              </Flex>
            ) : (
              <>
                <Flex
                  width="100%"
                  minHeight="60vh"
                  mt="88px"
                  mb="134px"
                  px={{
                    base: '16px',
                    md: '40px',
                    lg: '88px',
                    xl: '122px'
                  }}
                >
                  <HStack justifyContent="space-between">
                    <Box width="50%">
                      <BookExperienceDetails />
                      <PrivateBooking />
                      <PriceDetails />
                      <AddParticipant />
                      <ExperienceProvisions hideDivider marginTop={0} space={`${spacing[40]}px`} />
                      {/* <PerksForYou /> TODO: MIGHT REMOVE THIS */}
                      <Box mt="16px">
                        <ExperienceImportantNotes />
                      </Box>
                      <Box mt="16px">
                        <ExperienceCancellationPolicy />
                      </Box>
                    </Box>
                    <Box width="40%">
                      <BookExperienceInfo />
                      <MakePayment />
                    </Box>
                  </HStack>
                </Flex>
              </>
            )}
          </Container>
        </Box>
        <NavHeader />
        <Footer />
      </Hidden>

      {/* smaller device(mobile phones)for web & mobile app */}
      <Hidden from="sm">
        {isError || hasErrorFetchingExperience ? (
          <Flex height="100%" justifyContent="center" alignItems="center">
            <ErrorState
              isModal={false}
              title={en.experiences.details.error.heading}
              text={en.experiences.details.error.message}
              btnText={en.experiences.details.error.linkText}
              onGoBack={back}
              onDismiss={() => {
                dispatch({ ...state, isLoading: true });
                refetch();
              }}
            />
          </Flex>
        ) : (
          <Container headerTitle={'Confirm and Pay'} pt={0} px={0}>
            <Box>
              <ScrollView>
                <Box pt={`${spacing[40]}px`} px={`${spacing[24]}px`}>
                  <BookExperienceBasicInfo />
                  <PrivateBooking />
                  <PriceDetails />
                  <AddParticipant />
                  <ExperienceProvisions hideDivider />
                  {/* <PerksForYou />TODO: MIGHT REMOVE THIS */}
                  <Box mt="16px">
                    <ExperienceImportantNotes hideDivider />
                    <ExperienceCancellationPolicy />
                  </Box>
                </Box>
                <MakePayment />
              </ScrollView>
            </Box>
          </Container>
        )}
      </Hidden>
      <ExperienceDates />
    </>
  );
};
export default BookExperience;
