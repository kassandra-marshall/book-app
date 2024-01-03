export const ADD_USER = "ADD_USER";
export const ADD_TOKEN = "ADD_TOKEN";
export const DELETE_USER = "DELETE_USER";
export const ADD_SEARCH_CONTENT = "ADD_SEARCH_CONTENT";
export const CLEAR_SEARCH_CONTENT = "CLEAR_SEARCH_CONTENT";

export function addUser(newUser) {
    return {type: ADD_USER, payload: newUser};
};

export function addToken(token) {
    return {type: ADD_TOKEN, payload: token}
}

export function deleteUser() {
    return {type: DELETE_USER}
}

export function search(terms) {
    return {type: ADD_SEARCH_CONTENT, payload:terms}
}

export function clearTerms() {
    return {type: CLEAR_SEARCH_CONTENT}
}