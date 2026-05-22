import AuthService from '../services/AuthService.js';

class AuthController {

    async login(req, res) {

        try {

            const { email, senha } = req.body;

            const resultado = await AuthService.login(email, senha);

            return res.json(resultado);

        } catch (error) {
            return res.status(500).json({ erro: error.message });
        }
    }
}

export default new AuthController();