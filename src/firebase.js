import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyATd5_6bN0af1eHpfayI7Gy1Ras9VDkOEk",
    authDomain: "whatsapp-clone-78a4c.firebaseapp.com",
    databaseURL: "https://whatsapp-clone-78a4c.firebaseio.com",
    projectId: "whatsapp-clone-78a4c",
    storageBucket: "whatsapp-clone-78a4c.appspot.com",
    messagingSenderId: "1018284716630",
    appId: "1:1018284716630:web:ce71a51ab216c7cf5941f7",
    measurementId: "G-3GP5ENZ790"
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