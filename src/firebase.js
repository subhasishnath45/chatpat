import firebase from 'firebase/app';
import 'firebase/auth';

export const auth = firebase.initializeApp({
    apiKey: "AIzaSyAjEKhsL_tpkK7pdZ9wg4zdT9T42hsGBtA",
    authDomain: "chatpat-bc9fa.firebaseapp.com",
    projectId: "chatpat-bc9fa",
    storageBucket: "chatpat-bc9fa.appspot.com",
    messagingSenderId: "1091129548053",
    appId: "1:1091129548053:web:9f923fac62883eaf299d1c"
  }).auth();

  
