import api from 'app/services/index';
import e from 'app/constants/endpoints';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

/**
 * Endpoint to get paginated experiences
 *
 * @param {number} pageParam
 * @param {number} limit
 *
 * @returns {Promise<{ data: experiences }>}
 */
const fetchExperiences = async (pageParam, limit, query) => {
  const { data } = await api.get(`${e.EXPERIENCE('')}?page=${pageParam}&limit=${limit}${query}`);
  const totalPages = Math.ceil(data.count / limit);
  return {
    ...data,
    currentPage: pageParam,
    nextPage: pageParam === totalPages ? pageParam : pageParam + 1,
    prevPage: pageParam - 1,
    totalPages: totalPages
  };
};
const useExperiencesTableQuery = (pageParam = 1, limit = 10, query = '', options) =>
  useInfiniteQuery({
    queryKey: ['experiences', pageParam, limit, query],
    queryFn: () => fetchExperiences(pageParam, limit, query),
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
 * Endpoint to get all experiences
 *
 * @param {number} pageParam
 * @param {number} limit
 *
 * @returns {Promise<{ data: experiences }>}
 */
const useExperiencesInfiniteQuery = (query = '', options) => {
  const fetchExperiences = async ({ pageParam = 1, limit = 4 }) => {
    const { data } = await api.get(`${e.EXPERIENCE('')}?page=${pageParam}&limit=${limit}${query}`);
    const totalPages = Math.ceil(data.count / limit);
    return {
      ...data,
      nextPage: pageParam,
      totalPages: totalPages
    };
  };
  return useInfiniteQuery({
    queryKey: ['experiences', query],
    queryFn: fetchExperiences,
    getNextPageParam: lastPage => {
      if (lastPage.nextPage < lastPage.totalPages) return lastPage.nextPage + 1;
      return undefined;
    },
    // keepPreviousData: true,
    ...options
  });
};

/**
 * Endpoint to get experience details
 *
 * @param {string} id - experienceId
 *
 * @returns {Promise<{data: experience }>}
 */
const fetchExperience = async id => {
  const { data } = await api.get(e.EXPERIENCE(id));
  return data;
};
const useExperienceDetailsQuery = (id, options = {}) =>
  useQuery({
    queryKey: ['experience', id],
    queryFn: () => fetchExperience(id),
    ...options
  });

/**
 * Endpoint to get a single schedule of an experience
 *
 * @param {string} id - scheduleId
 *
 * @returns {Promise<{data: schedule }>}
 */
const fetchSchedule = async id => {
  const { data } = await api.get(e.EXPERIENCE_SCHEDULES(id));
  return data;
};
const useExperienceScheduleQuery = (id, options = {}) =>
  useQuery({
    queryKey: ['experience-schedule', id],
    queryFn: () => fetchSchedule(id),
    ...options
  });

/**
 * Endpoint to get experience report types
 *
 * @param {string} id - experienceId
 *
 * @returns {Promise<{data: experienceReportTypes }>}
 */
const fetchExperienceReportTypes = async () => {
  const { data } = await api.get(e.EXPERIENCE_REPORT_TYPES);
  return data;
};
const useExperienceReportTypesQuery = (options = {}) =>
  useQuery({
    queryKey: ['experience-report-types'],
    queryFn: fetchExperienceReportTypes,
    ...options
  });

/**
 * Endpoint to get experiences perks
 *
 * @returns {Promise<{data: perks }>}
 */
const fetchPerks = async () => {
  const { data } = await api.get(e.PERKS);
  return data;
};
const usePerksQuery = (options = {}) =>
  useQuery({ queryKey: ['perks'], queryFn: fetchPerks, ...options });

export {
  useExperiencesTableQuery,
  useExperiencesInfiniteQuery,
  useExperienceDetailsQuery,
  useExperienceScheduleQuery,
  useExperienceReportTypesQuery,
  usePerksQuery
};
