import { AntDesign } from '@expo/vector-icons';
import spacing from 'app/config/theme/spacing';
import { HStack, Icon, Text } from 'native-base';
import Button from './Button';

const Counter = ({ counter, minimumValue, maximumValue, onIncrement, onDecrement }) => {
  const incrementCounter = () => {
    if (counter < maximumValue) {
      onIncrement();
    }
  };
  const decrementCounter = () => {
    if (counter > minimumValue) {
      onDecrement();
    }
  };
  return (
    <HStack alignItems="center">
      <Button onPress={decrementCounter} p={0} size="sm" variant="unstyled">
        <Icon
          as={AntDesign}
          name="minuscircleo"
          color={counter === minimumValue ? 'gray.100' : 'primary.600'}
          size={`${spacing[24]}px`}
        />
      </Button>

      <Text fontSize={`${spacing[16]}px`} color="gray.500" mx={`${spacing[16]}px`}>
        {counter}
      </Text>

      <Button onPress={incrementCounter} p={0} size="sm" variant="unstyled">
        <Icon
          as={AntDesign}
          name="pluscircle"
          color={counter === maximumValue ? 'gray.100' : 'primary.600'}
          size={`${spacing[24]}px`}
        />
      </Button>
    </HStack>
  );
};
export default Counter;
