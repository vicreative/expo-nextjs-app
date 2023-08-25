let Config = {
  APP_NAME: 'Expitra (DEV)',
  API_URL: process.env.NEXT_PUBLIC_API_URL,
  CHAT_API_URL: process.env.NEXT_PUBLIC_CHAT_API_URL,
  APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  WEBSITE_URL: process.env.NEXT_PUBLIC_WEBSITE_URL,
  PAYSTACK_PUBLIC_KEY: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
  CLOUD_STORAGE_URL: process.env.NEXT_PUBLIC_CLOUD_STORAGE_URL,
  AWS_ACCESS_KEY_ID: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY,
  AWS_SECRET_ACCESS_KEY: process.env.NEXT_PUBLIC_AWS_ACCESS_SECRET_KEY,
  AWS_S3_BUCKET: process.env.NEXT_PUBLIC_AWS_S3_BUCKET,
  AWS_S3_BUCKET_REGION: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_REGION,
  APPLE_TEAM_ID: process.env.NEXT_PUBLIC_APPLE_TEAM_ID,
  APP_SCHEME: 'expitradev',
  APP_ENV: process.env.NEXT_PUBLIC_APP_ENV,
  APPLE_ID: process.env.NEXT_PUBLIC_APPLE_ID,
  EXPITRA_ACCESS_TOKEN: process.env.NEXT_PUBLIC_EXPITRA_ACCESS_TOKEN,
  APP_FLYER_DEV_KEY: process.env.NEXT_PUBLIC_APP_FLYER_DEV_KEY,
  STRIPE_PUBLIC_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY,
  APP_FLYER_TEMPLATE_ID: 'qyHH',
  MERCHANT_ID: 'merchant.com.expitra',
  BUNDLE_IDENTIFIER: 'com.expitra.dev'
};

if (process.env.NEXT_PUBLIC_APP_ENV === 'production') {
  Config.APP_NAME = 'Expitra';
  Config.APP_SCHEME = 'expitra';
  Config.APP_FLYER_TEMPLATE_ID = '42Yx';
  Config.BUNDLE_IDENTIFIER = 'com.expitra.expitra';
} else if (process.env.NEXT_PUBLIC_APP_ENV === 'staging') {
  Config.APP_NAME = 'Expitra (STAGING)';
  Config.APP_SCHEME = 'expitrastage';
  Config.APP_FLYER_TEMPLATE_ID = 'KPCq';
  Config.BUNDLE_IDENTIFIER = 'com.expitra.stage';
}

module.exports = {
  ...Config
};
