import { GoogleOAuthProvider as GOAuthProvider } from '@react-oauth/google';

function GoogleOAuthProvider({ children }) {
  return <GOAuthProvider clientId="<your_client_id>">{children}</GOAuthProvider>;
}

export default GoogleOAuthProvider;
