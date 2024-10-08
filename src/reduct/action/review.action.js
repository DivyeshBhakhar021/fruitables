import { BATCH_URL } from "../../utilites/Utilites";
import { ADD_REVIEW, DELETE_REVIEW, EDIT_REVIEW, ERROR_REVIEW, GET_REVIEW, LODING_REVIEW } from "../reducer/action.type"
import axios from 'axios';


const lodingreview = () => async (dispatch) => {
    dispatch({ type: LODING_REVIEW })
}

const errorgreview = (error) => async (dispatch) => {
    dispatch({ type: ERROR_REVIEW, payload: error })
}

export const  getreview = () => async (dispatch) => {
    try {
        dispatch(lodingreview());
        const response = await axios.get( BATCH_URL +'review')
        dispatch({ type : GET_REVIEW, payload : response.data })
    } catch (error) {
        errorgreview(error.message);
    }
}
export const addreview = (data) => async (dispatch) =>{

    try {
        dispatch(lodingreview());
        await axios.post( BATCH_URL + 'review',data)
        .then((response)=>dispatch({type:ADD_REVIEW,payload: response.data }))
        .catch((error)=>errorgreview(error.message))
    } catch (error) {
        errorgreview(error.message);
    }
}

export const deletereview = (id) => async (dispatch) => {

    try {
        dispatch(lodingreview());
        await axios.delete( BATCH_URL + 'review/'+id)
        .then((response)=>dispatch({type:DELETE_REVIEW,payload: id}))
        .catch((error)=>errorgreview(error.message))
    } catch (error) {
        errorgreview(error.message);
    }
}


export const editreview = (data) => async (dispatch) => {

    try {
        dispatch(lodingreview());
        await axios.put( BATCH_URL + 'review/'+data.id,data)
        .then((response)=>dispatch({type:EDIT_REVIEW,payload: response.data }))
        .catch((error)=>errorgreview(error.message))
    } catch (error) {
        errorgreview(error.message);
    }
}