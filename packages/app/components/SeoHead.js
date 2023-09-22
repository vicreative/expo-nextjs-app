import Head from 'next/head';
import env from 'app/config/env';

export default function SeoHead({
  title = `Expo NextJs App`,
  description = 'A Cross Platform Expo + Next.js application built using Expo Router.',
  openGraphDescription = `A Cross Platform Expo + Next.js application built using Expo Router.`,
  imgUrl = `https=//xperia-bucket.s3.us-west-2.amazonaws.com/assets/images/expitra-opengraph-image-md.png`,
  imgType = 'image/png',
  url = env.APP_URL,
  children
}) {
  return (
    <Head>
      <title>{title}</title>
      <meta data-n-head="ssr" charSet="utf-8" />
      <meta data-n-head="ssr" name="viewport" content="width=device-width,initial-scale=1" />
      <meta name="google-site-verification" content="zggK9G6NNqi7nzSJdtrMMHKpUaSeOVPKMFI9RkJZN7k" />
      <meta name="keywords" content="expo, nextjs" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="msapplication-TileImage" content={imgUrl} />
      <meta data-n-head="ssr" data-hid="description" name="description" content={description} />
      <meta
        data-n-head="ssr"
        data-hid="twitter:card"
        name="twitter:card"
        content="summary_large_image"
      />
      <meta data-n-head="ssr" data-hid="twitter:image" property="twitter:image" content={imgUrl} />
      <meta
        data-n-head="ssr"
        data-hid="twitter:image:alt"
        name="twitter:image:alt"
        content="Logo"
      />
      <meta data-n-head="ssr" data-hid="twitter:title" property="twitter:title" content={title} />
      <meta
        data-n-head="ssr"
        data-hid="twitter:description"
        property="twitter:description"
        content={description}
      />
      <meta data-n-head="ssr" data-hid="twitter:url" property="twitter:url" content={url} />
      <meta property="og:site_name" content="Expo NextJs App" />
      <meta property="og:type" content="website" />
      <meta data-n-head="ssr" data-hid="og:type" name="og:type" content="website" />
      <meta
        data-n-head="ssr"
        data-hid="og:image"
        property="og:image"
        itemProp="image"
        content={imgUrl}
      />
      <meta property="og:image:secure_url" content={imgUrl} />
      <meta data-n-head="ssr" data-hid="og:image:type" property="og:image:type" content={imgType} />
      <meta property="og:image:width" content="700" />
      <meta property="og:image:height" content="300" />
      <meta data-n-head="ssr" data-hid="og:title" property="og:title" content={title} />
      <meta
        data-n-head="ssr"
        data-hid="og:description"
        property="og:description"
        content={openGraphDescription}
      />
      <meta data-n-head="ssr" data-hid="og:url" property="og:url" content={url} />
      <meta property="og:updated_time" content={1677863852157} />
      <meta name="theme-color" content="#222" />
      <link rel="icon" href="/favicon.ico" />
      <link rel="manifest" href="/manifest.json" />
      {children}
    </Head>
  );
}
