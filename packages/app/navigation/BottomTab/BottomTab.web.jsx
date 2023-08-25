import { Flex, HStack, Icon, Pressable, Text } from 'native-base';
import spacing from 'app/config/theme/spacing';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'solito/router';
import { UserOutlinedIcon, UserFilledIcon } from 'app/components/Icons/UserIcon';
import { CalendarFilledIcon, CalendarOutlinedIcon } from 'app/components/Icons/CalendarIcon';
import useDimensions from 'app/hooks/useDimensions';
import useWindow from 'app/hooks/useWindow';

const bottomTabs = [
  {
    name: 'Explore',
    icon: focused => (
      <Icon
        as={FontAwesome5}
        name={focused ? 'globe-africa' : 'globe-africa'}
        color={focused ? 'primary.600' : 'gray.300'}
        size={`${spacing[22]}px`}
      />
    ),
    path: '/'
  },
  {
    name: 'Chats',
    icon: focused => (
      <Icon
        as={Ionicons}
        name={focused ? 'chatbubbles' : 'chatbubbles-outline'}
        color={focused ? 'primary.600' : 'gray.300'}
        size={`${spacing[24]}px`}
      />
    ),
    path: '/chats'
  },
  {
    name: 'Trips',
    icon: focused =>
      !focused ? (
        <CalendarOutlinedIcon width={spacing[22]} height={spacing[22]} />
      ) : (
        <CalendarFilledIcon width={spacing[23]} height={spacing[23]} />
      ),
    path: '/trips'
  },
  {
    name: 'Profile',
    icon: focused =>
      !focused ? (
        <UserOutlinedIcon width={spacing[22]} height={spacing[22]} />
      ) : (
        <UserFilledIcon width={spacing[24]} height={spacing[24]} />
      ),
    path: '/profile'
  }
];

export default function BottomTab() {
  const window = useWindow();
  const { push } = useRouter();
  const {
    screen: { height: SCREEN_HEIGHT }
  } = useDimensions();

  return (
    <Flex
      bg="white"
      height={SCREEN_HEIGHT * 0.105}
      maxHeight={'96px'}
      width="100%"
      position="fixed"
      borderTopWidth={1}
      borderTopColor="gray.100"
      bottom={0}
      alignItems="center"
      px={`${spacing[24]}px`}
      pt={`${spacing[10]}px`}
    >
      <HStack width="100%" maxWidth={spacing[100] * 4} justifyContent="space-between">
        {bottomTabs.map(tab => {
          const isFocused = window?.location?.pathname === tab.path;
          return (
            <Pressable
              onPress={() => push(tab.path)}
              alignItems="center"
              key={tab.name}
              maxHeight={spacing[55]}
              minWidth={spacing[60]}
            >
              {tab.icon(isFocused)}
              <Text
                // fontSize={`${spacing[12]}px`}
                fontFamily={isFocused ? 'Satoshi-Bold' : 'Satoshi-Medium'}
                color={isFocused ? 'gray.500' : 'gray.300'}
              >
                {tab.name}
              </Text>
            </Pressable>
          );
        })}
      </HStack>
    </Flex>
  );
}
