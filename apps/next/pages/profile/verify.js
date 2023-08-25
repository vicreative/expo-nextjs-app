import React from 'react';
import SeoHead from 'app/components/SeoHead';
import { VerifyProfile } from 'app/features/Home/components';
import ProtectedRoute from 'app/components/ProtectedRoute';

export default function VerifyProfilePage() {
  return (
    <>
      <SeoHead />
      <ProtectedRoute>
        <VerifyProfile />
      </ProtectedRoute>
    </>
  );
}
