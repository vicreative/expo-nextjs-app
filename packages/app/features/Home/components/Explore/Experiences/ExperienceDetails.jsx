import { BackButton, Container, Footer } from 'app/components/index';
import { useExperienceDetailsQuery } from 'app/hooks/queries/useExperiences';
import useScreenParams from 'app/hooks/useScreenParams';
import { Box, Flex, Hidden, HStack, ScrollView, Skeleton } from 'native-base';
import { NavHeader } from 'app/navigation/Header';
import useAppContext from 'app/hooks/useAppContext';
import ExperienceMedia from './components/ExperienceMedia';
import Pricing from './components/Pricing';
import ExperienceBasicInfo from './components/ExperienceBasicInfo';
import spacing from 'app/config/theme/spacing';
import ExperiencePerks from './components/ExperiencePerks';
import ExperienceDescription from './components/ExperienceDescription';
import ExperienceProvisions from './components/ExperienceProvisions';
import ExperienceLocation from './components/ExperienceLocation';
import ExperienceItenaries from './components/ExperienceItenaries';
import ExperienceAuthor from './components/ExperienceAuthor';
import ExperienceImportantNotes from './components/ExperienceImportantNotes';
import ExperienceCancellationPolicy from './components/ExperienceCancellationPolicy';
import BackToTop from './components/BackToTop';
import { useRef } from 'react';
import ExperienceDates from './components/ExperienceDates';
import ErrorState from 'app/components/ErrorState';
import en from 'app/i18n/index';
import { useRouter } from 'solito/router';

const ExperienceDetails = () => {
  const { id } = useScreenParams();
  const scrollViewRef = useRef();
  const { state, dispatch } = useAppContext('experienceDetails');
  const { back } = useRouter();

  const { isError, refetch } = useExperienceDetailsQuery(id, {
    enabled: id ? true : false,
    onSuccess: data => {
      dispatch({ ...state, isLoading: false, experience: data });
    },
    onError: () => {
      dispatch({ ...state, isLoading: false, experience: {} });
    }
  });

  return (
    <>
      {/* larger device(tablet & desktop) for web only */}
      <Hidden only="base">
        <Box>
          <Container pt={0} px={0} mt="88px" ref={scrollViewRef}>
            {isError ? (
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
              <Flex
                width="100%"
                minHeight="60vh"
                mt="68px"
                mb="134px"
                px={{
                  base: '16px',
                  md: '40px',
                  lg: '64px',
                  xl: '88px'
                }}
              >
                <Skeleton.Text
                  isLoaded={!state.isLoading}
                  maxW="300px"
                  _line={{
                    height: `${spacing[40]}px`
                  }}
                  lines={1}
                  pb={'40px'}
                >
                  <BackButton colorScheme="primary" />
                </Skeleton.Text>
                <ExperienceMedia />
                <Box pt={`${spacing[55]}px`} pb={`${spacing[100] * 0.5}px`}>
                  <HStack justifyContent="space-between">
                    <Box width={'51.5%'}>
                      <ExperienceBasicInfo />
                      <ExperiencePerks />
                      <ExperienceDescription hideDivider />
                      <ExperienceProvisions />
                      <ExperienceLocation />
                      <ExperienceItenaries />
                      <ExperienceAuthor />
                      <ExperienceImportantNotes />
                      <ExperienceCancellationPolicy />
                    </Box>
                    <Box width={'44%'}>
                      <Pricing />
                    </Box>
                  </HStack>

                  <BackToTop scrollRef={scrollViewRef} />
                </Box>
              </Flex>
            )}
          </Container>
        </Box>
        <NavHeader />
        <Footer />
      </Hidden>

      {/* smaller device(mobile phones)for web & mobile app */}
      <Hidden from="sm">
        {isError ? (
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
          <Container
            px={0}
            pt={0}
            hidePaddingTop
            statusBarStyle="dark-content"
            statusBarBackgroundColor="transparent"
          >
            <ScrollView ref={scrollViewRef}>
              <ExperienceMedia />
              <Box px={`${spacing[24]}px`} pt={`${spacing[20]}px`} pb={spacing[100] * 2}>
                <ExperienceBasicInfo />
                <ExperiencePerks />
                <ExperienceDescription />
                <ExperienceProvisions />
                <ExperienceLocation />
                <ExperienceItenaries />
                <ExperienceAuthor />
                <ExperienceImportantNotes />
                <ExperienceCancellationPolicy />
                <BackToTop scrollRef={scrollViewRef} />
              </Box>
            </ScrollView>
            <Pricing />
          </Container>
        )}
      </Hidden>
      <ExperienceDates />
    </>
  );
};
export default ExperienceDetails;
