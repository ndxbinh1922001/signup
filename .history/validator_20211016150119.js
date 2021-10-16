function Validator(option) {
    var formElement = document.querySelector(option.form)
    console.log(option.rules)
}
Validator.isRequired = function(selector) {
    return {
        selector: selector,
        test: function() {

        }
    }
}
Validator.isSmall = function(selector) {
    return {
        selector: selector,
        test: function() {

        }
    }
}