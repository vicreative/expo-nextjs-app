import { useMutation } from '@tanstack/react-query';
import api from 'app/services/index';
import e from 'app/constants/endpoints';
import useToast from '../useToast';

/**
 * Endpoint to createConversation
 *
 * @param {object} body
 *
 * @returns {Promise<{ message: string }>}
 */
const createConversationRequest = payload => api.post(e.CONVERSATIONS(''), payload, 'chat');

export const useCreateConversationMutation = () => {
  const toast = useToast();

  const { mutate, ...mutationState } = useMutation({
    mutationFn: createConversationRequest
  });

  const createConversation = (payload, onSuccess = () => {}, onError = () => {}) => {
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

  return { createConversation, createConversationState: mutationState };
};

/**
 * Endpoint to send messages to creator
 *
 * @param {object} body
 *
 * @returns {Promise<{ message: string }>}
 */
const sendCreatorMessageRequest = payload => api.post(e.SEND_CREATOR_MESSAGE, payload, 'chat');

export const useSendCreatorMessageMutation = () => {
  const { mutate, ...mutationState } = useMutation({
    mutationFn: sendCreatorMessageRequest
  });

  const sendMessage = (payload, onSuccess = () => {}, onError = () => {}) => {
    mutate(payload, {
      onSuccess: data => {
        onSuccess(data);
      },
      onError: error => {
        onError(error);
      }
    });
  };

  return { sendMessage, sendMessageState: mutationState };
};

/**
 * Endpoint to respond to shared conversation invite
 *
 * @param {string} reference - conversationReference
 *
 * @param {object} body
 *
 * @returns {Promise<{ message: string }>}
 */

export const useRespondToConversationInviteMutation = (reference, options = {}) => {
  const respondToInviteRequest = payload =>
    api.patch(e.SHARED_CONVERSATION(reference), payload, 'chat');
  const toast = useToast();

  const { mutate, ...mutationState } = useMutation({
    mutationFn: respondToInviteRequest,
    ...options
  });

  const respondToInvite = (payload, onSuccess = () => {}, onError = () => {}) => {
    mutate(payload, {
      onSuccess: data => {
        toast.show({
          message: data.message
        });
        onSuccess(data);
      },
      onError: error => {
        onError(error);
      }
    });
  };

  return { respondToInvite, respondToInviteState: mutationState };
};
