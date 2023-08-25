import { useState } from 'react';
import { Button } from 'app/components/index';
import spacing from 'app/config/theme/spacing';
import useAppContext from 'app/hooks/useAppContext';
import en from 'app/i18n/index';
import { Box, Heading, Hidden, Skeleton, Stack, Text } from 'native-base';
import CancellationPolicyModal from 'app/components/Modal/CancellationPolicyModal';
import moment from 'moment';

export default function ExperienceCancellationPolicy() {
  const { state } = useAppContext('experienceDetails');
  const [showModal, setShowModal] = useState(false);

  const scheduleList = state.experience.schedules
    ?.filter(schedule => new Date() < new Date(schedule.deadlineDatetime))
    ?.sort((a, b) => new Date(a.startDatetime).getTime() - new Date(b.startDatetime).getTime());

  const deadlineDatetime =
    scheduleList?.length === 0
      ? moment(state.experience?.initialStartDatetime)
          .subtract(state.experience?.bookingSetting?.bookingDeadline, 'milliseconds')
          .toISOString()
      : Object.keys(state.schedule).length > 0
      ? state.schedule?.deadlineDatetime
      : scheduleList?.length && scheduleList[0]?.deadlineDatetime;

  return (
    <>
      <Box mt={{ base: `${spacing[14]}px`, sm: `${spacing[24]}px` }}>
        <Skeleton
          isLoaded={!state.isLoading}
          p={{ base: `${spacing[16]}px`, sm: `${spacing[20]}px` }}
          width="100%"
          height="200px"
          borderRadius={`${spacing[10]}px`}
        >
          <Box
            borderWidth={1}
            borderColor="gray.100"
            borderRadius={`${spacing[10]}px`}
            width="100%"
            py={`${spacing[24]}px`}
            px={{ base: `${spacing[20]}px`, sm: `${spacing[32]}px` }}
          >
            <Stack space={`${spacing[27]}px`}>
              <Skeleton.Text lines={3} isLoaded={!state.isLoading}>
                <Stack space={{ base: `${spacing[18]}px`, lg: `${spacing[20]}px` }}>
                  <Heading fontSize={`${spacing[20]}px`}>
                    {en.experiences.details.cancellation.heading}
                  </Heading>

                  <Text color="gray.300">{en.experiences.details.cancellation.deadline}</Text>

                  <Hidden till="md">
                    <Button
                      colorScheme="secondary"
                      variant="outline"
                      size="md"
                      maxW={'327px'}
                      fontFamily="Satoshi-Medium"
                      onPress={() => setShowModal(true)}
                    >
                      {en.experiences.details.cancellation.readMore}
                    </Button>
                  </Hidden>

                  <Hidden from="md">
                    <Button
                      colorScheme="secondary"
                      variant="outline"
                      size="md"
                      maxW={`${spacing[100] * 1.5}px`}
                      fontFamily="Satoshi-Medium"
                      onPress={() => setShowModal(true)}
                    >
                      {en.experiences.details.cancellation.learnMore}
                    </Button>
                  </Hidden>
                </Stack>
              </Skeleton.Text>
            </Stack>
          </Box>
        </Skeleton>
      </Box>
      {/* cancellation policy modal */}
      {showModal && (
        <CancellationPolicyModal
          deadlineDatetime={moment(deadlineDatetime).format('LLLL')}
          experienceType={state.experience?.type}
          additionalCancellationInfo={state.experience?.bookingSetting?.additionalCancellationInfo}
          visible
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}
