import { createAsyncThunk,createSlice } from "@reduxjs/toolkit"
import { BATCH_URL } from "../../utilites/Utilites"
import axios from "axios";

const initialState = {
    saleing: [],
    isLoding: false,
    error:null
}

export const addsaleing = createAsyncThunk(
    'saleing/add',
    async(data)=>{
        try {
            const resaopns = await axios.post(BATCH_URL+'saleing',data)
            return resaopns.data
        } catch (error) {
            
        }
    }
) 


export const getsaleing = createAsyncThunk(
    'saleing/get',
    async()=>{
        try {
            const resaopns = await axios.get(BATCH_URL+'saleing')
            return resaopns.data
        } catch (error) {
            
        }
    }
) 


export const deletesaleing = createAsyncThunk(
    'saleing/delete',
    async(id)=>{
        try {
            await axios.delete(BATCH_URL+'saleing/'+id)
            return id
        } catch (error) {
            
        }
    }
) 


export const editsaleing = createAsyncThunk(
    'saleing/edit',
    async(data)=>{
        try {
            const resaopns = await axios.put(BATCH_URL+'saleing/'+data.id,data)
            return resaopns.data
        } catch (error) {
            
        }
    }
)



export const saleingSlice = createSlice({
    name: 'saleing',
    initialState,
    reducers : {

    },
    extraReducers: (builder) => {
        builder.addCase(addsaleing.fulfilled,(state,action)=>{
            console.log(action);
            state.saleing = state.saleing.concat(action.payload)
        })
        builder.addCase(getsaleing.fulfilled,(state,action)=>{
            state.saleing = action.payload
        })
        builder.addCase(deletesaleing.fulfilled,(state,action)=>{
            state.saleing= state.saleing.filter((v)=>v.id !== action.payload)
        })
        builder.addCase(editsaleing.fulfilled,(state,action)=>{
            state.saleing = state.saleing.map((v)=>{
                if(v.id === action.payload.id){
                    return action.payload
                }
                return v
            })
        })
    }
})

export default saleingSlice.reducer;