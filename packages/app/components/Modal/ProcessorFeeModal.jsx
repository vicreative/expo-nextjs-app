import { AntDesign } from '@expo/vector-icons';
import spacing from 'app/config/theme/spacing';
import useDimensions from 'app/hooks/useDimensions';
import en from 'app/i18n/index';
import { Box, Heading, HStack, Icon, ScrollView, Stack, Text } from 'native-base';
import { Button } from '..';
import Modal from './index';

function ProcessorFeeModal({ visible = false, onClose = () => {} }) {
  const {
    screen: { height: SCREEN_HEIGHT }
  } = useDimensions();
  return (
    <Modal
      isDrawer
      closeOnOverlayClick
      animationType="fade"
      visible={visible}
      onClose={onClose}
      bg="transparent"
      statusBarBackgroundColor="transparent"
      justifyContent="flex-end"
      pt={0}
      maxWidth={{ base: '100%', sm: '400px' }}
    >
      <Box
        bg="white"
        borderTopRadius={`${spacing[20]}px`}
        height={{ base: 'auto', sm: '100%' }}
        maxHeight={{ base: SCREEN_HEIGHT * 0.9, sm: '100%' }}
        shadow={5}
      >
        {/* Header */}
        <HStack
          justifyContent="space-between"
          px={`${spacing[24]}px`}
          pt={`${spacing[38]}px`}
          pb={`${spacing[24]}px`}
          width="100%"
          borderBottomWidth={1}
          borderBottomColor="gray.100"
        >
          <Heading fontSize={`${spacing[24]}px`}>
            {en.experiences.bookExperience.processorFee.heading}
          </Heading>

          <Button onPress={onClose} size="sm" variant="unstyled" p={0}>
            <Icon as={AntDesign} name="closecircleo" size={`${spacing[30]}px`} color={'gray.500'} />
          </Button>
        </HStack>

        {/* Body */}
        <ScrollView showsVerticalScrollIndicator={false}>
          <Stack
            space={`${spacing[24]}px`}
            px={`${spacing[24]}px`}
            py={`${spacing[32]}px`}
            w="100%"
          >
            <Stack space={`${spacing[8]}px`}>
              <Heading fontSize={`${spacing[20]}px`}>
                {en.experiences.bookExperience.processorFee.sectionOne.question}
              </Heading>
              <Text color="gray.300">
                {en.experiences.bookExperience.processorFee.sectionOne.answer}
              </Text>
            </Stack>

            <Stack space={`${spacing[8]}px`}>
              <Heading fontSize={`${spacing[20]}px`}>
                {en.experiences.bookExperience.processorFee.sectionTwo.question}
              </Heading>
              <Text color="gray.300">
                {en.experiences.bookExperience.processorFee.sectionTwo.answer}
              </Text>
            </Stack>

            <Stack space={`${spacing[8]}px`}>
              <Heading fontSize={`${spacing[20]}px`}>
                {en.experiences.bookExperience.processorFee.sectionThree.question}
              </Heading>
              <Text color="gray.300">
                {en.experiences.bookExperience.processorFee.sectionThree.answer}
              </Text>
            </Stack>
          </Stack>
        </ScrollView>
      </Box>
    </Modal>
  );
}

export default ProcessorFeeModal;
