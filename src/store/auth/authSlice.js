import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'checking', // checking, not-authenticated, authenticated
        uid: null,
        email: null,
        displayName: null,
        photoURL: null,
        errorMessage: null // por si existe algun error
    },
    reducers: {
        // login: ( state, action ) normalmente seria asi, pero mediante desestructuracion a
        // accedemos a payload
        login: ( state, { payload } ) => { 
            state.status =  'authenticated'; // checking, not-authenticated, authenticated
            state.uid =  payload.uid;
            state.email =  payload.email;
            state.displayName =  payload.displayName;
            state.photoURL =  payload.photoURL;
            state.errorMessage = null;
        },
        // action.payload, por tanto se pasa payload por desestructuracion 
        logOut: ( state, { payload } ) => {
            state.status =  'not-authenticated'; // checking, not-authenticated, authenticated
            state.uid =  null;
            state.email =  null;
            state.displayName =  null;
            state.photoURL =  null;
            state.errorMessage =  payload?.errorMessage;
        },
        checkingCredentials: ( state ) => {
            state.status = 'checking';
        }

    },
});

// Action creators are generated for each case reducer function
export const { login, logOut, checkingCredentials } = authSlice.actions;