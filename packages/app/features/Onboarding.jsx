import spacing from 'app/config/theme/spacing';
import en from 'app/i18n/index';
import { Box, Heading, Flex, Pressable, Text, Icon } from 'native-base';
import { useCallback, useState } from 'react';
import { Button, Container, Image } from 'app/components/index';
import MyCarousel from 'app/components/Carousel';
import { SheetManager } from 'react-native-actions-sheet';
import useDimensions from 'app/hooks/useDimensions';
import { LogoWithText } from 'app/components/Icons/Logo';
import colors from 'app/config/theme/colors';
import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'solito/router';

export default function Onboarding() {
  const sliderWidth = spacing[100] * 3.62;
  const [currentIndex, setCurrentIndex] = useState(0);
  const { push } = useRouter();

  const {
    window: { height: HEIGHT },
    screen: { height: SCREEN_HEIGHT }
  } = useDimensions();

  const handleClose = () => {
    push('/');
  };

  const renderItem = useCallback(
    ({ item }) => {
      return (
        <Box>
          <Box
            width={sliderWidth}
            height={SCREEN_HEIGHT * 0.5034}
            borderRadius={spacing[20]}
            overflow="hidden"
          >
            <Image
              width={'100%'}
              height={'100%'}
              source={{
                uri: item.uri
              }}
              resizeMode="cover"
              alt={`onboarding-${item.id}`}
              backgroundColor={colors.primary[100]}
            />
          </Box>
          <Text
            fontFamily="Satoshi-Medium"
            fontSize={`${spacing[24]}px`}
            maxWidth={sliderWidth}
            textAlign="center"
            mt={34}
          >
            {item.text}
          </Text>
        </Box>
      );
    },
    [SCREEN_HEIGHT, sliderWidth]
  );

  return (
    <Container px={0}>
      <Flex justify="space-between" align="center" height="100%">
        <Flex position="absolute" top="10px" right="10px" zIndex={10000}>
          <Button variant="unstyled" size="sm" onPress={handleClose}>
            <Icon as={AntDesign} name="close" size={`${spacing[26]}px`} color="gray.600" />
          </Button>
        </Flex>
        <Box width={sliderWidth} mt={`${spacing[24]}px`}>
          <Flex alignItems="center" mb={20}>
            <LogoWithText width={spacing[100] * 1.95} height={HEIGHT * 0.0425} />
          </Flex>
          <MyCarousel
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            data={en.onboarding.slides}
            renderItem={renderItem}
            width={sliderWidth}
            // borderRadius={spacing[20]}
          />
        </Box>

        <Pressable
          justifyContent="center"
          alignItems="center"
          bg="primary.600"
          width="100%"
          height={HEIGHT * 0.134}
          onPress={() => SheetManager.show('authentication-sheet')}
        >
          <Heading fontSize={`${spacing[24]}px`} color="white">
            {en.onboarding.getStarted}
          </Heading>
        </Pressable>
      </Flex>
    </Container>
  );
}
