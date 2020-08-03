import React from "react";

import { connect } from "react-redux";

import CollectionItem from "../../components/collection-item/collection-item.component";

import { selectCollection } from "../../redux/shop/shop.selector";

import "./collection.styles.scss";

const CollectionPage = (collection) => {
    const {
        title,
        collection: { items },
    } = collection;
    console.log("XXX", collection);
    return (
        <div className="collection-page">
            <h2 className="items">{title}</h2>
            <div className="items">
                {items.map((item) => (
                    <CollectionItem key={item.id} item={item}></CollectionItem>
                ))}
            </div>
        </div>
    );
};

const mapStateToProps = (state, ownProps) => {
    return {
        collection: selectCollection(ownProps.match.params.collectionId)(state),
    };
};

export default connect(mapStateToProps)(CollectionPage);
