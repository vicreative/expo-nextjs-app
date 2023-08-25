import { Box, Center, HStack, ScrollView, Stack, Text } from 'native-base';
import spacing from 'app/config/theme/spacing';
import { UserCircle } from './Icons/UserIcon';
import colors from 'app/config/theme/colors';
import Button from './Button';
import { useRouter } from 'solito/router';
import en from 'app/i18n/index';
import Link from './Link';
import useAppContext from 'app/hooks/useAppContext';
import { Platform } from 'react-native';
import env from 'app/config/env';
import { storeCurrentRoute } from 'app/utils/auth';

function LoginCard({
  currentRoute,
  heading,
  showSignUp = true,
  cardTitle = 'Log In to start exploring adventures',
  paddingTop = 0,
  ...rest
}) {
  const { push } = useRouter();
  const { state, dispatch } = useAppContext('user');

  const login = () => {
    storeCurrentRoute(currentRoute);
    push('/login');
  };

  const openPrivacyPolicy = () => {
    if (Platform.OS === 'web') {
      push(`${env.WEBSITE_URL}/privacy-policy`);
    } else {
      dispatch({
        ...state,
        modal: {
          modalToShow: 'privacyPolicy',
          options: state.modal.options
        }
      });
    }
  };
  return (
    <ScrollView px={`${spacing[24]}px`} pt={paddingTop} height="100%" width="100%" {...rest}>
      <Center height="100%" width="100%">
        <Stack width="100%" maxWidth="500px">
          {heading && (
            <Text
              fontFamily="Satoshi-Medium"
              fontSize={`${spacing[30]}px`}
              pt={`${spacing[20]}px`}
              pb={`${spacing[16]}px`}
            >
              {heading}
            </Text>
          )}
          <Box
            borderWidth={1}
            borderColor="gray.100"
            bg="white"
            shadow={5}
            borderRadius={`${spacing[20]}px`}
            py={`${spacing[20]}px`}
            px={`${spacing[24]}px`}
            alignItems="center"
            width="100%"
          >
            <UserCircle width={spacing[24]} height={spacing[24]} stroke={colors.gray[300]} />
            <Text
              fontFamily="Satoshi-Medium"
              fontSize={`${spacing[24]}px`}
              pt={`${spacing[24]}px`}
              pb={`${spacing[40]}px`}
              textAlign="center"
            >
              {cardTitle}
            </Text>
            <Box width="100%">
              <Button variant="solid" onPress={login} width="100%">
                {en.login.login}
              </Button>
            </Box>
            {showSignUp && (
              <HStack
                mt={`${spacing[16]}px`}
                justifyContent="center"
                space={`${spacing[4]}px`}
                flexWrap="wrap"
              >
                <Text>{en.login.noAccount}</Text>
                <Link href="/register">{en.login.signup}</Link>
              </HStack>
            )}
          </Box>
          {showSignUp && (
            <>
              <Text
                fontSize={`${spacing[14]}px`}
                textAlign="center"
                color="gray.300"
                pt={`${spacing[64]}px`}
              >
                {en.onboarding.condition.text}
              </Text>

              <Button
                variant="link"
                onPress={openPrivacyPolicy}
                size="sm"
                fontFamily="Satoshi-Medium"
              >
                {en.onboarding.condition.link.privacy}
              </Button>
            </>
          )}
        </Stack>
      </Center>
    </ScrollView>
  );
}

export default LoginCard;
