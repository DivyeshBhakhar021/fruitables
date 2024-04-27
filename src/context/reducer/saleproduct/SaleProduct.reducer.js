import { ADD_ITEM, DELETE_ITEM, GET_ITEM, UPDATE_ITEM } from "../../ActionType";

export const productReducer = (state, action) => {
    console.log(action);
    switch (action.type) {
        case GET_ITEM:
            return {
                products: action.payload,
            };
        case ADD_ITEM:
            return {
                products: state.products.concat(action.payload),
            };
        case UPDATE_ITEM:
            return {
                products: state.products.map(item => {
                    if (item.id === action.payload.id) {
                        return action.payload
                    } else {
                        return item;
                    }
                }
                )
            };
        case DELETE_ITEM:
            return {
                products: state.products.filter(item => item.id !== action.payload)
            };
        default:
            return state;
    }
};
