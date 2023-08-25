import React from 'react';
import SeoHead from 'app/components/SeoHead';
import { TripDetails } from 'app/features/Home/components';
import { ExperienceProvider } from 'app/context/ExperienceContext';
import ProtectedRoute from 'app/components/ProtectedRoute';
import { Box } from 'native-base';

export default function TripDetailsPage() {
  return (
    <>
      <SeoHead />
      <ProtectedRoute>
        <ExperienceProvider>
          <Box>
            <TripDetails />
          </Box>
        </ExperienceProvider>
      </ProtectedRoute>
    </>
  );
}
