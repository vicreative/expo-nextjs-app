import { Feather } from '@expo/vector-icons';
import { Button } from 'app/components/index';
import spacing from 'app/config/theme/spacing';
import en from 'app/i18n/index';
import { Divider, Icon } from 'native-base';
import { Platform } from 'react-native';
import getDeviceOS from 'app/utils/deviceOs.web';

export default function BackToTop({ scrollRef }) {
  const deviceOs = getDeviceOS();
  const isMobile = deviceOs === 'iOS' || deviceOs === 'Android';

  const scrollToTop = () => {
    if (Platform.OS === 'web') {
      if (isMobile) {
        scrollRef?.current?.scrollTo({ x: 0, y: 0, animated: true });
      } else {
        window?.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
      }
    } else {
      scrollRef?.current?.scrollTo({ y: 0, animated: true });
    }
  };
  return (
    <>
      <Divider bg="gray.100" thickness="1" mt={`${spacing[40]}px`} mb={`${spacing[60]}px`} />

      <Button
        size="xl"
        rightIcon={<Icon as={Feather} name="arrow-up-circle" />}
        alignSelf="center"
        width="100%"
        maxWidth="440px"
        onPress={scrollToTop}
      >
        {en.experiences.details.backToTop}
      </Button>
    </>
  );
}
