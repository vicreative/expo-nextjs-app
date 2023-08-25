import { TextLink } from 'solito/link';
import { Text } from 'native-base';
import spacing from 'app/config/theme/spacing';
import { Platform } from 'react-native';
import useWindow from 'app/hooks/useWindow';

export default function Link({
  variant = 'link',
  color = 'primary.600',
  fontSize = `${spacing[16]}px`,
  fontFamily = 'Satoshi-Medium',
  textDecorationLine = 'underline',
  href = '#',
  padding,
  children,
  style,
  isActive,
  activeStyle = { backgroundColor: 'white' },
  textProps = {},
  ...rest
}) {
  const window = useWindow();

  const location = Platform.OS === 'web' ? window?.location : null;

  return (
    <TextLink
      href={href}
      textProps={{
        style: {
          ...textProps,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          fontFamily: fontFamily
        }
      }}
      {...rest}
    >
      <Text
        variant={variant}
        color={color}
        fontSize={fontSize}
        fontFamily={fontFamily}
        textDecorationLine={textDecorationLine}
        padding={padding}
        style={location?.pathname === href || isActive ? activeStyle : style}
        _web={
          location?.pathname === href || isActive
            ? {
                fontFamily: `'Satoshi-Bold', 'DM Sans', sans-serif`,
                cursor: 'pointer',
                ...activeStyle
              }
            : {
                fontFamily: `'${fontFamily}', 'DM Sans', sans-serif`,
                cursor: 'pointer',
                ...style
              }
        }
        {...rest}
      >
        {children}
      </Text>
    </TextLink>
  );
}
