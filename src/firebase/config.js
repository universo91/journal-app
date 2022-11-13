// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// lite, porque no queremos todas las funcionaliades, solo las basicas.
import { getFirestore } from 'firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCWFPmEeIBE25FS-i5FJUHZ__wY3HDzTo4",
  authDomain: "react-cursos-cabb8.firebaseapp.com",
  projectId: "react-cursos-cabb8",
  storageBucket: "react-cursos-cabb8.appspot.com",
  messagingSenderId: "364429239188",
  appId: "1:364429239188:web:235cc08e5d64ee3604e581"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);

//para la autenticacion
export const FirebaseAuth = getAuth( FirebaseApp );

//para la configuracion de nuestra DB
export const FirebaseDB = getFirestore( FirebaseApp );