import { Ionicons } from '@expo/vector-icons';
import colors from 'app/config/theme/colors';
import spacing from 'app/config/theme/spacing';
import useAppContext from 'app/hooks/useAppContext';
import { Avatar, Box, HStack, Heading, Icon, Stack, Text, VStack } from 'native-base';
import { FlingGestureHandler, Directions, State } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring
} from 'react-native-reanimated';
import { resolveFileUrl, resolveMessageTime } from 'app/utils/index';
import Touchable from 'app/components/Gestures/Touchable';
import en from 'app/i18n/index';
import { Media } from 'app/components/Media';

export function Message({ message, lastMessage, inputRef, media, onPressParentCard = () => {} }) {
  const startingPosition = 0;
  const x = useSharedValue(startingPosition);
  const { state: userState, dispatch: setUserState } = useAppContext('user');
  const { dispatch } = useAppContext('chat');

  const userId = userState.user?.id;
  const isLeft = userId !== message.user.id;
  const isSameAuthor = message?.user.id === lastMessage?.user.id;
  const username = `${message.user.firstName} ${message.user.lastName}`;
  const mimeType = message.media?.type?.split('/')[0];

  const eventHandler = useAnimatedGestureHandler({
    onStart: () => {},
    onActive: () => (x.value = 140),
    onEnd: () => {
      x.value = withSpring(startingPosition);
    }
  });

  const uas = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: x.value }]
    };
  });

  const onHandlerStateChange = ({ nativeEvent }) => {
    if (nativeEvent.state === State.ACTIVE) {
      if (typeof nativeEvent.absoluteX !== 'undefined') {
        if (message.uuid) {
          dispatch({ type: 'SET_REPLY', reply: message });
          inputRef?.current.focus();
        }
      }
    }
  };

  const showSingleMedia = () => {
    if (mimeType !== 'audio') {
      setUserState({
        ...userState,
        modal: {
          modalToShow: 'singleMedia',
          options: {
            canGoBack: false,
            media: {
              showBtnGroup: true,
              currentIndex: media.findIndex(item => item.uuid === message.media.uuid),
              data: media.map((item, index) => ({
                ...item,
                uri: item.link,
                title: `Media-${index}`,
                mediaType: item?.type?.split('/')?.shift()
              }))
            },
            share: userState.modal.options.share
          }
        }
      });
    }
  };

  return (
    <>
      <FlingGestureHandler
        direction={Directions.RIGHT}
        onGestureEvent={eventHandler}
        onHandlerStateChange={onHandlerStateChange}
      >
        <Animated.View style={[styles.container(isLeft), message.uuid && uas]}>
          <HStack justifyContent={isLeft ? 'flex-start' : 'flex-end'} width="100%">
            {/* user avatar */}
            <Box width="13%">
              {isLeft && !isSameAuthor ? (
                <Avatar
                  style={styles.message.avatar}
                  source={
                    message.user.avatar && {
                      uri: resolveFileUrl(message.user.avatar)
                    }
                  }
                >
                  {username && username.charAt(0)?.toUpperCase()}
                </Avatar>
              ) : null}
            </Box>

            <VStack space={`${spacing[6]}px`} style={styles.message.container(isLeft)}>
              <HStack space={`${spacing[8]}px`} alignItems="center">
                {/* username */}
                <Heading fontSize={`${spacing[14]}px`} color="primary.700">
                  {username}
                </Heading>
                {/* time sent */}
                <Text fontSize={`${spacing[12]}px`}>
                  {resolveMessageTime(message.createdAt, true)}
                </Text>
              </HStack>

              {/* message */}
              <VStack style={styles.message.wrapper(isLeft, message.parent, message.media)}>
                {/* parent */}
                <ParentCard
                  parent={message.parent}
                  isLeft={isLeft}
                  username={username}
                  onPress={onPressParentCard}
                />
                {/* body */}
                <Stack style={styles.message.bodyContainer(message.parent, message.media)}>
                  {message.media && (
                    <Touchable
                      style={styles.message.mediaContainer(mimeType, message.parent, isLeft)}
                      onPress={showSingleMedia}
                    >
                      <Box style={styles.message.mediaCard(mimeType)}>
                        <Media
                          source={{ uri: resolveFileUrl(message.media.link) }}
                          alt={'File'}
                          type={mimeType}
                          width="100%"
                          height={styles.message.mediaCard(mimeType).height}
                          resizeMode={'cover'}
                          backgroundColor={'black'}
                          borderRadius={spacing[4]}
                          hasLoadingIndicator
                          hasCustomControls
                          useCustomPauseBtn
                          overlayColor="rgba(16, 16, 16, 0.15)"
                          loadingIndicatorSize="small"
                          iconSize={spacing[64]}
                          preview={mimeType === 'application' ? false : true}
                        />
                      </Box>
                      {mimeType === 'application' ? (
                        <Text style={styles.message.mediaBody(message.media)} noOfLines={2}>
                          {message.media.link}
                        </Text>
                      ) : null}
                    </Touchable>
                  )}
                  {message.body && (
                    <Text style={styles.message.body(message.media)}>{message.body}</Text>
                  )}
                </Stack>
                {/* checkmark */}
                <HStack
                  style={styles.message.readReceiptIcon(
                    message.parent,
                    message.media && !message.body && message.media?.type?.split('/')[0] !== 'audio'
                      ? true
                      : false
                  )}
                >
                  <Icon
                    as={Ionicons}
                    name={message.createdAt ? 'checkmark-done' : 'checkmark'}
                    size={`${spacing[12]}px`}
                    color="gray.300"
                  />
                </HStack>
              </VStack>
            </VStack>
          </HStack>
        </Animated.View>
      </FlingGestureHandler>
    </>
  );
}

const ParentCard = ({ parent, isLeft, username, onPress = () => {} }) => {
  return (
    parent && (
      <Touchable onPress={onPress} style={styles.parent.container(isLeft, parent?.media)}>
        <HStack style={styles.parent.card(isLeft)}>
          <Stack px={`${spacing[10]}px`}>
            {/* user */}
            <Heading fontSize={`${spacing[14]}px`} color="primary.700">
              {isLeft ? username : 'You'}
            </Heading>

            {/* body */}
            <Text fontSize={`${spacing[12]}px`} noOfLines={1}>
              {en.chats.lastMessage({
                hasLastMessage: true,
                lastMessage: parent.body,
                mimeType: parent.media?.type?.split('/')[0]
              })}
            </Text>
          </Stack>
          {/* media */}
          {parent.media && (
            <VStack style={styles.parent.mediaCard}>
              <Media
                source={{ uri: resolveFileUrl(parent.media?.link) }}
                alt={'File'}
                type={parent.media?.type?.split('/')[0]}
                width="100%"
                height="100%"
                resizeMode={'cover'}
                backgroundColor="black"
                borderRadius={spacing[4]}
                hasLoadingIndicator
                loadingIndicatorSize="small"
                iconSize={spacing[40]}
                preview={false}
              />
            </VStack>
          )}
        </HStack>
      </Touchable>
    )
  );
};

const styles = {
  container: isLeft => ({
    paddingVertical: spacing[10],
    paddingHorizontal: spacing[24],
    flexDirection: isLeft ? 'row' : 'column',
    whiteSpace: 'none',
    width: '100%'
  }),
  message: {
    avatar: {
      backgroundColor: colors.primary[100],
      width: spacing[40],
      height: spacing[40]
    },
    container: isLeft => ({
      width: isLeft ? '80%' : '87%',
      alignItems: isLeft ? 'flex-start' : 'flex-end'
    }),
    wrapper: (isLeft, hasParent, hasMedia) => ({
      backgroundColor: isLeft ? 'white' : colors.primary[100],
      borderRadius: spacing[8],
      paddingHorizontal: hasParent ? spacing[4] : spacing[14],
      paddingVertical: hasParent ? spacing[4] : spacing[10],
      borderWidth: isLeft ? 1 : 0,
      borderColor: colors.gray[100],
      borderTopLeftRadius: isLeft ? 0 : spacing[8],
      borderTopRightRadius: isLeft ? spacing[8] : 0,
      whiteSpace: 'none',
      width: hasMedia ? '100%' : 'auto'
    }),
    mediaContainer: (mimeType, hasParent, isLeft) => ({
      borderWidth: isLeft ? 1 : 0,
      borderColor: colors.gray[100],
      borderRadius: spacing[8],
      borderTopLeftRadius: isLeft ? 0 : spacing[8],
      borderTopRightRadius: isLeft ? spacing[8] : 0,
      backgroundColor: mimeType === 'application' ? colors.primary[200] : 'transparent',
      flexDirection: 'row',
      width: '100%',
      paddingHorizontal: hasParent || mimeType === 'audio' ? spacing[10] : 0,
      paddingVertical: mimeType === 'application' ? spacing[6] : 0,
      marginTop: hasParent ? spacing[10] : mimeType === 'audio' ? spacing[8] : 0
    }),
    mediaCard: mimeType => ({
      width: mimeType === 'application' ? '20%' : '100%',
      height: mimeType === 'audio' || mimeType === 'application' ? 'auto' : spacing[100] * 2
    }),
    mediaBody: hasMedia => ({
      width: '80%',
      paddingHorizontal: hasMedia ? spacing[10] : 0,
      paddingTop: hasMedia ? spacing[6] : 0
    }),
    bodyContainer: (hasParent, hasMedia) => ({
      marginHorizontal: hasMedia ? -spacing[10] : 0,
      marginTop: hasMedia ? -spacing[6] : 0,
      paddingHorizontal: hasParent ? spacing[6] : 0,
      paddingVertical: hasParent ? spacing[4] : 0
    }),
    body: hasMedia => ({
      paddingHorizontal: hasMedia ? spacing[10] : 0,
      paddingTop: hasMedia ? spacing[6] : 0
    }),
    readReceiptIcon: (hasParent, hasMedia) => ({
      size: spacing[12],
      color: colors.gray[300],
      alignSelf: 'flex-end',
      marginRight: hasParent ? 0 : -spacing[10],
      marginTop: hasMedia ? -spacing[12] : -spacing[4],
      marginBottom: hasParent ? 0 : -spacing[6]
    })
  },
  parent: {
    container: isLeft => ({
      backgroundColor: isLeft ? colors.primary[50] : 'white',
      borderTopLeftRadius: isLeft ? 0 : spacing[4],
      borderBottomLeftRadius: spacing[4],
      borderTopRightRadius: isLeft ? spacing[4] : 0,
      borderBottomRightRadius: spacing[4],
      width: 'auto',
      height: spacing[60]
    }),
    card: isLeft => ({
      borderLeftWidth: 5,
      borderTopLeftRadius: isLeft ? 0 : spacing[4],
      borderBottomLeftRadius: spacing[4],
      borderTopRightRadius: isLeft ? spacing[4] : 0,
      borderBottomRightRadius: spacing[4],
      borderColor: colors.primary[600],
      paddingRight: spacing[4],
      paddingVertical: spacing[4],
      justifyContent: 'space-between',
      alignItems: 'center',
      height: '100%'
    }),
    mediaCard: {
      alignItems: 'center',
      justifyContent: 'center',
      width: spacing[40],
      height: '100%'
    }
  }
};
