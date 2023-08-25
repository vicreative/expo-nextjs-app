import { AntDesign } from '@expo/vector-icons';
import spacing from 'app/config/theme/spacing';
import { STATUS_BAR_HEIGHT } from 'app/constants/index';
import { Alert, Box, Icon, IconButton, Text } from 'native-base';
import React, { useEffect, useState } from 'react';
import { onlineManager } from '@tanstack/react-query';

export default function NoInternetCard() {
  const isOnline = onlineManager.isOnline();
  const [show, setShow] = useState(false);
  const [checkOnlineAvailablity, setCheckOnlineAvailablity] = useState(false);

  useEffect(() => {
    if (checkOnlineAvailablity) {
      if (isOnline) {
        setShow(false);
      } else {
        setShow(true);
      }
    }
  }, [checkOnlineAvailablity, isOnline]);

  setTimeout(() => {
    setCheckOnlineAvailablity(true);
  }, 5000);

  return (
    show && (
      <Box zIndex={10000} width="100%" position="absolute" top={0} _web={{ position: 'fixed' }}>
        <Alert
          justifyContent="center"
          status="error"
          _web={{ pt: `${spacing[10]}px` }}
          pt={`${STATUS_BAR_HEIGHT}px`}
          borderRadius={0}
        >
          <Alert.Icon />
          <Text color="error.600" fontWeight="medium">
            No Internet Connection
          </Text>
          <IconButton
            position="absolute"
            right={10}
            _web={{ top: `${spacing[10]}px` }}
            top={`${STATUS_BAR_HEIGHT}px`}
            onPress={() => setShow(false)}
            variant="unstyled"
            _focus={{
              borderWidth: 0
            }}
            icon={<Icon as={AntDesign} name="close" size={`${spacing[20]}px`} color="gray.400" />}
          />
        </Alert>
      </Box>
    )
  );
}
