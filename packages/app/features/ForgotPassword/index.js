import AnimatedMultiStep from 'app/components/Form/AnimatedMultiStep';
import { Container } from 'app/components/index';
import { useRouter } from 'solito/router';
import { Step1, Step2, Step3 } from './components';
import { Flex, Hidden, Center, Box } from 'native-base';
import { NavHeader } from 'app/navigation/Header';
import en from 'app/i18n/index';
import useDimensions from 'app/hooks/useDimensions';
import { Platform } from 'react-native';
import { useEffect } from 'react';

const allSteps = [
  { name: 'step 1', component: Step1 },
  { name: 'step 2', component: Step2 },
  { name: 'step 3', component: Step3 }
];

const ForgotPassword = () => {
  const { back: goBack } = useRouter();
  const {
    screen: { height: SCREEN_HEIGHT }
  } = useDimensions();

  useEffect(() => {
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      const handleBeforeUnload = event => {
        event.preventDefault();
        event.returnValue = `Are you sure you want to leave this pages? Changes you've made may not be saved`; // Display a confirmation message (optional)
      };

      window.addEventListener('beforeunload', handleBeforeUnload);

      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
      };
    }
  }, []);

  return (
    <>
      {/* larger device(tablet & desktop) for web only */}
      <Hidden only="base">
        <Container pt={0} px={0} maxWidth="100%">
          <Flex
            height="100%"
            width="100%"
            alignItems="center"
            position="relative"
            justifyContent="center"
          >
            {/* header */}
            <Center>
              <NavHeader onlyLogo />
            </Center>

            {/* steps */}
            <Flex direction="column" width="100%" height="100%" maxWidth="420px" overflow="auto">
              <AnimatedMultiStep steps={allSteps} />
            </Flex>
          </Flex>
        </Container>
      </Hidden>
      {/* smaller device(mobile phones)for web & mobile app */}
      <Hidden from="sm">
        <Container
          pt={SCREEN_HEIGHT * 0.06}
          maxWidth="100%"
          headerTitle={en.forgotPassword.headerTitle}
          onGoBack={goBack}
        >
          <Box height="100%">
            {/* steps */}
            <AnimatedMultiStep
              steps={allSteps}
              comeInOnNext="fadeInUpBig"
              OutOnNext="fadeOutUpBig"
              comeInOnBack="fadeInDownBig"
              OutOnBack="fadeOutDownBig"
            />
          </Box>
        </Container>
      </Hidden>
    </>
  );
};

export default ForgotPassword;
