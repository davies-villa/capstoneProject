import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDhvOXg6V7dmvJzsnTJjOzkQ0u4J6kCgwI",
    authDomain: "sefutravel-51f3b.firebaseapp.com",
    projectId: "sefutravel-51f3b",
    storageBucket: "sefutravel-51f3b.appspot.com",
    messagingSenderId: "535643827199",
    appId: "1:535643827199:web:9cc4271f55fc8498b355ca",
    measurementId: "G-QRBRW9FLYK"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
