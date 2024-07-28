// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAat7R-MwLil8QGg1R-oAYUMym4o1TbU8U",
  authDomain: "avivreactlehavaprjct.firebaseapp.com",
  databaseURL: "https://avivreactlehavaprjct-default-rtdb.firebaseio.com",
  projectId: "avivreactlehavaprjct",
  storageBucket: "avivreactlehavaprjct.appspot.com",
  messagingSenderId: "1064860546641",
  appId: "1:1064860546641:web:e19c875b1eb8f4b490aa70",
  measurementId: "G-WHD3FHEWPT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);
