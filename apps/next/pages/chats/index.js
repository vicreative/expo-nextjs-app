import React from 'react';
import SeoHead from 'app/components/SeoHead';
import { Box, Hidden } from 'native-base';
import BottomTab from 'app/navigation/BottomTab/BottomTab';
import { NotFound } from 'app/features/index';
import useDimensions from 'app/hooks/useDimensions';
import { Chats } from 'app/features/Home/components';
import { ChatProvider } from 'app/context/ChatContext';

export default function ChatsPage() {
  const {
    screen: { height: SCREEN_HEIGHT }
  } = useDimensions();
  return (
    <>
      <SeoHead />
      {/* larger device(tablet & desktop) for web only */}
      <Hidden only="base">
        <NotFound />
      </Hidden>

      {/* smaller device(mobile phones)for web & mobile app */}
      <Hidden from="sm">
        <ChatProvider>
          <Box pb={`${SCREEN_HEIGHT * 0.105}px`} height="100%" width="100%">
            <Chats />
          </Box>
          <BottomTab />
        </ChatProvider>
      </Hidden>
    </>
  );
}
