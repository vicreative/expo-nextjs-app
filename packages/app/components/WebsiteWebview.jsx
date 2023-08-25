import { AntDesign } from '@expo/vector-icons';
import spacing from 'app/config/theme/spacing';
import { Center, Icon } from 'native-base';
import WebView from 'react-native-webview';
import Touchable from './Gestures/Touchable';
import env from 'app/config/env';
import Modal from './Modal/index';

export default function WebsiteWebview({ visible, contentToShow, token, onClose = () => {} }) {
  const injectCookiesScript = `
      document.cookie = 'expitra_auth_token=${token}; domain: ${
        env.APP_ENV !== 'local' ? '.expitra.com' : null
      }; path=/'; 
      
      document.cookie = 'expitra_is_logged_in=true; domain: ${
        env.APP_ENV !== 'local' ? '.expitra.com' : null
      }; path=/'; 
    `;

  const uri =
    contentToShow === 'creatorDashboard'
      ? `${env.WEBSITE_URL}/creator/dashboard`
      : contentToShow === 'privacyPolicy'
      ? `${env.WEBSITE_URL}/privacy-policy`
      : env.WEBSITE_URL;

  return (
    <Modal px={0} pt={0} visible={visible} animationType="slide">
      <WebView
        source={{
          uri
        }}
        injectedJavaScript={injectCookiesScript}
        javaScriptEnabled
      />
      <Center
        pt={`${spacing[16]}px`}
        pb={`${spacing[40]}px`}
        bg="white"
        shadow={5}
        borderTopWidth={1}
        width="100%"
        borderTopColor="paper"
      >
        <Touchable onPress={onClose}>
          <Icon as={AntDesign} name="close" size={`${spacing[30]}px`} color="gray.500" />
        </Touchable>
      </Center>
    </Modal>
  );
}
