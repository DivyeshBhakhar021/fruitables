import { createContext, useEffect, useReducer } from "react";
import axios from "axios";
import { BATCH_URL } from "../../utilites/Utilites";
import { ADD_ITEM, DELETE_ITEM, GET_ITEM, UPDATE_ITEM } from "../ActionType";
import { productReducer } from "./saleproduct/SaleProduct.reducer";

const initialState = {
    isLoading: false,
    products: [],
    error: null
};

export const productContext = createContext();

export const ProductProvider = ({ children }) => {
    const [state, dispatch] = useReducer(productReducer, initialState);


    useEffect(() => {
        getItem();
    }, []);

    const getItem = async () => {
        try {
            const response = await axios.get(BATCH_URL + 'product')
            dispatch({ type: GET_ITEM, payload: response.data })

        } catch (error) {
            console.error('Error getting items:', error);
        }
    }

    const addItem = async (data) => {
        try {
            const response = await axios.post(BATCH_URL + 'product', data);
            dispatch({ type: ADD_ITEM, payload: response.data });
        } catch (error) {
            console.error('Error adding item:', error);
        }
    };

    const deleteItem = async (id) => {
        try {
            await axios.delete(BATCH_URL + 'product/' + id);
            dispatch({ type: DELETE_ITEM, payload: id });
        } catch (error) {
            console.error('Error adding item:', error);
        }
    };

    const editItem = async (data) => {
        try {
            await axios.put(BATCH_URL + 'product/' + data.id, data);
            dispatch({ type: UPDATE_ITEM, payload: data });
        } catch (error) {
            console.error('Error adding item:', error);
        }
    };

    return (
        <productContext.Provider
            value={{
                ...state,
                addItem,
                getItem,
                deleteItem,
                editItem
            }}>
            {children}
        </productContext.Provider>
    );
};