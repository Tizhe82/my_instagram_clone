import { initializeApp} from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyA5OQfZOEQlCVyPPK1TGedFXTuizdRyQ4I",
    authDomain: "instagram-c66d7.firebaseapp.com",
    projectId: "instagram-c66d7",
    storageBucket: "instagram-c66d7.appspot.com",
    messagingSenderId: "1012901164553",
    appId: "1:1012901164553:web:d781bfa405f5608633ead8"
};

const firebaseApp = initializeApp(config);
const firestore = firebaseApp.firestore();
const FieldValue = firebaseApp.firestore.FieldValue;
export { firestore, FieldValue };
