import { useMutation } from '@tanstack/react-query';
import api from 'app/services/index';
import e from 'app/constants/endpoints';
import { storeAuthToken, storeLoginIdentifier } from 'app/utils/auth';
import useToast from '../useToast';

/**
 * Endpoint to login
 *
 * @param {object} body
 *
 * @returns {Promise<{ message: string }>}
 */
const loginRequest = payload => api.post(e.LOGIN, payload);

export default function useLogin() {
  const toast = useToast();

  const { mutate, ...mutationState } = useMutation({ mutationFn: loginRequest });

  const login = (payload, onSuccess = () => {}, onError = () => {}) => {
    mutate(payload, {
      onSuccess: data => {
        storeAuthToken(data.data.accessToken);
        storeLoginIdentifier('true');
        toast.show({
          message: data.message
        });
        onSuccess(data);
      },
      onError: error => {
        toast.show({
          message:
            error.statusCode === 401 ? `Your email and password do not match!` : error.message,
          error: true
        });
        onError(error);
      }
    });
  };

  return { login, loginState: mutationState };
}
