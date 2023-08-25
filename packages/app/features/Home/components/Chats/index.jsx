import { Container } from 'app/components/index';
import AccountLayout from 'app/components/Layout/AccountLayout';
import en from 'app/i18n/index';
import { Heading, Hidden } from 'native-base';
import GetStarted from './components/GetStarted';
import { ComingSoonOverlay } from 'app/components/Cards/ComingSoon';
import useDimensions from 'app/hooks/useDimensions';

export default function Chats() {
  const {
    screen: { height: SCREEN_HEIGHT }
  } = useDimensions();

  return (
    <>
      {/* larger device(tablet & desktop) for web only */}
      <Hidden only="base">
        <AccountLayout>
          <Heading>{en.chats.heading}</Heading>
        </AccountLayout>
      </Hidden>

      {/* smaller device(mobile phones)for web & mobile app */}
      <Hidden from="sm">
        <Container px={0}>
          <GetStarted />
          <ComingSoonOverlay shadow="none" borderWidth={0} h={SCREEN_HEIGHT} opacity={0.9} />
        </Container>
      </Hidden>
    </>
  );
}

// import { Container, LoadingState } from 'app/components/index';
// import AccountLayout from 'app/components/Layout/AccountLayout';
// import en from 'app/i18n/index';
// import { Box, Heading, Hidden } from 'native-base';
// import ChatGroups from './components/ChatGroups';
// import GetStarted from './components/GetStarted';
// import { useConversationsQuery } from 'app/hooks/queries/useConversations';
// import LoginCard from 'app/components/LoginCard';
// import useAppContext from 'app/hooks/useAppContext';

// export default function Chats() {
//   const { state } = useAppContext('user');

//   const isLoggedOut = state.isLoggedIn !== 'true' || state.token === null;

//   const { isLoading: isLoadingConversations, data: conversations } = useConversationsQuery('', {
//     enabled: !isLoggedOut
//   });

//   const conversationsCount = conversations?.length;

//   return (
//     <>
//       {/* larger device(tablet & desktop) for web only */}
//       <Hidden only="base">
//         <AccountLayout>
//           <Heading>{en.chats.heading}</Heading>
//         </AccountLayout>
//       </Hidden>

//       {/* smaller device(mobile phones)for web & mobile app */}
//       <Hidden from="sm">
//         <Container px={0}>
//           {isLoggedOut ? (
//             <LoginCard
//               currentRoute={`/chats`}
//               heading={en.chats.heading}
//               cardTitle={en.chats.noUser}
//             />
//           ) : isLoadingConversations ? (
//             <Box width="100%" height="100%" _web={{ height: '80vh' }}>
//               <LoadingState />
//             </Box>
//           ) : conversationsCount === 0 ? (
//             <GetStarted />
//           ) : (
//             <ChatGroups />
//           )}
//         </Container>
//       </Hidden>
//     </>
//   );
// }
