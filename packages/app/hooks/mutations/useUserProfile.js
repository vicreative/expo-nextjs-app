import { useMutation } from '@tanstack/react-query';
import api from 'app/services/index';
import e from 'app/constants/endpoints';
import useToast from '../useToast';

/**
 * Endpoint to update user profile
 *
 * @param {object} body
 *
 * @returns {Promise<{ message: string }>}
 */
const updateUserRequest = payload => api.patch(e.UPDATE_PROFILE, payload);

export const useUpdateUserMutation = () => {
  const toast = useToast();

  const { mutate, ...mutationState } = useMutation({
    mutationFn: updateUserRequest
  });

  const updateUser = (payload, onSuccess = () => {}, onError = () => {}) => {
    mutate(payload, {
      onSuccess: data => {
        toast.show({
          message: data.message
        });
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

  return { updateUser, updateUserState: mutationState };
};

/**
 * Endpoint to verify profile
 *
 * @param {object} body
 *
 * @returns {Promise<{ message: string }>}
 */
const verifyProfileRequest = payload => api.post(e.VERIFY_PROFILE, payload);
export const useVerifyProfile = () => {
  const toast = useToast();

  const { mutate, ...mutationState } = useMutation({
    mutationFn: verifyProfileRequest
  });

  const verifyProfile = (payload, onSuccess = () => {}, onError = () => {}) => {
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
  return { verifyProfile, verifyProfileState: mutationState };
};
