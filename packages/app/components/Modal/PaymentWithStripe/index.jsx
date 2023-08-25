import { useStripe } from '@stripe/stripe-react-native';
import ErrorState from 'app/components/ErrorState';
import SuccessState from 'app/components/SuccessState';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';

export default function PaymentWithStripe({
  payload,
  returnUrl,
  onClose = () => {},
  onCancel = () => {}
}) {
  const [modalToShow, setModalToShow] = useState('');
  const [stripeErrorMessage, setStripeErrorMessage] = useState('');

  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  useEffect(() => {
    initializePayment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initializePayment = async () => {
    try {
      await initPaymentSheet({
        merchantDisplayName: 'Expitra, Inc.',
        customerId: payload?.customer,
        customerEphemeralKeySecret: payload?.ephemeralKey,
        paymentIntentClientSecret: payload?.paymentIntent,
        // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
        //methods that complete payment after a delay, like SEPA Debit and Sofort.
        allowsDelayedPaymentMethods: true,
        returnURL: returnUrl
      });
    } catch (e) {
      console.warn(e);
    } finally {
      const { error } = await presentPaymentSheet();

      if (error) {
        if (error.code === 'Canceled') {
          Alert.alert(`${error.code}`, error.message);
          onCancel();
          setModalToShow('');
        } else {
          setStripeErrorMessage(error.message);
          onClose();
          setModalToShow('stripe-error');
        }
      } else {
        onClose();
        setModalToShow('stripe-success');
      }
    }
  };

  return (
    <>
      {modalToShow === 'stripe-success' && (
        <SuccessState
          title={payload.success.title}
          text={payload.success.text}
          btnText={payload.success.btnText}
          onDismiss={payload.success.onDismiss}
          size={payload.success.size}
        />
      )}

      {modalToShow === 'stripe-error' && (
        <ErrorState
          title={payload.error.title}
          text={stripeErrorMessage}
          btnText={payload.error.btnText}
          onDismiss={payload.error.onDismiss}
          size={payload.success.size}
        />
      )}
    </>
  );
}
