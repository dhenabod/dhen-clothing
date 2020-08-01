import { createSelector } from "reselect";

// input selector(function that get the whole state and return just a slice of it)
const selectCart = (state) => {
    return state.cart;
};

// output selector (takes 2 argument 1st is an array of input selectors, 2nd is a fucntion that will return the value of these selectors)
export const selectCartItems = createSelector(
    [selectCart],
    (cart) => cart.cartItems
);

export const selectCartHidden = createSelector(
    [selectCart],
    (cart) => cart.hidden
);

export const selectCartItemsCount = createSelector(
    [selectCartItems],
    (cartItems) =>
        cartItems.reduce((accumulatedQuantity, cartItem) => {
            return accumulatedQuantity + cartItem.quantity;
        }, 0)
);

export const selectCartTotal = createSelector([selectCartItems], (cartItems) =>
    cartItems.reduce((accumulatedQuantity, cartItem) => {
        return accumulatedQuantity + cartItem.quantity * cartItem.price;
    }, 0)
);
