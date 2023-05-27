import * as React from 'react';
import Button from '@mui/material/Button';
import useAuthWithPermissions from '../../authentication/useAuthWithPermissions';

export default function AdminButton() {
    // eslint-disable-next-line no-unused-vars
    const [isAuthenticated, credentials, authKey, hasPermissions, callLogin, callLogout] = useAuthWithPermissions([
        'adminpanel.access',
    ]);

    if (isAuthenticated && hasPermissions) {
        return (
            <Button variant="" href={'/admin/item'} sx={{ display: { xs: 'none', md: 'flex', mr: 'auto' } }}>
                Admin
            </Button>
        );
    }
}
