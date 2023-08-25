import { Toast } from 'app/components/index';
import { useToast as useRNToast } from 'native-base';

export default function useToast() {
  const toast = useRNToast();

  return {
    show: ({ message, error, placement = 'top', mode, centerContent }) =>
      toast.show({
        render: () => {
          return (
            <Toast message={message} error={error} mode={mode} centerContent={centerContent} />
          );
        },
        placement: placement
      })
  };
}
