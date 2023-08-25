import Modal from './index';
import { AntDesign, SimpleLineIcons } from '@expo/vector-icons';
import spacing from 'app/config/theme/spacing';
import en from 'app/i18n/index';
import { Heading, HStack, Box, Icon, Divider, ScrollView } from 'native-base';
import Button from '../Button';
import { useState } from 'react';
import useServicesQuery from 'app/hooks/queries/useServicesQuery';
import { CheckBoxGroup } from 'app/components/Form/CheckBox';
import useLanguagesQuery from 'app/hooks/queries/useLanguages';
import { ArchiveOutlineIcon } from 'app/components/Icons/Archive';

function ExperienceFilterModal({ visible, selected, onClose = () => {} }) {
  const [services, setServices] = useState([]);
  const [languages, setLanguages] = useState([]);

  useServicesQuery('', {
    refetchOnWindowFocus: false,
    onSuccess: data => {
      const selectedServiceList = services?.length
        ? services?.map(service => service?.isChecked === true)
        : data?.map(service => service?.isChecked === true);

      const services = selectedServiceList?.map((item, index) => {
        return {
          ...data[index],
          isChecked: item
        };
      });

      setServices(services);
    }
  });

  useLanguagesQuery('', {
    refetchOnWindowFocus: false,
    onSuccess: data => {
      const selectedLanguageList = languages?.length
        ? languages?.map(language => language?.isChecked === true)
        : data?.map(language => language?.isChecked === true);

      const languages = selectedLanguageList?.map((item, index) => {
        return {
          ...data[index],
          isChecked: item
        };
      });

      setLanguages(languages);
    }
  });

  const handleClose = (clearAll = false) => {
    const serviceList = services?.map(service => {
      const selectedServiceList = selected.serviceIds?.find(item => item === service.uuid);
      return {
        ...service,
        isChecked: clearAll ? false : selectedServiceList ? true : false
      };
    });

    const languageList = languages?.map(language => {
      const selectedLanguageList = selected.languageIds?.find(item => item === language.uuid);
      return {
        ...language,
        isChecked: clearAll ? false : selectedLanguageList ? true : false
      };
    });

    setServices(serviceList);
    setLanguages(languageList);

    const serviceIds = clearAll ? [] : selected.serviceIds;
    const languageIds = clearAll ? [] : selected.languageIds;
    onClose(serviceIds, languageIds);
  };

  const handleChange = (isServices, updatedItems) => {
    if (isServices) {
      setServices(updatedItems);
    } else {
      setLanguages(updatedItems);
    }
  };

  const handleSubmit = () => {
    const selectedServiceIds = services
      .filter(service => service.isChecked !== false)
      .map(service => service.uuid);

    const selectedLanguageIds = languages
      .filter(language => language.isChecked !== false)
      .map(language => language.uuid);

    onClose(selectedServiceIds, selectedLanguageIds);
  };

  return (
    <Modal
      // isDrawer
      closeOnOverlayClick
      animationType="fade"
      visible={visible}
      onClose={() => handleClose(false)}
      bg="transparent"
      statusBarBackgroundColor="transparent"
      justifyContent={{ base: 'flex-end', sm: 'center' }}
      py={{ base: 0, sm: `${spacing[20]}px` }}
      px={{ base: 0, sm: `${spacing[20]}px` }}
      maxWidth={{ base: '100%', sm: '460px', md: '680px' }}
    >
      <Box
        bg="white"
        borderTopRadius={`${spacing[20]}px`}
        borderBottomRadius={{ base: 0, sm: `${spacing[20]}px` }}
        height={{ base: '96%', sm: '95%' }}
        maxH={{ base: '96%', sm: '840px' }}
        shadow={5}
      >
        <HStack
          alignItems="center"
          justifyContent="space-between"
          px={`${spacing[24]}px`}
          py={`${spacing[20]}px`}
          width="100%"
          borderBottomWidth={1}
          borderBottomColor="gray.100"
        >
          <Heading fontSize={`${spacing[20]}px`}>{en.experiences.filter.heading}</Heading>

          <Button onPress={() => handleClose(false)} size="sm" variant="unstyled" p={0}>
            <Icon as={AntDesign} name="close" size={`${spacing[20]}px`} color={'gray.500'} />
          </Button>
        </HStack>

        {/* Body */}
        <ScrollView
          keyboardShouldPersistTaps="always"
          showsVerticalScrollIndicator={false}
          keyboardDismissMode="interactive"
        >
          <Box px={`${spacing[24]}px`} pt={`${spacing[24]}px`} pb={`${spacing[60]}px`} w="100%">
            <HStack alignItems="center" space={`${spacing[16]}px`} mb={`${spacing[24]}px`}>
              <ArchiveOutlineIcon width={20} height={20} strokeWidth={2} />
              <Heading fontSize={`${spacing[18]}px`}>{en.experiences.filter.category}</Heading>
            </HStack>

            <CheckBoxGroup
              value={services}
              onChange={(selectedItem, updatedItems) =>
                handleChange(true, updatedItems, selectedItem)
              }
            />

            <Divider bg="gray.100" thickness="1" my={`${spacing[24]}px`} />

            <HStack alignItems="center" space={`${spacing[16]}px`} mb={`${spacing[24]}px`}>
              <Icon as={SimpleLineIcons} name="globe" size={`${spacing[20]}px`} color="gray.500" />
              <Heading fontSize={`${spacing[18]}px`}>{en.experiences.filter.languages}</Heading>
            </HStack>

            <CheckBoxGroup
              value={languages}
              onChange={(selectedItem, updatedItems) =>
                handleChange(false, updatedItems, selectedItem)
              }
            />
          </Box>
        </ScrollView>
        {/* Buttons */}

        <Divider bg="gray.100" thickness="1" />
        <HStack space={`${spacing[14]}px`} p={`${spacing[24]}px`} alignSelf="flex-end">
          <Button
            variant="outline"
            colorScheme="secondary"
            size="md"
            fontFamily="Satoshi-Medium"
            px="18px"
            onPress={() => handleClose(true)}
          >
            {en.experiences.filter.clear}
          </Button>
          <Button
            variant="solid"
            colorScheme="secondary"
            size="md"
            fontFamily="Satoshi-Medium"
            px="18px"
            onPress={handleSubmit}
          >
            {en.experiences.filter.showResults}
          </Button>
        </HStack>
      </Box>
    </Modal>
  );
}

export default ExperienceFilterModal;
