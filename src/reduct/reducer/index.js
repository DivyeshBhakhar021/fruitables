import { combineReducers } from "redux";
import { facilitiesReducer } from "./facilities_reducer";

export const rootReducer = combineReducers({    
    facilities :facilitiesReducer
})