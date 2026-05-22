import UserModel from '../models/UserModel.js';

class AuthService {

    async login(email, senha) {

        const usuario = await UserModel.buscarPorEmail(email);

        if (!usuario) {
            throw new Error('Usuário não encontrado');
        }

        if (usuario.senha !== senha) {
            throw new Error('Senha inválida');
        }

        return {
            mensagem: 'Login realizado com sucesso',
            usuario
        };
    }
}

export default new AuthService();