// import { ADD_CATEGORY, DELETE_CATEGORY, GET_CATEGORY, UPDATE_CATEGORY } from "./action.type";

// const initialState = {
//     isLoading: false,
//     category: [],
//     error: null
// };

// export const categoryReducer = (state = initialState, action) => {
//     console.log(action);

//     switch (action.type) {
//         case GET_CATEGORY:
//             return {
//                 ...state,
//                 isLoading: false,
//                 category: action.payload,
//                 error: null
//             };

//         case ADD_CATEGORY:
//             return {
//                 ...state,
//                 isLoading: false,
//                 category: state.category.concat(action.payload.data),
//                 error: null
//             };

//         case DELETE_CATEGORY:
//             return {
//                 ...state,
//                 isLoading: false,
//                 category: state.category.filter((v) => v._id !== action.payload),
//                 error: null
//             };

//         case UPDATE_CATEGORY:
//             return {
//                 ...state,
//                 isLoading: false,
//                 category: state.category.map((v) => v._id === action.payload.data._id ? action.payload.data : v),
//                 error: null
//             };

//         default:
//             return state;
//     }
// };

import { ADD_CATEGORY, DELETE_CATEGORY, GET_CATEGORY, UPDATE_CATEGORY } from "./action.type";

const initialState = {
    isLoading: false,
    category: [],
    error: null
};

export const categoryReducer = (state = initialState, action) => {
    console.log(action);

    switch (action.type) {
        case GET_CATEGORY:
            return {
                ...state,
                isLoading: false,
                category: action.payload,
                error: null
            };

        case ADD_CATEGORY:
            return {
                ...state,
                isLoading: false,
                category: state.category.concat(action.payload.data), // `payload.data` is expected from axios
                error: null
            };

        case DELETE_CATEGORY:
            return {
                ...state,
                isLoading: false,
                category: state.category.filter((v) => v._id !== action.payload),
                error: null
            };

        case UPDATE_CATEGORY:
            return {
                ...state,
                isLoading: false,
                category: state.category.map((v) => v._id === action.payload.data._id ? action.payload.data : v),
                error: null
            };

        default:
            return state;
    }
};
