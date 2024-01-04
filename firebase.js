import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAkZPBEIMcytutVjgG5hnqzIcpye3Ztx0Y",
  authDomain: "wishlist-814f0.firebaseapp.com",
  projectId: "wishlist-814f0",
  storageBucket: "wishlist-814f0.appspot.com",
  messagingSenderId: "260099017263",
  appId: "1:260099017263:web:9aac59e27d503c642114da",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
