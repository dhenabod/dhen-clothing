import React from "react";

import { connect } from "react-redux";
import { toggleCartHidden } from "../../redux/cart/cart.actions";
import { selectCartItemsCount } from "../../redux/cart/cart.selectors";

import { createStructuredSelector } from "reselect";

import {
    CartContainer,
    ShoppingIcon,
    ItemCountContainer,
} from "./cart-icon.styles";

const CartIcon = ({ toggleCartHidden, itemCount }) => {
    return (
        <CartContainer onClick={toggleCartHidden}>
            <ShoppingIcon />
            <ItemCountContainer>{itemCount}</ItemCountContainer>
        </CartContainer>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        toggleCartHidden: () => dispatch(toggleCartHidden()),
    };
};

// use reduce to add all quantity of cartItems(cartSelectors.js)
const mapStateToProps = createStructuredSelector({
    itemCount: selectCartItemsCount,
});
// we pass null as the first parameter because unlike in the header componnt we don't need props from reducer
export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);
