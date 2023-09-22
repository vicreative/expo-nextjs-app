import React from 'react';
import NoInternetCard from 'app/components/Cards/NoInternetCard';
import { UserContext } from 'app/hooks/useAppContext';

const initialState = {
  user: null,
  business: null,
  currency: {
    name: 'USD',
    symbol: '$'
  },
  noOfNewActivity: 0
};

const userReducer = (state, action) => {
  switch (action.type) {
    case 'CLEAR_STATE':
      return {
        ...state,
        user: null,
        business: null
      };

    default:
      return { ...state, ...action };
  }
};

export const UserProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(userReducer, initialState);
  const value = { state, dispatch };

  return (
    <UserContext.Provider value={value}>
      {children}

      <NoInternetCard />
    </UserContext.Provider>
  );
};
