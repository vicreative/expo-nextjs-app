import React from 'react';

export const UserContext = React.createContext();
export const NotificationsContext = React.createContext();

export default function useAppContext(context = undefined) {
  const userContext = React.useContext(UserContext);
  const notificationContext = React.useContext(NotificationsContext);

  switch (context) {
    case 'user':
      return resolveContext(userContext);
    case 'notification':
      return resolveContext(notificationContext);
    default:
      return resolveContext(context);
  }
}

const resolveContext = context => {
  if (context === undefined) {
    console.warn(`${context}Context must be used within a ${context}Provider`);
  } else {
    return context;
  }
};
