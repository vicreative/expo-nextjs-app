import spacing from 'app/config/theme/spacing';
import useAppContext from 'app/hooks/useAppContext';
import { Flex, Heading, Icon } from 'native-base';
import Touchable from './Gestures/Touchable';
import { Ionicons } from '@expo/vector-icons';
import useAsyncStorage from 'app/hooks/useAsyncStorage';

export function NotificationBadgeCount({ fontSize = `${spacing[12]}px`, count, ...rest }) {
  return (
    <Flex
      bg="red.600"
      borderRadius="full"
      p={`${spacing[4]}px`}
      alignItems="center"
      justifyContent="center"
      {...rest}
    >
      <Heading fontSize={fontSize} textAlign="center" color="white">
        {count}
      </Heading>
    </Flex>
  );
}

export function NotificationIconWithCount() {
  const { state: userState, dispatch } = useAppContext('user');
  const { isLoading, token, isLoggedIn } = useAsyncStorage();

  const isUserLoggedIn = !isLoading && (isLoggedIn === 'true' || token !== null);

  const openNotifications = () => {
    dispatch({
      ...userState,
      modal: {
        modalToShow: 'notifications',
        options: userState.modal.options
      }
    });
  };
  return (
    isUserLoggedIn && (
      <Touchable
        borderWidth={{ base: 0, sm: 1 }}
        borderColor="gray.500"
        flexDirection="row"
        borderRadius="full"
        alignItems="center"
        justifyContent="center"
        px={{ base: 0, sm: `${spacing[10]}px` }}
        height={{
          base: 'auto',
          sm: `${spacing[40]}px`,
          lg: `${spacing[44]}px`
        }}
        onPress={openNotifications}
      >
        <Icon
          as={Ionicons}
          name={'notifications-outline'}
          color={'gray.500'}
          size={{ base: `${spacing[24]}px`, sm: `${spacing[20]}px` }}
        />
        {userState.noOfNewActivity > 0 && (
          <NotificationBadgeCount
            fontSize={{ base: `${spacing[8]}px`, sm: `${spacing[10]}px` }}
            p={{ base: `${spacing[2]}px`, sm: `${spacing[4]}px` }}
            ml={{ base: 0, sm: `${spacing[8]}px` }}
            count={userState.noOfNewActivity}
            position={{ base: 'absolute', sm: 'relative' }}
            right={0}
            top={0}
            maxHeight={`${spacing[16]}px`}
            minWidth={`${spacing[16]}px`}
          />
        )}
      </Touchable>
    )
  );
}
