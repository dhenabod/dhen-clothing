import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
    apiKey: "AIzaSyAECV5BXBcu1z02-TZBM_21Zi2P73nIZkw",
    authDomain: "dhen-clothing-db.firebaseapp.com",
    databaseURL: "https://dhen-clothing-db.firebaseio.com",
    projectId: "dhen-clothing-db",
    storageBucket: "dhen-clothing-db.appspot.com",
    messagingSenderId: "951702681384",
    appId: "1:951702681384:web:31972a1df1f458fe8d021d",
    measurementId: "G-1NCPC7714E",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();
    // check if data already exist
    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        // will try to insert a user, using .set()
        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData,
            });
        } catch (error) {
            console.log("Error creating user: ", error.message);
        }
    }
    return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
