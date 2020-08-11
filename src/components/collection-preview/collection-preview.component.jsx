import React from "react";

import CollectionItem from "../collection-item/collection-item.component";
import { withRouter } from "react-router-dom";

import {
    CollectionPreviewContainer,
    TitleContainer,
    PreviewContainer,
} from "./collection-preview.styles";

const CollectionPreview = ({ title, items, history, match, routeName }) => {
    return (
        <CollectionPreviewContainer>
            <TitleContainer
                onClick={() => history.push(`${match.path}/${routeName}`)}
            >
                {title.toUpperCase()}
            </TitleContainer>
            <PreviewContainer>
                {items
                    .filter((item, idx) => {
                        return idx < 4;
                    })
                    .map((item) => {
                        return (
                            <CollectionItem
                                key={item.id}
                                item={item}
                            ></CollectionItem>
                        );
                    })}
            </PreviewContainer>
        </CollectionPreviewContainer>
    );
};

export default withRouter(CollectionPreview);
