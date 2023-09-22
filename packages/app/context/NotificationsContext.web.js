import React from 'react';
import env from 'app/config/env';
import useAppContext, { NotificationsContext } from 'app/hooks/useAppContext';
import { Platform } from 'react-native-web';
import useAsyncStorage from 'app/hooks/useAsyncStorage';

const socketIOClient = require('socket.io-client');

const initialState = {
  pushToken: null,
  notification: false,
  unReadActivities: []
};

const NotificationsReducer = (state, action) => {
  return {
    ...state,
    ...action
  };
};

export const activitiesSocketClient = token =>
  socketIOClient(`${env.API_URL}/activities?token=${token}`, {
    reconnection: true,
    extraHeaders: {
      authorization: token
    }
  });

export const NotificationsProvider = ({ children }) => {
  const { dispatch: setUserState } = useAppContext('user');
  const [state, dispatch] = React.useReducer(NotificationsReducer, initialState);
  const { isLoading, token, isLoggedIn } = useAsyncStorage();

  const value = { state, dispatch };

  React.useEffect(() => {
    if (!isLoading && token !== null && isLoggedIn === 'true') {
      activitiesSocketClient(token).on('connect', () => {
        console.log(Platform.OS.toUpperCase(), 'You are now connected to activities');
      });

      activitiesSocketClient(token).on('disconnect', () => {
        console.log(Platform.OS.toUpperCase(), 'Disconnected from activities');
      });

      activitiesSocketClient(token).on('NEW_ACTIVITY', newActivity => {
        console.log('NEW_ACTIVITY', newActivity);
      });

      activitiesSocketClient(token).on('LOAD_UNREAD_ACTIVITIES', data => {
        setUserState(userState => ({ ...userState, noOfNewActivity: data.data.length }));
      });

      return () => {
        activitiesSocketClient(token).off('connect');
        activitiesSocketClient(token).off('NEW_ACTIVITY');
        activitiesSocketClient(token).off('LOAD_UNREAD_ACTIVITIES');
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, token, isLoggedIn]);

  return <NotificationsContext.Provider value={value}>{children}</NotificationsContext.Provider>;
};
