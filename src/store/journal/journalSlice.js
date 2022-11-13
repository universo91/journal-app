import { createSlice } from '@reduxjs/toolkit'

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        //esta bandera es para saber si se esta guardando o no la nota, para evitar, 
        // doble posteo
       isSaving: false,
       // Cuando la nota se grave con exito, pondremos un mensaje, el mensaje sera segun el caso
       messageSaved: '',
       notes: [],
       active: null
       /**
        * active: {
        *   id: 'sdgsf34',
        *   title: '',
        *   body: '',
        *   date: '32323',
        *   imageUrls: [], 
        * }
        */
    },
    reducers: {
        // cuando se esta guardando la nota, cosa que toma tiempo, isSaving se mantendra en true
        savingNewNode: (state) => {
            state.isSaving = true;
        },
       addNewEmptyNote: (state, action) => {
        state.notes.push(action.payload);
        // Cuando la nota ya haya sido guardada, isSaving ahora sera false
        state.isSaving = false;
       },
       setActiveNote: (state, action) => {
        state.active = action.payload;
        state.messageSaved = ''; 
       },
       setNotes: (state, action) => {
        state.notes = action.payload;
       },
       setSaving: ( state ) => {
        // mientra se actualiza la nota 
        state.isSaving = true;
        state.messageSaved = '';
       },
       // actualizamo la nota desde el estado, sin necesidad de ir firebase y traer la nota
       // aprovechando que ective, tiene la nota actualizada
       updateNoteOfState: (state, action) => {
        state.isSaving = false;
        state.notes = state.notes.map( note => {
            if( note.id === action.payload.id ) {
                return action.payload
            }
            return note;
        });

        state.messageSaved = `${ action.payload.title }, actualizado correctamente`;

       },
       setImagesToActiveNote: (state, action) => {
        state.isSaving = false;
        
            state.active.imageUrls = [ ...state.active.imageUrls, ...action.payload ];
        
       },
       clearNotesLogout: ( state ) => {
        state.isSaving = false;
        state.messageSaved = '';
        state.notes = [];
        state.active = null;
       },
       deleteNoteById: (state, action) => {
        state.isSaving = false;
        state.notes = state.notes.filter( note => note.id !== action.payload);
        state.active = null;
       }

    },
});

// Action creators are generated for each case reducer function
export const { 
    addNewEmptyNote,
    deleteNoteById,
    clearNotesLogout,
    savingNewNode,
    setActiveNote,
    setImagesToActiveNote,
    setNotes,
    setSaving,
    updateNoteOfState
 } = journalSlice.actions