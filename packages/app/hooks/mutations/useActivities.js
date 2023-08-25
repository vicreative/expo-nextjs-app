import api from 'app/services/index';
import e from 'app/constants/endpoints';
import { useMutation } from '@tanstack/react-query';

/**
 * Endpoint to update activities read receipt
 *
 *
 * @returns {Promise<{ message: string }>}
 */
export const useUpdateActivitiesReadReceiptMutation = (options = {}) => {
  const updateActivitiesReadReceipt = payload =>
    api.patch(e.UPDATE_ACTIVITIES_READ_RECEIPT, payload);

  const { mutate, ...mutationState } = useMutation({
    mutationFn: updateActivitiesReadReceipt,
    ...options
  });

  const updateReadReceipt = (payload, onSuccess = () => {}, onError = () => {}) => {
    mutate(payload, {
      onSuccess: data => {
        onSuccess(data);
      },
      onError: error => {
        onError(error);
      }
    });
  };

  return { updateReadReceipt, updateReadReceiptState: mutationState };
};
