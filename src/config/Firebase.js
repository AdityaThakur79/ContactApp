import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDqk6uOMFiTcTQrHRbGx2E-CtqzKi1I910",
  authDomain: "contactapp-645de.firebaseapp.com",
  projectId: "contactapp-645de",
  storageBucket: "contactapp-645de.appspot.com",
  messagingSenderId: "311051844222",
  appId: "1:311051844222:web:a065fcff372d4aa976762f",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);