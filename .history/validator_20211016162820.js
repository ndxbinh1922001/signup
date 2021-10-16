function Validator(option) {
    var selectorRule = {}

    function validate(inputElement, rule) {
        var errorElement = inputElement.parentElement.querySelector(".form-message")
        var errorMessage
        var rules = selectorRule[rule.selector]
        for (var i = 0; i < rules.length; i++) {
            errorMessage = rules[i](inputElement.value)
            if (errorMessage) break;
        }
        if (errorMessage) {
            errorElement.innerText = errorMessage
            inputElement.parentElement.classList.add("invalid")
        } else {
            errorElement.innerText = ""
            inputElement.parentElement.classList.remove("invalid")
        }
        return !errorMessage
    }
    var formElement = document.querySelector(option.form)

    if (formElement) {
        formElement.onsubmit = function(e) {
            e.preventDefault();
            var isFormValid = true;
            option.rules.forEach(function(rule) {
                var inputElement = formElement.querySelector(rule.selector)
                var isValid = validate(inputElement, rule)
                if (!isValid) {
                    isFormValid = false
                }
            });

            if (isFormValid) {
                if (typeof option.onsubmit === 'function') {
                    var enableInput = formElement.querySelectorAll('[name])')
                    var formValues = Array.from(enableInput).reduce(function(values, input) {
                        return (values[input.name] = input.value) && values;
                    }, {})
                    option.onsubmit(formValues)
                }
            }
        }
        option.rules.forEach(function(rule) {
            if (Array.isArray(selectorRule[rule.selector])) {
                selectorRule[rule.selector].push(rule.test);
            } else {
                selectorRule[rule.selector] = [rule.test];
            }
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
        console.log(selectorRule)
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