import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth'

let firebaseConfig = {
    apiKey: "AIzaSyC5hkHdzti_enc7vUNNE9brhc-SjlGAoyw",
    authDomain: "imager-6eae6.firebaseapp.com",
    databaseURL: "https://imager-6eae6.firebaseio.com",
    projectId: "imager-6eae6",
    storageBucket: "imager-6eae6.appspot.com",
    messagingSenderId: "366673901906",
    appId: "1:366673901906:web:f3ef3329fee88443a0628b"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
export const db = firebaseApp.firestore();
export const auth = firebaseApp.auth();