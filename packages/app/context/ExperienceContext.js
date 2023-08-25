import { ExperienceContext } from 'app/hooks/useAppContext';
import useScreenParams from 'app/hooks/useScreenParams';
import React from 'react';

export const initialExperienceState = isPrivateBooking => ({
  experience: {},
  isLoading: true,
  showAvailableDates: false,
  showPerks: false,
  showProcessorFeeModal: false,
  selectedGroupSize: 0,
  noOfAdults: 1,
  isPrivateBooking,
  participants: [],
  schedule: {},
  toggleDates: () => {},
  togglePerks: () => {}
});

const experienceReducer = (state, action) => {
  return {
    ...state,
    ...action
  };
};

export const ExperienceProvider = ({ children }) => {
  const { bookingType } = useScreenParams();

  const [state, dispatch] = React.useReducer(
    experienceReducer,
    initialExperienceState(bookingType === 'PRIVATE')
  );

  const toggleDates = () => {
    dispatch({ ...state, showAvailableDates: !state.showAvailableDates });
  };

  const togglePerks = () => {
    dispatch({ ...state, showPerks: !state.showPerks });
  };

  const value = {
    state: {
      ...state,
      toggleDates,
      togglePerks
    },
    dispatch
  };

  return <ExperienceContext.Provider value={value}>{children}</ExperienceContext.Provider>;
};
