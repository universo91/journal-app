export const fileUpload = async ( files = [] ) => {

    if ( ! files ) throw new Error('No tenemos ningun archivo a subir');

    const cloudinaryURl = 'https://api.cloudinary.com/v1_1/proyectos-de-prueba/upload';

    const formData = new FormData();
    formData.append('upload_preset', 'react-journal');
    formData.append('update_access_mode', 'public');
    formData.append('file', files);

    try {
        const resp = await fetch( cloudinaryURl, {
            method: 'POST',
            body: formData
        });

        //Si falla la subida se lanzara un error
        if( ! resp.ok ) throw new Error('No se pudo subir imagen');
        
        // Si todo marcha bien, tomaremos la respuesta de la llamada a la api
        const cloudResponse = await resp.json();

        // y se tomara su propiedad secure_url, que es la url generada de la imagen subida
        return cloudResponse.secure_url;

    } catch(error) {
        throw new Error( error.message );
    }
}