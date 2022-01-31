import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyD6RzUKe6scQirxQ_PQCV_3-NFlB5jNstY",
    authDomain: "admin-user-authentication.firebaseapp.com",
    databaseURL: "https://admin-user-authentication-default-rtdb.firebaseio.com",
    projectId: "admin-user-authentication",
    storageBucket: "admin-user-authentication.appspot.com",
    messagingSenderId: "476659012442",
    appId: "1:476659012442:web:cb315345a3ad8319d0d963"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

export default auth;