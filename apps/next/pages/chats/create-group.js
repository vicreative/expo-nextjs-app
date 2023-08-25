import React from 'react';
import SeoHead from 'app/components/SeoHead';
import { Hidden } from 'native-base';
import { NotFound } from 'app/features/index';
// import { CreateGroupChat } from 'app/features/Home/components';
// import ProtectedRoute from 'app/components/ProtectedRoute';
// import { ChatProvider } from 'app/context/ChatContext';

export default function CreateGroupChatPage() {
  return (
    <>
      <SeoHead />
      {/* larger device(tablet & desktop) for web only */}
      <Hidden only="base">
        <NotFound />
      </Hidden>

      {/* smaller device(mobile phones)for web & mobile app */}
      <Hidden from="sm">
        <NotFound />
        {/* <ProtectedRoute>
          <ChatProvider>
            <CreateGroupChat />
          </ChatProvider>
        </ProtectedRoute> */}
      </Hidden>
    </>
  );
}
