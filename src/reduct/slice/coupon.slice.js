import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BATCH_URL } from "../../utilites/Utilites";

const initialState = {
    coupon: [],
    isLoading: false,
    error: null
};


export const addCoupon = createAsyncThunk(
    'coupon/add',
    async (data) => {
        try {
            const response = await axios.post(BATCH_URL + "coupon", data)
            console.log(response.data);
            return response.data
        } catch (error) {

        }

    }
)

export const getCoupons = createAsyncThunk (
    'coupon/get',
    async()=>{
        try {
            const response = await axios.get(BATCH_URL +'coupon')
            return response.data
        } catch (error) {
            return error.massage
        }
    }
)

export const deleteCoupons = createAsyncThunk (
    'coupon/delete',
    async(id)=>{
        try {
            const response = await axios.delete(BATCH_URL +`coupon/${id}`)
            return id
        } catch (error) {
            return error.massage
        }
    }
)


export const editCoupons = createAsyncThunk (
    'coupon/edit',
    async(newdata,id)=>{
        try {
            const response = await axios.put(BATCH_URL +`coupon/${id}` ,newdata)
            return response.data
        } catch (error) {
            return error.massage
        }
    }
)

export const couponSlice = createSlice({
    name: "coupon",
    initialState: initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(addCoupon.fulfilled, (state, action) => {
            console.log(action);
            state.coupon= state.coupon.concat(action.payload);
        })
        builder.addCase(getCoupons.fulfilled, (state, action) => {
            console.log(action);
            state.coupon = action.payload
        })
        builder.addCase(deleteCoupons.fulfilled, (state, action) => {
            console.log(action);
            state.coupon = state.coupon.filter((v)=> v.id !== action.payload);
            
        })
        builder.addCase(editCoupons.fulfilled,(state,action)=>{
            state.coupon.map((v)=> v.id === action.payload.id ? action.payload : v)
        })
        
    }

});

// export const { } = couponSlice.actions;



export default couponSlice.reducer;