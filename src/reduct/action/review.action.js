import axios from 'axios';
import { ADD_REVIEW, ERROR_REVIEW, LODING_REVIEW } from '../reducer/action.type';
import { BATCH_URL } from '../../utilites/Utilites';


const lodingreview = () => async (dispatch) => {
    dispatch({ type: LODING_REVIEW })
}

const errorgreview = (error) => async (dispatch) => {
    dispatch({ type: ERROR_REVIEW, payload: error })
}

export const addreview = (data) => async (dispatch) =>{

    try {
        dispatch(lodingreview());
        await axios.post( BATCH_URL + 'review',data)
        .then((response)=>dispatch({type:ADD_REVIEW,payload: response.data }))
        .catch((error)=>errorgreview(error.message))
    } catch (error) {
        
    }
}