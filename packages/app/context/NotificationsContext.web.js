import React from 'react';
import env from 'app/config/env';
import useAppContext, { NotificationsContext } from 'app/hooks/useAppContext';
import { Platform } from 'react-native-web';

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
  const { state: userState, dispatch: setUserState } = useAppContext('user');
  const [state, dispatch] = React.useReducer(NotificationsReducer, initialState);

  const value = { state, dispatch };

  React.useEffect(() => {
    if (userState.token !== null && userState.isLoggedIn === 'true') {
      activitiesSocketClient(userState.token).on('connect', () => {
        console.log(Platform.OS.toUpperCase(), 'You are now connected to activities');
      });

      activitiesSocketClient(userState.token).on('disconnect', () => {
        console.log(Platform.OS.toUpperCase(), 'Disconnected from activities');
      });

      activitiesSocketClient(userState.token).on('NEW_ACTIVITY', newActivity => {
        console.log('NEW_ACTIVITY', newActivity);
      });

      activitiesSocketClient(userState.token).on('LOAD_UNREAD_ACTIVITIES', data => {
        setUserState({ ...userState, noOfNewActivity: data.data.length });
      });

      return () => {
        activitiesSocketClient(userState.token).off('connect');
        activitiesSocketClient(userState.token).off('NEW_ACTIVITY');
        activitiesSocketClient(userState.token).off('LOAD_UNREAD_ACTIVITIES');
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userState.token, userState.isLoggedIn]);

  return <NotificationsContext.Provider value={value}>{children}</NotificationsContext.Provider>;
};
