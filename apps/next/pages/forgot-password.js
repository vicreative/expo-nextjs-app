import React from 'react';
import SeoHead from 'app/components/SeoHead';
import ForgotPassword from 'app/features/ForgotPassword';
import en from 'app/i18n/index';

export default function ForgotPasswordPage() {
  return (
    <>
      <SeoHead title={en.forgotPassword.seo.title} />
      <ForgotPassword />
    </>
  );
}
