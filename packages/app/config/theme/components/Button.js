import colors from '../colors';
import spacing from '../spacing';

const disabledBtnStyles = {
  opacity: 1,
  bg: colors.gray[50],
  _web: {
    cursor: 'not-allowed'
  },
  _text: {
    color: colors.gray[200]
  },
  _icon: {
    color: colors.gray[200]
  }
};

const Button = SCREEN_HEIGHT => ({
  baseStyle: props => ({
    borderRadius: '8px',
    _text: {
      fontFamily: props.fontFamily === 'Satoshi-Medium' ? 'Satoshi-Medium' : 'Satoshi-Bold',
      fontSize: props.fontSize
    },
    _web: {
      boxShadow: 'none',
      overflow: 'hidden',
      _text: {
        fontFamily: `${
          props.fontFamily === 'Satoshi-Medium' ? 'Satoshi-Medium' : 'Satoshi-Bold'
        }, 'DM Sans', sans-serif`,
        fontSize: props.fontSize
      }
    }
  }),
  defaultProps: {
    variant: 'solid',
    size: 'lg'
  },
  sizes: {
    xl: {
      px: 28,
      _text: {
        fontSize: spacing[18],
        lineHeight: spacing[20]
      },
      height: { base: SCREEN_HEIGHT * 0.067, sm: '60px' }, //60
      maxHeight: '60px', //60
      _icon: {
        size: spacing[18]
      }
    },
    lg: {
      px: 28,
      _text: {
        fontSize: spacing[18],
        lineHeight: spacing[20]
      },
      height: { base: SCREEN_HEIGHT * 0.0614, sm: '55px' }, //55
      maxHeight: '55px', //55
      _icon: {
        size: spacing[18]
      }
    },
    md: {
      px: 28,
      _text: {
        fontSize: spacing[16],
        lineHeight: spacing[18]
      },
      height: { base: SCREEN_HEIGHT * 0.0492, sm: '44px' }, //44
      maxHeight: '44px', //44
      _icon: {
        size: spacing[16]
      }
    },
    sm: {
      px: 8,
      _text: {
        fontSize: spacing[14],
        lineHeight: spacing[16]
      },
      height: { base: SCREEN_HEIGHT * 0.0358, sm: '32px' }, //32
      maxHeight: '32px', //32
      _icon: {
        size: spacing[14]
      }
    },
    xs: {
      px: 6,
      _text: {
        fontSize: spacing[12],
        lineHeight: spacing[14]
      },
      height: { base: SCREEN_HEIGHT * 0.0313, sm: '28px' }, //28
      maxHeight: '28px', //28
      _icon: {
        size: spacing[12]
      }
    }
  },
  variants: {
    solid: props => {
      return {
        bg:
          props.colorScheme === 'primary' ? `${props.colorScheme}.600` : `${props.colorScheme}.500`,
        _pressed: {
          bg:
            props.colorScheme === 'white'
              ? 'white'
              : props.colorScheme === 'primary'
              ? `${props.colorScheme}.600`
              : `${props.colorScheme}.500`
        },
        _disabled: disabledBtnStyles,
        _loading: disabledBtnStyles,
        _spinner: {
          color: colors.gray[200]
        },
        _icon: {
          color: colors.base.white
        }
      };
    },
    subtle: props => {
      return {
        bg: `${props.colorScheme}.100`,
        _disabled: disabledBtnStyles,
        _loading: disabledBtnStyles,
        _text: {
          color: `${props.colorScheme}.700`
        },
        _hover: {
          bg:
            props.colorScheme === 'primary'
              ? `${props.colorScheme}.200`
              : `${props.colorScheme}.200`
        },
        _pressed: {
          bg:
            props.colorScheme === 'primary'
              ? `${props.colorScheme}.200`
              : `${props.colorScheme}.200`
        },
        _spinner: {
          color: colors.gray[200]
        },
        _icon: {
          color:
            props.colorScheme === 'primary'
              ? `${props.colorScheme}.700`
              : `${props.colorScheme}.500`
        }
      };
    },
    outline: props => {
      return {
        borderColor: `${props.colorScheme}.600`,
        _hover: {
          bg: `${props.colorScheme}.50`
        },
        _pressed: {
          bg: `${props.colorScheme}.50`
        },
        _disabled: {
          borderWidth: 0,
          ...disabledBtnStyles
        },
        _loading: disabledBtnStyles,
        _spinner: {
          color: colors.gray[200]
        },
        _icon: {
          color:
            props.colorScheme === 'primary'
              ? `${props.colorScheme}.600`
              : `${props.colorScheme}.500`
        }
      };
    },
    link: props => {
      return {
        _text: {
          textDecorationLine: 'underline'
        },
        _pressed: {
          _text: {
            color:
              props.colorScheme === 'primary'
                ? `${props.colorScheme}.700`
                : `${props.colorScheme}.600`
          }
        },
        _disabled: {
          _text: {
            opacity: 1,
            color: colors.gray[400]
          }
        },
        _loading: {
          _text: {
            opacity: 1,
            color: colors.gray[400]
          }
        },
        _spinner: {
          color: colors.gray[200]
        },
        _icon: {
          color:
            props.colorScheme === 'primary'
              ? `${props.colorScheme}.600`
              : `${props.colorScheme}.500`
        }
      };
    },
    unstyled: props => {
      return {
        _text: {
          color:
            props.colorScheme === 'primary'
              ? `${props.colorScheme}.600`
              : `${props.colorScheme}.500`
        },
        _disabled: {
          _text: {
            opacity: 1,
            color: colors.gray[400]
          }
        },
        _spinner: {
          color: colors.gray[200]
        },
        _icon: {
          color:
            props.colorScheme === 'primary'
              ? `${props.colorScheme}.600`
              : `${props.colorScheme}.500`
        }
      };
    }
  }
});
export default Button;
