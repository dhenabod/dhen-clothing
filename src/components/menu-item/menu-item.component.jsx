import React from "react";
import {
    MenuItemContainer,
    BackgroundImageContainer,
    ContentContainer,
    ContentTitle,
    ContentSubtitle,
} from "./menu-item.styles";

import { withRouter } from "react-router-dom";

// because of withRouter we have access to the history and match from route in App.js
const MenuItem = ({ title, imageUrl, size, history, match, linkUrl }) => {
    return (
        <MenuItemContainer
            size={size}
            onClick={() => history.push(`${match.url}${linkUrl}`)}
        >
            <BackgroundImageContainer
                className="background-image"
                imageUrl={imageUrl}
            />
            <ContentContainer className="content">
                <ContentTitle>{title.toUpperCase()}</ContentTitle>
                <ContentSubtitle>SHOP NOW</ContentSubtitle>
            </ContentContainer>
        </MenuItemContainer>
    );
};

// withRouter is a higher order component that will pass closest route's match, current location,
// and history props to the wrapped component whenever it renders. simply it connects component to
// the router.
export default withRouter(MenuItem);
