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
            console.log(action);
            const index = state.cart.findIndex((v)=>v.pid === action.payload.id)

            if (index !== -1) {
               state.cart[index].qty+= action.payload.qty
            } else{
                state.cart.push({pid:action.payload.id,qty:action.payload.qty})
            }
        },
        incrementQty : (state,action) => {
            const index = state.cart.findIndex((v)=>v.pid === action.payload)
            state.cart[index].qty++
        },
        decrementQty : (state,action) => {

            const index = state.cart.findIndex((v)=>v.pid === action.payload)
           
            if (index !== -1) {
                if (state.cart[index].qty > 1) {
                    state.cart[index].qty--
                    
                }
                
            }
        }, 
        removeQty : (state,action) => {
            const fdata = state.cart.filter((v)=>v.pid !== action.payload)
            
                state.cart.splice(fdata,1)
                
            
        }
        
    }
})

export const { addToCart ,incrementQty,decrementQty,removeQty} = creatSlice.actions

export default creatSlice.reducer
