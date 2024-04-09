import { BATCH_URL } from "../../utilites/Utilites";
import axios from 'axios';
import { ADD_PRODUCT, DELETE_PRODUCT, EDIT_PRODUCT, ERROR_PRODUCT, GET_PRODUCT, LODING_PRODUCT } from "../reducer/action.type";

const lodinProduct = () => async (dispatch) =>{
dispatch({type:LODING_PRODUCT})
}

const errorProduct = (error) => async (dispatch) =>{
    dispatch({type:ERROR_PRODUCT, payload:error})
}

export const productdata = () => async (dispatch) => {
    
    try {
        dispatch(lodinProduct());
       await axios.get( BATCH_URL +'fruit')
    .then((response)=>{
         dispatch({type:GET_PRODUCT,payload: response.data })
    })
    .catch((error)=>{
        dispatch(errorProduct(error.message))
    })
    } catch (error) {
        dispatch(errorProduct(error.message))
    }
}


export const addPoduct = (data) => async (dispatch) =>{

    try {
        dispatch(lodinProduct());
        await axios.post( BATCH_URL +'fruit',data)
        .then((response)=>dispatch({type:ADD_PRODUCT,payload: response.data }))
        .catch((error)=> dispatch(errorProduct(error.message)))
    } catch (error) {
        dispatch(errorProduct(error.message))
    }
}


export const deleteproduct = (id) =>async (dispatch) => {
    console.log(id);
    try {
        dispatch(lodinProduct());
        await axios.delete( BATCH_URL +'fruit/'+id)
        .then((response)=>dispatch({type:DELETE_PRODUCT,payload: id }))
        .catch((error)=> dispatch(errorProduct(error.message)))
        
    } catch (error) {
        dispatch(errorProduct(error.message))
    }
}

export const editdata = (data) =>async (dispatch) => {
    console.log(data);
    try {
        dispatch(lodinProduct());
        await axios.put( BATCH_URL +'fruit/'+data.id,data)
        .then((response)=>dispatch({type:EDIT_PRODUCT,payload: data }))
        .catch((error)=> dispatch(errorProduct(error.message)))
        
    } catch (error) {   
        dispatch(errorProduct(error.message))
    }
}