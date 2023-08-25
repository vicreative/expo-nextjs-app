import spacing from 'app/config/theme/spacing';
import useWindow from 'app/hooks/useWindow';
import { isFunction } from 'formik';
import { Box, HStack, Pressable, Stack, Text } from 'native-base';
import { Platform } from 'react-native';

export default function Tabs({
  activeIndex = 0,
  fontSize = `${spacing[16]}px`,
  tabWidth = '100%',
  onChange = () => {},
  children,
  hasRouteSupport = false,
  data
}) {
  const window = useWindow();
  return (
    <Stack>
      <Box overflow="scroll">
        <HStack borderBottomWidth={1} borderBottomColor={'gray.100'} width={tabWidth}>
          {data?.map((item, index) => {
            const isFocused = hasRouteSupport
              ? Platform.OS === 'web' &&
                (window?.location?.pathname === item.href ||
                  window?.location?.pathname.includes(item.href))
              : activeIndex === index;
            return (
              <Pressable
                key={index}
                borderBottomWidth={isFocused ? 2 : 0}
                borderBottomColor={isFocused ? 'primary.600' : 'gray.100'}
                pb={`${spacing[18]}px`}
                onPress={() => {
                  if (isFunction(item.onPress)) {
                    item.onPress(index, item.href);
                  } else {
                    onChange(index, item.href);
                  }
                }}
                mx={index === 0 ? 0 : `${spacing[10]}px`}
                px={`${spacing[4]}px`}
                isDisabled={item.disabled}
              >
                <Text
                  fontSize={fontSize}
                  fontFamily={isFocused ? 'Satoshi-Bold' : 'Satoshi-Medium'}
                  color={isFocused ? 'primary.600' : item.disabled ? 'gray.200' : 'gray.500'}
                >
                  {item.title}
                </Text>
              </Pressable>
            );
          })}
        </HStack>
      </Box>
      {children}
    </Stack>
  );
}
