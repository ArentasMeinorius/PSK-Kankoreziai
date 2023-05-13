const initialState = {
    authKey: null,
    expirationTime: null,
};

const authenticationReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_AUTH_KEY':
            return {
                ...state,
                authKey: action.payload.authKey,
            };
        case 'CLEAR_AUTH_KEY':
            return {
                ...state,
                authKey: null,
            };
        default:
            return state;
    }
};

export default authenticationReducer;
