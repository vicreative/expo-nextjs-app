import * as React from 'react';
import { onlineManager } from '@tanstack/react-query';
import { Platform } from 'react-native';

let NetInfo;
if (Platform.OS !== 'web') {
  NetInfo = require('@react-native-community/netinfo');
}

export function useOnlineManager() {
  React.useEffect(() => {
    // React Query already supports on reconnect auto refetch in web browser
    if (Platform.OS !== 'web') {
      return NetInfo.addEventListener(state => {
        onlineManager.setOnline(
          state.isConnected !== null && state.isConnected && Boolean(state.isInternetReachable)
        );
      });
    }
  }, []);
}
