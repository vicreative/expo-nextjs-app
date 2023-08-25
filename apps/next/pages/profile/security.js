import React from 'react';
import SeoHead from 'app/components/SeoHead';
import { Box } from 'native-base';
import ProtectedRoute from 'app/components/ProtectedRoute';
import { Security } from 'app/features/Home/components';

export default function AccountPage() {
  return (
    <>
      <SeoHead />
      <ProtectedRoute>
        <Box>
          <Security />
        </Box>
      </ProtectedRoute>
    </>
  );
}
