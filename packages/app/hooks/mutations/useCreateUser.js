import api from 'app/services/index';
import e from 'app/constants/endpoints';
import { useMutation } from '@tanstack/react-query';
import useToast from '../useToast';
import { storeAuthToken, storeLoginIdentifier } from 'app/utils/auth';

/**
 * Endpoint to create user
 *
 * @param {object} body
 *
 * @returns {Promise<{ message: string }>}
 */
const createUserRequest = payload => api.post(e.CREATE_USER, payload);

export const useCreateUserMutation = () => {
  const toast = useToast();

  const { mutate, ...mutationState } = useMutation({
    mutationFn: createUserRequest
  });

  const createUser = (payload, onSuccess = () => {}, onError = () => {}) => {
    mutate(payload, {
      onSuccess: data => {
        storeAuthToken(data.data.token);
        storeLoginIdentifier('true');
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

  return { createUser, createUserState: mutationState };
};

/**
 * Endpoint to generate token for number
 *
 * @param {object} body
 *
 * @returns {Promise<{ message: string }>}
 */
const generateTokenForNumberRequest = payload => api.post(e.GENERATE_TOKEN_FOR_NUMBER, payload);

export const useGenerateTokenMutation = () => {
  const toast = useToast();

  const { mutate, ...mutationState } = useMutation({
    mutationFn: generateTokenForNumberRequest
  });

  const generateToken = (payload, onSuccess = () => {}, onError = () => {}) => {
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

  return { generateToken, generateTokenState: mutationState };
};

/**
 * Endpoint to  validate token
 *
 * @param {object} body
 *
 * @returns {Promise<{ message: string }>}
 */
const validateTokenRequest = payload => api.post(e.VALIDATE_TOKEN, payload);

export const useValidateTokenMutation = () => {
  const toast = useToast();

  const { mutate, ...mutationState } = useMutation({
    mutationFn: validateTokenRequest
  });

  const validateToken = (payload, onSuccess = () => {}, onError = () => {}) => {
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

  return { validateToken, validateTokenState: mutationState };
};
