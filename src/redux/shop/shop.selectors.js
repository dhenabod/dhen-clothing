import { createSelector } from "reselect";

const selectShop = (state) => state.shop;

export const selectCollections = createSelector(
    [selectShop],
    (shop) => shop.collections
);

export const selectCollectionsForPreview = createSelector(
    [selectCollections],
    // if collections is null, return empty array
    (collections) =>
        collections
            ? Object.keys(collections).map((key) => collections[key])
            : []
);

export const selectCollection = (collectionUrlParam) =>
    createSelector([selectCollections], (collections) =>
        // return null if collection is null
        collections ? collections[collectionUrlParam] : null
    );
