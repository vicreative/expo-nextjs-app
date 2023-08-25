import { NavigationContext } from 'app/hooks/useAppContext';
import React from 'react';

const initialState = {
  headerTitle: '',
  onGoBack: () => {}
};

const navigationReducer = (state, action) => {
  return {
    ...state,
    ...action
  };
};

export const NavigationProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(navigationReducer, initialState);

  const value = { state, dispatch };

  return <NavigationContext.Provider value={value}>{children}</NavigationContext.Provider>;
};
