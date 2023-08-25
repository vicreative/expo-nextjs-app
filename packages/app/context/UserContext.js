import React, { useEffect } from 'react';
import ShareBottomSheet from 'app/components/BottomSheet/ShareBottomSheet';
import NoInternetCard from 'app/components/Cards/NoInternetCard';
import MediaModal from 'app/components/Modal/MediaModal';
import VerifyProfileModal from 'app/components/Modal/VerifyProfileModal';
import { useUserCurrencyInfoQuery, useUserQuery } from 'app/hooks/queries/useUserProfile';
import { UserContext } from 'app/hooks/useAppContext';
import useAsyncStorage from 'app/hooks/useAsyncStorage';
import { useRouter } from 'solito/router';
import { useQueryClient } from '@tanstack/react-query';
import FundWalletModal from 'app/components/Modal/FundWalletModal';
import WebsiteWebview from 'app/components/WebsiteWebview';
import NotificationsModal from 'app/components/Modal/NotificationsModal';
// import ReviewModal from 'app/components/Modal/ReviewModal';

export const initialUserModalState = {
  modalToShow: '',
  options: {
    canGoBack: false,
    media: {
      showBtnGroup: false,
      currentIndex: 0,
      data: []
    },
    share: {
      showGroups: false,
      uri: '',
      campaignName: '',
      text: '',
      title: '',
      pathname: ''
    }
  }
};

const initialState = {
  token: null,
  isLoggedIn: null,
  user: null,
  business: null,
  currency: {
    name: 'USD',
    symbol: '$'
  },
  noOfNewActivity: 0,
  modal: initialUserModalState,
  processorFee: 80 // 80 naira by default
};

const userReducer = (state, action) => {
  switch (action.type) {
    case 'CLEAR_STATE':
      return {
        ...state,
        user: null,
        business: null,
        loading: false,
        modal: initialUserModalState
      };

    default:
      return { ...state, ...action };
  }
};

export const UserProvider = ({ children }) => {
  const queryClient = useQueryClient();
  const { isLoading, token, isLoggedIn } = useAsyncStorage();
  const [state, dispatch] = React.useReducer(userReducer, initialState);
  const { push } = useRouter();
  const value = { state, dispatch };

  useEffect(() => {
    if (!isLoading && (isLoggedIn || token)) {
      dispatch({
        ...state,
        token: token,
        isLoggedIn: isLoggedIn
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isLoggedIn, token]);

  const { data: currency } = useUserCurrencyInfoQuery({
    onSuccess: data => {
      dispatch({
        ...state,
        currency: {
          name: data.currencyInfo.currency,
          symbol: data.currencyInfo.currencySymbol,
          ...data
        },
        user: state.user,
        business: state.business,
        processorFee: state.processorFee,
        token: state.token,
        noOfNewActivity: state.noOfNewActivity,
        isLoggedIn: state.isLoggedIn
      });
    }
  });

  useUserQuery({
    enabled: state.token !== null && state.isLoggedIn === 'true',
    onSuccess: data => {
      queryClient.invalidateQueries(['user-currency-info']);

      dispatch({
        ...state,
        currency: {
          name: currency?.currencyInfo?.currency,
          symbol: currency?.currencyInfo?.currencySymbol,
          ...currency
        },
        user: data,
        business: data.businesses[0],
        processorFee: state.processorFee,
        token: state.token,
        noOfNewActivity: state.noOfNewActivity,
        isLoggedIn: state.isLoggedIn
      });
    }
  });

  const closeModal = () => {
    dispatch({ ...state, modal: initialUserModalState });
  };

  return (
    <UserContext.Provider value={value}>
      {children}

      <NoInternetCard />
      {state.modal.modalToShow === 'fundWallet' && <FundWalletModal visible onClose={closeModal} />}

      {(state.modal.modalToShow === 'allMedia' || state.modal.modalToShow === 'singleMedia') && (
        <MediaModal visible onClose={closeModal} />
      )}

      {state.modal.modalToShow === 'verifyProfile' && (
        <VerifyProfileModal visible onClose={closeModal} onVerify={() => push('/profile/verify')} />
      )}

      {state.modal.modalToShow === 'shareBottomSheet' && (
        <ShareBottomSheet visible onClose={closeModal} />
      )}

      {(state.modal.modalToShow === 'creatorDashboard' ||
        state.modal.modalToShow === 'privacyPolicy') && (
        <WebsiteWebview
          visible
          contentToShow={state.modal.modalToShow}
          token={state.token}
          onClose={closeModal}
        />
      )}

      {state.modal.modalToShow === 'notifications' && (
        <NotificationsModal visible onClose={closeModal} />
      )}
      {/* <ReviewModal visible onClose={() => {}} /> */}
    </UserContext.Provider>
  );
};
