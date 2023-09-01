import 'core-js/stable';
import 'regenerator-runtime/runtime';
import ValidateForm from './modules/ValidateForm';
import ValidateCadastro from './modules/ValidateCadastro';

const loginForm = new ValidateForm('.login');
const cadastroForm = new ValidateForm('.cadastro');
const contatoForm = new ValidateCadastro('.contato');
loginForm.init();
cadastroForm.init();
contatoForm.init();
