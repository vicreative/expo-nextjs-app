const { withExpo } = require('@expo/next-adapter');
const withImages = require('next-images');
const withFonts = require('next-fonts');
const withPlugins = require('next-compose-plugins');
const withTM = require('next-transpile-modules')([
  'react-native-web',
  'react-native-svg',
  'native-base',
  'solito',
  'moti',
  'app',
  'react-native-reanimated',
  'react-native-gesture-handler'
]);

const nextConfig = {
  // reanimated (and thus, Moti) doesn't work with strict mode currently...
  // https://github.com/necolas/react-native-web/pull/2330
  // once that gets fixed, set this back to true
  reactStrictMode: false,
  swcMinify: true,
  experimental: {
    forceSwcTransforms: true,
    swcPlugins: [[require.resolve('./plugins/swc_plugin_reanimated.wasm')]]
  },
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true
  },
  images: {
    disableStaticImages: true,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'xperia-bucket.s3.us-west-2.amazonaws.com',
        port: '',
        pathname: '/assets/**'
      }
    ]
  }
};

const transform = withPlugins([withTM, withFonts, withImages, withExpo]);

module.exports = function (name, { defaultConfig }) {
  return transform(name, {
    ...defaultConfig,
    ...nextConfig
  });
};
