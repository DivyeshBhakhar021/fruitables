import { ADD_PRODUCT, DELETE_PRODUCT, EDIT_PRODUCT, GET_PRODUCT } from "./action.type";

const product_facilities = {
    isLoding : false,
    Error:null,
    product : []
}

export  const productReducer = (state = product_facilities, action) => {
    console.log(action);
    switch (action.type) {
        case GET_PRODUCT:
            return{
                isLoading: false,
                product: action.payload,
                error:null
            }
            case ADD_PRODUCT:
            return{
                isLoading: false,
                product: state.product.concat(action.payload),
                error:null
            }
            case DELETE_PRODUCT:
            return{
                isLoading: false,
                product: state.product.filter(((v) => v.id !==  action.payload)),
                error:null
            }
            case EDIT_PRODUCT:
            return{
                isLoading: false,
                product: state.product.map((v) => {
                    if (v.id === action.payload.id) {
                        return action.payload
                    } else {
                        return v
                    }
                }),
                error:null
            }
        default:
            return state
    }
}