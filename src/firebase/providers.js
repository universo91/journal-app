import { 
    GoogleAuthProvider, 
    signInWithPopup, 
    createUserWithEmailAndPassword, 
    getAuth, 
    updateProfile,
    signInWithEmailAndPassword  
} from 'firebase/auth';

import { FirebaseAuth } from './config';

const googleProvider = new GoogleAuthProvider();


//Funcion que permitira registrarse con google
export const signInWithGoogle = async () => {
    try {
        //Sign await nos retorna una promesam por tanto se usa async-await
        const result = await signInWithPopup(FirebaseAuth, googleProvider);
        //const credentials = GoogleAuthProvider.credentialFromResult( result );
        //console.log( {credentials });
        /* const token = credentials.accessToken; */

        const { displayName, email, photoURL, uid } = result.user;
       
        return {
            ok: true,
            displayName,
            email,
            photoURL,
            uid
        };
        
    } catch (error) {
        return {
            ok: false,
            errorMessage
        }
    }
}

//Funcion que perimitira registrarse, con email, password y nombre, y asu vez incia sesion
// con esa cuenta
export const registerUserWithEmailPassword = async ({ email, password, displayName }) => {
    
    try {
        const auth = getAuth();
        const rest = await createUserWithEmailAndPassword(auth, email, password);
        
        

        // TODO: actualizar el displayName en Firebase
         await updateProfile(auth.currentUser, {
            displayName
        });

        const { uid, photoURL, displayName: nombre } = rest.user;

        console.log( rest );
        return {
            ok: true,
            uid,
            photoURL,
            email, 
            nombre
        }

    } catch (error) {
        console.log( error);
        //const errorEmailUsado = error.message === 'Firebase: Error (auth/email-already-in-use).' ? 'Email ya en usom intente con otro': error.message
        return {
            ok: false,
            errorMessage:'Email ya en uso, intente con otro'
        }
    }
}

//Inicio sesion con email y password
export const loginWithEmailPassword = async (email, password) => {
    try {
        const auth = getAuth();
        const result = await signInWithEmailAndPassword(auth, email, password);
        const { displayName, photoURL, uid } = result.user;
        return {
            ok: true,
            displayName,
            email,
            photoURL,
            uid
        };
        
    } catch (error) {
        return {
            ok: false,
            errorMessage: error.message
        }
    }

}

//Cerrar sesion
export const logoutFirebase = async () => {
    const auth = getAuth();
    return await auth.signOut();
}