import React from "react";
import { Route } from "react-router-dom";

import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import CollectionPage from "../collection/collection.component";

import { connect } from "react-redux";

import {
    firestore,
    convertCollectionsSnapshotToMap,
} from "../../firebase/firebase.utils";

import WithSpinner from "../../components/with-spinner/with-spinner.component";

import { updateCollections } from "../../redux/shop/shop.actions";

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
    state = {
        loading: true,
    };

    unSubscribeFromSnapshot = null;

    componentDidMount() {
        const { updateCollections } = this.props;
        const collectionRef = firestore.collection("collections");

        // 1. code below will always get new data whenever there is a change because we are using live update stream that observable pattern
        // collectionRef.onSnapshot(async (snapshot) => {
        //     const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
        //     updateCollections(collectionsMap);
        // });

        // 2. code below will only get new data when we remount because we are no longer using live update stream that observable pattern lended us
        collectionRef.get().then(async (snapshot) => {
            const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
            updateCollections(collectionsMap);

            this.setState({
                loading: false,
            });
        });

        // 3. using fetch(although using this the info we need is deeply nested)
        // fetch(
        //     "https://firestore.googleapis.com/v1/projects/dhen-clothing-db/databases/(default)/documents/collections"
        // )
        //     .then((response) => response.json())
        //     .then((collections) => console.log(collections));
    }
    render() {
        const { match } = this.props;
        const { loading } = this.state;
        return (
            <div className="shop-page">
                <Route
                    exact
                    path={`${match.path}`}
                    render={(props) => (
                        <CollectionsOverviewWithSpinner
                            isLoading={loading}
                            {...props}
                        />
                    )}
                ></Route>
                <Route
                    path={`${match.path}/:collectionId`}
                    render={(props) => (
                        <CollectionPageWithSpinner
                            isLoading={loading}
                            {...props}
                        />
                    )}
                ></Route>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateCollections: (collectionsMap) =>
            dispatch(updateCollections(collectionsMap)),
    };
};

export default connect(null, mapDispatchToProps)(ShopPage);

// import React from "react";
// import { Route } from "react-router-dom";
// import { connect } from "react-redux";

// import {
//     firestore,
//     convertCollectionsSnapshotToMap,
// } from "../../firebase/firebase.utils.js";

// import { updateCollections } from "../../redux/shop/shop.actions";

// import WithSpinner from "../../components/with-spinner/with-spinner.component";

// import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
// import CollectionPage from "../collection/collection.component";

// const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
// const CollectionPageWithSpinner = WithSpinner(CollectionPage);

// class ShopPage extends React.Component {
//     state = {
//         loading: true,
//     };

//     unsubscribeFromSnapshot = null;

//     componentDidMount() {
//         const { updateCollections } = this.props;
//         const collectionRef = firestore.collection("collections");

//         collectionRef.get().then((snapshot) => {
//             const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
//             updateCollections(collectionsMap);
//             this.setState({ loading: false });
//         });
//     }

//     render() {
//         const { match } = this.props;
//         const { loading } = this.state;
//         return (
//             <div className="shop-page">
//                 <Route
//                     exact
//                     path={`${match.path}`}
//                     render={(props) => (
//                         <CollectionsOverviewWithSpinner
//                             isLoading={loading}
//                             {...props}
//                         />
//                     )}
//                 />
//                 <Route
//                     path={`${match.path}/:collectionId`}
//                     render={(props) => (
//                         <CollectionPageWithSpinner
//                             isLoading={loading}
//                             {...props}
//                         />
//                     )}
//                 />
//             </div>
//         );
//     }
// }

// const mapDispatchToProps = (dispatch) => ({
//     updateCollections: (collectionsMap) =>
//         dispatch(updateCollections(collectionsMap)),
// });

// export default connect(null, mapDispatchToProps)(ShopPage);
