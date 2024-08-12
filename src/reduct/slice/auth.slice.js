import { createAsyncThunk, createSlice, isRejectedWithValue } from "@reduxjs/toolkit"
import { BATCH_URL } from "../../utilites/Utilites"
import axios from "axios"

const initialstate = {
    isAuthanticated: false,
    isLogout: true,
    isLoding: true,
    data: null,
    error: null
}

export const register = createAsyncThunk(
    'auth/register',
    async (data, { rejectWithValue }) => {
        try {
            const resaopns = await axios.post(BATCH_URL + 'users/useradd', data)
            // return resaopns.data
            console.log(resaopns);

        } catch (error) {
            console.log(error);
            return rejectWithValue("registertion error", error.response.data.message)
        }
    }
)

export const login = createAsyncThunk(
    'auth/login',
    async (data, { rejectWithValue }) => {
        try {
            console.log(data);
            const response = await axios.post(BATCH_URL + 'users/login', data);
            console.log(response);

            // if (response.data === 200) {
            //     return response.data
            // }
        } catch (error) {
            console.log(error);
            return rejectWithValue('registration erorr.' + error.response.data.message)
        }

    }

)

const authSlice = createSlice({
    name: "auth",
    initialState: initialstate,
    extraReducers: (bulider) => {
        bulider.addCase(register.fulfilled, (state, action) => {
            state.isAuthanticated = false
            state.isLoding = false
            state.isLogout = true
            state.error = action.payload
            state.data = null
        })
        bulider.addCase(register.rejected, (state, action) => {
            state.isAuthanticated = false
            state.isLoding = false
            state.isLogout = true
            state.error = action.payload
            state.data = null
        })
        bulider.addCase(login.fulfilled, (state, action) => {
            state.isAuthanticated = false
            state.isLoding = false
            state.isLogout = true
            state.error = action.payload
            state.data = null
        })
        bulider.addCase(login.rejected, (state, action) => {
            state.isAuthanticated = false
            state.isLoding = false
            state.isLogout = true
            state.error = action.payload
            state.data = null
        })
    }
})

export default authSlice.reducer