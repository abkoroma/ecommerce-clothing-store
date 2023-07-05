import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithRedirect, 
  signInWithPopup, 
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';

import { getFirestore, doc, getDoc, setDoc, 
  collection, writeBatch, query, getDocs 
} from 'firebase/firestore';

// web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAbR96YVa1fSGjSAwssIaINbCY5Ec78suA",
  authDomain: "ecommerce-db-91055.firebaseapp.com",
  projectId: "ecommerce-db-91055",
  storageBucket: "ecommerce-db-91055.appspot.com",
  messagingSenderId: "248366716386",
  appId: "1:248366716386:web:ff409f3dd116e4bf3fd5bb"
};
  
  // Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export async function addCollectionAndDocuments(collectionKey, objectsToAdd) {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach(object => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log('done');
}

export async function getCategoriesAndDocuments() {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);
  const querySnapshot = await getDocs(q);
  
  return querySnapshot.docs.map(docSnapshot => docSnapshot.data());
}

export async function createUserDocumentFromAuth(userAuth, additionalInfo = {}) {
  if (!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapShot = await getDoc(userDocRef);

  if(!userSnapShot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(
        userDocRef, {displayName, email, createdAt, ...additionalInfo}
      );
    } catch(err) {
      console.log("Error creating user", err.message);
    }
  }
  return userSnapShot;
};

export async function createAuthUserWithEmailAndPassword(email, password) {
  if(!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
}

export async function signInAuthUserWithEmailAndPassword(email, password) {
  if(!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
}

export async function signOutUser() {
  return await signOut(auth);
}

export function onAuthStateChangedListener(callback) {
  return onAuthStateChanged(auth, callback);
}

export function getCurrentUser() {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, (userAuth) => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
}