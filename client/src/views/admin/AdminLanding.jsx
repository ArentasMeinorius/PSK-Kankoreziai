import React from 'react';
import { Button, Container } from '@mui/material';
import { GoogleLogin } from '@react-oauth/google';
import { useDispatch, useSelector } from 'react-redux';

export default function AdminLanding() {
    const dispatch = useDispatch();

    const [isAuthConfirmationInProgress, setAuthConfirmationInProgress] = React.useState(true);
    // eslint-disable-next-line no-unused-vars
    const authKey = useSelector((state) => state.authentication.authKey);
    const [user, setUser] = React.useState(null);

    React.useEffect(() => {
        setAuthConfirmationInProgress(true);
        if (authKey) {
            fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${authKey}`)
                .then((response) => response.json())
                .then((data) => {
                    if (data.error) {
                        dispatch({ type: 'CLEAR_AUTH_KEY' });
                        return;
                    }
                    setUser(data);
                })
                .catch((error) => {
                    dispatch({ type: 'CLEAR_AUTH_KEY' });
                    console.log(error);
                })
                .finally(() => {
                    setAuthConfirmationInProgress(false);
                });
            return;
        }
        setAuthConfirmationInProgress(false);
    }, [authKey]);

    if (isAuthConfirmationInProgress) return <Container>Authenticating...</Container>;
    if (!user && !isAuthConfirmationInProgress)
        return (
            <GoogleLogin
                onSuccess={(credentialResponse) => {
                    console.log(credentialResponse);
                    setUser(credentialResponse);
                    dispatch({ type: 'SET_AUTH_TOKEN', payload: { authKey: credentialResponse.credential } });
                    setAuthConfirmationInProgress(false);
                }}
                onError={() => {
                    console.log('Login Failed');
                }}
            />
        );

    return (
        <Container>
            <h1>Admin Landing Page</h1>
            <Button onClick={() => setUser(null)}>Logout</Button>
        </Container>
    );
}
