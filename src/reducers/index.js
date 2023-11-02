import { ADD_TOKEN, ADD_USER, DELETE_USER } from "../actions/actions"
export const initialstate = {
    token: '',
    userID: ''
}

const reducer = (state = initialstate, action) => {
    switch (action.type) {
        case ADD_USER:
            return {
                ...state,
                userID: action.payload
            }
        case ADD_TOKEN:
            return {
                ...state,
                token: action.payload
            }
        case DELETE_USER: 
            return {
                state
            }
        default:
            return state;
    }
};

export default reducer;