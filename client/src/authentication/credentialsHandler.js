export async function getCredentials(authKey) {
    if (authKey == null) {
        return null;
    }
    const result = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${authKey}`).then((response) => {
        if (!response.ok) {
            return null;
        }
        return response.json();
    });
    return result;
}

export async function getAndVerifyLocalStorageCredentials() {
    const authKey = localStorage.getItem('authKey');
    const credentials = await getCredentials(authKey);
    if (credentials == null) {
        localStorage.removeItem('authKey');
    }
    return credentials;
}
