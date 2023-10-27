export const ADD_USER = "ADD_USER";
export const ADD_TOKEN = "ADD_TOKEN";

export function addUser(newUser) {
    return {type: ADD_USER, payload: newUser};
};

export function addToken(token) {
    return {type: ADD_TOKEN, payload: token}
}