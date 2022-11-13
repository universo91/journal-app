import { collection, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";

export const loadNotes = async (uid = '') => {

    if( !uid ) throw new Error('El UID del usuario no existe');

    // Hace referencia a las notas de un usuario determinado
    const collectionRef = collection( FirebaseDB, `${uid}/journal/notes`);

    //getDocs permite obtener esas collecion de notas
    const docs = await getDocs(collectionRef);

    const notes = [];
    
    docs.forEach(nota => {
        //data nos permite obtener cada unos de los campos en un objeto,
        // dado que el id no viene junto con data(), es necesario el mecanismo 
        notes.push({ id: nota.id , ...nota.data() });
    });
    
    return notes;
}