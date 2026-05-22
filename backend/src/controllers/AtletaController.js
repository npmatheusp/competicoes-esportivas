import AtletaModel from '../models/AtletaModel.js';
import InscricaoModel from '../models/InscricaoModel.js';

class AtletaController {

    async listar(req, res) {

        try {

            const atletas =
                await AtletaModel.listar();

            return res.json(atletas);

        } catch (error) {

            console.error(error);

            return res.status(500).json({
                error: 'Erro ao listar atletas'
            });
        }
    }

    async atualizar(req, res) {

        try {

            const { cpf } = req.params;

            await AtletaModel.atualizar(
                cpf,
                req.body
            );

            return res.json({
                sucesso: true
            });

        } catch (error) {

            console.error(error);

            return res.status(500).json({
                error: 'Erro ao atualizar atleta'
            });
        }
    }

    async excluir(req, res) {

        try {

            const { cpf } = req.params;

            await InscricaoModel.deletarPorCpf(
                cpf
            );

            await AtletaModel.deletar(
                cpf
            );

            return res.json({
                sucesso: true
            });

        } catch (error) {

            console.error(error);

            return res.status(500).json({
                error: 'Erro ao excluir atleta'
            });
        }
    }
}

export default new AtletaController();