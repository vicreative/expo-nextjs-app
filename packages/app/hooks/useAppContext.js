import React from 'react';

export const UserContext = React.createContext();
export const NavigationContext = React.createContext();
export const NotificationsContext = React.createContext();
export const ExperienceContext = React.createContext();
export const ChatContext = React.createContext();

export default function useAppContext(context = undefined) {
  const userContext = React.useContext(UserContext);
  const navigationContext = React.useContext(NavigationContext);
  const notificationContext = React.useContext(NotificationsContext);
  const experienceContext = React.useContext(ExperienceContext);
  const chatContext = React.useContext(ChatContext);

  switch (context) {
    case 'user':
      return resolveContext(userContext);
    case 'navigation':
      return resolveContext(navigationContext);
    case 'notification':
      return resolveContext(notificationContext);
    case 'experienceDetails':
      return resolveContext(experienceContext);
    case 'chat':
      return resolveContext(chatContext);
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
