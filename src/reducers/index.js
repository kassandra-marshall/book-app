import { ADD_SEARCH_CONTENT, ADD_TOKEN, ADD_USER, CLEAR_SEARCH_CONTENT, DELETE_USER } from "../actions/actions"
export const initialstate = {
    token: '',
    user: {
        email: '',
        name: '',
        image: ''
    },
    terms: '',
    book: {
        ID: '',
        Title: '',
        URL: ''
    }
}

const reducer = (state = initialstate, action) => {
    switch (action.type) {
        case ADD_USER:
            return {
                ...state,
                user: action.payload
            }
        case ADD_TOKEN:
            return {
                ...state,
                token: action.payload
            }
        case DELETE_USER: 
            return {
                token: '',
                user: {
                    email: '',
                    name: '',
                    image: ''
                },
                terms: ''
            }
        case ADD_SEARCH_CONTENT: 
            return {
                ...state,
                terms: action.payload
        }
        case CLEAR_SEARCH_CONTENT:
            return {
                ...state,
                terms: ''
            }
        default:
            return state;
    }
};

export default reducer;