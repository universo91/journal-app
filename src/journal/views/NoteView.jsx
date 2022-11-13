import { useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { DeleteOutline, SaveOutlined, UploadOutlined } from "@mui/icons-material";
import { Button, Grid, IconButton, Typography, TextField } from "@mui/material";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

import { useForm } from "../../hooks/useForm";
import { setActiveNote, startDeletingNote, startUploadingFiles } from "../../store/journal";
import { updateNote } from "../../store/journal/thunks";
import { ImageGallery } from "../components";
import { useRef } from "react";

export const NoteView = () => {

    const dispatch = useDispatch();

    const { active: note, messageSaved, isSaving } = useSelector( state => state.journal );

    const { title, body, date, onInputChange, formState, id } = useForm( note );

    const dateString = useMemo( () => {
        const newDate = new Date( date );
        return newDate.toUTCString();
    }, [ date ]);

    //hara referencia al input que se encarga de cargar imagenes
    const fileInputRef = useRef();

    useEffect( () => {
        /* formState = { title: '', body: '', date: '', imageUrls:[], id : ...} */
        dispatch( setActiveNote(formState));
    }, [formState])

    useEffect( () => {
        if( messageSaved.length > 0 ) {
            Swal.fire('Nota actualizada', messageSaved, 'success');
        }
    },[messageSaved])

    const onUpdateNote = () => {
        dispatch( updateNote() )
    }

    const onFileInputChange = ({ target }) => {
        if( target.files === 0) return;
        console.log( target.files );
        dispatch( startUploadingFiles( target.files ) );
    }
    const onDelete = () => {
        dispatch( startDeletingNote() )
    }

  return (
    <Grid
        className='animate__animated animate__fadeIn animate__faster'
        container 
        direction = 'row' 
        justifyContent= 'space-between' 
        alignItems = 'center' 
        sx ={{ mb: 1 }}
    >
        <Grid item >
            <Typography fontSize={ 39 } fontWeight='light'>{ dateString }</Typography>
        </Grid>
        <Grid item>
            <input
                type='file'
                multiple
                ref={ fileInputRef }
                onChange={ onFileInputChange }
                style={{ display: 'none' }}
            />

            <IconButton
                color='primary'
                disabled={ isSaving }
                onClick={ () => fileInputRef.current.click() }
            >
                <UploadOutlined />
            </IconButton>

            <Button 
                disabled={ isSaving }
                onClick={ onUpdateNote }
                color='primary' 
                sx={{ padding: 2 }}
            >
                <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
                Guardar
            </Button>
        </Grid>

        <Grid container sx ={{ mt: 1}}>
            <TextField 
                type='text'
                variant='filled'
                fullWidth
                placeholder="ingrese un titulo"
                label='titulo'
                sx={{ border: 'none', mb: 1 }}
                name='title'
                value={ title }
                onChange= { onInputChange }
            />
           
            <TextField 
                type='text'
                variant='filled'
                fullWidth
                multiline
                placeholder="¿Que sucedio el dia de hoy?"
                minRows={ 5 }
                name='body'
                value={ body }
                onChange= { onInputChange }
            />
        </Grid>

        <Grid container justifyContent='end'>
            <Button
                onClick={ onDelete }
                sx={{ mt: 2 }}
                color='error'
            >
                <DeleteOutline />
                Borrar nota
            </Button>
        </Grid>

        <ImageGallery images={ note.imageUrls }/>
    </Grid>
  )
}
