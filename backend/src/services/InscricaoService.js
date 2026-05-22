import InscricaoModel from '../models/InscricaoModel.js';

class InscricaoService {

    async listar() {
        return await InscricaoModel.listar();
    }

    async criar(dados) {

        if (!dados.atleta_id || !dados.modalidade_id) {
            throw new Error('Dados da inscrição inválidos');
        }

        return await InscricaoModel.criar(dados);
    }

    async deletar(id) {
        return await InscricaoModel.deletar(id);
    }
}

export default new InscricaoService();