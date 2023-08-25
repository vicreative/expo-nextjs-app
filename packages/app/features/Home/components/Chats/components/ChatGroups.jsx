import React, { useCallback, useReducer } from 'react';
import { Box, HStack, Text } from 'native-base';
import en from 'app/i18n/index';
import spacing from 'app/config/theme/spacing';
import { resolveFileUrl, resolveMessageTime } from 'app/utils/index';
import useAppContext from 'app/hooks/useAppContext';
import { useConversationsQuery } from 'app/hooks/queries/useConversations';
import { ChatGroupListHiddenItem, ChatGroupListItem } from './ChatGroupListItem';
import { RefreshControl } from 'react-native';
import { useRouter } from 'solito/router';
import { useQueryClient } from '@tanstack/react-query';
import { SwipeListView } from 'react-native-swipe-list-view';
import { useRefreshOnFocus } from 'app/hooks/useRefreshOnFocus';
import useDimensions from 'app/hooks/useDimensions';
import ChatInvitation from './ChatInvitation';
import RespondToInviteModal from 'app/components/Modal/RespondToInviteModal';
import { NotificationIconWithCount } from 'app/components/NotificationCount';
import { Platform } from 'react-native';
import useWindow from 'app/hooks/useWindow';

const initialState = {
  refreshing: false,
  showInviteModal: false,
  sticky: false
};

const groupChatReducer = (state, action) => {
  switch (action.type) {
    case 'REFRESH':
      return { ...state, refreshing: !state.refreshing };

    case 'SHOW_INVITE_MODAL':
      return { ...state, showInviteModal: !state.showInviteModal };

    default:
      return { ...state, ...action };
  }
};

function ChatGroups() {
  const window = useWindow();
  const { push } = useRouter();
  const queryClient = useQueryClient();
  const {
    screen: { height: SCREEN_HEIGHT }
  } = useDimensions();

  const { state: userState } = useAppContext('user');

  const [state, dispatch] = useReducer(groupChatReducer, initialState);

  const { data: conversations, refetch } = useConversationsQuery('');
  useRefreshOnFocus(refetch);

  // const createGroupChat = () => { //TODO: USE THIS
  //   push('/chats/create-group');
  // };

  const onRefresh = () => {
    dispatch({ type: 'REFRESH' });
    refetch();
    setTimeout(() => {
      dispatch({ type: 'REFRESH' });
    }, 2000);
  };

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const archiveRow = (rowMap, rowKey) => {
    closeRow(rowMap, rowKey);
    const newData = [...conversations];
    const prevIndex = conversations.findIndex(item => item.id === rowKey);
    newData.splice(prevIndex, 1);

    queryClient.setQueryData(['conversations', ''], newData);
  };

  const renderItem = useCallback(
    ({ item }) => {
      const openChatRoom = () => {
        push(`/chats/${item.reference}`);
      };

      return (
        <ChatGroupListItem
          name={item.name}
          onPress={openChatRoom}
          newMessageCount={item.acknowledgements?.length}
          profilePicture={item.imgUrl && resolveFileUrl(item.imgUrl)}
          lastMessage={en.chats.lastMessage({
            hasLastMessage: item.lastMessage ? true : false,
            lastMessage: item.lastMessage.body,
            isAuthor: userState.user?.id === item.authorId,
            isInvite: false,
            mimeType: item.lastMessage.media?.type?.split('/')[0]
          })}
          time={
            item.lastMessage
              ? resolveMessageTime(item.lastMessage.createdAt)
              : resolveMessageTime(item.createdAt)
          }
        />
      );
    },
    [push, userState.user?.id]
  );

  const renderHiddenItem = (data, rowMap) => {
    return (
      <ChatGroupListHiddenItem
        // onShowMore={() => closeRow(rowMap, data.item.id || data.item.uuid)}
        onArchive={() => archiveRow(rowMap, data.item.id || data.item.uuid)}
      />
    );
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
      <Box>
        <HStack
          width="100%"
          alignItems="center"
          justifyContent="space-between"
          pt={`${spacing[20]}px`}
          px={`${spacing[24]}px`}
          pb={`${spacing[10]}px`}
          borderBottomWidth={state.sticky ? 1 : 0}
          borderColor="gray.100"
          _web={{
            position: 'fixed',
            bg: 'white',
            top: 0,
            zIndex: 1000,
            pt: `${spacing[20]}px`
          }}
          // pb={`${spacing[24]}px`} //TODO: USE THIS
        >
          <Text fontFamily="Satoshi-Medium" fontSize={`${spacing[30]}px`}>
            {en.chats.heading}
          </Text>

          <NotificationIconWithCount />
        </HStack>
        {/* <Touchable  //TODO: USE THIS 
            borderWidth={1}
            borderColor="gray.100"
            borderRadius={`${spacing[20]}px`}
            p={`${spacing[20]}px`}
            mx={`${spacing[24]}px`}
            mb="2px"
            shadow={5}
            flexDirection="row"
            bg="white"
            alignItems="center"
            justifyContent="space-between"
          >
            <HStack space={`${spacing[18]}px`} width="68%">
              <Icon
                as={MaterialIcons}
                name="call-split"
                color="gray.300"
                size={`${spacing[26]}px`}
              />
              <Text fontFamily="Satoshi-Medium">{en.chats.split.heading}</Text>
            </HStack>
            <Icon as={Feather} name="chevron-right" color="gray.500" size={`${spacing[26]}px`} />
          </Touchable> */}

        <Box _web={{ mt: `${spacing[60]}px` }}>
          <SwipeListView
            data={conversations}
            renderItem={renderItem}
            renderHiddenItem={renderHiddenItem}
            onScroll={({ nativeEvent }) => onScroll(nativeEvent.contentOffset.y)}
            // onRowDidOpen={rowKey => console.log('This row opened', rowKey)}
            keyExtractor={item => item.id || item.uuid}
            showsVerticalScrollIndicator={false}
            rightOpenValue={-100}
            // leftOpenValue={150}
            previewRowKey={'0'}
            previewOpenValue={-40}
            previewOpenDelay={3000}
            refreshControl={<RefreshControl refreshing={state.refreshing} onRefresh={onRefresh} />}
            ListHeaderComponent={
              <ChatInvitation respondToInivite={() => dispatch({ type: 'SHOW_INVITE_MODAL' })} />
            }
            ListFooterComponent={<Box pb={`${SCREEN_HEIGHT * 0.3}px`}></Box>}
          />
        </Box>
      </Box>
      {state.showInviteModal && (
        <RespondToInviteModal visible onClose={() => dispatch({ type: 'SHOW_INVITE_MODAL' })} />
      )}
    </>
  );
}

export default ChatGroups;
