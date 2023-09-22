let Config = {
  APP_NAME: 'Expo NextJs App (DEV)',
  APP_SCHEME: 'expo-nextjs-app',
  BUNDLE_IDENTIFIER: 'com.exponext.dev',
  API_URL: process.env.NEXT_PUBLIC_API_URL,
  APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  CLOUD_STORAGE_URL: process.env.NEXT_PUBLIC_CLOUD_STORAGE_URL,
  AWS_ACCESS_KEY_ID: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY,
  AWS_SECRET_ACCESS_KEY: process.env.NEXT_PUBLIC_AWS_ACCESS_SECRET_KEY,
  AWS_S3_BUCKET: process.env.NEXT_PUBLIC_AWS_S3_BUCKET,
  AWS_S3_BUCKET_REGION: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_REGION,
  APP_ENV: process.env.NEXT_PUBLIC_APP_ENV
};

if (process.env.NEXT_PUBLIC_APP_ENV === 'production') {
  Config.APP_NAME = 'Expo NextJs App';
  Config.APP_SCHEME = 'expo-nextjs-app';
  Config.BUNDLE_IDENTIFIER = 'com.exponext.app';
} else if (process.env.NEXT_PUBLIC_APP_ENV === 'staging') {
  Config.APP_NAME = 'Expo NextJs App (STAGING)';
  Config.APP_SCHEME = 'expo-nextjs-app';
  Config.BUNDLE_IDENTIFIER = 'com.exponext.stage';
}

module.exports = {
  ...Config
};
