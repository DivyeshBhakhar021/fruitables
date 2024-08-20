import { combineReducers } from "redux";
import { facilitiesReducer } from "./facilities_reducer";
import { productReducer } from "./product.reducer";
import { reviewReducer } from "./review.reducer";
import counterSlice from "../slice/counter.slice";
import cartSlice from "../../admin/component/cart/cart.slice";
import couponSlice from "../slice/coupon.slice";
import saleingSlice from "../slice/saleing.slice";
import { categoryReducer } from "./category.reducer";
import subcategorySlice from "../slice/subcategory.slice";
import variantsSlice from "../slice/variants.slice";
import salespeopleSlice from "../slice/salespeople.slice";
import authSlice from "../slice/auth.slice";
import alertSlice from "../slice/alert.slice";


export const rootReducer = combineReducers({
    facilities: facilitiesReducer,
    product: productReducer,
    review: reviewReducer,
    counter: counterSlice,
    Cart: cartSlice,
    cartinToolkit: cartSlice,
    coupon: couponSlice,
    saleing: saleingSlice,
    category: categoryReducer,
    subcategory: subcategorySlice,
    variants: variantsSlice,
    salespeople: salespeopleSlice,
    auth: authSlice,
    alert: alertSlice
})


