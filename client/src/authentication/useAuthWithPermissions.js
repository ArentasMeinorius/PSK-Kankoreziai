import { useEffect, useState } from 'react';
import { useAuth } from './useAuth';

export default function useAuthWithPermissions(permissions) {
    // eslint-disable-next-line no-unused-vars
    const [isAuthenticated, credentials, authKey, callLogin, callLogout] = useAuth();
    // eslint-disable-next-line no-unused-vars
    const [hasPermissions, setHasPermissions] = useState(false);

    const hasPermission = async (permission) => {
        const response = await fetch(`http://localhost:5000/user/haspermission?permission=${permission}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${authKey}`,
            },
        });
        const hasAccess = await response.json();
        console.log(`permission ${permission} has access: ${hasAccess}`);
        if (!hasAccess) {
            return false;
        }
        return true;
    };

    const checkPermissions = async () => {
        if (permissions.length === 0) {
            setHasPermissions(true);
            return;
        }
        const hasAccess = await Promise.all(permissions.map((permission) => hasPermission(permission)));
        if (hasAccess.every((access) => access)) {
            setHasPermissions(true);
        }
    };

    useEffect(() => {
        if (isAuthenticated && authKey) {
            console.log('Checking permissions');
            checkPermissions();
        }
    }, [isAuthenticated, credentials, authKey]);

    return [isAuthenticated, credentials, authKey, hasPermissions, callLogin, callLogout];
}
