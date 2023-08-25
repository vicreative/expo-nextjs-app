import api from 'app/services/index';
import e from 'app/constants/endpoints';
import { useQuery } from '@tanstack/react-query';

/**
 * Endpoint to get bankList
 *
 * @returns {Promise<{data: bankList }>}
 */
const fetchBanks = async () => {
  const { data } = await api.get(e.REQUEST_BANK_LIST);
  return data;
};
const useBanksQuery = (options = {}) =>
  useQuery({ queryKey: ['banks'], queryFn: fetchBanks, ...options });
export default useBanksQuery;

/**
 * Endpoint to get beneficiaries
 *
 * @param {object} id
 * @returns {Promise<{data: beneficiaries }>}
 *
 */
const requestBeneficiaries = async ({ id = '' }) => {
  const { data } = await api.get(e.ACCOUNT_DETAILS(id));
  return data;
};
export const useBeneficiariesQuery = (options = {}) =>
  useQuery({
    queryKey: ['beneficiaries'],
    queryFn: requestBeneficiaries,
    ...options
  });
