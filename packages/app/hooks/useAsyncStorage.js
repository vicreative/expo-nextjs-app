import { useEffect, useState } from 'react';
import { getAuthToken, getColorMode, getLoginIdentifier, getPreviousRoute } from 'app/utils/auth';

/**
 * Hook to get items stored in async/local storage
 *
 * @returns { token: string, colorMode: string, previousPath: string, getAsyncStorageItems: func }
 */
export default function useAsyncStorage() {
  const [state, setState] = useState({
    token: null,
    colorMode: null,
    previousPath: null,
    isLoggedIn: null,
    isLoading: true
  });

  useEffect(() => {
    getAsyncStorageItems();

    return () => {
      setState(state => state);
    };
  }, []);

  async function getAsyncStorageItems() {
    try {
      const token = await getAuthToken();
      const colorMode = await getColorMode();
      const previousPath = await getPreviousRoute();
      const isLoggedIn = await getLoginIdentifier();

      setState({
        token: token ? token : null,
        colorMode: colorMode ? colorMode : null,
        previousPath: previousPath ? previousPath : null,
        isLoggedIn: isLoggedIn ? isLoggedIn : null,
        isLoading: false
      });
    } catch (error) {
      console.warn(error);
    }
  }

  return { ...state, getAsyncStorageItems };
}
