import NotFoundIcon from 'app/components/Icons/NotFound';
import en from 'app/i18n';
import { Container, Text, Center, Button, Hidden, Box } from 'native-base';
import { useRouter } from 'solito/router';

export default function NotFound() {
  const { back } = useRouter();

  const goToHomeScreen = () => {
    back();
  };

  return (
    <>
      {/* for web only (desktop web, ios & android web) */}
      <Hidden platform={['android', 'ios']}>
        <Container px={20} maxWidth="100%" height="100%">
          <Center height="100%" width="100%">
            <Box
              width={{ base: '240px', sm: '340px', md: '400px' }}
              height={{ base: '240px', sm: '340px', md: '400px' }}
            >
              <NotFoundIcon width="100%" height="100%" />
            </Box>
            <Text fontSize={24} pb={10} textAlign="center" fontFamily="Satoshi-Bold">
              {en.notFound.heading}
            </Text>
            <Text maxW="400px" pb={20} color="gray.400" textAlign="center">
              {en.notFound.subheading}
            </Text>
            <Button variant="solid" colorScheme="secondary" onPress={goToHomeScreen}>
              {en.notFound.btn}
            </Button>
          </Center>
        </Container>
      </Hidden>
      {/* for ios and android devices */}
      <Hidden platform={['web']}>
        <Container px={20} maxWidth="100%" height="100%">
          <Center height="100%" width="100%">
            <Box
              width={{ base: '240px', sm: '340px', md: '400px' }}
              height={{ base: '240px', sm: '340px', md: '400px' }}
            >
              <NotFoundIcon width="100%" height="100%" />
            </Box>
            <Text fontSize={24} pb={10} textAlign="center" fontFamily="Satoshi-Bold">
              {en.notFound.heading}
            </Text>
            <Text maxW="400px" pb={20} color="gray.400" textAlign="center">
              {en.notFound.subheading}
            </Text>
            <Button variant="solid" colorScheme="secondary" onPress={goToHomeScreen}>
              {en.notFound.btn}
            </Button>
          </Center>
        </Container>
      </Hidden>
    </>
  );
}
