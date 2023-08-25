import { Button } from 'app/components/index';
import { Box, Flex, Heading, HStack, Text, VStack } from 'native-base';
import spacing from 'app/config/theme/spacing';
import Modal from './Modal';
import ErrorIcon from './Icons/ErrorIcon';
import useDimensions from 'app/hooks/useDimensions';
import { Platform } from 'react-native';
import { useRouter } from 'solito/router';
let useNavigation = () => {};

if (Platform.OS !== 'web') {
  useNavigation = require('@react-navigation/native').useNavigation;
}

export default function ErrorState({
  isModal = true,
  size = 'lg',
  title,
  text,
  btnText,
  onDismiss,
  onGoBack
}) {
  const navigation = useNavigation();
  const { replace } = useRouter();

  const {
    screen: { height }
  } = useDimensions();

  const handleGoBack = () => {
    if (typeof onGoBack === 'function') {
      if (Platform.OS !== 'web' && !navigation.canGoBack()) {
        replace('/', undefined, {
          experimental: {
            nativeBehavior: 'stack-replace'
          }
        });
      } else {
        onGoBack();
      }
    }
  };

  return isModal ? (
    <Modal
      visible
      bg={{ base: size === 'sm' ? 'transparent' : 'white', sm: 'transparent' }}
      px={0}
      pt={0}
      m={0}
      maxW="100%"
    >
      <Flex
        width="100%"
        height="100%"
        justifyContent={{
          base: size === 'sm' ? 'flex-end' : 'center',
          sm: 'center'
        }}
        px={size === 'sm' ? `${spacing[24]}px` : 0}
        pb={size === 'sm' ? `${spacing[50]}px` : 0}
        alignItems="center"
      >
        <Flex
          width="100%"
          height={{ base: size === 'sm' ? 'auto' : '100%', sm: '100%' }}
          maxWidth={{ base: '100%', sm: '420px' }}
          maxHeight={{ base: '100%', sm: '540px' }}
          shadow={{ base: 'none', sm: 2 }}
          borderRadius={{
            base: size === 'sm' ? spacing[20] : 0,
            sm: `${spacing[16]}px`
          }}
          bg="white"
          flexDirection="column"
          justifyContent="space-between"
          alignItems="center"
          px={{ base: `${spacing[24]}px`, sm: `${spacing[40]}px` }}
          py={{
            base: size === 'sm' ? `${spacing[24]}px` : `${spacing[40]}px`,
            sm: `${spacing[40]}px`
          }}
        >
          <VStack
            justifyContent="center"
            alignItems="center"
            mt={{
              base: size === 'sm' ? spacing[30] : height * 0.22,
              sm: spacing[100]
            }}
          >
            <ErrorIcon />

            <Heading
              fontSize={`${spacing[26]}px`}
              textAlign="center"
              maxW={spacing[100] * 3.11}
              mt={spacing[30]}
            >
              {title}
            </Heading>

            {text && (
              <Text pt={`${spacing[26]}px`} textAlign="center" maxW={spacing[100] * 3.11}>
                {text}
              </Text>
            )}
          </VStack>

          {btnText && (
            <Box w="100%" pt={`${spacing[50]}px`}>
              <Button colorScheme={'secondary'} onPress={onDismiss}>
                {btnText}
              </Button>
            </Box>
          )}
        </Flex>
      </Flex>
    </Modal>
  ) : (
    <Flex
      width="100%"
      justifyContent="center"
      alignItems="center"
      px={`${spacing[24]}px`}
      pt={`${spacing[40]}px`}
    >
      <ErrorIcon />

      <Heading
        fontSize={`${spacing[26]}px`}
        textAlign="center"
        maxW={spacing[100] * 3.11}
        mt={spacing[30]}
      >
        {title}
      </Heading>

      {text && (
        <Text pt={`${spacing[26]}px`} textAlign="center" maxW={spacing[100] * 3.11}>
          {text}
        </Text>
      )}

      {btnText && (
        <HStack space={`${spacing[14]}px`} pt={`${spacing[40]}px`}>
          {onGoBack && (
            <Button
              variant="outline"
              colorScheme={'secondary'}
              fontFamily="Satoshi-Medium"
              size="md"
              onPress={handleGoBack}
            >
              Go Back
            </Button>
          )}
          <Button
            colorScheme={'secondary'}
            fontFamily="Satoshi-Medium"
            size="md"
            onPress={onDismiss}
          >
            {btnText}
          </Button>
        </HStack>
      )}
    </Flex>
  );
}
