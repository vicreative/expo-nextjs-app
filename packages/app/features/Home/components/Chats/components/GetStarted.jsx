import React from 'react';
import { Box, Flex, HStack, ScrollView, Text } from 'native-base';
import en from 'app/i18n/index';
import spacing from 'app/config/theme/spacing';
import { resolveAssetsUrl } from 'app/utils/index';
import { Button, Image } from 'app/components/index';
import { useRouter } from 'solito/router';
import useDimensions from 'app/hooks/useDimensions';
import colors from 'app/config/theme/colors';
import { NotificationIconWithCount } from 'app/components/NotificationCount';

function GetStarted() {
  const { push } = useRouter();
  const {
    screen: { height: SCREEN_HEIGHT }
  } = useDimensions();

  const createGroupChat = () => {
    push('/chats/create-group');
  };
  return (
    <Box pt={`${spacing[20]}px`} px={`${spacing[24]}px`}>
      <HStack alignItems="center" justifyContent="space-between">
        <Text fontFamily="Satoshi-Medium" fontSize={`${spacing[30]}px`}>
          {en.chats.heading}
        </Text>

        <NotificationIconWithCount />
      </HStack>
      <ScrollView pt={`${spacing[40]}px`} bounces={false} showsVerticalScrollIndicator={false}>
        <Flex alignItems="center">
          <Box
            width="100%"
            maxWidth={spacing[100] * 3.66}
            height={spacing[100] * 2.47}
            mb={`${SCREEN_HEIGHT * 0.052}px`}
          >
            <Image
              width="100%"
              height="100%"
              resizeMode="contain"
              source={{
                uri: resolveAssetsUrl('road-trip.png')
              }}
              alt="Chat Illustration"
              backgroundColor={colors.primary[50]}
              borderRadius={spacing[20]}
            />
          </Box>
          <Text
            fontFamily="Satoshi-Medium"
            fontSize={`${spacing[24]}px`}
            textAlign="center"
            maxW={`${spacing[100] * 2.97}px`}
          >
            {en.chats.nodata.heading}
          </Text>
          <Text color="gray.300" textAlign="center" mt={`${spacing[20]}px`}>
            {en.chats.nodata.message}
          </Text>
        </Flex>
        <Button
          size="xl"
          colorScheme="secondary"
          width="100%"
          maxWidth={spacing[100] * 3.66}
          alignSelf="center"
          mt={`${SCREEN_HEIGHT * 0.079}px`}
          onPress={createGroupChat}
          mb={`${SCREEN_HEIGHT * 0.079}px`}
        >
          {en.chats.nodata.btnText}
        </Button>
      </ScrollView>
    </Box>
  );
}

export default GetStarted;
