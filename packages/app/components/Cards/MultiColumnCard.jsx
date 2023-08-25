import { Entypo, Feather } from '@expo/vector-icons';
import Touchable from 'app/components/Gestures/Touchable';
import colors from 'app/config/theme/colors';
import spacing from 'app/config/theme/spacing';
import { Box, Divider, Flex, HStack, Icon, Stack, Text } from 'native-base';
import { ActivityIndicator } from 'react-native';

export default function MultiColumnCard({ data = [] }) {
  return (
    <Stack borderWidth={1} borderColor="gray.100" borderRadius={`${spacing[20]}px`}>
      {data.map((item, index) => {
        const isLastItemInBatch = index === data.length - 1;
        return (
          item && (
            <Box key={index}>
              <Touchable
                onPress={() => {
                  if (typeof item.onPress === 'function') {
                    item.onPress();
                  }
                }}
                flexDirection="row"
                alignItems="center"
                isDisabled={item.disabled}
                opacity={item.disabled ? 0.5 : 1}
              >
                <Box w="18%" pl={`${spacing[20]}px`} py={`${spacing[16]}px`}>
                  {item.icon && (
                    <Flex
                      bg={item.iconBackgroundColor ? item.iconBackgroundColor : 'primary.100'}
                      alignItems="center"
                      justifyContent="center"
                      borderRadius="full"
                      w={`${spacing[32]}px`}
                      h={`${spacing[32]}px`}
                    >
                      {item.icon}
                    </Flex>
                  )}
                </Box>

                <Box w="82%">
                  <HStack
                    alignItems="center"
                    justifyContent="space-between"
                    pr={`${spacing[20]}px`}
                    py={`${spacing[16]}px`}
                  >
                    <Text fontFamily="Satoshi-Medium">{item.name}</Text>

                    {item.rightElement ? (
                      item.rightElement
                    ) : item.loading ? (
                      <ActivityIndicator
                        animating={true}
                        size={'small'}
                        color={colors.primary[600]}
                      />
                    ) : (
                      <Icon
                        as={item.disabled ? Feather : Entypo}
                        name={item.disabled ? 'lock' : 'chevron-thin-right'}
                        color="gray.500"
                        size={`${spacing[20]}px`}
                      />
                    )}
                  </HStack>
                  {!isLastItemInBatch && <Divider bg="gray.100" thickness="1" />}
                </Box>
              </Touchable>
            </Box>
          )
        );
      })}
    </Stack>
  );
}
