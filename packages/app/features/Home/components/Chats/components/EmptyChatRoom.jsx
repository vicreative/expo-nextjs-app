import { Feather } from '@expo/vector-icons';
import Touchable from 'app/components/Gestures/Touchable';
import spacing from 'app/config/theme/spacing';
import useDimensions from 'app/hooks/useDimensions';
import en from 'app/i18n/index';
import { Avatar, Box, Heading, Icon, Text, VStack } from 'native-base';
import { resolveFileUrl } from 'app/utils/index';

function EmptyChatRoom({ avatar, name, membersCount, isPrivate, isAuthor, onInvite = () => {} }) {
  const {
    screen: { height: SCREEN_HEIGHT }
  } = useDimensions();

  const showInviteCard = membersCount <= 0 && isPrivate ? (isAuthor ? true : false) : true;

  return (
    <VStack
      alignItems="center"
      justifyContent="center"
      mt={`${SCREEN_HEIGHT * 0.25}px`}
      _web={{
        mt: SCREEN_HEIGHT * 0.18
      }}
      px={`${spacing[24]}px`}
      flex={1}
    >
      <Avatar
        bg={'primary.100'}
        width={`${spacing[100] * 0.7}px`}
        height={`${spacing[100] * 0.7}px`}
        source={
          avatar && {
            uri: resolveFileUrl(avatar)
          }
        }
        mb={`${spacing[22]}px`}
      >
        {name && name.charAt(0)?.toUpperCase()}
      </Avatar>
      <Text fontSize={`${spacing[20]}px`} mb={`${spacing[6]}px`} textAlign="center">
        {en.chats.chatRoom.nodata.heading}
      </Text>
      <Heading fontSize={`${spacing[24]}px`} mb={`${spacing[20]}px`} textAlign="center">
        {name}
      </Heading>
      <Text
        mb={showInviteCard ? `${spacing[40]}px` : `${spacing[16]}px`}
        color="gray.300"
        textAlign="center"
      >
        {en.chats.chatRoom.nodata.subheading}
      </Text>
      {showInviteCard && (
        <Touchable
          flexDirection="row"
          width="100%"
          p={`${spacing[16]}px`}
          mt={`${-spacing[10]}px`}
          mb={`${spacing[6]}px`}
          bg="gray.500"
          borderRadius={`${spacing[10]}px`}
          justifyContent="space-between"
          onPress={onInvite}
        >
          <Box width="92%">
            <Text mb={`${spacing[6]}px`} fontSize={`${spacing[14]}px`} color="gray.200">
              {en.chats.chatRoom.nodata.invite.heading}
            </Text>
            <Heading fontSize={`${spacing[14]}px`} color="white">
              {en.chats.chatRoom.nodata.invite.subheading}
            </Heading>
          </Box>
          <VStack width="8%" alignItems="flex-end">
            <Icon as={Feather} name="chevron-right" size={'20px'} color="white" />
          </VStack>
        </Touchable>
      )}
    </VStack>
  );
}

export default EmptyChatRoom;
