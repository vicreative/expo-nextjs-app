import { Entypo } from '@expo/vector-icons';
import spacing from 'app/config/theme/spacing';
import { isFunction } from 'formik';
import { HStack, Text, Icon, Stack, Spinner } from 'native-base';
import Touchable from './Gestures/Touchable';

const OptionGroup = ({
  selected,
  hasRightIcon = true,
  fontSize = `${spacing[16]}px`,
  bg = 'white',
  borderColor = 'gray.500',
  px = `${spacing[18]}px`,
  py = `${spacing[24]}px`,
  space = `${spacing[24]}px`,
  onChange = () => {},
  options = []
}) => {
  const handleChange = (id, index, onPress) => {
    onChange(id, index);
    if (isFunction(onPress)) {
      onPress(id, index);
    }
  };

  return (
    <Stack space={space}>
      {options.map((option, index) => (
        <Touchable
          key={option.id}
          borderWidth={selected === option.id ? 1.5 : 1}
          borderColor={selected === option.id ? 'primary.600' : borderColor}
          bg={bg}
          px={px}
          py={py}
          borderRadius={`${spacing[10]}px`}
          flexDirection="row"
          width="100%"
          justifyContent="space-between"
          isDisabled={option.disabled}
          opacity={option.disabled ? 0.5 : 1}
          onPress={() => handleChange(option.id, index, option.onPress)}
        >
          <HStack space={`${spacing[20]}px`}>
            {option.icon}
            <Stack>
              <Text fontFamily="Satoshi-Medium" fontSize={fontSize}>
                {option.title}
              </Text>
              {option.content && (
                <Text
                  fontFamily="Satoshi-Medium"
                  color="primary.700"
                  fontSize={fontSize}
                  mt={`${spacing[18]}px`}
                >
                  {option.content}
                </Text>
              )}
              {option.comingSoon && (
                <HStack
                  borderWidth={1}
                  borderColor={'gray.500'}
                  borderRadius="100px"
                  alignItems="center"
                  justifyContent="center"
                  width={`${spacing[100] * 0.9}px`}
                  mt={`${spacing[18]}px`}
                >
                  <Text fontFamily="Satoshi-Medium" color="gray.500" fontSize={`${spacing[12]}px`}>
                    Coming Soon!
                  </Text>
                </HStack>
              )}
              {option.extraComponent && option.extraComponent}
            </Stack>
          </HStack>
          {option.isLoading ? (
            <Spinner size="sm" />
          ) : (
            !option.disabled &&
            hasRightIcon && (
              <Icon
                as={Entypo}
                name="chevron-thin-right"
                size={`${spacing[20]}px`}
                color="gray.500"
              />
            )
          )}
        </Touchable>
      ))}
    </Stack>
  );
};
export default OptionGroup;
