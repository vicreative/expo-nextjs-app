import React from 'react';
import SeoHead from 'app/components/SeoHead';
import { Box, Hidden } from 'native-base';
import BottomTab from 'app/navigation/BottomTab/BottomTab';
import { Trips } from 'app/features/Home/components';
import ProtectedRoute from 'app/components/ProtectedRoute';
import useDimensions from 'app/hooks/useDimensions';

export default function TripsPage() {
  const {
    screen: { height: SCREEN_HEIGHT }
  } = useDimensions();
  return (
    <>
      <SeoHead />
      {/* larger device(tablet & desktop) for web only */}
      <Hidden only="base">
        <ProtectedRoute>
          <Box>
            <Trips />
          </Box>
        </ProtectedRoute>
      </Hidden>

      {/* smaller device(mobile phones)for web & mobile app */}
      <Hidden from="sm">
        <Box pb={`${SCREEN_HEIGHT * 0.105}px`} height="100%" width="100%">
          <Trips />
        </Box>
        <BottomTab />
      </Hidden>
    </>
  );
}
