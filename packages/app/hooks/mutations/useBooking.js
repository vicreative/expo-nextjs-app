import { useMutation } from '@tanstack/react-query';
import api from 'app/services/index';
import e from 'app/constants/endpoints';

/**
 * Endpoint to create booking
 *
 * @param {object} body
 *
 * @returns {Promise<{ message: string }>}
 */
const createBookingRequest = payload => api.post(e.CREATE_BOOKING, payload);
export const useCreateBookingMutation = () => {
  const { mutate, ...mutationState } = useMutation({
    mutationFn: createBookingRequest
  });

  const createBooking = (payload, onSuccess = () => {}, onError = () => {}) => {
    mutate(payload, {
      onSuccess: data => {
        onSuccess(data);
      },
      onError: error => {
        onError(error);
      }
    });
  };

  return { createBooking, createBookingState: mutationState };
};

/**
 * Endpoint to cancel a booking
 *
 * @param {string} id - bookingId
 *
 * @param {object} body
 *
 * @returns {Promise<{ message: string }>}
 */

export const useCancelBookingMutation = id => {
  const cancelBookingRequest = payload => api.patch(e.BOOKINGS(id), payload);

  const { mutate, ...mutationState } = useMutation({
    mutationFn: cancelBookingRequest
  });

  const cancelBooking = (payload, onSuccess = () => {}, onError = () => {}) => {
    mutate(payload, {
      onSuccess: data => {
        onSuccess(data);
      },
      onError: error => {
        onError(error);
      }
    });
  };

  return { cancelBooking, cancelBookingState: mutationState };
};
