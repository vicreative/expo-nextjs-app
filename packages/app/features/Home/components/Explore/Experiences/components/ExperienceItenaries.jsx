import { Accordion } from 'app/components';
import spacing from 'app/config/theme/spacing';
import useAppContext from 'app/hooks/useAppContext';
import en from 'app/i18n/index';
import { Box, Divider, Heading, Hidden, Skeleton, Stack, Text } from 'native-base';
import { useState } from 'react';

export default function ExperienceItenaries({ hideDivider = false }) {
  const { state } = useAppContext('experienceDetails');
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    state.experience?.type === 'TRAVEL' && (
      <>
        {/* smaller device(mobile phones)for web & mobile app */}
        {!hideDivider && (
          <Hidden from="sm">
            <Divider bg="gray.100" thickness="1" mt={`${spacing[40]}px`} mb={`${spacing[16]}px`} />
          </Hidden>
        )}
        <Box mt={`${spacing[24]}px`}>
          <Skeleton
            isLoaded={!state.isLoading}
            p={{ base: `${spacing[16]}px`, sm: `${spacing[20]}px` }}
            width="100%"
            height="286px"
            borderRadius={`${spacing[10]}px`}
          >
            <Box
              borderWidth={{ base: 0, sm: 1 }}
              borderColor="gray.100"
              borderRadius={`${spacing[10]}px`}
              width="100%"
              py={{ base: 0, sm: `${spacing[24]}px` }}
              px={{ base: 0, sm: `${spacing[32]}px` }}
            >
              <Stack space={`${spacing[27]}px`}>
                <Skeleton.Text lines={3} isLoaded={!state.isLoading}>
                  <Stack space={{ base: `${spacing[14]}px`, lg: `${spacing[20]}px` }}>
                    <Heading fontSize={`${spacing[20]}px`}>
                      {en.experiences.details.itenaries.heading}
                    </Heading>
                    <Accordion
                      activeIndex={activeIndex}
                      onChange={index => setActiveIndex(index)}
                      data={state.experience?.itenaries
                        ?.sort(
                          (a, b) =>
                            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
                        )
                        ?.map(itenary => ({
                          ...itenary,
                          content: (
                            <Stack space={`${spacing[24]}px`} mt={`${spacing[20]}px`}>
                              <Text fontSize={`${spacing[16]}px`}>
                                {en.experiences.details.itenaries.summary}
                              </Text>
                              <Text color="gray.300">{itenary.content}</Text>
                            </Stack>
                          )
                        }))}
                    />
                  </Stack>
                </Skeleton.Text>
              </Stack>
            </Box>
          </Skeleton>
        </Box>
      </>
    )
  );
}
