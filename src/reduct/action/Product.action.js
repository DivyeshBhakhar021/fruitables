import axios from 'axios';
import { ADD_PRODUCT, DELETE_PRODUCT, EDIT_PRODUCT, ERROR_PRODUCT, GET_PRODUCT, LODING_PRODUCT } from "../reducer/action.type";
import { BATCH_URL } from '../../utilites/Utilites';
import axiosInstance from '../../utilites/axiosInstance';

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
        const response = await axiosInstance.get("productes/list-Product");
        dispatch({ type: GET_PRODUCT, payload: response.data });
    } catch (error) {
        dispatch(errorProduct(error.message));
    }
};

export const addPoduct = (data) => async (dispatch) => {
    dispatch(lodinProduct());
    console.log(data);
    try {
        const response = await axiosInstance.post("productes/addProduct", data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        console.log(response);
        dispatch({ type: ADD_PRODUCT, payload: response.data });
    } catch (error) {
        dispatch(errorProduct(error.message));
    }
};

export const deleteproduct = (id) => async (dispatch) => {
    // dispatch(lodinProduct());

    try {
        await axiosInstance.delete(`productes/deleteProduct/${id}`)
            .then(dispatch({ type: DELETE_PRODUCT, payload: id }))
    } catch (error) {
        dispatch(errorProduct(error.message));
    }
};

export const editdata = (data) => async (dispatch) => {
    // dispatch(lodinProduct());
    console.log(data);
    try {
        const response = await axiosInstance.put(`productes/updateProduct/${data._id}`, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        dispatch({ type: EDIT_PRODUCT, payload: response.data });
    } catch (error) {
        console.log("errr", error);
        dispatch(errorProduct(error.message));
    }
};
