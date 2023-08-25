import { useQueryClient } from '@tanstack/react-query';
import env from 'app/config/env';
import useAppContext, { ChatContext } from 'app/hooks/useAppContext';
import React, { useEffect } from 'react';
import { Platform } from 'react-native';

const socketIOClient = require('socket.io-client');

const initialState = {
  contentToShow: 'chat',
  conversation: {},
  messages: [],
  message: '',
  newMessage: {},
  reply: null
};

const chatReducer = (state, action) => {
  switch (action.type) {
    case 'CONTENT_TO_SHOW':
      return { ...state, contentToShow: action.contentToShow };

    case 'SET_CONVERSATION':
      return { ...state, conversation: action.conversation };

    case 'SET_MESSAGES':
      return { ...state, messages: action.messages };

    case 'SET_MESSAGE':
      return { ...state, message: action.message };

    case 'SET_NEW_MESSAGE':
      return { ...state, newMessage: action.newMessage };

    case 'SET_REPLY':
      return { ...state, reply: action.reply };

    default:
      return { ...state, ...action };
  }
};

export const chatSocketClient = token =>
  socketIOClient(`${env.API_URL}/chats?token=${token}`, {
    reconnection: true,
    extraHeaders: {
      authorization: token
    }
  });

export const ChatProvider = ({ children }) => {
  const queryClient = useQueryClient();
  const [state, dispatch] = React.useReducer(chatReducer, initialState);
  const { state: userState } = useAppContext('user');

  useEffect(() => {
    if (userState.token !== null && userState.isLoggedIn === 'true') {
      chatSocketClient(userState.token).on('connect', () => {
        console.log(Platform.OS.toUpperCase(), 'You are now connected to chats');
      });

      chatSocketClient(userState.token).on('disconnect', () => {
        console.log(Platform.OS.toUpperCase(), 'Disconnected from chats');
      });

      chatSocketClient(userState.token).on('NEW_MESSAGE', data => {
        dispatch({ type: 'SET_NEW_MESSAGE', newMessage: data.data });
        queryClient.invalidateQueries(['conversation-messages', data.data.conversation.id]);
        queryClient.invalidateQueries(['conversations', data.data.conversation.reference]);
      });

      return () => {
        chatSocketClient(userState.token).off('connect');
        chatSocketClient(userState.token).off('NEW_MESSAGE');
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userState.isLoggedIn, userState.token]);

  const value = { state, dispatch };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
