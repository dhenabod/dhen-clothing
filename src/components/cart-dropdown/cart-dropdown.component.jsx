import React from "react";
import CustomButton from "../custom-button/custom-button.component";

import { createStructuredSelector } from "reselect";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import CartItem from "../cart-item/cart-item.component";

import { selectCartItems } from "../../redux/cart/cart.selectors";

import { toggleCartHidden } from "../../redux/cart/cart.actions";

import {
    CartDropdownContainer,
    CartItemsContainer,
    EmptyMessageContainer,
} from "./cart-dropdown.styles";

// we have access to history because of withRouter
const CartDropdown = ({ cartItems, history, dispatch }) => {
    return (
        <CartDropdownContainer>
            <CartItemsContainer>
                {cartItems.length ? (
                    cartItems.map((cartItem) => {
                        return (
                            <CartItem
                                key={CartItem.id}
                                item={cartItem}
                            ></CartItem>
                        );
                    })
                ) : (
                    <EmptyMessageContainer>
                        Your cart is empty
                    </EmptyMessageContainer>
                )}
            </CartItemsContainer>
            <CustomButton
                onClick={() => {
                    history.push("/checkout");
                    dispatch(toggleCartHidden());
                }}
            >
                GO TO CHECKOUT
            </CustomButton>
        </CartDropdownContainer>
    );
};

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
});

// no destructuring
// const mapStateToProps = (state) => {
//     return {
//         cartItems: state.cart.cartItems,
//     };
// };

//note: connect passes dispatch into our component as props if we dont suppy a 2nd argument to connect, so we don't need to write mapDispatchToProps
export default withRouter(connect(mapStateToProps)(CartDropdown));
