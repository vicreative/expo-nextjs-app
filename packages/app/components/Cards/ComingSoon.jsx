import { SimpleLineIcons } from '@expo/vector-icons';
import spacing from 'app/config/theme/spacing';
import { HStack, Icon, Text } from 'native-base';

export function ComingSoonOverlay({
  p = `${spacing[24]}px`,
  bg = 'white',
  borderRadius = `${spacing[20]}px`,
  borderColor = 'gray.100',
  shadow = 5,
  borderWidth = 1,
  flexDirection = 'column',
  size,
  ...rest
}) {
  return (
    <HStack
      space={`${spacing[4]}px`}
      flexDirection={flexDirection}
      alignItems="center"
      justifyContent="center"
      width="100%"
      position="absolute"
      h="100%"
      p={p}
      bg={bg}
      borderRadius={borderRadius}
      borderColor={borderColor}
      shadow={shadow}
      borderWidth={borderWidth}
      {...rest}
    >
      <Icon
        as={SimpleLineIcons}
        name={'lock'}
        color={'gray.500'}
        size={size === 'xs' ? `${spacing[20]}px` : `${spacing[24]}px`}
      />

      <Text
        fontFamily="Satoshi-Medium"
        textAlign={flexDirection === 'row' ? 'left' : 'center'}
        fontSize={size === 'xs' ? `${spacing[16]}px` : `${spacing[24]}px`}
      >
        Coming Soon
      </Text>
    </HStack>
  );
}
