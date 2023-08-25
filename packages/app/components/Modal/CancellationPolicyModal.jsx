import { Button } from 'app/components/index';
import spacing from 'app/config/theme/spacing';
import en from 'app/i18n/index';
import { Box, Flex, Heading, Icon, Pressable, ScrollView, Stack, Text } from 'native-base';
import { NotificationTextIcon } from 'app/components/Icons/Notification';
import { AntDesign } from '@expo/vector-icons';
import * as Linking from 'expo-linking';
import Modal from './index';

function CancellationPolicyModal({
  deadlineDatetime,
  experienceType,
  additionalCancellationInfo,
  visible,
  onClose = () => {}
}) {
  return (
    <Modal
      bg="transparent"
      animationType="fade"
      visible={visible}
      onClose={onClose}
      maxWidth="100%"
      px={0}
      pt={0}
      alignItems="center"
      justifyContent="center"
    >
      <ScrollView width="100%" height="100%">
        <Flex
          alignSelf="center"
          maxW="544px"
          bg="white"
          p={`${spacing[24]}px`}
          m={`${spacing[24]}px`}
          borderRadius={`${spacing[12]}px`}
          shadow={5}
        >
          {/* close btn */}
          <Pressable
            onPress={onClose}
            position="absolute"
            top={`${spacing[24]}px`}
            right={`${spacing[24]}px`}
            w={`${spacing[20]}px`}
            h={`${spacing[20]}px`}
            zIndex={1001}
          >
            <Icon as={AntDesign} name="closecircleo" size={`${spacing[20]}px`} color={'gray.500'} />
          </Pressable>
          {/* content */}
          <Stack
            flexDirection={{ base: 'column', sm: 'row' }}
            position="relative"
            space={`${spacing[16]}px`}
          >
            <Box w={{ base: '100%', sm: '12%' }}>
              <NotificationTextIcon />
            </Box>
            <Box w={{ base: '100%', sm: '85%' }}>
              <Heading fontSize={`${spacing[18]}px`} mb={`${spacing[10]}px`}>
                {en.experiences.details.cancellation.heading}
              </Heading>

              <Text color="gray.500" fontSize={`${spacing[14]}px`} mb={`${spacing[30]}px`}>
                {en.experiences.details.cancellation.subheading}
              </Text>

              <Text color="gray.500" fontSize={`${spacing[14]}px`}>
                {en.experiences.details.cancellation.content(
                  experienceType,
                  deadlineDatetime,
                  additionalCancellationInfo
                )}

                <Text
                  variant="link"
                  textDecorationLine="underline"
                  fontFamily="Satoshi-Medium"
                  color="primary.600"
                  fontSize={`${spacing[14]}px`}
                  onPress={() => Linking.openURL(`mailto:admin@expitra.com`)}
                >
                  {en.experiences.details.cancellation.contact.mail}
                </Text>
              </Text>

              <Box mt={`${spacing[32]}px`}>
                <Button
                  colorScheme="secondary"
                  variant="outline"
                  onPress={onClose}
                  size="md"
                  maxW={{ base: '100%', sm: `${spacing[100] * 1.27}px` }}
                >
                  {en.experiences.details.cancellation.agree}
                </Button>
              </Box>
            </Box>
          </Stack>
        </Flex>
      </ScrollView>
    </Modal>
  );
}

export default CancellationPolicyModal;
