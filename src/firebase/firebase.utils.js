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

export const addCollectionAndDocuments = async (
    collectionKey,
    objectsToAdd
) => {
    const collectionRef = firestore.collection(collectionKey);

    const batch = firestore.batch();
    objectsToAdd.forEach((obj) => {
        const newDocRef = collectionRef.doc();
        batch.set(newDocRef, obj);
    });

    return await batch.commit();
};

export const convertCollectionsSnapshotToMap = (collections) => {
    const transformedCollection = collections.docs.map((doc) => {
        const { title, items } = doc.data();

        // encodeURI() - converts the string you  pass to it a version a url can read
        // we don't write doc.data.id because id belongs to the doc snapshot object
        return {
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title,
            items,
        };
    });
    return transformedCollection.reduce((acc, collection) => {
        // sets the 1st value equal to the title but in lowercase = { hats: hatsCollection}
        acc[collection.title.toLowerCase()] = collection;
        return acc;
    }, {});
};
firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
