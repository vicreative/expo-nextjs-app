import { Ionicons, Octicons } from '@expo/vector-icons';
import { Icon, Pressable } from 'native-base';
import Input from './Input';

export default function SearchInput({
  variant = 'outline',
  size = 'md',
  placeholder = 'Search',
  value,
  onSearchChange = () => {},
  onClear = () => {},
  onSearch = () => {},
  ...rest
}) {
  return (
    <Input
      variant={variant}
      size={size}
      placeholder={placeholder}
      value={value}
      onChangeText={onSearchChange}
      InputLeftElement={
        <Pressable onPress={onSearch} height="full" justifyContent="center">
          <Icon as={Octicons} name="search" size={18} />
        </Pressable>
      }
      InputRightElement={
        value.length > 0 && (
          <Pressable
            onPress={onClear}
            width={6}
            height="full"
            alignItems="flex-end"
            justifyContent="center"
          >
            <Icon as={Ionicons} name="close" size={18} />
          </Pressable>
        )
      }
      width="100%"
      {...rest}
    />
  );
}
