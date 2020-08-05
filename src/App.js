import React from "react";
import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { createStructuredSelector } from "reselect";
import Homepage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import CheckoutPage from "./pages/checkout/checkout.component";
import Header from "./components/header/header.component";
import SignInAndSignUpPage from ".//pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import { selectCurrentUser } from "./redux/user/user.selector";

import { setCurrentUser } from "./redux/user/user.actions";

import { auth, createUserProfileDocument } from "./firebase/firebase.utils";

class App extends React.Component {
    unsubscribeFromAuth = null;

    componentDidMount() {
        const { setCurrentUser } = this.props;
        this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
            if (userAuth) {
                const userRef = await createUserProfileDocument(userAuth);
                userRef.onSnapshot((snapshot) => {
                    setCurrentUser({
                        id: snapshot.id,
                        ...snapshot.data(),
                    });
                });
            }

            setCurrentUser(userAuth);
        });
    }
    componentWillUnmount() {
        this.unsubscribeFromAuth();
    }
    redirectIfLogged = () => {
        if (this.props.currentUser) {
            return <Redirect to="/" />;
        } else {
            return <SignInAndSignUpPage />;
        }
        // method inside the jsx
        // () =>
        //     this.props.currentUser ? (
        //         <Redirect to="/" />
        //     ) : (
        //         <SignInAndSignUpPage />
        //     );
    };

    render() {
        return (
            <div>
                <Header></Header>
                <Switch>
                    <Route exact path="/" component={Homepage} />
                    <Route path="/shop" component={ShopPage} />
                    <Route exact path="/checkout" component={CheckoutPage} />
                    <Route
                        exact
                        path="/signin"
                        render={this.redirectIfLogged}
                    />
                </Switch>
            </div>
        );
    }
}

// not using createStructuredSelector
// destructured from state - {user}, / we are doing this to have access to this.props.CurrentUser and be able to know if there's current active user
// const mapStateToProps = ({ user }) => {
//     return {
//         currentUser: user.currentUser,
//     };
// };

// using createStructuredSelector
const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
});
const mapDispatchToProps = (dispatch) => {
    return {
        setCurrentUser: (user) => dispatch(setCurrentUser(user)),
    };
};

// we pass null because unlike in the header componnt we don't need props from reducer
export default connect(mapStateToProps, mapDispatchToProps)(App);

//  heroku create dhen-clothing --buildpack https://github.com/mars/create-react-app-buildpack.git
