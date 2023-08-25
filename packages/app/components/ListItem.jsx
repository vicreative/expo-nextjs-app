import { Icon, Text, Flex } from 'native-base';
import spacing from 'app/config/theme/spacing';
import { Entypo } from '@expo/vector-icons';

export default function ListItem({ children, ...rest }) {
  return (
    <Flex flexDirection="row" w="100%" alignItems="flex-start" justifyContent="space-between">
      <Flex width="6%">
        <Icon as={Entypo} name="dot-single" color="gray.500" size={`${spacing[20]}px`} />
      </Flex>
      <Text width="93%" {...rest}>
        {children}
      </Text>
    </Flex>
  );
}
