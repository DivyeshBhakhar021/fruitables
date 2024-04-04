import { GET_PRODUCT } from "./Product.action";

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
            
        default:
            return state
    }
}