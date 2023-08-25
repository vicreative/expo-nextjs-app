import { AntDesign } from '@expo/vector-icons';
import spacing from 'app/config/theme/spacing';
import en from 'app/i18n/index';
import { Box, Center, Heading, Icon, Text } from 'native-base';
import Button from '../Button';
import Modal from './index';
import colors from 'app/config/theme/colors';
import * as Application from 'expo-application';
import Image from '../Image';
import { resolveAssetsUrl } from 'app/utils/index';

function AboutModal({ visible = false, onClose = () => {} }) {
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
        pb={`${spacing[60]}px`}
        px={`${spacing[24]}px`}
        height="auto"
        shadow={5}
      >
        <Button
          onPress={onClose}
          size="sm"
          px={0}
          variant="unstyled"
          alignSelf="flex-end"
          mt={`${spacing[24]}px`}
        >
          <Icon as={AntDesign} name="closecircleo" size={`${spacing[24]}px`} color={'gray.500'} />
        </Button>
        <Center>
          <Image
            width={spacing[60]}
            height={spacing[60]}
            resizeMode="contain"
            source={{ uri: resolveAssetsUrl('favicon.png') }}
            alt="Chat Illustration"
            backgroundColor={colors.primary[50]}
            borderRadius={spacing[20]}
          />

          <Heading fontSize={`${spacing[20]}px`} pt={`${spacing[24]}px`} textAlign="center">
            {en.profile.settings.about.heading}
          </Heading>
          <Text color="gray.300" pt={`${spacing[16]}px`} textAlign="center">
            {en.profile.settings.about.content}
          </Text>
          <Text
            pt={`${spacing[16]}px`}
            fontSize={`${spacing[14]}px`}
            textAlign="center"
            fontFamily="Satoshi-Medium"
          >
            {`${en.profile.settings.version} ${Application.nativeApplicationVersion}`.toUpperCase()}
          </Text>
          <Text color="gray.300" fontSize={`${spacing[14]}px`} textAlign="center">
            {en.profile.settings.about.update(false)}
          </Text>
        </Center>
      </Box>
    </Modal>
  );
}

export default AboutModal;
