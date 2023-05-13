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
    console.log(result);
    return result;
}

export async function getAndVerifyLocalStorageCredentials() {
    const authKey = localStorage.getItem('authKey');
    const credentials = await getCredentials(authKey);
    console.log('credentials: ', credentials);
    if (credentials == null) {
        console.log('authKey invalid');
        localStorage.removeItem('authKey');
    }
    return credentials;
}
