import api from 'app/services/index';
import e from 'app/constants/endpoints';
import { useQuery } from '@tanstack/react-query';

/**
 * Endpoint to get services
 *
 * @param {string} id - serviceId
 *
 * @returns {Promise<{data: service }>}
 */
const fetchServices = async id => {
  const { data } = await api.get(e.SERVICES(id));
  return data;
};
const useServicesQuery = (id, options = {}) =>
  useQuery({
    queryKey: ['app/services', id],
    queryFn: () => fetchServices(id),
    ...options
  });
export default useServicesQuery;
