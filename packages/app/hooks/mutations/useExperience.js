import { useMutation } from '@tanstack/react-query';
import api from 'app/services/index';
import e from 'app/constants/endpoints';
import useToast from 'app/hooks/useToast';

/**
 * Endpoint to report an experience
 *
 * @param {string} id - experienceId
 *
 * @param {object} body
 *
 * @returns {Promise<{ message: string }>}
 */

export const useReportExperienceMutation = id => {
  const toast = useToast();
  const reportExperienceRequest = payload => api.post(e.REPORT_AN_EXPERIENCE(id), payload);

  const { mutate, ...mutationState } = useMutation({
    mutationFn: reportExperienceRequest
  });

  const reportExperience = (payload, onSuccess = () => {}, onError = () => {}) => {
    mutate(payload, {
      onSuccess: data => {
        onSuccess(data);
        toast.show({
          message: `Your report was successfully submitted. We'll review your report in 24hrs and get back to you.`
          // message: data.message
        });
      },
      onError: error => {
        onError(error);
      }
    });
  };

  return { reportExperience, reportExperienceState: mutationState };
};
