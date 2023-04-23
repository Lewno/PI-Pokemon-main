const validate = (input,errorsInput) =>{
    // name
    const errors = { ...errorsInput }; 
    if(!input.name) 
        errors.name ="Por favor completa este campo";
    else if(input.name.length<5 || input.name.length>30) 
        errors.name ="Debe estar entre 5 a 30 caracteres";
    else {
        errors.name ="";
    }
        
    // image
    if(!input.image)
        errors.image ="Por favor completa este campo";
    else if(!/.png/.test(input.image) && !/.jpg/.test(input.image) && !/.svg/.test(input.image) && !/.jpeg/.test(input.image) && !/.gif/.test(input.image))
        errors.image ="Por favor utiliza extencion jpg|png";
    else{
        errors.image ="";
    }

    if(!input.types.length)
        errors.types ="Por favor completa este campo";
    else{
        errors.types ="";
    }

    return errors;
};

export default validate;