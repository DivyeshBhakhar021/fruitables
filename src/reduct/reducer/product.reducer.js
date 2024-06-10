import { ADD_PRODUCT, DELETE_PRODUCT, EDIT_PRODUCT, ERROR_PRODUCT, GET_PRODUCT, LODING_PRODUCT } from "./action.type";

const product_facilities = {
    isLoding: false,
    Error: null,
    product: []
}

export const productReducer = (state = product_facilities, action) => {
    console.log(action);
    switch (action.type) {
        case LODING_PRODUCT:
            return {
                ...state,
                isLoding: true
            }
        case ERROR_PRODUCT:
            return {
                ...state,
                isLoding: false,
                error: action.payload
            }
        case GET_PRODUCT:   
            return {
                isLoding: false,
                product: action.payload.data,
                error: null
            }
        case ADD_PRODUCT:
            return {
                isLoding: false,
                product: state.product.concat(action.payload.data),
                error: null
            }
        case DELETE_PRODUCT:
            return {
                isLoding: false,
                product: state.product.filter(((v) => v.id !== action.payload.data)),
                error: null
            }
        case EDIT_PRODUCT:
            return {
                isLoding: false,
                product: state.product.map((v) => {
                    if (v.id === action.payload.data.id) {
                        return action.payload.data
                    } else {
                        return v
                    }
                }),
                error: null
            }
        default:
            return state
    }
}