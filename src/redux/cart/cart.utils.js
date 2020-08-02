// will check if the cartItem we want to add is already in the cartItems
export const addItemToCart = (cartItems, cartItemsToAdd) => {
    const existingCartItem = cartItems.find((cartItem) => {
        return cartItem.id === cartItemsToAdd.id;
    });

    // if it exist in the cartItems then no need to add just increment the quantity
    if (existingCartItem) {
        return cartItems.map((cartItem) => {
            return cartItem.id === cartItemsToAdd.id
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem;
        });
    }

    // if now found in the existing cartItem/array, add that item and give it quantity of 1
    // else
    return [...cartItems, { ...cartItemsToAdd, quantity: 1 }];
};

export const removeItemFromCart = (cartItems, cartItemToremove) => {
    const existingCartItem = cartItems.find((cartItem) => {
        return cartItem.id === cartItemToremove.id;
    });

    if (existingCartItem.quantity === 1) {
        return cartItems.filter((cartItem) => {
            return cartItem.id !== cartItemToremove.id;
        });
    }
    //else, if existingCartItem is greater than 1

    return cartItems.map((cartItem) => {
        return cartItem.id === cartItemToremove.id
            ? {
                  ...cartItem,
                  quantity: cartItem.quantity - 1,
              }
            : cartItem;
    });
};
