import { Feather } from '@expo/vector-icons';
import { FileXIcon } from 'app/components/Icons/File';
import { Button } from 'app/components/index';
import spacing from 'app/config/theme/spacing';
import useAppContext from 'app/hooks/useAppContext';
import en from 'app/i18n/index';
import { Box, Flex, Heading, HStack, Icon, Skeleton, Stack } from 'native-base';

export default function ViewTicket({
  cancelledAt,
  endDatetime,
  onViewTicket = () => {},
  onReport,
  onCancel
}) {
  const { state } = useAppContext('experienceDetails');

  const handleReport = () => {
    if (typeof onReport === 'function') {
      onReport();
    }
  };

  const handleCancel = () => {
    if (typeof onCancel === 'function') {
      onCancel();
    }
  };

  return (
    <>
      <Skeleton
        isLoaded={!state.isLoading}
        p={`${spacing[16]}px`}
        mt={`${spacing[40]}px`}
        height={`${spacing[100]}px`}
        borderRadius={`${spacing[10]}px`}
      >
        <Flex position="relative" width="100%" height={{ base: 'auto', sm: '80%' }}>
          <Box
            _web={{
              top: 100,
              position: 'sticky'
            }}
            mt={`${spacing[40]}px`}
          >
            <HStack
              width="100%"
              borderRadius={`${spacing[10]}px`}
              justifyContent="space-between"
              alignItems="center"
              space={`${spacing[20]}px`}
              borderWidth={1}
              borderColor="gray.100"
              px={`${spacing[24]}px`}
              py={`${spacing[22]}px`}
              flexWrap="wrap"
              bg="white"
              shadow={5}
            >
              <Heading fontSize={`${spacing[18]}px`}>{en.profile.trips.info.view.heading}</Heading>
              <Button
                colorScheme="secondary"
                variant="solid"
                size="md"
                fontFamily="Satoshi-Medium"
                onPress={onViewTicket}
              >
                {en.profile.trips.info.view.btnText}
              </Button>
            </HStack>
            {(onReport || onCancel) && (
              <Stack
                mt={`${spacing[30]}px`}
                space={state.isLoading ? `${spacing[10]}px` : `${spacing[30]}px`}
              >
                {cancelledAt === null &&
                  (new Date() < new Date(endDatetime) ? (
                    <Skeleton
                      isLoaded={!state.isLoading}
                      height={`${spacing[20]}px`}
                      borderRadius="full"
                    >
                      <Button
                        colorScheme="secondary"
                        variant="unstyled"
                        size="sm"
                        leftIcon={<FileXIcon />}
                        onPress={handleCancel}
                      >
                        {en.profile.trips.info.cancel.heading}
                      </Button>
                    </Skeleton>
                  ) : null)}
                <Skeleton
                  isLoaded={!state.isLoading}
                  height={`${spacing[20]}px`}
                  borderRadius="full"
                >
                  <Button
                    colorScheme="secondary"
                    variant="unstyled"
                    size="sm"
                    leftIcon={<Icon as={Feather} name="flag" size="18px" color="base.black" />}
                    onPress={handleReport}
                  >
                    {en.profile.trips.info.report.heading}
                  </Button>
                </Skeleton>
              </Stack>
            )}
          </Box>
        </Flex>
      </Skeleton>
    </>
  );
}
