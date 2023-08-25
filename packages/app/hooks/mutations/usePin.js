import { useMutation } from '@tanstack/react-query';
import api from 'app/services/index';
import e from 'app/constants/endpoints';
import useToast from 'app/hooks/useToast';

/**
 * Endpoint to createPin
 *
 * @param {object} body
 *
 * @returns {Promise<{ message: string }>}
 */
const createPinRequest = payload => api.post(e.CREATE_PIN, payload);
export const useCreatePinMutation = () => {
  const { mutate, ...mutationState } = useMutation({
    mutationFn: createPinRequest
  });

  const createPin = (payload, onSuccess = () => {}, onError = () => {}) => {
    mutate(payload, {
      onSuccess: data => {
        onSuccess(data);
      },
      onError: error => {
        onError(error);
      }
    });
  };

  return { createPin, createPinState: mutationState };
};

/**
 * Update pin endpoint
 *
 * @param {object} body
 *
 * @returns {Promise<{ message: string }>}
 */
const updatePinRequest = payload => api.post(e.UPDATE_PIN, payload);
export const useUpdatePinMutation = () => {
  const { mutate, ...mutationState } = useMutation({
    mutationFn: updatePinRequest
  });

  const updatePin = (payload, onSuccess = () => {}, onError = () => {}) => {
    mutate(payload, {
      onSuccess: data => {
        onSuccess(data);
      },
      onError: error => {
        onError(error);
      }
    });
  };

  return { updatePin, updatePinState: mutationState };
};

/**
 * Forgot pin endpoint
 *
 * @param {object} body
 *
 * @returns {Promise<{ message: string }>}
 */
const forgotPinRequest = payload => api.post(e.FORGOT_PIN, payload);
export const useForgotPinMutation = () => {
  const toast = useToast();
  const { mutate, ...mutationState } = useMutation({
    mutationFn: forgotPinRequest
  });

  const forgotPin = (payload, onSuccess = () => {}, onError = () => {}) => {
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

  return { forgotPin, forgotPinState: mutationState };
};

/**
 * Endpoint to validate reset pin token
 *
 * @param {object} body
 *
 * @returns {Promise<{ message: string }>}
 */
const validateResetPinRequest = payload => api.post(e.VALIDATE_RESET_PIN_TOKEN, payload);
export const useValidateResetPinMutation = () => {
  const { mutate, ...mutationState } = useMutation({
    mutationFn: validateResetPinRequest
  });

  const validateResetPin = (payload, onSuccess = () => {}, onError = () => {}) => {
    mutate(payload, {
      onSuccess: data => {
        onSuccess(data);
      },
      onError: error => {
        onError(error);
      }
    });
  };

  return { validateResetPin, validateResetPinState: mutationState };
};

/**
 * Endpoint to process pin reset
 *
 * @param {object} body
 *
 * @returns {Promise<{ message: string }>}
 */
const processPinResetRequest = payload => api.post(e.PROCESS_PIN_RESET, payload);
export const useProcessPinResetMutation = () => {
  const { mutate, ...mutationState } = useMutation({
    mutationFn: processPinResetRequest
  });

  const processPinReset = (payload, onSuccess = () => {}, onError = () => {}) => {
    mutate(payload, {
      onSuccess: data => {
        onSuccess(data);
      },
      onError: error => {
        onError(error);
      }
    });
  };

  return { processPinReset, processPinResetState: mutationState };
};
