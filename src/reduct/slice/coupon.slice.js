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

export const getCoupon = createAsyncThunk(
    'coupon/get',
    async () => {
        try {
            const resaopns = await axios.get(BATCH_URL + "coupon")
            return resaopns.data
        } catch (error) {
            console.log(error);
        }
    }
)

export const deleteCoupon = createAsyncThunk(
    'coupon/delete',
    async (id) => {
        try {
            await axios.delete(BATCH_URL + "coupon/" + id)
            return id
        } catch (error) {
            console.log(error);
        }
    }
)

export const editCoupons = createAsyncThunk(
    'coupon/edit',
    async (data) => {
        try {
            const response = await axios.put(BATCH_URL + 'coupon/' + data.id, data)
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
            state.coupon = state.coupon.concat(action.payload);
        })
        builder.addCase(getCoupon.fulfilled, (state, action) => {
            state.coupon = action.payload
        })
        builder.addCase(deleteCoupon.fulfilled, (state, action) => {
            state.coupon = state.coupon.filter((v) => v.id !== action.payload)
        })
        builder.addCase(editCoupons.fulfilled, (state, action) => {
            state.coupon = state.coupon.map((v) => {
                if (v.id === action.payload.id) {
                    return action.payload
                } else {
                    return v
                }
            })

        })

    }

});

// export const { } = couponSlice.actions;



export default couponSlice.reducer;