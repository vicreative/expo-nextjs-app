import api from 'app/services/index';
import e from 'app/constants/endpoints';
import { useQuery } from '@tanstack/react-query';

/**
 * Endpoint to get Provisions
 *
 * @returns {Promise<{data: provisions }>}
 */
const fetchProvisions = async (id, query) => {
  const { data } = await api.get(`${e.PROVISIONS(id)}${query}`);
  return data;
};
export const useProvisionsQuery = (id = '', query = '', options = {}) =>
  useQuery({
    queryKey: ['provisions', id, query],
    queryFn: () => fetchProvisions(id, query),
    ...options
  });
