// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyArcZVJIbSVx8atqI9agYHL90SBgPySkIs",
  authDomain: "imdb-clone-307c8.firebaseapp.com",
  projectId: "imdb-clone-307c8",
  storageBucket: "imdb-clone-307c8.appspot.com",
  messagingSenderId: "1004168660553",
  appId: "1:1004168660553:web:061a87f0cbe5d0cd5ce198",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
