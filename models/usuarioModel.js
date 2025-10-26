const { neon } = require("@neondatabase/serverless");
const sql = neon(process.env.DATABASE_URL);
const bcrypt = require('bcryptjs');
const { DATETIME } = require("mysql/lib/protocol/constants/types");

// Busca um usuário por email. Retorna o objeto usuário ou undefined.
exports.BuscarUsuarioPorEmail = async (email) => {
    // Não usei `` com injeção $() pq pode ter sql injection
    const resultado = await sql.query('SELECT * FROM usuario WHERE email = $1', [email]);
    return resultado && resultado.rows ? resultado.rows[0] : undefined;
};

exports.logar = async (email, senha) => {
    // LIMIT 1 para trazer apenas um registro
    const resultado = await sql.query('SELECT * FROM usuario WHERE email = $1 LIMIT 1', [email]);
    const usuario = resultado && resultado.rows ? resultado.rows[0] : undefined;

    if (!usuario) {
        return null;
    }

    try {
        // bcrypt.compare é a função correta para comparar senha com hash
        const valida = await bcrypt.compare(senha, usuario.senha_hash);

        if (!valida) return null;

        // Não retornar o hash ao chamar o controller
        const usuarioSemHash = { ...usuario };
        delete usuarioSemHash.senha_hash;

        return usuarioSemHash;
    } catch (error) {
        console.error("Erro durante a comparação do hash:", error);
        return null;
    }
};

exports.cadastrar = async (nome, email, senha) => {
    const senha_hash = await bcrypt.hash(senha, 10)
    const resultado = await sql.query('insert into usuario(nome, email, senha_hash, data_cadastro) values ($1, $2, $3, $4) RETURNING usuario_id', [nome, email, senha_hash, new Date()])
    
    if(resultado != null){
        return resultado
    }
    
    return null;    
}