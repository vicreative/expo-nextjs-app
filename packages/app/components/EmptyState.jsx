import PropTypes from 'prop-types';
import Button from './Button';
import { Entypo } from '@expo/vector-icons';
import { Box, Flex, Heading, Icon, Text } from 'native-base';
import spacing from 'app/config/theme/spacing';
import { useRouter } from 'solito/router';
import { resolveAssetsUrl } from 'app/utils/index';
import { isFunction } from 'formik';
import Image from './Image';

export default function EmptyState(props) {
  const {
    heading,
    message,
    linkText,
    href,
    bg = 'gray.25',
    color = 'gray.500',
    height = '100%',
    colorScheme = 'secondary',
    borderRadius = `${spacing[16]}px`,
    btnSize = 'lg',
    onPress
  } = props;
  const { push } = useRouter();

  const handlePress = () => {
    if (isFunction(onPress)) {
      onPress();
    } else {
      push(href);
    }
  };

  return (
    <Flex
      flexDirection={'column'}
      justifyContent={'center'}
      alignItems="center"
      bg={bg}
      borderRadius={borderRadius}
      width="100%"
      height={height}
      padding={`${spacing[32]}px`}
    >
      <Box pb={`${spacing[20]}px`}>
        <Image
          width={119}
          height={215}
          source={{
            uri: resolveAssetsUrl('balloon-dark.png')
          }}
          alt="Empty illustration"
        />
      </Box>

      {heading && (
        <Heading fontSize={`${spacing[20]}px`} textAlign="center">
          {heading}
        </Heading>
      )}
      {message && (
        <Text
          fontSize={`${spacing[16]}px`}
          color={color}
          pt={heading ? `${spacing[10]}px` : 0}
          maxWidth="352px"
          textAlign="center"
        >
          {message}
        </Text>
      )}

      {linkText && (
        <Button
          colorScheme={colorScheme}
          variant="solid"
          rightIcon={<Icon as={Entypo} name="chevron-right" size={'16px'} />}
          mt="30px"
          size={btnSize}
          fontFamily="Satoshi-Medium"
          onPress={handlePress}
        >
          {linkText}
        </Button>
      )}
    </Flex>
  );
}

EmptyState.propTypes = {
  heading: PropTypes.string,
  message: PropTypes.string,
  linkText: PropTypes.string,
  href: PropTypes.string,
  bg: PropTypes.string,
  color: PropTypes.string
};
