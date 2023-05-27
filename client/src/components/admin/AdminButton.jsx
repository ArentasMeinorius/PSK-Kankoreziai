import * as React from 'react';
import Button from '@mui/material/Button';
import useAuthWithPermissions from "../../authentication/useAuthWithPermissions";

export default function AdminButton() {
    // eslint-disable-next-line no-unused-vars
    const [isAuthenticated, credentials, authKey, callLogin, callLogout] = useAuthWithPermissions([
        'items.see',
        'items.manage',
        'products.create'
    ]);;

    console.log(isAuthenticated);

    if (isAuthenticated) {
        return (
            <Button variant="" href={'/admin/item'} sx={{ display: { xs: 'none', md: 'flex', mr: 'auto' } }}>
                Admin
            </Button>
        );
    }
}
