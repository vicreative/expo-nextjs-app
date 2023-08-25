import React from 'react';
import SeoHead from 'app/components/SeoHead';
import en from 'app/i18n/index';
import { Experiences } from 'app/features/Home/components';

export default function ExperiencesPage() {
  return (
    <>
      <SeoHead
        title={en.experiences.seo.title}
        openGraphDescription={en.experiences.seo.openGraphDescription}
        description={en.experiences.seo.description}
      />
      <Experiences />
    </>
  );
}
