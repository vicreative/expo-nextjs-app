import { Ionicons, MaterialIcons, SimpleLineIcons } from '@expo/vector-icons';
import spacing from 'app/config/theme/spacing';
import { Icon } from 'native-base';
import { resolveAssetsUrl } from 'app/utils/index';

const explore = {
  user: user => (user ? `Hi, ${user.firstName}` : 'Welcome!'),
  verifyAccount: 'Verify your account',
  pending: 'Pending',
  discover: `Discover your next experience`,
  or: `Or try these new experiences`,
  privateTrips: `Private Trips`,
  verifyProfile: {
    title: `Verify your profile`,
    text: `It is required you verify your profile to allow you enjoy the full experience with a virtual bank account that enables you split costs with friends, send and receive money from your friends.`,
    btn: `Verify profile`
  },
  activities: [
    {
      id: 0,
      icon: (
        <Icon
          as={Ionicons}
          name={'chatbubbles-outline'}
          color={'gray.300'}
          size={`${spacing[26]}px`}
        />
      ),
      title: `Start a group to explore with friends`,
      href: `/chats`,
      disabled: true
    },
    {
      id: 1,
      icon: (
        <Icon as={MaterialIcons} name={'call-split'} color={'gray.300'} size={`${spacing[26]}px`} />
      ),
      title: `Split the cost and pay easily`,
      href: `/trips`,
      disabled: true
    }
  ],
  exploreEverywhere: `Explore everywhere`,
  getUpdated: `Get updated information on travel restrictions globally`,
  more: {
    title: `There’s more to come, tell us which of these you are most interested in.`,
    notInterested: `I’m not interested in any`,
    plans: [
      {
        id: 0,
        imgUrl: resolveAssetsUrl('onboarding-2.png'),
        icon: <Icon as={SimpleLineIcons} name={'lock'} color={'white'} size={`${spacing[34]}px`} />,
        title: `Private groups and Solo trips, just the way you want`,
        btnText: `I’m interested in this`
      },
      {
        id: 1,
        imgUrl: resolveAssetsUrl('onboarding-4.png'),
        icon: <Icon as={SimpleLineIcons} name={'lock'} color={'white'} size={`${spacing[34]}px`} />,
        title: `Personalised and customised trip itineraries`,
        btnText: `I’m interested in this`
      }
    ],
    success: {
      title: `Great!`,
      message: `Thanks for taking the time to let us know your preferences`
    }
  }
};
export default explore;
