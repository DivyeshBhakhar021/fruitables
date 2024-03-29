import { ADD_FACILITIES } from "./action.type"

const initialState ={
    isLoding:false,
    facilities:[],
    error:null
}

export const facilitiesReducer =(state=initialState,action)=>{

    switch(action.type){
        case ADD_FACILITIES:
            return {
                ...state,
                facilities: state.facilities.concat(action.payload)
            }
        default:
            return state
    }
}