import Breadcrumb from 'app/components/Breadcrumb';
import { Container, Footer, Tabs } from 'app/components/index';
import spacing from 'app/config/theme/spacing';
import en from 'app/i18n/index';
import { Box, Heading, Hidden, Text } from 'native-base';
import { NavHeader } from 'app/navigation/Header';
import { useState } from 'react';
import { useRouter } from 'solito/router';

export default function AccountLayout({ children }) {
  const [activeTab, setActiveTab] = useState(0);
  const { push } = useRouter();

  const handleChange = (index, href) => {
    setActiveTab(index);
    push(href);
  };
  return (
    <>
      {/* larger device(tablet & desktop) for web only */}
      <Hidden only="base">
        <Container px={{ base: '40px', md: '80px', lg: '113px' }}>
          <Box pt={{ base: '40px', md: '80px', lg: '113px' }}>
            <Breadcrumb
              as="button"
              variant="accent"
              data={[
                {
                  id: 0,
                  name: en.profile.settings.home,
                  onPress: () => push('/')
                },
                {
                  id: 1,
                  name: en.profile.settings.settings,
                  onPress: () => {}
                }
              ]}
            />
            <Heading
              pt="46px"
              pb="8px"
              fontSize={{ base: `${spacing[40]}px`, lg: `${spacing[48]}px` }}
            >
              {en.profile.settings.heading}
            </Heading>
            <Text pb={{ base: '40px', md: '64px' }} fontSize={`${spacing[18]}px`} color="gray.300">
              {en.profile.settings.subheading}
            </Text>
            <Tabs
              fontSize={`${spacing[14]}px`}
              activeIndex={activeTab}
              hasRouteSupport
              data={[
                {
                  title: en.profile.account.info.heading,
                  href: '/profile/account',
                  onPress: (index, href) => handleChange(index, href)
                },
                {
                  title: en.profile.security.info.heading,
                  href: '/profile/security',
                  onPress: (index, href) => handleChange(index, href)
                },
                {
                  title: en.profile.trips.heading,
                  href: '/trips',
                  onPress: (index, href) => handleChange(index, href)
                },
                {
                  title: en.profile.chats.info.heading,
                  href: '/chats',
                  onPress: (index, href) => handleChange(index, href),
                  disabled: true
                },
                {
                  title: en.profile.transactions.info.heading,
                  href: '/profile/transactions',
                  onPress: (index, href) => handleChange(index, href)
                },
                {
                  title: en.profile.withdrawalBank.info.heading,
                  href: '/profile/withdrawal-bank',
                  onPress: (index, href) => handleChange(index, href)
                }
              ]}
            >
              {children}
            </Tabs>
          </Box>
        </Container>
        <NavHeader />
        <Footer />
      </Hidden>
    </>
  );
}
