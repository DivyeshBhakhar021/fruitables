import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    cart: [],
    isLoding: false,
    error: null
}

const creatSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            state.cart.push(action.payload)
        }
    }
})

export const { addToCart } = creatSlice.actions

export default creatSlice.reducer
