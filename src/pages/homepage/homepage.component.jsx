import React from "react";
import Directory from "../../components/directory/directory.component";
import { HomePageContainer } from "./homepage.styles";

const Homepage = () => {
    return (
        <HomePageContainer className="homepage">
            <Directory></Directory>
        </HomePageContainer>
    );
};

export default Homepage;
