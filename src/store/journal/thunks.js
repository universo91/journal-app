import { collection, deleteDoc, doc, setDoc, updateDoc } from 'firebase/firestore/lite';
import { FirebaseDB } from '../../firebase/config';
import { fileUpload, loadNotes } from '../../helpers';

//Actions
import { 
    addNewEmptyNote, 
    deleteNoteById,
    setActiveNote, 
    savingNewNode, 
    setNotes, 
    setSaving, 
    updateNoteOfState,
    setImagesToActiveNote
} from './';

export const startNewNote = () => {
    return async(dispatch, getState) => {

        //Todo: tarea dispatch
        dispatch( savingNewNode() );
        
        const { uid } = getState().auth;
        console.log( uid );
        console.log("nueva nota");
        const newNote = {
            title: 'titulo 1',
            body: 'cuerpo 1',
            date: new Date().getTime(),
            imageUrls: []
        }

        const newDoc =  doc( collection( FirebaseDB, `${ uid }/journal/notes`) );
        await setDoc( newDoc, newNote ); 

        // al crear la nueva nota, su id se genera automaticamente en la BD, pero para 
        // guardar en el store, de journal, necesitamos su id, para eso obtenemos su id
        // correspondiente.
        newNote.id = newDoc.id;
        dispatch( addNewEmptyNote(newNote));
        dispatch( setActiveNote( newNote ));        
    } 
}

// funcion para cargar notas del usuario al iniciar sesion, recargar la pagina, siempre y cuando este 
// autenticado
export const startLoadingNotes = () => {
    return async(dispatch, getState) => {
        const { uid } = getState().auth;
        if( !uid ) throw new Error('El UID del usuario no existe');
        const notes = await loadNotes( uid );
        // console.log( notes );
        dispatch( setNotes( notes ) );

    }
}

export const updateNote = () => {
    return async ( dispatch, getState) => {
        
        dispatch( setSaving() );

        const { uid } = getState().auth;
        const { active: note } = getState().journal;
        console.log( note );
        const docUpdate = doc( FirebaseDB, `${uid}/journal/notes`, note.id );
        const copiaNota = { ... note }
        delete copiaNota.id;
        await updateDoc( docUpdate, copiaNota);
        dispatch( updateNoteOfState( note ) );
    }
}

export const startUploadingFiles = ( files = [] ) => {

    return async (dispatch ) => {
        dispatch( setSaving() ); 
        
        //Ahara usaremos algo para subir las imagenes de manera simultanea y no secuencial
        const fileUploadPromises = []

        //crearemos un arreglo de promesas
        for( const file of files ) {
            fileUploadPromises.push( fileUpload( file ) );            
        }

        // Ahora si se resuelve las promesas de manera simultanea, y nos devuelve un array 
        // en forma ordenada de las respuesta de cada una de las peticiones
        // que no son mas que las urls de las imagenes.
        const imgUrls = await Promise.all( fileUploadPromises );
        dispatch( setImagesToActiveNote(imgUrls));
        console.log( imgUrls);
    }
}

//funcion para eliminar una nota
export const startDeletingNote = () => {
    
    return async (dispatch, getState) => {

        const { active: note } = getState().journal;
        const { uid } = getState().auth;

        // Limpiando la nota de firebase
        const docRef = doc( FirebaseDB, `${ uid }/journal/notes/${ note.id }`);
        await deleteDoc(docRef)
        console.log( {note, uid });

        // Ahora toca limpiar la nota en nuestra data local
        dispatch( deleteNoteById( note.id ) );

    }
}

