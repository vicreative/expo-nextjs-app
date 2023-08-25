import { AntDesign } from '@expo/vector-icons';
import { Logo } from 'app/components/Icons/Logo';
import spacing from 'app/config/theme/spacing';
import en from 'app/i18n/index';
import { Box, Center, Flex, Heading, Hidden, HStack, Icon, Text } from 'native-base';
import { useState } from 'react';

export default function QrCodeCard() {
  const [show, setShow] = useState(true);
  return (
    show && (
      <Hidden only="base">
        <Center width="100%">
          <Flex
            flexDirection="row"
            justifyContent="flex-end"
            alignItems="center"
            width="100%"
            maxWidth="1440px"
          >
            <Flex
              mr={`${spacing[24]}px`}
              zIndex={1000}
              py={10}
              px={14}
              bg="white"
              borderRadius={`${spacing[6]}px`}
              position="fixed"
              bottom={20}
              style={{ boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }}
            >
              <Icon
                as={AntDesign}
                name="close"
                size={`${spacing[16]}px`}
                alignSelf="flex-end"
                position="absolute"
                onPress={() => setShow(!show)}
              />
              <div id="my_qr_code_div_id" />
              <HStack space={`${spacing[16]}px`} pt={`${spacing[10]}px`}>
                <Logo width={`${spacing[20]}px`} height={`${spacing[20]}px`} />
                <Box>
                  <Heading fontSize={`${spacing[12]}px`}>{en.footer.downloadApp.title}</Heading>
                  <Text fontSize={`${spacing[12]}px`}>{en.footer.downloadApp.description}</Text>
                </Box>
              </HStack>
            </Flex>
          </Flex>
        </Center>
      </Hidden>
    )
  );
}
