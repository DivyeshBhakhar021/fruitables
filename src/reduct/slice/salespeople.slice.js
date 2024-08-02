import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  Salespeople: [],
  error: null,
};

export const getSalespeopleData = createAsyncThunk("salespeople/get", async () => {
  const response = await axios.get("http://localhost:5000/api/v1/salespeople/list-salespeople");
  console.log(response);
  const data = response.data.data;
  console.log(data);
  return data;
});

export const handleAdd = createAsyncThunk("salespeople/add", async (data) => {
  console.log(data);
  try {
    const response = await axios.post("http://localhost:5000/api/v1/salespeople/add-salespeople", data, {
    });
    const dataAdd = response.data.data;
    console.log(dataAdd);
    return dataAdd
  } catch (error) {
    console.error("Error adding salespeople:", error);
    throw error;
  }
});
export const handleUpdateData = createAsyncThunk("salespeople/edit", async (data) => {
  console.log(data);
  try {
    const response = await axios.put(`http://localhost:5000/api/v1/salespeople/update-salespeople/${data.snum}`, data); 
    console.log(response.data.data);   
    return  response.data.data;
    
  } catch (error) {
    console.error("Error adding salespeople:", error);
    throw error;
  }
});

export const handleRemove = createAsyncThunk("salespeople/delete", async (snum) => {
  try {
    await axios.delete(`http://localhost:5000/api/v1/salespeople/delete-salespeople/${snum}`);
    return snum;
  } catch (error) {
    console.log(error);
  }
});

const SalespeopleSlice = createSlice({
  name: "salespeople",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSalespeopleData.fulfilled, (state, action) => {
        console.log(state, action);
        state.Salespeople = action.payload;
      })
      .addCase(handleAdd.fulfilled, (state, action) => {
        console.log(state, action);
        state.Salespeople = state.Salespeople.concat(action.payload);
      })
      .addCase(handleUpdateData.fulfilled, (state, action) => {
        console.log(action.payload);
        state.Salespeople = state.Salespeople.map((v) => {
          if (v.snum === action.payload.snum) {
            return action.payload;
          } else {
            return v;
          }
        });
      })
      .addCase(handleRemove.fulfilled, (state, action) => {
        console.log("hello",state, action);
        state.Salespeople = state.Salespeople.filter((v) => v.snum !== action.payload);
      });
  },
});

export default SalespeopleSlice.reducer;
