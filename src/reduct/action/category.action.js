// import { ADD_CATEGORY, DELETE_CATEGORY, GET_CATEGORY, UPDATE_CATEGORY } from '../reducer/action.type';

// export const getCategory = () => async (dispatch) => {
//     try {
//         const response = await fetch('http://localhost:5000/api/v1/categories/get-categorie');
//         const data = await response.json();
//         console.log(response);
        
//         dispatch({ type: GET_CATEGORY, payload: data.data });
//     } catch (error) {
//         console.error('Error fetching categories:', error);
//     }
// };  

// export const addCategory = (category) => async (dispatch) => {
//     try {
//         const response = await fetch('http://localhost:5000/api/v1/categories/addcategories/', {
//             method: 'POST',
//             body: JSON.stringify(category),
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         });
//         const data = await response.json();
//         dispatch({ type: ADD_CATEGORY, payload: data });
//     } catch (error) {
//         console.error('Error adding category:', error);
//     }
// };

// export const deleteCategory = (id) => async (dispatch) => {
//     try {
//         await fetch(`http://localhost:5000/api/v1/categories/deleteCategories/${id}`, {
//             method: 'DELETE',
//         });
//         dispatch({ type: DELETE_CATEGORY, payload: id });
//     } catch (error) {
//         console.error('Error deleting category:', error);
//     }
// };

// export const updateCategory = (category) => async (dispatch) => {
//     console.log("category",category._id);
    
//     try {
//      const response =  await fetch(`http://localhost:5000/api/v1/categories/updateCategories/${category._id}`, {
//             method: 'PUT',
//             body: JSON.stringify(category),
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         });
//         const data = await response.json();
//         dispatch({ type: UPDATE_CATEGORY, payload: data });
//     } catch (error) {
//         console.error('Error updating category:', error);
//     }
// };

// import axios from 'axios';
import axiosInstance from '../../utilites/axiosInstance';
import { ADD_CATEGORY, DELETE_CATEGORY, GET_CATEGORY, UPDATE_CATEGORY } from '../reducer/action.type';

export const getCategory = () => async (dispatch) => {
    try {
        const response = await axiosInstance.get('categories/get-categorie');
        dispatch({ type: GET_CATEGORY, payload: response.data.data });
    } catch (error) {
        console.error('Error fetching categories:', error);
    }
};  

export const addCategory = (category) => async (dispatch) => {
    try {
        const response = await axiosInstance.post('categories/addcategories/', category, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        dispatch({ type: ADD_CATEGORY, payload: response.data });
    } catch (error) {
        console.error('Error adding category:', error);
    }
};

export const deleteCategory = (id) => async (dispatch) => {
    console.log(id);
    
    try {
        await axiosInstance.delete(`categories/deleteCategories/${id}`);
        dispatch({ type: DELETE_CATEGORY, payload: id });
    } catch (error) {
        console.error('Error deleting category:', error);
    }
};

export const updateCategory = (category) => async (dispatch) => {
    console.log("category", category._id);
    
    try {
        const response = await axiosInstance.put(`categories/updateCategories/${category._id}`, category, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        dispatch({ type: UPDATE_CATEGORY, payload: response.data });
    } catch (error) {
        console.log(error);
    }
};

