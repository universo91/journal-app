import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, signInWithGoogle } from "../../firebase/providers";
import { clearNotesLogout } from "../journal";
import { checkingCredentials,login ,logOut } from "./authSlice"



//autenticacion mediante google
export const startGoogleSignIn = () => {
    return async ( dispatch) => {
        dispatch( checkingCredentials() );
        const result = await signInWithGoogle();
        console.log( {result} );
        // si la autenticacion falla
        if( ! result.ok ) return dispatch( logOut() );

        dispatch( login(result) );        
    }
}

//registro de usuario con email y password
export const startCreatingUserWithEmailPassword = ({ email, password, nombre }) => {
    return async (dispatch) => {
        dispatch( checkingCredentials() );
        const { ok, uid, photoURL, errorMessage, displayName } = await registerUserWithEmailPassword({ email, password, displayName: nombre });
        
        // Si se pruduce algun erro al registrar el usuario, entones no se inicia sesion,
        // y los valores de los campos se ponen null
        // payload.erroMessage, a logOut se le pasa por desestructuracion
        if( !ok ) return dispatch( logOut( { errorMessage } ) );

        // si el regsitro es satisfactorio entonces se logea automaticamente
        dispatch( login({  uid, email, displayName, photoURL }));
        
    }
}

export const startLoginWithEmailPassword = (email, password) => {
    return async (dispatch) => {
        dispatch( checkingCredentials() );
        const result = await loginWithEmailPassword(email, password);
        if( ! result.ok ) return dispatch( logOut(result) );
        dispatch( login(result) );
    }
}

export const startLogout = () => {
    return async (dispatch) => {
        await logoutFirebase();
        dispatch( logOut() );

        // Al cerrar sesion, debemos limpiar el estado de journal
        dispatch( clearNotesLogout() );
    }
}