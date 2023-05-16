import React from 'react';
import { Alert, Button, Container } from '@mui/material';
import { GoogleLogin } from '@react-oauth/google';

export default function AdminLanding() {
    const [isAuthConfirmationInProgress, setAuthConfirmationInProgress] = React.useState(true);
    const [authKey, setAuthKey] = React.useState(null);
    const [error, setError] = React.useState('');

    React.useEffect(() => {
        const authKey = localStorage.getItem('authKey');
        if (authKey) {
            setAuthKey(authKey);
        }
    }, []);

    React.useEffect(() => {
        setAuthConfirmationInProgress(true);
        if (!authKey) {
            setAuthConfirmationInProgress(false);
            return;
        }

        const verifyPermissions = async () => {
            console.log(`Bearer ${authKey}`);
            const response = await fetch('http://localhost:5000/user/haspermission?permission=items.see', {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${authKey}`,
                },
            });
            const hasAccess = await response.json();
            if (!hasAccess) {
                setAuthKey(null);
                setError('You do not have permission to access this page');
            }
            setAuthConfirmationInProgress(false);
        };
        verifyPermissions();
    }, [authKey]);

    if (isAuthConfirmationInProgress) return <Container>Authenticating...</Container>;

    if (!authKey && !isAuthConfirmationInProgress)
        return (
            <>
                {error.length > 0 && (
                    <Alert severity="error">
                        {error}
                        <br />
                        Please login to continue
                    </Alert>
                )}
                <GoogleLogin
                    onSuccess={(credentialResponse) => {
                        console.log(credentialResponse);
                        localStorage.setItem('authKey', credentialResponse.credential);
                        setAuthKey(credentialResponse.credential);
                        setAuthConfirmationInProgress(false);
                        setError('');
                    }}
                    onError={() => {
                        console.log('Login Failed');
                    }}
                />
            </>
        );

    return (
        <Container>
            {error.length > 0 && <Alert severity="error">{error}</Alert>}
            <h1>Admin Landing Page</h1>
            <Button
                onClick={() => {
                    localStorage.removeItem('authKey');
                    setAuthKey(null);
                }}
            >
                Logout
            </Button>
        </Container>
    );
}
