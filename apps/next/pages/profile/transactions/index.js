import React from 'react';
import SeoHead from 'app/components/SeoHead';
import { Box } from 'native-base';
import ProtectedRoute from 'app/components/ProtectedRoute';
import TransactionHistory from 'app/features/Home/components/Profile/TransactionHistory';

export default function TransactionHistoryPage() {
  return (
    <>
      <SeoHead />
      <ProtectedRoute>
        <Box>
          <TransactionHistory />
        </Box>
      </ProtectedRoute>
    </>
  );
}
