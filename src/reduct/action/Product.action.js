import { BATCH_URL } from "../../utilites/Utilites";
import axios from 'axios';
import { ADD_PRODUCT, DELETE_PRODUCT, EDIT_PRODUCT, GET_PRODUCT } from "../reducer/action.type";


export const productdata = () => async (dispatch) => {
    
    try {
       await axios.get( BATCH_URL +'fruit')
    .then((response)=>{
         dispatch({type:GET_PRODUCT,payload: response.data })
    })
    .catch((error)=>{
        console.log(error);
    })
    } catch (error) {
       console.log(error); 
    }
}


export const addPoduct = (data) => async (dispatch) =>{

    try {
        await axios.post( BATCH_URL +'fruit',data)
        .then((response)=>dispatch({type:ADD_PRODUCT,payload: response.data }))
        .catch((error)=>console.log(error))
    } catch (error) {
        
    }
}


export const deleteproduct = (id) =>async (dispatch) => {
    console.log(id);
    try {
        await axios.delete( BATCH_URL +'fruit/'+id)
        .then((response)=>dispatch({type:DELETE_PRODUCT,payload: id }))
        .catch((error)=>console.log(error))
        
    } catch (error) {
        
    }
}

export const editdata = (data) =>async (dispatch) => {
    console.log(data);
    try {
        await axios.delete( BATCH_URL +'fruit/'+data.id)
        .then((response)=>dispatch({type:EDIT_PRODUCT,payload: data }))
        .catch((error)=>console.log(error))
        
    } catch (error) {
        
    }
}