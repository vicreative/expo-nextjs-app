import api from 'app/services/index';
import e from 'app/constants/endpoints';
import { useQuery, useInfiniteQuery } from '@tanstack/react-query';

/**
 * Endpoint to get user profile
 *
 * @returns {Promise<{data: user }>}
 */
const fetchUser = async () => {
  const { data } = await api.get(e.PROFILE);
  return data;
};
export const useUserQuery = (options = {}) =>
  useQuery({ queryKey: ['profile'], queryFn: () => fetchUser(), ...options });

/**
 * Endpoint to get user wallet
 *
 * @returns {Promise<{ data: wallet }>}
 */
const fetchWallet = async () => {
  const { data } = await api.get(e.GET_USER_WALLET);
  return data;
};
export const useUserWalletQuery = (options = {}) =>
  useQuery({ queryKey: ['wallet'], queryFn: () => fetchWallet(), ...options });

/**
 * Endpoint to get user bookings
 *
 * @returns {Promise<{ data: bookings }>}
 */
const fetchBookings = async () => {
  const { data } = await api.get(e.GET_USER_BOOKINGS);
  return data;
};
export const useUserBookingsQuery = (options = {}) =>
  useQuery({
    queryKey: ['bookings'],
    queryFn: () => fetchBookings(),
    ...options
  });

/**
 * Endpoint to get user tickets
 *
 * @returns {Promise<{ data: tickets }>}
 */
export const useUserTicketsQuery = (query, options) => {
  const fetchTickets = async ({ pageParam = 1, limit = 9 }) => {
    const { data } = await api.get(
      `${e.GET_USER_TICKETS('')}?page=${pageParam}&limit=${limit}${query}`
    );
    const totalPages = Math.ceil(data.count / limit);

    return { ...data, nextPage: pageParam, totalPages: totalPages };
  };
  return useInfiniteQuery(['tickets', query], fetchTickets, {
    getNextPageParam: lastPage => {
      if (lastPage.nextPage < lastPage.totalPages) return lastPage.nextPage + 1;
      return undefined;
    },
    keepPreviousData: false,
    ...options
  });
};

/**
 * Endpoint to get ticket details
 *
 * @returns {Promise<{data: ticket }>}
 */
const fetchTicket = async id => {
  const { data } = await api.get(e.GET_USER_TICKETS(id));
  return data;
};
export const useTicketQuery = (id = '', options = {}) =>
  useQuery({
    queryKey: ['ticket', id],
    queryFn: () => fetchTicket(id),
    ...options
  });

/**
 * Endpoint to get user conversation invitations
 *
 * @returns {Promise<{ data: conversationInvitations }>}
 */
const fetchConversationInvitations = async () => {
  const { data } = await api.get(e.GET_USER_CONVERSATION_INVITATIONS);
  return data;
};
export const useUserConversationInvitationsQuery = (options = {}) =>
  useQuery({
    queryKey: ['user-conversation-invitations'],
    queryFn: () => fetchConversationInvitations(),
    ...options
  });

/**
 * Endpoint to get paginated experiences
 *
 * @param {number} pageParam
 * @param {number} limit
 *
 * @returns {Promise<{ data: experiences }>}
 */
const fetchTransactionsRequest = async (pageParam, limit, query) => {
  const { data } = await api.get(
    `${e.GET_USER_TRANSACTIONS}?page=${pageParam}&limit=${limit}${query}`
  );
  const totalPages = Math.ceil(data.count / limit);
  return {
    ...data,
    currentPage: pageParam,
    nextPage: pageParam === totalPages ? pageParam : pageParam + 1,
    prevPage: pageParam - 1,
    totalPages: totalPages
  };
};
export const useUserTransactionsTableQuery = (pageParam = 1, limit = 10, query = '', options) =>
  useInfiniteQuery({
    queryKey: ['user-transactions', pageParam, limit, query],
    queryFn: () => fetchTransactionsRequest(pageParam, limit, query),
    getNextPageParam: lastPage => {
      if (lastPage.nextPage <= lastPage.totalPages && lastPage.nextPage !== lastPage.currentPage)
        return pageParam;

      return false;
    },
    getPreviousPageParam: firstPage => {
      if (firstPage.prevPage >= 1 && firstPage.prevPage <= firstPage.totalPages) return pageParam;
      return false;
    },
    keepPreviousData: true,
    ...options
  });

/**
 * Endpoint to get transaction details
 *
 * @returns {Promise<{data: transaction }>}
 */
const fetchTransaction = async id => {
  const { data } = await api.get(e.TRANSACTIONS(id));
  return data;
};
export const useTransactionQuery = (id = '', options = {}) =>
  useQuery({
    queryKey: ['transaction', id],
    queryFn: () => fetchTransaction(id),
    ...options
  });

/**
 * Endpoint to get user activities
 *
 * @returns {Promise<{ data: tickets }>}
 */
const fetchActivities = async ({ pageParam = 1, limit = 10 }) => {
  const { data } = await api.get(`${e.GET_USER_ACTIVITIES}?page=${pageParam}&limit=${limit}`);
  const totalPages = Math.ceil(data.count / limit);

  return { ...data, nextPage: pageParam, totalPages: totalPages };
};
export const useUserActivitiesQuery = options =>
  useInfiniteQuery(['user-activities'], fetchActivities, {
    getNextPageParam: lastPage => {
      if (lastPage.nextPage < lastPage.totalPages) return lastPage.nextPage + 1;
      return undefined;
    },
    keepPreviousData: true,
    ...options
  });

/**
 * Endpoint to get user currencyInfo
 *
 * @returns {Promise<{data: userCurrencyInformation }>}
 */
const fetchUserCurrencyInfo = async () => {
  const { data } = await api.get(e.GET_USER_CURRENCY_INFO);
  return data;
};
export const useUserCurrencyInfoQuery = (options = {}) =>
  useQuery({
    queryKey: ['user-currency-info'],
    queryFn: () => fetchUserCurrencyInfo(),
    ...options
  });
