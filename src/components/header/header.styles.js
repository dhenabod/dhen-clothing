import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

// it allows us to use a block of css that we can pass in any of the styled components
const OptionContainerStyes = css`
    padding: 10px 15px;
    cursor: pointer;
`;

export const HeaderContainer = styled.div`
    height: 70px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 25px;
`;

// pass the component you want to wrap
export const LogoContainer = styled(Link)`
    height: 100%;
    width: 70px;
    padding: 25px;
`;

export const OptionsContainer = styled.div`
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
`;

export const OptionLink = styled(Link)`
    ${OptionContainerStyes}
`;

export const OptionDiv = styled.div`
    ${OptionContainerStyes}
`;
