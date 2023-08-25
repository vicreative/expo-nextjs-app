import { Feather, Ionicons } from '@expo/vector-icons';
import Touchable from 'app/components/Gestures/Touchable';
import LoginCard from 'app/components/LoginCard';
import { Button, EmptyState, LoadingState } from 'app/components/index';
import spacing from 'app/config/theme/spacing';
import { useUpdateActivitiesReadReceiptMutation } from 'app/hooks/mutations/useActivities';
import { useUserActivitiesQuery } from 'app/hooks/queries/useUserProfile';
import { useRefreshOnFocus } from 'app/hooks/useRefreshOnFocus';
import en from 'app/i18n/index';
import { Text, Icon, HStack, FlatList, VStack, Box, Heading, Flex, Hidden } from 'native-base';
import { Platform, ActivityIndicator } from 'react-native';
import { useRouter } from 'solito/router';
import { resolveExperienceTimeLeft } from 'app/utils/resolveExperienceDuration';
import Modal from './index';
import useAppContext from 'app/hooks/useAppContext';
import useDimensions from 'app/hooks/useDimensions';
import { STATUS_BAR_HEIGHT } from 'app/constants/index';
import { useEffect } from 'react';
import colors from 'app/config/theme/colors';

let Notification;

if (Platform.OS !== 'web') {
  Notification = require('expo-notifications');
}
function NotificationsModal({ visible = false, onClose = () => {} }) {
  const { push } = useRouter();
  const { state: userState, dispatch } = useAppContext('user');
  const {
    window: { width: WIDTH },
    screen: { height: SCREEN_HEIGHT }
  } = useDimensions();

  const isLoggedOut = userState.isLoggedIn !== 'true' || userState.token === null;

  const { updateReadReceipt } = useUpdateActivitiesReadReceiptMutation();

  const {
    data: activities,
    isLoading: isLoadingActivities,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    refetch: refetchActivities
  } = useUserActivitiesQuery({ enabled: !isLoggedOut });
  useRefreshOnFocus(refetchActivities);

  const markAllRead = () => {
    const onSuccess = async () => {
      if (Platform.OS !== 'web') {
        await Notification.setBadgeCountAsync(0);
      }
      dispatch({ ...userState, noOfNewActivity: 0 });
    };

    updateReadReceipt({}, onSuccess);
  };

  useEffect(() => {
    if (userState.noOfNewActivity > 0) {
      markAllRead();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userState.noOfNewActivity]);

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const renderItem = ({ item }) => {
    const openDetails = () => {
      if (item.resourceType === 'EXPERIENCE') {
        push(`/experiences/${item.resourceId}`);
        onClose();
      }
    };
    return (
      <Touchable
        onPress={openDetails}
        flexDirection="row"
        width="100%"
        justifyContent="space-between"
        borderBottomColor="gray.100"
        borderBottomWidth={1}
        py={`${spacing[20]}px`}
        opacity={item.isRead ? 0.7 : 1}
      >
        <Box width="15%">
          <VStack
            borderRadius="full"
            width={`${spacing[40]}px`}
            height={`${spacing[40]}px`}
            borderWidth={1}
            borderColor="gray.100"
            alignItems="center"
            justifyContent="center"
          >
            <Icon
              as={Ionicons}
              name={'notifications'}
              color={'primary.500'}
              size={`${spacing[16]}px`}
            />
          </VStack>
        </Box>
        <VStack width="85%" space={`${spacing[6]}px`}>
          <HStack alignItems="center" justifyContent="space-between">
            <HStack alignItems="center" space={`${spacing[8]}px`}>
              <Text color="gray.400" fontSize={`${spacing[12]}px`}>
                {resolveExperienceTimeLeft(item.createdAt)}
              </Text>
            </HStack>
            {!item.isRead && (
              <Box
                borderRadius="full"
                width={`${spacing[8]}px`}
                height={`${spacing[8]}px`}
                bg="success.500"
              />
            )}
          </HStack>
          <Text fontSize={`${spacing[14]}px`}>{item.description}</Text>
        </VStack>
      </Touchable>
    );
  };

  const ListFooterComponent = () => (
    <VStack pb={`${spacing[100] * 2}px`} pt={`${spacing[24]}px`}>
      {isFetchingNextPage ? (
        <ActivityIndicator animating={true} size="small" color={colors.primary[600]} />
      ) : null}
    </VStack>
  );

  const CloseButton = () => (
    <Button onPress={onClose} p={0} size="sm" variant="unstyled">
      <Icon as={Feather} name={'arrow-left'} size={`${spacing[24]}px`} color={'gray.500'} />
    </Button>
  );

  // const MarkAllReadButton = () => (
  //   <Button
  //     variant="unstyled"
  //     colorScheme="secondary"
  //     size="sm"
  //     px={0}
  //     onPress={markAllRead}
  //     isDisabled={updateReadReceiptState.isLoading}
  //   >
  //     <Text fontFamily="Satoshi-Medium" fontSize={`${spacing[12]}px`}>
  //       {en.notifications.markAll}
  //     </Text>
  //   </Button>
  // );

  return (
    <Modal
      isDrawer
      closeOnOverlayClick
      animationType="fade"
      visible={visible}
      onClose={onClose}
      overlayColor="rgba(6,6,6,0.01)"
      shadow={8}
      pt={0}
      hidePaddingTop
      mt={{ base: 0, sm: `${spacing[100]}px` }}
      statusBarBackgroundColor="transparent"
      maxWidth={{ base: '100%', sm: '400px' }}
    >
      {/* Header */}
      {/* larger device(tablet & desktop) for web only */}
      <Hidden only="base">
        <HStack
          justifyContent="space-between"
          px={`${spacing[24]}px`}
          pt={{ base: `${spacing[14]}px`, sm: `${spacing[38]}px` }}
          pb={`${spacing[24]}px`}
          width="100%"
          borderBottomWidth={1}
          borderBottomColor="gray.100"
          bg="white"
        >
          <HStack space={`${spacing[14]}px`}>
            <CloseButton />
            <Heading fontSize={`${spacing[24]}px`}>{en.notifications.heading}</Heading>
          </HStack>

          <Box width="40px" />
          {/* <MarkAllReadButton /> */}
        </HStack>
      </Hidden>
      {/* smaller device(mobile phones)for web & mobile app */}
      <Hidden from="sm">
        <Flex
          width="100%"
          bg={'primary.100'}
          pt={STATUS_BAR_HEIGHT + SCREEN_HEIGHT * 0.01}
          pb={SCREEN_HEIGHT * 0.014}
          px={spacing[20]}
          zIndex={1000}
          minHeight={`${SCREEN_HEIGHT * 0.1117}px`}
          justifyContent="center"
          _web={{
            position: 'fixed',
            top: 0,
            pt: 0,
            pb: 0
          }}
        >
          <HStack justifyContent="space-between" alignItems="center" width="100%">
            <CloseButton />

            <Heading
              maxWidth={WIDTH * 0.6}
              fontSize={`${spacing[16]}px`}
              color={'gray.500'}
              noOfLines={1}
            >
              {en.notifications.heading}
            </Heading>

            <Box width="40px" />
            {/* <MarkAllReadButton /> */}
          </HStack>
        </Flex>
      </Hidden>

      {/* Body */}
      {isLoggedOut ? (
        <LoginCard
          currentRoute={`/notifications`}
          cardTitle={en.notifications.noUser}
          paddingTop={`${spacing[40]}px`}
          _web={{
            pt: { base: `${spacing[100] * 1.24}px`, sm: `${spacing[40]}px` }
          }}
        />
      ) : isLoadingActivities ? (
        <Flex height="80%" width="100%" _web={{ height: '80vh' }}>
          <LoadingState />
        </Flex>
      ) : activities?.pages[0].count === 0 ? (
        <Flex height="80%" width="100%" _web={{ height: '80vh' }}>
          <EmptyState bg="white" nodata message={en.notifications.nodata} />
        </Flex>
      ) : (
        <FlatList
          data={activities?.pages
            .map(page => page.records)
            .flat()
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          keyExtractor={item => item.uuid}
          onEndReached={loadMore}
          onEndReachedThreshold={0.3}
          px={`${spacing[24]}px`}
          pt={`${spacing[24]}px`}
          _web={{
            pt: { base: `${spacing[100] * 1.24}px`, sm: `${spacing[24]}px` },
            overflowY: 'scroll',
            height: { base: '88vh', sm: 'inherit' }
          }}
          ListFooterComponent={<ListFooterComponent />}
        />
      )}
    </Modal>
  );
}

export default NotificationsModal;
