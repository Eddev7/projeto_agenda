// middleware são funções que passam e podem ser encadeadas em uma requisição tendo varias funções executanduas e passando para outra.

exports.middlewareGlobal = (req, res, next) => {
    res.locals.errors = req.flash('errors');
    res.locals.success = req.flash('success');
    res.locals.user = req.session.user;
    next(); // para passar para outra middleware usamos next(); para encerrarmos usamos return; 
}

exports.checkCsrfError = (err, req, res, next) => {
    if (err) {
        return res.render('404');
    }

    next();
}

exports.csrfMiddleware= (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
}

exports.loginRequired = (req, res, next) => {
    if(!req.session.user) {
        req.flash('errors', 'Você precisa fazer login.');
        req.session.save(() => {
            res.redirect('/');
        })
        return;
    }
    next();
}