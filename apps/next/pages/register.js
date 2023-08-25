import React from 'react';
import Registration from 'app/features/Registration/index';
import SeoHead from 'app/components/SeoHead';
import en from 'app/i18n/index';

export default function RegisterPage() {
  return (
    <>
      <SeoHead />
      <SeoHead title={en.register.seo.title} />
      <Registration />
    </>
  );
}
