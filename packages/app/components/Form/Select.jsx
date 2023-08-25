import { AntDesign, Entypo } from '@expo/vector-icons';
import { useKeyboard } from '@react-native-community/hooks';
import colors from 'app/config/theme/colors';
import spacing from 'app/config/theme/spacing';
import {
  Icon,
  Text,
  Pressable,
  Box,
  Flex,
  Hidden,
  Spinner,
  Heading,
  HStack,
  View
} from 'native-base';
import { memo, useCallback, useState } from 'react';
import { StyleSheet, Keyboard } from 'react-native';
import { Picker } from 'react-native-web';

import SearchInput from './SearchInput';
import Modal from 'app/components/Modal';
import { AlertCircle } from 'app/components/Icons/Alert';
import Touchable from 'app/components/Gestures/Touchable';
import FlashList from 'app/components/FlashList';
import useDimensions from 'app/hooks/useDimensions';

const Select = ({
  variant = 'outline',
  isInvalid,
  placeholder = 'Select an option',
  value = '',
  isDisabled,
  px = 14,
  pr,
  pl,
  size,
  width = '100%',
  height = `${spacing[44]}px`,
  fontSize = `${spacing[16]}px`,
  opacity,
  borderRadius,
  hideSearch = false,
  dropdownIconSize = '16px',
  dropdownPosition,
  isLoading,
  tip,
  label,
  tipBtn,
  errorMsg,
  isFocused = false,
  setIsFocused = () => {},
  dropdownIcon = isLoading ? (
    <Spinner size="sm" />
  ) : (
    <Icon as={Entypo} name="chevron-down" size={dropdownIconSize} color={colors.base.black} />
  ),
  containerStyle,
  onChange = () => {},
  options,
  onFocus = () => {},
  onBlur = () => {},
  ...rest
}) => {
  const {
    window: { width: WIDTH },
    screen: { height: SCREEN_HEIGHT }
  } = useDimensions();

  const keyboard = useKeyboard();
  const [searchValue, setSearchValue] = useState('');

  const filteredResult =
    searchValue === ''
      ? options
      : options?.filter(option => {
          const label = option.label.toString().toLowerCase();
          return label.includes(searchValue.toString().toLowerCase());
        });

  const handleChange = useCallback(
    option => {
      onChange(option.value);
      setIsFocused(false);
      setSearchValue('');
    },
    [onChange, setIsFocused]
  );

  const onPressInput = () => {
    if (keyboard.keyboardShown) {
      Keyboard.dismiss();
    }
    setIsFocused(true);
  };

  const renderItem = useCallback(
    ({ item, index }) => {
      return (
        <Box bg={value === item.value ? 'gray.50' : 'white'} px={`${spacing[20]}px`}>
          <Pressable
            onPress={() => handleChange(item)}
            height={`${spacing[64]}px`}
            justifyContent="center"
            borderTopWidth={index === 0 ? 0 : 1}
            borderTopColor="gray.50"
          >
            <Flex flexDirection="row" alignItems="center">
              {item?.leftIcon}
              <Text fontSize={`${spacing[16]}px`}>{item?.label}</Text>
              {item?.rightIcon}
            </Flex>
          </Pressable>
        </Box>
      );
    },
    [handleChange, value]
  );

  return (
    <>
      {/* for web only */}
      <Hidden platform={['ios', 'android']}>
        <Box>
          {label && (
            <>
              {/* larger device(tablet & desktop) for web only */}
              <Hidden only="base">
                <Text
                  fontFamily="Satoshi-Medium"
                  fontSize={`${spacing[14]}px`}
                  color="gray.500"
                  mb="6px"
                >
                  {label}
                </Text>
              </Hidden>
            </>
          )}
          <Box>
            <Picker
              onFocus={e => {
                setIsFocused(true);
                onFocus(e);
              }}
              onBlur={e => {
                setIsFocused(false);
                onBlur(e);
              }}
              selectedValue={value}
              onValueChange={itemValue => onChange(itemValue)}
              enabled={!isDisabled}
              style={[
                styles.select(
                  isFocused,
                  isInvalid,
                  width,
                  height,
                  px,
                  pr,
                  pl,
                  fontSize,
                  isDisabled,
                  opacity,
                  variant
                ),
                styles.unstyled(variant)
              ]}
            >
              <Picker.Item label={placeholder} value={''} />
              {filteredResult?.map((option, index) => (
                <Picker.Item key={index} label={option.label} value={option.value} />
              ))}
            </Picker>

            <Box
              position="absolute"
              top={size === 'sm' ? dropdownPosition : 14}
              right={size === 'sm' ? 5 : 14}
              bg="white"
              zIndex={1000}
            >
              {dropdownIcon}
            </Box>
            {tip || isInvalid ? (
              <Text
                fontSize={`${spacing[14]}px`}
                color={isInvalid ? 'error.500' : 'gray.300'}
                mt={tip ? `${spacing[10]}px` : `${spacing[4]}px`}
              >
                {isInvalid ? errorMsg : tip}
                {tipBtn}
              </Text>
            ) : null}
          </Box>
        </Box>
      </Hidden>
      {/* for mobile app only */}
      <Hidden platform={['web']}>
        <Box>
          <Pressable
            style={[
              styles.container(variant, isFocused, isInvalid, isDisabled, opacity, borderRadius),
              containerStyle
            ]}
            onPress={onPressInput}
            px={px}
            isDisabled={isDisabled}
            width={width}
            height={height}
            {...rest}
          >
            <Text
              color={value !== '' ? 'base.black' : 'gray.200'}
              fontSize={fontSize}
              noOfLines={1}
              w="94%"
            >
              {value !== ''
                ? filteredResult?.find(option => option.value === value)?.label
                : placeholder}
            </Text>

            <Flex justifyContent="center" alignItems="flex-end" h="100%" width="6%">
              {dropdownIcon}
            </Flex>
          </Pressable>
          {tip || isInvalid ? (
            <Text
              fontSize={`${spacing[14]}px`}
              color={isInvalid ? 'error.500' : 'gray.300'}
              mt={tip ? `${spacing[10]}px` : `${spacing[4]}px`}
            >
              {isInvalid ? errorMsg : tip}
              {tipBtn}
            </Text>
          ) : null}
        </Box>
        <Modal
          px={0}
          animationType="fade"
          bg="transparent"
          justifyContent="flex-end"
          visible={isFocused}
          onClose={() => {
            setIsFocused(!isFocused);
          }}
        >
          <Flex
            width="100%"
            height={hideSearch ? 'auto' : '90%'}
            maxHeight="90%"
            bg="white"
            borderTopRadius={`${spacing[20]}px`}
            shadow={5}
          >
            <HStack
              justifyContent="space-between"
              px={`${spacing[20]}px`}
              pt={`${spacing[38]}px`}
              pb={`${spacing[24]}px`}
              width="100%"
              borderBottomWidth={1}
              borderBottomColor="gray.100"
            >
              <Heading width="92%" fontSize={`${spacing[24]}px`}>
                {placeholder}
              </Heading>

              <Box width="8%">
                <Touchable
                  onPress={() => {
                    setIsFocused(!isFocused);
                  }}
                >
                  <Icon
                    as={AntDesign}
                    name="closecircleo"
                    size={`${spacing[30]}px`}
                    color={'gray.500'}
                  />
                </Touchable>
              </Box>
            </HStack>

            {!hideSearch && (
              <Box px={`${spacing[20]}px`} pt={`${spacing[20]}px`} pb={`${spacing[4]}px`}>
                <SearchInput
                  id="search-input"
                  value={searchValue}
                  onSearchChange={value => setSearchValue(value)}
                  onClear={() => setSearchValue('')}
                />
              </Box>
            )}

            {options?.length <= 0 ? (
              <Flex alignItems="center" height={SCREEN_HEIGHT * 0.4} mt={`${spacing[60]}px`}>
                <AlertCircle />
                <Text textAlign="center" fontSize={`${spacing[18]}px`} mt={`${spacing[10]}px`}>
                  No data
                </Text>
              </Flex>
            ) : filteredResult?.length <= 0 ? (
              <Flex alignItems="center" height={SCREEN_HEIGHT * 0.4} mt={`${spacing[60]}px`}>
                <AlertCircle />
                <Text textAlign="center" fontSize={`${spacing[18]}px`} mt={`${spacing[10]}px`}>
                  No result found
                </Text>
              </Flex>
            ) : (
              <View height={hideSearch ? SCREEN_HEIGHT * 0.3 : SCREEN_HEIGHT * 0.6} width={WIDTH}>
                <FlashList
                  data={filteredResult}
                  renderItem={renderItem}
                  keyboardShouldPersistTaps="always"
                  contentContainerStyle={{
                    paddingBottom: spacing[60]
                    // paddingHorizontal: spacing[20]
                  }}
                  estimatedListSize={{
                    height: hideSearch ? SCREEN_HEIGHT * 0.3 : SCREEN_HEIGHT * 0.6,
                    width: WIDTH
                  }}
                  estimatedItemSize={200}
                  initialNumToRender={20}
                  initialScrollIndex={filteredResult?.findIndex(option => option.value === value)}
                  keyExtractor={item => item.uuid || item.id || item.value}
                />
              </View>
            )}
          </Flex>
        </Modal>
      </Hidden>
    </>
  );
};

export default memo(Select);

const styles = StyleSheet.create({
  container: (variant, isOpen, isInvalid, isDisabled, opacity, borderRadius) => ({
    backgroundColor: variant === 'filled' ? colors.gray[50] : 'white',
    opacity: opacity ? opacity : isDisabled ? 0.5 : 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: variant === 'unstyled' ? 0 : variant === 'filled' && !isOpen ? 0 : 1,
    borderColor:
      variant !== 'unstyled' && isOpen
        ? isInvalid
          ? colors.error[500]
          : colors.primary[600]
        : isInvalid
        ? colors.error[500]
        : colors.gray[100],
    border:
      variant === 'unstyled'
        ? 'none'
        : variant === 'filled' && !isOpen
        ? 'none'
        : isOpen
        ? isInvalid
          ? `1px solid ${colors.error[500]}`
          : `1px solid ${colors.primary[600]}`
        : isInvalid
        ? `1px solid ${colors.error[500]}`
        : `1px solid ${colors.gray[100]}`,
    boxShadow:
      variant !== 'unstyled' &&
      (isOpen
        ? isInvalid
          ? `0px 1px 2px rgba(16, 24, 40, 0.05), 0px 0px 0px 4px #FEF3F2`
          : `0px 1px 2px rgba(16, 24, 40, 0.05), 0px 0px 0px 4px #F9F5FF`
        : 'none'),
    borderRadius: borderRadius
      ? borderRadius
      : variant !== 'unstyled'
      ? variant === 'rounded'
        ? '100%'
        : 8
      : 0
  }),
  select: (
    isFocused,
    isInvalid,
    width,
    height,
    px,
    pr,
    pl,
    fontSize,
    isDisabled,
    opacity,
    variant
  ) => ({
    backgroundColor: variant === 'filled' ? colors.gray[50] : 'transparent',
    width: width,
    height: height,
    outline: 'none',
    borderRadius: 8,
    paddingHorizontal: px,
    paddingRight: pr,
    paddingLeft: pl,
    opacity: opacity ? opacity : isDisabled ? 0.5 : 1,
    border:
      variant === 'unstyled'
        ? 'none'
        : variant === 'filled' && !isFocused
        ? 'none'
        : isFocused
        ? isInvalid
          ? `1px solid ${colors.error[500]}`
          : `1px solid ${colors.primary[600]}`
        : isInvalid
        ? `1px solid ${colors.error[500]}`
        : `1px solid ${colors.gray[100]}`,
    boxShadow:
      variant !== 'unstyled' &&
      (isFocused
        ? isInvalid
          ? `0px 1px 2px rgba(16, 24, 40, 0.05), 0px 0px 0px 4px #FEF3F2`
          : `0px 1px 2px rgba(16, 24, 40, 0.05), 0px 0px 0px 4px #F9F5FF`
        : 'none'),
    color: colors.base.black,
    fontSize: fontSize,
    fontFamily: `'Satoshi-Regular', 'DM Sans', sans-serif`,
    zIndex: 1000
  }),
  unstyled: variant =>
    variant === 'unstyled'
      ? {
          border: 'none',
          boxShadow: 'none'
        }
      : {}
});
