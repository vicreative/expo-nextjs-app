import 'raf/polyfill';
import 'setimmediate';

import React from 'react';
import { Provider } from 'app/provider';
import SeoHead from 'app/components/SeoHead';

import 'app/styles/global.css';
import '@fontsource/dm-sans/400.css';
import '@fontsource/dm-sans/500.css';
import '@fontsource/dm-sans/700.css';
import 'app/styles/dateCalendar.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <SeoHead />
      <Provider>
        <Component {...pageProps} />
      </Provider>
    </>
  );
}

export default MyApp;
