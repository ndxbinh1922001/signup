function Validator(option) {
    var formElement = document.querySelector(option.form)
    if (formElement) {
        option.rules.forEach(function(rule) {
            var inputElement = formElement.querySelector(rule.selector)
            if (inputElement) {
                inputElement.onblur = function() {
                    console.log("blue " + rule.selector)
                    rule.test()
                }
            }
        })
    }
}
Validator.isRequired = function(selector) {
    return {
        selector: selector,
        test: function(value) {
            return value.trim() ? undefined : "Vui lòng nhập trường này"
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