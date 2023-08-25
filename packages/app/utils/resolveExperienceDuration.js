import moment from 'moment';
import { msToTime } from './index';

const resolveExperienceDuration = (
  type,
  schedules,
  initialStartDatetime,
  initialEndDatetime,
  isSingleSchedule = false
) => {
  if (schedules) {
    const scheduleList = schedules
      ?.filter(schedule =>
        isSingleSchedule ? schedule : new Date() < new Date(schedule.deadlineDatetime)
      )
      ?.sort((a, b) => new Date(a.startDatetime).getTime() - new Date(b.startDatetime).getTime());

    const endDate =
      scheduleList?.length === 0
        ? moment(initialEndDatetime)
        : moment(scheduleList[0]?.endDatetime);

    const startDate =
      scheduleList?.length === 0
        ? moment(initialStartDatetime)
        : moment(scheduleList[0]?.startDatetime);

    const timeDiff =
      type === 'REGULAR'
        ? endDate.diff(startDate, 'milliseconds')
        : endDate.diff(startDate, 'days');

    const duration =
      type === 'REGULAR'
        ? msToTime(timeDiff)
        : timeDiff === 1
        ? `${timeDiff} day, ${timeDiff - 1} night`
        : `${timeDiff} days, ${timeDiff - 1} nights`;

    return duration;
  }
};

export default resolveExperienceDuration;

export const resolveExperienceTimeLeft = startDatetime => {
  const startDate = moment(startDatetime);
  const nowDate = moment(new Date());
  const durationInDays = startDate.diff(nowDate, 'days');

  const isNegative = Math.sign(durationInDays) === -1;

  const timeLeft =
    durationInDays <= 1 && durationInDays >= -1
      ? moment(startDatetime).startOf('milliseconds').fromNow()
      : isNegative
      ? `${Math.abs(durationInDays)} days ago`
      : `in ${durationInDays} days`;
  return timeLeft;
};
