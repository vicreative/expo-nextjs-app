import api from 'app/services/index';
import e from 'app/constants/endpoints';
import { useQuery } from '@tanstack/react-query';

/**
 * Endpoint to get countries
 *
 * @returns {Promise<{data: countries }>}
 */
const fetchCountries = async query => {
  const { data } = await api.get(`${e.GET_COUNTRIES}?${query}`);
  return data;
};
const useCountriesQuery = (query, options = {}) =>
  useQuery({
    queryKey: ['countries', query],
    queryFn: () => fetchCountries(query),
    ...options
  });

export default useCountriesQuery;
