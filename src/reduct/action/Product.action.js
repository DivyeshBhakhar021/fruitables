import { BATCH_URL } from "../../utilites/Utilites";
import axios from 'axios';
import { GET_PRODUCT } from "../reducer/Product.action";


export const productdata = (data) => (dispatch) => {
    dispatch({type:GET_PRODUCT,payload:data})
    try {
        axios.get( BATCH_URL +'fruit')
    .then((response)=>{
        console.log(response);
    })
    .catch((error)=>{
        console.log(error);
    })
    } catch (error) {
       console.log(error); 
    }
}