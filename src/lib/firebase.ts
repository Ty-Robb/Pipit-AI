// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA4AHeMeSXgrFIW4e1MuPf3164RbZrDCOw",
  authDomain: "pipit-ai-strategy-wingman.firebaseapp.com",
  projectId: "pipit-ai-strategy-wingman",
  storageBucket: "pipit-ai-strategy-wingman.firebasestorage.app",
  messagingSenderId: "387846774098",
  appId: "1:387846774098:web:0d43b31867e6a49ee6ee8b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export the initialized app instance
export { app };