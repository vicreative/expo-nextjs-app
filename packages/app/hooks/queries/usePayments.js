import api from 'app/services/index';
import e from 'app/constants/endpoints';
import { useQuery } from '@tanstack/react-query';

/**
 * Endpoint to verify payment
 *
 *@returns {Promise<{ data: verifyPayment }>}
 */
export const verifyPayment = async id => {
  const { data } = await api.get(e.VERIFY_PAYMENT(id));
  return data;
};
export const useVerifyPaymentQuery = (id, options = {}) =>
  useQuery({
    queryKey: ['verify-payment', id],
    queryFn: () => verifyPayment(id),
    ...options
  });
