import { useEffect, useMemo, useState } from "react";

export const useForm = ( initialForm = {}, formValidations = {} ) => {

   // formState tiene los valores de: [name, email, password]
  const [ formState, setFormState ] = useState(initialForm);
  const [ formValidation, setFormValidation ] = useState({})

  useEffect(() => {
    // Cada vez que cambie el nombre, password o email se ejecutara la funcion de 
    // validacion
    createValidators();    

  }, [formState])

  useEffect( () => {
    setFormState( initialForm );
  },[ initialForm ]);

  // esta funcion se encargara de controlar que todos los campos sean validos
  // en formaGeneral, basta que uno no cumple el previo requisito, el
  // formulario sera invalido
  const isFormValid = useMemo( () => {
   
   for ( const formValue of Object.keys( formValidation ) ) {
      if (formValidation[ formValue ] !== null ) return false;
   }
   return true;

  }, [formValidation]); 
  
  const createValidators = () => {
   
   const formCheckedValues = {};
   /**
    * Object.keys: Valor devuelto
    * Una matriz de cadenas que representan todas las propiedades enumerables del objeto dado.
    * Object.keys(formValidations ) devolvera un array: ["nombre", "email", "password"]
    * y formField en cada iteracin ira tomando esos valores sonsecutivamente.
    * 
    * formValidations tiene esta forma: 
    * formValidations = {
         nombre: [ (value) => value.length >= 1, 'El nombre es obligatorio'],
         email: [ (value) => value.includes('@'), 'El correo debe tener un @'],
         password: [ (value) => value.length >= 6 , 'El password debe tener mas de 6 caracteres']
      }; Es un objeto de arrays
    */
   //console.log( formValidations );
   for (const formField of Object.keys( formValidations )) {
      const [ fn, errorMessage ] = formValidations[ formField ];

      // Crearemos una propiedad computada, que seguira un patron que tienes estas
      // propiedades: isFormValid, displayNameValid, emailValid, passwordValid
      // formState contiene las propiedades: nombre, email, password,
      formCheckedValues[`${formField}Valid`] = fn( formState[formField] ) ? null : errorMessage;
      setFormValidation( formCheckedValues );
   } 

  }

  // Se desestructura el evento del que solo nos interesa su propiedad target
  const onInputChange = ( {target} ) => {
    // por desestructuracion obtenemos las propiedades name y value de target
    const { name, value } = target;
    setFormState({
      // ...formState es para hacer una copia de todos los campos que pudieramos
      // tener pero, solo haremos cambio del input en el que se esta modificando su valor 
      // ingresado
      ...formState,
      [name]: value
    });
  }

  const onResetForm = () => {
      setFormState( initialForm );
  }
  // La finalidad de ...formState es enviar una copia de sus elementos por separado, 
  // de modo que podamos extraerlos directamente por desestructuracion al llamar a useForm en otro lugar
  // Si bien se esta enviando formState, pero para acceder a sus propiedades en otro lugar al
  // momento de llamar a useForm, habria que traerlo primero por desestructuracion
  // y en seguida desestructurarlo tambien y recien tener acceso a sus propiedades 
  return {
    ...formState,
    formState,
    onInputChange,
    onResetForm,
    ...formValidation,
    isFormValid
  }
}