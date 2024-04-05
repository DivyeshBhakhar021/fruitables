    import { combineReducers } from "redux";
    import { facilitiesReducer } from "./facilities_reducer";
    import { productReducer } from "./product.reducer";

    export const rootReducer = combineReducers({    
        facilities :facilitiesReducer,
        product:productReducer,
    })