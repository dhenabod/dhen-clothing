import React from "react";
import CustomButton from "../custom-button/custom-button.component";

import { connect } from "react-redux";

import CartItem from "../cart-item/cart-item.component";

import "./cart-dropdown.styles.scss";

const CartDropdown = ({ cartItems }) => {
    return (
        <div className="cart-dropdown">
            <div className="cart-items">
                {cartItems.map((cartItem) => {
                    return (
                        <CartItem key={CartItem.id} item={cartItem}></CartItem>
                    );
                })}
            </div>
            <CustomButton>GO TO CHECKOUT</CustomButton>
        </div>
    );
};

const mapStateToProps = ({ cart: { cartItems } }) => {
    return {
        cartItems,
    };
};

// no destructuring
// const mapStateToProps = (state) => {
//     return {
//         cartItems: state.cart.cartItems,
//     };
// };

export default connect(mapStateToProps)(CartDropdown);
