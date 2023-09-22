'use client';

import { NativeBaseProvider } from 'native-base';
import theme from 'app/config/theme';
import { getColorMode, storeColorMode } from 'app/utils/auth';
import useDimensions from 'app/hooks/useDimensions';
import { useEffect, useState } from 'react';
import LoadingState from '../../components/LoadingState';

export default function ThemeProvider({ children }) {
  const [isReady, setIsReady] = useState(false);
  const {
    screen: { height: SCREEN_HEIGHT }
  } = useDimensions();

  useEffect(() => {
    setIsReady(true);
  }, []);

  const colorModeManager = {
    get: async () => {
      try {
        let val = await getColorMode();
        return val === 'dark' ? 'dark' : 'light';
      } catch (e) {
        console.warn(e);
        return 'light';
      }
    },
    set: async value => {
      try {
        await storeColorMode(value);
      } catch (e) {
        console.warn(e);
      }
    }
  };

  if (!isReady) {
    return <LoadingState />;
  }

  return (
    <NativeBaseProvider theme={theme(SCREEN_HEIGHT)} colorModeManager={colorModeManager} isSSR>
      {children}
    </NativeBaseProvider>
  );
}
