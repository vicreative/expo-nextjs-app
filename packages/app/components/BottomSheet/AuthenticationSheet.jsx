import spacing from 'app/config/theme/spacing';
import en from 'app/i18n/index';
import { Stack, Text, VStack } from 'native-base';
import Button from '../Button';
import BottomSheet from './BottomSheet';
import env from 'app/config/env';
import { useRouter } from 'solito/router';
import { SheetManager } from 'react-native-actions-sheet';
import useDimensions from 'app/hooks/useDimensions';
import { Platform } from 'react-native';
import useAppContext from 'app/hooks/useAppContext';

function AuthenticationSheet(props) {
  const { push } = useRouter();
  const {
    window: { height }
  } = useDimensions();
  const { state, dispatch } = useAppContext('user');

  const goToRegistrationScreen = () => {
    SheetManager.hide('authentication-sheet');
    push('/register');
  };

  const goToLoginScreen = () => {
    SheetManager.hide('authentication-sheet');
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
    <BottomSheet id={props.sheetId}>
      <Stack
        pt={`${height * 0.02}px`}
        pb={`${height * 0.04}px`}
        px={`${spacing[24]}px`}
        alignItems="center"
      >
        <VStack space={height * 0.02} w="100%">
          <Button size="xl" w="100%" onPress={goToRegistrationScreen}>
            {en.onboarding.connect.register}
          </Button>
          <Button variant="outline" size="xl" w="100%" onPress={goToLoginScreen}>
            {en.onboarding.connect.login}
          </Button>
        </VStack>

        <Text fontSize={`${spacing[14]}px`} textAlign="center" color="gray.300" mt={height * 0.03}>
          {en.onboarding.condition.text}
        </Text>

        <Button variant="link" onPress={openPrivacyPolicy} size="sm" fontFamily="Satoshi-Medium">
          {en.onboarding.condition.link.privacy}
        </Button>
      </Stack>
    </BottomSheet>
  );
}

export default AuthenticationSheet;
