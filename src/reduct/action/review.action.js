import axios from 'axios';
import { ADD_REVIEW } from '../reducer/action.type';
import { BATCH_URL } from '../../utilites/Utilites';

export const addreview = (data) => async (dispatch) =>{

    try {
        await axios.post( BATCH_URL + 'review',data)
        .then((response)=>dispatch({type:ADD_REVIEW,payload: response.data }))
        .catch((error)=>console.log(error))
    } catch (error) {
        
    }
}