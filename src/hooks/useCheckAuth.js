import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { login, logOut } from '../store/auth';
import { startLoadingNotes } from '../store/journal';

export const useCheckAuth = () => {

    const { status, displayName } = useSelector( state => state.auth);
  const dispatch = useDispatch();

  useEffect( () => {
    const auth = getAuth();

    onAuthStateChanged(auth,  async( user ) => {

      if( !user ) return dispatch( logOut() );
      const { uid, email, displayName, photoURL } = user;

      //disparamos la accion login 
      dispatch( login({uid, email, displayName, photoURL}))

      // disparamos el thunk startLoadingNotes
      dispatch( startLoadingNotes());
    })

  }, []);

  return status;

}
