import { Ionicons } from '@expo/vector-icons';
import colors from 'app/config/theme/colors';
import spacing from 'app/config/theme/spacing';
import useAppContext from 'app/hooks/useAppContext';
import { Box, Input as RNInput, Pressable, Icon, Text, Spinner, Hidden } from 'native-base';
import { useState, forwardRef } from 'react';
import { Platform, StyleSheet } from 'react-native';
import CurrencyInput from 'react-native-currency-input';

const Input = forwardRef(
  (
    {
      variant = 'outline',
      isInvalid,
      value,
      type,
      tip,
      label,
      tipBtn,
      errorMsg,
      isLoading,
      InputLeftElement,
      InputRightElement,
      focusOutlineColor = 'primary.600',
      invalidOutlineColor = 'error.500',
      onChangeText = () => {},
      onBlur = () => {},
      onFocus = () => {},
      ...rest
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [show, setShow] = useState(false);
    const { state } = useAppContext('user');

    return (
      <Box>
        {type === 'currency-amount' ? (
          <CurrencyInput
            autoFocus={true}
            value={value}
            onChangeValue={onChangeText}
            onBlur={e => {
              setIsFocused(false);
              onBlur(e);
            }}
            onFocus={e => {
              setIsFocused(true);
              onFocus(e);
            }}
            renderTextInput={textInputProps => (
              <RNInput
                variant="unstyled"
                placeholder={`${state.currency?.symbol}${'1,000'}`}
                size="lg"
                fontFamily="Satoshi-Bold"
                fontSize={`${spacing[36]}px`}
                textAlign="center"
                keyboardType={'number-pad'}
                inputAccessoryViewID="Next"
                {...textInputProps}
              />
            )}
            renderText
            prefix={state.currency?.symbol}
            delimiter=","
            separator="."
            precision={2}
          />
        ) : (
          <>
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
            <Box
              style={styles.container(variant, isFocused, isInvalid)}
              borderRadius={variant !== 'unstyled' ? (variant === 'rounded' ? 'full' : 8) : 0}
            >
              <RNInput
                ref={ref}
                isInvalid={isInvalid}
                variant={variant}
                value={value}
                placeholderTextColor="gray.200"
                focusOutlineColor={Platform.OS === 'web' ? 'transparent' : focusOutlineColor}
                invalidOutlineColor={Platform.OS === 'web' ? 'transparent' : invalidOutlineColor}
                borderRadius={variant !== 'unstyled' ? (variant === 'rounded' ? 'full' : 8) : 0}
                type={type === 'password' ? (show ? 'text' : 'password') : type}
                onChangeText={onChangeText}
                onBlur={e => {
                  setIsFocused(false);
                  onBlur(e);
                }}
                onFocus={e => {
                  setIsFocused(true);
                  onFocus(e);
                }}
                InputLeftElement={
                  InputLeftElement && (
                    <Box ml="14" mr="5">
                      {InputLeftElement}
                    </Box>
                  )
                }
                InputRightElement={
                  type === 'password' ? (
                    <Pressable
                      onPress={() => setShow(!show)}
                      mr="14"
                      ml="5"
                      height="full"
                      justifyContent="center"
                    >
                      <Icon
                        as={<Ionicons name={show ? 'eye-off-outline' : 'eye-outline'} />}
                        size={`${spacing[16]}px`}
                        color="base.black"
                      />
                    </Pressable>
                  ) : InputRightElement || isLoading ? (
                    <Box ml="5" mr="14">
                      {isLoading ? <Spinner size="sm" /> : InputRightElement}
                    </Box>
                  ) : null
                }
                {...rest}
              />
            </Box>
            {tip || isInvalid ? (
              <Text
                fontSize={`${spacing[14]}px`}
                color={isInvalid ? 'error.500' : 'gray.300'}
                mt={tip ? `${spacing[10]}px` : `${spacing[4]}px`}
              >
                {isInvalid ? errorMsg : tip}
                {isInvalid ? null : tipBtn}
              </Text>
            ) : null}
          </>
        )}
      </Box>
    );
  }
);
export default Input;

const styles = StyleSheet.create({
  container: (variant, isFocused, isInvalid) => ({
    border:
      variant !== 'unstyled' &&
      (isFocused
        ? isInvalid
          ? `1px solid ${colors.error[500]}`
          : `1px solid ${colors.primary[600]}`
        : isInvalid
        ? `1px solid ${colors.error[500]}`
        : 'none'),
    boxShadow:
      variant !== 'unstyled' &&
      (isFocused
        ? isInvalid
          ? `0px 1px 2px rgba(16, 24, 40, 0.05), 0px 0px 0px 4px #FEF3F2`
          : `0px 1px 2px rgba(16, 24, 40, 0.05), 0px 0px 0px 4px #F9F5FF`
        : 'none')
  })
});
