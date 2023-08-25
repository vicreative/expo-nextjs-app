import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import colors from 'app/config/theme/colors';
import { Icon, Text } from 'native-base';
import spacing from 'app/config/theme/spacing';
import { Chats, Explore, Profile, Trips } from 'app/features/Home/components/index';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { UserOutlinedIcon, UserFilledIcon } from 'app/components/Icons/UserIcon';
import { CalendarFilledIcon, CalendarOutlinedIcon } from 'app/components/Icons/CalendarIcon';
import { ChatProvider } from 'app/context/ChatContext';
import useDimensions from 'app/hooks/useDimensions';

const Tab = createBottomTabNavigator();

const bottomTabs = [
  {
    name: 'Explore',
    component: props => <Explore {...props} />,
    icon: focused => (
      <Icon
        as={FontAwesome5}
        name={focused ? 'globe-africa' : 'globe-africa'}
        color={focused ? 'primary.600' : 'gray.300'}
        size={`${spacing[22]}px`}
      />
    )
  },
  {
    name: 'Chats',
    component: props => {
      return (
        <ChatProvider>
          <Chats {...props} />
        </ChatProvider>
      );
    },
    icon: focused => (
      <Icon
        as={Ionicons}
        name={focused ? 'chatbubbles' : 'chatbubbles-outline'}
        color={focused ? 'primary.600' : 'gray.300'}
        size={`${spacing[24]}px`}
      />
    )
  },
  {
    name: 'Trips',
    component: props => <Trips {...props} />,
    icon: focused =>
      !focused ? (
        <CalendarOutlinedIcon width={spacing[22]} height={spacing[22]} />
      ) : (
        <CalendarFilledIcon width={spacing[23]} height={spacing[23]} />
      )
  },
  {
    name: 'Profile',
    component: props => <Profile {...props} />,
    icon: focused =>
      !focused ? (
        <UserOutlinedIcon width={spacing[22]} height={spacing[22]} />
      ) : (
        <UserFilledIcon width={spacing[24]} height={spacing[24]} />
      )
  }
];

export default function BottomTab() {
  const {
    screen: { height: SCREEN_HEIGHT }
  } = useDimensions();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: colors.primary[600],
        tabBarStyle: { minHeight: SCREEN_HEIGHT * 0.105 },
        tabBarItemStyle: { maxHeight: spacing[55], paddingTop: spacing[12] }
      }}
    >
      {bottomTabs.map(tab => (
        <Tab.Screen
          key={tab.name}
          name={tab.name}
          options={{
            tabBarLabel: ({ focused }) => (
              <Text
                // fontSize={`${spacing[12]}px`}
                mt={`${spacing[4]}px`}
                fontFamily={focused ? 'Satoshi-Bold' : 'Satoshi-Medium'}
                color={focused ? 'gray.500' : 'gray.300'}
              >
                {tab.name}
              </Text>
            ),
            tabBarIcon: ({ focused }) => tab.icon(focused)
          }}
        >
          {tab.component}
        </Tab.Screen>
      ))}
    </Tab.Navigator>
  );
}
