import { extendTheme } from 'native-base';
import breakpoints from './breakpoints';
import colors from './colors';
import shadows from './shadows';
import opacity from './opacity';
import fontConfig from './fontConfig';
import typography from './typography';
import spacing from './spacing';
import Button from './components/Button';
import Input from './components/Input';
import Text from './components/Text';
import Heading from './components/Heading';

const theme = SCREEN_HEIGHT =>
  extendTheme({
    colors,
    breakpoints,
    shadows,
    opacity,
    fontConfig,
    space: spacing,
    ...typography,
    components: {
      Button: Button(SCREEN_HEIGHT),
      Input,
      Text,
      Heading,
      Tooltip: {
        baseStyle: {
          px: '12px',
          py: '8px',
          background: 'gray.600',
          borderRadius: '8px'
        }
      },
      Avatar: {
        baseStyle: {
          _text: { color: colors.primary[600] }
        }
      },
      Skeleton: {
        baseStyle: {
          startColor: 'primary.100',
          endColor: 'primary.50'
        }
      },
      SkeletonText: {
        baseStyle: {
          startColor: 'primary.200',
          endColor: 'primary.100',
          _line: {
            height: `${spacing[19]}px`
          }
        }
      }
    },
    config: {
      // Changing initialColorMode to 'light'
      initialColorMode: 'light'
    }
  });

export default theme;
