import React from "react";

import "./custom-button.styles.scss";

const CustomButton = ({ children, isGoogleSignIn, ...otherProps }) => {
    return (
        // ternary operator to check if it's a google signin button or not
        <button
            className={`${
                isGoogleSignIn ? "google-sign-in" : ""
            } custom-button`}
            {...otherProps}
        >
            {children}
        </button>
    );
};
export default CustomButton;
