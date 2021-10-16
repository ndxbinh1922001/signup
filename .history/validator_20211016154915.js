function Validator(option) {
    var selectorRule = {}

    function validate(inputElement, rule) {
        var errorElement = inputElement.parentElement.querySelector(".form-message")
        var errorMessage = rule.test(inputElement.value)
        if (errorMessage) {
            errorElement.innerText = errorMessage
            inputElement.parentElement.classList.add("invalid")
        } else {
            errorElement.innerText = ""
            inputElement.parentElement.classList.remove("invalid")
        }
    }
    var formElement = document.querySelector(option.form)

    if (formElement) {
        option.rules.forEach(function(rule) {
            var inputElement = formElement.querySelector(rule.selector)

            if (inputElement) {
                inputElement.onblur = function() {
                    validate(inputElement, rule)
                }
                inputElement.oninput = function() {
                    var errorElement = inputElement.parentElement.querySelector(".form-message")
                    errorElement.innerText = ""
                    inputElement.parentElement.classList.remove("invalid")
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
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : 'Trường này phải là email';
        }
    }
}
Validator.isPassword = function(selector, min) {
    return {
        selector: selector,
        test: function(value) {
            return value.length >= min ? undefined : `Mật khẩu tối thiểu ${min} kí tự`;
        }
    }
}
Validator.isConfirm = function(selector, getconfirmvalue) {
    return {
        selector: selector,
        test: function(value) {
            return value === getconfirmvalue() ? undefined : "Giá trị nhập vào không chính xác"
        }
    }
}