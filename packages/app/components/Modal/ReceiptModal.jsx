import { AntDesign, Feather } from '@expo/vector-icons';
import Touchable from 'app/components/Gestures/Touchable';
import spacing from 'app/config/theme/spacing';
import { STATUS_BAR_HEIGHT } from 'app/constants/index';
import Receipt from 'app/features/Home/components/Trips/components/Receipt';
import useDimensions from 'app/hooks/useDimensions';
import en from 'app/i18n/index';
import { Box, Flex, Heading, HStack, Icon, ScrollView } from 'native-base';
import { Button } from '..';
import Modal from './index';

function ReceiptModal({ isTicket, visible = false, data, onClose = () => {} }) {
  const {
    window: { width: WIDTH },
    screen: { height: SCREEN_HEIGHT }
  } = useDimensions();
  return (
    <Modal
      isDrawer
      animationType="fade"
      visible={visible}
      onClose={onClose}
      bg="transparent"
      statusBarBackgroundColor="transparent"
      justifyContent="flex-end"
      pt={0}
      px={0}
      maxWidth={{ base: '100%', sm: '400px' }}
    >
      <Box
        bg="white"
        borderTopRadius={{ base: 0, sm: `${spacing[20]}px` }}
        height={{ base: SCREEN_HEIGHT, sm: '100%' }}
        _web={{ height: { base: '100%', sm: '100%' } }}
        shadow={5}
      >
        {/* Header */}

        <Flex
          width="100%"
          bg={'primary.100'}
          pt={STATUS_BAR_HEIGHT + SCREEN_HEIGHT * 0.01}
          pb={SCREEN_HEIGHT * 0.014}
          px={spacing[20]}
          zIndex={1000}
          minHeight={`${SCREEN_HEIGHT * 0.1117}px`}
          justifyContent="center"
          _web={{
            position: 'fixed',
            top: 0,
            pt: 0,
            pb: 0
          }}
        >
          <HStack justifyContent="space-between" alignItems="center" width="100%">
            <Button onPress={onClose} p={0} size="sm" variant="unstyled">
              <Icon as={Feather} name="arrow-left" size={`${spacing[24]}px`} color={'gray.500'} />
            </Button>

            <Heading
              maxWidth={WIDTH * 0.6}
              fontSize={`${spacing[16]}px`}
              color={'gray.500'}
              noOfLines={1}
            >
              {isTicket
                ? en.profile.trips.info.ticket.headerTitle
                : en.profile.transactions.info.receipt.headerTitle}
            </Heading>

            <Touchable onPress={onClose}>
              <Icon
                as={AntDesign}
                name="closecircleo"
                size={`${spacing[24]}px`}
                color={'gray.500'}
              />
            </Touchable>
          </HStack>
        </Flex>
        {/* Body */}
        <ScrollView
          keyboardShouldPersistTaps="always"
          showsVerticalScrollIndicator={false}
          keyboardDismissMode="interactive"
        >
          <Box _web={{ pt: `${spacing[100]}px` }} w="100%">
            <Receipt data={data} isTicket={isTicket} />
          </Box>
        </ScrollView>
      </Box>
    </Modal>
  );
}

export default ReceiptModal;
