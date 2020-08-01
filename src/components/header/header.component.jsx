import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/crown.svg";

// connct is a higher order component that lets us modify our component to have access to things related to redux
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { auth } from "../../firebase/firebase.utils";

import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import CartIcon from "../cart-icon/cart-icon.component";
import { selectCartHidden } from "../../redux/cart/cart.selectors";
import { selectCurrentUser } from "../../redux/user/user.selector";

import "./header.styles.scss";

// current user is from App.js
const Header = ({ currentUser, hidden }) => {
    return (
        <div className="header">
            <Link className="logo-container" to="/">
                <Logo className="logo"></Logo>
            </Link>
            <div className="options">
                <Link className="option" to="/shop">
                    SHOP
                </Link>
                <Link className="option" to="/contact">
                    CONTACT
                </Link>
                {currentUser ? (
                    <div className="option" onClick={() => auth.signOut()}>
                        SIGN OUT
                    </div>
                ) : (
                    <Link className="option" to="/signin">
                        SIGN IN
                    </Link>
                )}
                <CartIcon />
            </div>
            {!hidden ? <CartDropdown></CartDropdown> : null}
        </div>
    );
};

// using createStructuredSelector
const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden,
});

// without using createStructuredSelector
// const mapStateToProps = (state) => {
//     return {
//         currentUser: selectCurrentUser(state),
//         hidden: selectCartHidden(state),
//     };
// };

// The connect() function connects a React component to a Redux store.
export default connect(mapStateToProps)(Header);
