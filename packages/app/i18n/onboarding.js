import { resolveAssetsUrl } from 'app/utils';

const onboarding = {
  slides: [
    {
      id: 0,
      uri: resolveAssetsUrl('onboarding-1.png'),
      text: 'Explore and connect on a global scale.'
    },
    {
      id: 1,
      uri: resolveAssetsUrl('onboarding-2.png'),
      text: 'Share memorable experiences with others like you.'
    },
    {
      id: 2,
      uri: resolveAssetsUrl('onboarding-3.png'),
      text: 'Designed for all levels, we are making travel more accessible.'
    }
  ],
  getStarted: 'Get Started',
  connect: {
    login: 'Login',
    register: 'Create an Account',
    text: 'Or Connect With',
    google: 'Sign Up with Google'
  },
  condition: {
    text: 'By signing up, you agree to our',
    link: {
      terms: 'Terms Of Service',
      privacy: 'Privacy Policy',
      cookie: 'Cookies Policy'
    }
  }
};
export default onboarding;
