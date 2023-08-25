import { Button } from 'app/components/index';
import { Media } from 'app/components/Media';
import spacing from 'app/config/theme/spacing';
import { mediaList } from 'app/constants/index';
import useAppContext from 'app/hooks/useAppContext';
import { Box, Flex, Pressable, Skeleton, Stack } from 'native-base';
import { resolveFileUrl } from 'app/utils/index';

export default function ExperienceMediaGrid() {
  const { state } = useAppContext('experienceDetails');
  const { state: userState, dispatch: setUserState } = useAppContext('user');

  const data = mediaList(state.experience, state.experience?.medias?.length + 1);

  const showAllMedia = () => {
    setUserState({
      ...userState,
      modal: {
        modalToShow: 'allMedia',
        options: {
          canGoBack: false,
          media: {
            showBtnGroup: false,
            currentIndex: 1,
            data: data
          },
          share: userState.modal.options.share
        }
      }
    });
  };

  const showSingleMedia = index => {
    setUserState({
      ...userState,
      modal: {
        modalToShow: 'singleMedia',
        options: {
          canGoBack: false,
          media: {
            showBtnGroup: false,
            currentIndex: index,
            data: data
          },
          share: userState.modal.options.share
        }
      }
    });
  };

  return (
    <Box height={{ sm: '300px', md: '360px', lg: '413px' }} width="100%" position="relative">
      <Flex flexDirection="row" justifyContent="space-between" width="100%" height="100%">
        <Box width={data?.length <= 5 ? '49.5%' : '29.6%'} height="100%">
          <Skeleton height="100%" width="100%" isLoaded={!state.isLoading}>
            <Pressable height="100%" width="100%" onPress={() => showSingleMedia(0)}>
              <Media
                height="100%"
                width="100%"
                source={{
                  uri: resolveFileUrl(data[0]?.uri)
                }}
                alt={`${state.experience?.title}-0`}
                type={data[0]?.type.split('/')[0]}
                resizeMode="cover"
                borderRadius={0}
                preload="auto"
                usePoster
                posterSource={{
                  uri: resolveFileUrl(state.experience?.coverMediaPath)
                }}
                overlayColor="rgba(16, 16, 16, 0.15)"
                shouldPlay
                loop={false}
                isMuted
                useNativeControls
              />
            </Pressable>
          </Skeleton>
        </Box>

        <Stack
          justifyContent="space-between"
          width={data?.length <= 3 ? '49.5%' : data?.length >= 6 ? '22.9%' : '24.5%'}
          height="100%"
          flexDirection={data?.length <= 3 ? 'row' : 'column'}
        >
          <Box
            height={data?.length <= 3 ? '100%' : '48.8%'}
            width={data?.length <= 3 ? '49%' : '100%'}
          >
            <Skeleton height="100%" width="100%" isLoaded={!state.isLoading}>
              <Pressable height="100%" width="100%" onPress={() => showSingleMedia(1)}>
                <Media
                  height="100%"
                  width="100%"
                  source={{
                    uri: resolveFileUrl(data[1]?.uri)
                  }}
                  alt={`${state.experience?.title}-01`}
                  type={data[1]?.type.split('/')[0]}
                  resizeMode="cover"
                  borderRadius={0}
                  preload="auto"
                  overlayColor="rgba(16, 16, 16, 0.15)"
                  shouldPlay={false}
                  loop={false}
                  isMuted
                  useNativeControls
                />
              </Pressable>
            </Skeleton>
          </Box>
          <Box
            height={data?.length <= 3 ? '100%' : '48.8%'}
            width={data?.length <= 3 ? '49%' : '100%'}
          >
            <Skeleton height="100%" width="100%" isLoaded={!state.isLoading}>
              <Pressable height="100%" width="100%" onPress={() => showSingleMedia(2)}>
                <Media
                  height="100%"
                  width="100%"
                  source={{
                    uri: resolveFileUrl(data[2]?.uri)
                  }}
                  alt={`${state.experience?.title}-02`}
                  type={data[2]?.type.split('/')[0]}
                  resizeMode="cover"
                  borderRadius={0}
                  preload="auto"
                  overlayColor="rgba(16, 16, 16, 0.15)"
                  shouldPlay={false}
                  loop={false}
                  isMuted
                  useNativeControls
                />
              </Pressable>
            </Skeleton>
          </Box>
        </Stack>

        {!state.isLoading && data?.length > 3 && (
          <>
            <Stack
              justifyContent="space-between"
              width={data?.length >= 6 ? '22.9%' : '24.5%'}
              height="100%"
            >
              <Box
                display={data?.length >= 4 ? 'flex' : 'none'}
                height={data?.length > 4 ? '48.8%' : '100%'}
                width="100%"
              >
                <Skeleton height="100%" width="100%" isLoaded={!state.isLoading}>
                  <Pressable height="100%" width="100%" onPress={() => showSingleMedia(3)}>
                    <Media
                      height="100%"
                      width="100%"
                      source={{
                        uri: resolveFileUrl(data[3]?.uri)
                      }}
                      alt={`${state.experience?.title}-03`}
                      resizeMode="cover"
                      borderRadius={0}
                      preload="auto"
                      overlayColor="rgba(16, 16, 16, 0.15)"
                      shouldPlay={false}
                      loop={false}
                      isMuted
                      useNativeControls
                    />
                  </Pressable>
                </Skeleton>
              </Box>
              <Box
                display={data?.length >= 5 ? 'flex' : 'none'}
                height={data?.length >= 5 ? '48.8%' : '100%'}
                width="100%"
              >
                <Skeleton height="100%" width="100%" isLoaded={!state.isLoading}>
                  <Pressable height="100%" width="100%" onPress={() => showSingleMedia(4)}>
                    <Media
                      height="100%"
                      width="100%"
                      source={{
                        uri: resolveFileUrl(data[4]?.uri)
                      }}
                      alt={`${state.experience?.title}-04`}
                      type={data[4]?.type.split('/')[0]}
                      resizeMode="cover"
                      borderRadius={0}
                      preload="auto"
                      overlayColor="rgba(16, 16, 16, 0.15)"
                      shouldPlay={false}
                      loop={false}
                      isMuted
                      useNativeControls
                    />
                  </Pressable>
                </Skeleton>
              </Box>
            </Stack>

            <Box
              height="100%"
              width={data?.length >= 6 ? '22.9%' : '24.5%'}
              display={data?.length >= 6 ? 'flex' : 'none'}
            >
              <Skeleton height="100%" width="100%" isLoaded={!state.isLoading}>
                <Pressable height="100%" width="100%" onPress={() => showSingleMedia(5)}>
                  <Media
                    height="100%"
                    width="100%"
                    source={{
                      uri: resolveFileUrl(data[5]?.uri)
                    }}
                    alt={`${state.experience?.title}-05`}
                    type={data[4]?.type.split('/')[0]}
                    resizeMode="cover"
                    borderRadius={0}
                    preload="auto"
                    overlayColor="rgba(16, 16, 16, 0.15)"
                    shouldPlay={false}
                    loop={false}
                    useNativeControls
                  />
                </Pressable>
              </Skeleton>
            </Box>
          </>
        )}
      </Flex>

      <Skeleton
        position="absolute"
        bottom={spacing[14]}
        right={spacing[24]}
        height="32px"
        borderRadius="8px"
        width="120px"
        isLoaded={!state.isLoading}
      >
        <Button
          variant="outline"
          colorScheme="secondary"
          bg="white"
          position="absolute"
          bottom={spacing[14]}
          right={spacing[24]}
          size="md"
          onPress={showAllMedia}
        >
          View all
        </Button>
      </Skeleton>
    </Box>
  );
}
