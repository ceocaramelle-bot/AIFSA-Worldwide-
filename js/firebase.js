// =====================================================
// AIFSA WORLDWIDE
// FIREBASE CONFIGURATION
// =====================================================

import { initializeApp } from
    "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import {
    getAuth
} from
    "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
    getFirestore
} from
    "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";


// Firebase configuration

const firebaseConfig = {

    apiKey: "AIzaSyAuNq0Nrrobih6Dr-DZzgTfFhbiBUlW4w0",

    authDomain:
        "aifsa-worldwide.firebaseapp.com",

    projectId:
        "aifsa-worldwide",

    storageBucket:
        "aifsa-worldwide.firebasestorage.app",

    messagingSenderId:
        "736432073393",

    appId:
        "1:736432073393:web:fa7c158bf0dd3cd7f1d090"

};


// Initialize Firebase

const app =
    initializeApp(firebaseConfig);


// Firebase Authentication

const auth =
    getAuth(app);


// Firestore Database

const db =
    getFirestore(app);


// Export them for other files

export {
    app,
    auth,
    db
};