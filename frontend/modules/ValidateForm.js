import validator from "validator";

export default class ValidateForm {
    constructor(formClass) {
        this.form = document.querySelector(formClass);
    }

    init() {
        if (!this.form) return;
        
        this.form.addEventListener('submit', e => {
            this.handleEvent(e);
        })
    }

    handleEvent(e) {
        e.preventDefault(); 
        const validateFields = this.ValidateFields()
        if (validateFields) {
            this.form.submit();
        }
    }

    ValidateFields() {
        let valid = true;
        for(let errors of this.form.querySelectorAll('.text-danger')) {
            errors.remove();
        }
        for(let field of this.form.querySelectorAll('.form-control')) {
            const label = field.previousElementSibling.innerHTML;
            if(!field.value) {
                this.createError(field, `O campo "${label}" precisa está preenchido.`);
                valid = false;
            }

            if(field.classList.contains('email') && !validator.isEmail(field.value)) {
                this.createError(field, `Insira um e-mail valido.`);
                valid = false;
            }

            if(field.classList.contains('senha') && (field.value.length < 3 || field.value.length >= 50)) {
                this.createError(field, `Senha precisa ter entre 3 á 50 caracteres.`);
                valid = false;
            }
        }
        return valid;
    }

    createError(campo, msg) {
        const error = document.createElement('div');
        error.innerHTML = msg;
        error.classList.add('text-danger');
        campo.insertAdjacentElement('afterend', error);
    }
}