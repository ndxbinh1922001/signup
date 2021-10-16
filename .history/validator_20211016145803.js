function Validator(option) {
    var formElement = document.querySelector(option.form)
    if (formElement)
        console.log(formElement)
}
Validator.isRequired = function(selector) {
    return selector
}
Validator.isSmall = function(selector) {
    return selector
}