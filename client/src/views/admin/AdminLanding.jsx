import React from 'react';
import {Button, Container, Typography} from '@mui/material';
import useAuthWithPermissions from '../../authentication/useAuthWithPermissions';
import {AdminHeader} from "../../components/admin/AdminHeader";
import LoginButton from "../../components/auth/LoginButton";

export default function AdminLanding() {
    // eslint-disable-next-line no-unused-vars
    const [isAuthenticated, credentials, authKey, hasPermissions, callLogin, callLogout] = useAuthWithPermissions([
        'items.see',
        'items.manage',
    ]);

    if (!isAuthenticated) {
        return (
            <Container>
                <Typography variant={"h5"} sx={{
                    mt: 2
                }}>Admin Landing Page</Typography>
                <Typography>You are not logged in.</Typography>
                <LoginButton/>
            </Container>
        );
    }

    if (!hasPermissions) {
        return (
            <Container>
                <Typography variant={"h5"} sx={{
                    mt: 2
                }}>Admin Landing Page</Typography>
                <Typography>You do not have permission to view this page.</Typography>
                <Button onClick={callLogout}>Logout</Button>
            </Container>
        );
    }

    return (
        <Container>
            <AdminHeader/>
            <Typography variant={"h5"} sx={{
                mt: 2
            }}>Admin Landing Page</Typography>
            <Button onClick={callLogout}>Logout</Button>
        </Container>
    );
}
