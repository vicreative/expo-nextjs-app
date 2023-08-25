import colors from 'app/config/theme/colors';
import { Flex, Box, Text, Hidden } from 'native-base';
import { forwardRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import Select from './Select';
import Input from './Input';
import spacing from 'app/config/theme/spacing';

const PhoneInput = forwardRef(
  (
    {
      variant = 'outline',
      width = '100%',
      height = `${spacing[44]}px`,
      placeholder = 'Enter your phone number',
      isInvalid,
      isDisabled,
      disablePhoneCode,
      phoneCodeOpacity,
      tip,
      label,
      tipBtn,
      errorMsg,
      options = [],
      onFocus = () => {},
      onBlur = () => {},
      hideSearch,
      dropdownValue,
      onChangeDropdown = () => {},
      ...rest
    },
    ref
  ) => {
    const [isDropdownFocused, setIsDropdownFocused] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    return (
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
        <Flex
          style={styles.container(variant, isFocused, isInvalid, isDisabled)}
          borderRadius={variant !== 'unstyled' ? (variant === 'rounded' ? 'full' : 8) : 0}
          width={width}
          height={height}
        >
          <Select
            placeholder={'Select your phone code'}
            variant={'unstyled'}
            value={dropdownValue}
            width={spacing[100]}
            pl={spacing[14]}
            dropdownPosition={spacing[14]}
            size="sm"
            dropdownIconSize={'14px'}
            height={`${spacing[40]}px`}
            borderRadius={variant === 'rounded' ? 'full' : 10}
            isFocused={isDropdownFocused}
            setIsFocused={setIsDropdownFocused}
            onChange={value => onChangeDropdown(value)}
            options={options}
            hideSearch={hideSearch}
            containerStyle={{ paddingRight: 0 }}
            isDisabled={disablePhoneCode || isDisabled}
            opacity={phoneCodeOpacity ? phoneCodeOpacity : isDisabled || disablePhoneCode ? 0.5 : 1}
          />
          <Box width="70%" height="full" ml={10}>
            <Input
              ref={ref}
              variant={'unstyled'}
              placeholder={placeholder}
              onFocus={e => {
                setIsFocused(true);
                onFocus(e);
              }}
              onBlur={e => {
                setIsFocused(false);
                onBlur(e);
              }}
              type="number"
              autoComplete="tel"
              keyboardType="number-pad"
              textContentType="telephoneNumber"
              editable={!isDisabled}
              pl={0}
              height={`${spacing[40]}px`}
              isDisabled={isDisabled}
              {...rest}
            />
          </Box>
        </Flex>
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
    );
  }
);
export default PhoneInput;

const styles = StyleSheet.create({
  container: (variant, isFocused, isInvalid, isDisabled) => ({
    backgroundColor: variant === 'filled' ? colors.gray[50] : colors.base.white,
    opacity: isDisabled ? 0.5 : 1,
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: variant === 'unstyled' ? 0 : variant === 'filled' && !isFocused ? 0 : 1,
    borderColor:
      variant !== 'unstyled' && isFocused
        ? isInvalid
          ? colors.error[500]
          : colors.primary[600]
        : isInvalid
        ? colors.error[500]
        : colors.gray[100],
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
    overflow: 'hidden'
  })
});
