import { ADD_FACILITIES, DELETE_FACILITIES, EDIT_FACILITIES, GET_FACILITIES, LODING_FACILITIES } from "./action.type"

const initialState = {
    isLoding: false,
    facilities: [],
    error: null
}

export const facilitiesReducer = (state = initialState, action) => {
    console.log(action);
    switch (action.type) {
        case LODING_FACILITIES:
            return {
                ...state,
                isLoading: true
            }
        case GET_FACILITIES:
            return {
                ...state,
            }
        case ADD_FACILITIES:
            return {
                ...state,
                isLoading: false,
                facilities: state.facilities.concat(action.payload)
            }
        case DELETE_FACILITIES:
            return {
                ...state,
                isLoading: false,
                facilities: state.facilities.filter((v) => v.id !== action.payload)
            }
        case EDIT_FACILITIES:
            return {
                ...state,
                isLoading: false,
                facilities: state.facilities.map((v) => {
                    if (v.id === action.payload.id) {
                        return action.payload
                    } else {
                        return v
                    }
                })
            }
        default:
            return state
    }
}