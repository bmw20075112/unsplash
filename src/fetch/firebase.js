import firebase from 'firebase';
import firestore from 'firebase/firestore';

let firebaseConfig = {
    apiKey: "AIzaSyD-2utHSuH0KKUTthIbkU1WEDe5G0Dh4L4",
    authDomain: "unsplash-28878.firebaseapp.com",
    databaseURL: "https://unsplash-28878.firebaseio.com",
    projectId: "unsplash-28878",
    storageBucket: "unsplash-28878.appspot.com",
    messagingSenderId: "95972940438",
    appId: "1:95972940438:web:9de60bdf7c4572f5d440b7"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
export const db = firebaseApp.firestore();
export const storage = firebaseApp.storage();