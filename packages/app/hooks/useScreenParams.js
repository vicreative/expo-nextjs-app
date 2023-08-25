import { createParam } from 'solito';
const { useParam, useParams } = createParam();

export default function useScreenParams() {
  const { setParams } = useParams();

  const [pathname] = useParam('pathname');
  const [id] = useParam('id');
  const [scheduleId] = useParam('scheduleId');
  const [referenceId] = useParam('referenceId');
  const [success] = useParam('success');
  const [bookingType] = useParam('bookingType');

  return {
    pathname,
    id,
    scheduleId,
    referenceId,
    success,
    bookingType,
    setParams
  };
}
