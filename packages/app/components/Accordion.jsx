import { Entypo } from '@expo/vector-icons';
import spacing from 'app/config/theme/spacing';
import { HStack, Icon, Pressable, Stack, Text } from 'native-base';
import { useState } from 'react';

export default function Accordion({ activeIndex = 0, onChange = () => {}, data = [] }) {
  const [isActive, setIsActive] = useState(true);

  const handleChange = index => {
    if (index === activeIndex) {
      setIsActive(!isActive);
    } else {
      setIsActive(true);
    }
    onChange(index);
  };

  return (
    <Stack space={`${spacing[14]}px`}>
      {data?.map(
        (item, index) =>
          item && (
            <Pressable
              key={index}
              onPress={() => handleChange(index)}
              borderWidth={1}
              borderColor="gray.100"
              borderRadius={`${spacing[10]}px`}
              width="100%"
              py={{ base: `${spacing[16]}px`, sm: `${spacing[24]}px` }}
              px={{ base: `${spacing[16]}px`, sm: `${spacing[24]}px` }}
            >
              <HStack justifyContent="space-between">
                {item.headerTitle ? (
                  item.headerTitle
                ) : (
                  <Text fontFamily="Satoshi-Medium" maxWidth="90%">
                    {item.title?.toUpperCase()}
                  </Text>
                )}
                <Icon
                  maxWidth="10%"
                  as={Entypo}
                  name={activeIndex === index && isActive ? 'chevron-up' : 'chevron-down'}
                  size={'20px'}
                  color="gray.500"
                />
              </HStack>
              {activeIndex === index && isActive && item.content}
            </Pressable>
          )
      )}
    </Stack>
  );
}
