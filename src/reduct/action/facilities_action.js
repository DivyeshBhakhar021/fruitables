import { ADD_FACILITIES } from "../reducer/action.type"

export const addfacilities = (data) => (dispatch) => {

    dispatch({
        type: ADD_FACILITIES,
        payload: data
    })
        
}