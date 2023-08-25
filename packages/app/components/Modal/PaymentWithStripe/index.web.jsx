import SuccessState from 'app/components/SuccessState';

export default function PaymentWithStripe({ payload }) {
  return (
    <SuccessState
      title={payload.success.title}
      text={payload.success.text}
      btnText={payload.success.btnText}
      onDismiss={payload.success.onDismiss}
      size={payload.success.size}
    />
  );
}
