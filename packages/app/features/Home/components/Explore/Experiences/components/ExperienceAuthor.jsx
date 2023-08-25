import { Feather } from '@expo/vector-icons';
import { CheckSuccessFilled } from 'app/components/Icons/Check';
import ContactGuideModal from 'app/components/Modal/ContactGuideModal';
import { Button, Link } from 'app/components/index';
import env from 'app/config/env';
import spacing from 'app/config/theme/spacing';
import useAppContext from 'app/hooks/useAppContext';
import en from 'app/i18n/index';
import {
  Avatar,
  Box,
  Divider,
  Heading,
  Hidden,
  HStack,
  Icon,
  Skeleton,
  Stack,
  Text
} from 'native-base';
import { useState } from 'react';
import { resolveFileUrl, truncate } from 'app/utils/index';

export default function ExperienceAuthor() {
  const { state } = useAppContext('experienceDetails');
  const [showMore, setShowMore] = useState(false);
  const [showContactGuideModal, setShowContactGuideModal] = useState(false);

  return (
    <>
      {/* smaller device(mobile phones)for web & mobile app */}
      <Hidden from="sm">
        <Divider bg="gray.100" thickness="1" mt={`${spacing[40]}px`} mb={`${spacing[16]}px`} />
      </Hidden>
      <Box mt={`${spacing[24]}px`}>
        <Skeleton
          isLoaded={!state.isLoading}
          p={{ base: `${spacing[16]}px`, sm: `${spacing[20]}px` }}
          width="100%"
          height="286px"
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
            <Skeleton.Text lines={1} isLoaded={!state.isLoading}>
              <Heading fontSize={`${spacing[20]}px`} mb={`${spacing[20]}px`}>
                {en.experiences.details.author.heading}
              </Heading>
            </Skeleton.Text>

            <Stack space={`${spacing[20]}px`}>
              <Box width={{ base: '100%', sm: '38%' }} mr={{ base: 0, sm: `${spacing[20]}px` }}>
                <AuthorProfileImage />
              </Box>
              <Stack space={`${spacing[20]}px`} width="100%">
                <HStack space={`${spacing[12]}px`} alignItems="center">
                  {state.experience?.business?.isApproved ? (
                    <CheckSuccessFilled />
                  ) : (
                    <Icon name="info" as={Feather} size={`${spacing[20]}px`} color="gray.500" />
                  )}
                  <Text color="gray.300">
                    {en.experiences.details.author.status(state.experience?.business?.isApproved)}
                  </Text>
                </HStack>

                <Heading fontSize={`${spacing[18]}px`}>{state.experience?.business?.name}</Heading>

                {state.experience?.business?.description && (
                  <Text color="gray.300">
                    {showMore
                      ? state.experience?.business?.description
                      : truncate(state.experience?.business?.description, 360)}
                  </Text>
                )}
                {state.experience?.business?.description?.length > 360 && (
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
                <Stack space={`${spacing[18]}px`}>
                  <Hidden platform={['android', 'ios']}>
                    <Button
                      variant="outline"
                      colorScheme="secondary"
                      size="md"
                      fontFamily={'Satoshi-Medium'}
                      href={`${env.WEBSITE_URL}/${state.experience?.business?.slug}`}
                      hrefAttrs={{
                        rel: 'noreferrer',
                        target: '_blank'
                      }}
                    >
                      {en.experiences.details.author.viewProfile}
                    </Button>
                  </Hidden>
                  <Button
                    variant="solid"
                    colorScheme="secondary"
                    size="md"
                    fontFamily={'Satoshi-Medium'}
                    as={Link}
                    href={`mailto:${state.experience?.business?.officialEmail}?subject=Inquiry about ${state.experience?.title} Experience`}
                    // onPress={() => setShowContactGuideModal(true)}
                  >
                    {en.experiences.details.author.contactGuide}
                  </Button>
                </Stack>
              </Stack>
            </Stack>
          </Box>
        </Skeleton>
      </Box>
      {showContactGuideModal && (
        <ContactGuideModal visible onClose={() => setShowContactGuideModal(false)} />
      )}
    </>
  );
}

const AuthorProfileImage = () => {
  const { state } = useAppContext('experienceDetails');
  return (
    <Avatar
      bg="primary.100"
      width={`${spacing[100]}px`}
      height={`${spacing[100]}px`}
      borderRadius={'full'}
      alt="Operator Profile Image"
      source={{
        uri:
          state.experience?.business?.logoImagePath &&
          resolveFileUrl(state.experience?.business?.logoImagePath)
      }}
    >
      {state.experience?.business?.name.charAt(0)}
    </Avatar>
  );
};
