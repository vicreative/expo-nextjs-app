import { Ionicons } from '@expo/vector-icons';
import { Button } from 'app/components/index';
import spacing from 'app/config/theme/spacing';
import en from 'app/i18n/index';
import { HStack, Icon, Stack, Text } from 'native-base';

function VirtualBankCard({ bankName, accountNumber, onCopy = () => {} }) {
  return (
    <Stack
      borderWidth={1}
      borderColor="gray.100"
      borderRadius={`${spacing[20]}px`}
      p={`${spacing[24]}px`}
      shadow={5}
      bg="white"
    >
      <HStack alignItems="center" justifyContent="space-between" pb={`${spacing[8]}px`}>
        <Text fontSize={`${spacing[18]}px`} color="gray.300">
          {bankName}
        </Text>
        <Button
          variant="subtle"
          size="sm"
          minH={`${spacing[36]}px`}
          minW={`${spacing[100] * 1.18}px`}
          colorScheme="secondary"
          bg="gray.50"
          _pressed={{ bg: 'gray.100' }}
          fontFamily="Satoshi-Medium"
          leftIcon={
            <Icon as={Ionicons} name="copy-outline" size={`${spacing[18]}px`} color="primary.700" />
          }
          onPress={onCopy}
        >
          {en.profile.fundWallet.virtualCard.copy}
        </Button>
      </HStack>
      <Text fontSize={`${spacing[24]}px`} pb={`${spacing[30]}px`} fontFamily="Satoshi-Medium">
        {accountNumber}
      </Text>
      <Text fontSize={`${spacing[14]}px`} color="gray.300">
        {en.profile.fundWallet.virtualCard.tip}
      </Text>
    </Stack>
  );
}

export default VirtualBankCard;
