'use client';

import { NativeBaseProvider } from 'native-base';
import theme from 'app/config/theme';
import { getColorMode, storeColorMode } from 'app/utils/auth';
import useDimensions from 'app/hooks/useDimensions';

export default function ThemeProvider({ children }) {
  const {
    screen: { height: SCREEN_HEIGHT }
  } = useDimensions();

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

  return (
    <NativeBaseProvider theme={theme(SCREEN_HEIGHT)} colorModeManager={colorModeManager}>
      {children}
    </NativeBaseProvider>
  );
}
