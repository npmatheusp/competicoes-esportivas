import express from 'express';

const router = express.Router();

let usuarioLogado = null;

router.post('/login', (req, res) => {

    const { email, senha } = req.body;

    if (
        email === 'admin@email.com'
        &&
        senha === '123456'
    ) {

        usuarioLogado = {
            nome: 'Administrador',
            email: 'admin@email.com',
            usu_perfil: 'Administrador'
        };

        return res.json({
            usuario: usuarioLogado
        });
    }

    return res.status(401).json({
        erro: 'Email ou senha inválidos'
    });
});

router.get('/perfil', (req, res) => {

    if (!usuarioLogado) {

        return res.status(401).json({
            erro: 'Usuário não autenticado'
        });
    }

    return res.json({
        usuario: usuarioLogado
    });
});

router.post('/logout', (req, res) => {

    usuarioLogado = null;

    return res.json({
        sucesso: true
    });
});

export default router;