import colors from '../colors';

const Heading = {
  baseStyle: {
    color: colors.base.black,
    fontFamily: 'Satoshi-Bold',
    fontWeight: 600,
    _web: {
      fontFamily: `'Satoshi-Bold', 'DM Sans', sans-serif`
    }
  },
  defaultProps: {
    size: 'md',
    fontFamily: 'Satoshi-Bold'
  },
  sizes: {
    xl: {
      fontSize: 72
    },
    lg: {
      fontSize: 64
    },
    md: {
      fontSize: 32
    },
    sm: {
      fontSize: 24
    }
  }
};
export default Heading;
