import spacing from 'app/config/theme/spacing';
import { HStack, Pressable, Text } from 'native-base';

export default function ButtonGroup({
  data = [],
  selected,
  fontSize = `${spacing[16]}px`,
  padding = `${spacing[4]}px`,
  onChange = () => {}
}) {
  return (
    <HStack
      bg="gray.50"
      borderWidth={1}
      borderColor="gray.100"
      padding={padding}
      borderRadius={`${spacing[8]}px`}
      alignItems="center"
      justifyContent="space-between"
      width="100%"
    >
      {data.map(btn => {
        return (
          <Pressable
            key={btn.id}
            width={`${100 / data.length - 1}%`}
            bg={selected === btn.id ? 'white' : 'transparent'}
            alignItems="center"
            py={`${spacing[8]}px`}
            borderRadius={`${spacing[6]}px`}
            onPress={() => onChange(btn.id)}
          >
            <Text
              fontSize={fontSize}
              fontFamily={selected === btn.id ? 'Satoshi-Bold' : 'Satoshi-Regular'}
            >
              {btn.title}
            </Text>
          </Pressable>
        );
      })}
    </HStack>
  );
}
