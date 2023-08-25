import React from 'react';
import SeoHead from 'app/components/SeoHead';
import en from 'app/i18n/index';
import Login from 'app/features/Login';

export default function LoginPage() {
  return (
    <>
      <SeoHead title={en.login.seo.title} />
      <Login />
    </>
  );
}
