import CartActionTypes from "./cart.types";
import { addItemToCart, removeItemFromCart } from "./cart.utils";

const INITIAL_STATE = {
    hidden: true,
    cartItems: [],
};

// default value
const cartReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CartActionTypes.TOGGLE_CART_HIDDEN:
            return {
                ...state,
                hidden: !state.hidden,
            };

        case CartActionTypes.ADD_ITEM:
            return {
                ...state,
                // adds item to cart, from cart.utils.js
                cartItems: addItemToCart(state.cartItems, action.payload),
            };
        case CartActionTypes.REMOVE_ITEM:
            return {
                ...state,
                cartItems: removeItemFromCart(state.cartItems, action.payload),
            };

        // filter returns anything that yields true, in the code below if the cartItem.id doesn't match action.payload.id(the item we want to delete) then keep it in the array
        case CartActionTypes.CLEAR_ITEM_FROM_CART:
            return {
                ...state,
                cartItems: state.cartItems.filter((cartItem) => {
                    return cartItem.id !== action.payload.id;
                }),
            };

        default:
            return state;
    }
};

export default cartReducer;
