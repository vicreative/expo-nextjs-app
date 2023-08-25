import api from 'app/services/index';
import e from 'app/constants/endpoints';
import { useMutation } from '@tanstack/react-query';
import useToast from '../useToast';

/**
 * Endpoint for forgot password request
 *
 * @param {object} body
 *
 * @returns {Promise<{ message: string }>}
 */
const forgotPasswordRequest = payload => api.post(e.FORGOT_PASSWORD, payload);

export const useForgotPasswordMutation = () => {
  const toast = useToast();

  const { mutate, ...mutationState } = useMutation({
    mutationFn: forgotPasswordRequest
  });

  const generateResetToken = (payload, onSuccess = () => {}, onError = () => {}) => {
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

  return { generateResetToken, generateResetTokenState: mutationState };
};

/**
 * Endpoint for update password request
 *
 * @param {object} body
 *
 * @returns {Promise<{ message: string }>}
 */
const updatePasswordRequest = payload => api.post(e.UPDATE_PASSWORD, payload);

export const useUpdatePasswordMutation = () => {
  const toast = useToast();

  const { mutate, ...mutationState } = useMutation({
    mutationFn: updatePasswordRequest
  });

  const updatePassword = (payload, onSuccess = () => {}, onError = () => {}) => {
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

  return { updatePassword, updatePasswordState: mutationState };
};

/**
 * Endpoint to validate reset password token
 *
 * @param {object} body
 *
 * @returns {Promise<{ message: string }>}
 */
const validateResetPasswordToken = payload => api.post(e.VALIDATE_RESET_PASSWORD_TOKEN, payload);

export const useValidateResetPasswordTokenMutation = () => {
  const toast = useToast();

  const { mutate, ...mutationState } = useMutation({
    mutationFn: validateResetPasswordToken
  });

  const validateResetToken = (payload, onSuccess = () => {}, onError = () => {}) => {
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

  return { validateResetToken, validateResetTokenState: mutationState };
};

/**
 * Endpoint to reset password
 *
 * @param {object} body
 *
 * @returns {Promise<{ message: string }>}
 */
const resetPasswordRequest = payload => api.post(e.RESET_PASSWORD, payload);

export const useResetPasswordMutation = () => {
  const toast = useToast();

  const { mutate, ...mutationState } = useMutation({
    mutationFn: resetPasswordRequest
  });

  const resetPassword = (payload, onSuccess = () => {}, onError = () => {}) => {
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

  return { resetPassword, resetPasswordState: mutationState };
};
