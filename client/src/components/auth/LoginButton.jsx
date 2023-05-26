import * as React from 'react';
import Button from '@mui/material/Button';
import { useAuth } from '../../authentication/useAuth';

export default function LoginButton() {
    // eslint-disable-next-line no-unused-vars
    const [isAuthenticated, credentials, authKey, callLogin, callLogout] = useAuth();

    console.log(isAuthenticated);

    if (isAuthenticated) {
        return (
            <Button variant="contained" onClick={callLogout} sx={{ display: { xs: 'none', md: 'flex' } }}>
                Logout
            </Button>
        );
    }

    return (
        <Button variant="contained" onClick={callLogin} sx={{ display: { xs: 'none', md: 'flex' } }}>
            Login
        </Button>
    );
}
