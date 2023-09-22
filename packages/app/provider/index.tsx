import { SafeArea } from './safe-area';
import { QueryClient, QueryClientProvider, focusManager } from '@tanstack/react-query';
import { useOnlineManager } from 'app/hooks/useOnlineManager';
import { useAppState } from 'app/hooks/useAppState';
import { Platform } from 'react-native';
import { UserProvider } from 'app/context/UserContext';
import { NotificationsProvider } from 'app/context/NotificationsContext';
import GoogleOAuthProvider from './google-oauth';
import ThemeProvider from './theme-provider';

function onAppStateChange(status) {
  // React Query already supports in web browser refetch on window focus by default
  if (Platform.OS !== 'web') {
    focusManager.setFocused(status === 'active');
  }
}

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 2 } }
});
export function Provider({ children }: { children: React.ReactNode }) {
  useOnlineManager();

  useAppState(onAppStateChange);
  return (
    <SafeArea>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <UserProvider>
            <NotificationsProvider>
              <GoogleOAuthProvider>{children}</GoogleOAuthProvider>
            </NotificationsProvider>
          </UserProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </SafeArea>
  );
}
