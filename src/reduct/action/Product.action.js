import axios from 'axios';
import { ADD_PRODUCT, DELETE_PRODUCT, EDIT_PRODUCT, ERROR_PRODUCT, GET_PRODUCT, LODING_PRODUCT } from "../reducer/action.type";

const lodinProduct = () => ({
    type: LODING_PRODUCT
});

const errorProduct = (error) => ({
    type: ERROR_PRODUCT,
    payload: error
});

export const productdata = () => async (dispatch) => {
    // dispatch(lodinProduct());

    try {
        const response = await axios.get("http://localhost:5000/api/v1/productes/list-Product");
        dispatch({ type: GET_PRODUCT, payload: response.data });
    } catch (error) {
        dispatch(errorProduct(error.message));
    }
};

export const addPoduct = (data) => async (dispatch) => {
    // dispatch(lodinProduct());

    try {
        const response = await axios.post("http://localhost:5000/api/v1/productes/addProduct", data);
        dispatch({ type: ADD_PRODUCT, payload: response.data });
    } catch (error) {
        dispatch(errorProduct(error.message));
    }
};

export const deleteproduct = (id) => async (dispatch) => {
    // dispatch(lodinProduct());

    try {
        await axios.delete(`http://localhost:5000/api/v1/productes/deleteProduct/${id}`);
        dispatch({ type: DELETE_PRODUCT, payload: id });
    } catch (error) {
        dispatch(errorProduct(error.message));
    }
};

export const editdata = (data) => async (dispatch) => {
    // dispatch(lodinProduct());

    try {
        await axios.put(`http://localhost:5000/api/v1/productes/updateProduct/${data._id}`, data);
        dispatch({ type: EDIT_PRODUCT, payload: data });
    } catch (error) {
        dispatch(errorProduct(error.message));
    }
};
