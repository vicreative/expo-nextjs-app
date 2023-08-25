import colors from '../colors';
import spacing from '../spacing';

const disabledInputStyles = props => ({
  bg: props.variant === 'filled' ? colors.gray[50] : colors.base.white,
  opacity: 0.5
});

const Input = {
  baseStyle: props => ({
    borderRadius: 8,
    fontFamily: 'Satoshi-Regular',
    _web: {
      boxShadow: 'none',
      _text: {
        fontFamily: `${
          props.fontFamily === 'Satoshi-Medium'
            ? 'Satoshi-Medium'
            : props.fontFamily === 'Satoshi-Bold'
            ? 'Satoshi-Bold'
            : 'Satoshi-Regular'
        }, 'DM Sans', sans-serif`
      }
    }
  }),
  defaultProps: {
    variant: 'outline',
    size: 'md'
  },
  sizes: {
    xl: {
      px: 14,
      fontSize: `${spacing[20]}px`,
      height: `${spacing[60]}px`,
      _icon: {
        size: `${spacing[20]}px`
      }
    },
    lg: {
      px: 14,
      fontSize: `${spacing[18]}px`,
      height: `${spacing[55]}px`,
      _icon: {
        size: `${spacing[20]}px`
      }
    },
    md: {
      px: 14,
      fontSize: `${spacing[16]}px`,
      height: `${spacing[44]}px`,
      _icon: {
        size: `${spacing[16]}px`
      }
    },
    sm: {
      px: 14,
      fontSize: `${spacing[14]}px`,
      height: `${spacing[32]}px`,
      _icon: {
        size: `${spacing[14]}px`
      }
    }
  },
  variants: {
    filled: props => {
      return {
        bg: colors.gray[50],
        _text: {
          color: colors.base.black
        },
        _hover: {
          borderColor: colors.gray[200],
          bg: colors.gray[100]
        },
        _focus: {
          borderColor: colors.primary[600],
          bg: colors.gray[50]
        },
        _invalid: {
          borderColor: colors.error[500],
          bg: colors.gray[50],
          _text: {
            color: colors.error[500]
          }
        },
        _disabled: disabledInputStyles(props)
      };
    },
    outline: props => {
      return {
        bg: colors.base.white,
        borderColor: colors.gray[100],
        _text: {
          color: colors.base.black
        },
        _hover: {
          borderColor: colors.gray[200]
        },
        _focus: {
          borderColor: colors.primary[500],
          bg: colors.base.white
        },
        _invalid: {
          borderColor: colors.error[500],
          bg: colors.base.white,
          _text: {
            color: colors.error[500]
          }
        },
        _disabled: disabledInputStyles(props)
      };
    },
    rounded: props => {
      return {
        bg: colors.base.white,
        borderColor: colors.gray[100],
        _text: {
          color: colors.base.black
        },
        _hover: {
          borderColor: colors.gray[200]
        },
        _focus: {
          borderColor: colors.primary[600],
          bg: colors.base.white
        },
        _invalid: {
          borderColor: colors.error[500],
          bg: colors.base.white,
          _text: {
            color: colors.error[500]
          }
        },
        _disabled: disabledInputStyles(props)
      };
    },
    unstyled: props => {
      return {
        _text: {
          color: colors.base.black
        },
        _invalid: {
          _text: {
            color: colors.error[500]
          }
        },
        _disabled: disabledInputStyles(props)
      };
    }
  }
};
export default Input;
