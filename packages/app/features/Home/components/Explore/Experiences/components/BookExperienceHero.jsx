import ShareBottomSheet from 'app/components/BottomSheet/ShareBottomSheet/index.web';
import Breadcrumb from 'app/components/Breadcrumb';
import spacing from 'app/config/theme/spacing';
import useScreenParams from 'app/hooks/useScreenParams';
import en from 'app/i18n/index';
import { Box, Flex, Heading, HStack, Skeleton } from 'native-base';
import { useRouter } from 'solito/router';

export default function BookExperienceHero({ isLoading }) {
  const { back } = useRouter();
  const { id, scheduleId } = useScreenParams();

  return (
    <Flex width="100%" alignItems="center" justifyContent="center" bg="primary.50">
      <Box
        px={{ sm: `${spacing[55]}px`, lg: `${spacing[100] * 1.2}px` }}
        pt={`${spacing[100] * 0.48}px`}
        pb={spacing[100] * 0.7}
        width="100%"
        maxW="1440px"
      >
        <Skeleton.Text
          isLoaded={!isLoading}
          maxW="300px"
          _line={{
            height: `${spacing[40]}px`
          }}
          lines={1}
        >
          <Breadcrumb
            as="button"
            background="transparent"
            data={[
              {
                id: 0,
                url: `/experiences/${id}`,
                name: en.experiences.bookExperience.hero.breadcrumb.experience,
                onPress: back
              },
              {
                id: 1,
                url: `/experiences/${id}/schedule/${scheduleId}`,
                name: en.experiences.bookExperience.hero.breadcrumb.pay,
                onPress: () => {}
              }
            ]}
          />
        </Skeleton.Text>
        <HStack
          width="100%"
          justifyContent="space-between"
          alignItems="center"
          mt={`${spacing[28]}px`}
        >
          <Skeleton.Text
            isLoaded={!isLoading}
            maxW="551px"
            _line={{
              height: `${spacing[40]}px`
            }}
            lines={1}
          >
            <Heading fontSize={`${spacing[36]}px`}>
              {en.experiences.bookExperience.hero.heading}
            </Heading>
          </Skeleton.Text>

          <Skeleton isLoaded={!isLoading} w="240px" borderRadius="8px" height={`${spacing[48]}px`}>
            <ShareBottomSheet
              btnWidth="240px"
              btnTitle={en.experiences.shareExperience.btnText}
              text={en.experiences.shareExperience.text}
              title={en.experiences.shareExperience.title}
            />
          </Skeleton>
        </HStack>
      </Box>
    </Flex>
  );
}
