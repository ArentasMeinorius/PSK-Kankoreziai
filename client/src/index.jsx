import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
//import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    //<GoogleOAuthProvider clientId="847584482389-1dt7f1iq1t1q9eapliede1r05s3r96qd.apps.googleusercontent.com">
    <React.StrictMode>
        <App />
    </React.StrictMode>
    //</GoogleOAuthProvider>
);
