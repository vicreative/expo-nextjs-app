import React from 'react';
import { ExperienceDetails } from 'app/features/Home/components';
import { ExperienceProvider } from 'app/context/ExperienceContext';
import env from 'app/config/env';
import e from 'app/constants/endpoints';
import { resolveFileUrl } from 'app/utils/index';
import axios from 'axios';
import SeoHead from 'app/components/SeoHead';

export default function ExperienceDetailsPage() {
  return (
    <>
      <SeoHead />
      <ExperienceProvider>
        <ExperienceDetails />
      </ExperienceProvider>
    </>
  );
}

export const getServerSideProps = async context => {
  const { params } = context;

  try {
    const { data } = await axios.get(`${env.API_URL}${e.EXPERIENCE(params.id)}`);

    // If the API response status is 404, return a custom 404 page
    if (data.status === 404) {
      return {
        notFound: true
      };
    }

    return {
      props: {
        title: `${data?.data?.title} - Expitra`,
        openGraphDescription: `${data?.data?.address} - ${data?.data?.description}`,
        description: `${data?.data?.address} - ${data?.data?.description}`,
        url: `${env.APP_URL}/experiences/${params.id}`,
        imgUrl: resolveFileUrl(data?.data?.coverMediaPath),
        imgType: data?.data?.coverMediaType
      }
    };
  } catch (error) {
    console.error('API request error:', error);
    return {
      notFound: true
    };
  }
};
