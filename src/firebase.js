// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBR1Sg9go6JcaM6rUZZh3YHGNcbyptc6M4",
  authDomain: "slack-clone-beb5d.firebaseapp.com",
  projectId: "slack-clone-beb5d",
  storageBucket: "slack-clone-beb5d.appspot.com",
  messagingSenderId: "942968393206",
  appId: "1:942968393206:web:6d97ad1ad36ff464658bd7",
  measurementId: "G-8E3039T1W1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { db, auth, provider };
