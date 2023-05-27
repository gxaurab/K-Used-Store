import 'firebase/auth';
import { createUserWithEmailAndPassword, updateProfile, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { getDatabase, ref } from "firebase/database";
import {getStorage} from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyC-qwIyU22_tCEnctAB8cKiiXHzZ_nUDN8",
  authDomain: "kused-store.firebaseapp.com",
  projectId: "kused-store",
  storageBucket: "kused-store.appspot.com",
  messagingSenderId: "82256107752",
  appId: "1:82256107752:web:868ce5fe05000e541ad15d",
  measurementId: "G-XV14RQG3W2"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
// export const database = getDatabase(app);

async function register ({firstname, lastname, email, password}) {
const resp= await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  await updateProfile(resp.user, {displayName: `${firstname} ${lastname}`});
}

async function login({email, password}){
  const resp= await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  return resp.user;
}

async function logout(){
  await signOut(auth);
}

export const firebasedb ={
    register: register,
    login: login,
    logout: logout
}

const getCurrentUserId = () => {
  const user = auth.currentUser;
  if (user) {
    return user.uid;
  } else {
    return null;
  }
}
export default getCurrentUserId;



// Get a Firestore instance
export const db = getFirestore(app);

export const addCartItemToFirestore = async (userId, cartItem) => {
  try {
    const userRef = doc(db, "users", userId);
    const cartRef = collection(userRef, "cart");
    const itemQuery = cartRef.where("id", "==", cartItem.id).limit(1);
    const itemSnapshot = await itemQuery.get();

    if (itemSnapshot.docs.length === 0) {
      await addDoc(cartRef, cartItem);
    } else {
      const itemDoc = itemSnapshot.docs[0];
      await updateDoc(itemDoc.ref, { quantity: cartItem.quantity });
    }
  } catch (error) {
    console.error("Error adding cart item to Firestore: ", error);
  }
};

export const storage = getStorage(app);