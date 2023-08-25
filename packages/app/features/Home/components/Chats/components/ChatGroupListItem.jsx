import Touchable from 'app/components/Gestures/Touchable';
import { ArchiveOutlineIcon } from 'app/components/Icons/Archive';
import { NotificationBadgeCount } from 'app/components/NotificationCount';
import spacing from 'app/config/theme/spacing';
import en from 'app/i18n/index';
import { Avatar, Box, Divider, Heading, HStack, Pressable, Stack, Text, VStack } from 'native-base';

export function ChatGroupListItem({
  onPress = () => {},
  name,
  lastMessage,
  profilePicture,
  time,
  newMessageCount
}) {
  return (
    <Box bg="white">
      <Touchable
        onPress={onPress}
        justifyContent="space-between"
        flexDirection="row"
        py={`${spacing[20]}px`}
        px={`${spacing[24]}px`}
        alignItems="center"
      >
        <Box width="17%">
          <Avatar
            bg="primary.100"
            width={`${spacing[50]}px`}
            height={`${spacing[50]}px`}
            source={
              profilePicture && {
                uri: profilePicture
              }
            }
          >
            {name && name.charAt(0)?.toUpperCase()}
          </Avatar>
        </Box>

        <HStack width="83%">
          <Stack space="2px" width="78%">
            <Heading isTruncated noOfLines={1} fontSize={`${spacing[16]}px`}>
              {name}
            </Heading>
            <Text isTruncated noOfLines={1} fontSize={`${spacing[14]}px`} color="gray.300">
              {lastMessage}
            </Text>
          </Stack>

          <Stack space={`${spacing[10]}px`} width="22%" alignItems="flex-end">
            <Text fontSize={`${spacing[12]}px`} color="gray.300">
              {time}
            </Text>
            {newMessageCount > 0 ? <NotificationBadgeCount count={newMessageCount} /> : null}
          </Stack>
        </HStack>
      </Touchable>
      <Divider bg="gray.100" thickness="1" mx={`${spacing[24]}px`} />
    </Box>
  );
}

export function ChatGroupListHiddenItem({
  // onShowMore = () => {},
  onArchive = () => {}
}) {
  return (
    <HStack justifyContent="flex-end" flex="1" pl="2">
      {/* <Pressable
        w="80px"
        ml="auto"
        cursor="pointer"
        bg="gray.200"
        justifyContent="center"
        onPress={onShowMore}
        _pressed={{
          opacity: 0.5
        }}
      >
        <VStack alignItems="center" space="2px">
          <Icon as={Entypo} name="dots-three-horizontal" size={`${spacing[18]}px`} color="white" />
          <Text color="white" fontFamily="Satoshi-Medium">
            {en.chats.more}
          </Text>
        </VStack>
      </Pressable> */}
      <Pressable
        w="100px"
        bg="primary.300"
        justifyContent="center"
        onPress={onArchive}
        _pressed={{
          opacity: 0.5
        }}
      >
        <VStack alignItems="center" space="2px">
          <ArchiveOutlineIcon width={20} height={20} stroke="white" strokeWidth={2} />
          <Text color="white" fontFamily="Satoshi-Medium">
            {en.chats.archive}
          </Text>
        </VStack>
      </Pressable>
    </HStack>
  );
}
