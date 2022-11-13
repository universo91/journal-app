import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { Button, Grid, TextField, Typography, Link, Alert } from '@mui/material';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks';
import { startCreatingUserWithEmailPassword } from '../../store/auth';

const formData = {
  nombre: '',
  email: '',
  password: '',  
};

const formValidations = {
  nombre: [ (value) => value.length >= 1, 'El nombre es obligatorio'],
  email: [ (value) => value.includes('@'), 'El correo debe tener un @'],
  password: [ (value) => value.length >= 6 , 'El password debe tener mas de 6 caracteres']
};



export const RegisterPage = () => {
  
  const dispatch = useDispatch();

  const [formSubmitted, setFormSubmitted] = useState(false)

  const { status, errorMessage } = useSelector( state => state.auth );
  const isCheckingAuthentication = useMemo( () => status === 'checking', [status]);

  const { 
    formState, nombre, email, password, onInputChange,
    isFormValid, nombreValid, emailValid, passwordValid
  } = useForm(formData, formValidations);

  //console.log( nombreValid );

  const onSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);

    // mientras los campos no sean llenados y cumplir con sus respectivos requisitos,
    // no permitira registrarse,
    if( !isFormValid ) return;
    dispatch( startCreatingUserWithEmailPassword( formState ) );
    
  }

  return (
   <AuthLayout titulo='Crear cuenta'>
     <form onSubmit={ onSubmit }  className='animate__animated animate__fadeIn animate__faster'>
          <Grid container>
            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField
                label='Nombre'
                type='text'
                placeholder='Tu nombre completo'
                fullWidth
                value = { nombre }
                onChange={ onInputChange }
                name = "nombre"
                error= { !! nombreValid && formSubmitted }
                helperText = { nombreValid }

              />
            </Grid>
            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField
                label='Correo'
                type='email'
                placeholder='correo@gmail.com'
                fullWidth
                value = { email }
                onChange = { onInputChange }
                name="email"
                error= { !! emailValid  && formSubmitted}
                helperText = { emailValid }
              />
            </Grid>

            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField
                label='Contraseña'
                type='password'
                placeholder='contraseña'
                fullWidth
                value={ password }
                onChange={ onInputChange }
                name='password'
                error= { !! passwordValid && formSubmitted }
                helperText = { passwordValid }
                autoComplete = "disable"
              />
            </Grid>

            <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }} >

              <Grid 
                item xs={ 12 } 
                display={ !!errorMessage ? '' : 'none'}
              >
                <Alert severity='error'>{ errorMessage }</Alert>
              </Grid>
             
              <Grid item xs={ 12 } sm={ 6 }>
                <Button 
                  variant='contained' 
                  fullWidth 
                  type="submit"
                  disabled={ isCheckingAuthentication }
                >
                  Crear cuenta
                </Button>
              </Grid>
             
            </Grid>

            <Grid container direction='row' justifyContent='end'>
              <Typography sx={{ mr: 1 }}>¿Ya tienes cuenta?</Typography>
              <Link component={ RouterLink } color='inherit' to='/auth/login'>
                Ingresar
              </Link>
            </Grid>

          </Grid>
        </form>

   </AuthLayout>

  )
}
