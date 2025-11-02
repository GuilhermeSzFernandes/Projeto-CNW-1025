const jwt = require("jsonwebtoken")

const autenticacaoMiddleweare = (req, res, next) => {
    const authHeader = req.headers["authorization"];

    if(!authHeader){
        return res.status(401).json({error: "Forneça um token"});
    }

    // Pega só o token
    const token = authHeader.split(" ")[1];

    if(!token){
        return res.status(401).json({error: "Erro no token"});
    }

    try{
        const verificar = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verificar;
        next();
    }
    catch{
        return res.status(401).json({ error: "Token inválido ou expirado" });
    }
};

module.exports = autenticacaoMiddleweare