import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
// import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyA1XCdShfFNMu-vbKwKi8eEhOUmHlEC0pE",
    authDomain: "app-backend-95a25.firebaseapp.com",
    databaseURL: "https://app-backend-95a25-default-rtdb.firebaseio.com",
    projectId: "app-backend-95a25",
    storageBucket: "app-backend-95a25.appspot.com",
    messagingSenderId: "389602873484",
    appId: "1:389602873484:web:918efbd2b1948a958c6ba9"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
// export const storage = getStorage(app);