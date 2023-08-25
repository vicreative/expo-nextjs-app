import env from 'app/config/env';
import { useVerifyPaymentQuery } from 'app/hooks/queries/usePayments';
import React, { useEffect, useState } from 'react';
import SuccessState from '../../SuccessState';
import ErrorState from '../../ErrorState';
import LoadingState from '../../LoadingState';
import { usePaystackPayment } from 'react-paystack';

export default function PaystackModal({ payload }) {
  const [status, setStatus] = useState('idle');

  const amountToPay = (payload.amount * 100).toFixed(2);

  const config = {
    reference: payload.reference,
    email: payload.email,
    amount: String(amountToPay), //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
    publicKey: env.PAYSTACK_PUBLIC_KEY
  };

  const initializePayment = usePaystackPayment(config);

  const { data, error, isLoading, isSuccess, isError } = useVerifyPaymentQuery(payload.reference, {
    enabled: status === 'success'
  });

  const onSuccess = reference => {
    setStatus(reference.status);
  };

  const onClose = () => {
    payload.onDismiss();
  };

  useEffect(() => {
    if (status === 'idle') {
      initializePayment(onSuccess, onClose);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, initializePayment]);

  return (
    <>
      {status === 'success' && isLoading ? (
        <LoadingState hasOpaqueBackground />
      ) : isSuccess && data?.status === 'success' ? (
        <SuccessState
          title={payload.success.title}
          text={payload.success.text}
          btnText={payload.success.btnText}
          onDismiss={payload.success.onDismiss}
          size={payload.success.size}
        />
      ) : isError || data?.status === 'failure' ? (
        <ErrorState
          title={payload.error.title}
          text={data?.status === 'failure' ? data?.failureReason : error.message}
          btnText={payload.error.btnText}
          onDismiss={payload.error.onDismiss}
          size={payload.success.size}
        />
      ) : null}
    </>
  );
}
