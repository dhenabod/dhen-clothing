import React from "react";
import "./menu-item.styles.scss";

import { withRouter } from "react-router-dom";

// because of withRouter we have access to the history and match from route in App.js
const MenuItem = ({ title, imageUrl, size, history, match, linkUrl }) => {
    return (
        // inline styling at div
        <div
            className={`menu-item ${size}`}
            onClick={() => history.push(`${match.url}${linkUrl}`)}
        >
            <div
                className={"background-image"}
                style={{
                    backgroundImage: `url(${imageUrl})`,
                }}
            />
            <div className="content">
                <h1 className="title">{title}</h1>
                <span className="subtitle">Shop Now!</span>
            </div>
        </div>
    );
};

// withRouter is a higher order component that will pass closest route's match, current location,
// and history props to the wrapped component whenever it renders. simply it connects component to
// the router.
export default withRouter(MenuItem);
