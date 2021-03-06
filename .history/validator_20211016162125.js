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
            var enableInput = formElement.querySelectorAll('[name]:not([disable])')
            var formValues = Array.from(enableInput).reduce(function(values, input) {
                return (values[input.name] = input.value) && values;
            }, {})
            if (isFormValid) {
                if (typeof option.onsubmit === 'function') {


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
            return value.trim() ? undefined : "Vui l??ng nh???p tr?????ng n??y"
        }
    }
}
Validator.isSmall = function(selector) {
    return {
        selector: selector,
        test: function(value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : 'Tr?????ng n??y ph???i l?? email';
        }
    }
}
Validator.isPassword = function(selector, min) {
    return {
        selector: selector,
        test: function(value) {
            return value.length >= min ? undefined : `M???t kh???u t???i thi???u ${min} k?? t???`;
        }
    }
}
Validator.isConfirm = function(selector, getconfirmvalue) {
    return {
        selector: selector,
        test: function(value) {
            return value === getconfirmvalue() ? undefined : "Gi?? tr??? nh???p v??o kh??ng ch??nh x??c"
        }
    }
}