let inputValidator = {
    validate: this.validate(),
    sanitize: this.sanitize()
}
function validate(inputParameters){

}

function sanitize(inputParameters){
    inputParameters = removeUnsecureTags(inputParameters);
    return inputParameters;
}

function removeUnsecureTags(inputParameters){
    inputParameters = inputParameters.replaceAll('<script>', '');
    inputParameters = inputParameters.replaceAll('<script', '');
    inputParameters = inputParameters.replaceAll('</script>', '');
    inputParameters = inputParameters.replaceAll('<a>', '');
    inputParameters = inputParameters.replaceAll('</a>', '');
    inputParameters = inputParameters.replaceAll('<img>', '');
    inputParameters = inputParameters.replaceAll('<img', '');
    inputParameters = inputParameters.replaceAll('</img>', '');
    return inputParameters;
}

module.exports = inputValidator;