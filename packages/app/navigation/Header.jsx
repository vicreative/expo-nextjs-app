import { useCallback, useState } from 'react';
import { STATUS_BAR_HEIGHT } from 'app/constants/index';
import colors from 'app/config/theme/colors';
import { useRouter } from 'solito/router';
import { Feather } from '@expo/vector-icons';
import { Center, Flex, Heading, HStack, Icon, Menu, Text } from 'native-base';
import spacing from 'app/config/theme/spacing';
import Button from 'app/components/Button';
import Link from 'app/components/Link';
import { Platform } from 'react-native';
import en from 'app/i18n/index';
import useAppContext from 'app/hooks/useAppContext';
import logOut from 'app/utils/logOut';
import { useFocusEffect } from 'expo-next-react-navigation';
import { useQueryClient } from '@tanstack/react-query';
import useDimensions from 'app/hooks/useDimensions';
import { LogoWithText } from 'app/components/Icons/Logo';
import { UserCircle } from 'app/components/Icons/UserIcon';
import { NotificationIconWithCount } from 'app/components/NotificationCount';
import useWindow from 'app/hooks/useWindow';

let useNavigation = () => {};

if (Platform.OS !== 'web') {
  useNavigation = require('@react-navigation/native').useNavigation;
}

export default function Header({
  title,
  headerRight,
  extraComponent,
  headerBackgroundColor = colors.primary[100],
  headerPrimaryColor = 'base.black',
  headerCloseIconName = 'arrow-left',
  headerBorderBottomWidth = 0,
  onGoBack
}) {
  const { back, replace } = useRouter();
  const { state, dispatch } = useAppContext('navigation');
  const navigation = useNavigation();

  const {
    window: { width: WIDTH },
    screen: { height: SCREEN_HEIGHT }
  } = useDimensions();

  useFocusEffect(
    useCallback(() => {
      if (title) {
        dispatch({ ...state, headerTitle: title, onGoBack: onGoBack });
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [title])
  );

  const handleGoBack = () => {
    if (typeof onGoBack === 'function') {
      state.onGoBack();
    } else if (Platform.OS !== 'web' && !navigation.canGoBack()) {
      replace('/', undefined, {
        experimental: {
          nativeBehavior: 'stack-replace'
        }
      });
    } else {
      back();
    }
  };

  return (
    <Flex
      width={WIDTH}
      bg={headerBackgroundColor}
      pt={STATUS_BAR_HEIGHT + SCREEN_HEIGHT * 0.01}
      pb={SCREEN_HEIGHT * 0.014}
      px={spacing[20]}
      zIndex={1000}
      minHeight={`${SCREEN_HEIGHT * 0.1117}px`}
      justifyContent="center"
      borderBottomWidth={headerBorderBottomWidth}
      borderColor="gray.100"
      _web={{
        position: 'fixed',
        top: 0,
        pt: SCREEN_HEIGHT * 0.014,
        pb: SCREEN_HEIGHT * 0.014
      }}
    >
      <HStack alignItems="center" justifyContent="space-between" width="100%">
        <Button onPress={handleGoBack} p={0} size="sm" variant="unstyled">
          <Icon
            as={Feather}
            name={headerCloseIconName}
            size={`${spacing[24]}px`}
            color={headerPrimaryColor}
          />
        </Button>

        <HStack alignItems="center" maxWidth={WIDTH * 0.65}>
          <Heading fontSize={`${spacing[16]}px`} color={headerPrimaryColor} noOfLines={1}>
            {state?.headerTitle}
          </Heading>
        </HStack>

        <Flex minW={`${spacing[24]}px`} minH={`${spacing[20]}px`}>
          {headerRight ? headerRight : null}
        </Flex>
      </HStack>
      {extraComponent}
    </Flex>
  );
}

export const NavHeader = ({
  position = 'fixed',
  onlyLogo,
  borderWidth = 0,
  boxShadow = '0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06)',
  ...rest
}) => {
  const window = useWindow();
  const queryClient = useQueryClient();
  const [isSticky, setIsSticky] = useState(false);
  const { push } = useRouter();
  const { state, dispatch } = useAppContext('user');
  const {
    window: { height: HEIGHT }
  } = useDimensions();

  const isLoggedOut = state.isLoggedIn !== 'true' || state.token === null;

  if (Platform.OS === 'web' && typeof window !== 'undefined') {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 10) {
        setIsSticky(true);
      } else if (window.scrollY < 10) {
        setIsSticky(false);
      }
    });
  }

  const handleLogout = () => {
    logOut(state, dispatch, push);
    queryClient.invalidateQueries(['user-currency-info']);
  };

  return (
    <Center
      width="100%"
      position={position}
      top={0}
      borderColor="gray.100"
      borderWidth={borderWidth}
      style={{
        boxShadow: isSticky ? boxShadow : 'none'
      }}
      bg="white"
      zIndex={isSticky ? 1000 : 0}
    >
      <Flex
        height="88px"
        width="100%"
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
        backgroundColor="white"
        transition="all .3s ease"
        px={{
          sm: `${spacing[20]}px`,
          md: `${spacing[40]}px`,
          lg: `${spacing[64]}px`,
          '2xl': `${spacing[80]}px`
        }}
        {...rest}
      >
        <Flex
          maxWidth="1440px"
          width="100%"
          height="100%"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Link
            href="/"
            width={{
              sm: spacing[100] * 0.8,
              md: spacing[100],
              lg: spacing[100] * 1.5
            }}
            height={HEIGHT * 0.0425}
            _web={{
              width: { base: '134px', lg: '150px' },
              height: '42px'
            }}
          >
            <LogoWithText width={'100%'} height={'100%'} />
          </Link>
          {!onlyLogo && (
            <>
              <HStack
                space={`${spacing[2]}px`}
                p={`${spacing[4]}px`}
                borderRadius={`${spacing[12]}px`}
                bg="paper"
                alignItems="center"
              >
                {en.header.links.map((link, index) => (
                  <Link
                    key={link.id}
                    href={link.url}
                    color="gray.600"
                    textDecorationLine="none"
                    fontFamily="Satoshi-Regular"
                    px={{
                      sm: `${spacing[6]}px`,
                      md: `${spacing[10]}px`,
                      lg: `${spacing[16]}px`
                    }}
                    py={`${spacing[10]}px`}
                    borderRadius={`${spacing[8]}px`}
                    fontSize={{
                      sm: `${spacing[12]}px`,
                      lg: `${spacing[14]}px`
                    }}
                    isActive={
                      Platform.OS === 'web' &&
                      window?.location?.pathname.includes('experiences') &&
                      index === 3
                        ? true
                        : false
                    }
                  >
                    {link.name}
                  </Link>
                ))}
              </HStack>

              {isLoggedOut ? (
                <HStack
                  space={{
                    sm: `${spacing[4]}px`,
                    md: `${spacing[10]}px`,
                    lg: `${spacing[20]}px`
                  }}
                >
                  {en.header.buttons.map(btn => (
                    <Button
                      size="md"
                      key={btn.id}
                      href={btn.url}
                      variant={btn.variant}
                      colorScheme="secondary"
                      px={{ sm: `${spacing[10]}px`, lg: `${spacing[18]}px` }}
                      fontFamily="Satoshi-Medium"
                      fontSize={{
                        sm: `${spacing[14]}px`,
                        lg: `${spacing[16]}px`
                      }}
                      height={{
                        sm: `${spacing[40]}px`,
                        lg: `${spacing[44]}px`
                      }}
                    >
                      {btn.name}
                    </Button>
                  ))}
                </HStack>
              ) : (
                <HStack alignItems="center" space={`${spacing[16]}px`}>
                  <NotificationIconWithCount />
                  <Menu
                    bg="white"
                    placement="bottom right"
                    py={`${spacing[12]}px`}
                    borderRadius={`${spacing[8]}px`}
                    offset={24}
                    trigger={triggerProps => {
                      return (
                        <Button
                          variant="outline"
                          colorScheme="secondary"
                          size="md"
                          px={{
                            sm: `${spacing[10]}px`,
                            lg: `${spacing[18]}px`
                          }}
                          height={{
                            sm: `${spacing[40]}px`,
                            lg: `${spacing[44]}px`
                          }}
                          _text={{
                            color: 'gray.400',
                            fontSize: {
                              sm: `${spacing[12]}px`,
                              lg: `${spacing[14]}px`
                            }
                          }}
                          leftIcon={<UserCircle width={16} height={16} />}
                          rightIcon={<Icon as={Feather} name="chevron-down" size="16px" />}
                          {...triggerProps}
                        >
                          {en.header.user(state.user?.firstName)}
                        </Button>
                      );
                    }}
                    style={{
                      border: `1px solid ${colors.gray[100]}`,
                      boxShadow:
                        '0px 12px 16px -4px rgba(16, 24, 40, 0.08), 0px 4px 6px -2px rgba(16, 24, 40, 0.03)'
                    }}
                  >
                    {en.header
                      .dropdownLinks(
                        state.user?.profile?.country,
                        state.user?.isKycVerified,
                        state.business
                      )
                      .map(
                        link =>
                          link && (
                            <Menu.Item
                              key={link.id}
                              href={link.href}
                              py={`${spacing[10]}px`}
                              px={`${spacing[20]}px`}
                              mt={`${spacing[4]}px`}
                              _focus={{ bg: 'white' }}
                              _pressed={{ bg: 'white' }}
                              _hover={{
                                bg: link.color === 'error.600' ? 'error.50' : 'primary.50'
                              }}
                              _disabled={{ opacity: 0.3 }}
                              isDisabled={link.disabled}
                              onPress={() => {
                                if (link.name === 'Logout') {
                                  handleLogout();
                                }
                              }}
                            >
                              <HStack space={`${spacing[14]}px`}>
                                {link.icon}
                                <Text
                                  fontFamily="Satoshi-Medium"
                                  fontSize={`${spacing[14]}px`}
                                  color={link.color}
                                >
                                  {link.name}
                                </Text>
                              </HStack>
                            </Menu.Item>
                          )
                      )}
                  </Menu>
                </HStack>
              )}
            </>
          )}
        </Flex>
      </Flex>
    </Center>
  );
};
