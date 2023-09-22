import React from 'react';
import * as Notifications from 'expo-notifications';
import { registerForPushNotificationsAsync } from 'app/services/notifications';
import { Platform } from 'react-native';
import env from 'app/config/env';
import useAppContext, { NotificationsContext } from 'app/hooks/useAppContext';
import { useRouter } from 'solito/router';
import useAsyncStorage from 'app/hooks/useAsyncStorage';
// import * as TaskManager from 'expo-task-manager';
// const BACKGROUND_NOTIFICATION_TASK = 'BACKGROUND-NOTIFICATION-TASK';

const socketIOClient = require('socket.io-client');

const initialState = {
  pushToken: '',
  notification: false
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

// set default notification
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true
  })
});

// TaskManager.defineTask(BACKGROUND_NOTIFICATION_TASK, ({ data, error, executionInfo }) =>
//   handleNewNotification(data.notification)
// );

export const NotificationsProvider = ({ children }) => {
  const { push } = useRouter();
  const responseListener = React.useRef();
  const notificationListener = React.useRef();
  const { dispatch: setUserState } = useAppContext('user');
  const [state, dispatch] = React.useReducer(NotificationsReducer, initialState);
  const { isLoading, token, isLoggedIn } = useAsyncStorage();

  const handleNewNotification = async notificationObject => {
    const badgeCount = await Notifications.getBadgeCountAsync();

    const notificationData = notificationObject.data?.data;
    if (notificationData?.action === 'NEW_EXPERIENCE_NOTICE') {
      push(`/experiences/${notificationData.resourceId}`);
    } else if (notificationData?.coverMediaPath) {
      push(`/experiences/${notificationData.id}`);
    }

    console.log(notificationData);
    // add the code to do what you need with the received notification  and, e.g., set badge number on app icon
    await Notifications.setBadgeCountAsync(badgeCount - 1);
  };

  // register for push notifications
  React.useEffect(() => {
    registerForPushNotificationsAsync().then(pushToken => dispatch({ pushToken: pushToken }));

    // register task to run whenever is received while the app is in the background
    //   Notifications.registerTaskAsync(BACKGROUND_NOTIFICATION_TASK);

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(
      async notification => {
        const badgeCount = await Notifications.getBadgeCountAsync();

        await Notifications.setBadgeCountAsync(badgeCount + 1);

        dispatch({ notification: notification });
      }
    );

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      handleNewNotification(response.notification.request.content);
    });

    return () => {
      // cleanup the listener and task registry
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
      //     Notifications.unregisterTaskAsync(BACKGROUND_NOTIFICATION_TASK);
    };
  }, []);

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

  const value = { state, dispatch };

  return <NotificationsContext.Provider value={value}>{children}</NotificationsContext.Provider>;
};
