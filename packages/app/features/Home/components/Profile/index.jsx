import NotFound from 'app/features/NotFound';
import { AntDesign, Entypo, Ionicons } from '@expo/vector-icons';
import MultiColumnCard from 'app/components/Cards/MultiColumnCard';
import Touchable from 'app/components/Gestures/Touchable';
import { CreditCardOutline } from 'app/components/Icons/CreditCard';
import { UserOutlinedIcon } from 'app/components/Icons/UserIcon';
import { BankOutline } from 'app/components/Icons/Bank';

import { Button, Container } from 'app/components/index';
import UploadModal from 'app/components/Modal/UploadModal';
import spacing from 'app/config/theme/spacing';
import useAppContext from 'app/hooks/useAppContext';
import en from 'app/i18n/index';
import {
  Box,
  Divider,
  Heading,
  HStack,
  Icon,
  ScrollView,
  Stack,
  Text,
  VStack,
  Hidden
} from 'native-base';
import { resolveFileUrl } from 'app/utils/index';
import { resolvePrice } from 'app/utils/resolvePrice';
import colors from 'app/config/theme/colors';
import { ArchiveOutlineIcon } from 'app/components/Icons/Archive';
import { Platform } from 'react-native';
import { useUpdateUserMutation } from 'app/hooks/mutations/useUserProfile';
import { useState } from 'react';
import uploadToAws from 'app/utils/uploadToAws';
import { useQueryClient } from '@tanstack/react-query';
import * as Linking from 'expo-linking';
import logOut from 'app/utils/logOut';
import { useRouter } from 'solito/router';
import AmountText from 'app/components/AmountText';
import useDimensions from 'app/hooks/useDimensions';
import env from 'app/config/env';
import { NotificationIconWithCount } from 'app/components/NotificationCount';
import LoginCard from 'app/components/LoginCard';
import * as Application from 'expo-application';
import { Logo } from 'app/components/Icons/Logo';
import AboutModal from 'app/components/Modal/AboutModal';
import useWindow from 'app/hooks/useWindow';

export default function Profile() {
  const window = useWindow();
  const { push } = useRouter();
  const queryClient = useQueryClient();
  const {
    screen: { height: SCREEN_HEIGHT }
  } = useDimensions();

  const [state, setState] = useState({
    image: null,
    sticky: false,
    isSubmitting: false,
    showAboutModal: ''
  });

  const { state: userState, dispatch } = useAppContext('user');

  const isLoggedOut = userState.isLoggedIn !== 'true' || userState.token === null;

  const { updateUser, updateUserState } = useUpdateUserMutation();

  const updateProfile = fileName => {
    const data = { avatar: fileName };

    const onSuccess = () => {
      queryClient.invalidateQueries(['profile']);
      setState({ ...state, isSubmitting: false, image: null });
    };

    const onError = () => {
      setState({ ...state, isSubmitting: false, image: null });
    };

    updateUser(data, onSuccess, onError);
  };

  const handleUpload = image => {
    setState({ ...state, isSubmitting: true, image });
    uploadToAws(
      image,
      data => updateProfile(data.fileName),
      () => setState({ ...state, isSubmitting: false })
    );
  };

  const goToAccountSettings = () => {
    push('/profile/account');
  };

  const openWebView = modalToShow => {
    if (Platform.OS === 'web') {
      if (modalToShow === 'creatorDashboard') {
        push(`${env.WEBSITE_URL}/creator/dashboard`);
      } else {
        push(`${env.WEBSITE_URL}/privacy-policy`);
      }
    } else {
      dispatch({
        ...userState,
        modal: {
          modalToShow,
          options: userState.modal.options
        }
      });
    }
  };

  const fundWallet = () => {
    dispatch({
      ...userState,
      modal: {
        modalToShow: 'fundWallet',
        options: userState.modal.options
      }
    });
  };

  const handleLogout = () => {
    logOut(userState, dispatch, push);
    queryClient.invalidateQueries(['user-currency-info']);
  };

  const onScroll = scrollPosition => {
    if (scrollPosition > 0) {
      setState({ ...state, sticky: true });
    } else {
      setState({ ...state, sticky: false });
    }
  };

  if (Platform.OS === 'web' && typeof window !== 'undefined') {
    window.addEventListener('scroll', () => {
      onScroll(window.scrollY);
    });
  }

  return (
    <>
      {/* larger device(tablet & desktop) for web only */}
      <Hidden only="base">
        <NotFound />
      </Hidden>

      {/* smaller device(mobile phones)for web & mobile app */}
      <Hidden from="sm">
        <Container px={0}>
          {isLoggedOut ? (
            <LoginCard currentRoute={`/profile`} heading={en.profile.settings.heading} />
          ) : (
            <>
              <HStack
                width="100%"
                alignItems="center"
                justifyContent="space-between"
                pt={`${spacing[20]}px`}
                pb={`${spacing[10]}px`}
                px={`${spacing[24]}px`}
                borderBottomWidth={state.sticky ? 1 : 0}
                borderColor="gray.100"
                _web={{
                  position: 'fixed',
                  bg: 'white',
                  top: 0,
                  zIndex: 1000,
                  pt: `${spacing[20]}px`
                }}
              >
                <Text fontFamily="Satoshi-Medium" fontSize={`${spacing[30]}px`}>
                  {en.profile.settings.heading}
                </Text>

                <NotificationIconWithCount />
              </HStack>
              <ScrollView
                showsVerticalScrollIndicator={false}
                onScroll={({ nativeEvent }) => onScroll(nativeEvent.contentOffset.y)}
                scrollEventThrottle={16}
                px={`${spacing[24]}px`}
                _web={{ mt: `${spacing[100] * 0.8}px` }}
              >
                {userState.user && (
                  <Stack
                    borderWidth={1}
                    borderColor="gray.100"
                    borderRadius={`${spacing[20]}px`}
                    mt={`${spacing[14]}px`}
                    p={`${spacing[24]}px`}
                    mb={`${spacing[30]}px`}
                    shadow={5}
                    bg="white"
                    space={`${spacing[24]}px`}
                  >
                    <Touchable
                      onPress={goToAccountSettings}
                      flexDirection="row"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <HStack space={`${spacing[18]}px`} alignItems="center">
                        <Touchable onPres={() => {}}>
                          <UploadModal
                            size={`${spacing[64]}px`}
                            file={
                              userState.user?.avatar
                                ? {
                                    uri: resolveFileUrl(userState.user?.avatar)
                                  }
                                : null
                            }
                            onUpload={handleUpload}
                            disableDelete={userState.user?.avatar !== null && state.image === null}
                            uploading={state.isSubmitting || updateUserState.isLoading}
                          />
                        </Touchable>
                        <Stack space={`${spacing[4]}px`}>
                          <Heading fontSize={`${spacing[18]}px`}>
                            {`${userState.user?.firstName} ${userState.user?.lastName}`}
                          </Heading>
                          <Text color="gray.300">{`+${userState.user?.phoneNumber}`}</Text>
                        </Stack>
                      </HStack>
                      <Icon
                        as={Entypo}
                        name="chevron-thin-right"
                        color="gray.500"
                        size={`${spacing[20]}px`}
                      />
                    </Touchable>
                    <Divider bg="gray.100" thickness="1" />
                    <VStack alignItems="center">
                      <Text fontSize={`${spacing[14]}px`} pb={`${spacing[14]}px`}>
                        {en.profile.settings.wallet.heading}
                      </Text>
                      <Box pb={`${spacing[32]}px`}>
                        <AmountText
                          amount={resolvePrice(
                            userState.user?.wallets[0]?.currency,
                            userState.user?.wallets[0]?.balance
                          )}
                        />
                      </Box>
                      <Box w="100%" minH={`${SCREEN_HEIGHT * 0.045}px`}>
                        <Button
                          fontFamily="Satoshi-Medium"
                          colorScheme="secondary"
                          size="sm"
                          minH={`${SCREEN_HEIGHT * 0.045}px`}
                          w="100%"
                          onPress={fundWallet}
                        >
                          {en.profile.settings.wallet.fundWalletBtn}
                        </Button>
                      </Box>
                    </VStack>
                  </Stack>
                )}
                <Stack space={`${spacing[20]}px`} pb={`${spacing[100]}px`}>
                  <MultiColumnCard
                    data={[
                      {
                        icon: (
                          <UserOutlinedIcon
                            stroke={colors.primary[700]}
                            strokeWidth={Platform.OS === 'ios' ? 1.66 : 1.2}
                          />
                        ),
                        name: en.profile.settings.options[0],
                        onPress: goToAccountSettings
                      },
                      {
                        icon: (
                          <CreditCardOutline
                            stroke={colors.primary[700]}
                            strokeWidth={Platform.OS === 'ios' ? 1.66 : 1.2}
                          />
                        ),
                        name: en.profile.settings.options[1],
                        onPress: () => push('/profile/transactions')
                      },
                      {
                        icon: (
                          <BankOutline
                            stroke={colors.primary[700]}
                            strokeWidth={Platform.OS === 'ios' ? 1.66 : 1.2}
                          />
                        ),
                        name: en.profile.settings.options[2],
                        onPress: () => push('/profile/withdrawal-bank')
                      }
                    ]}
                  />

                  <MultiColumnCard
                    data={[
                      {
                        icon: (
                          <Icon
                            as={Ionicons}
                            name={'key-outline'}
                            color={'primary.700'}
                            size={`${spacing[24]}px`}
                          />
                        ),
                        name: en.profile.settings.options[3],
                        onPress: () => push('/profile/security')
                      },
                      {
                        icon: (
                          <Icon
                            as={Ionicons}
                            name={'chatbubbles-outline'}
                            color={'primary.700'}
                            size={`${spacing[24]}px`}
                          />
                        ),
                        name: en.profile.settings.options[4],
                        disabled: true
                      },
                      {
                        icon: (
                          <ArchiveOutlineIcon
                            stroke={colors.primary[700]}
                            strokeWidth={Platform.OS === 'ios' ? 1.66 : 1.2}
                          />
                        ),
                        name: en.profile.settings.options[5],
                        disabled: true
                      }
                    ]}
                  />

                  <MultiColumnCard
                    data={[
                      userState.business && {
                        icon: (
                          <Icon
                            as={Ionicons}
                            name="home-outline"
                            color="primary.700"
                            size={`${spacing[22]}px`}
                          />
                        ),
                        name: en.profile.settings.options[6],
                        onPress: () => openWebView('creatorDashboard')
                      },
                      {
                        icon: (
                          <Icon
                            as={Ionicons}
                            name="shield-outline"
                            color="primary.700"
                            size={`${spacing[22]}px`}
                          />
                        ),
                        name: en.profile.settings.options[7],
                        onPress: () => openWebView('privacyPolicy')
                      },
                      {
                        icon: (
                          <Icon
                            as={AntDesign}
                            name={'questioncircleo'}
                            color={'primary.700'}
                            size={`${spacing[22]}px`}
                          />
                        ),
                        name: en.profile.settings.options[8],
                        onPress: () => Linking.openURL(`mailto:admin@expitra.com`)
                      },
                      Platform.OS !== 'web' && {
                        icon: (
                          <Logo
                            width={spacing[18]}
                            height={spacing[18]}
                            fill={colors.primary[700]}
                          />
                        ),
                        name: en.profile.settings.options[9],
                        rightElement: (
                          <Text fontSize={`${spacing[12]}px`} fontFamily="Satoshi-Medium">
                            {`${en.profile.settings.version} ${Application.nativeApplicationVersion}`.toUpperCase()}
                          </Text>
                        ),
                        onPress: () => setState({ ...state, showAboutModal: true })
                      },
                      {
                        icon: (
                          <Icon
                            as={AntDesign}
                            name={'logout'}
                            color={'error.600'}
                            size={`${spacing[22]}px`}
                          />
                        ),
                        iconBackgroundColor: 'error.100',
                        name: en.profile.settings.options[10],
                        onPress: handleLogout
                      }
                    ]}
                  />
                </Stack>
              </ScrollView>
            </>
          )}
          {state.showAboutModal && (
            <AboutModal visible onClose={() => setState({ ...state, showAboutModal: false })} />
          )}
        </Container>
      </Hidden>
    </>
  );
}
