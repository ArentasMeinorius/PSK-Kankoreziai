import { useState, useEffect } from 'react';
import { useGoogleLogin, googleLogout } from '@react-oauth/google';

export function useAuth() {
    const [credentials, setCredentials] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [authKey, setAuthKey] = useState(null);

    const callLogin = useGoogleLogin({
        onSuccess: (response) => {
            console.log(response);
            updateAuthKey(response.access_token);
            handleLogin();
        },
        onError: (res) => {
            console.log('error', res);
        },
        flow: 'implicit',
    });

    function handleLogin() {
        console.log('handleLogin');
        getCredentials(getAuthKey()).then((credentials) => {
            setCredentials(credentials);
            setIsAuthenticated(true);
        });
    }

    function callLogout() {
        googleLogout();
        setCredentials(null);
        setIsAuthenticated(false);
        removeAuthKey();
    }

    function updateAuthKey(authKey) {
        localStorage.setItem('authKey', authKey);
        setAuthKey(authKey);
    }

    useEffect(() => {
        async function getAndVerifyCredentials() {
            const authKey = getAuthKey();
            const credentials = await getCredentials(authKey);
            if (credentials == null) {
                removeAuthKey();
            }
            return credentials;
        }
        getAndVerifyCredentials().then((credentials) => {
            if (credentials != null) {
                setCredentials(credentials);
                setIsAuthenticated(true);
                setAuthKey(getAuthKey());
            }
        });
    }, []);
    return [isAuthenticated, credentials, authKey, callLogin, callLogout];
}

async function getCredentials(authKey) {
    if (authKey == null) {
        return null;
    }
    const result = await fetch(`https://oauth2.googleapis.com/tokeninfo?access_token=${authKey}`).then((response) => {
        if (!response.ok) {
            return null;
        }
        return response.json();
    });
    console.log(result);
    return result;
}

function removeAuthKey() {
    localStorage.removeItem('authKey');
}

function getAuthKey() {
    return localStorage.getItem('authKey');
}
