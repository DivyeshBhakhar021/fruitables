    import { combineReducers } from "redux";
    import { facilitiesReducer } from "./facilities_reducer";
    import { productReducer } from "./product.reducer";
import { reviewReducer } from "./review.reducer";
import counterSlice from "../slice/counter.slice";

    export const rootReducer = combineReducers({    
        facilities :facilitiesReducer,
        product:productReducer,
        review:reviewReducer,
        counter:counterSlice
    })