import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App.jsx';
import '@/styles/index.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { googleOAuthCredential } from '@/helpers/googleCredentials';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={googleOAuthCredential}>
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>,
);
