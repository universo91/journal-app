import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IconButton } from '@mui/material';
import { AddOutlined } from '@mui/icons-material';

import { JournalLayout } from '../layout/JournalLayout';
import { NothingSelectedView, NoteView } from '../views';
import { startNewNote } from '../../store/journal';
import { useEffect } from 'react';

export const JournalPage = () => {

  const dispatch = useDispatch();
  const { isSaving, active } = useSelector( state => state.journal );

  //const isSavingNotes = useMemo( () => isSaving === true, [ isSaving ]);

  const onClickNewNote = () => {
    dispatch( startNewNote() );
  }
 
  return (
    <JournalLayout>

      {
        /** Cuando hay un cambio en activate se renderizara uno de los componentes, al 
         * haber un cambio en este estado, el componente se vuelve a renderizar
         */
        (!!active) 
          ? <NoteView /> 
          : <NothingSelectedView />
      }       

        {/* Nothing */}
        {/* Noteview */}
       
       <IconButton
        onClick={ onClickNewNote }
        size='large'
        sx={{
          color: 'white',
          backgroundColor: 'error.main',
          ':hover': { backgroundColor: 'error.main', opacity: 0.9} ,
          position: 'fixed',
          right: 50,
          bottom: 50
        }}
        disabled={ isSaving }
       >
         <AddOutlined sx={{fontSize: 30 }} />
       </IconButton>
       
    </JournalLayout>
  )
}
