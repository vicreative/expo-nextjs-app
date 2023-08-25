import en from 'app/i18n/index';
import { Box, Center, Flex, Heading, HStack, Text, Link } from 'native-base';
import spacing from 'app/config/theme/spacing';
import { LogoWithText } from './Icons/Logo';

export default function Footer() {
  return (
    <Center
      mx={{
        sm: `${spacing[20]}px`,
        md: `${spacing[40]}px`,
        lg: `${spacing[64]}px`,
        '2xl': `${spacing[80]}px`
      }}
    >
      <Flex {...styles.container}>
        <Box {...styles.col(1)}>
          <Link
            href="/"
            mb="0.5em"
            _web={{
              width: { base: '134px', lg: '150px' },
              height: 'auto'
            }}
          >
            <LogoWithText width={'100%'} height={'100%'} />
          </Link>
          <Text {...styles.colText}>{en.footer.col1.text}</Text>
        </Box>

        <Box {...styles.col(2)}>
          <Heading {...styles.colTitle}>{en.footer.col2.title}</Heading>
          <Text {...styles.colText}>{en.footer.col2.text}</Text>
        </Box>

        <Box {...styles.col(3)}>
          <Heading {...styles.colTitle}>{en.footer.col3.title}</Heading>

          <Link href={`mailto:${en.footer.col3.link}`} {...styles.link}>
            {en.footer.col3.link}
          </Link>
        </Box>

        <Box {...styles.col(4)}>
          <Heading {...styles.colTitle}>{en.footer.col4.title}</Heading>

          <HStack space={`${spacing[10]}px`} {...styles.socialLinksContainer}>
            {en.footer.col4.links.map(link => (
              <Link
                key={link.id}
                href={link.url}
                hrefAttrs={{
                  rel: 'noreferrer',
                  target: '_blank'
                }}
                {...styles.link}
              >
                {link.name}
              </Link>
            ))}
          </HStack>
        </Box>
      </Flex>
    </Center>
  );
}

const styles = {
  container: {
    maxW: '1440px',
    width: '100%',
    py: `${spacing[40]}px`,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    borderTopColor: 'gray.100',
    borderTopWidth: 1
  },
  col: col => ({
    marginBottom: '30px',
    width: {
      base: '100%',
      sm: '50%',
      lg: '25%',
      xl: col === 1 ? '25%' : '15%'
    },
    minWidth:
      col === 1
        ? { base: '100%', sm: '208px' }
        : col === 2
        ? { base: '100%', sm: '200px', md: '332px' }
        : col === 3
        ? { base: '100%', sm: '180px' }
        : { base: '100%', sm: '220px' }
  }),
  logo: height => ({
    width: `${spacing[100] * 1.5}px`,
    _web: { width: '150px', height: '42px' },
    height: `${height * 0.0425}px`,
    resizeMode: 'contain',
    marginBottom: '0.5em'
  }),
  colTitle: {
    fontSize: `${spacing[16]}px`,
    color: 'secondary',
    marginBottom: '0.5em'
  },
  colText: {
    fontSize: `${spacing[14]}px`,
    color: 'bauhaus'
  },
  socialLinksContainer: {
    alignItems: 'center',
    maxWidth: '189px'
  },
  link: {
    _text: {
      fontSize: `${spacing[14]}px`,
      color: 'primary.600',
      textDecoration: 'none'
    },
    _hover: {
      _text: {
        textDecoration: 'underline',
        textDecorationLine: 'underline'
      }
    }
  }
};
