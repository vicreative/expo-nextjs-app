import spacing from 'app/config/theme/spacing';
import useDimensions from 'app/hooks/useDimensions';
import { Box, Divider, Flex, Heading, Hidden, Icon, Text, VStack } from 'native-base';
import Touchable from '../Gestures/Touchable';
import Modal from 'app/components/Modal';
import { Button } from '..';
import { AntDesign } from '@expo/vector-icons';
import { PasscodeLockIcon } from 'app/components/Icons/Lock';
import { useState } from 'react';
import en from 'app/i18n/index';

function CreatePinCard({ color = 'white', backgroundColor = 'base.black', onPress = () => {} }) {
  const [isVisible, setIsVisible] = useState(true);
  const {
    window: { width }
  } = useDimensions();

  const handleClose = () => {
    setIsVisible(false);
  };
  return (
    <>
      {/* larger device(tablet & desktop) for web only */}
      <Hidden only="base">
        <Modal
          closeOnOverlayClick
          bg="transparent"
          animationType="fade"
          visible={isVisible}
          onClose={handleClose}
          px={`${spacing[24]}px`}
          alignItems="center"
          justifyContent="center"
        >
          <VStack
            w="100%"
            maxW="464px"
            height="auto"
            overflow="scroll"
            bg="white"
            px={`${spacing[32]}px`}
            py={`${spacing[50]}px`}
            borderTopRadius={`${spacing[20]}px`}
            borderBottomRadius={`${spacing[20]}px`}
            alignItems="center"
            justifyContent="center"
          >
            <Flex position="absolute" top="10px" right="10px" zIndex={10000}>
              <Button variant="unstyled" size="sm" onPress={handleClose}>
                <Icon as={AntDesign} name="close" size={`${spacing[20]}px`} color="gray.300" />
              </Button>
            </Flex>
            <VStack
              width="72px"
              height="72px"
              alignItems="center"
              justifyContent="center"
              mb={`${spacing[42]}px`}
              bg="primary.100"
              borderRadius="full"
            >
              <PasscodeLockIcon />
            </VStack>
            <Heading fontSize={`${spacing[20]}px`} mb={`${spacing[16]}px`}>
              {en.profile.security.info.pin.popup.heading}
            </Heading>
            <Text
              fontSize={`${spacing[16]}px`}
              color="gray.300"
              textAlign="center"
              mb={`${spacing[42]}px`}
            >
              {en.profile.security.info.pin.popup.content}
            </Text>
            <Box width="100%">
              <Button
                width="100%"
                variant="solid"
                colorScheme="secondary"
                size="md"
                onPress={onPress}
              >
                {en.profile.security.info.pin.popup.btn}
              </Button>
            </Box>
          </VStack>
        </Modal>
      </Hidden>
      {/* smaller device(mobile phones)for web & mobile app */}
      <Hidden from="sm">
        <VStack
          position="absolute"
          _web={{ position: 'fixed', maxWidth: '400px' }}
          bottom={spacing[20]}
          width={width}
          p={spacing[24]}
        >
          <Touchable
            onPress={onPress}
            bg={backgroundColor}
            shadow={5}
            flexDirection="row"
            borderRadius={spacing[16]}
            py={spacing[20]}
            px={spacing[16]}
            width="100%"
            justifyContent="space-between"
          >
            <Box w="6%">
              <Divider
                orientation="vertical"
                bg="warning.500"
                thickness="4"
                // mr={spacing[20]}
                borderRadius={spacing[20]}
              />
            </Box>
            <VStack w="94%">
              <Heading fontSize={`${spacing[20]}px`} color={color} mb={spacing[10]}>
                {en.profile.security.info.pin.popup.heading}
              </Heading>
              <Text fontSize={`${spacing[16]}px`} color={color}>
                {en.profile.security.info.pin.popup.content}
              </Text>
            </VStack>
          </Touchable>
        </VStack>
      </Hidden>
    </>
  );
}

export default CreatePinCard;
