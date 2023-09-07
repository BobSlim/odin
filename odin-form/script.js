const regexFilters = {
    lowercase: {regex: /[a-z]/, message:"Needs a lowercase character"},
    uppercase: {regex: /[A-Z]/, message:"Needs a uppercase character"},
    number: {regex: /\d/, message:"Needs a number"},
    special: {regex: /\W/, message:"Needs a special character"},
    phone: {regex: /^[0-9]{10}$/, message:"Needs to be a 10 character telephone number."},
    email: {regex: /^.+@.+\..{2,4}$/, message:"Needs to be an e-mail with a domain."}
}

function handleSubmit(event, button){
    event.preventDefault()
    const form = button.closest("form")
    if(validateForm(form)){
        alert("Well done, you successfully completed the form! You get a cookie <3")
    }
}

function validateForm(form){
    const formData = new FormData(form)
    const formFields = form.querySelectorAll("input")
    for (const field of formFields) {
        validateField(field)
    }
    return form.checkValidity()
};

function validateField(fieldElement){
    const form = fieldElement.closest("form")
    const value = fieldElement.value
    let filters = []
    let message = []
    if (fieldElement.minLength > 0 && value.length < fieldElement.minLength) {
        message.push(`Must be at least ${fieldElement.minLength} characters.`)
    }
    if (fieldElement.maxLength > 0 && value.length > fieldElement.maxLength) {
        message.push(`Must be ${fieldElement.maxLength} characters or fewer.`)
    }
    if (fieldElement.required && value.length <= 0) {
        message.push(`Must be filled out`)
    }
    if (fieldElement.dataset.match) {
        const matchField = fieldElement.dataset.match
        message.push(value == form.querySelector("#" + matchField).value ? "" : `Must match ${matchField} field`)
    }
    switch (fieldElement.type) {
        case "email":
            filters = filters.concat([regexFilters.email]);
            break;
        case "tel":
            filters = filters.concat([regexFilters.phone]);
            break;
        case "password":
            filters = filters.concat([regexFilters.lowercase, regexFilters.uppercase, regexFilters.special, regexFilters.number])
            break;
        default:
            break;
    }
    message = message.concat(checkRegex(value, filters))

    if(message.length > 0){
        message = message.reduce((acc, val) => acc += "\n" + val)
    }
    fieldElement.setCustomValidity(message)
    fieldElement.reportValidity()
}

function checkRegex(value, filters){
    let output = []
    for(filter in filters) {
        if(!value.match(filters[filter].regex)){
            output.push(filters[filter].message)
        }
    }
    return output
}

function checkMatch(...args){
    return args.every(x => x===args[0])
};

function init(){
    const form = document.querySelector("form.signUpForm")
    const formFields = form.querySelectorAll("input")
    for (const field of formFields) {
        field.addEventListener("input", (event) => {validateField(event.target)})
    }
}

init()