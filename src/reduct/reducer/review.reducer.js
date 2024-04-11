import { ADD_REVIEW, DELETE_REVIEW, EDIT_REVIEW, ERROR_REVIEW, GET_REVIEW, LODING_REVIEW } from "./action.type";

const review_facilities = {
    isLoding: false,
    Error: null,
    review: []
}

export const reviewReducer = (state = review_facilities, action) => {
    console.log(action);
    switch (action.type) {
        case LODING_REVIEW:
            return {
                ...state,
                isLoding: true
            }
        case ERROR_REVIEW:
            return {
                ...state,
                isLoding: false,
                error: action.payload
            }
        case GET_REVIEW:
            return {
                isLoding: false,
                review: action.payload,
                error: null
            }
        case ADD_REVIEW:
            return {
                isLoding: false,
                review: state.review.concat(action.payload),
                error: null
            }
        case EDIT_REVIEW:
            return {
                isLoding: false,
                review: state.review.map((v) => v.id == action.payload.id ? action.payload : v),
                error: null
            }
        case DELETE_REVIEW:
            return {
                isLoding: false,
                review: state.review.filter((v) => v.id != action.payload),
                error: null
            }
        default:
            return state
    }
}