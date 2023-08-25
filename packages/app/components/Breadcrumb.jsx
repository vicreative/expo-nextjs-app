import React from 'react';
import { HStack } from 'native-base';
import Link from './Link';
import { Feather } from '@expo/vector-icons';
import spacing from 'app/config/theme/spacing';
import colors from 'app/config/theme/colors';
import Button from './Button';

export default function Breadcrumb({
  data = [],
  variant,
  as = 'link',
  background,
  arrowColor = colors.gray[300],
  ...rest
}) {
  return (
    <HStack space="8px" overflow="auto" {...rest}>
      {as === 'link'
        ? data.map((item, index) => {
            const isLastItemInBatch = index == data.length - 1;

            return (
              <HStack key={item.id} space="4px" alignItems="center">
                <Link
                  href={item.url}
                  textDecoration="none"
                  _hover={{
                    textDecoration: 'none'
                  }}
                  _focus={{
                    textDecoration: 'none'
                  }}
                  fontSize={`${spacing[14]}px`}
                  color="gray.500"
                  py={`${spacing[4]}px`}
                  px={`${spacing[8]}px`}
                  borderRadius="6px"
                  activeStyle={{
                    cursor: 'default',
                    background: variant === 'accent' ? colors.primary[50] : 'white',
                    color: colors.primary[700]
                  }}
                >
                  {item.name}
                </Link>
                {!isLastItemInBatch && (
                  <Feather name="chevron-right" color={arrowColor} size={`${spacing[16]}px`} />
                )}
              </HStack>
            );
          })
        : as === 'button'
        ? data.map((item, index) => {
            const isLastItemInBatch = index == data.length - 1;

            return (
              <HStack key={item.id} space="4px" alignItems="center">
                <Button
                  colorScheme={isLastItemInBatch ? 'purple' : 'secondary'}
                  variant={isLastItemInBatch ? 'subtle' : 'unstyled'}
                  onPress={item.onPress}
                  size="sm"
                  borderRadius="6px"
                  cursor={isLastItemInBatch ? 'default' : 'pointer'}
                  background={
                    variant === 'accent'
                      ? isLastItemInBatch
                        ? colors.primary[50]
                        : 'white'
                      : isLastItemInBatch
                      ? 'white'
                      : background
                      ? background
                      : 'white'
                  }
                  _text={{
                    color: isLastItemInBatch ? 'primary.700' : 'gray.500',
                    fontFamily: 'Satoshi-Medium'
                  }}
                >
                  {item.name}
                </Button>
                {!isLastItemInBatch && (
                  <Feather name="chevron-right" color={arrowColor} size={`${spacing[16]}px`} />
                )}
              </HStack>
            );
          })
        : null}
    </HStack>
  );
}
