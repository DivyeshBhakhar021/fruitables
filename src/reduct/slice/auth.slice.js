import { createAsyncThunk, createSlice, isRejectedWithValue } from "@reduxjs/toolkit"
import { BATCH_URL } from "../../utilites/Utilites"
import axios from "axios"

const initialstate = {
    isAuthanticated: false,
    isLogout:true,
    isLoding:true,
    data:null,
    error:null
}

export const register = createAsyncThunk(
    'auth/register',
    async(data,{rejectWithValue})=>{
        try {
            const resaopns = await axios.post(BATCH_URL+'users/useradd',data)
            // return resaopns.data
            console.log(resaopns);
            
        } catch (error) {
            console.log(error);
            return rejectWithValue("registertion error",error.response.data.message)
        }
    }
)

const authSlice = createSlice({
    name: "auth",
    initialState: initialstate,
    extraReducers: (bulider) =>{
        bulider.addCase(register.fulfilled,(state,ation)=>{
            state.isAuthanticated = false
            state.isLoding = false
            state.isLogout = true
            state.error = null
            state.data = ation.payload
        })
        bulider.addCase(register.rejected,(state,ation)=>{
            state.isAuthanticated = false
            state.isLoding = false
            state.isLogout = true
            state.error = ation.payload
            state.data = null
        })
    }
})

export default authSlice.reducer