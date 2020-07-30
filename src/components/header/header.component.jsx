import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/crown.svg";

import CartDropdown from "../cart-dropdown/cart-dropdown.component";

// connct is a higher order component that lets us modify our component to have access to things related to redux
import { connect } from "react-redux";

import { auth } from "../../firebase/firebase.utils";
import CartIcon from "../cart-icon/cart-icon.component";

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
// destructure nested values (see root reducer)
const mapStateToProps = ({ user: { currentUser }, cart: { hidden } }) => {
    return {
        currentUser,
        hidden,
    };
};

// The connect() function connects a React component to a Redux store.
export default connect(mapStateToProps)(Header);
