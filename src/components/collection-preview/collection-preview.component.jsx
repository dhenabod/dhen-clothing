import React from "react";

import CollectionItem from "../collection-item/collection-item.component";

import {
    CollectionPreviewContainer,
    titleContainer,
    PreviewContainer,
} from "./collection-preview.styles";

const CollectionPreview = ({ title, items }) => {
    return (
        <CollectionPreviewContainer>
            <titleContainer>{title.toUpperCase()}</titleContainer>
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

export default CollectionPreview;
