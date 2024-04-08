import { ADD_REVIEW, GET_REVIEW } from "./action.type";

const review_facilities = {
    isLoding : false,
    Error:null,
    review : []
}

export  const reviewReducer = (state = review_facilities, action) => {
    console.log(action);
    switch (action.type) {
        case GET_REVIEW:
            return{
                isLoading: false,
                review: action.payload,
                error:null
            }
            case ADD_REVIEW:
            return{
                isLoading: false,
                review: state.review.concat(action.payload),
                error:null
            }
        default:
            return state
    }
}