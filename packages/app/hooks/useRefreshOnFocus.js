import * as React from 'react';
import { Platform } from 'react-native';

let useFocusEffect = () => {};

if (Platform.OS !== 'web') {
  useFocusEffect = require('@react-navigation/native').useFocusEffect;
}

export function useRefreshOnFocus(refetch) {
  const enabledRef = React.useRef(false);

  useFocusEffect(
    React.useCallback(() => {
      if (enabledRef.current) {
        refetch();
      } else {
        enabledRef.current = true;
      }
    }, [refetch])
  );
}
