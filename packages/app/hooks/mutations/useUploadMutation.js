import api from 'app/services/index';
import e from 'app/constants/endpoints';
import { useMutation } from '@tanstack/react-query';
import useToast from 'app/hooks/useToast';

/**
 * Endpoint to initiateUpload
 * @param {object} body
 *
 * @returns {Promise<{ message: string }>}
 */
export const initiateUploadRequest = payload => api.post(e.INITIATE_UPLOAD, payload);

export const useInitiateUploadMutation = () => {
  const toast = useToast();

  const { mutate, ...mutationState } = useMutation({
    mutationFn: initiateUploadRequest
  });

  const initiateUpload = (payload, onSuccess = () => {}, onError = () => {}) => {
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

  return { initiateUpload, initiateUploadState: mutationState };
};
