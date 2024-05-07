import { createContext, useReducer } from "react"
import { contactReducer } from "./reducer/contact/Contact.reducer";
import { BATCH_URL } from "../utilites/Utilites";
import axios from "axios";
import React from "react";
import { GET_CONTACT } from "./ActionType";


const initialState = {
    isLoding: false,
    contact: [],
    error: null
}

export const Contactcantext = createContext();


export const ContaxtProvider = ({ children }) => {

    const [state, dispatch] = useReducer(contactReducer, initialState)

    const addContext = async (data) => {
        try {
            const response = await axios.post(BATCH_URL + 'contact', data)
            return response.data
        } catch (error) {
            console.log(error);
        }
    }

    const  getContact  = async () => {
        try {
            const response = await axios.get(BATCH_URL + 'contact')
            dispatch({ type: GET_CONTACT, payload: response.data })
        } catch (error) {
            console.log(error);
        }
    }

    return (    
        <Contactcantext.Provider
            value={{
                ...state,
                addContext,
                getContact
            }}
        >
            {children}
        </Contactcantext.Provider>
    )
}