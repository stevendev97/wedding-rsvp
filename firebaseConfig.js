// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAypPqzNvTrBjfKwgaL091Ynr-NX1L459o",
  authDomain: "wedding-rsvp-6ee54.firebaseapp.com",
  projectId: "wedding-rsvp-6ee54",
  storageBucket: "wedding-rsvp-6ee54.firebasestorage.app",
  messagingSenderId: "588735408465",
  appId: "1:588735408465:web:22249a4b6cff73524d4b70",
  measurementId: "G-C1474CW704"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// Initialize Analytics (only in the browser)
if (typeof window !== "undefined") {
    isSupported().then((supported) => {
      if (supported) {
        getAnalytics(app);
      }
    });
  }

export { app }