import React from "react";

import { connect } from "react-redux";
import { toggleCartHidden } from "../../redux/cart/cart.actions";
import { selectCartItemsCount } from "../../redux/cart/cart.selectors";

import { createStructuredSelector } from "reselect";

import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import "./cart-icon.styles.scss";

const CartIcon = ({ toggleCartHidden, itemCount }) => {
    return (
        <div className="cart-icon" onClick={toggleCartHidden}>
            <ShoppingIcon className="shopping-icon" />
            <span className="item-count">{itemCount}</span>
        </div>
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
