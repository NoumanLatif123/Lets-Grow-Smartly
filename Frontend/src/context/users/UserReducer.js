const AuthReducer = (state, action) => {
    switch (action.type) {
        case "GET_USERS_START":
            return {
                users: [],
                isFetching: true,
                error: false,
            };
        case "GET_USERS":
            return {
                users: action.payload,
                isFetching: false,
                error: false,
            };
        case "GET_USERS_FAILED":
            return {
                users: [],
                isFetching: false,
                error: true,
            };
        default:
            return state;
    }
};

export default AuthReducer;