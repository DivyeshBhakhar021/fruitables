import { ADD_FACILITIES, DELETE_FACILITIES, EDIT_FACILITIES, LODING_FACILITIES } from "../reducer/action.type"


export const handleLoading = () => (dispatch) => {
    dispatch({ type: LODING_FACILITIES })
}

export const addfacilities = (data) => (dispatch) => {
   dispatch(handleLoading());
    setTimeout(() => {
        dispatch({ type: ADD_FACILITIES, payload: data })
    }, 2000)
        
}

export const deleteFacilities = (id) => (dispatch) => {

    dispatch({
        type: DELETE_FACILITIES,
        payload: id
    })
        
}

export const editFacilities = (data) => (dispatch) => {

    dispatch({
        type: EDIT_FACILITIES,
        payload: data
    })
        
}
