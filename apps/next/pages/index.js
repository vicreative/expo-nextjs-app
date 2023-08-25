import SeoHead from 'app/components/SeoHead';
import React from 'react';
import Experiences from 'app/features/Home/components/Explore/Experiences';

import en from 'app/i18n/index';
import { Box, Hidden } from 'native-base';
import BottomTab from 'app/navigation/BottomTab/BottomTab';
import { Explore } from 'app/features/Home/components';
import useDimensions from 'app/hooks/useDimensions';

export default function Home() {
  const {
    screen: { height: SCREEN_HEIGHT }
  } = useDimensions();

  return (
    <>
      <SeoHead
        title={en.experiences.seo.title}
        openGraphDescription={en.experiences.seo.openGraphDescription}
        description={en.experiences.seo.description}
      />
      {/* larger device(tablet & desktop) for web only */}
      <Hidden only="base">
        <Experiences />
      </Hidden>
      {/* smaller device(mobile phones)for web & mobile app */}
      <Hidden from="sm">
        <Box pb={`${SCREEN_HEIGHT * 0.105}px`} height="100%" width="100%">
          <Explore />
        </Box>
        <BottomTab />
      </Hidden>
    </>
  );
}
