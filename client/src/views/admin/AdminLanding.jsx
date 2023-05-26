import React from 'react';
import { Button, Container } from '@mui/material';
import useAuthWithPermissions from '../../authentication/useAuthWithPermissions';

export default function AdminLanding() {
    // eslint-disable-next-line no-unused-vars
    const [isAuthenticated, credentials, authKey, hasPermissions, callLogin, callLogout] = useAuthWithPermissions([
        'items.see',
        'items.manage',
    ]);

    if (!isAuthenticated) {
        return (
            <Container>
                <h1>Admin Landing Page</h1>
                <p>You are not logged in.</p>
            </Container>
        );
    }

    if (!hasPermissions) {
        return (
            <Container>
                <h1>Admin Landing Page</h1>
                <p>You do not have permission to view this page.</p>
                <Button onClick={callLogout}>Logout</Button>
            </Container>
        );
    }

    return (
        <Container>
            <h1>Admin Landing Page</h1>
            <Button onClick={callLogout}>Logout</Button>
        </Container>
    );
}
