import { combineReducers } from "redux";
import { facilitiesReducer } from "./facilities_reducer";
import { productReducer } from "./product.reducer";
import { reviewReducer } from "./review.reducer";
import counterSlice from "../slice/counter.slice";
import cartSlice from "../../admin/component/cart/cart.slice";
import Productaction from "../action/Product.action";
import couponSlice from "../slice/coupon.slice";


export const rootReducer = combineReducers({
    facilities: facilitiesReducer,
    product: productReducer,
    review: reviewReducer,
    counter: counterSlice,
    Cart: cartSlice,
    cartinToolkit: cartSlice,
    coupon: couponSlice
})  

