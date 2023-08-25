import React, { useCallback, useRef, useState } from 'react';
import { FlatList, Icon, Pressable, Box } from 'native-base';
import spacing from 'app/config/theme/spacing';
import useAppContext from 'app/hooks/useAppContext';
import {
  useConversationMessagesQuery,
  useConversationsQuery
} from 'app/hooks/queries/useConversations';
import useScreenParams from 'app/hooks/useScreenParams';
import { Container } from 'app/components/index';
import { ExtraHeaderComponent, HeaderRight } from './components/ChatRoomHeader';
import ChatInput from './components/ChatInput';
import { Message } from './components/Message';
import EmptyChatRoom from './components/EmptyChatRoom';
import { AntDesign } from '@expo/vector-icons';
import InviteToGroupModal from 'app/components/Modal/InviteToGroupModal';
import FileUploadModal from 'app/components/Modal/FileUploadModal';
import { useQueryClient } from '@tanstack/react-query';
import { chatSocketClient } from 'app/context/ChatContext';

function ChatRoom() {
  const inputRef = useRef(null);
  const scrollViewRef = useRef();
  const queryClient = useQueryClient();
  const { referenceId } = useScreenParams();
  const { state, dispatch } = useAppContext('chat');
  const { state: userState } = useAppContext('user');
  const [showScrollToBottonBtn, setShowScrollToBottonBtn] = useState(false);
  const [show, setShow] = useState('');

  const { isLoading, data: conversation } = useConversationsQuery(referenceId, {
    enabled: referenceId ? true : false,
    onSuccess: data => {
      dispatch({ type: 'SET_CONVERSATION', conversation: data });
    }
  });

  const { data: messages } = useConversationMessagesQuery(conversation?.id, {
    enabled: conversation?.id ? true : false,
    onSuccess: data => {
      dispatch({ type: 'SET_MESSAGES', messages: data });
    }
  });

  const onScroll = ({ nativeEvent }) => {
    if (messages?.length > 4) {
      if (nativeEvent.contentOffset.y < nativeEvent.layoutMeasurement.height) {
        setShowScrollToBottonBtn(true);
      }
      if (nativeEvent.contentOffset.y > nativeEvent.layoutMeasurement.height) {
        setShowScrollToBottonBtn(false);
      }
    }
  };

  const onContentSizeChange = () => {
    if (messages?.length) {
      scrollToBottom();
    }
  };

  const onInputFocus = () => {
    if (messages?.length) {
      setTimeout(() => {
        scrollToBottom();
      }, 100);
    }
  };

  const scrollToBottom = () => {
    scrollViewRef.current.scrollToEnd({ animated: false });
  };

  const sendMessage = ({ mediaFileName = null, mediaMimetype = null, link = null }) => {
    const data = {
      body: state.message.trim(),
      parentId: state.reply?.uuid || null,
      mediaFileName: mediaFileName,
      mediaMimetype: mediaMimetype
    };

    const newData = {
      ...data,
      media: link ? { link: link, type: mediaMimetype } : null,
      user: userState.user,
      parent: state.reply
    };

    const queryKey = ['conversation-messages', state.conversation?.id];
    queryClient.setQueryData(queryKey, old => [...old, newData]);

    chatSocketClient(userState.token).emit('SEND_MESSAGE', {
      payload: data,
      params: {
        conversationId: state.conversation?.id
      }
    });

    dispatch({ type: 'SET_MESSAGE', message: '' });
    dispatch({ type: 'SET_REPLY', reply: null });
  };

  const renderItem = useCallback(
    ({ item, index }) => {
      const lastMessage = messages[index - 1];

      const scrollToIndex = item => {
        scrollViewRef.current.scrollToIndex({
          animated: false,
          index: messages.findIndex(message => message.uuid === item.parent.uuid),
          viewPosition: 0.5
        });
      };

      return (
        <Box pt={index === 0 ? `${spacing[24]}px` : 0}>
          <Message
            message={item}
            inputRef={inputRef}
            lastMessage={lastMessage}
            media={messages
              ?.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
              ?.filter(element => element.media !== null)
              ?.map(message => message.media)}
            onPressParentCard={() => scrollToIndex(item)}
          />
        </Box>
      );
    },
    [messages]
  );

  const ListHeaderComponent = () =>
    conversation?.type === 'CREATOR_CONVERSATION' || isLoading ? null : (
      <EmptyChatRoom
        avatar={conversation?.imgUrl}
        name={conversation?.name}
        membersCount={0}
        isPrivate={conversation?.privacy === 'private'}
        isAuthor={conversation?.authorId === userState.user?.id}
        onInvite={() => setShow('inviteModal')}
      />
    );

  return (
    <Container
      px={0}
      pt={0}
      headerTitle={isLoading ? ' ' : conversation?.name}
      headerBackgroundColor="white"
      statusBarBackgroundColor="transparent"
      headerRight={<HeaderRight isLoading={isLoading} type={conversation?.type} />}
      extraHeaderComponent={
        <ExtraHeaderComponent isLoading={isLoading} type={conversation?.type} />
      }
      headerBorderBottomWidth={1}
    >
      <FlatList
        bg="white"
        ref={scrollViewRef}
        onScroll={onScroll}
        renderItem={renderItem}
        initialNumToRender={40}
        onContentSizeChange={onContentSizeChange}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => item.uuid || index}
        ListHeaderComponent={<ListHeaderComponent />}
        data={messages
          ?.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
          ?.filter(message => message.user)}
      />

      <ChatInput
        inputRef={inputRef}
        onFocus={onInputFocus}
        onShowUploadModal={() => setShow('uploadModal')}
        onSendMessage={sendMessage}
      />

      <ScrollToEndButton visible={showScrollToBottonBtn} onScrollToEnd={scrollToBottom} />
      {show === 'inviteModal' && <InviteToGroupModal visible onClose={() => setShow('')} />}
      {show === 'uploadModal' && (
        <FileUploadModal visible onClose={() => setShow('')} onSendMessage={sendMessage} />
      )}
    </Container>
  );
}

export default ChatRoom;

const ScrollToEndButton = ({ visible, onScrollToEnd }) =>
  visible && (
    <Pressable
      onPress={onScrollToEnd}
      position="absolute"
      bottom={`${spacing[100] * 1.3}px`}
      right={0}
      px={`${spacing[20]}px`}
      py={`${spacing[12]}px`}
      borderTopLeftRadius={`${spacing[12]}px`}
      borderBottomLeftRadius={`${spacing[12]}px`}
      bg="white"
      shadow={3}
    >
      <Icon as={AntDesign} name="downcircleo" size={`${spacing[20]}px`} color="primary.600" />
    </Pressable>
  );
