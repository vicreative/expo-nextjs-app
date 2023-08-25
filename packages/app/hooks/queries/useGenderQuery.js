import api from 'app/services/index';
import e from 'app/constants/endpoints';
import { useQuery } from '@tanstack/react-query';

/**
 * Endpoint to get gender
 *
 * @returns {Promise<{data: gender }>}
 */
const request = async () => {
  const { data } = await api.get(e.GENDER);
  return data;
};

const useGenderQuery = (options = {}) =>
  useQuery({ queryKey: ['genders'], queryFn: request, ...options });
export default useGenderQuery;
