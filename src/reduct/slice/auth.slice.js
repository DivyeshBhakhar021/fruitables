import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../utilites/axiosInstance"

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
            console.log(data);

            const resaopns = await axiosInstance.post('users/useradd', data)
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
            const response = await axiosInstance.post('users/login', data);
            console.log(response.data.data._id);

            if (response.status === 200) {
                localStorage.setItem("_id",response.data.data._id)
                return response.data
            }

        } catch (error) {
            console.log(error);
            return rejectWithValue('login erorr.' + error.response.data.message)
        }

    }

)

export const logout = createAsyncThunk(
    'auth/logout',
    async (_id, { rejectWithValue }) => {

        console.log(_id);

        try {

            const response = await axiosInstance.post('users/logout', { _id });
            console.log(response);

            if (response._id === 200) {
                return response._id
            }
        } catch (error) {
            console.log(error);
            return rejectWithValue('logout erorr.' + error.response.data.message)
        }

    }

)

export const chekauth = createAsyncThunk(
    'auth/chekauth',
    async (_, { rejectWithValue }) => {

        try {

            const response = await axiosInstance.post('users/chekhlogin');
            console.log(response);


            if (response.status == 200) {
                return response.data
            }

        } catch (error) {
            console.log(error);
            return rejectWithValue('chekhlogin erorr.' + error.response.data.message)
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
            state.error = null
            state.data = action.payload.data
        })
        bulider.addCase(register.rejected, (state, action) => {
            state.isAuthanticated = false
            state.isLoding = true
            state.isLogout = false
            state.error = action.payload
            state.data = null
        })
        bulider.addCase(login.fulfilled, (state, action) => {
            state.isAuthanticated = true
            state.isLoding = false
            state.isLogout = true
            state.error = null
            state.data = action.payload.data
        })
        bulider.addCase(login.rejected, (state, action) => {
            state.isAuthanticated = false
            state.isLoding = false
            state.isLogout = true
            state.error = action.payload
            state.data = null
        })
        bulider.addCase(logout.fulfilled, (state, action) => {
            console.log(action.payload);
            state.isAuthanticated = false
            state.isLoding = false
            state.isLogout = true
            state.error = null
            state.data = action.payload
        })
        bulider.addCase(chekauth.fulfilled, (state, action) => {
            console.log(action.payload.data);
            state.isAuthanticated = true
            state.isLoding = false
            state.isLogout = false
            state.error = null
            state.data = action.payload.data
        })
        bulider.addCase(chekauth.rejected, (state, action) => {
            state.isAuthanticated = false
            state.isLoding = false
            state.isLogout = true
            state.error = action.payload
            state.data = null
        })
    }
})

export default authSlice.reducer