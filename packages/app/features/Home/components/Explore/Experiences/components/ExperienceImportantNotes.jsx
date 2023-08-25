import { Accordion, Link, ListItem } from 'app/components';
import spacing from 'app/config/theme/spacing';
import useAppContext from 'app/hooks/useAppContext';
import en from 'app/i18n/index';
import { Box, Divider, Heading, Hidden, HStack, Skeleton, Stack, Text } from 'native-base';
import { useState, useEffect } from 'react';
import getCountryInfoByCountryName from 'app/utils/getCountryInfoByCountryName';
import useDimensions from 'app/hooks/useDimensions';
import ContactGuideModal from 'app/components/Modal/ContactGuideModal';

export default function ExperienceImportantNotes({ hideDivider }) {
  const { state } = useAppContext('experienceDetails');
  const [activeIndex, setActiveIndex] = useState(0);
  const [countryCurrencyInfo, setCountryCurrencyInfo] = useState([]);
  const [showContactGuideModal, setShowContactGuideModal] = useState(false);
  const {
    window: { width: WIDTH }
  } = useDimensions();

  const countryName = state.experience?.address?.split(', ')[1];

  function objToArray(data) {
    const keys = Object.keys(data);

    const arr = keys.reduce((acc, item) => {
      const obj = {};
      obj['currencyCode'] = item;
      obj['currencyInfo'] = data[item];
      acc.push(obj);
      return acc;
    }, []);

    return arr;
  }

  useEffect(() => {
    if (state.experience?.address) {
      getCountryInfo();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.experience?.address]);

  async function getCountryInfo() {
    const data = await getCountryInfoByCountryName(countryName);

    setCountryCurrencyInfo(objToArray(data[0].currencies));
  }

  return (
    <>
      {/* smaller device(mobile phones)for web & mobile app */}
      <Hidden from="sm">
        {!hideDivider && (
          <Divider bg="gray.100" thickness="1" mt={`${spacing[40]}px`} mb={`${spacing[16]}px`} />
        )}
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
                    {en.experiences.details.importantNotes.heading}
                  </Heading>
                  <Accordion
                    activeIndex={activeIndex}
                    onChange={index => setActiveIndex(index)}
                    data={[
                      state.experience?.customerGuides?.length > 0 && {
                        title: en.experiences.details.importantNotes.instructions(WIDTH),
                        content: (
                          <Stack space={`${spacing[8]}px`} mt={`${spacing[20]}px`}>
                            {state.experience?.customerGuides?.map(guide => (
                              <ListItem key={guide.uuid} color="gray.300">
                                {guide.content}
                              </ListItem>
                            ))}
                          </Stack>
                        )
                      },
                      {
                        title: en.experiences.details.importantNotes.currency.heading,
                        content: (
                          <HStack space={`${spacing[4]}px`} mt={`${spacing[20]}px`} flexWrap="wrap">
                            <Text color="gray.300">
                              {en.experiences.details.importantNotes.currency.content(countryName)}
                            </Text>
                            <Text color="gray.300" fontFamily="Satoshi-Bold">
                              {countryCurrencyInfo?.length <= 1
                                ? `${countryCurrencyInfo[0]?.currencyInfo?.name} (${countryCurrencyInfo[0]?.currencyCode})`
                                : `${countryCurrencyInfo[0]?.currencyInfo?.name} (${countryCurrencyInfo[0]?.currencyCode}) and ${countryCurrencyInfo[1]?.currencyInfo?.name} (${countryCurrencyInfo[1].currencyCode})`}
                            </Text>
                          </HStack>
                        )
                      },
                      state.experience?.type === 'TRAVEL' && {
                        title: en.experiences.details.importantNotes.visaInfo.heading,
                        content: (
                          <Text color="gray.300" mt={`${spacing[20]}px`}>
                            {en.experiences.details.importantNotes.visaInfo.content}
                            <Text
                              variant="link"
                              textDecorationLine="underline"
                              fontFamily="Satoshi-Medium"
                              color="primary.600"
                              as={Link}
                              href={`mailto:${state.experience?.business?.officialEmail}?subject=Inquiry about ${state.experience?.title} Experience`}
                              // onPress={() => setShowContactGuideModal(true)}
                            >
                              {en.experiences.details.importantNotes.visaInfo.contact.text}
                            </Text>
                          </Text>
                        )
                      },
                      state.experience?.type === 'TRAVEL' &&
                        state.experience?.bookingSetting?.additionalCancellationInfo && {
                          title: en.experiences.details.importantNotes.additionalCancellationInfo,
                          content: (
                            <Text color="gray.300" mt={`${spacing[20]}px`}>
                              {state.experience?.bookingSetting?.additionalCancellationInfo}
                            </Text>
                          )
                        }
                    ]}
                  />
                </Stack>
              </Skeleton.Text>
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
