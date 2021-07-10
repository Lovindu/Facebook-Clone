import firebase from 'firebase';

const firebaseApp = firebase.initializeApp (
    {
        apiKey: "AIzaSyCuF_xuxIn6WEIp16qYbZJ4TceX5eNfgZM",
        authDomain: "facebook-clone-285f6.firebaseapp.com",
        projectId: "facebook-clone-285f6",
        storageBucket: "facebook-clone-285f6.appspot.com",
        messagingSenderId: "41957659116",
        appId: "1:41957659116:web:0904bc3975cb17862b30c9",
        measurementId: "G-WDZYGY5286"
    }
);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export {db, auth, storage};