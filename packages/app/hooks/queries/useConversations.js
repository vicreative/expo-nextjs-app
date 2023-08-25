import api from 'app/services/index';
import e from 'app/constants/endpoints';
import { useQuery } from '@tanstack/react-query';

/**
 * Endpoint to get conversation
 *
 * @param {string} id - referenceId
 *
 * @returns {Promise<{ data: conversation }>}
 */
const fetchConversation = async (referenceId = '') => {
  const { data } = await api.get(e.CONVERSATIONS(referenceId), 'chat');
  return data;
};
export const useConversationsQuery = (referenceId = '', options = {}) =>
  useQuery({
    queryKey: ['conversations', referenceId],
    queryFn: () => fetchConversation(referenceId),
    ...options
  });

/**
 * Endpoint to get conversation messages
 *
 * @param {string} id - referenceId
 *
 * @returns {Promise<{ data: conversation }>}
 */
const fetchConversationMessages = async (id = '') => {
  const { data } = await api.get(e.CONVERSATION_MESSAGES(id, ''), 'chat');
  return data;
};
export const useConversationMessagesQuery = (id = '', options = {}) =>
  useQuery({
    queryKey: ['conversation-messages', id],
    queryFn: () => fetchConversationMessages(id),
    ...options
  });

/**
 * Endpoint to get conversation participants
 *
 * @param {string} id - conversationId
 *
 * @returns {Promise<{ data: participants }>}
 */
const fetchConversationParticipants = async id => {
  const { data } = await api.get(e.CONVERSATION_PARTICIPANTS(id), 'chat');
  return data;
};
export const useConversationParticipantsQuery = (id, options = {}) =>
  useQuery({
    queryKey: ['conversation-participants', id],
    queryFn: () => fetchConversationParticipants(id),
    ...options
  });

/**
 * Endpoint to generate conversation shares
 *
 * @param {string} id - conversationId
 * @returns {Promise<{data: archivedConversations }>}
 */
const generateConversationShares = async id => {
  const { data } = await api.get(e.GENERATE_CONVERSATION_SHARES(id), 'chat');
  return data;
};
export const useGenerateConversationSharesQuery = (id, options = {}) =>
  useQuery({
    queryKey: ['generate-conversation-shares', id],
    queryFn: () => generateConversationShares(id),
    ...options
  });

/**
 * Endpoint to get details of a shared conversation
 *
 * @param {string} reference - referenceId
 *
 * @returns {Promise<{ data: sharedConversationDetail }>}
 */
const fetchConversationDetails = async reference => {
  const { data } = await api.get(e.SHARED_CONVERSATION(reference), 'chat');
  return data;
};
export const useSharedConversationDetailsQuery = (reference, options = {}) =>
  useQuery({
    queryKey: ['shared-conversation-details', reference],
    queryFn: () => fetchConversationDetails(reference),
    ...options
  });
