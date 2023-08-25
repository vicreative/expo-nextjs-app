import colors from '../colors';

const Text = {
  baseStyle: props => ({
    color: colors.base.black,
    fontFamily: 'Satoshi-Regular',
    _web: {
      fontFamily: `${
        props.fontFamily === 'Satoshi-Medium'
          ? 'Satoshi-Medium'
          : props.fontFamily === 'Satoshi-Bold'
          ? 'Satoshi-Bold'
          : 'Satoshi-Regular'
      }, 'DM Sans', sans-serif`
    }
  }),
  defaultProps: {
    size: 'md',
    fontFamily: 'Satoshi-Regular'
  },
  sizes: {
    xl: {
      fontSize: 64
    },
    lg: {
      fontSize: 32
    },
    md: {
      fontSize: 16
    },
    sm: {
      fontSize: 12
    }
  },
  variants: {
    link: props => {
      return {
        textDecorationLine: 'underline',
        fontFamily: `${
          props.fontFamily === 'Satoshi-Regular'
            ? 'Satoshi-Regular'
            : props.fontFamily === 'Satoshi-Bold'
            ? 'Satoshi-Bold'
            : 'Satoshi-Medium'
        }`,
        _web: {
          fontFamily: `${
            props.fontFamily === 'Satoshi-Regular'
              ? 'Satoshi-Regular'
              : props.fontFamily === 'Satoshi-Bold'
              ? 'Satoshi-Bold'
              : 'Satoshi-Medium'
          }, 'DM Sans', sans-serif`,
          cursor: 'pointer'
        },
        _hover: {
          textDecorationLine: 'underline'
        }
      };
    }
  }
};
export default Text;
