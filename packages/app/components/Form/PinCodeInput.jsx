import colors from 'app/config/theme/colors';
import spacing from 'app/config/theme/spacing';
import { Box } from 'native-base';
import React, { Component } from 'react';
import { View, TextInput, StyleSheet, I18nManager, Text } from 'react-native';
import * as Animatable from 'react-native-animatable';

const styles = StyleSheet.create({
  containerDefault: {},
  cellDefault: {
    borderColor: colors.gray[100],
    borderWidth: 1,
    borderRadius: 8,
    maxWidth: 64,
    maxHeight: 64
  },
  cellFocusedDefault: {
    borderColor: colors.primary[600],
    boxShadow: `0px 1px 2px rgba(16, 24, 40, 0.05), 0px 0px 0px 4px #F9F5FF`
  },
  cellErrorFocusedDefault: {
    borderColor: colors.error[500],
    boxShadow: `0px 1px 2px rgba(16, 24, 40, 0.05), 0px 0px 0px 4px #FEF3F2`
  },
  textStyleDefault: {
    color: colors.base.black,
    fontSize: 30
  },
  textStyleFocusedDefault: {
    color: colors.primary[600]
  }
});

class PinCodeInput extends Component {
  state = {
    maskDelay: false,
    focused: false
  };
  ref = React.createRef();
  inputRef = React.createRef();

  animate = ({ animation = 'shake', duration = 650 }) => {
    if (!this.props.animated) {
      return new Promise((resolve, reject) => reject(new Error('Animations are disabled')));
    }
    return this.ref.current[animation](duration);
  };

  shake = () => this.animate({ animation: 'shake' });

  focus = () => {
    return this.inputRef.current.focus();
  };

  blur = () => {
    return this.inputRef.current.blur();
  };

  clear = () => {
    return this.inputRef.current.clear();
  };

  _inputCode = code => {
    const { password, codeLength = 4, onTextChange, onFulfill } = this.props;

    if (this.props.restrictToNumbers) {
      code = (code.match(/[0-9]/g) || []).join('');
    }

    if (onTextChange) {
      onTextChange(code);
    }
    if (code.length === codeLength && onFulfill) {
      onFulfill(code);
    }

    // handle password mask
    const maskDelay = password && code.length > this.props.value.length; // only when input new char
    this.setState({ maskDelay });

    if (maskDelay) {
      // mask password after delay
      clearTimeout(this.maskTimeout);
      this.maskTimeout = setTimeout(() => {
        this.setState({ maskDelay: false });
      }, this.props.maskDelay);
    }
  };

  _keyPress = event => {
    if (event.nativeEvent.key === 'Backspace') {
      const { value, onBackspace } = this.props;
      if (value === '' && onBackspace) {
        onBackspace();
      }
    }
  };

  _onFocused = () => {
    this.setState({ focused: true });
    if (typeof this.props.onFocus === 'function') {
      this.props.onFocus();
    }
  };

  _onBlurred = () => {
    this.setState({ focused: false });
    if (typeof this.props.onBlur === 'function') {
      this.props.onBlur();
    }
  };

  componentWillUnmount() {
    clearTimeout(this.maskTimeout);
  }

  render() {
    const {
      label,
      value,
      codeLength,
      cellSize,
      cellSpacing,
      placeholder,
      password,
      mask,
      autoFocus,
      containerStyle,
      cellStyle,
      cellStyleFocused,
      cellStyleErrorFocused,
      cellStyleFilled,
      textStyle,
      textStyleFocused,
      keyboardType,
      animationFocused,
      animated,
      testID,
      editable,
      autoComplete,
      textContentType,
      disableFullscreenUI,
      importantForAutofill,
      isInvalid,
      ...inputProps
    } = this.props;
    const { maskDelay, focused } = this.state;
    return (
      <Box>
        {label && (
          <Text
            style={{
              fontSize: spacing[14],
              color: colors.gray[400],
              marginBottom: 6
            }}
          >
            {label}
          </Text>
        )}
        <Animatable.View
          ref={this.ref}
          style={[
            {
              alignItems: 'stretch',
              flexDirection: 'row',
              justifyContent: 'center',
              position: 'relative',
              width: cellSize * codeLength + cellSpacing * (codeLength - 1),
              height: cellSize
            },
            containerStyle
          ]}
        >
          <View
            style={{
              position: 'absolute',
              margin: 0,
              height: '100%',
              flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
              alignItems: 'center'
            }}
          >
            {Array.apply(null, Array(codeLength)).map((_, idx) => {
              const cellFocused = focused && idx === value.length;
              const filled = idx < value.length;
              const last = idx === value.length - 1;
              const showMask = filled && password && (!maskDelay || !last);
              const isPlaceholderText = typeof placeholder === 'string';
              const isMaskText = typeof mask === 'string';
              const pinCodeChar = value.charAt(idx);

              let cellText = null;
              if (filled || placeholder !== null) {
                if (showMask && isMaskText) {
                  cellText = mask;
                } else if (!filled && isPlaceholderText) {
                  cellText = placeholder;
                } else if (pinCodeChar) {
                  cellText = pinCodeChar;
                }
              }

              const placeholderComponent = !isPlaceholderText ? placeholder : null;
              const maskComponent = showMask && !isMaskText ? mask : null;
              const isCellText = typeof cellText === 'string';

              return (
                <Animatable.View
                  key={idx}
                  style={[
                    {
                      width: cellSize,
                      height: cellSize,
                      marginLeft: cellSpacing / 2,
                      marginRight: cellSpacing / 2,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center'
                    },
                    {
                      ...cellStyle,
                      borderColor: isInvalid ? colors.error[500] : colors.gray[100]
                    },
                    cellFocused ? (isInvalid ? cellStyleErrorFocused : cellStyleFocused) : {},
                    filled ? cellStyleFilled : {}
                  ]}
                  animation={idx === value.length && focused && animated ? animationFocused : null}
                  iterationCount="infinite"
                  duration={500}
                >
                  {isCellText && !maskComponent && (
                    <Text
                      style={[
                        textStyle,
                        cellFocused
                          ? textStyleFocused
                          : placeholder && !cellFocused
                          ? { color: '#a3a3a3' }
                          : {}
                      ]}
                    >
                      {cellText}
                    </Text>
                  )}

                  {!isCellText && !maskComponent && placeholderComponent}
                  {isCellText && maskComponent}
                </Animatable.View>
              );
            })}
          </View>

          <TextInput
            disableFullscreenUI={disableFullscreenUI}
            value={value}
            ref={this.inputRef}
            onChangeText={this._inputCode}
            onKeyPress={this._keyPress}
            onFocus={() => this._onFocused()}
            onBlur={() => this._onBlurred()}
            clearButtonMode="never"
            spellCheck={false}
            autoCorrect={false}
            blurOnSubmit={false}
            autoFocus={autoFocus}
            keyboardType={keyboardType}
            noOfLines={1}
            autoCapitalize="characters"
            underlineColorAndroid="transparent"
            caretHidden={false}
            maxLength={codeLength}
            autoComplete={autoComplete}
            textContentType={textContentType}
            importantForAutofill={importantForAutofill}
            selection={{
              start: value.length,
              end: value.length
            }}
            style={{
              flex: 1,
              opacity: 0,
              textAlign: 'center'
            }}
            testID={testID || undefined}
            editable={editable}
            {...inputProps}
          />
        </Animatable.View>
      </Box>
    );
  }
  static defaultProps = {
    label: '',
    value: '',
    codeLength: 4,
    cellSize: spacing[64],
    cellSpacing: 10,
    placeholder: '',
    password: false,
    mask: (
      <View
        style={{
          width: 10,
          height: 10,
          borderRadius: 25,
          backgroundColor: colors.base.black
        }}
      />
    ),
    maskDelay: 200,
    keyboardType: 'number-pad',
    autoFocus: false,
    restrictToNumbers: true,
    containerStyle: styles.containerDefault,
    cellStyle: styles.cellDefault,
    cellStyleFocused: styles.cellFocusedDefault,
    cellStyleErrorFocused: styles.cellErrorFocusedDefault,
    isInvalid: false,
    textStyle: styles.textStyleDefault,
    textStyleFocused: styles.textStyleFocusedDefault,
    animationFocused: 'pulse',
    animated: true,
    editable: true,
    inputProps: {},
    disableFullscreenUI: true,
    autoComplete: 'off',
    textContentType: 'none',
    importantForAutofill: 'auto'
  };
}

export default PinCodeInput;
