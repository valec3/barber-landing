import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCqyLtVR5_htjeB3GYFddbj5hey0waezJU",
    authDomain: "kc-barbershop-3641a.firebaseapp.com",
    projectId: "kc-barbershop-3641a",
    storageBucket: "kc-barbershop-3641a.firebasestorage.app",
    messagingSenderId: "64774310601",
    appId: "1:64774310601:web:8477e9ee681e2f0fda1b18",
    measurementId: "G-RSHXJFQ70E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);
