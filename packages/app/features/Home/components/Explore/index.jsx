import { useCallback, useReducer } from 'react';
import { Container, Button, Image } from 'app/components/index';
import spacing from 'app/config/theme/spacing';
import useAppContext from 'app/hooks/useAppContext';
import en from 'app/i18n/index';
import {
  Avatar,
  Box,
  Center,
  FlatList,
  Flex,
  HStack,
  Icon,
  Text,
  VStack,
  ScrollView
} from 'native-base';
import { resolveAssetsUrl, resolveAvatarText, resolveFileUrl } from 'app/utils/index';
import { useRouter } from 'solito/router';
import {
  Entypo,
  Feather
  // SimpleLineIcons
} from '@expo/vector-icons';
import { useExperiencesInfiniteQuery } from 'app/hooks/queries/useExperiences';
import ExperienceCard from 'app/components/Cards/ExperienceCard';
import { RefreshControl } from 'react-native';
import { resolvePriceInLocalCurrency } from 'app/utils/resolvePrice';
// import moment from 'moment';
import Touchable from 'app/components/Gestures/Touchable';
import { ComingSoonOverlay } from 'app/components/Cards/ComingSoon';
import resolveExperienceDuration from 'app/utils/resolveExperienceDuration';
import useDimensions from 'app/hooks/useDimensions';
import { TransparentHalfGlobe } from 'app/components/Icons/Globe';
import { UserCircle } from 'app/components/Icons/UserIcon';
import { NotificationIconWithCount } from 'app/components/NotificationCount';

const initialState = {
  showStickyHeader: false,
  stickButtonToHeader: false,
  refreshing: false
};

const ExploreReducer = (state, action) => {
  return {
    ...state,
    ...action
  };
};
export default function Explore() {
  const [state, dispatch] = useReducer(ExploreReducer, initialState);
  const { state: userState, dispatch: setUserState } = useAppContext('user');
  const { push } = useRouter();
  const {
    screen: { height: SCREEN_HEIGHT }
  } = useDimensions();

  // TODO: ADD THIS WHEN THERE ARE A LOT OF EXPERIENCES
  // const filterByCountry =
  //   userState.user?.profile?.country !== undefined
  //     ? `&country=${userState.user?.profile?.country}`
  //     : '';

  // const filterByExperienceType = `&type=REGULAR`;

  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage, refetch, isError } =
    useExperiencesInfiniteQuery(
      ''
      // `${filterByCountry}${filterByExperienceType}`
    );

  const onOpenModal = () => {
    setUserState({
      ...userState,
      modal: {
        modalToShow: 'verifyProfile',
        options: userState.modal.options
      }
    });
  };

  const goToExperiencesScreen = bookingType => {
    if (bookingType) {
      push(`/experiences?bookingType=${bookingType}`);
    } else {
      push('/experiences');
    }
  };

  const onScroll = ({ nativeEvent }) => {
    if (nativeEvent.contentOffset.y > 10 <= SCREEN_HEIGHT * 0.27) {
      dispatch({ ...state, showStickyHeader: true, stickButtonToHeader: false });
    }
    if (nativeEvent.contentOffset.y >= SCREEN_HEIGHT * 0.27) {
      dispatch({ ...state, showStickyHeader: false, stickButtonToHeader: true });
    }
    if (nativeEvent.contentOffset.y < 10) {
      dispatch({
        ...state,
        showStickyHeader: false,
        stickButtonToHeader: false
      });
    }
  };

  const onRefresh = () => {
    dispatch({ ...state, refreshing: true });
    refetch();
    setTimeout(() => {
      dispatch({ ...state, refreshing: false });
    }, 2000);
  };

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const renderItem = useCallback(
    ({ item }) => (
      <Box mr={`${spacing[30]}px`} width={spacing[100] * 2.8} key={item.uuid}>
        <ExperienceCard
          isLoading={isLoading}
          key={item.uuid}
          location={item.address}
          title={item.title}
          showOnlyCoverImage
          bookingType={item.bookingSetting.bookingType}
          price={
            item.bookingSetting.bookingType === 'PRIVATE'
              ? resolvePriceInLocalCurrency(userState.currency, item.privateGroupPrice)
              : resolvePriceInLocalCurrency(userState.currency, item.pricePerHead)
          }
          sliderWidth={spacing[100] * 2.8}
          sliderHeight={SCREEN_HEIGHT * 0.29}
          borderRadius={spacing[20]}
          hidePagination
          duration={resolveExperienceDuration(
            item.type,
            item.schedules,
            item.initialStartDatetime,
            item.initialEndDatetime
          )}
          data={item}
          onPress={() => push(`/experiences/${item.uuid}`)}
        />
      </Box>
    ),
    [isLoading, userState.currency, SCREEN_HEIGHT, push]
  );

  const renderLoader = () => {
    return (
      <Box mr={`${spacing[30]}px`} width={spacing[100] * 2.8}>
        <ExperienceCard
          isLoading={true}
          sliderWidth={spacing[100] * 2.8}
          sliderHeight={SCREEN_HEIGHT * 0.29}
          location={'experience.address'}
          title={'experience.title'}
          borderRadius={spacing[20]}
          data={[]}
        />
      </Box>
    );
  };

  return (
    <Container px={0} pt={0}>
      <Header state={state} onDiscover={() => goToExperiencesScreen(null)} />
      <ScrollView
        onScroll={onScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={state.refreshing} onRefresh={onRefresh} />}
      >
        {/* Hero */}
        <Box px={`${spacing[24]}px`} _web={{ pt: `${SCREEN_HEIGHT * 0.1}px` }}>
          <Flex height={SCREEN_HEIGHT * 0.365} width="100%" positon="relative">
            <Image
              source={{ uri: resolveAssetsUrl('explore-illustration.png') }}
              alt="Explore Illustration"
              height="100%"
              width="100%"
              backgroundColor="primary.100"
              borderRadius={spacing[20]}
            />

            <Flex
              width="100%"
              position="absolute"
              bottom={`${spacing[24]}px`}
              px={`${spacing[24]}px`}
              display={state.stickButtonToHeader ? 'none' : 'flex'}
            >
              <Box width="100%">
                <Button
                  size="xl"
                  width="100%"
                  colorScheme="white"
                  bg={'white'}
                  p={0}
                  _text={{
                    color: 'gray.500'
                  }}
                  _hover={{ bg: 'white' }}
                  shadow={5}
                  onPress={() => goToExperiencesScreen(null)}
                >
                  {en.explore.discover}
                </Button>
              </Box>
            </Flex>
          </Flex>
        </Box>
        {/* verify account */}
        {userState.user?.status === 'UNVERIFIED' ? (
          <Touchable
            bg="white"
            shadow={5}
            mt={`${spacing[40]}px`}
            mx={`${spacing[24]}px`}
            p={`${spacing[16]}px`}
            borderWidth={1}
            borderColor="paper"
            borderRadius={`${spacing[8]}px`}
            alignItems="center"
            flexDirection="row"
            onPress={onOpenModal}
          >
            <Box w="10%">
              <UserCircle width={spacing[24]} height={spacing[24]} />
            </Box>
            <VStack w="68%">
              <Text fontFamily="Satoshi-Medium">{en.explore.verifyAccount}</Text>
            </VStack>
            <Flex w="22%" alignItems="flex-end">
              <Icon as={Feather} name="arrow-right" size={`${spacing[20]}px`} color="gray.400" />
            </Flex>
          </Touchable>
        ) : null}

        {/* Experiences */}
        <>
          <Center
            py={`${spacing[40]}px`}
            px={`${spacing[24]}px`}
            display={data?.pages[0]?.count === 0 || isError ? 'none' : 'flex'}
          >
            <Text color="gray.300" fontFamily="Satoshi-Medium" pb={`${spacing[10]}px`}>
              {en.explore.or}
            </Text>
            <Icon as={Entypo} name="chevron-down" size={`${spacing[20]}px`} color="gray.500" />
          </Center>

          <FlatList
            data={
              isLoading
                ? new Array(4).fill().map((_, index) => ({ uuid: index }))
                : data?.pages?.map(page => page.records).flat()
            }
            renderItem={isLoading ? renderLoader : renderItem}
            keyExtractor={item => item.uuid}
            maxToRenderPerBatch={5}
            windowSize={10}
            horizontal
            pl={`${spacing[24]}px`}
            showsHorizontalScrollIndicator={false}
            onEndReached={loadMore}
            onEndReachedThreshold={0.3}
            ListFooterComponent={isFetchingNextPage ? renderLoader : null}
          />
        </>

        {/* private trips */}
        <Box
          px={`${spacing[24]}px`}
          mt={data?.pages[0]?.count === 0 || isError ? `${spacing[64]}px` : `${spacing[14]}px`}
        >
          <Flex height={SCREEN_HEIGHT * 0.23} width="100%" positon="relative">
            <Image
              source={{ uri: resolveAssetsUrl('road-trip.png') }}
              alt="Explore Illustration"
              height="100%"
              width="100%"
              backgroundColor="primary.100"
              borderRadius={spacing[20]}
            />

            <Flex
              width="100%"
              position="absolute"
              bottom={`${spacing[24]}px`}
              px={`${spacing[24]}px`}
              display={'flex'}
            >
              <Box width="100%">
                <Button
                  size="xl"
                  width="100%"
                  colorScheme="white"
                  bg={'white'}
                  p={0}
                  _text={{
                    color: 'gray.500'
                  }}
                  _hover={{ bg: 'white' }}
                  shadow={5}
                  onPress={() => goToExperiencesScreen('PRIVATE')}
                >
                  {en.explore.privateTrips}
                </Button>
              </Box>
            </Flex>
          </Flex>
        </Box>

        {/* Start a group & split cost */}
        <Box px={`${spacing[24]}px`} mt={`${spacing[60]}px`}>
          <VStack space={`${spacing[34]}px`}>
            {en.explore.activities.map(activity => (
              <Box key={activity.id}>
                {activity.disabled && <ComingSoonOverlay />}
                <Touchable
                  flexDirection="row"
                  alignItems="flex-end"
                  justifyContent="space-between"
                  width="100%"
                  p={`${spacing[24]}px`}
                  borderColor="gray.100"
                  shadow={5}
                  borderWidth={1}
                  bg="white"
                  borderRadius={`${spacing[20]}px`}
                  opacity={activity.disabled ? 0.08 : 1}
                  onPress={() => push(activity.href)}
                  isDisabled
                >
                  <VStack space={`${spacing[14]}px`} width="70%">
                    {activity.icon}
                    <Text fontFamily="Satoshi-Medium" fontSize={`${spacing[24]}px`}>
                      {activity.title}
                    </Text>
                  </VStack>
                  <VStack width="30%" alignItems="flex-end">
                    <Button
                      borderRadius={'full'}
                      p={0}
                      colorScheme="secondary"
                      width={`${spacing[46]}px`}
                      height={`${spacing[46]}px`}
                      onPress={() => push(activity.href)}
                      isDisabled
                    >
                      <Icon as={Feather} name="arrow-right" size={'18px'} color="white" />
                    </Button>
                  </VStack>
                </Touchable>
              </Box>
            ))}
          </VStack>

          {/*exploreEverywhere  */}
          <Box mt={`${spacing[60]}px`} mb={`${spacing[100] * 0.8}px`}>
            <Box bg="gray.500" borderRadius={`${spacing[20]}px`}>
              <Box p={`${spacing[30]}px`}>
                <Text color="gray.200" mb={`${spacing[16]}px`}>
                  {en.explore.exploreEverywhere}
                </Text>
                <Text color="white" fontFamily="Satoshi-Medium" fontSize={`${spacing[24]}px`}>
                  {en.explore.getUpdated}
                </Text>
              </Box>
              <Flex
                flexDirection="row"
                justifyContent="space-between"
                width="100%"
                alignItems="flex-end"
              >
                <TransparentHalfGlobe
                  height={`${spacing[100] * 1.42}px`}
                  width={`${spacing[100] * 2.15}px`}
                />
                <Box m={`${spacing[30]}px`}>
                  <Button
                    borderRadius={'full'}
                    p={0}
                    colorScheme="white"
                    _hover={{ bg: 'white' }}
                    width={`${spacing[46]}px`}
                    height={`${spacing[46]}px`}
                    onPress={() => {}}
                    bg="white"
                  >
                    <Icon as={Feather} name="arrow-right" size={'18px'} color="gray.500" />
                  </Button>
                </Box>
              </Flex>
            </Box>
            <ComingSoonOverlay
              bg="white"
              borderWidth={0}
              borderRadius={0}
              shadow="none"
              p={0}
              opacity={0.9}
            />
          </Box>
        </Box>

        {/* More to come */}
        {/* <Box
            px={`${spacing[24]}px`}
            pt={`${spacing[38]}px`}
            pb={`${spacing[100] * 1.33}px`}
            bg="primary.100"
          >
            <Center>
              <Text textAlign="center" fontSize={`${spacing[20]}px`} mb={`${spacing[24]}px`}>
                {en.explore.more.title}
              </Text>
              <Icon
                as={Entypo}
                name={'chevron-down'}
                color={'gray.500'}
                size={`${spacing[24]}px`}
                mb={`${spacing[32]}px`}
              />
            </Center> */}
        {/* <Center>  TODO: SHOW THIS AFTER USER SUCCESSFULLY SELECTED A PLAN
              <Icon
                as={Feather}
                name={'check-circle'}
                color={'gray.500'}
                size={`${spacing[24]}px`}
                mb={`${spacing[14]}px`}
              />

              <Text
                textAlign="center"
                fontFamily="Satoshi-Medium"
                fontSize={`${spacing[24]}px`}
                mb={`${spacing[24]}px`}
              >
                {en.explore.more.success.title}
              </Text>
              <Text textAlign="center" fontSize={`${spacing[18]}px`} mb={`${spacing[27]}px`}>
                {en.explore.more.success.message}
              </Text>
            </Center> */}
        {/* <VStack space={`${spacing[38]}px`}>
              {en.explore.more.plans.map(plan => (
                <Box
                  key={plan.id}
                  height={`${SCREEN_HEIGHT * 0.5034}px`}
                  width={'100%'}
                  position="relative"
                >
                  <Image
                    source={{ uri: plan.imgUrl }}
                    alt="private groups illustration"
                    height={'100%'}
                    width={'100%'}
                    borderRadius={spacing[20]}
                  />
                  <Flex
                    height={'100%'}
                    width={'100%'}
                    bg={'rgba(8, 18, 18, 0.75)'}
                    position="absolute"
                    borderRadius={`${spacing[20]}px`}
                    justify="space-between"
                  >
                    <Box p={`${spacing[30]}px`}>
                      {plan.icon}
                      <Text
                        color="white"
                        fontFamily="Satoshi-Medium"
                        fontSize={`${spacing[24]}px`}
                        mt={`${spacing[14]}px`}
                      >
                        {plan.title}
                      </Text>
                    </Box>
                    <Box p={`${spacing[24]}px`}>
                      <Button
                        p={0}
                        size="xl"
                        colorScheme="white"
                        _hover={{ bg: 'white' }}
                        width="100%"
                        onPress={() => {}}
                        bg="white"
                        _text={{
                          color: 'gray.500'
                        }}
                      >
                        {plan.btnText}
                      </Button>
                    </Box>
                  </Flex>
                </Box>
              ))}
            </VStack>
            <Button variant="outline" size="xl" mt={`${spacing[100] * 0.68}px`}>
              {en.explore.more.notInterested}
            </Button> */}
        {/* </Box> */}
      </ScrollView>
    </Container>
  );
}

const Header = ({ state, onDiscover = () => {} }) => {
  const { push } = useRouter();
  const { state: userState } = useAppContext('user');

  const {
    screen: { height: SCREEN_HEIGHT }
  } = useDimensions();

  const goToProfile = () => {
    push('/profile');
  };

  return (
    <Box
      bg="white"
      width="100%"
      px={`${spacing[24]}px`}
      pt={`${SCREEN_HEIGHT * 0.01}px`}
      pb={`${spacing[20]}px`}
      borderBottomWidth={state.showStickyHeader || state.stickButtonToHeader ? 1 : 0}
      borderBottomColor="gray.100"
      _web={{ position: 'fixed', zIndex: 1000, pt: `${spacing[20]}px` }}
    >
      <HStack alignItems="center">
        <Box w="14%">
          <Touchable onPress={goToProfile}>
            <Avatar
              bg={'primary.100'}
              width={`${spacing[42]}px`}
              height={`${spacing[42]}px`}
              source={{
                uri: userState.user?.avatar
                  ? resolveFileUrl(userState.user?.avatar)
                  : resolveAssetsUrl('avi-avatar.png')
              }}
            >
              {userState.user
                ? resolveAvatarText(userState.user?.firstName, userState.user?.lastName)
                : '😉'}
            </Avatar>
          </Touchable>
        </Box>
        <VStack w="64%">
          <Text fontFamily="Satoshi-Medium" fontSize={`${spacing[20]}px`}>
            {en.explore.user(userState.user)}
          </Text>
        </VStack>

        <Flex w="22%" alignItems="flex-end">
          <NotificationIconWithCount />
        </Flex>
      </HStack>

      {state.stickButtonToHeader && (
        <Button
          variant="solid"
          colorScheme="secondary"
          size="xl"
          width="100%"
          p={0}
          mt={`${spacing[20]}px`}
          onPress={onDiscover}
        >
          {en.explore.discover}
        </Button>
      )}
    </Box>
  );
};
