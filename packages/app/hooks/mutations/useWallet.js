import api from 'app/services/index';
import e from 'app/constants/endpoints';
import { useMutation } from '@tanstack/react-query';

/**
 * Endpoint to refill wallet
 *
 * @param {object} body
 *
 * @returns {Promise<{ message: string }>}
 */
const refillWalletRequest = payload => api.post(e.REFILL_WALLET, payload);
export const useRefillWalletMutation = () => {
  const { mutate, ...mutationState } = useMutation({
    mutationFn: refillWalletRequest
  });

  const refillWallet = (payload, onSuccess = () => {}, onError = () => {}) => {
    mutate(payload, {
      onSuccess: data => {
        onSuccess(data);
      },
      onError: error => {
        onError(error);
      }
    });
  };

  return { refillWallet, refillWalletState: mutationState };
};

/**
 * Endpoint to refill wallet
 *
 * @param {object} body
 *
 * @returns {Promise<{ message: string }>}
 */
const withdrawRequest = payload => api.post(e.WITHDRAW, payload);
export const useWithdrawMutation = () => {
  const { mutate, ...mutationState } = useMutation({
    mutationFn: withdrawRequest
  });

  const withdraw = (payload, onSuccess = () => {}, onError = () => {}) => {
    mutate(payload, {
      onSuccess: data => {
        onSuccess(data);
      },
      onError: error => {
        onError(error);
      }
    });
  };

  return { withdraw, withdrawState: mutationState };
};
