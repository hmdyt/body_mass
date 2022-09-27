// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import {
  getAuth,
  GoogleAuthProvider,
  EmailAuthProvider,
  connectAuthEmulator,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCMCpCtx_RAfGNxdZF_iK4TLKualKamsiE",
  authDomain: "body-mass-c8b99.firebaseapp.com",
  projectId: "body-mass-c8b99",
  storageBucket: "body-mass-c8b99.appspot.com",
  messagingSenderId: "954505292871",
  appId: "1:954505292871:web:26ddd8e07d8735cd689562",
  measurementId: "G-5RHR0Z1JZX",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const googleAuthProvider = new GoogleAuthProvider();
const emailAuthProvider = new EmailAuthProvider();
const auth = getAuth();

const isEnulating = window.location.hostname === "localhost";
if (isEnulating) {
  connectFirestoreEmulator(db, "localhost", 8080);
  connectAuthEmulator(auth, "http://localhost:9099");
}

export { db, auth, googleAuthProvider, emailAuthProvider };
