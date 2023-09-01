const mongoose = require('mongoose');
const validator = require('validator');

const contatoSchema = new mongoose.Schema({
    nome: {type: String, require: true},
    sobrenome: {type: String, require: false, default: ''},
    email: {type: String, require: false, default: ''},
    telefone: {type: String, require: false, default: ''},
    criadoEm: {type: Date, default: Date.now }
});

const contatoModel = mongoose.model('contato', contatoSchema);

function Contato(body) {
    this.body = body;
    this.errors = [];
    this.contato = null;
}   

Contato.prototype.register = async function() {
    this.validate();

    if(this.errors.length > 0) return;

    this.contato = await contatoModel.create(this.body);
}

Contato.prototype.validate = function() {
    this.cleanUp();
    // Valida os campos
    // O e-mail precisa ser valido.
    if(this.body.email && !validator.isEmail(this.body.email)) {
        this.errors.push('E-mail inválido');
    }
    if(!this.body.nome) {
        this.errors.push('Nome é um campo obrigatório.');
    }
    if(!this.body.email && !this.body.telefone) {
        this.errors.push('Pelo menos um contato precisa estar preenchido. e-mail ou telefone.');
    }
}

Contato.prototype.cleanUp = function() {
    for(const key in this.body) {
        if (typeof this.body[key] !== 'string') {
            this.body[key] = '';
        };
    }

    this.body = {
        nome: this.body.nome,
        sobrenome: this.body.sobrenome,
        email: this.body.email,
        telefone: this.body.telefone,
    }
}

Contato.prototype.edit = async function (id) {
    if(typeof id !== 'string') return;
    this.validate();
    if(this.errors.length > 0) return;
    this.contato = await contatoModel.findByIdAndUpdate(id, this.body, { new: true });
}

Contato.buscaPorId = async function(id) {
    if(typeof id !== 'string') return;
    const contato = await contatoModel.findById(id);
    return contato;
}

Contato.buscaPorContatos = async function() {
    const contatos = await contatoModel.find()
    .sort({ criadoEm: -1 });
    return contatos;
}

Contato.delete = async function(id) {
    if(typeof id !== 'string') return;
    const contato = await contatoModel.findOneAndDelete({_id: id});
    return contato;
}

module.exports = Contato;