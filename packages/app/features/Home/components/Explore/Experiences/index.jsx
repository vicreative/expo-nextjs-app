// import { Feather, Ionicons } from '@expo/vector-icons';
import ExperienceCard from 'app/components/Cards/ExperienceCard';
import ErrorState from 'app/components/ErrorState';
// import Touchable from 'app/components/Gestures/Touchable';
import { Globe } from 'app/components/Icons/Globe';
// import FilterIcon from 'app/components/Icons/Settings';
import { TrippleStar } from 'app/components/Icons/Star';
import {
  // Button,
  Container,
  EmptyState,
  Footer,
  Pagination
} from 'app/components/index';
import ExperienceFilterModal from 'app/components/Modal/ExperienceFilterModal';
import colors from 'app/config/theme/colors';
import spacing from 'app/config/theme/spacing';
import {
  useExperiencesInfiniteQuery,
  useExperiencesTableQuery
} from 'app/hooks/queries/useExperiences';
import useAppContext from 'app/hooks/useAppContext';
import useDimensions from 'app/hooks/useDimensions';
import useScreenParams from 'app/hooks/useScreenParams';
import en from 'app/i18n/index';
import {
  Box,
  Flex,
  Hidden,
  HStack,
  Text,
  Heading,
  Skeleton,
  FlatList,
  Pressable
} from 'native-base';
import { NavHeader } from 'app/navigation/Header';
import { useCallback, useReducer } from 'react';
import { Platform } from 'react-native';
import { useRouter } from 'solito/router';
import resolveExperienceDuration from 'app/utils/resolveExperienceDuration';
import { resolvePriceInLocalCurrency } from 'app/utils/resolvePrice';
import useWindow from 'app/hooks/useWindow';

const initialState = {
  pageParam: 1,
  serviceIds: [],
  languageIds: [],
  showFilters: false,
  isSticky: false,
  experienceType: 'REGULAR'
};

const ExperiencesReducer = (state, action) => {
  return {
    ...state,
    ...action
  };
};

const Experiences = () => {
  const limit = 8;
  const window = useWindow();
  const { push, back } = useRouter();
  const { bookingType } = useScreenParams();

  const {
    window: { width: WIDTH },
    screen: { height: SCREEN_HEIGHT }
  } = useDimensions();

  const [state, dispatch] = useReducer(ExperiencesReducer, initialState);
  const { state: userState } = useAppContext('user');

  if (Platform.OS === 'web' && typeof window !== 'undefined') {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 178) {
        dispatch({ ...state, isSticky: true });
      } else if (window.scrollY < 178) {
        dispatch({ ...state, isSticky: false });
      }
    });
  }

  // TODO: ADD THIS WHEN THERE ARE A LOT OF EXPERIENCES
  // const filterByCountry =
  //   userState.user?.profile?.country !== undefined && state.experienceType === 'REGULAR'
  //     ? `&country=${userState.user?.profile?.country}`
  //     : '';

  const filterByBookingType = bookingType !== undefined ? `&bookingType=${bookingType}` : '';

  // const filterByExperienceType = `&type=${state.experienceType}`;

  // const filterByServiceIds = state.serviceIds.length > 0 ? `&serviceIds=${state.serviceIds}` : '';

  // const filterByLanguageIds =
  //   state.languageIds.length > 0 ? `&languageIds=${state.languageIds}` : '';

  const { data, isLoading, isError, refetch } = useExperiencesTableQuery(
    state.pageParam,
    limit,
    `${filterByBookingType}`,
    // `${filterByCountry}${filterByBookingType}${filterByExperienceType}${filterByServiceIds}${filterByLanguageIds}`, TODO: ADD THIS WHEN THERE ARE A LOT OF EXPERIENCES
    {
      enabled: WIDTH >= 600 ? true : false
    }
  );

  const {
    data: experiences,
    isLoading: isLoadingExperiences,
    isError: hasError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    refetch: refetchExperiences
  } = useExperiencesInfiniteQuery(
    `${filterByBookingType}`,
    // `${filterByCountry}${filterByBookingType}${filterByExperienceType}${filterByServiceIds}${filterByLanguageIds}`, TOD0: ADD THIS WHEN THERE ARE A LOT OF EXPERIENCES
    {
      enabled: WIDTH < 600 ? true : false
    }
  );

  // const toggleExperienceType = type => { TODO: ADD THIS WHEN THERE ARE A LOT OF EXPERIENCES
  //   dispatch({
  //     ...state,
  //     experienceType: type
  //   });
  // };

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const renderItem = useCallback(
    ({ item }) => (
      <ExperienceCard
        isLoading={isLoadingExperiences}
        key={item.uuid}
        location={item.address}
        title={item.title}
        bookingType={item.bookingSetting.bookingType}
        price={
          item.bookingSetting.bookingType === 'PRIVATE'
            ? resolvePriceInLocalCurrency(userState.currency, item.privateGroupPrice)
            : resolvePriceInLocalCurrency(userState.currency, item.pricePerHead)
        }
        sliderHeight={SCREEN_HEIGHT * 0.29}
        borderRadius={spacing[20]}
        duration={resolveExperienceDuration(
          item.type,
          item.schedules,
          item.initialStartDatetime,
          item.initialEndDatetime
        )}
        data={item}
        onPress={() => push(`/experiences/${item.uuid}`)}
      />
    ),
    [SCREEN_HEIGHT, isLoadingExperiences, push, userState.currency]
  );

  const renderLoader = ({ index }) => {
    return (
      <ExperienceCard
        key={index}
        isLoading={true}
        location={'experience.address'}
        title={'experience.title'}
        price={'experience.pricePerHead'}
        sliderHeight={SCREEN_HEIGHT * 0.29}
        borderRadius={spacing[20]}
        duration={'7 days, 6 nights'}
        data={[]}
      />
    );
  };

  return (
    <>
      {/* larger device(tablet & desktop) for web only */}
      <Hidden only="base">
        <>
          <Hero isLoading={isLoading} />
          <Box>
            <Container mb={`${spacing[100] * 1.2}px`} pt={0} px={0}>
              <Flex
                width="100%"
                px={{ sm: `${spacing[55]}px`, lg: `${spacing[100]}px` }}
                pt={`${spacing[55]}px`}
                minHeight={'50vh'}
              >
                <HStack space={{ sm: '3%', md: '2%' }} alignItems="flex-start" flexWrap="wrap">
                  {isLoading ? (
                    new Array(8)
                      .fill()
                      .map((_, index) => (
                        <ExperienceCard
                          key={index}
                          isLoading={isLoading}
                          location={'experience.address'}
                          title={'experience.title'}
                          price={'experience.pricePerHead'}
                          duration={'7 days, 6 nights'}
                          data={[]}
                        />
                      ))
                  ) : data?.pages[0]?.count === 0 ? (
                    <EmptyState
                      message={en.experiences.nodata(
                        state.serviceIds.length || state.languageIds.length ? 'search' : '',
                        state.experienceType
                      )}
                      bg="white"
                    />
                  ) : isError ? (
                    <ErrorState
                      isModal={false}
                      title={en.experiences.error.heading}
                      text={en.experiences.error.message}
                      btnText={en.experiences.error.linkText}
                      onGoBack={back}
                      onDismiss={refetch}
                    />
                  ) : (
                    data?.pages[0]?.records?.map(experience => (
                      <ExperienceCard
                        isLoading={isLoading}
                        key={experience.uuid}
                        location={experience.address}
                        title={experience.title}
                        bookingType={experience.bookingSetting.bookingType}
                        price={
                          experience.bookingSetting.bookingType === 'PRIVATE'
                            ? resolvePriceInLocalCurrency(
                                userState.currency,
                                experience.privateGroupPrice
                              )
                            : resolvePriceInLocalCurrency(
                                userState.currency,
                                experience.pricePerHead
                              )
                        }
                        duration={resolveExperienceDuration(
                          experience.type,
                          experience.schedules,
                          experience.initialStartDatetime,
                          experience.initialEndDatetime
                        )}
                        data={experience}
                        onPress={() => push(`/experiences/${experience.uuid}`)}
                      />
                    ))
                  )}
                </HStack>

                <Pagination
                  isLoading={isLoading}
                  currentPage={data?.pages[0].currentPage}
                  totalCount={data?.pages[0].count}
                  totalPages={data?.pages[0].totalPages}
                  pageSize={limit}
                  onPageChange={page => dispatch({ ...state, pageParam: page })}
                />
              </Flex>
            </Container>

            {/* Filters   TODO: ADD THIS WHEN THERE ARE A LOT OF EXPERIENCES*/}
            {/* <HStack
              bg={state.isSticky ? 'white' : 'transparent'}
              width="100%"
              justifyContent="center"
              space="16px"
              py="8px"
              _web={{
                position: state.isSticky ? 'fixed' : 'absolute',
                top: state.isSticky ? `88px` : '-38px'
              }}
              style={{
                boxShadow: state.isSticky
                  ? '0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06)'
                  : 'none'
              }}
            >
              <SwitchExperienceButton
                isLoading={isLoading}
                experienceType={state.experienceType}
                onToggleExperienceType={toggleExperienceType}
                bg={state.isSticky ? '' : 'white'}
                borderWidth={state.isSticky ? 1 : 0}
                width={{ sm: '400px', lg: '560px' }}
                shadow={state.isSticky ? 'none' : 5}
                mt={0}
                mb={0}
              />
              <Skeleton
                isLoaded={!isLoading}
                width={`${spacing[100]}px`}
                bg="primary.100"
                borderRadius={`${spacing[12]}px`}
                height={{ base: `${spacing[46]}px`, md: `${spacing[60]}px` }}
              >
                <Touchable
                  flexDirection="row"
                  bg="white"
                  borderColor="gray.100"
                  borderWidth={state.isSticky ? 1 : 0}
                  _hover={{ bg: 'white' }}
                  _focus={{ bg: 'white' }}
                  px={`${spacing[16]}px`}
                  height={{ base: `${spacing[46]}px`, md: `${spacing[60]}px` }}
                  alignItems="center"
                  borderRadius={{ base: `${spacing[8]}px`, sm: `${spacing[12]}px` }}
                  shadow={state.isSticky ? 'none' : 5}
                  onPress={() => dispatch({ ...state, showFilters: true })}
                >
                  <FilterIcon stroke={colors.gray[500]} />
                  <Text fontFamily="Satoshi-Medium" pl={`${spacing[12]}px`}>
                    {en.experiences.filter.heading}
                  </Text>
                </Touchable>
              </Skeleton>
            </HStack> */}
            <NavHeader
              borderWidth={state.isSticky ? 1 : 0}
              boxShadow={
                state.isSticky
                  ? 'none'
                  : '0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06)'
              }
            />
          </Box>
          <Footer />
        </>
      </Hidden>

      {/* smaller device(mobile phones)for web & mobile app */}
      <Hidden from="sm">
        <Container
          px={0}
          pt={spacing[10]}
          // pt={SCREEN_HEIGHT * 0.095} TODO: ADD THIS WHEN THERE ARE A LOT OF EXPERIENCES
          headerTitle={en.experiences.headerTitle(bookingType)}
          //   headerRight={ TODO: ADD THIS WHEN THERE ARE A LOT OF EXPERIENCES
          //     <Button
          //       p={0}
          //       height="auto"
          //       colorScheme="secondary"
          //       variant="unstyled"
          //       onPress={() => dispatch({ ...state, showFilters: true })}
          //     >
          //       <FilterIcon />
          //     </Button>
          //   }
          //   extraHeaderComponent={
          //     <SwitchExperienceButton
          //       isLoading={isLoadingExperiences}
          //       experienceType={state.experienceType}
          //       onToggleExperienceType={toggleExperienceType}
          //     />
          //   }
        >
          <Box
            px={`${spacing[24]}px`}
            // _web={{ pt: '50px' }}
          >
            <Flex height="100%" width="100%">
              {!isLoadingExperiences && experiences?.pages[0]?.count === 0 ? (
                <EmptyState
                  height={SCREEN_HEIGHT * 0.6}
                  message={en.experiences.nodata(
                    state.serviceIds.length || state.languageIds.length ? 'search' : '',
                    state.experienceType
                  )}
                  bg="white"
                />
              ) : hasError ? (
                <Flex height="100%" width="100%" mt={`${spacing[100]}px`}>
                  <ErrorState
                    isModal={false}
                    title={en.experiences.error.heading}
                    text={en.experiences.error.message}
                    btnText={en.experiences.error.linkText}
                    onGoBack={back}
                    onDismiss={refetchExperiences}
                  />
                </Flex>
              ) : (
                <FlatList
                  showsVerticalScrollIndicator={false}
                  data={
                    isLoadingExperiences
                      ? new Array(8).fill().map((_, index) => ({ uuid: index }))
                      : experiences?.pages?.map(page => page.records).flat()
                  }
                  renderItem={isLoadingExperiences ? renderLoader : renderItem}
                  keyExtractor={item => item.uuid}
                  onEndReached={loadMore}
                  onEndReachedThreshold={0.5}
                  ListHeaderComponent={<Box mb={`${spacing[24]}px`} />}
                  ListFooterComponent={
                    <Box mb={`${spacing[100]}px`}>
                      {isFetchingNextPage
                        ? new Array(4).fill().map((_, index) => renderLoader({ index }))
                        : null}
                    </Box>
                  }
                />
              )}
            </Flex>
          </Box>
        </Container>
      </Hidden>
      {state.showFilters && (
        <ExperienceFilterModal
          visible
          selected={{
            serviceIds: state.serviceIds,
            languageIds: state.languageIds
          }}
          onClose={(serviceIds, languageIds) => {
            dispatch({ ...state, showFilters: false, serviceIds, languageIds });
            refetchExperiences();
          }}
        />
      )}
    </>
  );
};
export default Experiences;

const Hero = ({ isLoading }) => {
  return (
    <Flex width="100%" alignItems="center" justifyContent="center" bg="primary.50" mt="88px">
      <Flex
        px={{ sm: `${spacing[55]}px`, lg: `${spacing[100]}px` }}
        pt={`${spacing[60]}px`}
        pb={`${spacing[100] * 0.8}px`}
        width="100%"
        maxW="1440px"
        alignItems="center"
      >
        <Skeleton.Text
          isLoaded={!isLoading}
          maxW="551px"
          _line={{
            height: `${spacing[40]}px`
          }}
          lines={1}
        >
          <Heading fontSize={`${spacing[36]}px`}>{en.experiences.hero.heading}</Heading>
        </Skeleton.Text>
        <Skeleton.Text isLoaded={!isLoading} mt={`${spacing[8]}px`} maxW="419px" lines={1}>
          <Text pt={`${spacing[8]}px`} color="gray.300">
            {en.experiences.hero.subheading}
          </Text>
        </Skeleton.Text>
      </Flex>
    </Flex>
  );
};

// eslint-disable-next-line no-unused-vars
const SwitchExperienceButton = ({
  mt = `${spacing[26]}px`,
  mb = `${spacing[4]}px`,
  width = '100%',
  bg = 'white',
  borderWidth = 0,
  shadow = 5,
  isLoading = false,
  experienceType = 'REGULAR',
  onToggleExperienceType = () => {}
}) => (
  <Skeleton
    isLoaded={!isLoading}
    mt={mt}
    mb={mb}
    width={width}
    bg={{ base: 'primary.200', sm: 'primary.100' }}
    borderRadius={{ base: `${spacing[8]}px`, sm: `${spacing[12]}px` }}
    height={{ base: `${spacing[46]}px`, md: `${spacing[60]}px` }}
  >
    <HStack
      bg={bg}
      mt={mt}
      mb={mb}
      width={width}
      borderColor="gray.100"
      borderWidth={borderWidth}
      alignItems="center"
      borderRadius={{ base: `${spacing[8]}px`, sm: `${spacing[12]}px` }}
      shadow={shadow}
      height={{ base: `${spacing[46]}px`, md: `${spacing[60]}px` }}
    >
      {en.experiences.filter.type.map(type => (
        <Pressable
          key={type.id}
          px={`${spacing[16]}px`}
          width="50%"
          height="100%"
          borderWidth={experienceType === type.id ? 1 : 0}
          borderColor="gray.500"
          borderRadius={{ base: `${spacing[8]}px`, sm: `${spacing[12]}px` }}
          onPress={() => onToggleExperienceType(type.id)}
          justifyContent="center"
        >
          <HStack alignItems="center" space={`${spacing[12]}px`}>
            {type.id === 'REGULAR' ? (
              <TrippleStar
                stroke={experienceType === type.id ? colors.gray[500] : colors.gray[300]}
              />
            ) : (
              <Globe stroke={experienceType === type.id ? colors.gray[500] : colors.gray[300]} />
            )}

            <Text
              fontFamily="Satoshi-Medium"
              fontSize={`${spacing[16]}px`}
              color={experienceType === type.id ? 'gray.500' : 'gray.300'}
            >
              {type.name}
            </Text>
          </HStack>
        </Pressable>
      ))}
    </HStack>
  </Skeleton>
);
