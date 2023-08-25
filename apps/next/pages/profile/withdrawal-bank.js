import React from 'react';
import SeoHead from 'app/components/SeoHead';
import { Box } from 'native-base';
import ProtectedRoute from 'app/components/ProtectedRoute';
import WithdrawalBank from 'app/features/Home/components/Profile/WithdrawalBank';

export default function WithdrawalBankPage() {
  return (
    <>
      <SeoHead />
      <ProtectedRoute>
        <Box>
          <WithdrawalBank />
        </Box>
      </ProtectedRoute>
    </>
  );
}
