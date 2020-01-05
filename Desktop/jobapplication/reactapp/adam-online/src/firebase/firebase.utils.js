import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyC9a12njo1EB8h3fGYFolcXUVWERyJT5NE",
  authDomain: "adam-online-db.firebaseapp.com",
  databaseURL: "https://adam-online-db.firebaseio.com",
  projectId: "adam-online-db",
  storageBucket: "adam-online-db.appspot.com",
  messagingSenderId: "827381378292",
  appId: "1:827381378292:web:9864acbe6bc27dd74682a1",
  measurementId: "G-3WX06T54GK"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log("error creating user", error.message);
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
