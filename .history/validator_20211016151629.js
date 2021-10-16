function Validator(option) {
    var formElement = document.querySelector(option.form)
    if (formElement) {
        option.rules.forEach(function(rule) {
            var inputElement = formElement.querySelector(rule.selector)
            var errorElement = inputElement.parentElement.querySelector(".form-message")
            if (inputElement) {
                inputElement.onblur = function() {
                    console.log("blue " + rule.selector)
                    var errorMessage = rule.test(inputElement.value)
                    if (errorMessage) {
                        errorElement.innerText = errorMessage
                        inputElement.parentElement.classList.add("invalid")
                    } else {
                        errorElement.innerText = ""
                    }
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
        test: function(value) {
            return value.trim() ? undefined : "Vui lòng nhập trường này"
        }
    }
}