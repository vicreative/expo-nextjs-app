import { useSharedConversationDetailsQuery } from 'app/hooks/queries/useConversations';
import useAppContext from 'app/hooks/useAppContext';
import useScreenParams from 'app/hooks/useScreenParams';
import { Box } from 'native-base';
import { ChatGroupListItem } from './ChatGroupListItem';
import { resolveFileUrl, resolveMessageTime } from 'app/utils/index';
import en from 'app/i18n/index';

export default function ChatInvitation({ respondToInivite = () => {} }) {
  const { referenceId } = useScreenParams();
  const { state: userState } = useAppContext('user');

  const { data: invitationDetails } = useSharedConversationDetailsQuery(referenceId, {
    enabled: referenceId ? true : false
  });
  const isConversationAuthor = userState.user?.id === invitationDetails?.conversation?.authorId;
  const showInvitation = referenceId && invitationDetails && !isConversationAuthor;

  return (
    <Box>
      {showInvitation ? (
        <ChatGroupListItem
          name={invitationDetails?.conversation?.name}
          onPress={respondToInivite}
          newMessageCount={1}
          profilePicture={
            invitationDetails?.conversation?.imgUrl &&
            resolveFileUrl(invitationDetails?.conversation?.imgUrl)
          }
          lastMessage={en.chats.lastMessage({
            hasLastMessage: invitationDetails?.conversation?.lastMessage ? true : false,
            lastMessage: invitationDetails?.conversation?.lastMessage.body,
            isAuthor: userState.user?.id === invitationDetails.authorId,
            isInvite: true,
            mimeType: item.lastMessage.media?.type?.split('/')[0]
          })}
          time={resolveMessageTime(invitationDetails.createdAt)}
        />
      ) : null}
    </Box>
  );
}
