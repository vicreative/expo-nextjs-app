import 'raf/polyfill';
import 'setimmediate';

import React from 'react';
import { Provider } from 'app/provider';
import SeoHead from 'app/components/SeoHead';
import Script from 'next/script';

import 'app/styles/global.css';
import '@fontsource/dm-sans/400.css';
import '@fontsource/dm-sans/500.css';
import '@fontsource/dm-sans/700.css';
import 'app/styles/dateCalendar.css';
import env from 'app/config/env';
// import QrCodeCard from 'app/components/Cards/QrCodeCard';    TODO: UNCOMMENT THIS WHEN WE'VE LAUNCHED THE MOBILE APP

function MyApp({ Component, pageProps }) {
  // let showBanner;      TODO: UNCOMMENT THIS WHEN WE'VE LAUNCHED THE MOBILE APP
  // if (typeof window !== 'undefined') {
  //   const { innerWidth } = window;
  //   if (innerWidth < 600) {
  //     showBanner = true;
  //   } else {
  //     showBanner = false;
  //   }
  // }

  return (
    <>
      <SeoHead
        title={pageProps?.title && pageProps?.title}
        openGraphDescription={pageProps?.openGraphDescription && pageProps?.openGraphDescription}
        description={pageProps?.description && pageProps?.description}
        url={pageProps?.url && pageProps?.url}
        imgUrl={pageProps?.imgUrl && pageProps?.imgUrl}
        imgType={pageProps?.imgType && pageProps?.imgType}
      />

      {env.APP_ENV === 'production' && (
        <>
          {/* Global Site Tag (gtag.js) - Google Analytics */}
          <Script src="https://www.googletagmanager.com/gtag/js?id=G-8QBST998MK" />
          <Script
            id="gtag-init"
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-8QBST998MK');`
            }}
          />
          {/* Hotjar Tracking Code for expitra  */}
          <Script
            id="hotjar-tracking"
            dangerouslySetInnerHTML={{
              __html: `(function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:3307548,hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
        })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`
            }}
          />
          {/* Heap-analytics  */}
          <Script
            id="heap-analytics"
            dangerouslySetInnerHTML={{
              __html: `window.heap=window.heap||[],heap.load=function(e,t){window.heap.appid=e,window.heap.config=t=t||{};var r=document.createElement("script");r.type="text/javascript",r.async=!0,r.src="https://cdn.heapanalytics.com/js/heap-"+e+".js";var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(r,a);for(var n=function(e){return function(){heap.push([e].concat(Array.prototype.slice.call(arguments,0)))}},p=["addEventProperties","addUserProperties","clearEventProperties","identify","resetIdentity","removeEventProperty","setEventProperties","track","unsetEventProperty"],o=0;o<p.length;o++)heap[p[o]]=n(p[o])};
        heap.load("657268928");`
            }}
          />
        </>
      )}

      {/* AppsFlyer smart banner  */}
      {/* {showBanner && (  TODO: UNCOMMENT THIS WHEN WE'VE LAUNCHED THE MOBILE APP
        <Script
          id="show-banner"
          dangerouslySetInnerHTML={{
            __html: `!function(t,e,n,s,a,c,i,o,p){t.AppsFlyerSdkObject=a,t.AF=t.AF||function(){
            (t.AF.q=t.AF.q||[]).push([Date.now()].concat(Array.prototype.slice.call(arguments)))},
            t.AF.id=t.AF.id||i,t.AF.plugins={},o=e.createElement(n),p=e.getElementsByTagName(n)[0],o.async=1,
            o.src="https://websdk.appsflyer.com?"+(c.length>0?"st="+c.split(",").sort().join(",")+"&":"")+(i.length>0?"af_id="+i:""),
            p.parentNode.insertBefore(o,p)}(window,document,"script",0,"AF", "pba,banners",{pba: {webAppId: "DzjwwChmFkEpC7Q2byP6YG"}, banners: {key: "6017c86e-d5e1-42e6-a9ee-9994e4db4b50"}});
            AF('banners', 'showBanner');`
          }}
        />
      )} */}
      {/*  AppsFlyer onelink smart qr-code script  */}
      {/* <Script type="text/javascript" src="/scripts/onelink-smart-script.js" />   TODO: UNCOMMENT THIS WHEN WE'VE LAUNCHED THE MOBILE APP*/}

      <Provider>
        <Component {...pageProps} />
        {/* {!showBanner && <QrCodeCard />}   TODO: UNCOMMENT THIS WHEN WE'VE LAUNCHED THE MOBILE APP */}
      </Provider>
    </>
  );
}

export default MyApp;
