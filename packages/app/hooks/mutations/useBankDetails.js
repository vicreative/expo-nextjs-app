import { useMutation } from '@tanstack/react-query';
import api from 'app/services/index';
import e from 'app/constants/endpoints';
import useToast from '../useToast';

/**
 * Endpoint to resolve bank details
 *
 * @param {object} body
 *
 * @returns {Promise<{ message: string }>}
 */
const resolveBankDetailsRequest = payload => api.post(e.RESOLVE_ACCOUNT_DETAILS, payload);

export const useResolveBankDetailsMutation = () => {
  const toast = useToast();

  const { mutate, ...mutationState } = useMutation({
    mutationFn: resolveBankDetailsRequest
  });

  const resolveBankDetails = (payload, onSuccess = () => {}, onError = () => {}) => {
    mutate(payload, {
      onSuccess: data => {
        onSuccess(data);
      },
      onError: error => {
        toast.show({
          message: error.message,
          error: true
        });
        onError(error);
      }
    });
  };

  return { resolveBankDetails, resolveBankDetailsState: mutationState };
};

/**
 * Endpoint to add beneficiary
 *
 * @param {object} body
 * @param {object} id
 *
 * @returns {Promise<{ message: string }>}
 */
export const useAddBeneficiaryMutation = (id = '') => {
  const addBeneficiaryRequest = payload => api.post(e.ACCOUNT_DETAILS(id), payload);
  const toast = useToast();

  const { mutate, ...mutationState } = useMutation({
    mutationFn: addBeneficiaryRequest
  });

  const addBeneficiary = (payload, onSuccess = () => {}, onError = () => {}) => {
    mutate(payload, {
      onSuccess: data => {
        onSuccess(data);
        toast.show({
          message: data.message
        });
      },
      onError: error => {
        onError(error);
      }
    });
  };

  return { addBeneficiary, addBeneficiaryState: mutationState };
};

/**
 * Endpoint to delete beneficiary
 *
 * @param {object} id
 *
 * @returns {Promise<{ message: string }>}
 */
export const useDeleteBeneficiaryMutation = (id, options = {}) => {
  const deleteBeneficiaryRequest = () => api.remove(e.ACCOUNT_DETAILS(id));

  const { mutate, ...mutationState } = useMutation({
    mutationFn: deleteBeneficiaryRequest,
    ...options
  });

  return { deleteBeneficiary: mutate, deleteBeneficiaryState: mutationState };
};
