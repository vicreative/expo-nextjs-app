import React from 'react';
import Checkbox from 'expo-checkbox';
import { StyleSheet } from 'react-native';
import { HStack, Pressable, Stack, Text } from 'native-base';
import spacing from 'app/config/theme/spacing';
import colors from 'app/config/theme/colors';
import { Platform } from 'react-native';

const CheckBox = ({ label, value, onChange, ...rest }) => {
  return (
    <Pressable onPress={onChange}>
      <HStack alignItems="center" justifyContent="space-between">
        <Text>{label}</Text>
        <Checkbox
          style={styles.checkbox(value)}
          value={value}
          onValueChange={onChange}
          color={value ? colors.primary[600] : undefined}
          {...rest}
        />
      </HStack>
    </Pressable>
  );
};

export default CheckBox;

export const CheckBoxGroup = ({ value, onChange = () => {} }) => {
  const handleChange = selectedItem => {
    const updatedItems = value?.map(item => {
      return selectedItem.uuid === item.uuid ? { ...item, isChecked: !item.isChecked } : item;
    });

    onChange(selectedItem, updatedItems);
  };

  return (
    <Stack space={{ base: `${spacing[12]}px`, sm: `${spacing[16]}px` }}>
      {value?.map(item => (
        <CheckBox
          key={item.uuid}
          label={item.name}
          value={item.isChecked}
          onChange={() => handleChange(item)}
        />
      ))}
    </Stack>
  );
};

const styles = StyleSheet.create({
  checkbox: isChecked => ({
    borderWidth: Platform.OS === 'web' ? 1.5 : 1,
    borderColor: isChecked ? colors.primary[600] : colors.gray[300],
    borderRadius: spacing[4]
  })
});
