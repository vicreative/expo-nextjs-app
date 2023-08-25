import useAsyncStorage from 'app/hooks/useAsyncStorage';
import { useEffect } from 'react';
import { useRouter } from 'solito/router';
import { storeCurrentRoute, storeLoginIdentifier } from 'app/utils/auth';

const ProtectedRoute = ({ children }) => {
  const { replace } = useRouter();
  const { isLoading, token, isLoggedIn } = useAsyncStorage();

  const isLoggedOut = !isLoading && (isLoggedIn !== 'true' || token === null);

  useEffect(() => {
    if (isLoggedOut) {
      const currentRoute = window?.location?.href;

      storeCurrentRoute(currentRoute); //save current route
      storeLoginIdentifier('false');

      replace('/login', undefined, {
        experimental: {
          nativeBehavior: 'stack-replace',
          isNestedNavigator: true
        }
      });
      return () => {};
    }
  }, [isLoggedOut, replace]);

  if (!isLoggedOut) {
    return children;
  }
};

export default ProtectedRoute;
