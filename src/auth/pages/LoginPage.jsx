import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { Button, Grid, TextField, Typography, Link, Alert } from '@mui/material';
import { Google } from '@mui/icons-material';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks/useForm';
import { startGoogleSignIn, startLoginWithEmailPassword } from '../../store/auth';

const formData = {
  email: "",
  password: ""
};

export const LoginPage = () => {

  // state.auth proviene del archivo store.js  auth: authSlice.reducer
  // status
  //const estadoo = useSelector( state => state.auth );
  // Por lo general state.auth, nos devuelve el estado de nuestra aplicacion, y como este
  // ultimo es un objeto, por desestrucuracion solo obtenemos el status(checking, not-autheticated, authenticated)
  const { status, errorMessage } = useSelector( state => state.auth );


  //console.log ( status );
  const dispatch = useDispatch();

  const { email, password, onInputChange } = useForm( formData );

  // memorizamos status mientras sea checking, para desabilitar los botones de inicio de
  // sesion mientras nos autentica, isAutheticating sera true, mientras status sea igual
  // a checking, y false de lo contrario
  const isAutheticating = useMemo( () => status === 'checking', [ status ]) ;
  /* console.log( isAutheticating ); */

  const onSubmit= (event) => {
    event.preventDefault();
    dispatch( startLoginWithEmailPassword(email, password));
  
  }

  const onGoogleSignIn = () => {
    dispatch( startGoogleSignIn() );
  }

  return (
   <AuthLayout titulo='Login'>
     <form onSubmit={ onSubmit }  className='animate__animated animate__fadeIn animate__faster'>
          <Grid container>
            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField
                label='Correo'
                type='email'
                placeholder='correo@gmail.com'
                fullWidth
                name="email"
                value={ email }
                onChange={ onInputChange }
              />
            </Grid>

            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField
                label='Contraseña'
                type='password'
                placeholder='contraseña'
                fullWidth
                name = "password"
                value ={ password }
                onChange={ onInputChange }
              />
            </Grid>
            <Grid container
                  spacing={ 2 } sx={{ mb: 2, mt: 1 }}
            >
              <Grid
                item
                xs={12}
                display={ !! errorMessage ? '' : 'none'}                
              >
                <Alert severity='error'>{ errorMessage }</Alert>
              </Grid>
              
            </Grid>

            <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }} >
             
              <Grid item xs={ 12 } sm={ 6 }>
                <Button 
                  variant='contained' 
                  fullWidth 
                  type="submit"
                  disabled= { isAutheticating }
                >
                  Login
                </Button>
              </Grid>
              <Grid item xs={ 12 } sm={ 6 }>
                <Button 
                  variant='contained' 
                  fullWidth 
                  onClick={ onGoogleSignIn }
                  disabled= { isAutheticating }
                >
                  <Google />
                  <Typography sx={{ ml: 1 }}> Google </Typography>
                </Button>
              </Grid>
            </Grid>

            <Grid container direction='row' justifyContent='end'>
              <Link component={ RouterLink } color='inherit' to='/auth/register'>
                Crear una cuenta
              </Link>
            </Grid>

          </Grid>
        </form>

   </AuthLayout>

        
     
      
    
  )
}
