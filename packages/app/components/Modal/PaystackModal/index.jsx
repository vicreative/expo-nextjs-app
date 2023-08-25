import env from 'app/config/env';
import { useVerifyPaymentQuery } from 'app/hooks/queries/usePayments';
import { Icon, View } from 'native-base';
import React, { useRef, useState } from 'react';
import SuccessState from '../../SuccessState';
import ErrorState from '../../ErrorState';
import LoadingState from '../../LoadingState';
import WebView from 'react-native-webview';
import Modal from '..';
import { AntDesign } from '@expo/vector-icons';
import Touchable from 'app/components/Gestures/Touchable';
import spacing from 'app/config/theme/spacing';
import useDimensions from 'app/hooks/useDimensions';

export default function PaystackModal({ payload }) {
  const {
    screen: { height: SCREEN_HEIGHT }
  } = useDimensions();
  const [showModal, setShowModal] = useState(true);
  const webView = useRef(null);

  const [status, setStatus] = useState();
  const amountToPay = (payload.amount * 100).toFixed(2);

  const { data, error, isLoading, isSuccess, isError } = useVerifyPaymentQuery(payload.reference, {
    enabled: status === 'success'
  });

  const refNumberString = payload.reference ? `ref: '${payload.reference}',` : ''; // should only send ref number if present, else if blank, paystack will auto-generate one

  const Paystackcontent = `   
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="ie=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Paystack</title>
        </head>
          <body style="background-color:#fff;height:100vh">
            <script src="https://js.paystack.co/v2/inline.js"></script>
            <script type="text/javascript">
            const paystack = new PaystackPop();
            paystack.newTransaction({
              key: '${env.PAYSTACK_PUBLIC_KEY}',
              email: '${payload.email}',
              amount: ${amountToPay},
              ${refNumberString}
              onSuccess: (transaction) => { 
                var resp = {event:'successful', transactionRef:transaction};
                window.ReactNativeWebView.postMessage(JSON.stringify(resp))
              },
              onCancel: () => {
                var resp = {event:'cancelled'};
                window.ReactNativeWebView.postMessage(JSON.stringify(resp))
              }
            });
            </script> 
          </body>
      </html> 
      `;

  const messageReceived = data => {
    const webResponse = JSON.parse(data);

    switch (webResponse.event) {
      case 'cancelled':
        setShowModal(false);
        setStatus('cancelled');
        payload.onDismiss();

        break;

      case 'successful':
        setShowModal(false);
        setStatus('success');

        break;

      default:
        break;
    }
  };

  const onNavigationStateChange = state => {
    const { url } = state;
    if (url === 'https://standard.paystack.co/close') {
      setShowModal(false);
      setStatus('cancelled');
      payload.onDismiss();
    }
  };

  return (
    <View flex={1}>
      {status === 'success' && isLoading ? (
        <LoadingState hasOpaqueBackground />
      ) : isSuccess && data?.status === 'success' ? (
        <SuccessState
          title={payload.success.title}
          text={payload.success.text}
          btnText={payload.success.btnText}
          onDismiss={payload.success.onDismiss}
          size={payload.success.size}
        />
      ) : isError || data?.status === 'failure' ? (
        <ErrorState
          title={payload.error.title}
          text={data?.status === 'failure' ? data?.failureReason : error.message}
          btnText={payload.error.btnText}
          onDismiss={payload.error.onDismiss}
          size={payload.success.size}
        />
      ) : (
        <Modal
          px={0}
          pt={0}
          mt={SCREEN_HEIGHT * 0.1}
          borderTopRadius="20px"
          visible={showModal}
          animationType="fade"
          transparent
        >
          <Touchable
            alignSelf="flex-end"
            mt={`${-spacing[24]}px`}
            pr={`${spacing[20]}px`}
            pb={`${spacing[20]}px`}
            onPress={() => {
              setStatus('cancelled');
              payload.onDismiss();
              setShowModal(false);
            }}
          >
            <Icon as={AntDesign} name="closecircleo" size={`${spacing[24]}px`} color={'gray.500'} />
          </Touchable>
          <WebView
            style={[{ flex: 1 }]}
            source={{ html: Paystackcontent }}
            onMessage={e => {
              messageReceived(e.nativeEvent?.data);
            }}
            onNavigationStateChange={onNavigationStateChange}
            ref={webView}
            cacheEnabled={false}
            cacheMode={'LOAD_NO_CACHE'}
          />
        </Modal>
      )}
    </View>
  );
}
