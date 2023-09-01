import validator from "validator";
import ValidateForm from "./ValidateForm";

export default class ValidateCadastro extends ValidateForm {
    constructor(formClass) {
        super(formClass);
    }

    ValidateFields() {
        let valid = true;
        for(let errors of this.form.querySelectorAll('.text-danger')) {
            errors.remove();
        }
        const nome = document.querySelector('input[name="nome"]');
        const email = document.querySelector('input[name="email"]')
        const telefone = document.querySelector('input[name="telefone"]')
        if(!nome.value) {
            this.createError(nome, `O campo "nome" precisa está preenchido.`);
            valid = false;
        }

        if(email.value && !validator.isEmail(email.value)) {
            this.createError(email, `O E-mail precisa ser valido.`);
            valid = false;
        }

        if(!email.value && !telefone.value) {
            this.createError(email, `O campo "E-mail" ou "Telefone" precisa está preenchido.`);
            this.createError(telefone, `O campo "E-mail" ou "Telefone" precisa está preenchido.`);
            valid = false;
        }
        return valid;
    }
}