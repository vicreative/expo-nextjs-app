import React from 'react';
import SeoHead from 'app/components/SeoHead';
import { Box } from 'native-base';
import { AccountSettings } from 'app/features/Home/components';
import ProtectedRoute from 'app/components/ProtectedRoute';

export default function AccountPage() {
  return (
    <>
      <SeoHead />
      <ProtectedRoute>
        <Box>
          <AccountSettings />
        </Box>
      </ProtectedRoute>
    </>
  );
}
