const routes = {
  Onboarding: 'onboarding',
  Register: 'register',
  Login: 'login',
  ForgotPassword: 'forgot-password',
  Home: {
    screens: {
      Explore: {
        path: '',
        exact: true
      },
      Chats: {
        path: 'chats',
        exact: true
      },
      Trips: {
        path: 'trips',
        exact: true
      },
      Profile: {
        path: 'profile',
        exact: true
      }
    }
  },
  Experiences: 'experiences',
  ExperienceDetails: 'experiences/:id',
  BookExperience: 'experiences/:id/schedule/:scheduleId',
  TripDetails: 'trips/:id',
  CreateGroupChat: 'chats/create-group',
  ChatRoom: 'chats/:referenceId',
  AccountSettings: 'profile/account',
  VerifyProfile: 'profile/verify',
  TransactionHistory: 'profile/transactions',
  WithdrawalBank: 'profile/withdrawal-bank',
  Security: 'profile/security'
};

export default routes;
