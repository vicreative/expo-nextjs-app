import useAsyncStorage from 'app/hooks/useAsyncStorage';
import { useEffect } from 'react';
import { useRouter } from 'solito/router';
import { storeCurrentRoute, storeLoginIdentifier } from 'app/utils/auth';

const ProtectedRoute = ({ currentRoute, children }) => {
  const { replace } = useRouter();
  const { isLoading, token, isLoggedIn } = useAsyncStorage();

  const isLoggedOut = !isLoading && (isLoggedIn !== 'true' || token === null);

  useEffect(() => {
    if (isLoggedOut) {
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
  }, [currentRoute, isLoggedOut, replace]);

  if (!isLoggedOut) {
    return children;
  }
};

export default ProtectedRoute;
