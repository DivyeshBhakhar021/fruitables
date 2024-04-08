import { BATCH_URL } from "../../utilites/Utilites";
import { ADD_REVIEW, GET_REVIEW } from "../reducer/action.type"
import axios from 'axios';

export const addreview = (data) => async (dispatch) =>{

    try {
        await axios.post( BATCH_URL +'review',data)
        .then((response)=>dispatch({type:ADD_REVIEW,payload: response.data }))
        .catch((error)=>console.log(error))
        
    } catch (error) {
        
    }
}   


export const  getreview = () => async (dispatch) => {
    try {
        const response = await axios.get( BATCH_URL +'review')
        dispatch({ type : GET_REVIEW, payload : response.data })
    } catch (error) {
        console.log(error);
    }
}