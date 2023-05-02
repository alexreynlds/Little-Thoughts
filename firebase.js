// Import the functions you need from the SDKs you need
import * as firebase from "firebase/app"
import { getApps, initializeApp } from "firebase/app"
import { getAuth, initializeAuth, onAuthState } from "firebase/auth"

import AsyncStorage from "@react-native-async-storage/async-storage"
import { getReactNativePersistence } from "firebase/auth/react-native"
// import { getAnalytics } from "firebase/analytics"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyARIt_PQX6FkmJWPUsN2Bk2wVd9s5JGygE",
    authDomain: "little-thoughts-71abd.firebaseapp.com",
    projectId: "little-thoughts-71abd",
    storageBucket: "little-thoughts-71abd.appspot.com",
    messagingSenderId: "77248322842",
    appId: "1:77248322842:web:bb825bcc49c5a2bfe7a0a3",
    measurementId: "G-VYZPLHLNT3",
}

// Initialize Firebase
let app
if (getApps().length === 0) {
    app = firebase.initializeApp(firebaseConfig, "LittleThoughts")
} else {
    app = getApps()[0]
}

const auth = getAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
})

export { auth }
