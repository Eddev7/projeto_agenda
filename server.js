require('dotenv').config(); // variaveis de ambiente

const express = require('express');
const app = express();

// modelar a base de dados
const mongoose = require('mongoose');
                // pega as variaveis de ambiente do .env
mongoose.connect(process.env.CONNECTSTRING, { useNewUrlParser: true, useUnifiedTopology: true})
.then(() => { 
  console.log('conexão estabelecida');
  app.emit('pronto'); 
})
.catch(e => {console.log(e)});

// idetificar o navegador do cliente e fazer cookie.
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');

// rotas  das aplicações
const routes = require('./routes');
// trabalhar com caminhos
const path = require('path');

// securança
const helmet = require('helmet');

// csrf - token para a segurança da aplicação do metodo POST.
const csrf = require('csurf');
// middlewares
const { middlewareGlobal, checkCsrfError, csrfMiddleware } = require('./src/middlewares/middleware');
app.use(helmet());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'public')))

const sessionOption = session({
  secret: 'qualquer texto',
  store: new MongoStore({ mongoUrl: process.env.CONNECTSTRING }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true
  }
})

app.use(sessionOption);
app.use(flash());

// caminho para ativar os views com arquivos ejs.
app.set('views', path.resolve(__dirname, 'src', 'views'))
app.set('view engine', 'ejs')

// nossos proprimos middlewares.
app.use(csrf());
app.use(csrfMiddleware);
app.use(checkCsrfError);
app.use(middlewareGlobal);
app.use(routes);

// escuta o evendo do moongose.
app.on('pronto', () => {
  app.listen(3000, () => {
    console.log('Acessar http://localhost:3000');
    console.log('Servidor executando na porta 3000');
  });
});
