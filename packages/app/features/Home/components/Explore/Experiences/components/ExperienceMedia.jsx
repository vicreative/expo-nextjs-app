import { useCallback, useState } from 'react';
import { Button } from 'app/components/index';
import spacing from 'app/config/theme/spacing';
import { Box, Flex, Heading, Hidden, Icon, Skeleton, VStack } from 'native-base';
import { NestedImageCarousel } from 'app/components/Carousel';
import { mediaList } from 'app/constants/index';
import { resolveFileUrl } from 'app/utils/index';
import { Media } from 'app/components/Media';
import { AntDesign, Feather, Ionicons, Octicons } from '@expo/vector-icons';
import { useRouter } from 'solito/router';
import ExperienceMediaGrid from './ExperienceMediaGrid';
import useAppContext from 'app/hooks/useAppContext';
import { Platform } from 'react-native';
import ShareBottomSheet from 'app/components/BottomSheet/ShareBottomSheet/index.web';
import en from 'app/i18n/index';
import useScreenParams from 'app/hooks/useScreenParams';
import useDimensions from 'app/hooks/useDimensions';
import env from 'app/config/env';
let useNavigation = () => {};

if (Platform.OS !== 'web') {
  useNavigation = require('@react-navigation/native').useNavigation;
}

export default function ExperienceMedia() {
  const {
    window: { width: WIDTH },
    screen: { height: SCREEN_HEIGHT }
  } = useDimensions();
  const navigation = useNavigation();

  const [isMuted, setIsMuted] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const { back, replace } = useRouter();
  const { id } = useScreenParams();
  const { state } = useAppContext('experienceDetails');
  const { state: userState, dispatch: setUserState } = useAppContext('user');
  const data = mediaList(state.experience, state.experience?.medias?.length + 1);

  const handleGoBack = () => {
    if (Platform.OS !== 'web' && !navigation.canGoBack()) {
      replace('/', undefined, {
        experimental: {
          nativeBehavior: 'stack-replace'
        }
      });
    } else {
      back();
    }
  };

  const openShareBottomSheet = () => {
    setUserState({
      ...userState,
      modal: {
        modalToShow: 'shareBottomSheet',
        options: {
          canGoBack: userState.modal.options.canGoBack,
          media: userState.modal.options.media,
          share: {
            showGroups: false,
            uri: `${env.APP_URL}/experiences/${id}`,
            campaignName: 'Experience',
            text: en.experiences.shareExperience.text,
            title: en.experiences.shareExperience.title,
            pathname: `/experiences/${id}`
          }
        }
      }
    });
  };

  const showSingleMedia = () => {
    setUserState({
      ...userState,
      modal: {
        modalToShow: 'singleMedia',
        options: {
          canGoBack: false,
          media: {
            showBtnGroup: false,
            currentIndex,
            data: data
          },
          share: userState.modal.options.share
        }
      }
    });
  };

  const renderItem = useCallback(
    ({ item }) => (
      <Box key={item.uuid} width={WIDTH} height={SCREEN_HEIGHT * 0.392}>
        <Media
          height={SCREEN_HEIGHT * 0.392}
          width={WIDTH}
          source={{
            uri: resolveFileUrl(item.uri)
          }}
          alt={item.title}
          type={item.mediaType}
          resizeMode="cover"
          usePoster
          borderRadius={0}
          preload="auto"
          posterSource={{
            uri: resolveFileUrl(state.experience?.coverMediaPath)
          }}
          overlayColor="rgba(16, 16, 16, 0.15)"
          isMuted={isMuted}
          shouldPlay
          loop={false}
        />
      </Box>
    ),
    [WIDTH, SCREEN_HEIGHT, state.experience?.coverMediaPath, isMuted]
  );

  return (
    <>
      {/* larger device(tablet & desktop) for web only */}
      <Hidden only="base">
        <ExperienceMediaGrid />
      </Hidden>
      {/* smaller device(mobile phones)for web & mobile app */}
      <Hidden from="sm">
        <Box height={SCREEN_HEIGHT * 0.392} width={WIDTH}>
          <Skeleton
            width={WIDTH}
            height={SCREEN_HEIGHT * 0.392}
            isLoaded={!state.isLoading}
            position="relative"
          >
            <NestedImageCarousel
              data={data}
              renderItem={renderItem}
              width={WIDTH}
              imgHeight="100%"
              borderRadius={0}
              hideArrowBtns
              onSlideChange={index => setCurrentIndex(index)}
              paginationContainerStyle={{ bottom: `${spacing[31]}px` }}
            />
          </Skeleton>

          <Skeleton
            startColor="primary.200"
            position="absolute"
            bottom={`${SCREEN_HEIGHT * 0.024}px`}
            left={`${spacing[24]}px`}
            width={`${spacing[44]}px`}
            height={`${spacing[34]}px`}
            borderRadius={`${spacing[8]}px`}
            isLoaded={!state.isLoading}
          >
            <Box
              py={`${spacing[6]}px`}
              px={`${spacing[10]}px`}
              borderRadius={`${spacing[8]}px`}
              bg="rgba(1,1,1,0.35)"
              position="absolute"
              bottom={`${SCREEN_HEIGHT * 0.024}px`}
              left={`${spacing[24]}px`}
            >
              <Heading color="white" fontSize={`${spacing[16]}px`}>{`${currentIndex + 1}/${
                data?.length
              }`}</Heading>
            </Box>
          </Skeleton>
          <Flex
            justify="space-between"
            height="100%"
            position="absolute"
            pt={`${SCREEN_HEIGHT * 0.064}px`}
            pb={`${SCREEN_HEIGHT * 0.024}px`}
            right={`${spacing[24]}px`}
          >
            <Skeleton
              startColor="primary.200"
              size={`${spacing[40]}px`}
              rounded="full"
              isLoaded={!state.isLoading}
            >
              <Button onPress={handleGoBack} {...styles.media.btns}>
                <Icon as={Ionicons} name="close" color="gray.500" size={`${spacing[18]}px`} />
              </Button>
            </Skeleton>
            <VStack space={`${SCREEN_HEIGHT * 0.015}px`}>
              {data[currentIndex]?.mediaType === 'video' && (
                <Button onPress={() => setIsMuted(!isMuted)} {...styles.media.btns}>
                  <Icon
                    as={Octicons}
                    name={isMuted ? 'mute' : 'unmute'}
                    color="gray.500"
                    size={`${spacing[18]}px`}
                  />
                </Button>
              )}

              <Skeleton
                startColor="primary.200"
                size={`${spacing[40]}px`}
                rounded="full"
                isLoaded={!state.isLoading}
              >
                {Platform.OS === 'web' ? (
                  <ShareBottomSheet
                    btnType="icon"
                    text={en.experiences.shareExperience.text}
                    title={en.experiences.shareExperience.title}
                  />
                ) : (
                  <Button {...styles.media.btns} onPress={openShareBottomSheet}>
                    <Icon as={Feather} name="share" color="gray.500" size={`${spacing[18]}px`} />
                  </Button>
                )}
              </Skeleton>
              <Skeleton
                startColor="primary.200"
                size={`${spacing[40]}px`}
                rounded="full"
                isLoaded={!state.isLoading}
              >
                <Button {...styles.media.btns} onPress={showSingleMedia}>
                  <Icon
                    as={AntDesign}
                    name="arrowsalt"
                    color="gray.500"
                    size={`${spacing[18]}px`}
                  />
                </Button>
              </Skeleton>
            </VStack>
          </Flex>
        </Box>
      </Hidden>
    </>
  );
}

const styles = {
  media: {
    btns: {
      colorScheme: 'secondary',
      width: `${spacing[40]}px`,
      height: `${spacing[40]}px`,
      borderRadius: 'full',
      p: 0,
      _pressed: {
        bg: 'white'
      },
      _focus: {
        bg: 'white'
      },
      bg: 'white'
    }
  }
};
