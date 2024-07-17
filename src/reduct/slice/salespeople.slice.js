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

// export const handleAdd = createAsyncThunk("variants/add", async (data) => {
//   console.log(data);
//   try {
//     const response = await axios.post("http://localhost:5000/api/v1/variants/add-variant", data, {
//       headers: {
//         'Content-Type': 'multipart/form-data'
//       }
//     });
//     const dataAdd = response.data.data;
//     console.log(dataAdd);
//     return dataAdd
//   } catch (error) {
//     console.error("Error adding variant:", error);
//     throw error;
//   }
// });
// export const handleUpdateData = createAsyncThunk("variants/edit", async (data) => {
//   // console.log(data);
//   try {
//     const response = await axios.put(`http://localhost:5000/api/v1/variants/update-variant/${data._id}`, data, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     });
//     return response.data.data;
//   } catch (error) {
//     console.error("Error adding variant:", error);
//     throw error;
//   }
// });

// export const handleRemove = createAsyncThunk("variants/delete", async (id) => {
//   try {
//     await axios.delete(`http://localhost:5000/api/v1/variants/delete-variant/${id}`);
//     return id;
//   } catch (error) {
//     console.log(error);
//   }
// });

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
    //   .addCase(handleAdd.fulfilled, (state, action) => {
    //     console.log(state, action);
    //     state.variants = state.variants.concat(action.payload);
    //   })
    //   .addCase(handleUpdateData.fulfilled, (state, action) => {
    //     state.variants = state.variants.map((v) => {
    //       if (v._id === action.payload._id) {
    //         return action.payload;
    //       } else {
    //         return v;
    //       }
    //     });
    //   })
    //   .addCase(handleRemove.fulfilled, (state, action) => {
    //     console.log(state, action);
    //     state.variants = state.variants.filter((v) => v._id !== action.payload);
    //   });
  },
});

export default SalespeopleSlice.reducer;
