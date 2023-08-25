import { AntDesign, Ionicons, SimpleLineIcons } from '@expo/vector-icons';
import env from 'app/config/env';
import { Icon } from 'native-base';

const header = {
  logoAlt: 'Expitra',
  links: [
    {
      id: 0,
      name: 'Home',
      url: env.WEBSITE_URL
    },
    { id: 1, name: 'About', url: `${env.WEBSITE_URL}/about` },
    { id: 2, name: 'Creators', url: `${env.WEBSITE_URL}/creator` },
    { id: 3, name: 'Explore', url: '/' }
  ],
  buttons: [
    {
      id: 0,
      name: 'Login',
      url: '/login',
      variant: 'unstyled'
    },
    { id: 1, name: 'Sign up to explore', url: `/register`, variant: 'solid' }
  ],
  user: user => (user ? `Hi, ${user}` : `Welcome`),
  dropdownLinks: (userCountry, isKycVerified, business) => [
    userCountry === 'Nigeria' &&
      !isKycVerified && {
        id: 0,
        name: 'Verify Your Account',
        href: `/profile/verify`,
        color: 'gray.500',
        icon: <Icon as={SimpleLineIcons} name="check" color="primary.600" size="20px" />,
        disabled: isKycVerified ? true : false
      },
    {
      id: 1,
      name: 'Account Information',
      href: `/profile/account`,
      color: 'gray.500',
      icon: <Icon as={Ionicons} name="person-outline" color="primary.600" size="20px" />
    },
    {
      id: 2,
      name: 'Your Trips',
      href: `/trips`,
      color: 'gray.500',
      tip: 'Your tickets are here',
      icon: <Icon as={Ionicons} name="receipt-outline" color="primary.600" size="20px" />
    },
    {
      id: 3,
      name: business ? 'Creator Dashboard' : 'Become a Creator',
      href: business
        ? `${env.WEBSITE_URL}/creator/dashboard`
        : `${env.WEBSITE_URL}/creator/register`,
      color: 'gray.500',
      icon: <Icon as={Ionicons} name="home-outline" color="primary.600" size="20px" />
    },
    {
      id: 4,
      name: 'Chat Groups',
      href: `/chats`,
      color: 'gray.500',
      icon: <Icon as={Ionicons} name="ios-chatbubbles-outline" color="primary.600" size="20px" />,
      disabled: true
    },
    {
      id: 5,
      name: 'Contact Us',
      href: `mailto:admin@expitra.com`,
      color: 'gray.500',
      icon: <Icon as={AntDesign} name="questioncircleo" color="primary.600" size="20px" />
    },
    {
      id: 6,
      name: 'Logout',
      color: 'error.600',
      icon: <Icon as={SimpleLineIcons} name="logout" color="error.600" size="20px" />
    }
  ],
  more: 'More',
  logout: 'Log Out'
};
export default header;
