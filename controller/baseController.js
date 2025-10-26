exports.index = (req, res) => {
    res.render("pages/index");
};

exports.loginPage = (req, res) => {
    res.render("pages/login");
};

exports.registrarPage = (req, res) => {
    res.render("pages/cadastro");
};

exports.dashboardPage = (req, res) => {
    // Página simples de dashboard (sem lógica de autenticação aqui)
    res.render("pages/dashboard");
};