import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyDraX3EPYd-eqgQSv6qm__EZ9gf6DSmxrQ',
  authDomain: 'la-db-b50bf.firebaseapp.com',
  projectId: 'la-db-b50bf',
  storageBucket: 'la-db-b50bf.appspot.com',
  messagingSenderId: '985768549510',
  appId: '1:985768549510:web:1fadcd236e3938ad868507',
  measurementId: 'G-61CRNB45N9',
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc (`users/${userAuth.uid}`);

  const snapShot = await userRef.get ();

  if (!snapShot.exists) {
    const {displayName, email} = userAuth;
    const createdAt = new Date ();

    try {
      await userRef.set ({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log ('error creating user', error.message);
    }
  }

  return userRef;
};

firebase.initializeApp (config);

export const auth = firebase.auth ();
export const firestore = firebase.firestore ();

const provider = new firebase.auth.GoogleAuthProvider ();
provider.setCustomParameters ({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup (provider);

export default firebase;
