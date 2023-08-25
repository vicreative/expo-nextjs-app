import api from 'app/services/index';
import e from 'app/constants/endpoints';
import { useQuery } from '@tanstack/react-query';

/**
 * Endpoint to verify payment
 *
 *@returns {Promise<{ data: verifyPayment }>}
 */
export const fetchBookingCancellationDetails = async id => {
  const { data } = await api.get(e.GET_BOOKING_CANCELLATION_DETAILS(id));
  return data;
};
export const useBookingCancellationDetails = (id, options = {}) =>
  useQuery({
    queryKey: ['cancellation-details', id],
    queryFn: () => fetchBookingCancellationDetails(id),
    ...options
  });
