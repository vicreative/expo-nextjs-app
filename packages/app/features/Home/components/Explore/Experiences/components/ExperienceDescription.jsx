import { Button } from 'app/components/index';
import spacing from 'app/config/theme/spacing';
import useAppContext from 'app/hooks/useAppContext';
import en from 'app/i18n/index';
import { Divider, Heading, Skeleton, Stack, Text } from 'native-base';
import { useState } from 'react';
import { truncate } from 'app/utils/index';

export default function ExperienceDescription({ hideDivider = false }) {
  const { state } = useAppContext('experienceDetails');
  const [showMore, setShowMore] = useState(false);

  return (
    <>
      {!hideDivider && (
        <Divider
          bg="gray.100"
          thickness="1"
          mt={`${spacing[40]}px`}
          mb={{ base: `${spacing[40]}px`, lg: `${spacing[48]}px` }}
        />
      )}
      <Skeleton.Text
        lines={3}
        isLoaded={!state.isLoading}
        mt={hideDivider ? `${spacing[40]}px` : 0}
      >
        <Stack
          space={{ base: `${spacing[14]}px`, lg: `${spacing[20]}px` }}
          mt={hideDivider ? `${spacing[40]}px` : 0}
        >
          <Heading fontSize={`${spacing[20]}px`}>{en.experiences.details.description}</Heading>
          {state.experience?.description && (
            <Text color="gray.300" fontSize={`${spacing[16]}px`}>
              {showMore
                ? state.experience?.description
                : truncate(state.experience?.description, 280)}
            </Text>
          )}
          {state.experience?.description?.length > 280 && (
            <Button
              variant="naked"
              height="auto"
              p={0}
              size="md"
              width={`${spacing[100] * 0.8}px`}
              onPress={() => setShowMore(!showMore)}
            >
              <Text variant="link" fontSize={`${spacing[16]}px`}>
                {en.experiences.details.more(showMore)}
              </Text>
            </Button>
          )}
        </Stack>
      </Skeleton.Text>
    </>
  );
}
