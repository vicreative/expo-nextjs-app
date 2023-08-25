import api from 'app/services/index';
import e from 'app/constants/endpoints';
import { useQuery } from '@tanstack/react-query';

/**
 * Endpoint to get languages
 *
 * @param {string} id - languageId
 *
 * @returns {Promise<{data: languages }>}
 */
const fetchLanguages = async id => {
  const { data } = await api.get(e.LANGUAGES(id));
  return data;
};
const useLanguagesQuery = (id, options = {}) =>
  useQuery({
    queryKey: ['languages', id],
    queryFn: () => fetchLanguages(id),
    ...options
  });

export default useLanguagesQuery;
