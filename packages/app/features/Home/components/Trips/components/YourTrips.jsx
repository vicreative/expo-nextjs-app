import React, { useCallback, useReducer } from 'react';
import {
  Box,
  FlatList,
  Heading,
  Hidden,
  HStack,
  Icon,
  Pressable,
  Skeleton,
  Stack,
  Text,
  ScrollView,
  Flex
} from 'native-base';
import en from 'app/i18n/index';
import { Container, EmptyState, SearchInput } from 'app/components/index';
import spacing from 'app/config/theme/spacing';
import ExperienceCard from 'app/components/Cards/ExperienceCard';
import { RefreshControl } from 'react-native';
import { useUserTicketsQuery } from 'app/hooks/queries/useUserProfile';
import { Feather } from '@expo/vector-icons';
import ReportModal from 'app/components/Modal/ReportModal';
import ErrorState from 'app/components/ErrorState';
import AccountLayout from 'app/components/Layout/AccountLayout';
import GetStarted from './GetStarted';
import { useRouter } from 'solito/router';
import ButtonGroup from 'app/components/ButtonGroup';
import { resolveExperienceTimeLeft } from 'app/utils/resolveExperienceDuration';
import useDimensions from 'app/hooks/useDimensions';
import { NotificationIconWithCount } from 'app/components/NotificationCount';
import { Platform } from 'react-native';
import useAppContext from 'app/hooks/useAppContext';
import LoginCard from 'app/components/LoginCard';
import useWindow from 'app/hooks/useWindow';

const initialState = {
  searchQuery: '',
  selected: 'all',
  shouldSearch: true,
  refreshing: false,
  sticky: false,
  show: '',
  ticket: {}
};

const ExperiencesReducer = (state, action) => {
  return {
    ...state,
    ...action
  };
};

function YourTrips() {
  const window = useWindow();
  const { push } = useRouter();
  const { state: userState } = useAppContext('user');
  const [state, dispatch] = useReducer(ExperiencesReducer, initialState);

  const isLoggedOut = userState.isLoggedIn !== 'true' || userState.token === null;

  const {
    screen: { height: SCREEN_HEIGHT }
  } = useDimensions();

  const searchByQuery =
    state.shouldSearch && state.searchQuery !== '' ? `&q=${state.searchQuery}` : '';

  const filterTickets =
    state.selected === 'expired'
      ? `&expired=true`
      : state.selected === 'cancelled'
      ? `&cancelled=true`
      : '';

  const {
    data: tickets,
    isError,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    refetch: refetchTickets
  } = useUserTicketsQuery(`${filterTickets}${searchByQuery}`);

  const totalCount = tickets?.pages[0]?.count;

  const ticketList = tickets?.pages.map(page => page.records).flat();

  const onRefresh = () => {
    dispatch({ ...state, refreshing: true });
    refetchTickets();
    setTimeout(() => {
      dispatch({ ...state, refreshing: false });
    }, 2000);
  };

  const renderItem = useCallback(
    ({ item }) => {
      const timeLeft = resolveExperienceTimeLeft(item.schedule.startDatetime);

      const viewTrip = () => {
        push(`/trips/${item.uuid}`);
      };
      return (
        <ExperienceCard
          key={item.uuid}
          isLoading={isLoading && state.shouldSearch}
          sliderWidth={{ base: '100%', sm: '32%' }}
          sliderHeight={{ base: '225px', md: '285px' }}
          location={item.experience.address}
          title={item.experience.title}
          data={item.experience}
          showOnlyCoverImage
          showPriceTag={false}
          topRightTag={
            <HStack
              py={`${spacing[6]}px`}
              px={`${spacing[12]}px`}
              bg={
                item.cancelledAt
                  ? 'error.700'
                  : timeLeft.includes('ago')
                  ? 'gray.100'
                  : 'primary.600'
              }
              borderRadius={`${spacing[4]}px`}
              position="absolute"
              right={`${spacing[14]}px`}
              top={`${spacing[14]}px`}
            >
              <Text
                fontSize={`${spacing[12]}px`}
                fontFamily="Satoshi-Bold"
                color={item.cancelledAt ? 'white' : timeLeft.includes('ago') ? 'gray.300' : 'white'}
              >
                {item.cancelledAt ? 'Cancelled' : timeLeft}
              </Text>
            </HStack>
          }
          bottomLeftTag={
            <Text fontSize={`${spacing[12]}px`} fontFamily="Satoshi-Bold">
              {`By ${item.experience.business.name}`}
            </Text>
          }
          extraComponent={
            <Pressable
              flexDirection="row"
              alignItems="center"
              mt="20px"
              mb="30px"
              onPress={() => dispatch({ ...state, show: 'reportExperience', ticket: item })}
            >
              <Icon as={Feather} name="flag" size="18px" color="base.black" />
              <Text color="secondary.500" variant="link" ml="6px">
                {en.profile.trips.info.report.heading}
              </Text>
            </Pressable>
          }
          onPress={viewTrip}
        />
      );
    },
    [isLoading, push, state]
  );

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const renderLoader = () => {
    return (
      <HStack space={{ sm: '3%', md: '2%' }} alignItems="flex-start" flexWrap="wrap">
        {new Array(9).fill().map((_, index) => (
          <ExperienceCard
            key={index}
            isLoading={true}
            sliderWidth={{ base: '100%', sm: '32%' }}
            sliderHeight={{ base: '225px', md: '285px' }}
            location={'ticket.address'}
            title={'ticket.title'}
            data={[]}
          />
        ))}
      </HStack>
    );
  };

  const handleSearch = () => {
    dispatch({ ...state, shouldSearch: true });
    refetchTickets();
  };

  const onScroll = scrollPosition => {
    if (scrollPosition > 0) {
      dispatch({ ...state, sticky: true });
    } else {
      dispatch({ ...state, sticky: false });
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
        <AccountLayout>
          <Box mt="46px">
            {isLoading && state.shouldSearch ? (
              renderLoader()
            ) : isError ? (
              <ErrorState
                isModal={false}
                title={en.profile.trips.info.error.heading}
                text={en.profile.trips.info.error.message}
                btnText={en.profile.trips.info.error.linkText}
                onDismiss={refetchTickets}
              />
            ) : totalCount === 0 ? (
              <EmptyState
                heading={en.profile.trips.info.nodata.heading}
                message={en.profile.trips.info.nodata.message}
                linkText={en.profile.trips.info.nodata.linkText}
                href="/"
                btnSize="md"
                color="gray.300"
                bg="white"
              />
            ) : state.shouldSearch && state.searchQuery !== '' && totalCount === 0 ? (
              <EmptyState heading={en.profile.trips.info.noResult} bg="white" />
            ) : (
              <>
                <Box mb={{ base: '30px', md: '46px', lg: '64px' }}>
                  <Heading fontSize="24px">{en.profile.trips.info.title}</Heading>
                </Box>

                <Stack
                  flexDirection="row"
                  justifyContent="space-between"
                  alignItems="flex-end"
                  flexWrap="wrap"
                  space="12px"
                >
                  <Stack
                    space="8px"
                    p="24px"
                    borderWidth={1}
                    borderColor="gray.100"
                    borderRadius="8px"
                    maxW="388px"
                    w="100%"
                    _web={{
                      boxShadow:
                        '0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06)'
                    }}
                  >
                    <Text fontSize="14px">{en.profile.trips.info.card.title}</Text>
                    <Heading fontSize={{ base: '30px', lg: '36px' }}>{totalCount}</Heading>
                  </Stack>

                  <Box maxW="320px" w="100%">
                    <SearchInput
                      id="search-trips"
                      w="100%"
                      returnKeyType="search"
                      placeholder={en.profile.trips.info.search.placeholder}
                      value={state.searchQuery}
                      onSearchChange={value =>
                        dispatch({
                          ...state,
                          searchQuery: value,
                          shouldSearch: false
                        })
                      }
                      onClear={() => dispatch({ ...state, searchQuery: '' })}
                      onSearch={handleSearch}
                      onEndEditing={handleSearch}
                      onKeyPress={({ nativeEvent: { key: keyValue } }) => {
                        if (keyValue === 'Enter') {
                          handleSearch();
                        }
                      }}
                    />
                  </Box>
                </Stack>
                <FlatList
                  data={tickets ? ticketList : []}
                  showsVerticalScrollIndicator={false}
                  renderItem={renderItem}
                  keyExtractor={item => item.uuid}
                  refreshControl={
                    <RefreshControl refreshing={state.refreshing} onRefresh={onRefresh} />
                  }
                  horizontal={false}
                  numColumns={3}
                  pt="32px"
                  columnWrapperStyle={{
                    gap: '2%',
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    flexWrap: 'wrap'
                  }}
                  onEndReached={loadMore}
                  onEndReachedThreshold={0.3}
                  ListFooterComponent={isFetchingNextPage ? renderLoader : null}
                />
              </>
            )}
          </Box>
        </AccountLayout>
      </Hidden>
      {/* smaller device(mobile phones)for web & mobile app */}
      <Hidden from="sm">
        <Container px={0}>
          {isLoggedOut ? (
            <LoginCard
              currentRoute={`/trips`}
              heading={en.profile.trips.getStarted.heading}
              cardTitle={en.profile.trips.noUser}
            />
          ) : isLoading && state.shouldSearch ? (
            <ScrollView showsVerticalScrollIndicator={false} px={`${spacing[24]}px`}>
              <Skeleton
                isLoaded={!isLoading}
                width="100%"
                height={`${spacing[40]}px`}
                borderRadius="full"
                mt={`${spacing[20]}px`}
              ></Skeleton>
              <Box pt={`${spacing[20]}px`} pb={`${spacing[10]}px`}>
                {renderLoader()}
              </Box>
            </ScrollView>
          ) : isError ? (
            <Flex
              px={`${spacing[24]}px`}
              h="100%"
              _web={{ h: '70vh' }}
              justifyContent="center"
              alignItems="center"
            >
              <ErrorState
                isModal={false}
                title={en.profile.trips.info.error.heading}
                text={en.profile.trips.info.error.message}
                btnText={en.profile.trips.info.error.linkText}
                onDismiss={refetchTickets}
              />
            </Flex>
          ) : totalCount === 0 && state.selected === 'all' && state.searchQuery === '' ? (
            <GetStarted />
          ) : (
            <Box pt={`${spacing[20]}px`} px={`${spacing[24]}px`}>
              <Box
                _web={{
                  position: 'fixed',
                  bg: 'white',
                  top: 0,
                  left: 0,
                  right: 0,
                  pt: `${spacing[24]}px`,
                  mx: 0,
                  zIndex: 1000,
                  width: '100%'
                }}
                mx={`${-spacing[24]}px`}
                px={`${spacing[24]}px`}
                borderBottomWidth={state.sticky ? 1 : 0}
                borderColor="gray.100"
              >
                <HStack alignItems="center" justifyContent="space-between" mb={`${spacing[24]}px`}>
                  <Text fontFamily="Satoshi-Medium" fontSize={`${spacing[30]}px`}>
                    {en.profile.trips.getStarted.heading}
                  </Text>

                  <NotificationIconWithCount />
                </HStack>
                <ButtonGroup
                  data={[
                    { id: 'all', title: 'All' },
                    { id: 'expired', title: 'Expired' },
                    { id: 'cancelled', title: 'Cancelled' }
                  ]}
                  selected={state.selected}
                  onChange={id => {
                    dispatch({ ...state, selected: id, shouldSearch: true });
                  }}
                />

                <Box pt={`${spacing[20]}px`} pb={`${spacing[10]}px`} w="100%">
                  <SearchInput
                    id="search-trips"
                    placeholder={en.profile.trips.info.search.placeholder}
                    w="100%"
                    returnKeyType="search"
                    value={state.searchQuery}
                    onSearchChange={value =>
                      dispatch({
                        ...state,
                        searchQuery: value,
                        shouldSearch: false
                      })
                    }
                    onClear={() => {
                      dispatch({ ...state, searchQuery: '' });
                      refetchTickets();
                    }}
                    onSearch={handleSearch}
                    onEndEditing={handleSearch}
                    onKeyPress={({ nativeEvent: { key: keyValue } }) => {
                      if (keyValue === 'Enter') {
                        handleSearch();
                      }
                    }}
                  />
                </Box>
              </Box>

              {((state.shouldSearch && state.searchQuery !== '') || state.selected !== 'all') &&
              totalCount === 0 ? (
                <Flex _web={{ mt: 220 }}>
                  <EmptyState
                    message={en.profile.trips.info.noResult}
                    bg="white"
                    height={SCREEN_HEIGHT * 0.4}
                  />
                </Flex>
              ) : (
                <FlatList
                  data={tickets ? ticketList : []}
                  refreshControl={
                    <RefreshControl refreshing={state.refreshing} onRefresh={onRefresh} />
                  }
                  showsVerticalScrollIndicator={false}
                  renderItem={renderItem}
                  keyExtractor={item => item.uuid}
                  onEndReached={loadMore}
                  onScroll={({ nativeEvent }) => onScroll(nativeEvent.contentOffset.y)}
                  onEndReachedThreshold={0.3}
                  ListHeaderComponent={() => (
                    <HStack
                      mt={`${spacing[30]}px`}
                      _web={{ mt: 220 }}
                      mb={`${spacing[30]}px`}
                      borderWidth={1}
                      borderColor="gray.100"
                      py={`${spacing[18]}px`}
                      px={`${spacing[24]}px`}
                      borderRadius={`${spacing[20]}px`}
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Text fontFamily="Satoshi-Medium" maxW={`${spacing[100] * 1.7}px`}>
                        {en.profile.trips.info.card.title(state.selected)}
                      </Text>
                      <Heading fontSize={`${spacing[24]}px`}>{totalCount}</Heading>
                    </HStack>
                  )}
                  ListFooterComponent={
                    isFetchingNextPage ? renderLoader : <Box mb={`${spacing[100] * 2}px`} />
                  }
                />
              )}
            </Box>
          )}
        </Container>
      </Hidden>

      {state.show === 'reportExperience' && (
        <ReportModal
          data={state.ticket}
          visible
          onClose={() => dispatch({ ...state, show: '', ticket: {} })}
        />
      )}
    </>
  );
}

export default YourTrips;
