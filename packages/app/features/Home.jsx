import { Center, Heading, Text } from 'native-base';

export default function Home() {
  return (
    <Center height="100%">
      <Heading fontSize="40px" textAlign="center" pb="16px">
        Welcome!
      </Heading>
      <Text fontFamily="Satoshi-Medium" fontSize="26px" color="gray.400" textAlign="center">
        Expo + Next.js application built using Expo Router.
      </Text>
    </Center>
  );
}
