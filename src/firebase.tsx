// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCMCpCtx_RAfGNxdZF_iK4TLKualKamsiE",
  authDomain: "body-mass-c8b99.firebaseapp.com",
  projectId: "body-mass-c8b99",
  storageBucket: "body-mass-c8b99.appspot.com",
  messagingSenderId: "954505292871",
  appId: "1:954505292871:web:26ddd8e07d8735cd689562",
  measurementId: "G-5RHR0Z1JZX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default analytics;
