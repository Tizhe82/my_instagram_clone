import Firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';



const config = {
    apiKey: "AIzaSyCRkabIgdYz4H_Wcezz_hNC105Ogp6UIok",
    authDomain: "instagram-90a64.firebaseapp.com",
    projectId: "instagram-90a64",
    storageBucket: "instagram-90a64.appspot.com",
    messagingSenderId: "872038864661",
    appId: "1:872038864661:web:69a73d21e7fcb57b0b7b1c"
};

const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;


export { firebase, FieldValue };
