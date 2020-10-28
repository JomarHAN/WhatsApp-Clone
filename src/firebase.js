import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "FIREBASE_APIKEY",
    authDomain: "whatsapp-clone-78a4c.firebaseapp.com",
    databaseURL: "https://whatsapp-clone-78a4c.firebaseio.com",
    projectId: "whatsapp-clone-78a4c",
    storageBucket: "whatsapp-clone-78a4c.appspot.com",
    messagingSenderId: "FIREBASE_MESSAGE_SENDER-ID",
    appId: "FIREBASE_APPID",
    measurementId: "FIREBASE_MEASURENMENT_ID"
})

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const provider = new firebase.auth.GoogleAuthProvider()

export {
    provider,
    auth,
    storage
};

export default db
