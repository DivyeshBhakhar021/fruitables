import { BATCH_URL } from "../../utilites/Utilites";
import axios from 'axios';
import { GET_PRODUCT } from "../reducer/Product.action";


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


