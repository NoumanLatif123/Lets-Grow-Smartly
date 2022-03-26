export const GetUsersStart = (userCredentials) => ({
    type: "GET_USERS_START",
});

export const GetUsers = (users) => ({
    type: "GET_USERS",
    payload: users
});

export const GetUsersFailed = () => ({
    type: "GET_USERS_FAILED",
});
