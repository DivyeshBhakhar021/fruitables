import { ADD_FACILITIES, DELETE_FACILITIES, EDIT_FACILITIES, GET_FACILITIES, LODING_FACILITIES } from "../reducer/action.type"


export const getdata = () => (dispatch) => {
    dispatch({type:GET_FACILITIES})
}

export const handalisLoding = () => (dispatch) => {
    dispatch({type:LODING_FACILITIES})
}
export const addfacilities = (data) => (dispatch) => {
    dispatch(handalisLoding());
    setTimeout(()=>[
        dispatch({ type: ADD_FACILITIES, payload: data })
    ],2000)        
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
